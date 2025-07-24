# Server - Node.js Backend

## Meeting Module Documentation

### Overview
The Meeting module provides a complete RESTful API for managing meetings in the CRM system. It includes all CRUD operations with proper authentication and data validation.

### File Structure

```
controllers/meeting/
├── _routes.js        # API route definitions
└── meeting.js        # Controller functions

model/schema/
└── meeting.js        # Mongoose schema definition
```

### API Endpoints

#### 1. Get All Meetings
- **Method**: `GET`
- **URL**: `/api/meeting/`
- **Authentication**: Required
- **Response**: Array of meeting objects
- **Query Parameters**: Optional filters

#### 2. Create Meeting
- **Method**: `POST`
- **URL**: `/api/meeting/add`
- **Authentication**: Required
- **Request Body**: Meeting object
- **Response**: Created meeting object

#### 3. Get Single Meeting
- **Method**: `GET`
- **URL**: `/api/meeting/view/:id`
- **Authentication**: Required
- **Response**: Single meeting object

#### 4. Update Meeting
- **Method**: `PUT`
- **URL**: `/api/meeting/edit/:id`
- **Authentication**: Required
- **Request Body**: Updated meeting data
- **Response**: Update result

#### 5. Delete Meeting
- **Method**: `DELETE`
- **URL**: `/api/meeting/delete/:id`
- **Authentication**: Required
- **Response**: Deletion confirmation

#### 6. Delete Multiple Meetings
- **Method**: `POST`
- **URL**: `/api/meeting/deleteMany`
- **Authentication**: Required
- **Request Body**: Array of meeting IDs
- **Response**: Bulk deletion result

### Data Schema

```javascript
const meetingHistory = new mongoose.Schema({
    agenda: { type: String, required: true },
    attendes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Contact',
    }],
    attendesLead: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Lead',
    }],
    location: String,
    related: String,
    dateTime: String,
    notes: String,
    createBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        require: true,
    },
    timestamp: {
        type: Date,
        default: Date.now
    },
    deleted: {
        type: Boolean,
        default: false,
    },
})
```

### Controller Functions

#### `add(req, res)`
- Creates a new meeting
- Automatically sets timestamp and creator
- Validates required fields
- Returns created meeting object

#### `index(req, res)`
- Retrieves all non-deleted meetings
- Supports query filtering
- Populates creator information
- Returns array of meetings

#### `view(req, res)`
- Retrieves single meeting by ID
- Populates creator information
- Returns 404 if not found
- Returns meeting object

#### `edit(req, res)`
- Updates existing meeting
- Validates meeting ID
- Returns update result

#### `deleteData(req, res)`
- Soft deletes meeting (sets deleted: true)
- Returns deletion confirmation

#### `deleteMany(req, res)`
- Bulk soft delete multiple meetings
- Accepts array of meeting IDs
- Returns bulk operation result

### Authentication

All endpoints require JWT authentication:
- Token must be provided in `Authorization` header
- Token is verified using `secret_key` or `JWT_SECRET` environment variable
- User ID is extracted from token and available in `req.user.userId`

### Error Handling

- **400 Bad Request**: Invalid data or missing required fields
- **401 Unauthorized**: Missing or invalid authentication token
- **404 Not Found**: Meeting not found
- **500 Internal Server Error**: Server-side errors

### Database Operations

- **MongoDB**: Uses Mongoose ODM
- **Soft Delete**: Records are marked as deleted rather than removed
- **Population**: Creator information is populated from User collection
- **Indexing**: Uses MongoDB's default indexing on `_id`

### Security Features

- JWT token validation
- User authentication required for all operations
- Input validation and sanitization
- Soft delete prevents data loss
- Creator tracking for audit trails

### Dependencies

- Express.js for routing
- Mongoose for MongoDB operations
- JWT for authentication
- Body-parser for request parsing
- CORS for cross-origin requests

### Environment Variables

```env
JWT_SECRET=your_jwt_secret_key
DB_URL=mongodb://localhost:27017
DB=Prolink
```

### Usage Examples

#### Create Meeting
```bash
curl -X POST http://localhost:5001/api/meeting/add \
  -H "Authorization: YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "agenda": "Project Review",
    "dateTime": "2024-01-15T10:00:00",
    "location": "Conference Room A",
    "notes": "Quarterly project review meeting"
  }'
```

#### Get All Meetings
```bash
curl -X GET http://localhost:5001/api/meeting/ \
  -H "Authorization: YOUR_JWT_TOKEN"
```

#### Update Meeting
```bash
curl -X PUT http://localhost:5001/api/meeting/edit/MEETING_ID \
  -H "Authorization: YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "agenda": "Updated Project Review",
    "location": "Conference Room B"
  }'
``` 