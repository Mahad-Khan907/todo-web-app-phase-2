# Data Model: Phase 2 Infrastructure & Setup

## Entity: User
- **Purpose**: Represents a registered user with authentication credentials and personal information
- **Fields**:
  - id: UUID (Primary Key)
  - email: String (Unique, Required, Valid email format)
  - hashed_password: String (Required, Stored as bcrypt hash)
  - first_name: String (Optional)
  - last_name: String (Optional)
  - created_at: DateTime (Auto-generated)
  - updated_at: DateTime (Auto-generated, Updated on change)
  - is_active: Boolean (Default: true)
- **Relationships**:
  - One-to-Many: User has many Tasks
- **Validation Rules**:
  - Email must be unique
  - Email must be valid format
  - Password must be hashed before storage
  - Email and password are required for registration

## Entity: Task
- **Purpose**: Represents a todo item that belongs to a specific user
- **Fields**:
  - id: UUID (Primary Key)
  - title: String (Required, Max 200 characters)
  - description: Text (Optional)
  - completed: Boolean (Default: false)
  - priority: String (Enum: 'low', 'medium', 'high', Default: 'medium')
  - user_id: UUID (Foreign Key to User, Required)
  - created_at: DateTime (Auto-generated)
  - updated_at: DateTime (Auto-generated, Updated on change)
  - due_date: DateTime (Optional)
- **Relationships**:
  - Many-to-One: Task belongs to one User
- **Validation Rules**:
  - Title is required
  - User ID must reference an existing user
  - Priority must be one of the allowed values
  - Completed status can be toggled by the task owner

## State Transitions

### Task State Transitions
- **Uncompleted → Completed**: When user marks task as complete
- **Completed → Uncompleted**: When user unmarks task as complete

### User State Transitions
- **Inactive → Active**: When user verifies email/phone
- **Active → Inactive**: When account is deactivated

## Data Integrity Constraints
- Foreign key constraint ensures tasks belong to valid users
- Unique constraint on user email addresses
- Non-null constraints on required fields
- Check constraints on priority values