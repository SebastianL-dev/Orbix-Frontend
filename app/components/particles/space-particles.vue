<script setup lang="ts">
const options = {
  fullScreen: false,
  fpsLimit: 60,
  particles: {
    number: {
      value: 200,
      density: {
        enable: true,
        width: 1920,
        height: 1080,
      },
    },
    color: {
      value: ["#ffffff", "#c4b5fd", "#a78bfa"],
    },
    shape: {
      type: "circle",
    },
    opacity: {
      value: { min: 0.1, max: 0.5 },
      animation: {
        enable: true,
        speed: 0.8,
        startValue: "random",
        sync: false,
      },
    },
    size: {
      value: { min: 0.5, max: 2 },
      animation: {
        enable: true,
        speed: 1.5,
        startValue: "random",
        sync: false,
      },
    },
    links: {
      enable: false,
    },
    move: {
      enable: true,
      speed: 0.3,
      direction: "none" as const,
      random: true,
      straight: false,
      outModes: {
        default: "out" as const,
      },
    },
  },
  interactivity: {
    events: {
      onHover: {
        enable: true,
        mode: "bubble",
      },
    },
    modes: {
      bubble: {
        distance: 150,
        size: 5,
        duration: 2,
        opacity: 0.5,
        color: "#a78bfa",
      },
    },
  },
  detectRetina: true,
};
</script>

<template>
  <vue-particles
    id="space-particles"
    class="absolute inset-0 w-full h-full pointer-events-auto"
    :options="options"
  />
</template>
