<script setup lang="ts">
import { AnimatePresence, motion } from "motion-v";
import IconButton from "~/components/buttons/icon-button.vue";
import MainButton from "~/components/buttons/main-button.vue";
import CustomSelect from "~/components/ui/custom-select.vue";
import type Task from "~/interfaces/task.interface";

const statusOptions = [
  { value: "PENDING", label: "Pending", color: "#a1a1aa" },
  { value: "IN_PROGRESS", label: "In Progress", color: "#fcd34d" },
  { value: "COMPLETED", label: "Completed", color: "#22c55e" },
];

const props = defineProps<{
  show: boolean;
  missionId: number;
  parentId?: number | null;
  type?: string;
  task?: Task;
}>();

const emit = defineEmits<{ close: []; saved: [] }>();

const config = useRuntimeConfig();
const toast = useToast();

const name = ref("");
const duration = ref(0);
const cost = ref(0);
const status = ref("PENDING");
const loading = ref(false);

const isEdit = computed(() => !!props.task);

watch(
  () => props.show,
  (val) => {
    if (val && props.task) {
      name.value = props.task.name;
      duration.value = props.task.duration;
      cost.value = props.task.cost;
      status.value = props.task.status;
    } else if (val) {
      name.value = "";
      duration.value = 0;
      cost.value = 0;
      status.value = "PENDING";
    }
  },
);

async function submit() {
  if (!name.value.trim()) return;
  loading.value = true;

  try {
    if (isEdit.value && props.task) {
      await $fetch(`${config.public.apiUrl}/tasks/${props.task.id}`, {
        method: "PUT",
        body: {
          name: name.value,
          duration: duration.value,
          cost: cost.value,
          status: status.value,
        },
      });
    } else {
      await $fetch(
        `${config.public.apiUrl}/missions/${props.missionId}/tasks`,
        {
          method: "POST",
          body: {
            parentId: props.parentId ?? null,
            name: name.value,
            type: props.type ?? "NODE",
            duration: duration.value,
            cost: cost.value,
            status: status.value,
          },
        },
      );
    }
    emit("saved");
    emit("close");
  } catch (err: any) {
    toast.error(err?.data?.error || err?.data?.message || err?.message || "Failed to save task");
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <Teleport to="body">
    <AnimatePresence>
      <div
        v-if="show"
        class="fixed inset-0 z-50 flex items-center justify-center"
      >
        <motion.div
          :initial="{ opacity: 0 }"
          :animate="{ opacity: 1 }"
          :exit="{ opacity: 0 }"
          :transition="{ duration: 0.2 }"
          class="absolute inset-0 bg-black/15 backdrop-blur-sm"
          @click="$emit('close')"
        />

        <motion.article
          :initial="{ opacity: 0, scale: 0.85, y: 0 }"
          :animate="{ opacity: 1, scale: 1, y: 0 }"
          :exit="{ opacity: 0, scale: 0.85, y: 0 }"
          :transition="{ duration: 0.25, ease: 'easeOut' }"
          class="relative w-full max-w-md rounded-2xl border border-violet-200/10 bg-violet-500/10 backdrop-blur-xl p-6 shadow-2xl flex flex-col gap-8"
        >
          <div class="flex items-center justify-between">
            <div class="flex flex-col gap-0.5">
              <h2 class="text-2xl font-bold text-violet-100">
                {{ isEdit ? "Edit Task" : "New Task" }}
              </h2>
              <span class="text-sm font-normal text-violet-200/60">
                {{
                  isEdit
                    ? "Update this task's details."
                    : "Add a new task to the mission."
                }}
              </span>
            </div>

            <IconButton @click="$emit('close')">
              <Icon
                class="text-violet-300/70 text-md group-hover:text-violet-100 transition-colors ease-in-out duration-200 p-2"
                name="lucide:x"
              />
            </IconButton>
          </div>

          <form class="flex flex-col gap-8" @submit.prevent="submit">
            <fieldset class="flex flex-col gap-4">
              <div class="flex flex-col gap-1.5">
                <label
                  class="text-xs font-semibold text-violet-100/50 w-fit"
                  for="task_name"
                  >NAME</label
                >
                <input
                  id="task_name"
                  v-model="name"
                  type="text"
                  placeholder="Pre-flight review..."
                  required
                  class="w-full rounded-lg border border-violet-200/10 bg-violet-400/5 px-3 py-2 text-sm text-violet-100 placeholder-violet-200/25 outline-none focus:border-violet-400/40 transition-colors"
                />
              </div>

              <div class="grid grid-cols-2 gap-4">
                <div class="flex flex-col gap-1.5">
                  <label
                    class="text-xs font-semibold text-violet-100/50 w-fit"
                    for="task_duration"
                    >DURATION (hours)</label
                  >
                  <input
                    id="task_duration"
                    v-model.number="duration"
                    type="number"
                    min="0"
                    class="w-full rounded-lg border border-violet-200/10 bg-violet-400/5 px-3 py-2 text-sm text-violet-100 placeholder-violet-200/25 outline-none focus:border-violet-400/40 transition-colors"
                  />
                </div>

                <div class="flex flex-col gap-1.5">
                  <label
                    class="text-xs font-semibold text-violet-100/50 w-fit"
                    for="task_cost"
                    >COST</label
                  >
                  <input
                    id="task_cost"
                    v-model.number="cost"
                    type="number"
                    min="0"
                    class="w-full rounded-lg border border-violet-200/10 bg-violet-400/5 px-3 py-2 text-sm text-violet-100 placeholder-violet-200/25 outline-none focus:border-violet-400/40 transition-colors"
                  />
                </div>
              </div>

              <div class="flex flex-col gap-1.5">
                <label class="text-xs font-semibold text-violet-100/50 w-fit">
                  STATUS
                </label>
                <CustomSelect
                  v-model="status"
                  :options="statusOptions"
                />
              </div>
            </fieldset>

            <div class="flex justify-end gap-4">
              <MainButton
                @click="$emit('close')"
                type="button"
                variant="secondary"
                >Cancel</MainButton
              >

              <MainButton type="submit" :disabled="loading">
                {{ isEdit ? "Save Changes" : "Create Task" }}
              </MainButton>
            </div>
          </form>
        </motion.article>
      </div>
    </AnimatePresence>
  </Teleport>
</template>
