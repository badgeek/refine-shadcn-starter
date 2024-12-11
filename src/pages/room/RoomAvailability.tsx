import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Bell } from "lucide-react"
import { roomData, cleaningSchedule, RoomSchedule } from "./roomData"
import { cn } from "@/lib/utils"
import { Main } from "@/components/layout/main"
import React from "react"

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

export function RoomAvailability() {
    const days = ['Room', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

    return (
        <Main>
            <Card className=" mx-auto">
                <div className="p-6 border-b">
                    <div className="flex justify-between items-center">
                        <h2 className="text-2xl font-light">Room Availability</h2>
                        <div className="flex gap-3">
                            {Object.keys(statusConfig).map((status) => (
                                <StatusBadge key={status} status={status as keyof typeof statusConfig} />
                            ))}
                        </div>
                    </div>
                </div>

                <div className="p-6">
                    <div className="grid grid-cols-8 gap-px bg-gray-200 dark:bg-gray-700">
                        {days.map((day) => (
                            <div key={day} className="col-span-1 text-sm font-medium text-muted-foreground bg-white dark:bg-gray-800 p-2">{day}</div>
                        ))}

                        {roomData.map((room) => (
                            <React.Fragment key={room.id}>
                                <div className="col-span-1 bg-white dark:bg-gray-800 p-2">
                                    <div className="flex flex-col">
                                        <span className="text-sm font-medium">{room.number}</span>
                                        <span className="text-xs text-muted-foreground">{room.view}</span>
                                    </div>
                                </div>
                                {['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'].map((day) => (
                                    <div key={day} className="col-span-1 bg-white dark:bg-gray-800 p-2">
                                        <ScheduleCell schedule={room.schedule[day] as RoomSchedule | undefined} />
                                    </div>
                                ))}
                            </React.Fragment>
                        ))}
                    </div>
                </div>

                <div className="bg-blue-50 dark:bg-blue-950 p-4 mx-6 mb-6 rounded-lg">
                    <h3 className="text-sm font-medium text-blue-800 dark:text-blue-300 mb-2">Cleaning Schedule Info</h3>
                    <div className="grid grid-cols-2 gap-4 text-xs text-blue-600 dark:text-blue-400">
                        {cleaningSchedule.map((schedule) => (
                            <div key={schedule.type}>
                                <span className="font-medium">{schedule.type}:</span> {schedule.time}
                            </div>
                        ))}
                    </div>
                </div>
            </Card>
        </Main>
    )
}