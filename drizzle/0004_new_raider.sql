CREATE TABLE `course_lesson_progress` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`courseSlug` varchar(120) NOT NULL,
	`moduleId` varchar(64) NOT NULL,
	`lessonKey` varchar(120) NOT NULL,
	`lessonTitle` varchar(255),
	`completed` boolean NOT NULL DEFAULT false,
	`lastVisitedAt` timestamp NOT NULL DEFAULT (now()),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `course_lesson_progress_id` PRIMARY KEY(`id`),
	CONSTRAINT `course_lesson_progress_user_lesson_unique` UNIQUE(`userId`,`courseSlug`,`lessonKey`)
);
--> statement-breakpoint
CREATE INDEX `course_lesson_progress_user_idx` ON `course_lesson_progress` (`userId`);