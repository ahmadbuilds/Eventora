'use client';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel'
import { useQuery } from 'convex/react';
const EventCard = ({eventId}:{eventId:Id<"events">}) => {
    const data=useQuery(api.events.getEventsById,{eventId});
    return (
    <div className='bg-red-500'>
      Hello from Cards
    </div>
  )
}

export default EventCard
