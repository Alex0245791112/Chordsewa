# Chordsewa Backend

A Django REST API for managing Nepali bhajans and chorus with personalized lyrics, chords, and time signatures.

## Prerequisites

- Python 3.12+
- pip

## Setup Instructions

### 1. Create Virtual Environment
```bash
cd backend
python -m venv .venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate
```

### 2. Install Dependencies
```bash
pip install -r requirements.txt
```

### 3. Create Superuser
```bash
python manage.py createsuperuser --username=alex --email=alex@example.com
# When prompted for password, enter: alex@123
```

### 4. Run Migrations
```bash
python manage.py migrate
```

### 5. Start Development Server
```bash
python manage.py runserver 0.0.0.0:8000
```

The server will be available at `http://localhost:8000`

## API Endpoints

### Home
- `GET /` → Returns welcome message

### Admin Interface
- `GET /admin/` → Django admin panel (requires login with superuser credentials)

### Songs API
- `GET /api/songs/` → List all songs (paginated, 20 items per page)
- `POST /api/songs/` → Create a new song
- `GET /api/songs/{id}/` → Get song details with versions
- `PUT /api/songs/{id}/` → Update a song
- `DELETE /api/songs/{id}/` → Delete a song

### Versions API
- `GET /api/versions/` → List all chord versions
- `POST /api/versions/` → Create a new version
- `GET /api/versions/{id}/` → Get version details
- `PUT /api/versions/{id}/` → Update a version
- `DELETE /api/versions/{id}/` → Delete a version

## Example Requests

### Create a Song
```bash
curl -X POST http://localhost:8000/api/songs/ \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Sukh Shanti Pamai",
    "original_key": "C",
    "section": "bhajan",
    "slot": 1
  }'
```

### Create a Version
```bash
curl -X POST http://localhost:8000/api/versions/ \
  -H "Content-Type: application/json" \
  -d '{
    "song": 1,
    "key": "C",
    "chord_text": "[C] Sample lyrics..."
  }'
```

## Database Models

### Song
- `title` (CharField): Name of the song
- `original_key` (CharField): Musical key
- `section` (CharField): bhajan, chorus, baal_chorus, or other
- `slot` (IntegerField): Optional slot number for organized songs
- `created_at` (DateTimeField): Creation timestamp

### Version
- `song` (ForeignKey): Reference to Song
- `user` (ForeignKey): Author of this version
- `key` (CharField): Key the version is in
- `chord_text` (TextField): Chord notation and lyrics
- `votes` (IntegerField): Upvote count
- `created_at` (DateTimeField): Creation timestamp

## CORS Configuration

The backend is configured to accept requests from:
- `http://localhost:5173`
- `http://localhost:5174`
- `http://127.0.0.1:5173`
- `http://127.0.0.1:5174`
- `http://localhost:3000`
- `http://127.0.0.1:3000`

To add more origins, edit `CORS_ALLOWED_ORIGINS` in `bhajan_backend/settings.py`

## Troubleshooting

### ModuleNotFoundError: No module named 'django'
Make sure your virtual environment is activated:
```bash
source .venv/bin/activate  # macOS/Linux
.venv\Scripts\activate    # Windows
```

### Database Locked
Delete `db.sqlite3` and run migrations again:
```bash
rm db.sqlite3
python manage.py migrate
python manage.py createsuperuser
```

### Port Already in Use
Run on a different port:
```bash
python manage.py runserver 0.0.0.0:8001
```

## Admin Interface

Access at: `http://localhost:8000/admin/`

Default credentials:
- Username: `alex`
- Password: `alex@123`

In the admin panel, you can:
- View and manage songs
- Filter songs by section
- Search songs by title
- View and manage chord versions
- Filter versions by song or user

## Development

### Check for issues
```bash
python manage.py check
```

### Run migrations
```bash
python manage.py migrate
```

### Create test data
The database comes with 5 sample songs. You can add more via the API or admin panel.

## Project Structure

```
backend/
├── .venv/                    # Virtual environment
├── bhajan_backend/           # Main project package
│   ├── settings.py          # Django settings
│   ├── urls.py              # URL routing
│   ├── wsgi.py              # WSGI application
│   └── asgi.py              # ASGI application
├── songs/                    # Songs app
│   ├── models.py            # Database models
│   ├── views.py             # API views
│   ├── serializers.py       # DRF serializers
│   ├── urls.py              # App URL routing
│   ├── admin.py             # Admin configuration
│   ├── migrations/          # Database migrations
│   └── tests.py             # Tests
├── db.sqlite3               # SQLite database
├── manage.py                # Django management script
├── requirements.txt         # Python dependencies
├── .gitignore              # Git ignore rules
├── .env.example            # Example environment variables
└── runserver.sh            # Quick start script
```
