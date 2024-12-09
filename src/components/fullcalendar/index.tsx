import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import { createPlugin } from '@fullcalendar/core';
import "./calendar.css";
import { CalendarHeader } from './header';
import { useState, useRef } from 'react';
import { render } from '@fullcalendar/core/preact';
import { memoize } from '@fullcalendar/core/internal';

const events = [
  { title: 'Team Meeting', start: '2024-11-02T10:00:00', end: '2024-11-02T11:30:00' },
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

let rendernum = 0
function CustomShadMonthlyView(props: any) {
  const { currentDate, totalDays, firstDayOffset, totalCells, today } = calculateDateInfo(props.dateProfile);
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const eventsByDate = memoizedProcessEvents(props.eventStore);

  const renderDayCell = (index: number) => {
    const { dayNumber, isCurrentMonth, date, dateStr } = getDayCellInfo(index, firstDayOffset, totalDays, currentDate);
    const dayEvents = eventsByDate.get(dateStr) || [];
    const displayDayNumber = isCurrentMonth ? dayNumber : new Date(date).getDate();

    return (
      <div
        key={index}
        className={`flex-grow overflow-hidden p-1 sm:p-2 h-[80px] sm:h-[150px] border rounded relative group flex flex-col
          ${index % 7 !== 0 ? 'border-l' : ''} 
          ${index >= 7 ? 'border-t' : ''}
          ${!isCurrentMonth ? 'bg-muted/30 dark:bg-gray-900/50' : ''}
          ${dateStr === today ? 'bg-primary/5 dark:bg-primary/10' : ''}`}
      >
        <div className={`font-semibold mb-1 w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center text-xs sm:text-sm ${!isCurrentMonth ? 'opacity-50' : ''}`}>
          {displayDayNumber}
        </div>
        <div className={`flex gap-1 px-1 lg:h-[94px] lg:flex-col  lg:px-0 ${!isCurrentMonth ? 'opacity-50' : ''}`}>
          {renderEvents(dayEvents)}
        </div>
        {renderMoreEventsIndicator(dayEvents)}
      </div>
    );
  };

  return (
    <div className='rounded-lg border bg-card text-card-foreground shadow-sm p-2 sm:p-4'> 
    <div style={{minWidth: '100%', display: 'table'}}>
    <div className='grid grid-cols-7 gap-1 sm:gap-2'>
        {weekDays.map((day, index) => (
          <div key={index} className="text-center font-medium text-xs sm:text-sm">
            {day}
          </div>
        ))}
      {/* <div className="flex-grow overflow-hidden"> */}
        {Array.from({ length: totalCells }).map((_, index) => renderDayCell(index))}
      {/* </div> */}
    </div>
    </div>
    </div>
  );
}

function calculateDateInfo(dateProfile: any) {
  const activeStart = dateProfile.activeRange.start;
  const activeEnd = dateProfile.activeRange.end;
  const currentDate = new Date(activeStart);
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
  const totalDays = lastDayOfMonth.getDate();
  const firstDayOffset = firstDayOfMonth.getDay();
  const totalCells = Math.ceil((totalDays + firstDayOffset) / 7) * 7;
  const today = new Date().toDateString();

  return { currentDate, firstDayOfMonth, lastDayOfMonth, totalDays, firstDayOffset, totalCells, activeStart, activeEnd, today };
}

function processEvents(eventStore: any) {
  const eventsByDate = new Map();
  if (!eventStore.instances) return eventsByDate;

  const eventDefs = new Map(Object.entries(eventStore.defs));

  Object.entries(eventStore.instances).forEach(([, instance]: any) => {
    const eventDef = eventDefs.get(instance.defId);
    if (!eventDef) return;

    const { start, end } = instance.range;
    const daysBetween = Math.ceil((new Date(end).getTime() - new Date(start).getTime()) / (1000 * 60 * 60 * 24));
    const baseEvent = { ...eventDef, start, end, daysBetween };

    for (let i = 0; i < daysBetween; i++) {
      const currentDate = new Date(new Date(start).getTime() + (i * 24 * 60 * 60 * 1000));
      const dateKey = currentDate.toDateString();
      
      if (!eventsByDate.has(dateKey)) {
        eventsByDate.set(dateKey, []);
      }

      eventsByDate.get(dateKey).push({
        ...baseEvent,
        isStart: i === 0,
        isEnd: i === daysBetween - 1
      });
    }
  });

  eventsByDate.forEach(events => {
    events.sort((a: any, b: any) => b.daysBetween - a.daysBetween || new Date(a.start).getTime() - new Date(b.start).getTime());
  });

  return eventsByDate;
}

function getDayCellInfo(index: number, firstDayOffset: number, totalDays: number, currentDate: Date) {
  const dayOffset = index - firstDayOffset;
  const dayNumber = dayOffset + 1;
  const isCurrentMonth = dayOffset >= 0 && dayOffset < totalDays;
  const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), dayNumber);
  const dateStr = date.toDateString();

  return { dayNumber, isCurrentMonth, date, dateStr };
}
function renderEvents(dayEvents: any[]) {
  return dayEvents.slice(0, 3).map((seg: any, i: number) => (
    <div key={i} className="overflow-hidden">
        <div 
          className={`p-1 bg-yellow-200 dark:bg-yellow-800 text-yellow-800 dark:text-yellow-200 text-[8px] sm:text-xs rounded  cursor-pointer transition-colors duration-200 hover:bg-opacity-40 dark:hover:bg-opacity-40
            ${seg.isStart ? 'border-l-2 border-l-black/70 dark:border-l-white/50' : 'rounded-l-none'}
            ${seg.isEnd ? 'border-r-2 border-r-black/70 dark:border-r-white/50' : 'rounded-r-none'}`}
        >
          <div className="flex justify-between">
            <span className="font-semibold truncate">{seg.title}</span>
            <span className="ml-1 whitespace-nowrap">
              {new Date(seg.start).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
            </span>
          </div>
      </div>
    </div>
  ));
}

function renderEventContent(seg: any) {
  if (seg.isStart || seg.daysBetween === 1) {    return (
      <p className="flex-1 truncate font-semibold">
        {seg.title}
        <span>{seg.isStart && seg.daysBetween > 1 && ` (${seg.daysBetween} days)`}</span>
      </p>
    );
  } else {
    return (
      <p className="flex-1 truncate font-semibold opacity-0" aria-hidden="true">
        {seg.title}
      </p>
    );
  }
}
function renderMoreEventsIndicator(dayEvents: any[]) {
  const extraEvents = dayEvents.length - 3;
  if (extraEvents <= 0) return null;

  return (
    <button className="absolute bottom-0 right-0 m-1 px-2 py-0.5 text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
      <span className="sm:hidden">+{extraEvents}</span>
      <span className="hidden sm:inline">{extraEvents} more</span>
    </button>
  );
}
const CustomShadMonthlyPlugin = createPlugin({
  name: 'shadmonthly',
  initialView: 'shadmonthly',
  views: {
    shadmonthly: {
      component: CustomShadMonthlyView,
      duration: { months: 1 },
      monthMode: true,
      type: "month",
    },
  },
});
export function ShadFullCalendar() {
  // const [currentDate, setCurrentDate] = useState(new Date());
  // const [currentView, setCurrentView] = useState<'day' | 'week' | 'month'>('month');
  const calendarRef = useRef<FullCalendar>(null);

  const renderNum = useRef(0);

  renderNum.current = renderNum.current + 1;

  const handlePrevMonth = () => {
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      calendarApi.prev();
      // setCurrentDate(calendarApi.getDate());
    }
  };

  const handleNextMonth = () => {
    if (calendarRef.current) {
      // console.log(calendarRef.current);
      const calendarApi = calendarRef.current.getApi();
      calendarApi.next();
      // setCurrentDate(calendarApi.getDate());
    }
  };

  const handleViewChange = (view: 'day' | 'week' | 'month') => {
    // setCurrentView(view);
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      calendarApi.changeView(view);
    }
  };
  const today = new Date();
  const currentMonth = today.toLocaleString('default', { month: 'long', year: 'numeric' });
  const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
  const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);
  const dateRange = `${firstDay.getFullYear()}-${String(firstDay.getMonth() + 1).padStart(2, '0')}-01,${lastDay.getFullYear()}-${String(lastDay.getMonth() + 1).padStart(2, '0')}-${lastDay.getDate()}`;

  return (
    <div>
      {/* {renderNum.current} */}
      <CalendarHeader
        currentMonth={currentMonth}
        eventCount={events.length}
        onPrevMonth={handlePrevMonth}
        onNextMonth={handleNextMonth}
        onViewChange={handleViewChange}
        // currentView={currentView}
        dateRange={dateRange}
        currentDay={new Date().getDate()}
      />
      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, CustomShadMonthlyPlugin]}
        initialView={"shadmonthly"}
        weekends={false}
        headerToolbar={false}
        events={events}
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
        // datesSet={(dateInfo) => setCurrentDate(dateInfo.start)}
      />
    </div>
  );
}


const memoizedProcessEvents = memoize(
  processEvents,
  (res0, res1) => {
    if (res0 === res1) return true;
    if (!(res0 instanceof Map) || !(res1 instanceof Map)) return false;
    if (res0.size !== res1.size) return false;
    
    for (const [key, value] of res0) {
      const otherValue = res1.get(key);
      if (!otherValue || value.length !== otherValue.length) return false;
      // Compare events in the array
      for (let i = 0; i < value.length; i++) {
        if (value[i].start !== otherValue[i].start || 
            value[i].end !== otherValue[i].end ||
            value[i].daysBetween !== otherValue[i].daysBetween) {
          return false;
        }
      }
    }
    return true;
  },
  (result) => {
    if (result instanceof Map) {
      result.clear();
    }
  }
);