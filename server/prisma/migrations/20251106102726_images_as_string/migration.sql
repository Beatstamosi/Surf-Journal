/*
  Warnings:

  - Made the column `profilePicture` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Session" ALTER COLUMN "image" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "bio" SET DEFAULT 'Welcome to my Surflog!',
ALTER COLUMN "profilePicture" SET NOT NULL,
ALTER COLUMN "profilePicture" SET DEFAULT 'https://tannirocilfbqnjskoag.supabase.co/storage/v1/object/sign/Profile%20Pictures/default_avatar.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9lMWQ1MDJjZi1jMDc4LTQyNjMtYTQ2ZS1kODM2ZDFhNzBhNjAiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJQcm9maWxlIFBpY3R1cmVzL2RlZmF1bHRfYXZhdGFyLmpwZyIsImlhdCI6MTc2MjQyNDY5OSwiZXhwIjoyMDc3Nzg0Njk5fQ.sLu6pM-pJi0-7J1dbj6OZxeGiwulbeQ0E-lOB-KRv4A',
ALTER COLUMN "profilePicture" SET DATA TYPE TEXT;
