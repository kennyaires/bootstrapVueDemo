<template>
  <div id="app">
    <Navbar />
    <Loader />
    <router-view> </router-view>
  </div>
</template>
<script>
  import Navbar from './components/Navbar.vue';  
  import Loader from './components/Loader.vue'
  import {eventBus} from "./main.js";
  export default {
    name: 'app',
    components: {
      Navbar,
      Loader
    },
    data() {
        return {
          loading: true
      }
    },
    created() {
      eventBus.$on('changeLoader', (bool) => {
          this.loading = bool;
          console.log(`triggered ${bool}`)
      })
    }
  }
</script>