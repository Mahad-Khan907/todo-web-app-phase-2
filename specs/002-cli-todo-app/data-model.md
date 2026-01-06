# Data Model: CLI Todo Application

**Feature**: CLI Todo Application
**Branch**: 002-cli-todo-app
**Date**: 2025-12-29

## Overview

This document defines the data model for the CLI Todo Application. The application uses an in-memory data structure to store tasks with no persistence requirements.

## Core Data Structures

### Task Entity

The `Task` entity represents a single todo item in the system.

```python
from dataclasses import dataclass
from typing import Optional

@dataclass
class Task:
    id: int
    title: str
    description: Optional[str] = None
    completed: bool = False
```

**Attributes**:
- `id`: Unique identifier for the task (integer)
- `title`: The task title (string, required)
- `description`: Optional description of the task (string, optional)
- `completed`: Boolean indicating completion status (boolean, defaults to False)

**Constraints**:
- `id` must be unique within the application session
- `title` must not be empty
- `completed` defaults to False when creating a new task

## Storage Model

### In-Memory Storage

The application uses Python's built-in `list` data structure to store Task objects in memory:

```python
tasks: List[Task] = []
```

**Characteristics**:
- Non-persistent storage (data lost on application exit)
- Simple and efficient for single-user CLI application
- Tasks stored in order of creation
- Unique ID generation using auto-increment mechanism

### ID Generation

Task IDs are generated using a simple auto-increment mechanism:
- Start with ID 1 for the first task
- Increment by 1 for each new task
- IDs are never reused during the application session
- When a task is deleted, its ID is not reused

## Data Operations

### Create Task
- Generate next available ID
- Validate title is not empty
- Set completed to False by default
- Add to tasks list

### Read Tasks
- Return all tasks from the list
- Support filtering by completion status
- Support retrieval by ID

### Update Task
- Locate task by ID
- Update title or description
- Preserve ID and other unchanged attributes

### Delete Task
- Locate task by ID
- Remove from tasks list
- Do not reuse the ID

### Toggle Completion
- Locate task by ID
- Flip the completed status (True ↔ False)
- Preserve other attributes

## Relationships

The current implementation has no relationships between entities. Each Task is independent.

## Validation Rules

1. **Title Required**: Every task must have a non-empty title
2. **Unique ID**: Each task must have a unique ID within the session
3. **Valid ID Reference**: Operations that reference a task by ID must fail gracefully if the ID doesn't exist
4. **Type Safety**: All attributes must maintain their expected types

## Data Flow

```
User Input → CLI Layer → Manager Layer → Data Model → In-Memory Storage
     ↑                                           ↓
User Output ← CLI Layer ← Manager Layer ← Data Model
```

The data model is accessed exclusively through the TodoManager class to maintain encapsulation.