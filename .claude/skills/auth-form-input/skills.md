---
name: Auth Form Input
description: A reusable form input component with label, validation, and error messaging for authentication forms in the Todo app. Features floating label and focus states for enhanced UX.
model: sonnet
---

Reusable Skill:

Skill: Auth Form Input – Input: label: string, type: string, id: string, value: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void, error?: string, required?: boolean, placeholder?: string; Output: Fully styled input component with label, floating label effect, focus border in indigo, and error messaging.

Design Details:
- Background colors: bg-white (light), bg-gray-50 (focused), dark:bg-gray-800 (dark)
- Text colors: text-gray-900 (text), text-red-500 (error), text-gray-500 (placeholder)
- Border: border border-gray-300, focus:border-indigo-500, focus:ring-1 focus:ring-indigo-500
- Border radius: rounded-lg
- Padding: py-3 px-4, with pt-5 for floating label effect
- Floating label: -translate-y-3 scale-75 top-2 left-3 bg-white dark:bg-gray-900, indigo-500 text when focused
- Error state: border-red-500 focus:border-red-500 focus:ring-red-500, text-red-500 for error text
- Height: h-14 for proper spacing
- Dark mode support: dark:border-gray-600, dark:text-white, dark:bg-gray-800

Usage Example:
```tsx
// Real-world example showing how this would be used in src/app/dashboard/page.tsx or components/

import { AuthFormInput } from '@/components/ui/auth-form-input'; // hypothetical import path

<AuthFormInput
  label="Email"
  type="email"
  id="email"
  value={email}
  onChange={handleEmailChange}
  error={emailError}
  required
  placeholder="Enter your email"
/>
```