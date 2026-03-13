<script setup lang="ts">
defineEmits<{
  click: [];
}>();
</script>

<template>
  <button
    @click="$emit('click')"
    class="flex group items-center justify-center shrink-0 size-6 rounded-md hover:bg-violet-500/15 transition-all transition-mix duration-500 cursor-pointer hover:scale-125 hover:rotate-90"
  >
    <slot />
  </button>
</template>
