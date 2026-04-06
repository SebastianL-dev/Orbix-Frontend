<script setup lang="ts">
import { AnimatePresence, motion } from "motion-v";

defineProps<{ show: boolean; statusCode?: number; message: string }>();
const emit = defineEmits<{ close: [] }>();
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
          @click="emit('close')"
        />

        <motion.article
          :initial="{ opacity: 0, scale: 0.85 }"
          :animate="{ opacity: 1, scale: 1 }"
          :exit="{ opacity: 0, scale: 0.85 }"
          :transition="{ duration: 0.25, ease: 'easeOut' }"
          class="relative w-full max-w-sm rounded-2xl border border-red-400/20 bg-red-500/10 backdrop-blur-xl p-6 shadow-2xl flex flex-col gap-6 items-center text-center"
        >
          <div
            class="flex items-center justify-center w-14 h-14 rounded-full bg-red-500/20"
          >
            <Icon
              name="lucide:triangle-alert"
              class="text-3xl text-red-400"
            />
          </div>

          <div class="flex flex-col gap-1">
            <h2 class="text-xl font-bold text-red-100">Error</h2>
            <span
              v-if="statusCode"
              class="text-xs font-semibold text-red-400/70"
            >
              Status {{ statusCode }}
            </span>
            <p class="text-sm text-red-200/70">{{ message }}</p>
          </div>

          <button
            class="px-4 py-3 rounded-xl hover:scale-110 text-sm cursor-pointer transition-mix font-semibold bg-red-500/60 text-red-100 hover:bg-red-500 hover:text-white"
            @click="emit('close')"
          >
            Close
          </button>
        </motion.article>
      </div>
    </AnimatePresence>
  </Teleport>
</template>
