<template>
  <div
    class="flex flex-col gap-1 rounded-l-3xl rounded-r-lg bg-violet-500/5 border border-violet-400/10 p-4 h-full min-h-0 backdrop-blur-xs animate-pulse"
  >
    <div class="flex items-center gap-2 mb-3 px-2">
      <div class="h-5 w-5 rounded bg-violet-500/15" />
      <div class="h-5 w-24 rounded bg-violet-500/15" />
    </div>

    <div v-for="i in 3" :key="i" class="flex flex-col gap-2 mb-2">
      <div class="flex items-center gap-3 px-4 py-3">
        <div class="w-6 h-6 rounded-lg bg-violet-500/10" />
        <div class="flex flex-col gap-1.5 flex-1">
          <div class="flex items-center gap-2">
            <div class="h-4 w-32 rounded bg-violet-500/15" />
            <div class="h-5 w-16 rounded-full bg-violet-500/10" />
          </div>
          <div class="flex gap-3">
            <div class="h-3 w-12 rounded bg-violet-500/10" />
            <div class="h-3 w-14 rounded bg-violet-500/10" />
            <div class="h-3 w-16 rounded bg-violet-500/10" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
