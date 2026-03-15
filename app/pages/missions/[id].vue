<script setup lang="ts">
import Division from "~/components/ui/division.vue";
import MissionTree from "~/components/tree/mission-tree.vue";
import type Tree from "~/interfaces/tree.interface";

const config = useRuntimeConfig();
const route = useRoute();

const { data: tree } = await useFetch<Tree>(
  `${config.public.apiUrl}/missions/${route.path.replace("/missions/", "")}/tree`,
);

const mission = tree.value?.mission;
const tasks = computed(() => tree.value?.tree ?? []);
</script>

<template>
  <section class="py-8 mr-8 flex flex-col flex-1 gap-4">
    <header class="flex flex-col gap-1">
      <h1 class="text-2xl font-bold">{{ mission?.name }}</h1>
      <p class="text-violet-200/80">{{ mission?.description }}</p>
    </header>

    <Division />

    <MissionTree :tasks="tasks" />
  </section>
</template>
