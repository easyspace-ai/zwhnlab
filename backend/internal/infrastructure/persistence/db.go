package persistence

import (
	"fmt"
	"log/slog"
	"strings"
	"time"

	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

// DB 封装 GORM 连接，供仓储使用
type DB struct {
	*gorm.DB
}

// New 创建数据库连接，启动时执行迁移（检查 schema_migrations，将未执行的 .up.sql 按版本顺序落地到库）
// logSQL 为 true 时打印 GORM SQL（默认关闭，避免淹没业务日志如聚合推送）。
func New(databasePath string, logSQL bool) (*DB, error) {
	gormLogLevel := logger.Silent
	if logSQL {
		gormLogLevel = logger.Warn
	}
	db, err := gorm.Open(sqlite.Open(sqliteDSN(databasePath)), &gorm.Config{
		Logger: logger.Default.LogMode(gormLogLevel),
		NowFunc: func() time.Time {
			return time.Now().UTC()
		},
	})
	if err != nil {
		return nil, err
	}

	sqlDB, err := db.DB()
	if err != nil {
		return nil, err
	}
	sqlDB.SetMaxIdleConns(1)
	sqlDB.SetMaxOpenConns(1)

	if err := RunMigrations(sqlDB); err != nil {
		return nil, err
	}

	slog.Info("gorm_connected",
		slog.String("database", databasePath),
		slog.Bool("sql_log", logSQL),
	)
	return &DB{DB: db}, nil
}

func sqliteDSN(path string) string {
	path = strings.TrimSpace(path)
	if path == "" {
		return path
	}
	if strings.HasPrefix(path, "file:") {
		return path
	}
	return fmt.Sprintf("file:%s?_pragma=busy_timeout(5000)&_pragma=journal_mode(WAL)", path)
}

// Close 关闭连接
func (d *DB) Close() error {
	sqlDB, err := d.DB.DB()
	if err != nil {
		return err
	}
	return sqlDB.Close()
}
