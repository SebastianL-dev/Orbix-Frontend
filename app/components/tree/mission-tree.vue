<script setup lang="ts">
import type Task from "~/interfaces/task.interface";
import TreeNode from "./tree-node.vue";

defineProps<{
  tasks: Task[];
}>();
</script>

<template>
  <div
    class="flex flex-col gap-1 rounded-l-3xl rounded-r-lg bg-violet-500/5 border border-violet-400/10 p-4 h-full min-h-0 overflow-y-scroll scrollbar backdrop-blur-xs"
  >
    <div class="flex items-center gap-2 mb-3 px-2">
      <Icon name="lucide:network" class="text-violet-400 text-lg" />
      <h2
        class="text-lg font-semibold text-violet-100/80 uppercase tracking-wide"
      >
        Task Tree
      </h2>
    </div>

    <div
      v-if="tasks.length === 0"
      class="flex flex-col items-center justify-center py-12 gap-3 h-full"
    >
      <Icon name="lucide:folder-open" class="text-8xl text-violet-500" />
      <p class="text-4xl text-violet-200/70">No tasks yet</p>
    </div>

    <TreeNode v-for="task in tasks" :key="task.id" :task="task" />
  </div>
</template>
