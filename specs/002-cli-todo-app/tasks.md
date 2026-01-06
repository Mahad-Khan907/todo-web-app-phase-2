# Task List: CLI Todo Application

**Feature**: CLI Todo Application
**Branch**: 002-cli-todo-app
**Date**: 2025-12-29
**Spec**: [specs/002-cli-todo-app/spec.md](../specs/002-cli-todo-app/spec.md)
**Plan**: [specs/002-cli-todo-app/plan.md](../specs/002-cli-todo-app/plan.md)

## Overview

This document defines the implementation tasks for the CLI Todo Application, organized by development phases. Each task includes acceptance criteria and dependencies.

## Phase 1: Setup (Shared Infrastructure)

### Task 1.1: Initialize Project with UV
**Objective**: Set up the project structure using UV package manager
**Dependencies**: None
**Acceptance Criteria**:
- [x] Create pyproject.toml with project metadata
- [x] Set Python version requirement to 3.13+
- [x] Initialize src/ directory structure
- [x] Create tests/ directory structure

**Implementation Steps**:
1. Run `uv init` in project root
2. Configure pyproject.toml with required dependencies
3. Create directory structure

### Task 1.2: Configure Python Version
**Objective**: Set up Python version specification
**Dependencies**: Task 1.1
**Acceptance Criteria**:
- [x] Create .python-version file with "3.13" content
- [x] Verify version compatibility

**Implementation Steps**:
1. Create .python-version file
2. Add "3.13" as content

### Task 1.3: Install Dependencies
**Objective**: Install all required dependencies
**Dependencies**: Task 1.1
**Acceptance Criteria**:
- [x] Click library installed and importable
- [x] Tabulate library installed and importable
- [x] Ruff linter installed and executable
- [x] Pytest installed and executable

**Implementation Steps**:
1. Install click: `uv add click`
2. Install tabulate: `uv add tabulate`
3. Install ruff: `uv add --dev ruff`
4. Install pytest: `uv add --dev pytest`

## Phase 2: Foundational (Blocking Prerequisites)

### Task 2.1: Create Task Dataclass
**Objective**: Implement the Task dataclass in models.py
**Dependencies**: Phase 1 complete
**Acceptance Criteria**:
- [x] File src/models.py exists
- [x] Task dataclass with id (int), title (str), description (Optional[str]), completed (bool)
- [x] Proper imports for dataclasses and typing
- [x] Default values set correctly (completed=False, description=None)

**Implementation Steps**:
1. Create src/models.py file
2. Import dataclasses and typing modules
3. Define Task dataclass with required attributes

### Task 2.2: Create TodoManager Skeleton
**Objective**: Implement basic TodoManager class structure
**Dependencies**: Task 2.1
**Acceptance Criteria**:
- [x] File src/manager.py exists
- [x] TodoManager class defined
- [x] In-memory storage initialized (list for tasks)
- [x] ID counter initialized
- [x] Method signatures for all required operations defined (add_task, list_tasks, update_task, delete_task, toggle_task)

**Implementation Steps**:
1. Create src/manager.py file
2. Define TodoManager class
3. Initialize in-memory storage
4. Define method signatures with pass implementations

### Task 2.3: Create CLI Entry Point
**Objective**: Set up the basic CLI structure with Click
**Dependencies**: Task 2.1, Task 2.2
**Acceptance Criteria**:
- [x] File src/main.py exists
- [x] Click CLI application initialized
- [x] Import statements for models and manager
- [x] TodoManager instance created
- [x] CLI app runs without errors (even if no commands yet)

**Implementation Steps**:
1. Create src/main.py file
2. Import click, models, and manager modules
3. Create TodoManager instance
4. Set up basic Click CLI structure

## Phase 3: User Story 1 - Add Task (P1)

### Task 3.1: Implement add_task Logic
**Objective**: Complete the add_task method in TodoManager
**Dependencies**: Task 2.2
**Acceptance Criteria**:
- [x] add_task method generates unique IDs
- [x] add_task validates title is not empty
- [x] add_task creates Task instance and adds to storage
- [x] add_task returns the ID of the created task
- [x] Method handles edge cases (empty title)

**Implementation Steps**:
1. Implement ID generation logic
2. Add title validation
3. Create and store Task instance
4. Return task ID
5. Add error handling

### Task 3.2: Implement 'add' CLI Command
**Objective**: Create the 'add' command in main.py
**Dependencies**: Task 3.1, Task 2.3
**Acceptance Criteria**:
- [x] 'add' command accepts title as required argument
- [x] 'add' command accepts description as optional argument
- [x] Command calls TodoManager.add_task
- [x] Success message displayed with task ID
- [x] Error handling for invalid input

**Implementation Steps**:
1. Create 'add' command with Click decorators
2. Define required title parameter
3. Define optional description parameter
4. Call TodoManager.add_task
5. Display success/error messages

## Phase 4: User Story 2 - View Tasks (P1)

### Task 4.1: Implement list_tasks Logic
**Objective**: Complete the list_tasks method in TodoManager
**Dependencies**: Task 2.2
**Acceptance Criteria**:
- [x] list_tasks returns all tasks in storage
- [x] Method works when no tasks exist
- [x] Returns tasks in the order they were created
- [x] No modification of stored tasks

**Implementation Steps**:
1. Implement list_tasks method
2. Return all tasks from storage
3. Handle empty list case

### Task 4.2: Implement 'list' CLI Command with Tabulate
**Objective**: Create the 'list' command with formatted output
**Dependencies**: Task 4.1, Task 2.3
**Acceptance Criteria**:
- [x] 'list' command displays tasks in tabular format
- [x] Table includes ID, Title, Description, and Status columns
- [x] Status shown as [ ] for incomplete, [X] for complete
- [x] Appropriate message when no tasks exist
- [x] Uses tabulate library for formatting

**Implementation Steps**:
1. Create 'list' command with Click
2. Call TodoManager.list_tasks
3. Format data using tabulate
4. Display status with [ ]/[X] markers
5. Handle empty list case

## Phase 5: User Story 3 - Update Task (P2)

### Task 5.1: Implement update_task Logic
**Objective**: Complete the update_task method in TodoManager
**Dependencies**: Task 2.2
**Acceptance Criteria**:
- [x] update_task locates task by ID
- [x] update_task updates title and description
- [x] update_task preserves other attributes (ID, completed status)
- [x] Returns True on success, False if task doesn't exist
- [x] Validates that title is not empty

**Implementation Steps**:
1. Implement task lookup by ID
2. Add update logic
3. Preserve unchanged attributes
4. Add validation and error handling
5. Return success/failure status

### Task 5.2: Implement 'update' CLI Command
**Objective**: Create the 'update' command in main.py
**Dependencies**: Task 5.1, Task 2.3
**Acceptance Criteria**:
- [x] 'update' command accepts ID, title, and optional description
- [x] Command calls TodoManager.update_task
- [x] Success message displayed when update succeeds
- [x] Error message when task ID doesn't exist
- [x] Error handling for invalid input

**Implementation Steps**:
1. Create 'update' command with Click
2. Define ID, title (required), and description (optional) parameters
3. Call TodoManager.update_task
4. Display appropriate success/error messages

## Phase 6: User Story 4 - Mark Task Complete (P2)

### Task 6.1: Implement toggle_task Logic
**Objective**: Complete the toggle_task method in TodoManager
**Dependencies**: Task 2.2
**Acceptance Criteria**:
- [x] toggle_task locates task by ID
- [x] toggle_task flips the completed status (True ↔ False)
- [x] Returns new completion status on success
- [x] Returns None if task doesn't exist
- [x] Preserves all other attributes

**Implementation Steps**:
1. Implement task lookup by ID
2. Add toggle logic for completed status
3. Return new status or None if not found
4. Preserve other attributes

### Task 6.2: Implement 'done' CLI Command
**Objective**: Create the 'done' command in main.py
**Dependencies**: Task 6.1, Task 2.3
**Acceptance Criteria**:
- [x] 'done' command accepts ID as argument
- [x] Command calls TodoManager.toggle_task
- [x] Success message shows new status
- [x] Error message when task ID doesn't exist
- [x] Command toggles status each time it's run

**Implementation Steps**:
1. Create 'done' command with Click
2. Define ID parameter
3. Call TodoManager.toggle_task
4. Display new status or error message

## Phase 7: User Story 5 - Delete Task (P3)

### Task 7.1: Implement delete_task Logic
**Objective**: Complete the delete_task method in TodoManager
**Dependencies**: Task 2.2
**Acceptance Criteria**:
- [x] delete_task locates task by ID
- [x] delete_task removes task from storage
- [x] Returns True on success, False if task doesn't exist
- [x] Does not reuse deleted task's ID
- [x] Preserves order of other tasks

**Implementation Steps**:
1. Implement task lookup by ID
2. Add deletion logic
3. Return success/failure status
4. Ensure ID is not reused

### Task 7.2: Implement 'delete' CLI Command
**Objective**: Create the 'delete' command in main.py
**Dependencies**: Task 7.1, Task 2.3
**Acceptance Criteria**:
- [x] 'delete' command accepts ID as argument
- [x] Command calls TodoManager.delete_task
- [x] Success message displayed when deletion succeeds
- [x] Error message when task ID doesn't exist
- [x] Error handling for invalid input

**Implementation Steps**:
1. Create 'delete' command with Click
2. Define ID parameter
3. Call TodoManager.delete_task
4. Display appropriate success/error messages

## Phase 8: Polish & Cross-Cutting Concerns

### Task 8.1: Implement Ruff Linting
**Objective**: Set up and run ruff linter on all source code
**Dependencies**: All previous tasks
**Acceptance Criteria**:
- [x] Ruff configuration file created (.ruff.toml)
- [x] All source files pass ruff linting
- [x] No linting errors or warnings remain
- [x] Code follows configured style guidelines

**Implementation Steps**:
1. Create ruff configuration
2. Run ruff check on src/
3. Fix all linting issues
4. Verify clean linting results

### Task 8.2: Manual CLI Verification
**Objective**: Manually test all CLI commands and functionality
**Dependencies**: All previous tasks
**Acceptance Criteria**:
- [x] Add command works with title and description
- [x] Add command works with title only
- [x] List command displays tasks correctly
- [x] Update command modifies tasks properly
- [x] Done command toggles completion status
- [x] Delete command removes tasks properly
- [x] All error cases handled appropriately

**Implementation Steps**:
1. Test add command with various inputs
2. Test list command with multiple tasks
3. Test update command functionality
4. Test done command toggling
5. Test delete command functionality
6. Test error conditions for each command

### Task 8.3: Write Unit Tests
**Objective**: Create comprehensive unit tests for all functionality
**Dependencies**: All implementation tasks
**Acceptance Criteria**:
- [x] Test file for models (test_models.py) with Task dataclass tests
- [x] Test file for manager (test_manager.py) with all method tests
- [x] Test file for CLI (test_cli.py) with integration tests
- [x] All tests pass
- [x] Good coverage of edge cases and error conditions

**Implementation Steps**:
1. Create test_models.py with Task tests
2. Create test_manager.py with TodoManager method tests
3. Create test_cli.py with CLI integration tests
4. Run all tests and verify they pass

### Task 8.4: Create README and Documentation
**Objective**: Document the CLI Todo Application for users
**Dependencies**: All implementation tasks
**Acceptance Criteria**:
- [x] README.md created with project overview
- [x] Installation instructions included
- [x] Usage examples for all commands
- [x] Dependencies listed
- [x] Contributing guidelines (optional)

**Implementation Steps**:
1. Create README.md file
2. Add project description
3. Include installation and usage instructions
4. Add examples for all commands
5. List dependencies and requirements