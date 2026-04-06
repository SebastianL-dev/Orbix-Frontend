<script setup lang="ts">
import type Task from "~/interfaces/task.interface";
import TreeNode from "./tree-node.vue";

defineProps<{
  tasks: Task[];
}>();

const emit = defineEmits<{
  edit: [task: Task];
  delete: [task: Task];
  addChild: [parentId: number, depth: number];
  addRoot: [];
}>();

const { t } = useI18n();
</script>

<template>
  <div
    class="flex flex-col gap-1 rounded-l-3xl rounded-r-lg bg-violet-500/5 border border-violet-400/10 p-4 h-full min-h-0 overflow-y-scroll scrollbar backdrop-blur-xs"
  >
    <div class="flex items-center mb-3 px-2 justify-between">
      <div class="flex gap-2 items-center">
        <Icon name="lucide:network" class="text-violet-400 text-lg" />
        <h2
          class="text-lg font-semibold text-violet-100/80 uppercase tracking-wide"
        >
          {{ t("tree.title") }}
        </h2>
      </div>

      <button
        class="flex group items-center justify-center shrink-0 size-6 rounded-md hover:bg-violet-500/15 transition-all transition-mix duration-500 cursor-pointer hover:scale-125 hover:rotate-90"
        :title="t('tree.addRoot')"
        @click="emit('addRoot')"
      >
        <Icon
          name="lucide:plus"
          class="text-violet-300/70 text-md group-hover:text-violet-100 transition-colors ease-in-out duration-200"
        />
      </button>
    </div>

    <div
      v-if="tasks.length === 0"
      class="flex flex-col items-center justify-center py-12 gap-3 h-full"
    >
      <Icon name="lucide:folder-open" class="text-8xl text-violet-500" />
      <p class="text-4xl text-violet-200/70">{{ t("tree.empty") }}</p>
    </div>

    <TreeNode
      v-for="task in tasks"
      :key="task.id"
      :task="task"
      @edit="emit('edit', $event)"
      @delete="emit('delete', $event)"
      @add-child="(parentId, d) => emit('addChild', parentId, d)"
    />
  </div>
</template>
