import { v } from "convex/values";
import { query } from "./_generated/server";

export const getUrl=query({
    args:{
        imageStorageId:v.id("_storage")
    },
    handler:async(ctx,{imageStorageId})=>{
        return ctx.storage.getUrl(imageStorageId);
    }
})