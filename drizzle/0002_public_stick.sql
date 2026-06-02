CREATE TABLE `course_access` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`courseSlug` varchar(120) NOT NULL,
	`accessLevel` enum('free','full') NOT NULL DEFAULT 'full',
	`status` enum('pending','active','canceled') NOT NULL DEFAULT 'pending',
	`stripeCheckoutSessionId` varchar(255),
	`stripePaymentIntentId` varchar(255),
	`grantedAt` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `course_access_id` PRIMARY KEY(`id`),
	CONSTRAINT `course_access_user_course_unique` UNIQUE(`userId`,`courseSlug`),
	CONSTRAINT `course_access_checkout_session_unique` UNIQUE(`stripeCheckoutSessionId`)
);
--> statement-breakpoint
CREATE TABLE `course_progress` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`courseSlug` varchar(120) NOT NULL,
	`moduleId` varchar(64) NOT NULL,
	`lessonTitle` varchar(255),
	`practiceCompleted` boolean NOT NULL DEFAULT false,
	`completed` boolean NOT NULL DEFAULT false,
	`lastVisitedAt` timestamp NOT NULL DEFAULT (now()),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `course_progress_id` PRIMARY KEY(`id`),
	CONSTRAINT `course_progress_user_module_unique` UNIQUE(`userId`,`courseSlug`,`moduleId`)
);
--> statement-breakpoint
ALTER TABLE `users` ADD `stripeCustomerId` varchar(255);--> statement-breakpoint
CREATE INDEX `course_access_user_idx` ON `course_access` (`userId`);--> statement-breakpoint
CREATE INDEX `course_progress_user_idx` ON `course_progress` (`userId`);