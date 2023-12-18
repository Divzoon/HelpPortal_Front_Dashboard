import React, { useState } from 'react';
import eventData from './eventData.json';
import EventDetails from './EventDetails';

interface Event {
  year: number;
  month: number;
  day: number;
  eventName: string;
  clientDetails: {
    name: string;
    email: string;
    phone: string;
  };
  sessionDetails: {
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

const Calendar: React.FC = () => {
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const [selectedDate, setSelectedDate] = useState<{ day: number; events: Event[] } | null>(null);
  const [selectedEvents, setSelectedEvents] = useState<Event[]>([]); // Added state to store selected day's events

  const generateCalendarCells = () => {
    const rows = [];

    for (let i = 0; i < 5; i++) {
      const cells = [];

      for (let j = 0; j < 7; j++) {
        const dayNumber = i * 7 + j + 1;
        const events = eventData ? eventData.filter((event: Event) => event.day === dayNumber) : [];

        cells.push(
          <td
            key={dayNumber}
            className="ease relative overflow-hidden h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31"
            onClick={() => handleCellClick(dayNumber, events)}
          >
            <span className="font-medium text-black dark:text-white">{dayNumber}</span>

            {events.length > 1 ? (
              <div
                key={j}
                className="group invisible absolute left-2 z-99 mb-1 flex w-full md:w-90 flex-col rounded-sm border-l-[3px] border-primary bg-gray px-3 py-1 text-left opacity-0 group-hover:visible group-hover:opacity-100 dark:bg-meta-4 md:visible md:opacity-100"
              >
                <span className="">More ({events.length})</span>
              </div>
            ) : (
              events.map((event, index) => (
                <div
                  key={index}
                  className="group invisible absolute left-2 z-99 mb-1 flex w-full md:w-90 flex-col rounded-sm border-l-[3px] border-primary bg-gray px-3 py-1 text-left opacity-0 group-hover:visible group-hover:opacity-100 dark:bg-meta-4 md:visible md:opacity-100"
                >
                  <span className="group-hover:text-primary md:hidden block">More</span>
                  <span className="event-name text-sm font-semibold text-black dark:text-white">{event.eventName}</span>
                  <span className="time text-sm font-medium text-black dark:text-white">
                    {`${formatTime(event.startTime)} - ${formatTime(event.endTime)}`}
                  </span>
                </div>
              ))
            )}
          </td>
        );
      }

      rows.push(<tr key={i} className="grid grid-cols-7">{cells}</tr>);
    }

    return rows;
  };

  const handleCellClick = (day: number, events: Event[]) => {
    setSelectedDate({ day, events });
    setSelectedEvents(events); // Save selected day's events
  };

  // Format time to display in HH:MM AM/PM format
  const formatTime = (time: { hour: number; minute: number; period: 'AM' | 'PM' }): string => {
    const { hour, minute, period } = time;
    const formattedHour = hour < 10 ? `0${hour}` : hour;
    const formattedMinute = minute < 10 ? `0${minute}` : minute;
    return `${formattedHour}:${formattedMinute} ${period}`;
  };

  return (
    <div>
      <table className="w-full">
        <thead>
          <tr className="grid grid-cols-7 rounded-t-sm bg-primary text-white">
            {daysOfWeek.map((day, index) => (
              <th key={index} className="flex h-15 items-center justify-center rounded-tl-sm p-1 text-xs font-semibold sm:text-base xl:p-5">
                <span className="hidden lg:block">{day}</span>
                <span className="block lg:hidden">{day.slice(0, 3)}</span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {generateCalendarCells()}
        </tbody>
      </table>

      {selectedDate && (
        <div>
          <EventDetails
            selectedDate={selectedDate}
            selectedEvents={selectedEvents} // Pass selected day's events to EventDetails component
          />
          {/* Render additional components or details for selected events if needed */}
        </div>
      )}
    </div>
  );
};

export default Calendar;
