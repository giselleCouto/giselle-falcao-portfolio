ALTER TABLE `page_visits` MODIFY COLUMN `source` varchar(120);--> statement-breakpoint
ALTER TABLE `page_visits` ADD `campaign` varchar(120);