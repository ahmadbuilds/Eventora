'use client';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel'
import { useQuery } from 'convex/react';
import { useUser } from '@clerk/nextjs';
import { useStorageUrl } from '@/lib/storageUtils';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { StarIcon,Calendar,Ticket,PencilIcon,Check, XCircle, LoaderCircle, CircleArrowRight } from 'lucide-react';
import { MapPin } from 'lucide-react';
import PurchaseTicket from './PurchaseTicket';
const EventCard = ({eventId}:{eventId:Id<"events">}) => {
    const {user}=useUser();
    const router=useRouter();
    const data=useQuery(api.events.getEventsById,{eventId});
    const availability=useQuery(api.events.getEventAvailability,{eventId});
    const userId=user?.id ??"";
    const userTicket=useQuery(api.tickets.getUserTicket,{
      eventId,
      userId:user?.id??""
    });

    const imageUrl=useStorageUrl({imageStorageId:data?.imageStorageId});
    const QuePosition=useQuery(api.waitingList.getWaitingListPosition,{eventId,userId})
    if(!data || !availability)
    {
      return null;
    }

    const isPastEvent=data.eventDate < Date.now();
    const isEventOwner=user?.id==data.userId;

    const renderQuePosition=()=>{
      if(!QuePosition || QuePosition.status ==="expired") return null;

      if(availability.purchasedTickets>=availability.TotalTickets)
      {
        return(
          <div className='flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200'>
            <div className='flex items-center'>
              <Ticket className='w-5 h-5 text-gray-400 mr-2'/>
              <span className='text-gray-600'>Event is sold out</span>
            </div>
          </div>
        )
      }

      if(QuePosition.position==2)
      {
        return(
          <div className='flex flex-col lg:flex-row items-center justify-center p-3 bg-amber-50
          rounded-lg border border-amber-100'>
            <div className='flex items-center'>
              <CircleArrowRight className='w-5 h-5 text-amber-500 mr-2'/>
              <span className='text-amber-700 font-medium'>
                you&apos;re next in line! (QuePosition:{" "})
                {QuePosition.position}
              </span>
            </div>
            <div className='flex items-center'>
              <LoaderCircle className='w-5 h-5 mr-1 animate-spin text-amber-500'/>
              <span className='text-amber-600 text-sm'>Waiting for Ticket</span>
            </div>
          </div>
        )
      }

      return(
        <div className='flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-100'>
          <div className='flex items-center'>
            <LoaderCircle className='w-4 h-4 mr-2 animate-spin text-blue-500'/>
            <span className='text-blue-700'>Queue Position</span>
          </div>
          <span className='bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-medium'>
            #{QuePosition.position}
          </span>
        </div>
      )
    }


    const renderTicketStatus=()=>{
      if(!user)return null;

      if(isEventOwner)
      {
        return(
          <div className='mt-4'>
            <button onClick={e=>{e.stopPropagation();router.push(`/seller/event/${eventId}/edit`)}}
              className='w-full flex items-center shadow-sm text-gray-700 bg-gray-100 rounded-lg
              px-6 py-3 font-medium hover:bg-gray-200 transition-colors duration-200 justify-center gap-2'
              >
              <PencilIcon className='w-4 h-4 mr-4'/>
              Edit Event
            </button>
          </div>
        )
      }

      if(userTicket)
      {
        return(
          <div className='mt-4 flex items-center justify-between p-3 bg-green-50 
          rounded-lg border border-green-100'>
            <div className='flex items-center'>
              <Check className='w-5 h-5 text-green-600 mr-2'/>
              <span className='text-green-700 font-medium'>
                You have a Ticket
              </span>
            </div>
            <button onClick={e=>{e.stopPropagation();
              router.push(`/tickets/${userTicket._id}`)
            }}
            className='text-sm bg-green-600 hover:bg-green-700 text-white px-3 py-1.5
            rounded-full font-medium shadow-sm transition-colors duration-200 flex items-center gap-1'>
              View Your Ticket
            </button>
          </div>
        )

      }

      if(QuePosition)
      {
        return(
          <div className='mt-4'>
            {
              QuePosition.status==="offered" &&
              <PurchaseTicket eventId={eventId}/>
            }
            {
              renderQuePosition()
            }
            {
              QuePosition.status==="expired" &&
              <div className='p-3 bg-red-50 rounded-lg border border-red-100'>
                <span className='text-red-700 font-medium flex items-center'>
                  <XCircle className='w-5 h-5 mr-2'/>
                  Offer expired
                </span>
              </div>
            }
          </div>
        )
      }
      return null;
    }

    return (
    <div 
      onClick={()=>router.push(`/event/${eventId}`)}
    className={`bg-white border rounded-xl shadow-sm hover:shadow-lg transition-all cursor-pointer
      border-gray-100 duration-300 overflow-hidden relative ${isPastEvent?`opacity-75 hover:opacity-100`:""}
      relative
    `}>
      {/* Image */}
        {
          imageUrl &&
            <div className='relative w-full h-48'>
            <Image
              src={imageUrl}
              alt={data.name}
              fill
              className='object-cover'
              priority
            />
          </div>
        }
        {/* Event Details */}
      <div className={`p-6 ${imageUrl}?relative:""`}>
        <div className='flex items-start justify-between gap-2'>
          {/* Event Tags  */}
          <div>
            <div className='flex flex-col items-start gap-2'>
            {
              isEventOwner&&
                <span className='inline-flex  items-center bg-blue-600/90 text-white px-2 py-1 rounded-full
                text-xs font-medium'>
                  <StarIcon className='w-4 h-4'/>
                  Your Event
                </span>
              }
              <h2 className='font-bold text-gray-900 text-2xl'>{data.name}</h2>
            </div>
            <div>
              {
                isPastEvent&&
                <span className='items-center inline-flex bg-gray-100 rounded-full px-2.5 py-0.5 text-xs
                  font-medium text-gray-800 mt-2'>
                  Past Event
                </span>
              }
            </div>
          </div>
        </div>
        {/* Price Tag */}
          <div className='flex flex-col gap-2 items-end ml-4'>    
            <span className={`font-semibold rounded-full px-4 py-1.5 ${
                  isPastEvent ? "text-gray-500 bg-gray-50":"bg-green-50 text-green-700"
            }`}>${data.price.toFixed(2)}</span>
            {
              availability.purchasedTickets>=availability.TotalTickets &&
              <span className='font-semibold rounded-full text-xs px-4 py-1.5 bg-red-50 text-red-700'>
                Sold Out
              </span>
            }
          </div>
          {/* Event Details */}
          <div className='mt-4 space-y-3'>
            <div className='flex items-center text-gray-600'>
              <MapPin className='w-4 h-4 mr-2'/>
              <span>{data.location}</span>
            </div>
            <div className='flex items-center text-gray-600'>
              <Calendar className='w-4 h-4 mr-2'/>
              <span>{new Date(data.eventDate).toLocaleDateString()}{" "}
                {isPastEvent&& "(Ended)"}
              </span>
            </div>

            {/* Available Ticket */}
            <div className='flex items-center gap-2 text-gray-600'>
              <Ticket className='w-4 h-4 mr-2'/>
              <span>
                {availability.TotalTickets - availability.purchasedTickets}/{" "}
                {availability.TotalTickets} available
                {!isPastEvent && availability.activeOffers >0 &&
                  <span className='text-amber-600 text-sm ml-2'>
                    {availability.activeOffers}{" "}
                    {availability.activeOffers===1 ? "person":"people"} trying to buy
                  </span>
                }
              </span>
            </div>
          </div>
          {/* ticket Description */}
          <p className='mt-4 text-gray-600 text-sm line-clamp-2'>{data.description}</p>
          <div onClick={e=>e.stopPropagation()}>{!isPastEvent && renderTicketStatus()}</div>
      </div>
    </div>
  )
}

export default EventCard
