import { CalendarHeader } from "@/components/calendar-header";
import { DemoApp } from "@/components/fullcalendar";

export default function CalendarPage() {
  return (
    <div>
      <CalendarHeader
        currentMonth="October 2024"
        eventCount={74}
        onPrevMonth={() => console.log('Previous month')}
        onNextMonth={() => console.log('Next month')}
        onViewChange={(view) => console.log('View changed to:', view)}
        currentView="month"
      />
      <DemoApp />
    </div>
  );
}