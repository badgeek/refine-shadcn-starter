import React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, CreditCard, Printer, Pencil, CircleCheckBig, Truck, CircleCheck, Link } from "lucide-react"

const orderData = {
  id: "ORD-12345",
  date: "2023-04-15",
  customer: {
    name: "Alice Johnson",
    email: "alice@example.com",
    address: "123 Main St, Anytown, AN 12345"
  },
  payment: {
    method: "Visa",
    lastFour: "1234"
  },
  summary: {
    subtotal: 101.97,
    shipping: 10.00,
    total: 111.97
  },
  status: {
    current: "Shipped",
    progress: 33,
    steps: [
      { status: "Processing", icon: CircleCheckBig, completed: true },
      { status: "Shipped", icon: Truck, completed: true },
      { status: "Out for Delivery", icon: Truck, completed: false },
      { status: "Delivered", icon: CircleCheck, completed: false }
    ]
  },
  items: [
    {
      name: "Wireless Headphones",
      image: "https://dashboard.shadcnuikit.com/images/products/1.png",
      quantity: 2,
      price: 25.99,
      total: 51.98
    },
    {
      name: "Bluetooth Speaker", 
      image: "https://dashboard.shadcnuikit.com/images/products/2.png",
      quantity: 1,
      price: 49.99,
      total: 49.99
    }
  ]
}
export default function OrderPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-1">
          <Link 
            href="/dashboard/pages/orders"
            className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Orders
          </Link>
          <span className="text-muted-foreground">/</span>
          <span className="text-sm font-medium">{orderData.id}</span>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <Printer className="mr-2 h-4 w-4" />
            Print
          </Button>
          <Button disabled size="sm">
            <Pencil className="mr-2 h-4 w-4" />
            Edit
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        

        <Card className="md:col-span-4">
          <CardHeader>
            <CardTitle>Order Details</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium">Status</p>
                <Badge variant="secondary">{orderData.status.current}</Badge>
              </div>
              <div className="space-y-1 text-right">
                <p className="text-sm font-medium">Date Placed</p>
                <p className="text-sm text-muted-foreground">{orderData.date}</p>
              </div>
            </div>
            <Separator />
            <div className="space-y-4">
              <div>
                <h3 className="mb-2 text-sm font-medium">Shipping Address</h3>
                <div className="rounded-lg border p-3 text-sm">
                  <p className="font-medium">{orderData.customer.name}</p>
                  <p className="text-muted-foreground">{orderData.customer.address}</p>
                </div>
              </div>
              <div>
                <h3 className="mb-2 text-sm font-medium">Contact Info</h3>
                <div className="rounded-lg border p-3 text-sm">
                  <p className="text-muted-foreground">{orderData.customer.email}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle>Payment</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center rounded-lg border p-4">
              <CreditCard className="h-4 w-4 text-muted-foreground" />
              <div className="ml-4 space-y-1">
                <p className="text-sm font-medium">{orderData.payment.method}</p>
                <p className="text-sm text-muted-foreground">**** {orderData.payment.lastFour}</p>
              </div>
            </div>
            <Separator />
            <div className="space-y-1.5">
              <div className="flex justify-between">
                <span className="text-sm">Subtotal</span>
                <span className="text-sm font-medium">${orderData.summary.subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Shipping</span>
                <span className="text-sm font-medium">${orderData.summary.shipping}</span>
              </div>
              <Separator className="my-2" />
              <div className="flex justify-between font-medium">
                <span>Total</span>
                <span>${orderData.summary.total}</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="md:col-span-7">
          <CardHeader>
            <CardTitle>Order Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col space-y-4">
              {orderData.status.steps.map((step, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                    step.completed 
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-300 text-gray-600'
                  }`}>
                    <step.icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className={`flex justify-between items-center p-3 rounded-lg shadow ${
                      step.completed
                        ? 'bg-blue-50 dark:bg-blue-900/20'
                        : 'bg-white dark:bg-gray-800'
                    }`}>
                      <span className={`text-sm font-semibold ${
                        step.completed
                          ? 'text-blue-700 dark:text-blue-400'
                          : 'text-gray-700 dark:text-gray-300'
                      }`}>
                        {index + 1}. {step.status}
                      </span>
                      <span className={`text-xs ${
                        step.completed
                          ? 'text-blue-600 dark:text-blue-300'
                          : 'text-gray-500 dark:text-gray-400'
                      }`}>
                        {step.completed ? 'Completed' : 'Pending'}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-7">
          <CardHeader>
            <CardTitle>Products</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead className="text-right">Quantity</TableHead>
                  <TableHead className="text-right">Unit Price</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orderData.items.map((item, i) => (
                  <TableRow key={i}>
                    <TableCell>
                      <div className="flex items-center gap-4">
                        <img 
                          src={item.image}
                          alt={item.name}
                          className="h-12 w-12 rounded-md object-cover"
                        />
                        <span className="font-medium">{item.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">{item.quantity}</TableCell>
                    <TableCell className="text-right">${item.price}</TableCell>
                    <TableCell className="text-right font-medium">${item.total}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
