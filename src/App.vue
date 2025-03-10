<script setup lang="ts">
import AppSidebar from '@/components/main/Bars/AppSidebar.vue'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
</script>

<template>
  <SidebarProvider :defaultOpen="true">
    <AppSidebar class="w-64" />
    <main>
      <RouterView />
    </main>
  </SidebarProvider>
</template>