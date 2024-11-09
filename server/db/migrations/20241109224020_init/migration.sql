-- CreateTable
CREATE TABLE "Notes" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Notes_title_key" ON "Notes"("title");
