<script setup lang="ts">
import { AnimatePresence, motion } from "motion-v";
import IconButton from "~/components/buttons/icon-button.vue";
import MainButton from "~/components/buttons/main-button.vue";
import type Mission from "~/interfaces/mission.interface";

const props = defineProps<{ show: boolean; mission?: Mission }>();
const emit = defineEmits<{ close: []; saved: [] }>();

const config = useRuntimeConfig();
const toast = useToast();
const { t } = useI18n();

const name = ref("");
const description = ref("");
const loading = ref(false);

const isEdit = computed(() => !!props.mission);

watch(
  () => props.show,
  (val) => {
    if (val && props.mission) {
      name.value = props.mission.name;
      description.value = props.mission.description;
    } else if (val) {
      name.value = "";
      description.value = "";
    }
  },
);

async function submit() {
  if (!name.value.trim()) return;
  loading.value = true;

  try {
    if (isEdit.value && props.mission) {
      await $fetch(`${config.public.apiUrl}/missions/${props.mission.id}`, {
        method: "PUT",
        body: { name: name.value, description: description.value },
      });
    } else {
      await $fetch(`${config.public.apiUrl}/missions`, {
        method: "POST",
        body: { name: name.value, description: description.value },
      });
    }
    emit("saved");
    emit("close");
  } catch (err: any) {
    toast.error(err?.data?.error || err?.data?.message || err?.message || t("toast.error.mission.save"));
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
                {{ isEdit ? t("mission.edit") : t("mission.new") }}
              </h2>
              <span class="text-sm font-normal text-violet-200/60">
                {{ isEdit ? t("mission.edit.description") : t("mission.new.description") }}
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
                  for="mission_name"
                >{{ t("mission.name") }}</label>
                <input
                  id="mission_name"
                  v-model="name"
                  type="text"
                  :placeholder="t('mission.name.placeholder')"
                  required
                  class="w-full rounded-lg border border-violet-200/10 bg-violet-400/5 px-3 py-2 text-sm text-violet-100 placeholder-violet-200/25 outline-none focus:border-violet-400/40 transition-colors"
                />
              </div>

              <div class="flex flex-col gap-1.5">
                <label
                  class="text-xs font-semibold text-violet-100/50 w-fit"
                  for="mission_description"
                >{{ t("mission.description") }}</label>
                <textarea
                  id="mission_description"
                  v-model="description"
                  :placeholder="t('mission.description.placeholder')"
                  rows="4"
                  class="w-full rounded-lg border border-violet-200/10 bg-violet-400/5 px-3 py-2 text-sm text-violet-100 placeholder-violet-200/25 outline-none focus:border-violet-400/40 transition-colors resize-none scrollbar"
                />
              </div>
            </fieldset>

            <div class="flex justify-end gap-4">
              <MainButton
                @click="$emit('close')"
                type="button"
                variant="secondary"
              >{{ t("btn.cancel") }}</MainButton>

              <MainButton type="submit" :disabled="loading">
                {{ isEdit ? t("btn.save") : t("btn.create.mission") }}
              </MainButton>
            </div>
          </form>
        </motion.article>
      </div>
    </AnimatePresence>
  </Teleport>
</template>
