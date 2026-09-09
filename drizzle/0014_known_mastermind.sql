CREATE TABLE `palestra_pedidos` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(160) NOT NULL,
	`email` varchar(320) NOT NULL,
	`whatsapp` varchar(40),
	`empresa` varchar(200) NOT NULL,
	`tipo` varchar(60) NOT NULL,
	`evento` varchar(200),
	`dataDesejada` varchar(60),
	`publico` varchar(200),
	`mensagem` text NOT NULL,
	`source` varchar(120),
	`campaign` varchar(120),
	`consent` boolean NOT NULL DEFAULT false,
	`status` enum('new','replied','proposal','closed','archived') NOT NULL DEFAULT 'new',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `palestra_pedidos_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `mentoria_diagnostico` ADD `source` varchar(120);--> statement-breakpoint
ALTER TABLE `mentoria_diagnostico` ADD `campaign` varchar(120);--> statement-breakpoint
ALTER TABLE `trajetoria_candidatura` ADD `source` varchar(120);--> statement-breakpoint
ALTER TABLE `trajetoria_candidatura` ADD `campaign` varchar(120);