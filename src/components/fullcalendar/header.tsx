import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Tabs, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { GalleryVertical, Table, Tally3 } from "lucide-react";

interface CalendarHeaderProps {
  currentMonth: string;
  eventCount?: number;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  onViewChange?: (view: 'day' | 'week' | 'month') => void;
  currentView?: 'day' | 'week' | 'month';
  dateRange?: string;
  currentDay?: number;
}

export function CalendarHeader({
  currentMonth,
  eventCount,
  onPrevMonth,
  onNextMonth,
  onViewChange,
  currentView = 'month',
  dateRange,
  currentDay,
}: CalendarHeaderProps) {
  return (
    <div className="flex flex-col gap-4 mb-4 md:flex-row md:items-center md:justify-between">
      <div className="flex items-center gap-3">
        <div className="flex size-14 flex-col items-start overflow-hidden rounded-lg border">
          <div className="flex h-6 w-full items-center justify-center bg-primary text-center text-xs font-semibold text-primary-foreground">
            DEC
          </div>
          <div className="flex w-full items-center justify-center text-lg font-bold">
            6
          </div>
        </div>
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <span className="text-lg font-semibold">{currentMonth}</span>
            {eventCount && (
              <div className="rounded-md border px-1.5 py-0.5 text-xs font-medium">
                {eventCount} events
              </div>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="h-6 w-6"
              onClick={onPrevMonth}
            >
              <ChevronLeftIcon className="h-4 w-4" />
            </Button>
            <p className="text-sm text-muted-foreground">Oct 1, 2024 - Oct 31, 2024</p>
            <Button
              variant="outline"
              size="icon"
              className="h-6 w-6"
              onClick={onNextMonth}
            >
              <ChevronRightIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between gap-3">
        <Tabs defaultValue={currentView} onValueChange={(value) => onViewChange?.(value as 'day' | 'week' | 'month')} className="w-fit">
          <TabsList className="flex rounded-lg border bg-background p-1">
            <TabsTrigger value="day" className="flex items-center justify-center gap-2 rounded-md px-3 py-1.5 text-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow data-[state=inactive]:text-muted-foreground data-[state=inactive]:hover:bg-muted">
              <GalleryVertical className="h-4 w-4" />
              <span className="data-[state=inactive]:hidden">Day</span>
            </TabsTrigger>
            <TabsTrigger value="week" className="flex items-center justify-center gap-2 rounded-md px-3 py-1.5 text-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow data-[state=inactive]:text-muted-foreground data-[state=inactive]:hover:bg-muted">
              <Tally3 className="h-4 w-4" />
              <span className="data-[state=inactive]:hidden">Week</span>
            </TabsTrigger>
            <TabsTrigger value="month" className="flex items-center justify-center gap-2 rounded-md px-3 py-1.5 text-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow data-[state=inactive]:text-muted-foreground data-[state=inactive]:hover:bg-muted">
              <Table className="h-4 w-4" />
              <span className="data-[state=inactive]:hidden">Month</span>
            </TabsTrigger>
          </TabsList>
        </Tabs>
        <Button>
          <PlusIcon className="mr-2 h-4 w-4" />
          Add Event
        </Button>
      </div>
    </div>
  );
}

// Icons
function ChevronLeftIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}

function ChevronRightIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

function PlusIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}

function ListIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M3 12h.01" />
      <path d="M3 18h.01" />
      <path d="M3 6h.01" />
      <path d="M8 12h13" />
      <path d="M8 18h13" />
      <path d="M8 6h13" />
    </svg>
  );
}

function ColumnsIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect width="18" height="18" x="3" y="3" rx="2" />
      <path d="M12 3v18" />
    </svg>
  );
}

function GridIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect width="18" height="18" x="3" y="3" rx="2" />
      <path d="M3 9h18" />
      <path d="M3 15h18" />
      <path d="M9 3v18" />
      <path d="M15 3v18" />
    </svg>
  );
}