#!/bin/sh

echo "Waiting for database to be ready..."
sleep 5

# Apply database migrations
echo "Applying database migrations..."
python manage.py makemigrations --noinput
python manage.py migrate --noinput

# Create superuser if environment variable is set
if [ -n "$DJANGO_SUPERUSER_USERNAME" ] && [ -n "$DJANGO_SUPERUSER_PASSWORD" ]; then
    echo "Creating superuser..."
    python manage.py createsuperuser --noinput || true
fi

# Collect static files
echo "Collecting static files..."
python manage.py collectstatic --noinput

# Load sample data (optional - comment for production)
if [ "$LOAD_SAMPLE_DATA" = "true" ]; then
    echo "Loading sample data..."
    python load_data.py || true
fi

# Start Gunicorn
echo "Starting Gunicorn server..."
exec gunicorn --bind 0.0.0.0:8000 \
    --workers 3 \
    --timeout 120 \
    --access-logfile - \
    --error-logfile - \
    supplement_store.wsgi:application
