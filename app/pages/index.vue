<script setup lang="ts">
import Sidebar from "~/components/ui/sidebar.vue";
import SpaceParticles from "~/components/particles/space-particles.vue";
</script>

<template>
  <main class="relative flex w-full h-screen">
    <SpaceParticles />

    <Sidebar />

    <div class="flex-1"></div>
  </main>
</template>
