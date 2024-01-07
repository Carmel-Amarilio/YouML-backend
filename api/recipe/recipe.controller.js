import { logger } from "../../services/logger.service.js"
import { socketService } from "../../services/socket.service.js"
import { recipeService } from "./recipe.service.js"

export async function getRecipes(req, res) {
console.log( req.query);
    try {
        const filterBy = {
            byId: req.query.byId || null,
        }
        logger.debug('Getting Recipes', filterBy)
        const recipes = await recipeService.query(filterBy)
        res.json(recipes)
    } catch (err) {
        logger.error('Failed to get recipes', err)
        res.status(500).send({ err: 'Failed to get recipes' })
    }
}

export async function getRecipeById(req, res) {

    try {
        const recipeId = req.params.id
        const recipe = await recipeService.getById(recipeId)
        res.json(recipe)
    } catch (err) {
        logger.error('Failed to get recipe', err)
        res.status(500).send({ err: 'Failed to get recipe' })
    }
}

export async function addRecipe(req, res) {
    const { loggedinUser } = req
    try {
        const recipe = req.body
        const addedRecipe = await recipeService.add(recipe)
        // socketService.broadcast({ type: 'toy-added', data: toy, userId: loggedinUser._id })
        res.json(addedRecipe)
    } catch (err) {
        logger.error('Failed to add recipe', err)
        res.status(500).send({ err: 'Failed to add recipe' })
    }
}

export async function updateRecipe(req, res) {
    try {
        const recipe = req.body
        const updatedRecipe = await recipeService.update(recipe)
        res.json(updatedRecipe)
    } catch (err) {
        logger.error('Failed to update recipe', err)
        res.status(500).send({ err: 'Failed to update recipe' })
    }
}

export async function removeRecipe(req, res) {
    const { loggedinUser } = req
    try {
        const recipeId = req.params.id
        await recipeService.remove(recipeId)
        // socketService.broadcast({ type: 'toy-remove', data: toyId, userId: loggedinUser._id })
        res.send()
    } catch (err) {
        logger.error('Failed to remove recipe', err)
        res.status(500).send({ err: 'Failed to remove recipe' })
    }
}

