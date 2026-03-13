<script setup lang="ts">
import { AnimatePresence, motion } from "motion-v";
import IconButton from "~/components/buttons/icon-button.vue";
import MainButton from "~/components/buttons/main-button.vue";

defineProps<{ show: boolean }>();

defineEmits<{ close: [] }>();
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
              <h2 class="text-2xl font-bold text-violet-100">New Mission</h2>
              <span class="text-sm font-normal text-violet-200/60"
                >Create a new mission in Orbix space app.</span
              >
            </div>

            <IconButton @click="$emit('close')">
              <Icon
                class="text-violet-300/70 text-md group-hover:text-violet-100 transition-colors ease-in-out duration-200 p-2"
                name="lucide:x"
              />
            </IconButton>
          </div>

          <form class="flex flex-col gap-8" type="submit" method="POST">
            <fieldset class="flex flex-col gap-4">
              <div class="flex flex-col gap-1.5">
                <label
                  class="text-xs font-semibold text-violet-100/50 w-fit"
                  for="mission_name"
                  >MISSION NAME</label
                >
                <input
                  id="mission_name"
                  type="text"
                  placeholder="Artemis III..."
                  required
                  class="w-full rounded-lg border border-violet-200/10 bg-violet-400/5 px-3 py-2 text-sm text-violet-100 placeholder-violet-200/25 outline-none focus:border-violet-400/40 transition-colors"
                />
              </div>

              <div class="flex flex-col gap-1.5">
                <label
                  class="text-xs font-semibold text-violet-100/50 w-fit"
                  for="mission_description"
                  >DESCRIPTION</label
                >
                <textarea
                  id="mission_description"
                  placeholder="Describe your mission..."
                  rows="4"
                  class="w-full rounded-lg border border-violet-200/10 bg-violet-400/5 px-3 py-2 text-sm text-violet-100 placeholder-violet-200/25 outline-none focus:border-violet-400/40 transition-colors resize-none"
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

              <MainButton>Create Mission</MainButton>
            </div>
          </form>
        </motion.article>
      </div>
    </AnimatePresence>
  </Teleport>
</template>
