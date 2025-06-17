import { v } from "convex/values";
import { query } from "./_generated/server";
import { TICKET_STATUS, WAITING_LIST } from "./constants";
//function for returning the all the events not cancelled
export const getEvents=query({
    handler:async(ctx)=>{
        const events=await ctx.db
        .query("events")
        .filter((q)=>q.eq(q.field("is_canceled"),undefined))
        .collect();

        return events;
    }
});
//function to get the events by ID
export const getEventsById=query({
    args:{
        eventId:v.id("events")
    },
    handler:async(ctx,{eventId})=>{
        const user=await ctx.db
        .get(eventId);

        return user;
    }
});

//function to get the event availability
export const getEventAvailability=query({
    args:{
        eventId:v.id("events")
    },
    handler:async(ctx,{eventId})=>{
        const event=await ctx.db.get(eventId);
        if(!event){
            throw new Error("Event Does not exist");
        }

        const purchasedTickets=await ctx.db.query("tickets")
        .withIndex("by_event",(q)=>q.eq("eventId",eventId))
        .collect()
        .then(
            (events)=>events.filter(t=>t.status==TICKET_STATUS.VALID || t.status==TICKET_STATUS.USED)
            .length
        )

        
        const now=Date.now();
        const activeOffers=await ctx.db
        .query("waitingList")
        .withIndex("by_event_status",(q)=>q.eq("eventId",eventId).eq("status",WAITING_LIST.OFFERED))
        .collect()
        .then(
            (offers)=>offers.filter((e)=>(e.offerExpires??0)>now).length
        );

        const totalOffers=purchasedTickets + activeOffers;

        return {
            isSold:totalOffers>=event.totalTickets,
            TotalTickets:event.totalTickets,
            purchasedTickets,
            activeOffers,
            remainingTickets:Math.max(0,event.totalTickets - totalOffers)
        };

    }
});