CREATE TABLE `lead_contacts` (
	`id` int AUTO_INCREMENT NOT NULL,
	`route` varchar(64) NOT NULL,
	`persona` varchar(64) NOT NULL,
	`name` varchar(160) NOT NULL,
	`email` varchar(320) NOT NULL,
	`organization` varchar(200),
	`interest` varchar(120),
	`message` text NOT NULL,
	`status` enum('new','reviewed','archived') NOT NULL DEFAULT 'new',
	`source` varchar(120) NOT NULL DEFAULT 'website',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `lead_contacts_id` PRIMARY KEY(`id`)
);
