"use client"

import * as React from "react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign, Users, CreditCard, Activity } from "lucide-react"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

interface StatCardProps {
  title: string
  value: string
  change: string
  icon: React.ElementType
}

const StatCard = ({ title, value, change, icon: Icon }: StatCardProps) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      <Icon className="h-4 w-4 text-muted-foreground" />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      <p className="text-xs text-muted-foreground">{change}</p>
    </CardContent>
  </Card>
)

interface ChartButtonProps {
  chart: "desktop" | "mobile"
  isActive: boolean
  onClick: () => void
  label: string
  value: number
}

const ChartButton = ({ chart, isActive, onClick, label, value }: ChartButtonProps) => (
  <button
    data-active={isActive}
    className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
    onClick={onClick}
  >
    <span className="text-xs text-muted-foreground">{label}</span>
    <span className="text-lg font-bold leading-none sm:text-3xl">
      {value.toLocaleString()}
    </span>
  </button>
)

interface RecentSaleProps {
  index: number
  amount: string
}

const RecentSale = ({ index, amount }: RecentSaleProps) => (
  <div className="flex items-center">
    <div className="space-y-1">
      <p className="text-sm font-medium leading-none">
        Customer {index + 1}
      </p>
      <p className="text-sm text-muted-foreground">
        customer{index + 1}@example.com
      </p>
    </div>
    <div className="ml-auto font-medium">+${amount}</div>
  </div>
)
const StatCards = () => (
  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 w-full">
    <StatCard
      title="Total Revenue"
      value="$45,231.89"
      change="+20.1% from last month"
      icon={DollarSign}
    />
    <StatCard
      title="Subscriptions"
      value="+2350"
      change="+180.1% from last month"
      icon={Users}
    />
    <StatCard
      title="Sales"
      value="+12,234"
      change="+19% from last month"
      icon={CreditCard}
    />
    <StatCard
      title="Active Now"
      value="+573"
      change="+201 since last hour"
      icon={Activity}
    />
  </div>
)

const OverviewChart = ({ 
  activeChart,
  setActiveChart,
  chartData,
  chartConfig,
  total 
}: {
  activeChart: "desktop" | "mobile"
  setActiveChart: (chart: "desktop" | "mobile") => void
  chartData: Array<{date: string, desktop: number, mobile: number}>
  chartConfig: ChartConfig
  total: {desktop: number, mobile: number}
}) => (
  <Card className="col-span-4">
    <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
      <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
        <CardTitle>Overview</CardTitle>
      </div>
      <div className="flex">
        {["desktop", "mobile"].map((key) => {
          const chart = key as "desktop" | "mobile"
          return (
            <ChartButton
              key={chart}
              chart={chart}
              isActive={activeChart === chart}
              onClick={() => setActiveChart(chart)}
              label={chartConfig[chart].label as string}
              value={total[chart]}
            />
          )
        })}
      </div>
    </CardHeader>
    <CardContent className="px-2 sm:p-6">
      <ChartContainer
        config={chartConfig}
        className="aspect-auto h-[250px] w-full"
      >
        <BarChart
          accessibilityLayer
          data={chartData}
          margin={{
            left: 12,
            right: 12,
          }}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="date"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            minTickGap={32}
            tickFormatter={(value) => {
              const date = new Date(value)
              return date.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })
            }}
          />
          <ChartTooltip
            content={
              <ChartTooltipContent
                className="w-[150px]"
                nameKey="views"
                labelFormatter={(value) => {
                  return new Date(value).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })
                }}
              />
            }
          />
          <Bar dataKey={activeChart} fill={`var(--color-${activeChart})`} />
        </BarChart>
      </ChartContainer>
    </CardContent>
  </Card>
)

const RecentSalesCard = () => (
  <Card className="col-span-3">
    <CardHeader>
      <CardTitle>Recent Sales</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="space-y-8">
        {[...Array(5)].map((_, i) => (
          <RecentSale
            key={i}
            index={i}
            amount={(Math.random() * 1000).toFixed(2)}
          />
        ))}
      </div>
    </CardContent>
  </Card>
)

export default function DashboardPage() {
  const [activeChart, setActiveChart] = React.useState<"desktop" | "mobile">("desktop")

  const chartData = [
    { date: "2024-04-01", desktop: 222, mobile: 150 },
    { date: "2024-04-02", desktop: 97, mobile: 180 },
    { date: "2024-04-03", desktop: 167, mobile: 120 },
    { date: "2024-04-04", desktop: 242, mobile: 260 },
    { date: "2024-04-05", desktop: 373, mobile: 290 },
    { date: "2024-04-06", desktop: 301, mobile: 340 },
    { date: "2024-04-07", desktop: 245, mobile: 180 },
    { date: "2024-04-08", desktop: 409, mobile: 320 },
    { date: "2024-04-09", desktop: 59, mobile: 110 },
    { date: "2024-04-10", desktop: 261, mobile: 190 },
    { date: "2024-04-11", desktop: 327, mobile: 350 },
    { date: "2024-04-12", desktop: 292, mobile: 210 }
  ]

  const chartConfig = {
    views: {
      label: "Page Views",
    },
    desktop: {
      label: "Desktop" as string,
      color: "hsl(var(--chart-1))",
    },
    mobile: {
      label: "Mobile" as string,
      color: "hsl(var(--chart-2))",
    },
  } satisfies ChartConfig

  const total = React.useMemo(
    () => ({
      desktop: chartData.reduce((acc, curr) => acc + curr.desktop, 0),
      mobile: chartData.reduce((acc, curr) => acc + curr.mobile, 0),
    }),
    []
  )

  return (
    <div className="flex-1 space-y-4 p-8 pt-6 w-full">
      <div className="flex items-center justify-between space-y-2 w-full">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      </div>
      <StatCards />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 w-full">
        <OverviewChart 
          activeChart={activeChart}
          setActiveChart={setActiveChart}
          chartData={chartData}
          chartConfig={chartConfig}
          total={total}
        />
        <RecentSalesCard />
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 w-full">
        <Card>
          <CardHeader>
            <CardTitle>Top Referrers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {["Google", "Twitter", "GitHub", "LinkedIn", "Facebook"].map((site) => (
                <div key={site} className="flex items-center justify-between">
                  <span className="text-sm font-medium">{site}</span>
                  <span className="text-sm text-muted-foreground">
                    {Math.floor(Math.random() * 1000)} visits
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Active Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-2xl font-bold">{Math.floor(Math.random() * 1000)}</div>
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-primary" style={{ width: "60%" }} />
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">Current users</p>
                </div>
                <div className="flex-1">
                  <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-primary" style={{ width: "40%" }} />
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">Previous week</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Popular Pages</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {["/home", "/about", "/blog", "/contact", "/products"].map((page) => (
                <div key={page} className="flex items-center justify-between">
                  <span className="text-sm font-medium">{page}</span>
                  <span className="text-sm text-muted-foreground">
                    {Math.floor(Math.random() * 100)}%
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
