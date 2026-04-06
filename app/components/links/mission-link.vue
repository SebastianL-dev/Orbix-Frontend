<script setup lang="ts">
import type Mission from "~/interfaces/mission.interface";
import type Tree from "~/interfaces/tree.interface";

const props = defineProps<{
  mission: Mission;
}>();

const emit = defineEmits<{ edit: []; delete: [] }>();

const route = useRoute();
const config = useRuntimeConfig();

const tree = ref<Tree | null>(null);
const phases = computed(() => tree.value?.tree.length || 0);

onMounted(async () => {
  tree.value = await $fetch<Tree>(
    `${config.public.apiUrl}/missions/${props.mission.id}/tree`,
  );
});

const isActive = computed(() =>
  route.path.startsWith(`/missions/${props.mission.id}`),
);

const style = computed(() =>
  isActive.value
    ? "bg-violet-500/15 border-violet-500/80 shadow-lg shadow-violet-500/20"
    : "hover:bg-violet-500/20",
);
</script>

<template>
  <NuxtLink
    :to="`/missions/${mission.id}`"
    class="group/link flex flex-col gap-1 rounded-xl py-2 px-3 border border-transparent transition-mix hover:scale-105"
    :class="style"
  >
    <div class="flex items-center gap-1">
      <span
        class="text-sm text-ellipsis whitespace-nowrap overflow-hidden flex-1"
      >
        {{ mission.name }}
      </span>
      <div
        class="flex gap-1 opacity-0 group-hover/link:opacity-100 transition-opacity shrink-0"
      >
        <button
          class="p-1.5 flex rounded-lg hover:bg-violet-500/30 cursor-pointer transition-colors items-center h-fit"
          @click.prevent="emit('edit')"
        >
          <Icon name="lucide:pencil" class="text-xs text-violet-300/70" />
        </button>
        <button
          class="p-1.5 flex items-center rounded-lg hover:bg-red-500/20 cursor-pointer transition-colors"
          @click.prevent="emit('delete')"
        >
          <Icon name="lucide:trash-2" class="text-xs text-red-400/70" />
        </button>
      </div>
    </div>
    <p
      class="text-xs text-violet-200/60 text-ellipsis whitespace-nowrap overflow-hidden"
    >
      {{ mission.description }}
    </p>
    <span
      class="mt-2 text-violet-300/50 text-xs text-ellipsis whitespace-nowrap overflow-hidden"
    >
      {{ phases }} phases
    </span>
  </NuxtLink>
</template>
