---
name: Dashboard Layout
description: A responsive dashboard layout with sidebar navigation and main content area. Features collapsible sidebar on mobile and consistent spacing for the Todo app dashboard.
model: sonnet
---

Reusable Skill:

Skill: Dashboard Layout – Input: sidebarContent: ReactNode, mainContent: ReactNode, headerContent?: ReactNode, sidebarOpen?: boolean, setSidebarOpen?: (open: boolean) => void; Output: Fully responsive dashboard layout with collapsible sidebar, proper navigation, and main content grid with consistent spacing.

Design Details:
- Background colors: bg-gray-50 (main), bg-white (sidebar/light), bg-gray-900 (sidebar/dark), dark:bg-gray-900 (main dark)
- Sidebar: fixed lg:relative w-64 lg:w-72 h-full lg:h-auto inset-y-0 z-30, bg-white dark:bg-gray-900
- Main content: lg:pl-72 flex-1, with padding p-4 md:p-6
- Header: sticky top-0 z-20 h-16 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm
- Mobile sidebar: -translate-x-full (hidden) or translate-x-0 (visible) with transition
- Overlay: fixed inset-0 bg-black/50 z-20 (mobile) when sidebar open
- Navigation items: flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800
- Responsive: sidebar collapses to drawer on mobile, hamburger menu toggle
- Dark mode support: dark:bg-gray-900, dark:text-white, dark:border-gray-700

Usage Example:
```tsx
// Real-world example showing how this would be used in src/app/dashboard/page.tsx or components/

import { DashboardLayout } from '@/components/ui/dashboard-layout'; // hypothetical import path

<DashboardLayout
  sidebarContent={
    <nav>
      <a href="/dashboard">Dashboard</a>
      <a href="/tasks">Tasks</a>
      <a href="/settings">Settings</a>
    </nav>
  }
  mainContent={
    <div>
      <h1>Dashboard</h1>
      <p>Your tasks and analytics</p>
    </div>
  }
  headerContent={
    <div className="flex items-center justify-between">
      <h1 className="text-xl font-bold">Todo App</h1>
      <button>Menu</button>
    </div>
  }
/>
```