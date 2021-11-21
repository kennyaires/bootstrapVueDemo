<template>
  <b-container>
    <b-row class="mt-2 mb-3" v-if="!$parent.loading">
        <a href="/" class="mt-1">see all categories</a>
        <b-card no-body class="overflow-hidden">
            <b-row no-gutters>
                <b-col md="6">
                    <b-card-img :src="meal.strMealThumb" alt="Image" class="rounded-0"></b-card-img>
                </b-col>
                <b-col md="6">
                    <b-card-body :title="meal.strMeal">
                    <b-card-text>
                        {{ meal.strInstructions }}
                    </b-card-text>
                    <b-card-title>
                        Ingredients
                    </b-card-title>
                    <ul>
                        <li v-for="(ingredient, index) in getIngredients(meal)" v-bind:key="`ingredient-${index}`">
                            {{ ingredient }}
                        </li>
                    </ul>
                    <b-link v-if="meal.strYoutube" :href="meal.strYoutube" target="_blank">
                        Recipe video
                    </b-link>
                    </b-card-body>
                </b-col>
            </b-row>
        </b-card>
    </b-row>
  </b-container>
</template>
<script>
import {eventBus} from "./main.js";
import axios from "axios";

export default {
    name: 'Recipe',
    data() {
        return {
         meal: null
        };
    },
    mounted() {
      this.getMeal();
    },
  methods: {
        async getMeal() {
            eventBus.$emit('changeLoader', true);
            await axios
            .get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${this.$router.currentRoute.params.id}`)
            .then(response => {
                this.meal = response.data.meals[0];
            })
            .catch(err => {
                console.log(err);
            })
            .finally(() => {
                setTimeout(() => {eventBus.$emit('changeLoader', false)}, 2000);
            });
        },
        getIngredients(data) {
            let ingredients = [];
            for(let i=0; i<=20; i++){
                if(data[`strIngredient${i}`]){
                    let ingredient = data[`strIngredient${i}`]
                    if(data[`strMeasure${i}`]){ingredient += ` (${data[`strMeasure${i}`]})`}
                    ingredients.push(ingredient)
                }
            }
            return ingredients;
        }
    }
}
</script>