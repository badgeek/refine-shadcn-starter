PHONY: help
help:
	@echo "Available commands:"
	@echo "  install-shadcn-all  Install all shadcn components"

PHONY: dev
dev:
	pnpm run dev

PHONY: install-shadcn-all
install-shadcn-all:
	pnpx shadcn@latest add alert-dialog
	pnpx shadcn@latest add alert
	pnpx shadcn@latest add aspect-ratio
	pnpx shadcn@latest add avatar
	pnpx shadcn@latest add badge
	pnpx shadcn@latest add button
	pnpx shadcn@latest add calendar
	pnpx shadcn@latest add card
	pnpx shadcn@latest add carousel
	pnpx shadcn@latest add checkbox
	pnpx shadcn@latest add collapsible
	pnpx shadcn@latest add command
	pnpx shadcn@latest add context-menu
	pnpx shadcn@latest add dialog
	pnpx shadcn@latest add dropdown-menu
	pnpx shadcn@latest add form
	pnpx shadcn@latest add hover-card
	pnpx shadcn@latest add input
	pnpx shadcn@latest add label
	pnpx shadcn@latest add menubar
	pnpx shadcn@latest add navigation-menu
	pnpx shadcn@latest add popover
	pnpx shadcn@latest add progress
	pnpx shadcn@latest add radio-group
	pnpx shadcn@latest add scroll-area
	pnpx shadcn@latest add select
	pnpx shadcn@latest add separator
	pnpx shadcn@latest add sheet
	pnpx shadcn@latest add skeleton
	pnpx shadcn@latest add slider
	pnpx shadcn@latest add switch
	pnpx shadcn@latest add table
	pnpx shadcn@latest add tabs
	pnpx shadcn@latest add textarea
	pnpx shadcn@latest add toast
	pnpx shadcn@latest add toggle
	pnpx shadcn@latest add tooltip
	pnpx shadcn@latest add pagination
