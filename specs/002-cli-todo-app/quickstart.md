# Quickstart Guide: CLI Todo Application

**Feature**: CLI Todo Application
**Branch**: 002-cli-todo-app
**Date**: 2025-12-29

## Overview

This guide provides step-by-step instructions to set up and start using the CLI Todo Application. The application allows you to manage tasks from the command line with add, list, update, toggle, and delete functionality.

## Prerequisites

- Python 3.13 or higher
- UV package manager (recommended) or pip
- Terminal/command prompt access

## Installation

### 1. Clone or Create Project Directory

```bash
mkdir cli-todo-app
cd cli-todo-app
```

### 2. Set Python Version

Create a `.python-version` file:

```bash
echo "3.13" > .python-version
```

### 3. Initialize Project with UV (Recommended)

```bash
uv init
# Or if starting fresh:
uv init --name cli-todo-app
```

### 4. Install Dependencies

```bash
uv add click tabulate pytest ruff
```

Or if using pip:

```bash
pip install click tabulate pytest ruff
```

### 5. Create Project Structure

```bash
mkdir src
touch src/__init__.py
touch src/models.py
touch src/manager.py
touch src/main.py
```

## Basic Usage

### Running the Application

Once implemented, run the application with:

```bash
python src/main.py --help
```

### Available Commands

#### Add a Task

```bash
python src/main.py add "Buy groceries" "Milk, eggs, bread"
```

Or with just a title:

```bash
python src/main.py add "Call dentist"
```

#### List All Tasks

```bash
python src/main.py list
```

#### Update a Task

```bash
python src/main.py update 1 "Buy weekly groceries" "Milk, eggs, bread, fruits, vegetables"
```

#### Mark Task as Complete/Incomplete

```bash
python src/main.py done 1  # Toggle completion status
```

#### Delete a Task

```bash
python src/main.py delete 1
```

## Expected Output Format

### List Command Output

```
ID  Title              Description          Status
--  -----------------  -------------------  --------
1   Buy groceries      Milk, eggs, bread    [ ]
2   Call dentist                          [X]
3   Finish report      Complete chapter 2   [ ]
```

Status indicators:
- `[ ]` - Incomplete task
- `[X]` - Completed task

## Development Setup

### Code Quality

Run the linter to ensure code quality:

```bash
ruff check src/
```

Format your code:

```bash
ruff format src/
```

### Running Tests

Execute all tests:

```bash
pytest
```

Run tests with coverage:

```bash
pytest --cov=src
```

## Configuration Files

### pyproject.toml Example

```toml
[project]
name = "cli-todo-app"
version = "0.1.0"
description = "A CLI-based todo application"
requires-python = ">=3.13"
dependencies = [
    "click>=8.0.0",
    "tabulate>=0.9.0",
]

[tool.ruff]
line-length = 88

[tool.pytest.ini_options]
testpaths = ["tests"]
python_files = ["test_*.py"]
```

### .python-version

```
3.13
```

## Troubleshooting

### Common Issues

1. **Command not found**: Ensure you're running `python src/main.py` from the project root
2. **Missing dependencies**: Run `uv sync` or `pip install -r requirements.txt` to install dependencies
3. **Permission errors**: Ensure you have read/write permissions to the project directory

## Next Steps

1. Implement the data model in `src/models.py`
2. Create the business logic in `src/manager.py`
3. Build the CLI interface in `src/main.py`
4. Write tests in the `tests/` directory
5. Run linting and formatting checks