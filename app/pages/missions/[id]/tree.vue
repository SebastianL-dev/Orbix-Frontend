<script setup lang="ts">
import TreeFlow from "~/components/tree/tree-flow.vue";
import Division from "~/components/ui/division.vue";
import TaskModal from "~/components/modals/task-modal.vue";
import PageHeaderSkeleton from "~/components/skeletons/page-header-skeleton.vue";
import type Tree from "~/interfaces/tree.interface";
import type Task from "~/interfaces/task.interface";

const config = useRuntimeConfig();
const route = useRoute();
const toast = useToast();
const { t } = useI18n();

const tree = ref<Tree | null>(null);
const loading = ref(true);
const mission = computed(() => tree.value?.mission);

const showTaskModal = ref(false);
const editingTask = ref<Task | undefined>();
const parentIdForNew = ref<number | null>(null);

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
    toast.error(err?.data?.error || err?.data?.message || err?.message || t("toast.error.tree"));
  } finally {
    loading.value = false;
  }
}

onMounted(fetchTree);

function openAddRoot() {
  editingTask.value = undefined;
  parentIdForNew.value = null;
  showTaskModal.value = true;
}

function onTaskSaved() {
  fetchTree();
  toast.success(t("toast.task.created"));
}
</script>

<template>
  <section class="py-8 mr-8 flex flex-col flex-1 gap-4">
    <template v-if="loading && !tree">
      <PageHeaderSkeleton />
      <Division />
      <div
        class="flex-1 rounded-2xl border border-violet-300/20 bg-violet-500/10 animate-pulse"
      />
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
          >{{ t("nav.hierarchy") }}</NuxtLink>
          <NuxtLink
            class="rounded-xl p-2 hover:scale-105 transition-mix"
            :class="$route.path.endsWith('tree') ? 'bg-violet-500/70' : ''"
            :to="`/missions/${mission?.id}/tree`"
          >{{ t("nav.tree") }}</NuxtLink>
        </div>
      </header>

      <Division />

      <ClientOnly>
        <div
          v-if="tree?.tree"
          class="flex-1 rounded-2xl border border-violet-300/20 bg-violet-500/10 overflow-hidden relative"
        >
          <button
            class="absolute top-3 right-3 z-10 p-2 rounded-lg bg-violet-500/20 hover:bg-violet-500/40 cursor-pointer transition-colors"
            :title="t('tree.addRoot')"
            @click="openAddRoot"
          >
            <Icon name="lucide:plus" class="text-sm text-violet-300" />
          </button>
          <TreeFlow :mission="tree.mission" :tasks="tree.tree" />
        </div>
      </ClientOnly>
    </template>
  </section>

  <TaskModal
    :show="showTaskModal"
    :mission-id="missionId"
    :parent-id="parentIdForNew"
    type="NODE"
    :task="editingTask"
    @close="showTaskModal = false"
    @saved="onTaskSaved"
  />
</template>
