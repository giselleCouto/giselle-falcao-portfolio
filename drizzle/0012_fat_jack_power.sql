CREATE TABLE `page_visits` (
	`id` int AUTO_INCREMENT NOT NULL,
	`path` varchar(255) NOT NULL,
	`source` varchar(80),
	`referrer` varchar(255),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `page_visits_id` PRIMARY KEY(`id`)
);
