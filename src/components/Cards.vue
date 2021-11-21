<template>
  <b-container>
    <b-row v-if="!$parent.$parent.$parent.loading">
        <h3 class="mt-3">
            {{this.majorCategory? "Food categories": (this.currentCategory? `${this.currentCategory}` :`Search results for \"${this.searchQuery}\".`)}}
        </h3>
        <a v-if="!this.majorCategory" @click="getCategories()" class="info mt-1" style="cursor:pointer;">see all categories</a>
        <div v-if="meals.length" class="mt-3">
        <b-row class="justify-content-md-center">
            <b-col col md="4" sm="6" xs="12" v-bind:key="data.index" v-for="data in meals">
                <b-card
                v-bind:title="data.strCategory"
                v-if="majorCategory"
                tag="article"
                style="max-width: 20rem;"
                class="mb-2 food-cart"
                no-body>
                    <b-card-img-lazy 
                        :src="data.strCategoryThumb"
                        img-alt="Image" 
                        img-top>
                    </b-card-img-lazy>
                    <div class="m-3">
                        <b-card-title>{{ data.strCategory }}</b-card-title>
                        <b-card-text>{{ `${data.strCategoryDescription.slice(0,100)}...` }}</b-card-text>
                        <b-button href="#" @click="getMealByCategory(data.strCategory)" variant="primary">View food</b-button>
                    </div>
                </b-card>
                <b-card
                v-else
                tag="article"
                style="max-width: 20rem;"
                class="mb-2 food-cart"
                no-body>
                    <b-card-img-lazy 
                        :src="data.strMealThumb"
                        img-alt="Image" 
                        img-top>
                    </b-card-img-lazy>
                    <div class="m-3">
                        <b-card-title>{{ data.strMeal }}</b-card-title>
                        <b-card-text v-if="data.strInstructions">{{ `${data.strInstructions.slice(0,100)}...` }}</b-card-text>
                        <b-button :href="`/recipe/${data.idMeal}`" variant="primary">View recipe</b-button>
                    </div>
                </b-card>
            </b-col>
        </b-row>
        </div>
        <div v-else class="mt-4">
        <h5>{{this.majorCategory? "No meals available yet": "No results."}} 😢</h5>
        </div>
    </b-row>
  </b-container>
</template>

<script>
import {eventBus} from "../main.js";
import axios from "axios";

export default {
  data() {
    return {
      meals: [],
      majorCategory: true,
      currentCategory: "",
      searchQuery: ""
    };
  },
  mounted() {
      this.getCategories();
  },
  created() {
    eventBus.$on('getMeal', (meal) => {
        this.getMeal(meal);
    })
    console.log('loading val:')
    console.log(this.$root.loading)
  },
  methods: {
    async getCategories() {
        eventBus.$emit('changeLoader', true);
        await axios
        .get("https://www.themealdb.com/api/json/v1/1/categories.php")
        .then(response => {
            this.majorCategory = true;
            this.meals = response.data.categories || [];
        })
        .catch(err => {
            console.log(err);
        })
        .finally(() => {
            setTimeout(() => {eventBus.$emit('changeLoader', false)}, 2000);
        });
    },
    async getMealByCategory(category) {
        eventBus.$emit('changeLoader', true);
        await axios
        .get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
        .then(response => {
            this.meals = response.data.meals || [];
            this.majorCategory = false;
            this.currentCategory = category;
            if (!this.meals.length) {eventBus.$emit('emptySearch')}
        })
        .catch(err => {
            console.log(err);
        })
        .finally(() => {
            setTimeout(() => {eventBus.$emit('changeLoader', false)}, 2000);
        });
    },
    async getMeal(meal) {
        eventBus.$emit('changeLoader', true);
        this.searchQuery = meal;
        this.currentCategory = "";

        await axios
        .get(`https://themealdb.com/api/json/v1/1/search.php?s=${meal}`)
        .then(response => {
            this.meals = response.data.meals || [];
            this.majorCategory = false;
            eventBus.$emit('emptySearch')
        })
        .catch(err => {
            console.log(err);
        })
        .finally(() => {
            setTimeout(() => {eventBus.$emit('changeLoader', false)}, 2000);
        });
    }
  }
};
</script>

<style scoped>

    .food-cart{
        min-height: 25rem;
        min-width: 10rem;
    }

</style>