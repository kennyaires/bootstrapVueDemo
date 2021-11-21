import Meals from './Meals.vue'
import Recipe from './Recipe.vue'


export const routes = [
    {path: '/', component: Meals},
    {path: '/recipe/:id', component: Recipe}
];
