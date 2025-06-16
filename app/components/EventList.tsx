'use client'
import { api } from "@/convex/_generated/api"
import { useQuery } from "convex/react"
import { CalendarIcon,Ticket } from "lucide-react"
import EventCard from "./EventCard"
const EventList = () => {
    const Events=useQuery(api.events.getEvents);

    const upcomingEvents=Events?.filter(events=>events.eventDate > Date.now());
    //const pastEvents=Events?.filter(events=>events.eventDate <= Date.now());
    
  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-12 py-8">
      {/* Header Part */}
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-2">
            <h3 className="font-bold text-2xl text-gray-900">Upcoming Events</h3>
            <p className="text-md text-gray-400">Discover & Book tickets for amazing events</p>
        </div>
        <div className="flex gap-5 items-center border border-gray-100 rounded-lg px-4 py-3">
            <CalendarIcon className="text-gray-400 w-5 h-5"/>
            <span className="text-gray-600">
            {upcomingEvents?.length} Upcoming Events
            </span>
        </div>
      </div>
      {/* Cards Grid */}
      {
        (upcomingEvents?.length??0)>0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-12">
            {
              upcomingEvents?.map((events)=>{
                return (<EventCard key={events._id} eventId={events._id}/>)
              })
            }
           </div>
        ):
        (
          <div className="bg-gray-50 rounded-lg p-12 text-center mb-12">
            <Ticket className="w-12 h-12 text-gray-400 mx-auto mb-4"/>
            <h3 className="text-lg font-medium text-gray-900">No Upcoming Events</h3>
            <p className="text-gray-600 mt-1">Check back later for new events</p>
          </div>
        )
      }
    </div>
  )
}

export default EventList
