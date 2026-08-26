CREATE TABLE `ai_maturity` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(160) NOT NULL,
	`email` varchar(320) NOT NULL,
	`company` varchar(200) NOT NULL,
	`role` varchar(160) NOT NULL,
	`companySize` varchar(60) NOT NULL,
	`scoreDados` int NOT NULL,
	`scoreTecnologia` int NOT NULL,
	`scorePessoas` int NOT NULL,
	`scoreProcessos` int NOT NULL,
	`scoreEstrategia` int NOT NULL,
	`totalScore` int NOT NULL,
	`level` varchar(40) NOT NULL,
	`answers` text,
	`consent` boolean NOT NULL DEFAULT false,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `ai_maturity_id` PRIMARY KEY(`id`)
);
