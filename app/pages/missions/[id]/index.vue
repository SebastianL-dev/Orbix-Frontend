<script setup lang="ts">
import Division from "~/components/ui/division.vue";
import MissionTree from "~/components/tree/mission-tree.vue";
import TaskModal from "~/components/modals/task-modal.vue";
import PageHeaderSkeleton from "~/components/skeletons/page-header-skeleton.vue";
import TreeSkeleton from "~/components/skeletons/tree-skeleton.vue";
import type Tree from "~/interfaces/tree.interface";
import type Task from "~/interfaces/task.interface";

const config = useRuntimeConfig();
const route = useRoute();
const toast = useToast();

const tree = ref<Tree | null>(null);
const loading = ref(true);
const mission = computed(() => tree.value?.mission);
const tasks = computed(() => tree.value?.tree ?? []);

const showTaskModal = ref(false);
const editingTask = ref<Task | undefined>();
const parentIdForNew = ref<number | null>(null);
const taskType = ref("NODE");

const missionId = computed(() => {
  const id = route.params.id;
  return Number(Array.isArray(id) ? id[0] : id);
});

async function fetchTree() {
  loading.value = true;
  try {
    tree.value = await $fetch<Tree>(
      `${config.public.apiUrl}/missions/${missionId.value}/tree`,
    );
  } catch (err: any) {
    toast.error(err?.data?.error || err?.data?.message || err?.message || "Failed to load tree");
  } finally {
    loading.value = false;
  }
}

onMounted(fetchTree);

function openAddRoot() {
  editingTask.value = undefined;
  parentIdForNew.value = null;
  taskType.value = "NODE";
  showTaskModal.value = true;
}

function openAddChild(parentId: number, depth: number) {
  editingTask.value = undefined;
  parentIdForNew.value = parentId;
  taskType.value = depth >= 1 ? "TASK" : "NODE";
  showTaskModal.value = true;
}

function openEdit(task: Task) {
  editingTask.value = task;
  parentIdForNew.value = null;
  showTaskModal.value = true;
}

function onTaskSaved() {
  fetchTree();
  toast.success(editingTask.value ? "Task updated" : "Task created");
}

async function deleteTask(task: Task) {
  try {
    await $fetch(`${config.public.apiUrl}/tasks/${task.id}`, {
      method: "DELETE",
    });
    toast.success("Task deleted");
    await fetchTree();
  } catch (err: any) {
    toast.error(err?.data?.error || err?.data?.message || err?.message || "Failed to delete task");
  }
}
</script>

<template>
  <section class="py-8 mr-8 flex flex-col flex-1 gap-4">
    <template v-if="loading && !tree">
      <PageHeaderSkeleton />
      <Division />
      <TreeSkeleton />
    </template>

    <template v-else>
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

      <MissionTree
        :tasks="tasks"
        @add-root="openAddRoot"
        @add-child="openAddChild"
        @edit="openEdit"
        @delete="deleteTask"
      />
    </template>
  </section>

  <TaskModal
    :show="showTaskModal"
    :mission-id="missionId"
    :parent-id="parentIdForNew"
    :type="taskType"
    :task="editingTask"
    @close="showTaskModal = false"
    @saved="onTaskSaved"
  />
</template>
