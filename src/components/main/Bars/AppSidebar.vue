<template>
  <Sidebar>
    <SidebarContent class="p-4">
      <SidebarGroup>
        <SidebarGroupContent>
          <SidebarMenu>
            <!-- Create New Chat Card -->
            <SidebarMenuItem class="mb-2">
              <SidebarMenuButton asChild>
                <button @click="createNewChat" class="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-200 w-full justify-start">
                  <component :is="Plus" class="text-gray-500" />
                  <span>New Chat</span>
                </button>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <Separator class="my-2" />

            <!-- Chat History List -->
            <template v-if="chatStore.chatHistory.length > 0">
              <ChatHistoryCard
                v-for="session in chatStore.chatHistory"
                :key="session.id"
                :chatSession="session"
              />
            </template>
            <template v-else>
              <li class="px-2 py-2 text-sm text-muted-foreground">
                No chat history yet.
              </li>
            </template>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
  </Sidebar>
</template>

<script setup lang="ts">
import { Plus } from "lucide-vue-next";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import ChatHistoryCard from '@/components/main/Chat/ChatHistoryCard.vue';
import { useChatStore } from '@/stores/chatStore';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

const chatStore = useChatStore();
const router = useRouter();

onMounted(async () => {
  await chatStore.fetchChatHistory();
});

const createNewChat = () => {
  router.push(`/chat/`); 
};
</script>
