<template>
    <v-layout class="overflow-visible" style="height: 56px;">
      <v-bottom-navigation
        v-model="value"
        color="teal"
        grow
      >
        <v-btn to="/mono">
          Mono
        </v-btn>
        <v-btn to="/favourite">
          Favorites
        </v-btn>
        <v-btn to="/custom">
          Custom
        </v-btn>
      </v-bottom-navigation>
    </v-layout>
  </template>
  <script setup>
  import { ref } from 'vue'

  const value = ref(1)
</script>

<script>
  export default {
    data: () => ({ value: 1 }),
  }
</script>