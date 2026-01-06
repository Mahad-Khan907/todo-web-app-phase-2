---
name: Loading Skeleton
description: A reusable loading skeleton component with animated pulse effect for displaying content placeholders while data is loading in the Todo app. Provides consistent UX during loading states.
model: sonnet
---

Reusable Skill:

Skill: Loading Skeleton – Input: type: 'text' | 'rect' | 'circle' | 'task', width?: string, height?: string, count?: number, className?: string; Output: Animated loading skeleton with pulse animation using bg-gray-200 dark:bg-gray-700 and proper sizing for different content types.

Design Details:
- Background colors: bg-gray-200 animate-pulse (light), bg-gray-700 animate-pulse (dark)
- Animation: animate-pulse with duration-1000 for smooth loading effect
- Border radius: rounded-lg (rect), rounded-full (circle/task avatar)
- Width/Height: configurable via props, default sizes for each type
- Task type: simulates task list with checkbox, title line, and date line
- Text type: horizontal lines simulating text content
- Responsive: adjusts to container width
- Dark mode support: dark:bg-gray-700, with proper contrast
- Accessibility: role="status" with aria-label for screen readers

Usage Example:
```tsx
// Real-world example showing how this would be used in src/app/dashboard/page.tsx or components/

import { LoadingSkeleton } from '@/components/ui/loading-skeleton'; // hypothetical import path

{isLoading ? (
  <LoadingSkeleton type="task" count={5} />
) : (
  <TaskList tasks={tasks} />
)}
```