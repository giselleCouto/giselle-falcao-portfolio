CREATE TABLE IF NOT EXISTS `whatsapp_ajustes` (
	`chave` varchar(64) NOT NULL,
	`valor` varchar(255),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `whatsapp_ajustes_chave` PRIMARY KEY(`chave`)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS `whatsapp_conversas` (
	`id` int AUTO_INCREMENT NOT NULL,
	`waId` varchar(32) NOT NULL,
	`nome` varchar(200),
	`pausadoAte` timestamp NULL,
	`motivoPausa` varchar(64),
	`ultimaMensagemAt` timestamp NOT NULL DEFAULT (now()),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `whatsapp_conversas_id` PRIMARY KEY(`id`),
	CONSTRAINT `whatsapp_conversas_waid_unique` UNIQUE(`waId`),
	KEY `whatsapp_conversas_ultima_idx` (`ultimaMensagemAt`)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS `whatsapp_mensagens` (
	`id` int AUTO_INCREMENT NOT NULL,
	`conversaId` int NOT NULL,
	`waMessageId` varchar(128),
	`direcao` varchar(8) NOT NULL,
	`autor` varchar(16) NOT NULL,
	`tipo` varchar(32) NOT NULL,
	`texto` text NOT NULL,
	`semTexto` boolean NOT NULL DEFAULT false,
	`status` varchar(24),
	`erro` varchar(255),
	`meta` text,
	`criadaEm` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `whatsapp_mensagens_id` PRIMARY KEY(`id`),
	CONSTRAINT `whatsapp_mensagens_wamid_unique` UNIQUE(`waMessageId`),
	KEY `whatsapp_mensagens_conversa_idx` (`conversaId`,`id`)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS `whatsapp_repasses` (
	`id` int AUTO_INCREMENT NOT NULL,
	`conversaId` int NOT NULL,
	`categoria` varchar(24) NOT NULL,
	`resumo` text NOT NULL,
	`origem` varchar(16) NOT NULL,
	`status` varchar(16) NOT NULL DEFAULT 'aberto',
	`avisadoAt` timestamp NULL,
	`avisoErro` varchar(255),
	`resolvidoAt` timestamp NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `whatsapp_repasses_id` PRIMARY KEY(`id`),
	KEY `whatsapp_repasses_conversa_idx` (`conversaId`),
	KEY `whatsapp_repasses_status_idx` (`status`)
);
