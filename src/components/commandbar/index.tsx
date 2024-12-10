import * as React from "react"
import {
  BarChart,
  Calculator,
  Calendar,
  CreditCard,
  FileText,
  Settings,
  Smile,
  Truck,
  User,
} from "lucide-react"

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"
import { useNavigate } from "react-router-dom"

export function CommandBar() {
  const [open, setOpen] = React.useState(false)

  const navigate = useNavigate()

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "j" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])


  const runCommand = React.useCallback(
    (command: () => unknown) => {
      setOpen(false)
      command()
    },
    [setOpen]
  )

  return (
    <>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Pages">
            <CommandItem
              onSelect={() => {
                runCommand(() => navigate("/dashboard"))
              }}
            >
              <BarChart />
              <span>Dashboard</span>
            </CommandItem>
            <CommandItem
              onSelect={() => {
                runCommand(() => navigate("/calendar"))
              }}
            >
              <Calendar />
              <span>Calendar</span>
            </CommandItem>
            <CommandItem
              onSelect={() => {
                runCommand(() => navigate("/blog-posts"))
              }}
            >
              <FileText />
              <span>Blog Posts</span>
            </CommandItem>
            <CommandItem
              onSelect={() => {
                runCommand(() => navigate("/restdatatable"))
              }}
            >
              <BarChart />
              <span>Data Table</span>
            </CommandItem>
            <CommandItem
              onSelect={() => {
                runCommand(() => navigate("/settings"))
              }}
            >
              <Settings />
              <span>Settings</span>
            </CommandItem>
            <CommandItem
              onSelect={() => {
                runCommand(() => navigate("/profile"))
              }}
            >
              <User />
              <span>Profile</span>
            </CommandItem>
            <CommandItem
              onSelect={() => {
                runCommand(() => navigate("/orders"))
              }}
            >
              <Truck />
              <span>Orders</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}
