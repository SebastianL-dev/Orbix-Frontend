<script setup lang="ts">
const { t } = useI18n();
</script>

<template>
  <section
    class="mt-16 flex flex-col items-center justify-center gap-2 mx-auto"
  >
    <h1 class="text-6xl font-black">{{ t("home.title") }}</h1>
    <p class="text-lg text-violet-200/50">
      {{ t("home.description") }}
    </p>
  </section>
</template>
