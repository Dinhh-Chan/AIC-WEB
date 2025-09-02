#!/bin/bash

# Script to automatically generate Alembic migration based on model changes
# Usage: ./generate_migration.sh "migration_message"

if [ -z "$1" ]
then
    echo "Error: Migration message is required"
    echo "Usage: ./generate_migration.sh \"migration_message\""
    exit 1
fi

MESSAGE=$1
TIMESTAMP=$(date +%Y%m%d%H%M%S)
MIGRATION_NAME="${TIMESTAMP}_${MESSAGE// /_}"

# Run alembic autogenerate command
docker-compose run --rm alembic revision --autogenerate -m "$MESSAGE"

echo "Migration generated successfully!"
echo "Run 'docker compose up alembic' to apply the migration"
