import {MigrationInterface, QueryRunner} from "typeorm";

export class database1550745940505 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("CREATE TABLE `grade_group` (`id` int NOT NULL AUTO_INCREMENT, `addmisionYear` smallint NOT NULL, `group` varchar(1) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `student` (`id` int NOT NULL AUTO_INCREMENT, `firstName` varchar(255) NOT NULL, `lastName` varchar(255) NOT NULL, `email` varchar(255) NOT NULL, `dateOfBirth` date NOT NULL, `grade_group_id` int NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `subject` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `teacher` (`id` int NOT NULL AUTO_INCREMENT, `firstName` varchar(255) NOT NULL, `lastName` varchar(255) NOT NULL, `phoneNumber` int NOT NULL, `email` varchar(255) NOT NULL, `password` varchar(255) NOT NULL, `role` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `mark` (`id` int NOT NULL AUTO_INCREMENT, `mark` int NOT NULL, `markedOn` datetime NOT NULL, `lastModification` datetime NOT NULL, `student_id` int NOT NULL, `subject_id` int NOT NULL, `teacher_id` int NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `schedule` (`id` int NOT NULL AUTO_INCREMENT, `subjectOrder` int NOT NULL, `dayOfWeek` varchar(20) NOT NULL, `subject_id` int NOT NULL, `teacher_id` int NOT NULL, `grade_group_id` int NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `teacher_subject` (`id` int NOT NULL AUTO_INCREMENT, `teacher_id` int NOT NULL, `subject_id` int NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `student` ADD CONSTRAINT `FK_0bddb0596c0613ee199db3db462` FOREIGN KEY (`grade_group_id`) REFERENCES `grade_group`(`id`)");
        await queryRunner.query("ALTER TABLE `mark` ADD CONSTRAINT `FK_b2cba0d2e6636758313f34ede91` FOREIGN KEY (`student_id`) REFERENCES `student`(`id`)");
        await queryRunner.query("ALTER TABLE `mark` ADD CONSTRAINT `FK_f51920a9fb4331a7b961f1fa96a` FOREIGN KEY (`subject_id`) REFERENCES `subject`(`id`)");
        await queryRunner.query("ALTER TABLE `mark` ADD CONSTRAINT `FK_46ea8255ece3ee7a672f5dbcc2a` FOREIGN KEY (`teacher_id`) REFERENCES `teacher`(`id`)");
        await queryRunner.query("ALTER TABLE `schedule` ADD CONSTRAINT `FK_0d4aea6fb531a16d5f953f79000` FOREIGN KEY (`subject_id`) REFERENCES `subject`(`id`)");
        await queryRunner.query("ALTER TABLE `schedule` ADD CONSTRAINT `FK_cfacddd81efeda13acadb93d42b` FOREIGN KEY (`teacher_id`) REFERENCES `teacher`(`id`)");
        await queryRunner.query("ALTER TABLE `schedule` ADD CONSTRAINT `FK_5bfa0c5103cef3b675578e26d70` FOREIGN KEY (`grade_group_id`) REFERENCES `grade_group`(`id`)");
        await queryRunner.query("ALTER TABLE `teacher_subject` ADD CONSTRAINT `FK_2a9d30cb4207da7ddf7c109097a` FOREIGN KEY (`teacher_id`) REFERENCES `teacher`(`id`)");
        await queryRunner.query("ALTER TABLE `teacher_subject` ADD CONSTRAINT `FK_c876c0444684d4812824989ba2c` FOREIGN KEY (`subject_id`) REFERENCES `subject`(`id`)");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `teacher_subject` DROP FOREIGN KEY `FK_c876c0444684d4812824989ba2c`");
        await queryRunner.query("ALTER TABLE `teacher_subject` DROP FOREIGN KEY `FK_2a9d30cb4207da7ddf7c109097a`");
        await queryRunner.query("ALTER TABLE `schedule` DROP FOREIGN KEY `FK_5bfa0c5103cef3b675578e26d70`");
        await queryRunner.query("ALTER TABLE `schedule` DROP FOREIGN KEY `FK_cfacddd81efeda13acadb93d42b`");
        await queryRunner.query("ALTER TABLE `schedule` DROP FOREIGN KEY `FK_0d4aea6fb531a16d5f953f79000`");
        await queryRunner.query("ALTER TABLE `mark` DROP FOREIGN KEY `FK_46ea8255ece3ee7a672f5dbcc2a`");
        await queryRunner.query("ALTER TABLE `mark` DROP FOREIGN KEY `FK_f51920a9fb4331a7b961f1fa96a`");
        await queryRunner.query("ALTER TABLE `mark` DROP FOREIGN KEY `FK_b2cba0d2e6636758313f34ede91`");
        await queryRunner.query("ALTER TABLE `student` DROP FOREIGN KEY `FK_0bddb0596c0613ee199db3db462`");
        await queryRunner.query("DROP TABLE `teacher_subject`");
        await queryRunner.query("DROP TABLE `schedule`");
        await queryRunner.query("DROP TABLE `mark`");
        await queryRunner.query("DROP TABLE `teacher`");
        await queryRunner.query("DROP TABLE `subject`");
        await queryRunner.query("DROP TABLE `student`");
        await queryRunner.query("DROP TABLE `grade_group`");
    }

}
