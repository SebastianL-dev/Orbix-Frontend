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
    ? "bg-violet-500/60 text-violet-100 hover:bg-violet-500 hover:text-white"
    : "text-violet-200/70 hover:bg-violet-500/20 hover:text-violet-50";
</script>

<template>
  <button
    @click="$emit('click')"
    class="px-4 py-3 rounded-xl hover:scale-110 text-sm cursor-pointer transition-mix font-semibold flex items-center gap-3"
    :class="style"
  >
    <slot />
  </button>
</template>
