---
name: Modern Button
description: A reusable, accessible button component with multiple variants, sizes, and states for consistent UI across the Todo app. Provides proper hover, focus, and disabled states with Tailwind styling.
model: sonnet
---

Reusable Skill:

Skill: Modern Button – Input: children: ReactNode, variant: 'primary' | 'secondary' | 'danger' | 'ghost', size: 'sm' | 'md' | 'lg', onClick?: () => void, disabled?: boolean, loading?: boolean, className?: string; Output: Fully styled, accessible button component using Tailwind with hover/focus states and proper aria attributes.

Design Details:
- Background colors: bg-indigo-600 (primary), bg-gray-200 (secondary), bg-red-500 (danger), transparent (ghost)
- Text colors: text-white (primary/danger), text-gray-900 (secondary), text-indigo-600 (ghost)
- Hover states: hover:bg-indigo-700 (primary), hover:bg-gray-300 (secondary), hover:bg-red-600 (danger), hover:bg-gray-100 (ghost)
- Focus ring: focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500
- Border radius: rounded-lg
- Padding and font: font-medium, py-2 px-4 (md), py-1 px-3 (sm), py-3 px-6 (lg), text-sm (sm), text-base (md), text-lg (lg)
- Disabled style: opacity-50, cursor-not-allowed
- Loading state: spinner animation with opacity overlay
- Dark mode support: dark:bg-indigo-700, dark:hover:bg-indigo-600, etc.

Usage Example:
```tsx
// Real-world example showing how this would be used in src/app/dashboard/page.tsx or components/

import { ModernButton } from '@/components/ui/modern-button'; // hypothetical import path

<ModernButton variant="primary" size="md" onClick={handleAddTask}>
  Add New Task
</ModernButton>

<ModernButton variant="secondary" size="sm" onClick={handleCancel}>
  Cancel
</ModernButton>

<ModernButton variant="danger" size="md" onClick={handleDelete} disabled={isDeleting}>
  Delete Task
</ModernButton>
```