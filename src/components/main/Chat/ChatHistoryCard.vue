<template>
  <SidebarMenuItem class="mb-2">
    <SidebarMenuButton asChild>
      <button 
        @click="selectChat"
        :class="['flex items-center space-x-2 p-2 rounded-md w-full', isActive ? 'bg-gray-300' : 'hover:bg-gray-200']"
      >
        <component :is="MessageCircle" class="text-gray-500" />
        <span>{{ chatSession.title }}</span>
      </button>
    </SidebarMenuButton>
  </SidebarMenuItem>
</template>

<script setup lang="ts">
import { MessageCircle } from 'lucide-vue-next';
import { SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar';
import type { ChatSessionSchema } from '@/Api/types/ChatHistory';
import { useRoute, useRouter } from 'vue-router';
import { computed } from 'vue';

interface Props {
  chatSession: ChatSessionSchema;
}

const props = defineProps<Props>();
const route = useRoute();
const router = useRouter();

const isActive = computed(() => route.query.chat_id === props.chatSession.id);

const selectChat = () => {
  router.replace({ query: { chat_id: props.chatSession.id } }); 
};
</script>
