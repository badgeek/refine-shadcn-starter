export interface RoomSchedule {
    status: 'available' | 'occupied' | 'cleaning' | 'maintenance';
    title?: string;
    time?: string;
    details?: string;
    duration?: string;
  }
  
  export interface Room {
    id: string;
    number: string;
    view: string;
    schedule: {
      mon?: RoomSchedule;
      tue?: RoomSchedule;
      wed?: RoomSchedule;
      thu?: RoomSchedule;
      fri?: RoomSchedule;
      sat?: RoomSchedule;
      sun?: RoomSchedule;
    };
  }
  
  export const roomData: Room[] = [
    {
      id: "201",
      number: "Suite 201",
      view: "Ocean View",
      schedule: {
        mon: {
          status: "occupied",
          title: "Mr. Anderson",
          time: "Check-in: 2 PM",
          details: "Cleaning: 11 AM - 1 PM"
        },
        tue: {
          status: "cleaning",
          title: "Housekeeping",
          details: "Deep Clean",
          duration: "2 hours"
        }
      }
    },
    {
      id: "202",
      number: "Suite 202",
      view: "City View",
      schedule: {
        mon: {
          status: "available",
          time: "From: 12 PM"
        },
        tue: {
          status: "maintenance",
          title: "Maintenance",
          details: "Plumbing Work",
          duration: "4 hours"
        }
      }
    }
  ];
  
  export const cleaningSchedule = [
    { type: "Regular Clean", time: "11 AM - 1 PM" },
    { type: "Deep Clean", time: "2 PM - 4 PM" },
    { type: "Express Service", time: "On Request" },
    { type: "Turndown", time: "6 PM - 8 PM" }
  ];