-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Notes" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Notes" ("content", "id", "title") SELECT "content", "id", "title" FROM "Notes";
DROP TABLE "Notes";
ALTER TABLE "new_Notes" RENAME TO "Notes";
CREATE UNIQUE INDEX "Notes_title_key" ON "Notes"("title");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
