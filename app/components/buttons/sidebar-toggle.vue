<script setup lang="ts">
import { Motion, AnimatePresence, motion } from "motion-v";
import MainButton from "~/components/buttons/main-button.vue";

defineProps<{
  isOpen: boolean;
}>();

defineEmits<{
  toggle: [];
}>();
</script>

<template>
  <MainButton
    @click="$emit('toggle')"
    variant="secondary"
    :class="isOpen ? 'w-full hover:scale-105!' : 'w-fit justify-center'"
    class="px-2.25!"
  >
    <Motion
      :animate="{ rotate: isOpen ? 0 : 180 }"
      :transition="{ duration: 0.5, ease: 'backInOut' }"
      class="flex shrink-0"
    >
      <Icon class="bg-violet-300/70 text-xl" name="lucide:panel-left-close" />
    </Motion>
    <AnimatePresence>
      <motion.span
        v-if="isOpen"
        :initial="{ opacity: 0, x: -10 }"
        :animate="{ opacity: 1, x: 0 }"
        :exit="{ opacity: 0, x: -10 }"
        :transition="{ duration: 0.2 }"
        class="text-sm text-violet-300/70 whitespace-nowrap"
      >
        Collapse
      </motion.span>
    </AnimatePresence>
  </MainButton>
</template>
