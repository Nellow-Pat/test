<template>
  <Layout>
    <header class="bg-white shadow-md p-4">
      <h1 class="text-xl font-semibold">Pits Chat</h1>
    </header>

    <div class="flex-1 flex flex-col overflow-hidden">
      <ChatView />
    </div>
  </Layout>
</template>

<script setup lang="ts">
import Layout from '@/pages/layouts/layouts.vue';
import ChatView from '@/components/main/Chat/ChatView.vue';
</script>
