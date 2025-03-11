<template>
    <div class="h-screen w-screen bg-background flex">
      <SidebarProvider class="w-64" :defaultOpen="true">
        <AppSidebar class="w-64 flex-shrink-0" />
      </SidebarProvider>
  
      <div class="flex-1 flex flex-col">
        <slot /> 
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import AppSidebar from '@/components/main/Bars/AppSidebar.vue';
  import { SidebarProvider } from '@/components/ui/sidebar';
  </script>
  