import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import "./calendar.css";
import { createPlugin } from '@fullcalendar/core';

const events = [
  { title: 'Team Meeting', start: '2024-12-02T10:00:00', end: '2024-12-02T11:30:00' },
  { title: 'Project Review', start: '2024-12-05T14:00:00', end: '2024-12-05T15:00:00' },
  { title: 'Client Presentation', start: '2024-12-09T09:00:00', end: '2024-12-09T10:30:00' },
  { title: 'Sprint Planning', start: '2024-12-16T11:00:00', end: '2024-12-16T12:00:00' },
  { title: 'Product Demo', start: '2024-12-19T15:30:00', end: '2024-12-19T16:30:00' },
  { title: 'Monthly Review', start: '2024-12-30T13:00:00', end: '2024-12-30T14:30:00' },
  { title: 'Team Standup', start: '2024-12-06T09:00:00', end: '2024-12-06T09:30:00' },
  { title: 'Code Review', start: '2024-12-06T11:00:00', end: '2024-12-06T12:00:00' },
  { title: 'Lunch & Learn', start: '2024-12-06T12:30:00', end: '2024-12-06T13:30:00' },
  { title: 'Design Sync', start: '2024-12-06T14:00:00', end: '2024-12-06T15:00:00' },
  { title: 'Weekly Wrap-up xxx', start: '2024-12-06T16:00:00', end: '2024-12-12T16:30:00' }
]

// Add new custom event component
function CustomEventComponent({ eventInfo }: { eventInfo: any }) {
  return (
    <div className="custom-event-container">
      <div className="event-time">{eventInfo.timeText}</div>
      <div className="event-title">{eventInfo.event.title}</div>
    </div>
  );
}

function DayRender({ info }: { info: any }) {
  return (
    <div className="h-6 px-1 text-xs font-semibold lg:px-2">
      {info.dayNumberText}
    </div>
  );
}

function EventItem({ info }: { info: any }) {
  return (
    <div className="flex items-center gap-1">
      <span className="font-medium">{info.timeText}</span>
      <span>{info.event.title}</span>
    </div>
  );
}

function DayHeader({ info }: { info: any }) {
  return (
    <div className="font-medium text-foreground/80">
      {info.text}
    </div>
  );
}

export function DemoApp() {
  return (
    <div>
      <FullCalendar
        plugins={[dayGridPlugin, CustomViewPlugin]}
        initialView='custom'
        weekends={false}
        headerToolbar={false}
        events={events}

        dayCellContent={(dayInfo) => <DayRender info={dayInfo} />}
        eventContent={(eventInfo) => <EventItem info={eventInfo} />}
        dayHeaderContent={(headerInfo) => <DayHeader info={headerInfo} />}
        firstDay={1}
        height={"32vh"}
        displayEventEnd={true}
        windowResizeDelay={0}
        slotLabelFormat={{
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        }}
        eventTimeFormat={{
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        }}
        eventBorderColor={"black"}
        contentHeight={"auto"}
        expandRows={true}
        nowIndicator
        selectable
      />
    </div>
  )
}

function renderEventContent(eventInfo: any) {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  )
}

const CustomViewPlugin = createPlugin({
    name: 'customView',
    initialView: 'resourceTimeline',
    views: {
      custom: CustomView,
      resourceTimelineDay: {
        type: 'resourceTimeline',
        duration: { month: 1 },
      }
    },
  });
  
function CustomView(props: any) {
  // Get current date info from props
  const currentDate = props.dateProfile.currentDate;
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
  const totalDays = lastDayOfMonth.getDate();
  const firstDayOffset = firstDayOfMonth.getDay();

  // Calculate total cells needed (previous month days + current month days + next month days)
  const totalCells = Math.ceil((totalDays + firstDayOffset) / 7) * 7;

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Create a map of dates to events
  const eventsByDate = new Map();
  props.eventStore.instances && Object.entries(props.eventStore.instances).forEach(([id, instance]: any) => {
    const eventDef = props.eventStore.defs[instance.defId];
    const startDate = new Date(instance.range.start);
    const endDate = new Date(instance.range.end);
    
    // Calculate days between start and end
    const daysBetween = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    
    // Add event to each day it spans
    for (let i = 0; i < daysBetween; i++) {
      const currentDate = new Date(startDate);
      currentDate.setDate(currentDate.getDate() + i);
      const dateKey = currentDate.toDateString();
      
      if (!eventsByDate.has(dateKey)) {
        eventsByDate.set(dateKey, []);
      }
      eventsByDate.get(dateKey).push({
        ...eventDef,
        start: instance.range.start,
        end: instance.range.end,
        isStart: i === 0,
        isEnd: i === daysBetween - 1,
        daysBetween
      });

      // Sort events for this date - multi-day events first, then by start time
      eventsByDate.get(dateKey).sort((a: any, b: any) => {
        // First priority: multi-day events
        if (a.daysBetween !== b.daysBetween) {
          return b.daysBetween - a.daysBetween;
        }
        // Second priority: start time
        return new Date(a.start).getTime() - new Date(b.start).getTime();
      });
    }
  });

  return (
    <>
      <div className="grid grid-cols-7 divide-x border-b">
        {weekDays.map((day, index) => (
          <div key={index} className="flex items-center justify-center py-2">
            <span className="text-xs font-medium text-t-quaternary">{day}</span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 overflow-hidden border-b lg:border-b-0">
        {Array.from({ length: totalCells }).map((_, index) => {
          const dayOffset = index - firstDayOffset;
          const dayNumber = dayOffset + 1;
          const isCurrentMonth = dayOffset >= 0 && dayOffset < totalDays;
          const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), dayNumber);
          
          // Get events for this day from the map
          const dayEvents = eventsByDate.get(date.toDateString()) || [];

          return (
            <div key={index}>
              <div className={`flex flex-col gap-1 py-1.5 lg:py-2 
                ${index % 7 !== 0 ? 'border -l' : ''} 
                ${index >= 7 ? 'border-t' : ''}
                ${!isCurrentMonth ? 'bg-muted/30 dark:bg-gray-900/50' : ''}
                ${date.toDateString() === new Date().toDateString() ? 'bg-primary/5 dark:bg-primary/10' : ''}
              `}>
                <span className={`h-6 px-1 text-xs font-semibold lg:px-2 
                  ${!isCurrentMonth ? 'opacity-50' : ''}`}>
                  {isCurrentMonth ? dayNumber : ''}
                </span>
                <div className={`flex h-6 gap-1 px-2 lg:h-[94px] lg:flex-col lg:gap-2 lg:px-0 
                  ${!isCurrentMonth ? 'opacity-50' : ''}`}>
                  <div className="lg:flex-1">
                    {dayEvents.map((seg: any, i: number) => (
                      <div 
                        key={i} 
                        role="button" 
                        tabIndex={0} 
                        className={`mx-1 mb-1 select-none items-center justify-between gap-1.5 truncate whitespace-nowrap rounded-md border px-2 py-1 text-xs border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-300 hidden lg:flex hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors min-h-[28px]
                          ${!seg.isStart ? 'rounded-l-none border-l-0 ml-0' : ''}
                          ${!seg.isEnd ? 'rounded-r-none border-r-0 mr-0' : ''}
                          ${seg.daysBetween > 1 && !seg.isStart ? 'px-0' : ''}
                        `}
                        style={{
                          position: 'relative',
                          zIndex: seg.daysBetween > 1 ? 1 : 0
                        }}
                      >
                        {(seg.isStart || seg.daysBetween === 1) ? (
                          <p className="flex-1 truncate font-semibold">
                            {seg.title}
                            {seg.isStart && seg.daysBetween > 1 && ` (${seg.daysBetween} days)`}
                          </p>
                        ) : (
                          <p className="flex-1 truncate font-semibold opacity-0" aria-hidden="true">
                            {seg.title}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
