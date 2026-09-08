#!/usr/bin/env bash

# Exit immediately if any command fails
set -e

# 1. Define the default configuration
DB_DIR="./API"
DEFAULT_DB=dating.db

SQL_DIR="./sql"       # <--- Change this to your directory path
DEFAULT_SCRIPT="cleanDb.sql"

# 2. Check if a parameter was passed. 
# If $1 is empty, use the DEFAULT_SCRIPT. Otherwise, use $1.
SCRIPT_NAME="${1:-$DEFAULT_SCRIPT}"

# 3. Combine directory and script name to get the full path
FULL_SQL_PATH="${SQL_DIR}/${SCRIPT_NAME}"
FULL_DB_PATH=${DB_DIR}/${DEFAULT_DB}

# 4. Check if the SQL and DB files actually exist before running SQLite
if [ ! -f "$FULL_SQL_PATH" ]; then
    echo "Error: SQL file not found at $FULL_SQL_PATH" >&2
    exit 1
fi
if [ ! -f "$FULL_DB_PATH" ]; then
    echo "Error: DB file not found at $FULL_DB_PATH" >&2
    exit 1
fi

# 5. Execute the database cleanup
# 5.1 check if anything to delete.
# 1. Ask SQLite a question and store the answer in a variable
# Example: Count how many active admins exist
TEST_DATA_COUNT=$(sqlite3 "$FULL_DB_PATH" "SELECT COUNT(*) FROM users WHERE NOT Id LIKE '%-id';")
echo "Current test data count: $TEST_DATA_COUNT"
if [ "$TEST_DATA_COUNT" -gt 0 ]; then
    echo "Running database cleanup using: $FULL_SQL_PATH ..."
    sqlite3 "$FULL_DB_PATH" < "$FULL_SQL_PATH"
    echo "Database cleanup complete!".
else
    echo "No test data to delete"
fi

