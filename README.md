# Notes App

A modern, responsive web application for creating and managing notes with a clean and intuitive interface.

## Features

### Note Management
- **Create Notes**: Easily create new notes with a title and content using the floating "+" button
- **Read Notes**: View all notes in a responsive grid layout
- **Update Notes**: Edit existing notes by clicking on them and using the edit button
- **Delete Notes**: Remove unwanted notes with a delete button
- **Auto-save**: All changes are automatically saved to the database

### User Interface
- **Responsive Grid Layout**: Notes are displayed in a grid that automatically adjusts to screen size
- **Modal Windows**: Create and edit notes in modal windows for a focused experience
- **Hover Effects**: Interactive hover animations for better user feedback
- **Timestamps**: Each note displays creation and last update times
- **Error Handling**: User-friendly error messages for failed operations

### Technical Features
- **Real-time Updates**: UI updates immediately reflect database changes
- **Data Persistence**: All notes are stored in an SQLite database
- **Overflow Management**: Long content is handled gracefully with scrolling
- **Responsive Design**: Works on both desktop and mobile devices

## Technical Stack

### Frontend
- React.js
- CSS3 with Flexbox/Grid
- Modern JavaScript (ES6+)

### Backend
- Node.js
- Express.js
- SQLite3 Database
- Prisma (ORM)

## Usage

### Creating a Note
1. Click the "+" button in the bottom right corner
2. Enter a title and content in the modal window
3. Click "Save" to create the note

### Viewing Notes
- All notes are displayed in the main grid
- Click on any note to view its full content

### Editing a Note
1. Click on an existing note to open it
2. Click the "Edit" button
3. Modify the title and/or content
4. Click "Save" to update the note

### Deleting a Note
1. Click on an existing note to open it
2. Click the "Delete" button
3. The note will be permanently removed

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   # Install frontend dependencies
   cd frontend
   npm install

   # Install backend dependencies
   cd ../server
   npm install
   npx prisma generate
   ```
3. Start the backend server:
   ```bash
   cd server
   npm start
   ```
4. Start the frontend development server:
   ```bash
   cd frontend
   npm start
   ```
5. Open `http://localhost:3000` in your browser
6. After making a change to the db schema, run `npx prisma migrate dev --schema=./db/schema.prisma` to create a new migration to the database
7. If a change was made, re-run `npx prisma generate` to generate the new changes.

## Contributing

Feel free to submit issues and enhancement requests!

## License

This project is licensed under the MIT License - see the LICENSE file for details.
