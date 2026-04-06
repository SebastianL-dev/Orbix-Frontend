<script setup lang="ts">
import { AnimatePresence, motion } from "motion-v";

interface Option {
  value: string;
  label: string;
  color?: string;
}

const props = defineProps<{
  modelValue: string;
  options: Option[];
}>();

const emit = defineEmits<{ "update:modelValue": [value: string] }>();

const isOpen = ref(false);
const selectRef = ref<HTMLElement>();

const selected = computed(
  () => props.options.find((o) => o.value === props.modelValue) ?? props.options[0],
);

function select(option: Option) {
  emit("update:modelValue", option.value);
  isOpen.value = false;
}

function onClickOutside(e: MouseEvent) {
  if (selectRef.value && !selectRef.value.contains(e.target as Node)) {
    isOpen.value = false;
  }
}

onMounted(() => document.addEventListener("click", onClickOutside));
onUnmounted(() => document.removeEventListener("click", onClickOutside));
</script>

<template>
  <div ref="selectRef" class="relative">
    <button
      type="button"
      class="w-full flex items-center justify-between gap-2 rounded-lg border border-violet-200/10 bg-violet-400/5 px-3 py-2 text-sm text-violet-100 outline-none focus:border-violet-400/40 transition-colors cursor-pointer"
      @click="isOpen = !isOpen"
    >
      <div class="flex items-center gap-2">
        <div
          v-if="selected.color"
          class="w-2 h-2 rounded-full shrink-0"
          :style="{ background: selected.color }"
        />
        <span>{{ selected.label }}</span>
      </div>
      <Icon
        name="lucide:chevron-down"
        class="text-xs text-violet-300/50 transition-transform duration-200"
        :class="{ 'rotate-180': isOpen }"
      />
    </button>

    <AnimatePresence>
      <motion.div
        v-if="isOpen"
        :initial="{ opacity: 0, y: -4 }"
        :animate="{ opacity: 1, y: 0 }"
        :exit="{ opacity: 0, y: -4 }"
        :transition="{ duration: 0.15 }"
        class="absolute z-50 mt-1 w-full rounded-lg border border-violet-200/10 bg-violet-950/90 backdrop-blur-xl shadow-xl overflow-hidden"
      >
        <button
          v-for="option in options"
          :key="option.value"
          type="button"
          class="w-full flex items-center gap-2 px-3 py-2.5 text-sm transition-colors cursor-pointer"
          :class="
            option.value === modelValue
              ? 'bg-violet-500/20 text-violet-100'
              : 'text-violet-200/70 hover:bg-violet-500/10 hover:text-violet-100'
          "
          @click="select(option)"
        >
          <div
            v-if="option.color"
            class="w-2 h-2 rounded-full shrink-0"
            :style="{ background: option.color }"
          />
          <span>{{ option.label }}</span>
          <Icon
            v-if="option.value === modelValue"
            name="lucide:check"
            class="text-xs text-violet-400 ml-auto"
          />
        </button>
      </motion.div>
    </AnimatePresence>
  </div>
</template>
