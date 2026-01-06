---
name: Responsive Card
description: A reusable card component with responsive design, proper spacing, and consistent styling for displaying content in the Todo app. Features subtle shadows and hover effects.
model: sonnet
---

Reusable Skill:

Skill: Responsive Card – Input: children: ReactNode, title?: string, className?: string, variant?: 'elevated' | 'glass', hoverEffect?: boolean; Output: Fully styled, responsive card component using Tailwind with proper shadows, padding, and responsive width.

Design Details:
- Background colors: bg-white (elevated), bg-white/80 backdrop-blur-sm (glass), dark:bg-gray-800/90 (dark glass)
- Text colors: text-gray-900 (light), text-white (dark)
- Shadow: shadow-md (default), shadow-lg (hover), with dark:shadow-gray-900/20
- Border radius: rounded-xl
- Padding: p-4 (default), p-6 (large content)
- Hover effect: hover:shadow-lg hover:-translate-y-1 transition-transform duration-200
- Responsive: w-full, max-w-2xl, responsive padding on mobile
- Border: border border-gray-200 dark:border-gray-700
- Dark mode support: dark:bg-gray-800, dark:text-white, dark:border-gray-700

Usage Example:
```tsx
// Real-world example showing how this would be used in src/app/dashboard/page.tsx or components/

import { ResponsiveCard } from '@/components/ui/responsive-card'; // hypothetical import path

<ResponsiveCard title="Task Summary" hoverEffect={true}>
  <p>Total tasks: {taskCount}</p>
  <p>Completed: {completedCount}</p>
</ResponsiveCard>
```