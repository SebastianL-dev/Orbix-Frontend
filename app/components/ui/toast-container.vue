<script setup lang="ts">
import { AnimatePresence, motion } from "motion-v";

const { toasts, remove } = useToast();
</script>

<template>
  <Teleport to="body">
    <div class="fixed bottom-6 right-6 z-[100] flex flex-col gap-3">
      <AnimatePresence>
        <motion.div
          v-for="toast in toasts"
          :key="toast.id"
          :initial="{ opacity: 0, y: 20, scale: 0.95 }"
          :animate="{ opacity: 1, y: 0, scale: 1 }"
          :exit="{ opacity: 0, x: 80 }"
          :transition="{ duration: 0.25, ease: 'easeOut' }"
          class="flex items-center gap-3 px-4 py-3 rounded-xl border backdrop-blur-xl shadow-xl cursor-pointer min-w-64 max-w-sm"
          :class="
            toast.type === 'success'
              ? 'bg-green-500/15 border-green-400/20'
              : 'bg-red-500/15 border-red-400/20'
          "
          @click="remove(toast.id)"
        >
          <Icon
            :name="
              toast.type === 'success'
                ? 'lucide:check-circle'
                : 'lucide:triangle-alert'
            "
            class="text-lg shrink-0"
            :class="
              toast.type === 'success' ? 'text-green-400' : 'text-red-400'
            "
          />
          <span
            class="text-sm"
            :class="
              toast.type === 'success'
                ? 'text-green-100'
                : 'text-red-100'
            "
          >
            {{ toast.message }}
          </span>
        </motion.div>
      </AnimatePresence>
    </div>
  </Teleport>
</template>
