import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Bell } from "lucide-react"
import { roomData, cleaningSchedule, RoomSchedule } from "./roomData"
import { cn } from "@/lib/utils"
import { Main } from "@/components/layout/main"
import React, { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

const statusConfig = {
    available: { color: "bg-green-500 dark:bg-green-700", text: "text-green-700 dark:text-green-300" },
    occupied: { color: "bg-yellow-500 dark:bg-yellow-700", text: "text-yellow-700 dark:text-yellow-300" },
    cleaning: { color: "bg-blue-500 dark:bg-blue-700", text: "text-blue-700 dark:text-blue-300" },
    maintenance: { color: "bg-red-500 dark:bg-red-700", text: "text-red-700 dark:text-red-300" }
}

const StatusBadge = ({ status }: { status: keyof typeof statusConfig }) => (
    <Badge variant="outline" className={cn("font-medium", statusConfig[status].text)}>
        <div className={cn("w-2 h-2 rounded-full mr-2", statusConfig[status].color)} />
        {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
)

const ScheduleCell = ({ schedule }: { schedule?: RoomSchedule }) => {
    if (!schedule) return null
    return (
        <Card className="p-3 hover:shadow-md transition-shadow h-full">
            <div className="flex items-center space-x-2">
                <div className={cn("w-2 h-2 rounded-full", statusConfig[schedule.status].color)} />
                <span className="text-xs font-medium">{schedule.title}</span>
            </div>
            {schedule.time && <div className="mt-2 text-xs text-muted-foreground">{schedule.time}</div>}
            {schedule.details && (
                <div className="mt-1 text-xs text-blue-500 dark:text-blue-400 flex items-center">
                    {schedule.status === "cleaning" ? <Clock className="w-3 h-3 mr-1" /> : <Bell className="w-3 h-3 mr-1" />}
                    {schedule.details}
                </div>
            )}
        </Card>
    )
}
const RoomDetailsDialog = ({ room, isOpen, onClose }: { room: typeof roomData[0] | null, isOpen: boolean, onClose: () => void }) => {
    if (!room) return null;
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Room {room.number}</DialogTitle>
                    <DialogDescription>{room.view} View</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Capacity</span>
                        <span className="text-sm">{room.capacity} persons</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Size</span>
                        <span className="text-sm">{room.size} sq ft</span>
                    </div>
                    <div>
                        <span className="text-sm font-medium block mb-2">Amenities</span>
                        <div className="flex flex-wrap gap-2">
                            {room.amenities.map((amenity, index) => (
                                <Badge key={index} variant="secondary">{amenity}</Badge>
                            ))}
                        </div>
                    </div>
                    <div>
                        <span className="text-sm font-medium block mb-1">Description</span>
                        <p className="text-sm text-muted-foreground">{room.description}</p>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Price</span>
                        <span className="text-sm font-semibold">${room.price} / night</span>
                    </div>
                    <div>
                        <span className="text-sm font-medium block mb-1">Availability</span>
                        <p className="text-sm text-green-600">Available from {room.availableFrom}</p>
                    </div>
                </div>
                <DialogFooter className="mt-6">
                    <Button variant="outline" onClick={onClose}>Close</Button>
                    <Button onClick={() => console.log(`Booking room ${room.number}`)}>Book Now</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
export function RoomAvailability() {
    const days = ['Room', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    const [selectedRoom, setSelectedRoom] = useState<typeof roomData[0] | null>(null)

    return (
        <Main>
            <Card className="mx-auto">
                <div className="p-6 border-b">
                    <div className="flex justify-between items-center">
                        <h2 className="text-3xl font-bold">Room Availability</h2>
                        <div className="flex gap-3">
                            {Object.keys(statusConfig).map((status) => (
                                <StatusBadge key={status} status={status as keyof typeof statusConfig} />
                            ))}
                        </div>
                    </div>
                </div>

                <div className="">
                    <div className="grid grid-cols-8 gap-px bg-gray-200 dark:bg-gray-900">
                        {days.map((day) => (
                            <div key={day} className="col-span-1 text-sm font-medium text-muted-foreground bg-white dark:bg-gray-950 p-2">{day}</div>
                        ))}

                        {roomData.map((room) => (
                            <React.Fragment key={room.id}>
                                <div
                                    className="col-span-1 bg-white dark:bg-gray-950 p-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-900"
                                    onClick={() => setSelectedRoom(room)}
                                >
                                    <div className="flex flex-col">
                                        <span className="text-sm font-medium">{room.number}</span>
                                        <span className="text-xs text-muted-foreground">{room.view}</span>
                                    </div>
                                </div>
                                {['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'].map((day) => (
                                    <div key={day} className="col-span-1 bg-white dark:bg-gray-950 p-2">
                                        <ScheduleCell schedule={room.schedule[day] as RoomSchedule | undefined} />
                                    </div>
                                ))}
                            </React.Fragment>
                        ))}
                    </div>
                </div>

                <Card className="mt-4 border-t border-gray-200 dark:border-gray-800 rounded-none">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-lg text-gray-900 dark:text-gray-100">
                            Cleaning Schedule
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {cleaningSchedule.map((schedule) => (
                                <div key={schedule.type} className="flex items-center justify-between p-4 bg-gray-100 dark:bg-gray-800 rounded-sm">
                                    <div className="flex items-center space-x-3">
                                        <Clock className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                                        <span className="text-sm font-medium text-gray-900 dark:text-gray-100">{schedule.type}</span>
                                    </div>
                                    <span className="text-sm font-mono text-gray-600 dark:text-gray-400">{schedule.time}</span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </Card>
            <RoomDetailsDialog room={selectedRoom} isOpen={!!selectedRoom} onClose={() => setSelectedRoom(null)} />
        </Main>
    )
}