import React from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

export default function ProfilePage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">My Profile</h2>
      </div>

      <div className="grid gap-6 md:grid-cols-12">
        {/* Profile Card */}
        <Card className="md:col-span-4 lg:col-span-3">
          <CardHeader>
            <div className="flex flex-col items-center text-center">
              <Avatar className="h-32 w-32 mb-6 ring-8 ring-primary/20 shadow-lg">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-2xl font-bold">John Designer</CardTitle>
                <CardDescription className="mt-2 text-base">Premium Member</CardDescription>
                <div className="mt-6 flex flex-wrap gap-3 justify-center">
                  <Badge className="bg-green-100 text-green-800 px-4 py-1 text-sm font-medium">Credits: $150</Badge>
                  <Badge className="bg-blue-100 text-blue-800 px-4 py-1 text-sm font-medium">25 Orders</Badge>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="text-sm">
                <h3 className="font-semibold mb-3 text-base">Shipping Address</h3>
                <div className="text-muted-foreground leading-relaxed bg-muted/30 p-3 rounded-lg">
                  <p>123 Design Studio</p>
                  <p>Innovation Street</p>
                  <p>Portland, OR 97201</p>
                </div>
              </div>
              <div className="text-sm">
                <h3 className="font-semibold mb-3 text-base">Preferred Materials</h3>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="px-4 py-1.5 hover:bg-primary/5 transition-colors">Acrylic</Badge>
                  <Badge variant="outline" className="px-4 py-1.5 hover:bg-primary/5 transition-colors">Plywood</Badge>
                  <Badge variant="outline" className="px-4 py-1.5 hover:bg-primary/5 transition-colors">MDF</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="md:col-span-8 lg:col-span-9 space-y-6">
          {/* Order History & Analytics */}
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-bold">Order Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-5">
                  {[
                    { metric: "Completed Orders", value: "23", icon: "📦" },
                    { metric: "Average Order Value", value: "$125", icon: "💰" },
                    { metric: "On-Time Delivery Rate", value: "98%", icon: "⭐" }
                  ].map((stat, i) => (
                    <div key={i} className="flex justify-between items-center p-3 rounded-lg hover:bg-muted/30 transition-colors">
                      <span className="text-sm text-muted-foreground flex items-center gap-2">
                        <span>{stat.icon}</span>
                        {stat.metric}
                      </span>
                      <span className="font-semibold text-base">{stat.value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-bold">Recent Materials</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 rounded-lg bg-blue-950/10 dark:bg-blue-100/10">
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">Clear Acrylic</span>
                      <span className="text-xs text-muted-foreground">3mm thickness</span>
                    </div>
                    <Badge variant="secondary" className="text-sm">15 orders</Badge>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 rounded-lg bg-amber-950/10 dark:bg-amber-100/10">
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">Plywood</span>
                      <span className="text-xs text-muted-foreground">6mm thickness</span>
                    </div>
                    <Badge variant="secondary" className="text-sm">8 orders</Badge>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 rounded-lg bg-gray-950/10 dark:bg-gray-100/10">
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">Black Acrylic</span>
                      <span className="text-xs text-muted-foreground">5mm thickness</span>
                    </div>
                    <Badge variant="secondary" className="text-sm">5 orders</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order History */}
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-bold">Recent Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    orderNumber: "#LC-2023-088",
                    date: "Oct 15, 2023",
                    status: "Completed",
                    items: "5x Display Stands",
                    total: "$245"
                  },
                  {
                    orderNumber: "#LC-2023-087",
                    date: "Oct 12, 2023",
                    status: "Completed",
                    items: "Custom Signage",
                    total: "$180"
                  },
                  {
                    orderNumber: "#LC-2023-086",
                    date: "Oct 8, 2023",
                    status: "Completed",
                    items: "Prototype Parts",
                    total: "$95"
                  }
                ].map((order, i) => (
                  <div key={i} className="flex items-center justify-between p-4 rounded-lg bg-muted/30 hover:bg-muted/40 transition-colors">
                    <div className="space-y-1.5">
                      <p className="text-sm font-semibold">{order.orderNumber}</p>
                      <p className="text-sm text-muted-foreground">{order.items}</p>
                      <p className="text-xs text-muted-foreground">{order.date}</p>
                    </div>
                    <div className="text-right">
                      <Badge variant="outline" className="mb-2 px-3">{order.status}</Badge>
                      <p className="text-base font-semibold">{order.total}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
