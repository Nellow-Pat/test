<template>
  <div class="flex h-full flex-col bg-gray-50">
    <!-- Chat Messages -->
    <div class="flex-1 overflow-auto p-4 space-y-4">
      <template v-if="messages.length > 0">
        <div v-for="message in messages" :key="message.id" class="mb-4">
          <!-- User Message -->
          <div class="text-sm text-gray-600 font-semibold">You:</div>
          <div class="bg-gray-100 p-2 rounded-md mb-1">{{ message.query }}</div>

          <!-- Assistant Message -->
          <div class="text-sm text-blue-600 font-semibold">Assistant:</div>
          <div class="bg-blue-50 p-2 rounded-md">{{ message.response }}</div>
        </div>
      </template>

      <div v-else class="text-center text-gray-500 py-6">
        Select a chat from the sidebar to view conversation history.
      </div>
    </div>

    <!-- Chat Input -->
    <div class="p-4 border-t border-gray-200 bg-white">
      <div class="flex items-center space-x-4">
        <Input
          v-model="inputMessage"
          type="text"
          placeholder="Type a message..."
          class="flex-1"
          @keyup.enter="sendMessage"
        />

        <Button
          @click="sendMessage"
          :disabled="!inputMessage.trim()"
        >
          Send
        </Button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { get, post } from '@/Api/middleware/apiCaller';
import { GET_CHAT_HISTORY_ENDPOINT, CREATE_CHATS_ENDPOINT } from '@/Api/paths/chatHistory';
import { CHAT_ENDPOINT } from '@/Api/paths/chat';
import { useToast } from '@/components/ui/toast';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import type { GetChatHistoryResponse, ChatHistorySchema } from '@/Api/types/ChatHistory';
import type { ChatResponse } from '@/Api/types/Chat';
import { useChatStore } from '@/stores/chatStore';

const route = useRoute();
const router = useRouter();
const { toast } = useToast();

const messages = ref<ChatHistorySchema[]>([]);
const inputMessage = ref<string>('');
const chatId = ref<string | null>(route.query.chat_id as string | null);

const fetchChatHistory = async () => {
  if (!chatId.value) return;

  try {
    const endpoint = GET_CHAT_HISTORY_ENDPOINT.replace('{chat_id}', chatId.value);
    const response = await get<GetChatHistoryResponse>(endpoint);

    if (response.success && response.data) {
      messages.value = Object.values(response.data);
    } else {
      messages.value = [];
      toast({ variant: 'destructive', description: 'Failed to load chat history.' });
    }
  } catch {
    messages.value = [];
    toast({ variant: 'destructive', description: 'Failed to load chat history.' });
  }
};

const sendMessage = async () => {
  if (!inputMessage.value.trim()) return;

  try {
    const requestPayload: { query: string; chat_id?: string } = { query: inputMessage.value };
    const endpoint = chatId ? CHAT_ENDPOINT : CREATE_CHATS_ENDPOINT; 
    if (chatId.value) {
    requestPayload.chat_id = chatId.value;
    }
    const response = await post<ChatResponse, typeof requestPayload>(endpoint, requestPayload);


    if (response.success) {
      if (!chatId.value && response.data?.chat_id) { 
        chatId.value = response.data.chat_id;
        router.replace({ query: { chat_id: response.data.chat_id } }); 
        const chatStore = useChatStore();
        chatStore.fetchChatHistory();
      }

      messages.value.push({
        id: Date.now(), 
        chat_id: chatId.value!,
        query: inputMessage.value,
        response: response.data?.response ?? '...', 
        created_at: new Date().toISOString(), 
      });

      inputMessage.value = ''; 
    } else {
      toast({ variant: 'destructive', description: 'Failed to send message.' });
    }
  } catch {
    toast({ variant: 'destructive', description: 'Error sending message.' });
  }
};


watchEffect(() => {
  chatId.value = route.query.chat_id as string | null;

  if (!chatId.value) {
    messages.value = []; 
  } else {
    fetchChatHistory();
  }
});
</script>