<script setup lang="ts">
import { ref } from "vue";
import { AnimatePresence, motion } from "motion-v";
import Division from "~/components/ui/division.vue";
import SidebarToggle from "../buttons/sidebar-toggle.vue";
import IconButton from "~/components/buttons/icon-button.vue";
import MissionModal from "~/components/modals/mission-modal.vue";

const isOpen = ref(true);
const showModal = ref(false);

function toggle() {
  isOpen.value = !isOpen.value;
}
</script>

<template>
  <motion.aside
    :animate="{ width: isOpen ? '18rem' : '4.5rem' }"
    :transition="{ duration: 0.3, ease: 'easeInOut' }"
    class="bg-violet-500/10 px-4 py-6 h-full border-r border-violet-200/10 flex flex-col gap-4 overflow-hidden backdrop-blur-[3px]"
  >
    <div class="flex items-center text-2xl gap-3">
      <div class="flex bg-violet-500/15 p-2 rounded-xl shrink-0">
        <Icon class="text-violet-500" name="lucide:rocket" />
      </div>
      <AnimatePresence>
        <motion.span
          v-if="isOpen"
          :initial="{ opacity: 0, x: -10 }"
          :animate="{ opacity: 1, x: 0 }"
          :exit="{ opacity: 0, x: -10 }"
          :transition="{ duration: 0.2 }"
          class="font-bold whitespace-nowrap"
        >
          Orbix
        </motion.span>
      </AnimatePresence>
    </div>

    <Division />

    <div>
      <div class="flex items-center">
        <AnimatePresence>
          <motion.span
            v-if="isOpen"
            :initial="{ opacity: 0, width: 0 }"
            :animate="{ opacity: 1, width: 'auto' }"
            :exit="{ opacity: 0, width: 0 }"
            :transition="{ duration: 0.3, ease: 'easeInOut' }"
            class="font-semibold text-xs text-violet-200/50 whitespace-nowrap"
          >
            MISSIONS
          </motion.span>
        </AnimatePresence>

        <IconButton
          :class="isOpen ? 'ml-auto' : 'mx-auto'"
          @click="showModal = true"
        >
          <Icon
            class="text-violet-300/70 text-md group-hover:text-violet-100 transition-colors ease-in-out duration-200"
            name="lucide:plus"
          />
        </IconButton>
      </div>

      <ul></ul>
    </div>

    <div class="mt-auto flex flex-col gap-2">
      <Division />
      <SidebarToggle :is-open="isOpen" @toggle="toggle" />
    </div>
  </motion.aside>

  <MissionModal :show="showModal" @close="showModal = false" />
</template>
