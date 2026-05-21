# React Todo List - Minimalist Task Manager

A clean, minimalist React todo list application with drag-and-drop functionality. Tasks are visually represented as post-its that change color as they move between columns.

## Features

- ✅ **Drag and Drop**: Move tasks between three columns (To-Do, Doing, Done)
- 🎨 **Color Changing**: Post-its change color based on status
  - Light Blue for "To-Do"
  - Orange for "Doing"
  - Green for "Done"
- ➕ **Add Tasks**: Quickly add new tasks with the input field
- 🗑️ **Delete Tasks**: Remove tasks by clicking the × button
- 📱 **Responsive Design**: Works on desktop and tablet screens
- 🎯 **Minimalist UI**: Clean, distraction-free interface

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn package manager

### Installation

1. Navigate to the project directory:
```bash
cd "React Todo List"
```

2. Install dependencies:
```bash
npm install
```

### Running the Development Server

Start the development server:
```bash
npm run dev
```

The application will automatically open in your default browser at `http://localhost:3000`.

### Building for Production

Create an optimized production build:
```bash
npm run build
```

The built files will be in the `dist/` directory.

### Preview Production Build

To preview the production build locally:
```bash
npm run preview
```

## Project Structure

```
React Todo List/
├── TodoApp.jsx          # Main todo app component
├── App.jsx              # App wrapper component
├── main.jsx             # Entry point
├── index.html           # HTML template
├── index.css            # Global styles with Tailwind
├── vite.config.js       # Vite configuration
├── tailwind.config.js   # Tailwind CSS configuration
├── postcss.config.js    # PostCSS configuration
└── package.json         # Project dependencies
```

## How to Use

1. **Add a Task**: Type your task in the input field and click "Add" or press Enter
2. **Move a Task**: Click and drag any post-it to move it between columns
3. **Delete a Task**: Hover over a task and click the × button in the top-right corner
4. **Track Progress**: Watch your tasks progress from "To-Do" → "Doing" → "Done"

## Technologies Used

- **React 18**: UI library
- **Vite**: Fast build tool and dev server
- **Tailwind CSS**: Utility-first CSS framework
- **HTML5 Drag and Drop API**: Native drag functionality

## Customization

### Colors

To change the post-it colors, modify the `getColorClass` function in `TodoApp.jsx`:

```javascript
const getColorClass = (column) => {
  switch (column) {
    case 'todo':
      return 'bg-blue-100 border-blue-300';  // Customize this
    case 'doing':
      return 'bg-orange-100 border-orange-300';  // Customize this
    case 'done':
      return 'bg-green-100 border-green-300';  // Customize this
    default:
      return 'bg-blue-100 border-blue-300';
  }
};
```

### Column Names

Edit the `columns` array in `TodoApp.jsx` to change column titles or add more columns.

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Any modern browser supporting ES2020 and HTML5 Drag and Drop

## License

This project is open source and available for personal and commercial use.
