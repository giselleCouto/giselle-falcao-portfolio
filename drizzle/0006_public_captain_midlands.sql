CREATE TABLE `academy_students` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(160) NOT NULL,
	`email` varchar(320) NOT NULL,
	`whatsapp` varchar(40),
	`role` varchar(160),
	`organization` varchar(200),
	`courseSlug` varchar(120),
	`interestWorkshop` boolean NOT NULL DEFAULT false,
	`interestTalks` boolean NOT NULL DEFAULT false,
	`interestConsulting` boolean NOT NULL DEFAULT false,
	`goals` text,
	`consent` boolean NOT NULL DEFAULT false,
	`source` varchar(120) NOT NULL DEFAULT 'academy',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `academy_students_id` PRIMARY KEY(`id`),
	CONSTRAINT `academy_students_email_unique` UNIQUE(`email`)
);
