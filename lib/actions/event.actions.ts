'use server'

import { CreateEventParams } from "@/types"
import { connectToDatabase } from "../database"
import Event from "../database/models/event.model"
import User from "../database/models/user.model"
import { handleError } from "../utils"

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