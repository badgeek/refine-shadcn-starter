import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

const profileData = {
  name: "John Designer",
  role: "Premium Member",
  avatarSrc: "https://github.com/shadcn.png",
  avatarFallback: "JD",
  credits: 150,
  orderCount: 25,
  shippingAddress: {
    line1: "123 Design Studio",
    line2: "Innovation Street",
    city: "Portland",
    state: "OR",
    zipCode: "97201"
  },
  preferredMaterials: ["Acrylic", "Plywood", "MDF"],
  orderStatistics: [
    { metric: "Completed Orders", value: "23", icon: "📦" },
    { metric: "Average Order Value", value: "$125", icon: "💰" },
    { metric: "On-Time Delivery Rate", value: "98%", icon: "⭐" }
  ],
  recentMaterials: [
    { name: "Clear Acrylic", thickness: "3mm", orders: 15, color: "blue" },
    { name: "Plywood", thickness: "6mm", orders: 8, color: "amber" },
    { name: "Black Acrylic", thickness: "5mm", orders: 5, color: "gray" }
  ],
  recentOrders: [
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
  ]
}

export default function ProfilePage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">My Profile</h2>
        <p className="text-muted-foreground">
          View and manage your profile information and preferences.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-12">
        <Card className="md:col-span-4 lg:col-span-3">
          <CardHeader>
            <div className="flex flex-col items-center text-center">
              <Avatar className="h-32 w-32 mb-6 ring-8 ring-primary/20 shadow-lg">
                <AvatarImage src={profileData.avatarSrc} />
                <AvatarFallback>{profileData.avatarFallback}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-2xl font-bold">{profileData.name}</CardTitle>
                <CardDescription className="mt-2 text-base">{profileData.role}</CardDescription>
                <div className="mt-6 flex flex-wrap gap-3 justify-center">
                  <Badge className="bg-green-100 text-green-800 px-4 py-1 text-sm font-medium">Credits: ${profileData.credits}</Badge>
                  <Badge className="bg-blue-100 text-blue-800 px-4 py-1 text-sm font-medium">{profileData.orderCount} Orders</Badge>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="text-sm">
                <h3 className="font-semibold mb-3 text-base">Shipping Address</h3>
                <div className="text-muted-foreground leading-relaxed bg-muted/30 p-3 rounded-lg">
                  <p>{profileData.shippingAddress.line1}</p>
                  <p>{profileData.shippingAddress.line2}</p>
                  <p>{`${profileData.shippingAddress.city}, ${profileData.shippingAddress.state} ${profileData.shippingAddress.zipCode}`}</p>
                </div>
              </div>
              <div className="text-sm">
                <h3 className="font-semibold mb-3 text-base">Preferred Materials</h3>
                <div className="flex flex-wrap gap-2">
                  {profileData.preferredMaterials.map((material, index) => (
                    <Badge key={index} variant="outline" className="px-4 py-1.5 hover:bg-primary/5 transition-colors">{material}</Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="md:col-span-8 lg:col-span-9 space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-bold">Order Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-5">
                  {profileData.orderStatistics.map((stat, i) => (
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
                  {profileData.recentMaterials.map((material, i) => (
                    <div key={i} className={`flex justify-between items-center p-3 rounded-lg bg-${material.color}-950/10 dark:bg-${material.color}-100/10`}>
                      <div className="flex flex-col">
                        <span className="text-sm font-medium">{material.name}</span>
                        <span className="text-xs text-muted-foreground">{material.thickness} thickness</span>
                      </div>
                      <Badge variant="secondary" className="text-sm">{material.orders} orders</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-bold">Recent Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {profileData.recentOrders.map((order, i) => (
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
