package persistence

import (
	"database/sql"
	"fmt"
	"log/slog"
	"strings"

	_ "modernc.org/sqlite"
)

// OpenRiverSQL opens a database/sql pool for River on the same SQLite file as GORM.
// River requires MaxOpenConns(1) for SQLite; WAL + busy_timeout help coexist with GORM.
func OpenRiverSQL(databasePath string) (*sql.DB, error) {
	path := strings.TrimSpace(databasePath)
	if path == "" {
		return nil, fmt.Errorf("database path is empty")
	}
	dsn := fmt.Sprintf("file:%s?_pragma=busy_timeout(5000)&_pragma=journal_mode(WAL)", path)
	db, err := sql.Open("sqlite", dsn)
	if err != nil {
		return nil, err
	}
	db.SetMaxOpenConns(1)
	db.SetMaxIdleConns(1)
	if err := db.Ping(); err != nil {
		_ = db.Close()
		return nil, err
	}
	slog.Info("river_sqlite_connected", slog.String("database", path))
	return db, nil
}
