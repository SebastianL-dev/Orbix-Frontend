<script setup>
const error = useError();
</script>

<template>
  <main class="w-full h-screen">
    <div class="p-10">
      <h1 class="text-3xl font-bold">Error {{ error.status }}</h1>
      <p>{{ error.message }}</p>
    </div>
  </main>
</template>
