-- ==========================================
-- RoadAware MySQL Database Schema & Full Data Dump
-- ==========================================

CREATE DATABASE IF NOT EXISTS `roadaware` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `roadaware`;

SET FOREIGN_KEY_CHECKS = 0;

-- --------------------------------------------------------
-- Table structure for `users`
-- --------------------------------------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL UNIQUE,
  `password` VARCHAR(255) NULL,
  `role` ENUM('citizen', 'admin') NOT NULL DEFAULT 'citizen',
  `status` ENUM('active', 'suspended') NOT NULL DEFAULT 'active',
  `googleId` VARCHAR(255) NULL,
  `resetCode` VARCHAR(6) NULL,
  `resetCodeExpires` DATETIME NULL,
  `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------
-- Table structure for `hazard_categories`
-- --------------------------------------------------------
DROP TABLE IF EXISTS `hazard_categories`;
CREATE TABLE `hazard_categories` (
  `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(255) NOT NULL UNIQUE,
  `color` VARCHAR(50) NOT NULL DEFAULT '#3B82F6',
  `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------
-- Table structure for `hazard_reports`
-- --------------------------------------------------------
DROP TABLE IF EXISTS `hazard_reports`;
CREATE TABLE `hazard_reports` (
  `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `title` VARCHAR(255) NOT NULL,
  `description` TEXT NOT NULL,
  `categoryId` INT NOT NULL,
  `severity` ENUM('low', 'medium', 'high', 'critical') NOT NULL DEFAULT 'medium',
  `status` ENUM('reported', 'in_progress', 'resolved', 'rejected') NOT NULL DEFAULT 'reported',
  `latitude` DECIMAL(10, 8) NOT NULL,
  `longitude` DECIMAL(11, 8) NOT NULL,
  `locationName` VARCHAR(255) NOT NULL,
  `userId` INT NOT NULL,
  `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT `fk_hr_category` FOREIGN KEY (`categoryId`) REFERENCES `hazard_categories` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_hr_user` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------
-- Table structure for `report_images`
-- --------------------------------------------------------
DROP TABLE IF EXISTS `report_images`;
CREATE TABLE `report_images` (
  `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `reportId` INT NOT NULL,
  `imageUrl` VARCHAR(255) NOT NULL,
  `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT `fk_ri_report` FOREIGN KEY (`reportId`) REFERENCES `hazard_reports` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------
-- Table structure for `report_upvotes`
-- --------------------------------------------------------
DROP TABLE IF EXISTS `report_upvotes`;
CREATE TABLE `report_upvotes` (
  `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `reportId` INT NOT NULL,
  `userId` INT NOT NULL,
  `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY `unique_upvote` (`reportId`, `userId`),
  CONSTRAINT `fk_ru_report` FOREIGN KEY (`reportId`) REFERENCES `hazard_reports` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_ru_user` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------
-- Table structure for `report_updates`
-- --------------------------------------------------------
DROP TABLE IF EXISTS `report_updates`;
CREATE TABLE `report_updates` (
  `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `reportId` INT NOT NULL,
  `status` ENUM('reported', 'in_progress', 'resolved', 'rejected') NOT NULL,
  `comment` TEXT NULL,
  `updatedBy` INT NULL,
  `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT `fk_rup_report` FOREIGN KEY (`reportId`) REFERENCES `hazard_reports` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_rup_user` FOREIGN KEY (`updatedBy`) REFERENCES `users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------
-- Table structure for `settings`
-- --------------------------------------------------------
DROP TABLE IF EXISTS `settings`;
CREATE TABLE `settings` (
  `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `key` VARCHAR(255) NOT NULL UNIQUE,
  `value` TEXT NOT NULL,
  `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------
-- Table structure for `activities`
-- --------------------------------------------------------
DROP TABLE IF EXISTS `activities`;
CREATE TABLE `activities` (
  `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `userId` INT NOT NULL,
  `action` VARCHAR(255) NOT NULL,
  `details` TEXT NULL,
  `type` VARCHAR(50) NULL,
  `status` VARCHAR(50) NULL,
  `severity` VARCHAR(50) NULL,
  `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT `fk_act_user` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------
-- Table structure for `comments`
-- --------------------------------------------------------
DROP TABLE IF EXISTS `comments`;
CREATE TABLE `comments` (
  `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `reportId` INT NOT NULL,
  `userId` INT NOT NULL,
  `comment` TEXT NOT NULL,
  `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT `fk_com_report` FOREIGN KEY (`reportId`) REFERENCES `hazard_reports` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_com_user` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

SET FOREIGN_KEY_CHECKS = 1;

-- ==========================================
-- Data Insertion
-- ==========================================

-- 1. Insert Hazard Categories
INSERT INTO `hazard_categories` (`id`, `name`, `color`, `createdAt`, `updatedAt`) VALUES
(1, 'Pothole', '#F59E0B', NOW(), NOW()),
(2, 'Debris', '#6B7280', NOW(), NOW()),
(3, 'Flooding', '#3B82F6', NOW(), NOW()),
(4, 'Broken Light', '#0EA5E9', NOW(), NOW()),
(5, 'Damaged Signage', '#3B82F6', NOW(), NOW()),
(6, 'Construction', '#D97706', NOW(), NOW()),
(7, 'Other', '#4B5563', NOW(), NOW());

-- 2. Insert Users (Admin & Citizens)
-- Admin Password: AdminSecure123!
-- Citizen Password: CitizenSecure123!
INSERT INTO `users` (`id`, `name`, `email`, `password`, `role`, `status`, `createdAt`, `updatedAt`) VALUES
(1, 'Admin User', 'admin@roadaware.com', '$2a$10$9Gv/Y5kEsk6e6VbL9gOQeu0fT5/Z.J5UvV4uJ1F2R5K2L3M4N5O6P', 'admin', 'active', NOW(), NOW()),
(2, 'Pathum Piyumal', 'pathum@roadaware.com', '$2a$10$9Gv/Y5kEsk6e6VbL9gOQeu0fT5/Z.J5UvV4uJ1F2R5K2L3M4N5O6P', 'citizen', 'active', NOW(), NOW()),
(3, 'Tharusha Sangeeth', 'tharusha@roadaware.com', '$2a$10$9Gv/Y5kEsk6e6VbL9gOQeu0fT5/Z.J5UvV4uJ1F2R5K2L3M4N5O6P', 'citizen', 'active', NOW(), NOW()),
(4, 'Lochani Ridimaliyadda', 'lochani@roadaware.com', '$2a$10$9Gv/Y5kEsk6e6VbL9gOQeu0fT5/Z.J5UvV4uJ1F2R5K2L3M4N5O6P', 'citizen', 'active', NOW(), NOW()),
(5, 'Amara de Silva', 'amara@roadaware.com', '$2a$10$9Gv/Y5kEsk6e6VbL9gOQeu0fT5/Z.J5UvV4uJ1F2R5K2L3M4N5O6P', 'citizen', 'active', NOW(), NOW()),
(6, 'Roshan Gunawardena', 'roshan@roadaware.com', '$2a$10$9Gv/Y5kEsk6e6VbL9gOQeu0fT5/Z.J5UvV4uJ1F2R5K2L3M4N5O6P', 'citizen', 'active', NOW(), NOW()),
(7, 'Nisansala Perera', 'nisansala@roadaware.com', '$2a$10$9Gv/Y5kEsk6e6VbL9gOQeu0fT5/Z.J5UvV4uJ1F2R5K2L3M4N5O6P', 'citizen', 'active', NOW(), NOW()),
(8, 'Dinesh Fernando', 'dinesh@roadaware.com', '$2a$10$9Gv/Y5kEsk6e6VbL9gOQeu0fT5/Z.J5UvV4uJ1F2R5K2L3M4N5O6P', 'citizen', 'active', NOW(), NOW()),
(9, 'Sanduni Jayasekara', 'sanduni@roadaware.com', '$2a$10$9Gv/Y5kEsk6e6VbL9gOQeu0fT5/Z.J5UvV4uJ1F2R5K2L3M4N5O6P', 'citizen', 'active', NOW(), NOW());

-- 3. Insert Hazard Reports
INSERT INTO `hazard_reports` (`id`, `title`, `description`, `categoryId`, `severity`, `status`, `latitude`, `longitude`, `locationName`, `userId`, `createdAt`, `updatedAt`) VALUES
(1, 'Major Pothole spotted', 'Dangerous deep pothole near the main junction. It is dangerous for motorbikes and small cars.', 1, 'critical', 'in_progress', 6.92710000, 79.86120000, 'Galle Road, Colombo 03', 2, NOW() - INTERVAL 2 DAY, NOW()),
(2, 'Streetlight malfunctioning', 'This streetlight has been persistantly flickering for a couple of days now.', 4, 'medium', 'reported', 6.91470000, 79.87250000, 'Havelock Road, Colombo 05', 2, NOW() - INTERVAL 3 DAY, NOW()),
(3, 'Water clogging at intersection', 'Severe water stagnation after recent rains. Vehicles forced into single lane.', 3, 'high', 'reported', 7.08400000, 79.99250000, 'Main Street, Gampaha', 3, NOW() - INTERVAL 4 DAY, NOW()),
(4, 'Fallen tree branch on lane', 'Large tree branch blocking left lane near clock tower.', 2, 'medium', 'resolved', 7.29060000, 80.63370000, 'Peradeniya Road, Kandy', 4, NOW() - INTERVAL 5 DAY, NOW()),
(5, 'Construction barrier misplaced', 'Unmarked construction cone knocked over into traffic lane.', 6, 'low', 'resolved', 6.90150000, 79.86310000, 'Bauddhaloka Mawatha, Colombo 07', 5, NOW() - INTERVAL 6 DAY, NOW()),
(6, 'Broken pavement slab', 'Trip hazard on main pedestrian sidewalk.', 1, 'low', 'reported', 7.20830000, 79.83580000, 'Beach Road, Negombo', 6, NOW() - INTERVAL 7 DAY, NOW()),
(7, 'Damaged pedestrian crossing sign', 'Signpost bent sideways after vehicle collision.', 5, 'medium', 'resolved', 6.05350000, 80.22100000, 'Fort Road, Galle', 7, NOW() - INTERVAL 10 DAY, NOW());

-- 4. Insert Upvotes
INSERT INTO `report_upvotes` (`reportId`, `userId`, `createdAt`, `updatedAt`) VALUES
(1, 3, NOW(), NOW()),
(1, 4, NOW(), NOW()),
(1, 5, NOW(), NOW()),
(2, 3, NOW(), NOW()),
(3, 2, NOW(), NOW()),
(3, 4, NOW(), NOW()),
(6, 2, NOW(), NOW());

-- 5. Insert System Settings
INSERT INTO `settings` (`key`, `value`, `createdAt`, `updatedAt`) VALUES
('appName', 'RoadAware', NOW(), NOW()),
('supportEmail', 'support@roadaware.app', NOW(), NOW()),
('timezone', 'UTC (Coordinated Universal Time)', NOW(), NOW()),
('twoFactorAuth', 'false', NOW(), NOW()),
('sessionTimeout', '60', NOW(), NOW());
