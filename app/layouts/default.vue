<script setup lang="ts">
import Sidebar from "~/components/ui/sidebar.vue";
import SpaceParticles from "~/components/ui/space-particles.vue";
</script>

<template>
  <main class="relative flex w-full h-screen gap-8">
    <SpaceParticles />

    <Sidebar />

    <NuxtPage />
  </main>
</template>
