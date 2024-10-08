CREATE TABLE IF NOT EXISTS "users" (
    "id" TEXT PRIMARY KEY,
    "username" TEXT,
    "avatar_url" TEXT,
    "level_id" BIGINT NOT NULL,
    "count_points" BIGINT NOT NULL,
    "created_at" BIGINT DEFAULT (EXTRACT(EPOCH FROM CURRENT_TIMESTAMP) * 1000),
    "updated_at" BIGINT DEFAULT (EXTRACT(EPOCH FROM CURRENT_TIMESTAMP) * 1000)
);