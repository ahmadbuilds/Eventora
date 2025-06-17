import { Doc } from "./_generated/dataModel";

export const DURATION={
    TICKET_OFFER:30*60*1000
}as const

export const WAITING_LIST:Record<string,Doc<"waitingList">["status"]>={
    WAITING:"waiting",
    PURCHASED:"purchased",
    EXPIRED:"expired",
    OFFERED:"offered",
} as const

export const TICKET_STATUS:Record<string,Doc<"tickets">["status"]>={
    VALID:"valid",
    USED:"used",
    REFUNDED:"refunded",
    CANCELLED:"cancelled",
} as const 