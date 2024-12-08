import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import { createPlugin } from '@fullcalendar/core';
import "./calendar.css";
import { CalendarHeader } from './header';
import { useState, useRef } from 'react';
import { render } from '@fullcalendar/core/preact';

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
  // const xxx = useRef<number>();
  rendernum++;

  console.log(rendernum);
  // console.log(props);
  const { currentDate, totalDays, firstDayOffset, totalCells, today } = calculateDateInfo(props.dateProfile);
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const eventsByDate = processEvents(props.eventStore);

  const renderDayCell = (index: number) => {
    const { dayNumber, isCurrentMonth, date, dateStr } = getDayCellInfo(index, firstDayOffset, totalDays, currentDate);
    const dayEvents = eventsByDate.get(dateStr) || [];

    return (
      <div key={index} className={`flex flex-col gap-1 py-1.5 lg:py-2 
    ${index % 7 !== 0 ? 'border-l' : ''} 
    ${index >= 7 ? 'border-t' : ''}
    ${!isCurrentMonth ? 'bg-muted/30 dark:bg-gray-900/50' : ''}
    ${dateStr === today ? 'bg-primary/5 dark:bg-primary/10' : ''}`}>
        <span className={`h-6 px-1 text-xs font-semibold lg:px-2 ${!isCurrentMonth ? 'opacity-50' : ''}`}>{isCurrentMonth ? dayNumber : ''}</span>
        <div className={`flex h-6 gap-1 px-2 lg:h-[94px] lg:flex-col lg:gap-2 lg:px-0 ${!isCurrentMonth ? 'opacity-50' : ''}`}>
          {renderEvents(dayEvents)}
        </div>
        {renderMoreEventsIndicator(dayEvents)}
      </div>
    );
  };

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
        {Array.from({ length: totalCells }).map((_, index) => renderDayCell(index))}
      </div>
    </>
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

  return { currentDate, firstDayOfMonth, lastDayOfMonth, totalDays, firstDayOffset, totalCells, activeStart, activeEnd };
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
    <div key={i} className="lg:flex-1">
      <div 
        role="button" 
        tabIndex={0} 
        className={ `mx-1 size-auto h-6 select-none items-center justify-between gap-1.5 truncate whitespace-nowrap rounded-md border px-2 text-xs border-green-200 bg-green-50 text-green-700 dark:border-green-800 dark:bg-green-950 dark:text-green-300 hidden lg:flex
          ${!seg.isStart ? 'rounded-l-none border-l-0 ml-0' : ''}
          ${!seg.isEnd ? 'rounded-r-none border-r-0 mr-0' : ''}
          ${seg.daysBetween > 1 && !seg.isStart ? 'px-0' : ''}`}
        style={{ position: 'relative', zIndex: seg.daysBetween > 1 ? 1 : 0 }}
      >
        {renderEventContent(seg)}
      </div>
    </div>
  ));
}

function renderEventContent(seg: any) {
  if (seg.isStart || seg.daysBetween === 1) {
    return (
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
  if (dayEvents.length > 3) {
    return (
      <p className="h-4.5 px-1.5 text-xs font-semibold text-t-quaternary">
        <span className="sm:hidden">+{dayEvents.length - 3}</span>
        <span className="hidden sm:inline">{dayEvents.length - 3} more...</span>
      </p>
    );
  }
  return null;
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
      {renderNum.current}
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