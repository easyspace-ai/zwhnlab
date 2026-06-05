#!/bin/bash
# SQLite database backup script
# - Backs up hana.db with date suffix
# - Retains 7 days of backups
# - Auto-deletes expired backups

set -euo pipefail

# ---- configurable ----
PROJECT_DIR="${PROJECT_DIR:-/data/osinttools}"
DB_PATH="${PROJECT_DIR}/hana.db"
BACKUP_DIR="/data/backups"
LOG_DIR="${PROJECT_DIR}/logs"
KEEP_DAYS=7

DATE=$(date +%Y%m%d-%H%M%S)
BACKUP_FILE="${BACKUP_DIR}/hana-${DATE}.db"

mkdir -p "$BACKUP_DIR" "$LOG_DIR"

if [ ! -f "$DB_PATH" ]; then
    echo "ERROR: database not found: $DB_PATH"
    exit 1
fi

echo "backing up: $DB_PATH -> $BACKUP_FILE"

# checkpoint WAL before backup
sqlite3 "$DB_PATH" "PRAGMA wal_checkpoint(TRUNCATE);" 2>/dev/null || true

# hot backup
sqlite3 "$DB_PATH" ".backup '$BACKUP_FILE'"

# verify backup is valid
if sqlite3 "$BACKUP_FILE" "PRAGMA integrity_check;" | grep -q "ok"; then
    SIZE=$(du -h "$BACKUP_FILE" | cut -f1)
    echo "OK: $BACKUP_FILE ($SIZE)"
else
    echo "ERROR: backup integrity check failed"
    rm -f "$BACKUP_FILE"
    exit 1
fi

# delete backups older than KEEP_DAYS
DELETED=$(find "$BACKUP_DIR" -name "hana-*.db" -type f -mtime +${KEEP_DAYS} -print -delete)
if [ -n "$DELETED" ]; then
    echo "deleted expired:"
    echo "$DELETED"
fi

# count remaining backups
COUNT=$(find "$BACKUP_DIR" -name "hana-*.db" -type f | wc -l | tr -d ' ')
echo "total backups: $COUNT"
