CREATE TABLE IF NOT EXISTS `voomp_academico` (
	`id` int AUTO_INCREMENT NOT NULL,
	`inscricaoId` int NOT NULL,
	`ra` varchar(40),
	`turma` varchar(24),
	`progressoPct` int,
	`aulasConcluidas` int,
	`aulasTotal` int,
	`aprovado` boolean,
	`ultimoAcessoAt` timestamp,
	`ultimoAvancoAt` timestamp,
	`concluidoAt` timestamp,
	`canceladoAt` timestamp,
	`motivoCancelamento` varchar(255),
	`observacoes` text,
	`origem` varchar(24),
	`importadoAt` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `voomp_academico_id` PRIMARY KEY(`id`),
	CONSTRAINT `voomp_academico_inscricao_unique` UNIQUE(`inscricaoId`),
	KEY `voomp_academico_ra_idx` (`ra`)
);
--> statement-breakpoint
ALTER TABLE `voomp_inscricoes` MODIFY COLUMN `document` varchar(128);