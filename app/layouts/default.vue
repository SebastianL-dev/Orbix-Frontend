<script setup lang="ts">
import Sidebar from "~/components/ui/sidebar.vue";
import SpaceParticles from "~/components/ui/space-particles.vue";
import ToastContainer from "~/components/ui/toast-container.vue";

const { locale, setLocale } = useI18n();

function toggleLocale() {
  setLocale(locale.value === "en" ? "es" : "en");
}
</script>

<template>
  <main class="relative flex w-full h-screen gap-8">
    <SpaceParticles />

    <Sidebar />

    <NuxtPage />

    <button
      class="absolute bottom-6 right-6 z-20 p-3 flex aspect-square rounded-xl text-base font-semibold text-violet-200/70 bg-violet-500/10 border border-violet-200/10 hover:bg-violet-500/20 hover:text-violet-100 cursor-pointer transition-mix hover:scale-110 backdrop-blur-sm h-fit items-center justify-center"
      @click="toggleLocale"
    >
      {{ locale === "en" ? "ES" : "EN" }}
    </button>

    <ToastContainer />
  </main>
</template>
