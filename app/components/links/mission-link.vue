<script setup lang="ts">
import type Mission from "~/interfaces/mission.interface";

const props = defineProps<{
  mission: Mission;
}>();

const route = useRoute();

const style = computed(() => {
  return route.path.startsWith(`/missions/${props.mission.id}`)
    ? "bg-violet-500/15 border-violet-500/80 shadow-lg shadow-violet-500/20"
    : "hover:bg-violet-500/20";
});
</script>

<template>
  <NuxtLink
    :to="`/missions/${mission.id}`"
    class="flex flex-col gap-1 rounded-xl py-2 px-3 border border-transparent transition-mix hover:scale-105"
    :class="style"
  >
    <span class="text-sm text-ellipsis whitespace-nowrap overflow-hidden">{{
      mission.name
    }}</span>
    <p
      class="text-xs text-violet-200/80 text-ellipsis whitespace-nowrap overflow-hidden"
    >
      {{ mission.description }}
    </p>
    <span
      class="mt-2 text-violet-100/50 text-xs text-ellipsis whitespace-nowrap overflow-hidden"
      >3 phases</span
    >
  </NuxtLink>
</template>
