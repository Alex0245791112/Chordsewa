# Chordsewa Frontend

A modern React frontend for Chordsewa - a Nepali bhajan and chorus web app with personalized lyrics, chords, and time signatures.

## Tech Stack

- **React 18** - UI library
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Axios** - HTTP client (ready to be used)

## Prerequisites

- Node.js 16+ 
- npm or yarn

## Installation

```bash
cd frontend
npm install
```

## Development

Start the development server:

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## Build

Create a production build:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Project Structure

```
frontend/
├── src/
│   ├── components/          # React components
│   │   ├── Header.jsx      # App header
│   │   ├── SongList.jsx    # Display songs grid
│   │   ├── SongCard.jsx    # Individual song card
│   │   └── SongForm.jsx    # Add new song form
│   ├── App.jsx             # Main app component
│   ├── App.css             # App styles
│   ├── main.jsx            # Entry point
│   └── index.css           # Global styles (Tailwind)
├── index.html              # HTML template
├── vite.config.js          # Vite configuration
├── tailwind.config.js      # Tailwind CSS config
├── postcss.config.js       # PostCSS config
├── package.json            # Dependencies
└── .gitignore              # Git ignore rules
```

## Features

### Current
- ✅ View all songs
- ✅ Add new songs with title, key, section, and slot
- ✅ Filter songs by section (Bhajan, Chorus, Baal Chorus, Other)
- ✅ Display song metadata and versions
- ✅ Responsive design with Tailwind CSS

### Coming Soon
- 🔜 View song details and all versions
- 🔜 Add chord versions with lyrics
- 🔜 Edit and delete songs
- 🔜 Vote on versions
- 🔜 Search and filter
- 🔜 User authentication
- 🔜 Add to favorites
- 🔜 Export lyrics and chords
- 🔜 Dark mode

## API Integration

The frontend connects to the Django backend running on `http://localhost:8000`

### API Endpoints Used

- `GET /api/songs/` - List all songs
- `POST /api/songs/` - Create new song
- `GET /api/songs/{id}/` - Get song details
- `POST /api/versions/` - Create new version
- `GET /api/versions/` - List all versions

## Configuration

### Backend URL

The API base URL is configured in components that make API calls:

```javascript
const API_BASE = 'http://localhost:8000/api'
```

To change, update this in:
- `src/App.jsx`
- `src/components/SongForm.jsx`

## Development Tips

### Hot Module Replacement (HMR)
Vite provides fast refresh - changes to components will be reflected instantly without losing state.

### Styling
- Global styles are in `src/index.css`
- Component-specific styles can be added in `src/components/`
- Tailwind classes are used for utility-first styling

### Adding New Components

1. Create new file in `src/components/ComponentName.jsx`
2. Export default function component
3. Import and use in other components

Example:
```jsx
// src/components/MyComponent.jsx
export default function MyComponent() {
  return <div>Hello</div>
}

// In another file
import MyComponent from './components/MyComponent'
```

## Troubleshooting

### Port 5173 Already in Use
```bash
npm run dev -- --port 3000
```

### CORS Issues
Make sure the backend is running and `http://localhost:5173` is in the `CORS_ALLOWED_ORIGINS` in Django settings.

### Tailwind CSS Not Loading
Make sure you've:
1. Installed dependencies: `npm install`
2. Restarted the dev server after installing

### API Not Connecting
Check that:
1. Backend is running on `http://localhost:8000`
2. API base URL is correct in the component
3. Backend has CORS configured properly

## Browser Support

Modern browsers with ES2015+ support:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Next Steps

- [ ] Set up routing with React Router
- [ ] Add user authentication
- [ ] Implement version management UI
- [ ] Add chord player/audio integration
- [ ] Progressive Web App (PWA) support
- [ ] Internationalization (i18n) for Nepali language

## License

This project is part of the Chordsewa application.

---

**Last Updated**: 2026-02-16
