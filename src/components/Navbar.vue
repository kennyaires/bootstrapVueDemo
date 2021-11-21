<template>
    <div>
      <b-navbar toggleable="lg" type="dark" variant="success">
        <b-container>
            <b-navbar-brand href="#">Mealzers</b-navbar-brand>
            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
            <b-collapse id="nav-collapse" is-nav>
              <!-- Right aligned nav items -->
              <b-navbar-nav class="ms-auto">
                <b-form class="d-flex">
                  <b-form-input 
                    size="sm" 
                    class="me-sm-2" 
                    placeholder="Search for a meal"
                    v-model="meal"
                    ></b-form-input>
                  <b-button 
                    size="sm" 
                    class="my-sm-0" 
                    type="submit" 
                    @click.prevent="getMeal">Search</b-button>
                </b-form>
                <b-nav-item-dropdown right>
                  <!-- Using 'button-content' slot -->
                  <template slot="button-content"><em>User</em></template>
                  <b-dropdown-item href="#">Profile</b-dropdown-item>
                  <b-dropdown-item href="#">Sign Out</b-dropdown-item>
                </b-nav-item-dropdown>
              </b-navbar-nav>
            </b-collapse>
          </b-container>
      </b-navbar>
    </div>  
</template>
<script>
import {eventBus} from "../main.js";

export default {
    data() {
        return {
            meal: ''
        }
    },
  created() {
    eventBus.$on('emptySearch', () => {
        this.meal = '';
    })
  },
  methods: {
    getMeal() {
        eventBus.$emit('getMeal', this.meal);
        this.$router.push('/')
    }
  }
}    
</script>