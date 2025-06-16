import { mutation,query } from "./_generated/server";
import { v } from "convex/values";


export const getUserById=query({
    args:{
        userId:v.string(),
    },
    handler:async(ctx,{userId})=>{
        const user=await ctx.db.query("users")
        .withIndex("by_user_id",(q)=>q.eq("userId",userId))
        .first();

        return user;
    }
})

export const UpdateUser=mutation({
    args:{
        userId:v.string(),
        name:v.string(),
        email:v.string(),
    },
    handler:async(ctx,{userId,name,email})=>{
        //check for existing user
        const existingUser=await ctx.db.query("users")
        .withIndex("by_user_id",(q)=>q.eq("userId",userId))
        .first();

        if(existingUser)
        {
            //updating existing user
            await ctx.db.patch(existingUser._id,{
                name,
                email,
            })
            return existingUser._id;
        }

        //if user does not exist create a new user
        const newUserId=await ctx.db.insert("users",{
                userId,
                name,
                email,
                stripeConnectId:undefined
            }
        )
        return newUserId;
    }
})

