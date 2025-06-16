import { v } from "convex/values";
import { query } from "./_generated/server";

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
})