<script setup lang="ts">
const props = defineProps({
  variant: {
    type: String,
    default: "primary",
  },
});

defineEmits<{
  click: [];
}>();

const { variant } = props;

const style =
  variant === "primary"
    ? "bg-violet-500/25 text-violet-200 hover:bg-violet-500/35"
    : "text-violet-200/70 hover:bg-violet-500/10";
</script>

<template>
  <button
    @click="$emit('click')"
    class="px-4 py-3 rounded-xl hover:scale-110 text-sm cursor-pointer transition-mix flex items-center gap-3"
    :class="style"
  >
    <slot />
  </button>
</template>
