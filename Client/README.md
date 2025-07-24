# Client - React Frontend

## Meeting Module Documentation

### Overview
The Meeting module provides a complete CRUD interface for managing meetings in the CRM system. It includes list view, add/edit forms, and detailed view components.

### Components Structure

```
src/views/admin/meeting/
├── index.js          # Meeting list with table and actions
├── AddEdit.js        # Form for creating/editing meetings
└── View.js           # Detailed view of a single meeting
```

### Features

#### 1. Meeting List (`index.js`)
- **Route**: `/metting`
- **Features**:
  - Display all meetings in a table format
  - Show agenda, date/time, and location
  - Action buttons: Edit, View, Delete
  - Add new meeting button
  - Real-time data fetching from API

#### 2. Add/Edit Meeting (`AddEdit.js`)
- **Routes**: 
  - `/metting/add` - Create new meeting
  - `/metting/edit/:id` - Edit existing meeting
- **Features**:
  - Form with all meeting fields
  - Validation for required fields
  - Date/time picker
  - Auto-save creator information
  - Navigation back to list

#### 3. View Meeting (`View.js`)
- **Route**: `/metting/view/:id`
- **Features**:
  - Display all meeting details
  - Read-only view
  - Back to list navigation

### API Integration

The module uses the following API endpoints:
- `GET /api/meeting/` - Get all meetings
- `POST /api/meeting/add` - Create new meeting
- `GET /api/meeting/view/:id` - Get single meeting
- `PUT /api/meeting/edit/:id` - Update meeting
- `DELETE /api/meeting/delete/:id` - Delete meeting

### Data Structure

```javascript
{
  agenda: String,           // Required - meeting agenda
  attendes: [ObjectId],     // Array of contact IDs
  attendesLead: [ObjectId], // Array of lead IDs
  location: String,         // Meeting location
  related: String,          // Related information
  dateTime: String,         // Meeting date and time
  notes: String,            // Additional notes
  createBy: ObjectId,       // Creator user ID
  timestamp: Date,          // Creation timestamp
  deleted: Boolean          // Soft delete flag
}
```

### Usage

1. **Navigate to Meetings**: Go to `/metting` in the admin panel
2. **Create Meeting**: Click "Add Meeting" button
3. **Edit Meeting**: Click "Edit" button on any meeting row
4. **View Details**: Click "View" button on any meeting row
5. **Delete Meeting**: Click "Delete" button on any meeting row

### Dependencies

- React 17.0.2
- Chakra UI for components
- React Router for navigation
- Axios for API calls
- Formik for form handling

### Styling

Uses Chakra UI components for consistent styling:
- `Box`, `Flex` for layout
- `Button` for actions
- `Table`, `Thead`, `Tbody`, `Tr`, `Th`, `Td` for data display
- `Input`, `Textarea`, `FormControl`, `FormLabel` for forms
- `VStack` for vertical stacking

### Error Handling

- API errors are caught and displayed
- Form validation prevents invalid submissions
- Navigation handles missing data gracefully
- Loading states for better UX 