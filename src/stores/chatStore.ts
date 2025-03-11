import { defineStore } from 'pinia';
import { ref } from 'vue';
import { get } from '@/Api/middleware/apiCaller';
import { LIST_CHATS_ENDPOINT } from '@/Api/paths/chatHistory';
import type { ChatSessionSchema, ListChatSessionsResponse } from '@/Api/types/ChatHistory';
import { useToast } from '@/components/ui/toast';

export const useChatStore = defineStore('chat', () => {
  const chatHistory = ref<ChatSessionSchema[]>([]);
  const { toast } = useToast();

  const fetchChatHistory = async () => {
    try {
      const response = await get<ListChatSessionsResponse>(LIST_CHATS_ENDPOINT);
      if (response.success && response.data) {
        const chatSessionsArray = Array.isArray(response.data)
          ? response.data
          : Object.values(response.data);
        chatHistory.value = chatSessionsArray as ChatSessionSchema[];
      } else {
        toast({
          variant: 'destructive',
          description: `Failed to load chat history: ${response.message}`,
        });
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        description: 'Failed to load chat history. Please check your connection.',
      });
      console.error('Failed to fetch chat history:', error);
    }
  };

  return { chatHistory, fetchChatHistory };
});