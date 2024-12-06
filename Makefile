PHONY: help
help:
	@echo "Available commands:"
	@echo "  install-shadcn-all  Install all shadcn components"

PHONY: dev
dev:
	pnpm run dev

PHONY: install-shadcn-all
install-shadcn-all:
	pnpm dlx shadcn@latest add alert-dialog
	pnpm dlx shadcn@latest add alert
	pnpm dlx shadcn@latest add aspect-ratio
	pnpm dlx shadcn@latest add avatar
	pnpm dlx shadcn@latest add badge
	pnpm dlx shadcn@latest add button
	pnpm dlx shadcn@latest add calendar
	pnpm dlx shadcn@latest add card
	pnpm dlx shadcn@latest add carousel
	pnpm dlx shadcn@latest add checkbox
	pnpm dlx shadcn@latest add collapsible
	pnpm dlx shadcn@latest add command
	pnpm dlx shadcn@latest add context-menu
	pnpm dlx shadcn@latest add dialog
	pnpm dlx shadcn@latest add dropdown-menu
	pnpm dlx shadcn@latest add form
	pnpm dlx shadcn@latest add hover-card
	pnpm dlx shadcn@latest add input
	pnpm dlx shadcn@latest add label
	pnpm dlx shadcn@latest add menubar
	pnpm dlx shadcn@latest add navigation-menu
	pnpm dlx shadcn@latest add popover
	pnpm dlx shadcn@latest add progress
	pnpm dlx shadcn@latest add radio-group
	pnpm dlx shadcn@latest add scroll-area
	pnpm dlx shadcn@latest add select
	pnpm dlx shadcn@latest add separator
	pnpm dlx shadcn@latest add sheet
	pnpm dlx shadcn@latest add skeleton
	pnpm dlx shadcn@latest add slider
	pnpm dlx shadcn@latest add switch
	pnpm dlx shadcn@latest add table
	pnpm dlx shadcn@latest add tabs
	pnpm dlx shadcn@latest add textarea
	pnpm dlx shadcn@latest add toast
	pnpm dlx shadcn@latest add toggle
	pnpm dlx shadcn@latest add tooltip
	pnpm dlx shadcn@latest add pagination
	pnpm dlx shadcn@latest add sidebar
	pnpm dlx shadcn@latest add chart
	pnpm dlx shadcn@latest add breadcrumb
