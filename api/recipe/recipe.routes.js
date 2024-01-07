import express from 'express'
import { addRecipe, getRecipeById, getRecipes, removeRecipe, updateRecipe } from './recipe.controller.js'

export const recipesRoute = express.Router()

recipesRoute.get('/', getRecipes)
recipesRoute.get('/:id', getRecipeById)
recipesRoute.post('/', addRecipe)
recipesRoute.put('/', updateRecipe)
recipesRoute.delete('/:id', removeRecipe)

