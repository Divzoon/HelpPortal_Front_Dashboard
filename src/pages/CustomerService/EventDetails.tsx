
    import React, { useEffect, useState } from 'react';

    interface Event {
      year: number;
      month: number;
      day: number;
      eventName: string;
      clinetDetails: {
        name: string;
        email: string;
        phone: string;
      };
      SessionDetails: {
        url: string;
        room: string;
      };
      startTime: {
        hour: number;
        minute: number;
        period: 'AM' | 'PM';
      };
      endTime: {
        hour: number;
        minute: number;
        period: 'AM' | 'PM';
      };
    }
    interface EventDetailsProps {
      selectedDate: {
        day: number;
        events: Event[];
      } | null;
      selectedEvents: Event[]; // Added selectedEvents property
    }

    const EventDetails: React.FC<EventDetailsProps> = (props) => {
      const selectedDate = props.selectedDate;
      const selectedEvents = props.selectedEvents; // Fixed the problem

      // Format time to display in HH:MM AM/PM format
      const formatTime = (time: { hour: number; minute: number; period: 'AM' | 'PM' }): string => {
        const { hour, minute, period } = time;
        const formattedHour = hour < 10 ? `0${hour}` : hour;
        const formattedMinute = minute < 10 ? `0${minute}` : minute;
        return `${formattedHour}:${formattedMinute} ${period}`;
      };

      return (
        <div className="p-4 dark:bg-graydark/20  bg-graydark rounded-2xl mt-12 min-h-32 w-full">
          <h2 className="text-lg uppercase font-semibold mb-2 select-none bg-black-2  text-white bg-graydark/40 rounded-2xl  p-2 py-4">
            {selectedDate ? `Events for ${selectedDate.day}` : 'No Date Selected'}
          </h2>
          {selectedEvents.length === 0 ? (
            <p className="text-white/40 w-full flex justify-center p-2">No events for the selected date.</p>
          ) : (
            <ul className=' flex flex-wrap min-w-[700px]  gap-2 w-full justify-start p-2'> 
              {selectedEvents.map((event, index) => (
                <div key={index} className="bg-black/40 border-[1px] hover:scale-[98%] duration-500 border-white/20  p-4 rounded-2xl">
                  <li>
                    <h1 className="text-white text-2xl font-bold select-none transition duration-300 ease-in-out transform hover:text-graydark">
                      {event.eventName || 'Not found'}
                    </h1>
                    <p className="text-white">
                      {`Time: ${formatTime(event.startTime)} - ${formatTime(event.endTime)}`}
                    </p>
                    {event.clinetDetails && (
                      <div className="client-details">
                        <h1 className="text-white text-lg font-semibold">Client Details:</h1>
                        <div className="p-2 pt-0 rounded-2xl">
                          <p className="text-white">{`Name: ${event.clinetDetails.name || 'Not found'}`}</p>
                          <p className="text-white">{`Email: ${event.clinetDetails.email || 'Not found'}`}</p>
                          <p className="text-white">{`Phone: ${event.clinetDetails.phone || 'Not found'}`}</p>
                        </div>
                      </div>
                    )}
                    {event.SessionDetails && (
                      <>
                        <h1 className="flex gap-2 place-items-center text-white text-lg font-semibold">
                          Session Details:
                          <span className="text-sm">
                            <p className="text-white/40">{`Room: ${event.SessionDetails.room || 'Not found'}`}</p>
                          </span>
                        </h1>
                        <div className="p-2 pt-0 rounded-2xl client-details">
                          <a href={event.SessionDetails.url} target="_blank" rel="noopener noreferrer">
                            <button className="text-white font-bold pt-2 bg-meta-1 text hover:bg-blue-700 py-2 px-4 rounded-3xl">
                              Session URL
                            </button>
                          </a>
                        </div>
                      </>
                    )}
                  </li>
                </div>
              ))}
            </ul>
          )}
        </div>
      );
    };

    export default EventDetails;
 