<script setup>



/*
const pages = ['/', '/hello', '/world', '/vue'];
 <ul>
      <li v-for="page of pages">
        <NuxtLink :to="page">{{ page }}</NuxtLink>
      </li>
    </ul> 
*/
</script>

<template>
  <NuxtLayout>
    <NuxtLoadingIndicator />
    <NuxtPage />
  </NuxtLayout>
</template>
