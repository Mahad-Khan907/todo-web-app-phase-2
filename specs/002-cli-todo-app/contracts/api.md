# API Contracts: CLI Todo Application

**Feature**: CLI Todo Application
**Branch**: 002-cli-todo-app
**Date**: 2025-12-29

## Overview

This document defines the API contracts for the CLI Todo Application. Since this is a CLI application, the "API" refers to the command-line interface contracts between the user and the application.

## CLI Command Contracts

### 1. Add Command

**Command**: `add`

**Purpose**: Add a new task to the todo list

**Signature**:
```
add <title> [description]
```

**Parameters**:
- `title` (required): The title of the task (string)
- `description` (optional): Detailed description of the task (string)

**Behavior**:
- Creates a new task with the provided title and description
- Assigns a unique ID to the task (auto-increment)
- Sets the completion status to `False` by default
- Returns success message with the created task ID

**Success Response**:
```
Task added successfully (ID: X)
```

**Error Cases**:
- Title is empty: Returns error message
- Invalid input format: Returns usage help

### 2. List Command

**Command**: `list`

**Purpose**: Display all tasks in a formatted table

**Signature**:
```
list
```

**Parameters**: None

**Behavior**:
- Retrieves all tasks from in-memory storage
- Formats tasks in a table with ID, Title, Description, and Status columns
- Uses `[ ]` for incomplete tasks and `[X]` for completed tasks
- Shows appropriate message if no tasks exist

**Success Response**:
```
ID  Title              Description          Status
--  -----------------  -------------------  --------
1   Buy groceries      Milk, eggs, bread    [ ]
2   Call dentist                          [X]
```

**Error Cases**:
- No tasks exist: Shows "No tasks found" message

### 3. Update Command

**Command**: `update`

**Purpose**: Update an existing task's title or description

**Signature**:
```
update <id> <title> [description]
```

**Parameters**:
- `id` (required): The ID of the task to update (integer)
- `title` (required): The new title for the task (string)
- `description` (optional): The new description for the task (string)

**Behavior**:
- Locates the task with the specified ID
- Updates the title and description
- Preserves other attributes (ID, completion status)
- Returns success message

**Success Response**:
```
Task X updated successfully
```

**Error Cases**:
- Task ID doesn't exist: Returns error message
- Invalid ID format: Returns error message
- Title is empty: Returns error message

### 4. Done Command (Toggle)

**Command**: `done`

**Purpose**: Toggle the completion status of a task

**Signature**:
```
done <id>
```

**Parameters**:
- `id` (required): The ID of the task to toggle (integer)

**Behavior**:
- Locates the task with the specified ID
- Flips the completion status (True ↔ False)
- Returns success message with new status

**Success Response**:
```
Task X marked as [complete/incomplete]
```

**Error Cases**:
- Task ID doesn't exist: Returns error message
- Invalid ID format: Returns error message

### 5. Delete Command

**Command**: `delete`

**Purpose**: Remove a task from the todo list

**Signature**:
```
delete <id>
```

**Parameters**:
- `id` (required): The ID of the task to delete (integer)

**Behavior**:
- Locates the task with the specified ID
- Removes the task from in-memory storage
- Returns success message

**Success Response**:
```
Task X deleted successfully
```

**Error Cases**:
- Task ID doesn't exist: Returns error message
- Invalid ID format: Returns error message

## Internal API Contracts

### TodoManager Class Interface

#### Methods Contract

**add_task(title: str, description: Optional[str] = None) -> int**
- Creates a new task with the given title and optional description
- Returns the ID of the created task
- Raises exception if title is empty

**list_tasks() -> List[Task]**
- Returns all tasks in the system
- Returns empty list if no tasks exist

**update_task(task_id: int, title: str, description: Optional[str] = None) -> bool**
- Updates an existing task with new title and description
- Returns True if successful, False if task doesn't exist

**toggle_task(task_id: int) -> Optional[bool]**
- Toggles the completion status of a task
- Returns the new completion status if successful, None if task doesn't exist

**delete_task(task_id: int) -> bool**
- Deletes a task by ID
- Returns True if successful, False if task doesn't exist

### Task Data Contract

The Task dataclass follows this contract:

```python
@dataclass
class Task:
    id: int          # Unique identifier (positive integer)
    title: str       # Task title (non-empty string)
    description: Optional[str]  # Optional description
    completed: bool  # Completion status (boolean)
```

## Error Handling Contracts

### Standard Error Messages

All commands follow these error message patterns:

- **Invalid ID**: "Error: Task with ID X does not exist"
- **Empty Title**: "Error: Task title cannot be empty"
- **Invalid Format**: "Error: Invalid command format. Use --help for usage information"
- **General Error**: "Error: [descriptive error message]"

### Exit Codes

- `0`: Success
- `1`: General error
- `2`: Usage/command line error

## Validation Rules

1. **Title Validation**: All titles must be non-empty strings
2. **ID Validation**: All IDs must be positive integers that exist in the system
3. **Format Validation**: Commands must follow the specified format
4. **Type Validation**: Parameters must match expected types