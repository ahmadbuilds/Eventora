import { defineSchema,defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    //Events Schema
    events:defineTable({
        name:v.string(),
        location:v.string(),
        price:v.number(),
        totalTickets:v.number(),
        description:v.string(),
        userId:v.string(),
        eventDate:v.number(),
        imageStorageId:v.optional(v.id("_storage")),
        is_canceled:v.optional(v.boolean()),
    }),

    //tickets Schema
    tickets:defineTable({
        eventId:v.id("events"),
        userId:v.string(),
        purchasedAt:v.number(),
        status:v.union(
            v.literal("valid"),
            v.literal("used"),
            v.literal("refunded"),
            v.literal("cancelled"),
        ),
        paymentIntendId:v.optional(v.string()),
        amount:v.optional(v.number()),
    }).index("by_event",["eventId"])
    .index("by_userId",["userId"])
    .index("by_user_event",["userId","eventId"])
    .index("by_payment",["paymentIntendId"]),

    //waiting List Schema
    waitingList:defineTable({
        userId:v.string(),
        eventId:v.id("events"),
        status:v.union(
            v.literal("waiting"),
            v.literal("offered"),
            v.literal("purchased"),
            v.literal("expired"),
        ),
        offerExpires:v.optional(v.number()),
    }).index("by_user",["userId"])
    .index("by_event_status",["eventId","status"])
    .index("by_user_event",["userId","eventId"]),

    //users Schema
    users:defineTable({
        name:v.string(),
        email:v.string(),
        userId:v.string(),
        stripeConnectId:v.optional(v.string()),
    }).index("by_user_id",["userId"])
    .index("by_email",["email"]),
});