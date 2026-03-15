<script setup lang="ts">
import { ref } from "vue";
import { AnimatePresence, motion } from "motion-v";
import Division from "~/components/ui/division.vue";
import SidebarToggle from "../buttons/sidebar-toggle.vue";
import IconButton from "~/components/buttons/icon-button.vue";
import MissionModal from "~/components/modals/mission-modal.vue";
import type Mission from "~/interfaces/mission.interface";
import MissionLink from "../links/mission-link.vue";

const config = useRuntimeConfig();

const { data: missions } = await useFetch<Mission[]>(
  `${config.public.api_url}/missions`,
);

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
    class="bg-violet-500/10 py-6 h-full border-r border-violet-200/10 flex flex-col gap-4 overflow-hidden backdrop-blur-xs w-72"
  >
    <div class="flex items-center text-2xl gap-3 px-4">
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

    <Division class="mx-4" />

    <div class="flex flex-col gap-2 h-full min-h-0 relative">
      <div class="flex items-center px-4">
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

      <ul
        class="flex flex-col gap-4 flex-1 min-h-0 [scrollbar-gutter:stable] overflow-y-auto pt-2 pb-16 pr-3 pl-2 mr-4 ml-2 scrollbar-thin mission-list"
      >
        <li v-for="mission in missions" :key="mission.id">
          <MissionLink :mission="mission" />
        </li>
      </ul>
    </div>

    <div class="flex flex-col gap-2 px-4">
      <Division />
      <SidebarToggle :is-open="isOpen" @toggle="toggle" />
    </div>
  </motion.aside>

  <MissionModal :show="showModal" @close="showModal = false" />
</template>
