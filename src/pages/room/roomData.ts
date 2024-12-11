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
  capacity: number;
  amenities: string[];
  description: string;
  price: number;
  availableFrom: string;
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
    capacity: 2,
    amenities: ["King Bed", "Balcony", "Mini Bar"],
    description: "Luxurious suite with breathtaking ocean views.",
    price: 350,
    availableFrom: "2023-07-01",
    schedule: {
      mon: { status: "occupied", title: "Mr. Anderson", time: "Check-in: 2 PM", details: "Cleaning: 11 AM - 1 PM" },
      tue: { status: "cleaning", title: "Housekeeping", details: "Deep Clean", duration: "2 hours" },
      wed: { status: "occupied", title: "Ms. Johnson", time: "Check-in: 3 PM", details: "Late checkout requested" },
      thu: { status: "occupied", title: "Ms. Johnson", details: "Do not disturb" },
      fri: { status: "available", time: "From: 11 AM" },
      sat: { status: "maintenance", title: "Routine Check", details: "HVAC inspection", duration: "1 hour" },
      sun: { status: "available", time: "All day" }
    }
  },
  {
    id: "202",
    number: "Suite 202",
    view: "City View",
    capacity: 4,
    amenities: ["Two Queen Beds", "Kitchenette", "Work Desk"],
    description: "Spacious suite perfect for families or business travelers.",
    price: 300,
    availableFrom: "2023-06-15",
    schedule: {
      mon: { status: "available", time: "From: 12 PM" },
      tue: { status: "maintenance", title: "Maintenance", details: "Plumbing Work", duration: "4 hours" },
      wed: { status: "occupied", title: "Mr. Smith", time: "Check-in: 1 PM", details: "VIP guest" },
      thu: { status: "occupied", title: "Mr. Smith", details: "Extended stay" },
      fri: { status: "occupied", title: "Mr. Smith", time: "Check-out: 10 AM" },
      sat: { status: "cleaning", title: "Housekeeping", details: "Standard Clean", duration: "1.5 hours" },
      sun: { status: "available", time: "From: 2 PM" }
    }
  },
  {
    id: "203",
    number: "Suite 203",
    view: "Garden View",
    capacity: 3,
    amenities: ["Queen Bed", "Sofa Bed", "Jacuzzi Tub"],
    description: "Cozy suite with a relaxing garden view and luxurious amenities.",
    price: 275,
    availableFrom: "2023-06-20",
    schedule: {
      mon: { status: "occupied", title: "Ms. Davis", time: "Check-in: 4 PM", details: "Birthday celebration" },
      tue: { status: "occupied", title: "Ms. Davis", details: "Breakfast included" },
      wed: { status: "occupied", title: "Ms. Davis", time: "Check-out: 11 AM" },
      thu: { status: "cleaning", title: "Housekeeping", details: "Deep Clean", duration: "3 hours" },
      fri: { status: "available", time: "From: 3 PM" },
      sat: { status: "occupied", title: "Mr. & Mrs. Brown", time: "Check-in: 2 PM", details: "Anniversary package" },
      sun: { status: "occupied", title: "Mr. & Mrs. Brown", details: "Late checkout approved" }
    }
  }
];
  export const cleaningSchedule = [
    { type: "Regular Clean", time: "11 AM - 1 PM" },
    { type: "Deep Clean", time: "2 PM - 4 PM" },
    { type: "Express Service", time: "On Request" },
    { type: "Turndown", time: "6 PM - 8 PM" }
  ];