'use server';

import { handleError } from '@/lib/utils';
import { CreateEventParams } from '@/types';
import { revalidatePath } from 'next/cache';
import { connectToDatabase } from '../database';
import Event from '../database/models/event.model';
import User from '../database/models/user.model';

export const createEvent = async ({
  event,
  userId,
  path,
}: CreateEventParams) => {
  try {
    await connectToDatabase();
    const organizer = await User.findById(userId);

    if (!organizer) {
      throw new Error('Organizer not found');
    }

    const newEvent = await Event.create({
      ...event,
      category: event.categoryId,
      organizer: userId,
    });
    revalidatePath(path);

    return JSON.parse(JSON.stringify(newEvent));
  } catch (error) {
    console.log(error);
    handleError(error);
  }
};

export const getEventById = async (eventId: string) => {
  try {
  } catch (error) {
    handleError(error);
  }
};
