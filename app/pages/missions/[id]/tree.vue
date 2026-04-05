<script setup lang="ts">
import TreeFlow from "~/components/tree/tree-flow.vue";
import Division from "~/components/ui/division.vue";
import type Tree from "~/interfaces/tree.interface";

const config = useRuntimeConfig();
const route = useRoute();

const { data: tree } = await useFetch<Tree>(
  `${config.public.apiUrl}/missions/${route.path.replace("/missions/", "").replace("/tree", "")}/tree`,
);

const mission = tree.value?.mission;
</script>

<template>
  <section class="py-8 mr-8 flex flex-col flex-1 gap-4">
    <header class="flex justify-between items-center">
      <div class="flex flex-col gap-1">
        <h1 class="text-2xl font-bold">{{ mission?.name }}</h1>
        <p class="text-violet-200/80">{{ mission?.description }}</p>
      </div>

      <div class="bg-violet-950/60 p-2 rounded-2xl flex gap-4 backdrop-blur-xs">
        <NuxtLink
          class="rounded-xl p-2 hover:scale-105 transition-mix"
          :class="$route.path.endsWith('tree') ? '' : 'bg-violet-500/70'"
          :to="`/missions/${mission?.id}`"
          >Hierarchy</NuxtLink
        >
        <NuxtLink
          class="rounded-xl p-2 hover:scale-105 transition-mix"
          :class="$route.path.endsWith('tree') ? 'bg-violet-500/70' : ''"
          :to="`/missions/${mission?.id}/tree`"
          >Tree</NuxtLink
        >
      </div>
    </header>

    <Division />

    <ClientOnly>
      <div
        v-if="tree?.tree"
        class="flex-1 rounded-2xl border border-violet-300/20 bg-violet-500/10 overflow-hidden"
      >
        <TreeFlow :mission="tree.mission" :tasks="tree.tree" />
      </div>
    </ClientOnly>
  </section>
</template>
