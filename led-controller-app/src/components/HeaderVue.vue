<template>
  <div>
    <v-toolbar
      prominent
    >
      <v-btn icon @click="toHome">
        <v-icon>mdi-home</v-icon>
      </v-btn>
      <v-toolbar-title>{{title}}</v-toolbar-title>

      </v-toolbar>
  </div>
</template>
<script>
  export default {
    name: 'HeaderVue',
    props: ['title'],
    data() {
      return {

      }
    },
    methods: {
      toHome(){
        this.$router.push('/')
      }
    }
  }
</script>