---
name: Task List Item
description: A reusable task list item component with checkbox, title, due date, and action icons. Provides visual feedback for completed tasks and interactive elements for managing tasks.
model: sonnet
---

Reusable Skill:

Skill: Task List Item – Input: task: {id: string, title: string, completed: boolean, dueDate?: string}, onToggle: (id: string) => void, onDelete: (id: string) => void, onEdit: (id: string) => void; Output: Fully styled task list item with checkbox, title, due date, and edit/delete icons with proper strikethrough for completed tasks.

Design Details:
- Background colors: bg-white (default), bg-gray-50 (completed), dark:bg-gray-800/50 (dark)
- Text colors: text-gray-900 (title), text-gray-500 (due date), text-emerald-600 (completed text)
- Checkbox: rounded-full border-2 border-gray-300 checked:bg-emerald-500 checked:border-emerald-500
- Completed state: line-through text-gray-500 for title
- Due date: text-sm text-gray-500, red-500 if overdue
- Icons: hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full p-1
- Padding: py-3 px-4, with flex layout for alignment
- Border: border-b border-gray-200 dark:border-gray-700 (divider)
- Hover state: bg-gray-50 dark:bg-gray-800/70
- Dark mode support: dark:text-white, dark:border-gray-700, dark:bg-gray-800/50

Usage Example:
```tsx
// Real-world example showing how this would be used in src/app/dashboard/page.tsx or components/

import { TaskListItem } from '@/components/ui/task-list-item'; // hypothetical import path

<TaskListItem
  task={{id: '1', title: 'Complete project', completed: false, dueDate: '2024-12-31'}}
  onToggle={toggleTask}
  onDelete={deleteTask}
  onEdit={editTask}
/>
```