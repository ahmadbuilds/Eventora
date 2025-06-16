'use client'
import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
const SyncUserWithConvex = () => {
    const {user}=useUser();
    const updateUser=useMutation(api.users.UpdateUser);
    useEffect(()=>{
        //if user is not logged In
        if(!user){
            return;
        }
        //if user is logged In
        const SyncUser=async()=>{
            try{
                await updateUser({
                    userId:user.id,
                    name:`${user.firstName??""} ${user.lastName??""}`.trim(),
                    email:user.emailAddresses[0]?.emailAddress ??"",
                });
            }catch(error)
            {
                console.log("Message Error: "+error);
            }
        }
        SyncUser();
    },[user,updateUser]);
  
    return null;
}

export default SyncUserWithConvex
