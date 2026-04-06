<script setup lang="ts">
import Sidebar from "~/components/ui/sidebar.vue";
import SpaceParticles from "~/components/ui/space-particles.vue";
import ToastContainer from "~/components/ui/toast-container.vue";
</script>

<template>
  <main class="relative flex w-full h-screen gap-8">
    <SpaceParticles />

    <Sidebar />

    <NuxtPage />

    <ToastContainer />
  </main>
</template>
