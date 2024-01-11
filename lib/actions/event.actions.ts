'use server'

import { CreateEventParams } from "@/types"

import { connectToDatabase } from "../database"

import Category from "../database/models/category.model"
import Event from "../database/models/event.model"
import User from "../database/models/user.model"

import { handleError } from "../utils"

const populateEvent = async (query: any) => {
    return query.populate({
         path: 'organiser',
         model:  User,
         select: '_id firstName lastName'
    })
    .populate({
        path: 'category',
        model:  Category,
        select: 'name'
    })
}

export const createEvent = async ({ event, userId, path }: CreateEventParams) => {
    try {
        await connectToDatabase();

        const organiser = await User.findById(userId);

        if(!organiser) {
            throw new Error("Organiser not found");
        }

        const newEvent = await Event.create({ 
            ...event, 
            category: event.categoryId, 
            organiser: userId 
        });

        return JSON.parse(JSON.stringify(newEvent));
    } catch (error) {
        handleError(error);
    }
}

export const getEventById = async ( eventId: string ) => {
    try {
        connectToDatabase();
        
        const event = await populateEvent(Event.findById(eventId));

        if(!event) {
            throw new Error("Event not found");
        }
        
        return JSON.parse(JSON.stringify(event));
        
    } catch (error) {
        handleError(error);
    }
}