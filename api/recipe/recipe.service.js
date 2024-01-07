import mongodb from 'mongodb'
const { ObjectId } = mongodb

import { dbService } from '../../services/db.service.js'
import { logger } from '../../services/logger.service.js'
import { utilService } from '../../services/util.service.js'


export const recipeService = {
    remove,
    query,
    getById,
    add,
    update,
}


async function query({ byId }) {
    try {
        const criteria = {};
        if (byId) criteria['by._id'] = byId;
        // else if (wishlist) criteria['likedByUsers'] = { $elemMatch: { _id: wishlist } }
        // else {
        //     if (destinations) {
        //         criteria['$or'] = [];
        //         const caseInsensitiveRegex = new RegExp(destinations, 'i');
        //         criteria['$or'].push(
        //             { 'loc.country': { $regex: caseInsensitiveRegex } },
        //             { 'loc.city': { $regex: caseInsensitiveRegex } }
        //         );
        //     }
        //     if (guests) criteria['capacity.guests'] = { $gte: +guests.adults + +guests.children }
        //     if (label && label != 'All') criteria['labels'] = { $in: [label] }
        //     else if (label && label === 'All') criteria
        //     if (checkIn && checkOut) criteria['DateNotAvailable'] = { $nin: utilService.getDatesBetween(checkIn, checkOut) }
        // }

        const collection = await dbService.getCollection('recipe');
        const recipes = await collection.find(criteria).toArray();
        return recipes;
    } catch (err) {
        logger.error('Cannot find recipes', err);
        throw err;
    }
}




async function getById(recipeId) {
    try {
        const collection = await dbService.getCollection('recipe')
        const recipe = collection.findOne({ _id: ObjectId(recipeId) })
        return recipe
    } catch (err) {
        logger.error(`while finding recipe ${recipeId}`, err)
        throw err
    }
}

async function remove(recipeId) {
    try {
        const collection = await dbService.getCollection('recipe')
        await collection.deleteOne({ _id: ObjectId(recipeId) })
    } catch (err) {
        logger.error(`cannot remove recipe ${recipeId}`, err)
        throw err
    }
}

async function add(recipe) {
    try {
        const collection = await dbService.getCollection('recipe')
        await collection.insertOne(recipe)
        return recipe
    } catch (err) {
        logger.error('cannot insert recipe', err)
        throw err
    }
}

async function update({ _id, name, type, imgUrls, price, summary, capacity, amenities, labels, host, loc, reviews, likedByUsers, DateNotAvailable }) {
    try {
        const recipeToSave = { name, type, imgUrls, price, summary, capacity, amenities, labels, host, loc, reviews, likedByUsers, DateNotAvailable }
        const collection = await dbService.getCollection('recipe')
        await collection.updateOne({ _id: ObjectId(_id) }, { $set: recipeToSave })
        return recipeToSave
    } catch (err) {
        logger.error(`cannot update recipe ${_id}`, err)
        throw err
    }
}


