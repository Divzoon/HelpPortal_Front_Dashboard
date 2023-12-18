
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
        <div className="p-4 bg-primary rounded-2xl mt-12 min-h-32 w-full">
          <h2 className="text-lg uppercase font-semibold mb-2 text-white bg-primary rounded p-2">
            {selectedDate ? `Events for ${selectedDate.day}` : 'No Date Selected'}
          </h2>
          {selectedEvents.length === 0 ? (
            <p className="text-white">No events for the selected date.</p>
          ) : (
            <ul>
              {selectedEvents.map((event, index) => (
                <div key={index} className="bg-black/40 p-4 rounded-2xl">
                  <li>
                    <h1 className="text-white text-2xl font-bold select-none transition duration-300 ease-in-out transform hover:text-black-2">
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
                            <button className="text-white bg-black-2 hover:bg-blue-700 py-2 px-4 rounded-3xl">
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
 