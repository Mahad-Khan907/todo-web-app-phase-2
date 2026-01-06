---
id: 103-implement-cli-todo-application
title: Implement CLI Todo Application
stage: implementation
date_iso: 2025-12-29
surface: agent
model: Claude Sonnet 4.5
feature: 002-cli-todo-app
branch: 002-cli-todo-app
user: Claude Code
command: /sp.implement
labels:
  - implementation
  - todo-app
  - cli
links:
  spec: specs/002-cli-todo-app/spec.md
  plan: specs/002-cli-todo-app/plan.md
  tasks: specs/002-cli-todo-app/tasks.md
  ticket: null
  adr: null
  pr: null
files_yaml:
  - src/models.py
  - src/manager.py
  - src/main.py
  - pyproject.toml
  - .python-version
  - test_todo_app.py
  - quick_test.py
  - README.md
tests_yaml:
  - test_todo_app.py
---

# Implement CLI Todo Application

## Prompt Text

```
/sp.implement

Implement the CLI Todo Application based on specs/2-cli-todo-app/spec.md and plan.md.

I need you to combine the initial logic implementation with the interactive menu refactor immediately. Follow these requirements:

## 1. File Structure & Core Logic
- Create `src/models.py`: Implement a `Task` dataclass with `id`, `title`, `description`, and `completed` fields.
- Create `src/manager.py`: Implement a `TodoManager` class to handle an in-memory list of tasks.
- Methods: `add_task`, `list_tasks`, `update_task`, `toggle_task`, and `delete_task`.

## 2. Interactive Menu Interface (Refactored)
- In `src/main.py`, do NOT use discrete Click commands. Instead, implement a persistent interactive menu system.
- Program Loop: Wrap the logic in a `while True` loop so the program stays open until the user exits.
- Menu Options:
   1) Add Task (prompt for Title and Description sequentially)
   2) Update Task (prompt for ID, then new details)
   3) List Tasks (display using `tabulate` with [ ] and [X] marker
```

## Response Text

Successfully implemented the CLI Todo Application with:
- Task dataclass in models.py
- TodoManager class with all required methods in manager.py
- Interactive menu interface in main.py with persistent loop
- Proper error handling and user experience
- Tests to verify functionality
- Configuration files and documentation

## Outcome

The CLI Todo Application has been fully implemented according to specifications with all required functionality and proper architecture.