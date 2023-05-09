<script setup>
const { slug } = useRoute().params;

// Wait 1 second
if (slug) {
  await new Promise((resolve) => setTimeout(resolve, 1000));
}
</script>

<template>
  <div>
    <h1>{{ slug || '/' }}</h1>
  </div>
</template>
