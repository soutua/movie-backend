-- CreateTable
CREATE TABLE "favorite" (
    "movie_id" INTEGER NOT NULL,
    "account_id" INTEGER NOT NULL,

    PRIMARY KEY ("movie_id","account_id")
);

-- CreateTable
CREATE TABLE "movie" (
    "id" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "overview" TEXT,
    "poster_path" TEXT,
    "backdrop_path" TEXT,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "account" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "account.username_unique" ON "account"("username");

-- AddForeignKey
ALTER TABLE "favorite" ADD FOREIGN KEY ("account_id") REFERENCES "account"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "favorite" ADD FOREIGN KEY ("movie_id") REFERENCES "movie"("id") ON DELETE CASCADE ON UPDATE CASCADE;
