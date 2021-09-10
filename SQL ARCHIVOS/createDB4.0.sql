-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema games
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema games
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `games` DEFAULT CHARACTER SET utf8 ;
USE `games` ;

-- -----------------------------------------------------
-- Table `games`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `games`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(100) NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `lastname` VARCHAR(45) NOT NULL,
  `password` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `games`.`categories`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `games`.`categories` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `games`.`products`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `games`.`products` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `categoryId` INT NOT NULL,
  `price` DOUBLE NOT NULL,
  `discountRate` DOUBLE NULL,
  `discount` DOUBLE NULL,
  `stock` INT NOT NULL,
  `description` TEXT NOT NULL,
  `features` TEXT NOT NULL,
  `registrationDatetime` DATE NOT NULL,
  `userWhoRegistered` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `category_idx` (`categoryId` ASC) ,
  CONSTRAINT `category`
    FOREIGN KEY (`categoryId`)
    REFERENCES `games`.`categories` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `games`.`images`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `games`.`images` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `productId` INT NOT NULL,
  `name` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `productId_idx` (`productId` ASC) ,
  CONSTRAINT `id`
    FOREIGN KEY (`productId`)
    REFERENCES `games`.`products` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
