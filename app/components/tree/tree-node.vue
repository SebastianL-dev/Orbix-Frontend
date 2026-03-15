<script setup lang="ts">
import { ref } from "vue";
import type Task from "~/interfaces/task.interface";

const props = defineProps<{
  task: Task;
  depth?: number;
}>();

const depth = props.depth ?? 0;
const isOpen = ref(depth < 1);
const hasChildren = computed(() => props.task.children.length > 0);

function toggle() {
  if (hasChildren.value) {
    isOpen.value = !isOpen.value;
  }
}

const statusColor = computed(() => {
  switch (props.task.status.toLowerCase()) {
    case "completed":
      return "bg-green-500/15 text-green-400";
    case "in_progress":
      return "bg-amber-300/15 text-amber-300";
    case "pending":
      return "bg-zinc-300/15 text-zinc-300";
    default:
      return "bg-violet-500/15 text-violet-300";
  }
});

const statusLabel = computed(() => {
  return props.task.status.replace(/_/g, " ");
});
</script>

<template>
  <div class="flex flex-col">
    <div
      class="group flex items-center gap-3 rounded-xl px-4 py-3 border border-transparent transition-all duration-200 hover:bg-violet-500/10 hover:border-violet-500/20"
      :class="{ 'cursor-pointer': hasChildren }"
      @click="toggle"
    >
      <button
        v-if="hasChildren"
        class="flex items-center justify-center w-6 h-6 shrink-0 rounded-lg bg-violet-500/10 transition-transform duration-400 ease-bounce cursor-pointer group"
        :class="{ 'rotate-90': isOpen }"
      >
        <Icon
          name="lucide:chevron-right"
          class="text-base text-violet-300/70"
        />
      </button>
      <div v-else class="w-5 h-5 shrink-0 flex items-center justify-center">
        <div class="w-1.5 h-1.5 rounded-full bg-violet-500" />
      </div>

      <div class="flex flex-col flex-1 min-w-0 gap-0.5">
        <div class="flex items-center gap-2">
          <span class="text-sm font-medium text-violet-50 truncate">
            {{ task.name }}
          </span>
          <span
            class="text-[10px] uppercase font-semibold px-2 py-1 rounded-full shrink-0"
            :class="statusColor"
          >
            {{ statusLabel }}
          </span>
        </div>

        <div class="flex items-center gap-3 text-xs text-violet-200/50">
          <span class="flex items-center gap-1">
            <Icon name="lucide:clock" class="text-[11px]" />
            {{ task.duration }}h
          </span>
          <span class="flex items-center gap-1">
            <Icon name="lucide:dollar-sign" class="text-[11px]" />
            {{ task.cost.toLocaleString() }}
          </span>
          <span v-if="hasChildren" class="flex items-center gap-1">
            <Icon name="lucide:git-branch" class="text-[11px]" />
            {{ task.children.length }} subtask{{
              task.children.length > 1 ? "s" : ""
            }}
          </span>
        </div>
      </div>
    </div>

    <div
      v-if="hasChildren"
      v-show="isOpen"
      class="ml-7 pl-4 border-l border-violet-400/30"
    >
      <TreeNode
        v-for="child in task.children"
        :key="child.id"
        :task="child"
        :depth="depth + 1"
      />
    </div>
  </div>
</template>
