-- phpMyAdmin SQL Dump
-- version 5.2.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 08, 2026 at 07:36 AM
-- Server version: 8.0.46-0ubuntu0.24.04.4
-- PHP Version: 8.2.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `edumint24`
--

-- --------------------------------------------------------

--
-- Table structure for table `activity_logs`
--

CREATE TABLE `activity_logs` (
  `id` int NOT NULL,
  `user_id` int DEFAULT NULL,
  `action_type` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `ip_address` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_agent` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `activity_logs`
--

INSERT INTO `activity_logs` (`id`, `user_id`, `action_type`, `description`, `ip_address`, `user_agent`, `created_at`) VALUES
(9, 2, 'login_success', 'User EdumintAdmin2518 logged in successfully', '2409:40d4:50c3:5704:691e:e813:949f:4e79', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Mobile Safari/537.36', '2026-05-13 04:40:04'),
(10, 2, 'user_edit', 'Edited user ID: 2', '2409:40d4:509d:1113:691e:e813:949f:4e79', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Mobile Safari/537.36', '2026-05-13 05:47:36'),
(12, 2, 'login_success', 'User EdumintAdmin2518 logged in successfully', '2409:40d4:509d:1113:691e:e813:949f:4e79', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Mobile Safari/537.36', '2026-05-13 06:23:51'),
(13, 2, 'post_create', 'Created Post: hello testing (ID: 1)', '2409:40d4:509d:1113:691e:e813:949f:4e79', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Mobile Safari/537.36', '2026-05-13 06:26:37'),
(14, 2, 'login_success', 'User EdumintAdmin2518 logged in successfully', '2409:40e4:1316:35e5:31bc:c3b3:cff2:1f7f', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Safari/537.36', '2026-05-13 10:47:34'),
(15, 2, 'login_success', 'User EdumintAdmin2518 logged in successfully', '2409:40d4:509d:1113:8000::', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.0.0 Mobile Safari/537.36', '2026-05-13 10:49:58'),
(16, 2, 'post_edit', 'Updated Post: Do on the rise of electric cars in india along ... (ID: 1)', '2409:40e4:1316:35e5:31bc:c3b3:cff2:1f7f', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Safari/537.36', '2026-05-13 10:57:11'),
(17, 2, 'post_edit', 'Updated Post: Do on the rise of electric cars in india along ... (ID: 1)', '2409:40e4:1316:35e5:31bc:c3b3:cff2:1f7f', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Safari/537.36', '2026-05-13 10:58:39'),
(18, 2, 'post_edit', 'Updated Post: Do on the rise of electric cars in india along ... (ID: 1)', '2409:40e4:1316:35e5:31bc:c3b3:cff2:1f7f', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Safari/537.36', '2026-05-13 10:59:39'),
(19, 2, 'login_success', 'User EdumintAdmin2518 logged in successfully', '2409:40e4:1:b667:8000::', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.0.0 Mobile Safari/537.36', '2026-05-13 11:20:36'),
(20, 2, 'post_edit', 'Updated Post: Do on the rise of electric cars in india along ... (ID: 1)', '2409:40e4:1:b667:8000::', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.0.0 Mobile Safari/537.36', '2026-05-13 11:21:33'),
(21, 2, 'login_success', 'User EdumintAdmin2518 logged in successfully', '2409:40e4:2e:1101:8000::', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.0.0 Mobile Safari/537.36', '2026-05-14 00:54:28'),
(22, 2, 'login_success', 'User EdumintAdmin2518 logged in successfully', '2409:40d4:50cd:8721:691e:e813:949f:4e79', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Mobile Safari/537.36', '2026-05-14 06:39:25'),
(23, 2, 'post_edit', 'Updated Post: Do on the rise of electric cars in india along ... (ID: 1)', '2409:40d4:50cd:8721:691e:e813:949f:4e79', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Mobile Safari/537.36', '2026-05-14 06:40:54'),
(24, 2, 'login_success', 'User EdumintAdmin2518 logged in successfully', '2401:4900:8926:d87f:3b:520d:52de:6a70', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Safari/537.36', '2026-05-14 09:28:56'),
(25, 2, 'post_edit', 'Updated Post: Do on the rise of electric cars in india along ... (ID: 1)', '2401:4900:8926:d87f:3b:520d:52de:6a70', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Safari/537.36', '2026-05-14 09:30:16'),
(26, 2, 'login_success', 'User EdumintAdmin2518 logged in successfully', '2409:40d4:50cb:4646:691e:e813:949f:4e79', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Mobile Safari/537.36', '2026-05-14 14:08:27'),
(27, 2, 'user_edit', 'Edited user ID: 2', '2409:40d4:50cb:4646:691e:e813:949f:4e79', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Mobile Safari/537.36', '2026-05-14 14:18:44'),
(28, 2, 'pdf_upload', 'Uploaded PDF: techassist.pdf (ID: 4)', '2409:40d4:50cb:4646:691e:e813:949f:4e79', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Mobile Safari/537.36', '2026-05-14 14:38:41'),
(29, 2, 'user_edit', 'Edited user ID: 2', '2409:40d4:50cb:4646:691e:e813:949f:4e79', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Mobile Safari/537.36', '2026-05-14 15:06:20'),
(30, 2, 'user_edit', 'Edited user ID: 2', '2409:40d4:50cb:4646:691e:e813:949f:4e79', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Mobile Safari/537.36', '2026-05-14 15:07:20'),
(31, 2, 'user_edit', 'Edited user ID: 2', '2409:40d4:50cb:4646:691e:e813:949f:4e79', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Mobile Safari/537.36', '2026-05-14 15:19:40'),
(32, 2, 'user_edit', 'Edited user ID: 2', '2409:40d4:50cb:4646:691e:e813:949f:4e79', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Mobile Safari/537.36', '2026-05-14 15:27:08'),
(33, 2, 'user_edit', 'Edited user ID: 2', '2409:40d4:50cb:4646:691e:e813:949f:4e79', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Mobile Safari/537.36', '2026-05-14 15:30:01'),
(34, 2, 'user_edit', 'Edited user ID: 2', '2409:40d4:50cb:4646:691e:e813:949f:4e79', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Mobile Safari/537.36', '2026-05-14 15:34:58'),
(35, 2, 'user_edit', 'Edited user ID: 2', '2409:40d4:50cb:4646:691e:e813:949f:4e79', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Mobile Safari/537.36', '2026-05-14 15:37:26'),
(36, 2, 'user_edit', 'Edited user ID: 2', '2409:40d4:50cb:4646:691e:e813:949f:4e79', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Mobile Safari/537.36', '2026-05-14 15:51:24'),
(37, 2, 'user_edit', 'Edited user ID: 2', '2409:40d4:50cb:4646:691e:e813:949f:4e79', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Mobile Safari/537.36', '2026-05-14 15:52:17'),
(38, 2, 'user_edit', 'Edited user ID: 2', '152.59.75.158', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Mobile Safari/537.36', '2026-05-14 16:08:01'),
(39, 2, 'user_edit', 'Edited user ID: 2', '152.59.75.158', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Mobile Safari/537.36', '2026-05-14 16:08:24'),
(40, 2, 'user_edit', 'Edited user ID: 2', '152.59.75.158', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Mobile Safari/537.36', '2026-05-14 16:18:18'),
(41, 2, 'login_success', 'User EdumintAdmin2518 logged in successfully', '2409:40d4:50c8:a169:605d:7c4a:1dc6:91c8', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Mobile Safari/537.36', '2026-05-15 06:52:40'),
(42, 2, 'user_edit', 'Edited user ID: 2', '2409:40d4:50c8:a169:605d:7c4a:1dc6:91c8', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36', '2026-05-15 07:03:03'),
(43, 2, 'user_edit', 'Edited user ID: 2', '2409:40d4:50c8:a169:605d:7c4a:1dc6:91c8', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36', '2026-05-15 07:03:16'),
(44, 2, 'user_create', 'Created user: pintu (ID: 3)', '2409:40d4:50c8:a169:605d:7c4a:1dc6:91c8', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36', '2026-05-15 07:10:13'),
(45, 2, 'logout', 'User EdumintAdmin2518 logged out successfully', '2409:40d4:50c8:a169:605d:7c4a:1dc6:91c8', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36', '2026-05-15 07:21:40'),
(46, NULL, 'login_failed', 'Failed login attempt for username: pintu (User not found)', '2409:40d4:50c8:a169:605d:7c4a:1dc6:91c8', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36', '2026-05-15 07:22:48'),
(47, 3, 'login_blocked', 'Pending account login attempt: pintu', '2409:40d4:50c8:a169:605d:7c4a:1dc6:91c8', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36', '2026-05-15 07:29:36'),
(48, 3, 'login_blocked', 'Pending account login attempt: pintu', '2409:40d4:50c8:a169:605d:7c4a:1dc6:91c8', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Mobile Safari/537.36', '2026-05-15 07:29:48'),
(49, 3, 'login_blocked', 'Pending account login attempt: pintu', '2409:40d4:50c8:a169:605d:7c4a:1dc6:91c8', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Mobile Safari/537.36', '2026-05-15 07:36:02'),
(50, 2, 'login_success', 'Logged in as admin: EdumintAdmin2518', '2409:40d4:50c8:a169:605d:7c4a:1dc6:91c8', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Mobile Safari/537.36', '2026-05-15 07:37:50'),
(51, 2, 'logout', 'User EdumintAdmin2518 logged out successfully', '2409:40d4:50c8:a169:605d:7c4a:1dc6:91c8', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Mobile Safari/537.36', '2026-05-15 07:43:03'),
(52, 3, 'login_denied', 'No dashboard_access: pintu', '2409:40d4:50c8:a169:605d:7c4a:1dc6:91c8', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Mobile Safari/537.36', '2026-05-15 07:43:14'),
(53, 2, 'login_success', 'Logged in as admin: EdumintAdmin2518', '2409:40d4:50c8:a169:605d:7c4a:1dc6:91c8', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Mobile Safari/537.36', '2026-05-15 07:43:35'),
(54, 2, 'user_edit', 'Edited user ID: 3', '2409:40d4:50c8:a169:605d:7c4a:1dc6:91c8', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Mobile Safari/537.36', '2026-05-15 07:43:53'),
(55, 2, 'logout', 'User EdumintAdmin2518 logged out successfully', '2409:40d4:50c8:a169:605d:7c4a:1dc6:91c8', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Mobile Safari/537.36', '2026-05-15 07:43:57'),
(56, 3, 'login_success', 'Logged in as author: pintu', '2409:40d4:50c8:a169:605d:7c4a:1dc6:91c8', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Mobile Safari/537.36', '2026-05-15 07:44:07'),
(57, 3, 'post_create', 'Created Post: ghhh (ID: 2)', '2409:40d4:50c8:a169:605d:7c4a:1dc6:91c8', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Mobile Safari/537.36', '2026-05-15 07:52:25'),
(58, 3, 'post_delete', 'Deleted Post: ghhh (ID: 2)', '2409:40d4:50c8:a169:605d:7c4a:1dc6:91c8', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Mobile Safari/537.36', '2026-05-15 07:53:21'),
(59, 3, 'logout', 'User pintu logged out successfully', '2409:40d4:50c8:a169:605d:7c4a:1dc6:91c8', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Mobile Safari/537.36', '2026-05-15 07:59:14'),
(60, 2, 'login_success', 'Logged in as admin: EdumintAdmin2518', '2409:40d4:50c8:a169:605d:7c4a:1dc6:91c8', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Mobile Safari/537.36', '2026-05-15 07:59:17'),
(63, NULL, 'login_failed', 'Failed login for: bxbdb (attempt 1)', '2409:40d4:50c8:a169:605d:7c4a:1dc6:91c8', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Mobile Safari/537.36', '2026-05-15 08:09:06'),
(64, NULL, 'login_failed', 'Failed login for: bxbdb (attempt 2)', '2409:40d4:50c8:a169:605d:7c4a:1dc6:91c8', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Mobile Safari/537.36', '2026-05-15 08:09:12'),
(65, NULL, 'login_failed', 'Failed login for: bxbdb (attempt 3)', '2409:40d4:50c8:a169:605d:7c4a:1dc6:91c8', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Mobile Safari/537.36', '2026-05-15 08:09:18'),
(66, NULL, 'login_failed', 'Failed login for: bxbdb (attempt 4)', '2409:40d4:50c8:a169:605d:7c4a:1dc6:91c8', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Mobile Safari/537.36', '2026-05-15 08:09:23'),
(67, NULL, 'login_failed', 'Failed login for: bxbdb (attempt 5)', '2409:40d4:50c8:a169:605d:7c4a:1dc6:91c8', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Mobile Safari/537.36', '2026-05-15 08:09:29'),
(68, NULL, 'login_failed', 'Failed login for: bxbdb (attempt 1)', '2409:40d4:50c8:a169:605d:7c4a:1dc6:91c8', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Mobile Safari/537.36', '2026-05-15 08:09:58'),
(69, 2, 'login_success', 'Logged in as admin: EdumintAdmin2518', '2409:40d4:50c8:a169:605d:7c4a:1dc6:91c8', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Mobile Safari/537.36', '2026-05-15 08:10:05'),
(70, 3, 'login_success', 'Logged in as author: pintu', '2409:40d4:5088:3f0e:8000::', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Mobile Safari/537.36', '2026-05-15 14:01:30'),
(71, 3, 'logout', 'User pintu logged out successfully', '2409:40d4:5088:3f0e:8000::', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Mobile Safari/537.36', '2026-05-15 14:02:57'),
(72, NULL, 'login_failed', 'Failed login for: 9680192463manish@gmail.com (attempt 1)', '2409:40d4:5088:3f0e:8000::', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Mobile Safari/537.36', '2026-05-15 14:03:05'),
(73, 3, 'login_success', 'Logged in as author: pintu', '2409:40d4:5094:4402:8000::', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Mobile Safari/537.36', '2026-05-16 05:07:25'),
(74, 3, 'login_success', 'Logged in as author: pintu', '2409:40d4:5094:4402:605d:7c4a:1dc6:91c8', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Mobile Safari/537.36', '2026-05-16 05:36:02'),
(75, 3, 'logout', 'User pintu logged out successfully', '2409:40d4:5094:4402:605d:7c4a:1dc6:91c8', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Mobile Safari/537.36', '2026-05-16 06:04:31'),
(76, 2, 'login_success', 'Logged in as admin: EdumintAdmin2518', '2409:40d4:5094:4402:605d:7c4a:1dc6:91c8', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Mobile Safari/537.36', '2026-05-16 06:04:34'),
(77, 2, 'comment_reply', 'Replied to Comment (Parent ID: 2, New ID: 3) on Post ID: 1', '2409:40d4:5094:4402:605d:7c4a:1dc6:91c8', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Mobile Safari/537.36', '2026-05-16 06:47:50'),
(78, 2, 'comment_reply', 'Replied to Comment (Parent ID: 2, New ID: 4) on Post ID: 1', '2409:40d4:5094:4402:605d:7c4a:1dc6:91c8', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Mobile Safari/537.36', '2026-05-16 06:47:59'),
(79, 2, 'comment_delete', 'Deleted Comment ID: 4 (User: CareerDiksha Support) from Post ID: 1', '2409:40d4:5094:4402:605d:7c4a:1dc6:91c8', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Mobile Safari/537.36', '2026-05-16 06:57:56'),
(80, 2, 'comment_delete', 'Deleted Comment ID: 3 (User: CareerDiksha Support) from Post ID: 1', '2409:40d4:5094:4402:605d:7c4a:1dc6:91c8', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Mobile Safari/537.36', '2026-05-16 06:58:03'),
(81, 2, 'comment_reply', 'Replied to Comment (Parent ID: 2, New ID: 5) on Post ID: 1', '2409:40d4:5094:4402:605d:7c4a:1dc6:91c8', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Mobile Safari/537.36', '2026-05-16 07:00:07'),
(82, 2, 'push_send', 'Sent Push Notification: Do on the rise of electric cars in india along ... (Linked Post ID: 1)', '2401:4900:8926:4315:cf7:6e72:513e:8fbd', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Safari/537.36', '2026-05-16 08:38:27'),
(83, 2, 'logout', 'User EdumintAdmin2518 logged out successfully', '2401:4900:8926:4315:cf7:6e72:513e:8fbd', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Safari/537.36', '2026-05-16 08:53:00'),
(84, NULL, 'login_failed', 'Failed login for: Pintu (attempt 1)', '2401:4900:8926:4315:cf7:6e72:513e:8fbd', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Safari/537.36', '2026-05-16 08:53:16'),
(85, 3, 'login_success', 'Logged in as author: pintu', '2401:4900:8926:4315:cf7:6e72:513e:8fbd', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Safari/537.36', '2026-05-16 08:53:24'),
(86, 2, 'login_success', 'Logged in as admin: EdumintAdmin2518', '2409:40d4:5094:4402:605d:7c4a:1dc6:91c8', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Mobile Safari/537.36', '2026-05-16 09:39:48'),
(87, 2, 'push_send', 'Sent Push Notification: Do on the rise of electric cars in india along ... (Linked Post ID: 1)', '2409:40d4:5094:4402:605d:7c4a:1dc6:91c8', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Mobile Safari/537.36', '2026-05-16 10:16:07'),
(88, 2, 'push_send', 'Sent Push Notification: Do on the rise of electric cars in india along ... (Linked Post ID: 1)', '2409:40d4:5094:4402:605d:7c4a:1dc6:91c8', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Mobile Safari/537.36', '2026-05-16 10:20:21'),
(89, 2, 'login_success', 'Logged in as admin: EdumintAdmin2518', '2409:40d4:5094:4402:605d:7c4a:1dc6:91c8', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Mobile Safari/537.36', '2026-05-16 15:43:46'),
(90, 2, 'login_success', 'Logged in as admin: EdumintAdmin2518', '2409:40d4:5094:4402:605d:7c4a:1dc6:91c8', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Mobile Safari/537.36', '2026-05-16 16:31:45'),
(91, 2, 'login_success', 'Logged in as admin: EdumintAdmin2518', '2409:40d4:5094:4402:605d:7c4a:1dc6:91c8', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Mobile Safari/537.36', '2026-05-16 17:18:46'),
(92, 2, 'push_send', 'Sent Push Notification: Do on the rise of electric cars in india along ... (Linked Post ID: 1)', '2409:40d4:5094:4402:605d:7c4a:1dc6:91c8', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Mobile Safari/537.36', '2026-05-16 17:20:54'),
(93, 2, 'push_send', 'Sent Push Notification: Do on the rise of electric cars in india along ... (Linked Post ID: 1)', '2409:40d4:5094:4402:605d:7c4a:1dc6:91c8', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Mobile Safari/537.36', '2026-05-16 17:38:42'),
(94, 2, 'login_success', 'Logged in as admin: EdumintAdmin2518', '2409:40d4:5088:dc5:605d:7c4a:1dc6:91c8', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Mobile Safari/537.36', '2026-05-17 12:13:31'),
(95, 2, 'login_success', 'Logged in as admin: EdumintAdmin2518', '2409:40d4:5088:dc5:605d:7c4a:1dc6:91c8', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Mobile Safari/537.36', '2026-05-17 12:47:49'),
(96, 2, 'login_success', 'Logged in as admin: EdumintAdmin2518', '2409:40d4:50c0:f867:605d:7c4a:1dc6:91c8', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Mobile Safari/537.36', '2026-05-19 16:56:36'),
(97, 2, 'push_send', 'Sent Push Notification: Do on the rise of electric cars in india along ... (Linked Post ID: 1)', '2409:40d4:50c0:f867:605d:7c4a:1dc6:91c8', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Mobile Safari/537.36', '2026-05-19 16:56:47'),
(98, 2, 'login_success', 'Logged in as admin: EdumintAdmin2518', '2409:40d4:50c0:f867:605d:7c4a:1dc6:91c8', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Mobile Safari/537.36', '2026-05-19 17:27:02'),
(99, 2, 'login_success', 'Logged in as admin: EdumintAdmin2518', '2409:40d4:50c0:f867:605d:7c4a:1dc6:91c8', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Mobile Safari/537.36', '2026-05-19 17:48:52'),
(100, 2, 'user_edit', 'Edited user ID: 3', '2409:40d4:50c0:f867:605d:7c4a:1dc6:91c8', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Mobile Safari/537.36', '2026-05-19 17:51:24'),
(101, 2, 'user_edit', 'Edited user ID: 3', '2409:40d4:50c0:f867:605d:7c4a:1dc6:91c8', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Mobile Safari/537.36', '2026-05-19 17:51:24'),
(102, 2, 'user_edit', 'Edited user ID: 3', '2409:40d4:50c0:f867:605d:7c4a:1dc6:91c8', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Mobile Safari/537.36', '2026-05-19 17:51:40'),
(103, 2, 'login_success', 'Logged in as admin: EdumintAdmin2518', '2409:40d4:107e:f1fa:99a8:b42f:27bd:207', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Mobile Safari/537.36', '2026-05-21 02:27:31'),
(104, 2, 'push_send', 'Sent Push Notification: Do on the rise of electric cars in india along ... (Linked Post ID: 1)', '2409:40d4:107e:f1fa:99a8:b42f:27bd:207', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Mobile Safari/537.36', '2026-05-21 02:34:57'),
(105, 2, 'login_success', 'Logged in as admin: EdumintAdmin2518', '2409:40d4:5054:4840:6de5:680:d01d:a4bd', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Mobile Safari/537.36', '2026-05-22 02:29:02'),
(106, 3, 'login_success', 'Logged in as author: pintu', '106.214.9.164', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Safari/537.36', '2026-05-22 05:42:36'),
(107, NULL, 'login_failed', 'Failed login for: EdumintAdmin2518 (attempt 1)', '2409:40d4:5054:4840:8000::', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Mobile Safari/537.36', '2026-05-22 07:12:49'),
(108, NULL, 'login_failed', 'Failed login for: EdumintAdmin2518 (attempt 2)', '2409:40d4:5054:4840:8000::', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Mobile Safari/537.36', '2026-05-22 07:13:00'),
(109, 2, 'login_success', 'Logged in as admin: EdumintAdmin2518', '2409:40d4:5054:4840:8000::', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Mobile Safari/537.36', '2026-05-22 07:14:12'),
(110, 3, 'logout', 'User pintu logged out successfully', '106.214.9.164', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Safari/537.36', '2026-05-22 09:15:35'),
(111, 2, 'login_success', 'Logged in as admin: EdumintAdmin2518', '106.214.9.164', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Safari/537.36', '2026-05-22 09:23:23'),
(112, 2, 'post_edit', 'Updated Post: Do on the rise of electric cars in india along ... (ID: 1)', '2401:4900:8837:785b:290a:7553:e8cb:8a90', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36', '2026-08-10 03:09:02'),
(113, 2, 'post_edit', 'Updated Post: Do on the rise of electric cars in india along ... (ID: 1)', '2401:4900:8837:785b:290a:7553:e8cb:8a90', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36', '2026-08-10 03:10:44'),
(114, 2, 'post_edit', 'Updated Post: Do on the rise of electric cars in india along ... (ID: 1)', '2401:4900:8837:785b:290a:7553:e8cb:8a90', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36', '2026-08-10 03:10:58'),
(115, 2, 'login_success', 'Logged in as admin: EdumintAdmin2518', '2409:40d4:5013:7b1d:8000::', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Mobile Safari/537.36', '2026-08-11 05:15:38'),
(116, NULL, 'login_failed', 'Failed login for: Aj3Arjun (attempt 1)', '2401:4900:8926:f7b9:42e:8b42:4e69:3086', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36', '2026-08-17 14:01:03'),
(117, NULL, 'login_failed', 'Failed login for: Aj3Arjun (attempt 2)', '2401:4900:8926:f7b9:42e:8b42:4e69:3086', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36', '2026-08-17 14:01:08'),
(118, NULL, 'login_failed', 'Failed login for: Aj3Arjun (attempt 3)', '2401:4900:8926:f7b9:42e:8b42:4e69:3086', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36', '2026-08-17 14:01:13'),
(119, NULL, 'login_failed', 'Failed login for: Aj3Arjun (attempt 4)', '2401:4900:8926:f7b9:42e:8b42:4e69:3086', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36', '2026-08-17 14:01:16'),
(120, 2, 'login_success', 'Logged in as admin: EdumintAdmin2518', '2401:4900:8926:f7b9:42e:8b42:4e69:3086', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36', '2026-08-17 14:01:22'),
(121, 2, 'login_success', 'Logged in as admin: EdumintAdmin2518', '2409:40e4:62:2a01:6104:bf7:69ab:8bae', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36', '2026-08-31 00:57:53'),
(122, 2, 'login_success', 'Logged in as admin: EdumintAdmin2518', '2409:40e4:1050:e9b3:fc48:8e17:ce4d:7440', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36', '2026-08-31 07:54:22'),
(123, 2, 'login_success', 'Logged in as admin: EdumintAdmin2518', '2401:4900:8926:4883:f05f:aea:60b8:efb4', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/152.0.0.0 Safari/537.36', '2026-09-01 12:57:58'),
(124, 2, 'login_success', 'Logged in as admin: EdumintAdmin2518', '2401:4900:8926:4883:f05f:aea:60b8:efb4', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/152.0.0.0 Safari/537.36', '2026-09-01 13:42:23'),
(125, 2, 'login_success', 'Logged in as admin: EdumintAdmin2518', '2401:4900:8926:4883:f05f:aea:60b8:efb4', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/152.0.0.0 Safari/537.36', '2026-09-01 15:08:02'),
(126, 2, 'login_success', 'Logged in as admin: EdumintAdmin2518', '2401:4900:8926:4883:31df:4ae8:a2c9:c5cf', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/152.0.0.0 Safari/537.36', '2026-09-01 17:27:43'),
(127, 2, 'login_success', 'Logged in as admin: EdumintAdmin2518', '2401:4900:8926:4883:31df:4ae8:a2c9:c5cf', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/152.0.0.0 Safari/537.36', '2026-09-01 17:50:38'),
(128, 2, 'login_success', 'Logged in as admin: EdumintAdmin2518', '2401:4900:8927:fb80:5ce5:e203:902b:8e6', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/152.0.0.0 Safari/537.36', '2026-09-01 18:41:56'),
(129, 2, 'login_success', 'Logged in as admin: EdumintAdmin2518', '2401:4900:8927:fb80:5ce5:e203:902b:8e6', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/152.0.0.0 Safari/537.36', '2026-09-02 00:21:18'),
(130, 2, 'login_success', 'Logged in as admin: EdumintAdmin2518', '2401:4900:8927:fb80:5ce5:e203:902b:8e6', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/152.0.0.0 Safari/537.36', '2026-09-02 00:23:18'),
(131, 2, 'pdf_upload', 'Uploaded PDF: Setup - Ai Story USA HD Video Prompt Guidelines.pdf (ID: 5)', '2401:4900:8927:fb80:5ce5:e203:902b:8e6', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/152.0.0.0 Safari/537.36', '2026-09-02 00:29:16'),
(132, 2, 'pdf_delete', 'Deleted PDF: setup-ai-story-usa-hd-video-prompt-guidelines.pdf (ID: 5)', '2401:4900:8927:fb80:5ce5:e203:902b:8e6', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/152.0.0.0 Safari/537.36', '2026-09-02 00:29:21'),
(133, 2, 'login_success', 'Logged in as admin: EdumintAdmin2518', '2401:4900:8927:61f6:c49b:d174:2488:9c47', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/152.0.0.0 Safari/537.36', '2026-09-02 06:31:55'),
(134, 2, 'user_edit', 'Edited user ID: 2', '2401:4900:8927:61f6:c49b:d174:2488:9c47', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/152.0.0.0 Safari/537.36', '2026-09-02 07:30:04'),
(136, 2, 'user_edit', 'Edited user ID: 2', '2401:4900:8927:61f6:c49b:d174:2488:9c47', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/152.0.0.0 Safari/537.36', '2026-09-02 07:31:05'),
(138, 2, 'login_success', 'Logged in as admin: EdumintAdmin2518', '2401:4900:88a2:447d:79:e1d3:5df7:f64c', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/152.0.0.0 Safari/537.36', '2026-09-02 12:33:29'),
(139, 2, 'user_edit', 'Edited user ID: 2', '2401:4900:88a2:447d:79:e1d3:5df7:f64c', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/152.0.0.0 Safari/537.36', '2026-09-02 12:44:24'),
(141, 2, 'user_create', 'Created user: eeee (ID: 4)', '2401:4900:88a2:447d:79:e1d3:5df7:f64c', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/152.0.0.0 Safari/537.36', '2026-09-02 12:52:58'),
(143, 2, 'user_edit', 'Edited user ID: 3', '2401:4900:88a2:447d:79:e1d3:5df7:f64c', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/152.0.0.0 Safari/537.36', '2026-09-02 12:57:06'),
(144, 2, 'user_edit', 'Edited user ID: 4', '2401:4900:88a2:447d:79:e1d3:5df7:f64c', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/152.0.0.0 Safari/537.36', '2026-09-02 12:57:24'),
(146, 2, 'user_edit', 'Edited user ID: 3', '2401:4900:88a2:447d:79:e1d3:5df7:f64c', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/152.0.0.0 Safari/537.36', '2026-09-02 12:57:47'),
(147, 4, 'login_blocked', 'Pending account login attempt: eeee', '2409:40e4:200b:d65e:ed24:5045:5313:7b4d', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/152.0.0.0 Safari/537.36', '2026-09-02 17:13:24'),
(148, 4, 'login_blocked', 'Pending account login attempt: eeee', '2409:40e4:200b:d65e:ed24:5045:5313:7b4d', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/152.0.0.0 Safari/537.36', '2026-09-02 17:13:30'),
(149, 2, 'login_success', 'Logged in as admin: EdumintAdmin2518', '2409:40e4:200b:d65e:ed24:5045:5313:7b4d', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/152.0.0.0 Safari/537.36', '2026-09-02 17:13:33'),
(150, 2, 'user_delete', 'Deleted user ID: 3', '2409:40e4:200b:d65e:ed24:5045:5313:7b4d', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/152.0.0.0 Safari/537.36', '2026-09-02 17:13:43'),
(151, 2, 'login_success', 'Logged in as admin: EdumintAdmin2518', '2409:40e4:1052:7773:a960:edc4:b4f7:3f30', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/152.0.0.0 Safari/537.36', '2026-09-02 18:34:42'),
(152, 2, 'login_success', 'Logged in as admin: EdumintAdmin2518', '2409:40e4:6f:fa27:444b:79:634c:9ac1', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/152.0.0.0 Safari/537.36', '2026-09-03 01:46:07'),
(153, 2, 'logs_clear', 'Cleared activity logs (action=author_save) — 8 entries removed', '2409:40e4:6f:fa27:444b:79:634c:9ac1', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/152.0.0.0 Safari/537.36', '2026-09-03 03:08:07'),
(154, 2, 'login_success', 'Logged in as admin: EdumintAdmin2518', '2401:4900:8927:efcb:4ca5:7d3e:7606:cd2e', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/152.0.0.0 Safari/537.36', '2026-09-03 07:44:46'),
(155, 2, 'media_upload', 'Uploaded image: Screenshot 2026-09-03 at 2.12.00 PM.png (ID: 6)', '2401:4900:8926:345a:f8a4:e352:f0b2:f5e4', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/152.0.0.0 Safari/537.36', '2026-09-03 08:42:11'),
(156, 2, 'login_success', 'Logged in as admin: EdumintAdmin2518', '2401:4900:8927:3440:35a1:d5b2:139c:59f3', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/152.0.0.0 Safari/537.36', '2026-09-03 11:56:56'),
(157, 2, 'login_success', 'Logged in as admin: EdumintAdmin2518', '2401:4900:8927:3440:35a1:d5b2:139c:59f3', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/152.0.0.0 Safari/537.36', '2026-09-03 12:08:04'),
(158, 2, 'login_success', 'Logged in as admin: EdumintAdmin2518', '2409:40e4:101f:ac0b:cbf:7403:ec1f:93a6', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/152.0.0.0 Safari/537.36', '2026-09-03 15:55:11'),
(159, 2, 'login_success', 'Logged in as admin: EdumintAdmin2518', '2401:4900:8927:c246:81b1:b737:8a25:eb43', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/152.0.0.0 Safari/537.36', '2026-09-04 06:10:52'),
(160, 2, 'login_success', 'Logged in as admin: EdumintAdmin2518', '2401:4900:8927:c246:81b1:b737:8a25:eb43', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/152.0.0.0 Safari/537.36', '2026-09-04 06:10:58'),
(161, 2, 'login_success', 'Logged in as admin: EdumintAdmin2518', '2401:4900:8927:642e:1955:60:7ef:96dc', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/152.0.0.0 Safari/537.36', '2026-09-04 08:39:34'),
(162, 2, 'user_edit', 'Edited user ID: 2', '2401:4900:8927:642e:1955:60:7ef:96dc', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/152.0.0.0 Safari/537.36', '2026-09-04 08:44:43'),
(163, 2, 'author_save', 'Saved author: EduMint24', '2401:4900:8927:642e:1955:60:7ef:96dc', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/152.0.0.0 Safari/537.36', '2026-09-04 08:44:43'),
(164, 2, 'category_create', 'Created category: women (ID: 1)', '2401:4900:8927:642e:1955:60:7ef:96dc', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/152.0.0.0 Safari/537.36', '2026-09-04 08:45:46'),
(165, 2, 'category_create', 'Created category: mqn (ID: 2)', '2401:4900:8927:642e:1955:60:7ef:96dc', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/152.0.0.0 Safari/537.36', '2026-09-04 08:46:04'),
(166, 2, 'user_edit', 'Edited user ID: 2', '2401:4900:8926:71aa:d194:b3d6:2069:cf6b', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/152.0.0.0 Safari/537.36', '2026-09-04 09:36:19'),
(167, 2, 'author_save', 'Saved author: EduMint24', '2401:4900:8926:71aa:d194:b3d6:2069:cf6b', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/152.0.0.0 Safari/537.36', '2026-09-04 09:36:19'),
(168, 2, 'user_edit', 'Edited user ID: 2', '2401:4900:8926:71aa:d194:b3d6:2069:cf6b', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/152.0.0.0 Safari/537.36', '2026-09-04 09:36:32'),
(169, 2, 'author_save', 'Saved author: EduMint24', '2401:4900:8926:71aa:d194:b3d6:2069:cf6b', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/152.0.0.0 Safari/537.36', '2026-09-04 09:36:32'),
(170, 2, 'login_success', 'Logged in as admin: EdumintAdmin2518', '2401:4900:8927:d504:b550:3175:a29:afcb', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/152.0.0.0 Safari/537.36', '2026-09-04 10:35:36'),
(171, 2, 'login_success', 'Logged in as admin: EdumintAdmin2518', '2401:4900:8926:71aa:c9d6:53e4:da0a:6c8b', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/152.0.0.0 Safari/537.36', '2026-09-04 12:32:02'),
(172, 2, 'login_success', 'Logged in as admin: EdumintAdmin2518', '2409:40e4:68:3db0:5427:47f7:13d9:db65', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/152.0.0.0 Safari/537.36', '2026-09-04 14:44:24'),
(173, 2, 'login_success', 'Logged in as admin: EdumintAdmin2518', '2401:4900:8926:450a:e0b6:5448:b777:df5a', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/152.0.0.0 Safari/537.36', '2026-09-04 15:52:32'),
(174, 2, 'ecom_category_create', 'Created Category: category1 (ID: 1)', '2401:4900:8926:450a:e0b6:5448:b777:df5a', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/152.0.0.0 Safari/537.36', '2026-09-04 15:55:05'),
(175, 2, 'ecom_category_create', 'Created Category: ct2 (ID: 2)', '2401:4900:8926:450a:e0b6:5448:b777:df5a', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/152.0.0.0 Safari/537.36', '2026-09-04 15:55:13'),
(176, 2, 'ecom_subcategory_create', 'Created Sub Category: ne-wct2 (ID: 1)', '2401:4900:8926:450a:e0b6:5448:b777:df5a', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/152.0.0.0 Safari/537.36', '2026-09-04 16:36:31'),
(177, 2, 'ecom_subcategory_create', 'Created Sub Category: ct-1 (ID: 2)', '2401:4900:8926:450a:e0b6:5448:b777:df5a', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/152.0.0.0 Safari/537.36', '2026-09-04 16:36:41'),
(178, 2, 'ecom_childcategory_create', 'Created Child Category: child-1 (ID: 1)', '2401:4900:8926:450a:e0b6:5448:b777:df5a', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/152.0.0.0 Safari/537.36', '2026-09-04 16:42:27'),
(179, 2, 'ecom_brand_create', 'Created Brand: vivo (ID: 1)', '2401:4900:8926:450a:e0b6:5448:b777:df5a', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/152.0.0.0 Safari/537.36', '2026-09-04 16:45:24'),
(180, 2, 'ecom_product_create', 'Created Product: cms (ID: 1)', '2401:4900:8926:450a:e0b6:5448:b777:df5a', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/152.0.0.0 Safari/537.36', '2026-09-04 17:18:28'),
(181, 2, 'ecom_customer_create', 'Created Customer: aj3 (ID: 1)', '2401:4900:8926:450a:e0b6:5448:b777:df5a', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/152.0.0.0 Safari/537.36', '2026-09-04 17:23:54'),
(182, 2, 'login_success', 'Logged in as admin: EdumintAdmin2518', '2401:4900:8926:450a:e0b6:5448:b777:df5a', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/152.0.0.0 Safari/537.36', '2026-09-04 22:35:53'),
(183, 2, 'user_edit', 'Edited user ID: 2', '2401:4900:8926:450a:e0b6:5448:b777:df5a', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/152.0.0.0 Safari/537.36', '2026-09-04 22:52:39'),
(184, 2, 'author_save', 'Saved author: EduMint24', '2401:4900:8926:450a:e0b6:5448:b777:df5a', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/152.0.0.0 Safari/537.36', '2026-09-04 22:52:39'),
(185, 2, 'user_edit', 'Edited user ID: 2', '2401:4900:8926:450a:e0b6:5448:b777:df5a', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/152.0.0.0 Safari/537.36', '2026-09-04 23:02:33'),
(186, 2, 'author_save', 'Saved author: EduMint24', '2401:4900:8926:450a:e0b6:5448:b777:df5a', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/152.0.0.0 Safari/537.36', '2026-09-04 23:02:33'),
(187, 2, 'login_success', 'Logged in as admin: EdumintAdmin2518', '2401:4900:8927:b325:3542:d5ee:3b75:20f1', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/152.0.0.0 Safari/537.36', '2026-09-05 00:42:24'),
(188, 2, 'user_edit', 'Edited user ID: 2', '2401:4900:8927:b325:3542:d5ee:3b75:20f1', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/152.0.0.0 Safari/537.36', '2026-09-05 01:04:19'),
(189, 2, 'author_save', 'Saved author: EduMint24', '2401:4900:8927:b325:3542:d5ee:3b75:20f1', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/152.0.0.0 Safari/537.36', '2026-09-05 01:04:19'),
(190, 2, 'ecom_pos_sale', 'POS Sale: POS-20260905-F1E51C (₹100.00) via UPI', '2401:4900:8927:b325:3542:d5ee:3b75:20f1', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/152.0.0.0 Safari/537.36', '2026-09-05 01:05:51'),
(191, 2, 'login_success', 'Logged in as admin: EdumintAdmin2518', '2401:4900:8927:b325:3542:d5ee:3b75:20f1', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/152.0.0.0 Safari/537.36', '2026-09-05 04:51:27'),
(192, 2, 'user_edit', 'Edited user ID: 2', '2401:4900:8927:b325:3542:d5ee:3b75:20f1', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/152.0.0.0 Safari/537.36', '2026-09-05 04:51:44'),
(193, 2, 'author_save', 'Saved author: EduMint24', '2401:4900:8927:b325:3542:d5ee:3b75:20f1', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/152.0.0.0 Safari/537.36', '2026-09-05 04:51:44'),
(194, 2, 'login_success', 'Logged in as admin: Aj3Arjun', '2401:4900:8927:b325:3542:d5ee:3b75:20f1', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/152.0.0.0 Safari/537.36', '2026-09-05 05:51:15'),
(195, 2, 'user_edit', 'Edited user ID: 2', '2401:4900:8927:b325:3542:d5ee:3b75:20f1', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/152.0.0.0 Safari/537.36', '2026-09-05 06:00:41'),
(196, 2, 'author_save', 'Saved author: EduMint24', '2401:4900:8927:b325:3542:d5ee:3b75:20f1', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/152.0.0.0 Safari/537.36', '2026-09-05 06:00:41'),
(197, 2, 'ecom_pos_sale', 'POS Sale: POS-20260905-72D131 (₹2,240.00) via Cash', '2401:4900:8927:b325:3542:d5ee:3b75:20f1', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/152.0.0.0 Safari/537.36', '2026-09-05 06:05:27'),
(198, 2, 'ecom_coupon_create', 'Created Coupon: new offer (NEW) (ID: 1)', '2401:4900:8927:b325:3542:d5ee:3b75:20f1', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/152.0.0.0 Safari/537.36', '2026-09-05 06:11:29'),
(199, 2, 'login_success', 'Logged in as admin: Aj3Arjun', '2401:4900:8927:b325:3542:d5ee:3b75:20f1', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/152.0.0.0 Safari/537.36', '2026-09-05 07:16:17'),
(200, 2, 'ecom_pos_sale', 'POS Sale: POS-20260905-F9A797 (₹112.00) via Cash', '2401:4900:8926:fa81:ccae:7040:1d67:7e7a', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/152.0.0.0 Safari/537.36', '2026-09-05 08:38:39'),
(201, 2, 'ecom_category_create', 'Created Category: snacks (ID: 3)', '2401:4900:8926:fa81:ccae:7040:1d67:7e7a', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/152.0.0.0 Safari/537.36', '2026-09-05 08:48:06'),
(202, 2, 'ecom_subcategory_create', 'Created Sub Category: Bikaji (ID: 3)', '2401:4900:8926:fa81:ccae:7040:1d67:7e7a', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/152.0.0.0 Safari/537.36', '2026-09-05 08:49:34'),
(203, 2, 'ecom_brand_create', 'Created Brand: Bikaji (ID: 2)', '2401:4900:8926:fa81:ccae:7040:1d67:7e7a', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/152.0.0.0 Safari/537.36', '2026-09-05 08:52:03'),
(204, 2, 'login_success', 'Logged in as admin: Aj3Arjun', '2401:4900:8927:b325:7c67:dc98:a3fe:b209', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/152.0.0.0 Safari/537.36', '2026-09-05 09:56:27'),
(205, 2, 'ecom_category_create', 'Created Category: Car (ID: 4)', '2401:4900:8927:b325:7c67:dc98:a3fe:b209', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/152.0.0.0 Safari/537.36', '2026-09-05 10:10:20'),
(206, 2, 'ecom_subcategory_create', 'Created Sub Category: toy (ID: 4)', '2401:4900:8927:b325:7c67:dc98:a3fe:b209', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/152.0.0.0 Safari/537.36', '2026-09-05 10:10:35'),
(207, 2, 'ecom_product_create', 'Created Product: new Toy car (ID: 2)', '2401:4900:8927:b325:7c67:dc98:a3fe:b209', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/152.0.0.0 Safari/537.36', '2026-09-05 10:11:37'),
(208, 2, 'ecom_pos_sale', 'POS Sale: POS-20260905-4C8350 (₹168.00, ₹16.80 udhaar) via Cash', '2401:4900:8927:b325:7c67:dc98:a3fe:b209', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/152.0.0.0 Safari/537.36', '2026-09-05 11:09:56'),
(209, 2, 'login_success', 'Logged in as admin: Aj3Arjun', '2401:4900:8927:b325:7c67:dc98:a3fe:b209', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/152.0.0.0 Safari/537.36', '2026-09-05 13:22:32'),
(210, 2, 'ecom_product_update', 'Updated Product: new Toy car (ID: 2)', '2401:4900:8927:b325:7c67:dc98:a3fe:b209', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/152.0.0.0 Safari/537.36', '2026-09-05 13:30:46'),
(211, 2, 'ecom_pos_sale', 'POS Sale: POS-20260905-C62D20 (₹672.00, ₹67.20 udhaar) via Cash', '2401:4900:8927:b325:7c67:dc98:a3fe:b209', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/152.0.0.0 Safari/537.36', '2026-09-05 13:33:00'),
(212, 2, 'ecom_product_update', 'Updated Product: new Toy car (ID: 2)', '2401:4900:8927:b325:7c67:dc98:a3fe:b209', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/152.0.0.0 Safari/537.36', '2026-09-05 13:55:28'),
(213, 2, 'login_success', 'Logged in as admin: Aj3Arjun', '2401:4900:8926:61f8:a05d:b100:8e7d:8367', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/152.0.0.0 Safari/537.36', '2026-09-05 15:41:50'),
(214, 2, 'login_success', 'Logged in as admin: Aj3Arjun', '2409:40e4:1153:9880:8000::', 'Mozilla/5.0 (Android 13; Mobile; rv:155.0) Gecko/155.0 Firefox/155.0', '2026-09-05 17:36:53'),
(215, 2, 'login_success', 'Logged in as admin: Aj3Arjun', '2401:4900:8926:61f8:c983:57b7:cd1:5303', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/152.0.0.0 Safari/537.36', '2026-09-06 00:57:56'),
(216, 2, 'ecom_credit_payment', 'Recorded due payment: ₹50.20 from aman', '2401:4900:8926:61f8:c983:57b7:cd1:5303', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/152.0.0.0 Safari/537.36', '2026-09-06 00:59:06'),
(217, 2, 'ecom_credit_payment', 'Recorded due payment: ₹5.00 from aman', '2401:4900:8926:61f8:c983:57b7:cd1:5303', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/152.0.0.0 Safari/537.36', '2026-09-06 00:59:19');
INSERT INTO `activity_logs` (`id`, `user_id`, `action_type`, `description`, `ip_address`, `user_agent`, `created_at`) VALUES
(218, 2, 'ecom_brand_create', 'Created Brand (via Add Product): mi (ID: 3)', '2401:4900:8926:61f8:c983:57b7:cd1:5303', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/152.0.0.0 Safari/537.36', '2026-09-06 01:13:52'),
(219, 2, 'ecom_product_create', 'Created Product: MI note 4 (ID: 3)', '2401:4900:8926:61f8:c983:57b7:cd1:5303', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/152.0.0.0 Safari/537.36', '2026-09-06 01:14:15'),
(220, 2, 'ecom_pos_sale', 'POS Sale: ORD0000001 (₹224.00) via Cash', '2401:4900:8926:61f8:c983:57b7:cd1:5303', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/152.0.0.0 Safari/537.36', '2026-09-06 02:35:47'),
(221, 2, 'ecom_product_create', 'Created Product: kurta (ID: 4)', '2401:4900:8927:48fe:2ca5:37be:e828:17a', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/152.0.0.0 Safari/537.36', '2026-09-06 02:42:41'),
(222, 2, 'ecom_product_update', 'Updated Product: kurta (ID: 4)', '2401:4900:8927:48fe:2ca5:37be:e828:17a', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/152.0.0.0 Safari/537.36', '2026-09-06 02:42:54'),
(223, 2, 'ecom_pos_sale', 'POS Sale: ORD0000002 (₹560.00) via Cash', '2401:4900:8927:48fe:2ca5:37be:e828:17a', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/152.0.0.0 Safari/537.36', '2026-09-06 02:43:39'),
(224, 2, 'ecom_pos_sale', 'POS Sale: ORD0000003 (₹224.00) via Cash', '2401:4900:8927:48fe:2ca5:37be:e828:17a', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/152.0.0.0 Safari/537.36', '2026-09-06 02:47:31'),
(225, 2, 'ecom_pos_sale', 'POS Sale: ORD0000004 (₹112.00, ₹12.00 due) via Cash', '2401:4900:8927:48fe:2ca5:37be:e828:17a', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/152.0.0.0 Safari/537.36', '2026-09-06 03:08:27'),
(226, 2, 'ecom_credit_payment', 'Recorded due payment: ₹10.00 from Badal', '2401:4900:8927:48fe:2ca5:37be:e828:17a', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/152.0.0.0 Safari/537.36', '2026-09-06 03:16:49'),
(227, 2, 'ecom_credit_payment', 'Recorded due payment: ₹2.00 from Badal', '2401:4900:8927:48fe:2ca5:37be:e828:17a', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/152.0.0.0 Safari/537.36', '2026-09-06 03:17:00'),
(228, 2, 'ecom_credit_payment', 'Recorded due payment: ₹6.00 from aman (Receipt: RCPT0000001)', '2401:4900:8927:48fe:2ca5:37be:e828:17a', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/152.0.0.0 Safari/537.36', '2026-09-06 03:40:50'),
(229, 2, 'ecom_credit_payment', 'Recorded due payment: ₹4.00 from Walk-in Customer (Receipt: RCPT0000002)', '2401:4900:8927:48fe:2ca5:37be:e828:17a', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/152.0.0.0 Safari/537.36', '2026-09-06 04:05:10'),
(230, 2, 'login_success', 'Logged in as admin: Aj3Arjun', '2401:4900:8927:f891:fc29:f7f7:3e16:3f7c', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/152.0.0.0 Safari/537.36', '2026-09-06 07:03:34'),
(231, 2, 'login_success', 'Logged in as admin: Aj3Arjun', '2401:4900:8927:f891:fc29:f7f7:3e16:3f7c', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/152.0.0.0 Safari/537.36', '2026-09-06 07:41:49'),
(232, 2, 'login_success', 'Logged in as admin: Aj3Arjun', '2401:4900:8927:f891:fc29:f7f7:3e16:3f7c', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/152.0.0.0 Safari/537.36', '2026-09-06 07:44:21'),
(233, 2, 'login_success', 'Logged in as admin: Aj3Arjun', '2401:4900:8927:f891:fc29:f7f7:3e16:3f7c', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/152.0.0.0 Safari/537.36', '2026-09-06 10:21:17'),
(234, 2, 'ecom_business_settings_update', 'Updated business profile settings', '2401:4900:8927:f891:fc29:f7f7:3e16:3f7c', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/152.0.0.0 Safari/537.36', '2026-09-06 10:22:44'),
(235, 2, 'ecom_pos_sale', 'POS Sale: ORD0000005 (₹168.00, ₹118.00 due) via Cash', '2401:4900:8927:48fe:6d1f:f4a5:8994:a90a', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/152.0.0.0 Safari/537.36', '2026-09-06 12:23:32'),
(236, 2, 'ecom_credit_payment', 'Recorded due payment: ₹20.00 from Badal (Receipt: RCPT0000003)', '2401:4900:8927:48fe:6d1f:f4a5:8994:a90a', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/152.0.0.0 Safari/537.36', '2026-09-06 13:41:04'),
(237, 2, 'ecom_credit_payment', 'Recorded due payment: ₹98.00 from Badal (Receipt: RCPT0000004)', '2401:4900:8927:48fe:6d1f:f4a5:8994:a90a', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/152.0.0.0 Safari/537.36', '2026-09-06 13:42:17'),
(238, 2, 'ecom_pos_sale', 'POS Sale: ORD0000007 (₹784.00, ₹484.00 due) via Cash', '2401:4900:8927:48fe:6d1f:f4a5:8994:a90a', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/152.0.0.0 Safari/537.36', '2026-09-06 13:51:23'),
(239, 2, 'ecom_credit_payment', 'Recorded due payment: ₹184.00 from Arjun (Receipt: RCPT0000005)', '2401:4900:8927:48fe:6d1f:f4a5:8994:a90a', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/152.0.0.0 Safari/537.36', '2026-09-06 13:52:11'),
(240, 2, 'ecom_credit_payment', 'Recorded due payment: ₹50.00 from Arjun (Receipt: RCPT0000006)', '2401:4900:8927:48fe:6d1f:f4a5:8994:a90a', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/152.0.0.0 Safari/537.36', '2026-09-06 13:52:28'),
(241, 2, 'ecom_credit_payment', 'Recorded due payment: ₹50.00 from Arjun (Receipt: RCPT0000007)', '2401:4900:8927:48fe:6d1f:f4a5:8994:a90a', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/152.0.0.0 Safari/537.36', '2026-09-06 13:52:29'),
(242, 2, 'ecom_credit_payment', 'Recorded due payment: ₹50.00 from Arjun (Receipt: RCPT0000008)', '2401:4900:8927:48fe:6d1f:f4a5:8994:a90a', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/152.0.0.0 Safari/537.36', '2026-09-06 13:54:31'),
(243, 2, 'ecom_customer_update', 'Updated Customer profile: Arjun Kumar (ID: 7)', '2401:4900:8927:48fe:6d1f:f4a5:8994:a90a', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/152.0.0.0 Safari/537.36', '2026-09-06 14:44:35'),
(244, 2, 'login_success', 'Logged in as admin: Aj3Arjun', '2401:4900:8927:d3a1:718d:fb2:d600:a322', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/152.0.0.0 Safari/537.36', '2026-09-07 00:22:36'),
(245, 2, 'push_send', 'Sent Push Notification: Do on the rise of electric cars in india along ... (Linked Post ID: 1)', '2401:4900:8927:d3a1:718d:fb2:d600:a322', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/152.0.0.0 Safari/537.36', '2026-09-07 00:25:31'),
(246, 2, 'login_success', 'Logged in as admin: Aj3Arjun', '2401:4900:8927:d3a1:718d:fb2:d600:a322', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/152.0.0.0 Safari/537.36', '2026-09-07 02:00:14'),
(247, 2, 'media_upload', 'Uploaded image: logo.webp (ID: 7)', '2401:4900:8927:d3a1:718d:fb2:d600:a322', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/152.0.0.0 Safari/537.36', '2026-09-07 02:00:33'),
(248, 2, 'login_success', 'Logged in as admin: Aj3Arjun', '2401:4900:8926:e91e:2596:e907:f57c:d51', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/152.0.0.0 Safari/537.36', '2026-09-07 05:00:46'),
(249, 2, 'ecom_pos_sale', 'POS Sale: ORD0000008 (₹448.00) via Cash', '2401:4900:8926:e91e:2596:e907:f57c:d51', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/152.0.0.0 Safari/537.36', '2026-09-07 05:02:18'),
(250, 2, 'ecom_customer_update', 'Updated Customer profile: Raushan (ID: 8)', '2401:4900:8926:e91e:2596:e907:f57c:d51', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/152.0.0.0 Safari/537.36', '2026-09-07 05:03:24'),
(251, 2, 'ecom_pos_sale', 'POS Sale: ORD0000009 (₹224.00, ₹124.00 due) via Cash', '2401:4900:8926:e91e:2596:e907:f57c:d51', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/152.0.0.0 Safari/537.36', '2026-09-07 05:04:41'),
(252, 2, 'ecom_credit_payment', 'Recorded due payment: ₹50.00 from Raushan (Receipt: RCPT0000009)', '2401:4900:8926:e91e:2596:e907:f57c:d51', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/152.0.0.0 Safari/537.36', '2026-09-07 05:05:40'),
(253, 2, 'ecom_credit_payment', 'Recorded due payment: ₹74.00 from Raushan (Receipt: RCPT0000010)', '2401:4900:8926:e91e:2596:e907:f57c:d51', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/152.0.0.0 Safari/537.36', '2026-09-07 05:07:01'),
(254, 2, 'ecom_pos_sale', 'POS Sale: ORD0000010 (₹336.00, ₹136.00 due) via Cash', '2401:4900:8926:e91e:2596:e907:f57c:d51', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/152.0.0.0 Safari/537.36', '2026-09-07 05:11:23'),
(255, 2, 'login_success', 'Logged in as admin: Aj3Arjun', '2401:4900:8926:e91e:2596:e907:f57c:d51', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/152.0.0.0 Safari/537.36', '2026-09-07 06:50:46'),
(256, 2, 'ecom_brand_create', 'Created Brand (via Add Product): Wheel (ID: 4)', '2401:4900:8926:e91e:2596:e907:f57c:d51', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/152.0.0.0 Safari/537.36', '2026-09-07 06:57:13'),
(257, 2, 'ecom_product_create', 'Created Product: Wheel Shurf 1KG (ID: 5)', '2401:4900:8926:e91e:2596:e907:f57c:d51', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/152.0.0.0 Safari/537.36', '2026-09-07 06:58:03'),
(258, 2, 'ecom_pos_sale', 'POS Sale: ORD0000011 (₹392.00) via Cash', '2401:4900:8926:e91e:2596:e907:f57c:d51', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/152.0.0.0 Safari/537.36', '2026-09-07 07:12:58'),
(259, 2, 'ecom_pos_sale', 'POS Sale: ORD0000012 (₹448.00, ₹348.00 due) via UPI', '2401:4900:8926:e91e:2596:e907:f57c:d51', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/152.0.0.0 Safari/537.36', '2026-09-07 07:22:33'),
(260, 2, 'ecom_credit_payment', 'Recorded due payment: ₹100.00 from Shivam (Receipt: RCPT0000011)', '2401:4900:8926:e91e:2596:e907:f57c:d51', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/152.0.0.0 Safari/537.36', '2026-09-07 07:23:37'),
(261, 2, 'logout', 'User Aj3Arjun logged out successfully', '2401:4900:8926:e91e:2596:e907:f57c:d51', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/152.0.0.0 Safari/537.36', '2026-09-07 07:54:35'),
(262, 2, 'login_success', 'Logged in as admin: Aj3Arjun', '2401:4900:8926:e91e:2596:e907:f57c:d51', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/152.0.0.0 Safari/537.36', '2026-09-07 07:55:23'),
(263, 2, 'login_success', 'Logged in as admin: Aj3Arjun', '2401:4900:8927:5f7:65c9:35ee:2c10:c61f', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/152.0.0.0 Safari/537.36', '2026-09-07 08:59:32'),
(264, 2, 'login_success', 'Logged in as admin: Aj3Arjun', '2401:4900:8927:5b5:2078:ab2f:24a5:e0ab', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/152.0.0.0 Safari/537.36', '2026-09-07 10:37:32'),
(265, 2, 'login_success', 'Logged in as admin: Aj3Arjun', '2401:4900:8927:5b5:2078:ab2f:24a5:e0ab', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/152.0.0.0 Safari/537.36', '2026-09-07 11:14:56'),
(266, 2, 'login_success', 'Logged in as admin: Aj3Arjun', '2409:40e4:1044:d335:909b:ec61:519d:d487', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/152.0.0.0 Safari/537.36', '2026-09-07 15:44:53'),
(267, 2, 'ecom_pos_sale', 'POS Sale: ORD0000013 (₹280.00) via Split', '2409:40e4:1231:e22d:6d0b:8db3:bc8c:da2e', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/152.0.0.0 Safari/537.36', '2026-09-07 16:38:14'),
(268, 2, 'login_success', 'Logged in as admin: Aj3Arjun', '2401:4900:8926:d976:ed9b:3bb7:576c:6994', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/152.0.0.0 Safari/537.36', '2026-09-08 05:20:19'),
(269, 2, 'ecom_business_settings_update', 'Updated business profile settings', '2401:4900:8926:d976:ed9b:3bb7:576c:6994', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/152.0.0.0 Safari/537.36', '2026-09-08 06:26:59');

-- --------------------------------------------------------

--
-- Table structure for table `ad_blocks`
--

CREATE TABLE `ad_blocks` (
  `block_number` tinyint NOT NULL,
  `enabled` tinyint(1) NOT NULL DEFAULT '0',
  `ad_code` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `pages` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `insertion` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'disabled',
  `paragraph_number` int NOT NULL DEFAULT '1',
  `alignment` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'default',
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `ad_blocks`
--

INSERT INTO `ad_blocks` (`block_number`, `enabled`, `ad_code`, `pages`, `insertion`, `paragraph_number`, `alignment`, `updated_at`) VALUES
(1, 0, '', '[\"post\"]', 'disabled', 1, 'default', '2026-09-02 07:50:02'),
(2, 0, '', '[\"post\"]', 'disabled', 1, 'default', '2026-09-02 07:50:02'),
(3, 0, '', '[\"post\"]', 'disabled', 1, 'default', '2026-09-02 07:50:02'),
(4, 0, '', '[\"post\"]', 'disabled', 1, 'default', '2026-09-02 07:50:02'),
(5, 0, '', '[\"post\"]', 'disabled', 1, 'default', '2026-09-02 07:50:02'),
(6, 0, '', '[\"post\"]', 'disabled', 1, 'default', '2026-09-02 07:50:02'),
(7, 0, '', '[\"post\"]', 'disabled', 1, 'default', '2026-09-02 07:50:02'),
(8, 0, '', '[\"post\"]', 'disabled', 1, 'default', '2026-09-02 07:50:02'),
(9, 0, '', '[\"post\"]', 'disabled', 1, 'default', '2026-09-02 07:50:02'),
(10, 0, '', '[\"post\"]', 'disabled', 1, 'default', '2026-09-02 07:50:02'),
(11, 0, '', '[\"post\"]', 'disabled', 1, 'default', '2026-09-02 07:50:02'),
(12, 0, '', '[\"post\"]', 'disabled', 1, 'default', '2026-09-02 07:50:02'),
(13, 0, '', '[\"post\"]', 'disabled', 1, 'default', '2026-09-02 07:50:02'),
(14, 0, '', '[\"post\"]', 'disabled', 1, 'default', '2026-09-02 07:50:02'),
(15, 0, '', '[\"post\"]', 'disabled', 1, 'default', '2026-09-02 07:50:02'),
(16, 0, '', '[\"post\"]', 'disabled', 1, 'default', '2026-09-02 07:50:02');

-- --------------------------------------------------------

--
-- Table structure for table `ad_units`
--

CREATE TABLE `ad_units` (
  `id` int NOT NULL,
  `name` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'New Ad Slot',
  `enabled` tinyint(1) NOT NULL DEFAULT '0',
  `placement` enum('header','footer','sidebar','before_content','after_content','in_article','between_posts') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'in_article',
  `pages` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `device` enum('all','desktop','mobile') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'all',
  `insertion` enum('before_paragraph','after_paragraph','na') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'na',
  `paragraph_number` int NOT NULL DEFAULT '1',
  `alignment` enum('default','center','left','right','float_left','float_right') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'default',
  `ad_code` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `priority` int NOT NULL DEFAULT '0',
  `sort_order` int NOT NULL DEFAULT '0',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `ad_units`
--

INSERT INTO `ad_units` (`id`, `name`, `enabled`, `placement`, `pages`, `device`, `insertion`, `paragraph_number`, `alignment`, `ad_code`, `priority`, `sort_order`, `created_at`, `updated_at`) VALUES
(1, 'New Ad Slot 1', 0, 'in_article', '[\"all\"]', 'all', 'after_paragraph', 2, 'default', '', 0, 1, '2026-09-02 07:45:48', '2026-09-02 07:45:48');

-- --------------------------------------------------------

--
-- Table structure for table `app_config`
--

CREATE TABLE `app_config` (
  `config_key` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `config_value` text COLLATE utf8mb4_unicode_ci
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `app_config`
--

INSERT INTO `app_config` (`config_key`, `config_value`) VALUES
('ads_body_script', ''),
('ads_footer_script', ''),
('ads_header_script', ''),
('ads_txt_content', 'tttttxt'),
('ads_txt_enabled', '1'),
('last_newsletter_sent', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `authors`
--

CREATE TABLE `authors` (
  `id` int NOT NULL,
  `full_name` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(150) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `bio` text COLLATE utf8mb4_unicode_ci,
  `profile_image` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(150) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `mobile_number` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address` text COLLATE utf8mb4_unicode_ci,
  `qualifications` text COLLATE utf8mb4_unicode_ci,
  `designation` varchar(150) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `experience` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `certifications` text COLLATE utf8mb4_unicode_ci,
  `languages_known` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `instagram` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `threads` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `linkedin` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `facebook` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `twitter` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `total_posts` int DEFAULT '0',
  `is_featured` tinyint(1) DEFAULT '0',
  `status` enum('active','pending','suspended') COLLATE utf8mb4_unicode_ci DEFAULT 'pending',
  `user_id` int NOT NULL,
  `join_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `authors`
--

INSERT INTO `authors` (`id`, `full_name`, `name`, `slug`, `bio`, `profile_image`, `email`, `mobile_number`, `address`, `qualifications`, `designation`, `experience`, `certifications`, `languages_known`, `instagram`, `threads`, `linkedin`, `facebook`, `twitter`, `total_posts`, `is_featured`, `status`, `user_id`, `join_date`) VALUES
(1, 'EduMint24', 'EduMint24', 'edumint24', 'EduMint24 is a modern education and career platform providing fast and reliable government job updates, exam notifications, results, current affairs, and study resources for students and aspirants.', 'uploads/authors/author_6a04112bee716.webp', 'admin@edumint24.com', '+911234567890', 'Example city', 'Bsc', 'Admin Writer', '5 Years', 'No', 'Hindi, English', 'https://instagram.com/', 'https://thread.net/', 'https://linkedin.com/', 'https://facebook.com/', 'https://twitter.com/', 0, 1, 'active', 2, '2026-05-13 05:50:35'),
(2, 'Arjun Kumar', 'Arjun Kumar', 'arjun-kumar', '', NULL, '', '', '', '', '', '', '', '', '', '', '', '', '', 0, 0, 'active', 4, '2026-09-02 12:52:58');

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int NOT NULL,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `meta_title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `meta_description` text COLLATE utf8mb4_unicode_ci,
  `meta_keywords` text COLLATE utf8mb4_unicode_ci,
  `views` int DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`, `slug`, `meta_title`, `meta_description`, `meta_keywords`, `views`) VALUES
(1, 'Government Jobs', 'government-jobs', 'New Government Jobs 2025 Online Apply', 'Find latest government job vacancies 2025, apply online for sarkari naukri updates and notifications from CareerDiksha.', 'government jobs 2025, sarkari vacancy, govt job apply online', 56),
(2, 'Admit Cards', 'admit-card', 'Latest Admit Cards 2025 Download', 'Download latest government exam admit cards 2025 including SSC, Railway, Police, Defence and other recruitment exams.', 'admit card 2025, exam hall ticket, sarkari exam admit card', 50),
(3, 'Answer Keys', 'answer-key', 'Latest Answer Keys 2025', 'Check latest government exam answer keys 2025 for SSC, Railway, UPSC, and state-level exams with download links.', 'sarkari answer key 2025, government exam answer key', 57),
(4, 'Results', 'result', 'Sarkari Result 2025', 'Check latest Sarkari Result 2025 for government exams, entrance tests, and recruitment updates online.', 'sarkari result 2025, government exam result', 49),
(5, 'Private Jobs', 'private-jobs', 'Latest Private Sector Jobs 2025', 'Explore private sector job vacancies 2025 across IT, banking, and corporate companies, apply online easily.', 'private jobs 2025, company vacancies, private job online apply', 17),
(6, 'Defence Jobs', 'defence-jobs', 'Defence Jobs 2025 Online Apply', 'Find latest Indian Army, Navy, and Airforce jobs 2025 with online application details and eligibility.', 'defence jobs 2025, army recruitment, airforce vacancy', 16),
(7, 'Railway Jobs', 'railway-jobs', 'Railway Jobs 2025 Apply Online', 'Get updates on latest Indian Railway vacancies, RRB recruitment 2025, and online application details.', 'railway jobs 2025, rrb vacancy, railway recruitment online', 73),
(8, 'SSC Jobs', 'ssc-jobs', 'SSC Jobs 2025 Apply Online', 'Apply online for latest SSC recruitment 2025 including CGL, CHSL, MTS and other government vacancies.', 'ssc jobs 2025, ssc recruitment online, chsl cgl vacancy', 56),
(9, 'State Govt Jobs', 'state-govt-jobs', 'State Government Jobs 2025', 'Explore latest state government jobs 2025 for all Indian states, apply online for various departments.', 'state govt jobs 2025, state wise government vacancy', 15),
(10, '12th Pass Govt Jobs', '12th-pass-govt-jobs', '12th Pass Government Jobs 2025', 'Find new 12th pass government job vacancies 2025, apply online for SSC, Police, and Defence jobs.', '12th pass govt jobs 2025, 12th pass vacancy, sarkari naukri 12th pass', 56),
(11, 'Banking Jobs', 'banking-jobs', 'Banking Jobs 2025 Apply Online', 'Apply online for latest banking jobs 2025 in SBI, RBI, IBPS and private sector banks. Check eligibility, vacancies and exam details.', 'banking jobs 2025, sbi recruitment, ibps vacancy, bank job apply online', 51),
(12, 'Teaching Jobs', 'teaching-jobs', 'Teaching Jobs 2025 Online Apply', 'Find latest teaching job vacancies 2025 in schools, colleges and universities including TGT, PGT, and lecturer posts.', 'teaching jobs 2025, teacher recruitment, tgt pgt lecturer vacancy', 17),
(13, 'Engineering Jobs', 'engineering-jobs', 'Engineering Jobs 2025 Apply Online', 'Check latest engineering jobs 2025 in PSU, government departments, and private companies for civil, mechanical, electrical engineers.', 'engineering jobs 2025, psu recruitment, engineer vacancy', 18),
(14, 'PSU Jobs', 'psu-jobs', 'PSU Jobs 2025 Apply Online', 'Find latest PSU jobs 2025 including NTPC, ONGC, BHEL, and GAIL recruitment updates with online apply links.', 'psu jobs 2025, public sector recruitment, government company jobs', 15),
(15, 'Police Jobs', 'police-jobs', 'Police Jobs 2025 Apply Online', 'Apply online for latest Police jobs 2025 in state police, CAPF, CISF, CRPF, and other security forces.', 'police jobs 2025, constable recruitment, sub inspector vacancy', 18),
(16, 'UPSC Jobs', 'upsc-jobs', 'UPSC Jobs 2025 Notifications & Online Apply', 'Get latest UPSC job notifications 2025 for IAS, IPS, NDA, CDS and other central government recruitments.', 'upsc jobs 2025, ias recruitment, cds nda exam notification', 51),
(17, 'Nursing Jobs', 'nursing-jobs', 'Nursing Jobs 2025 Apply Online', 'Latest nursing job vacancies 2025 in government hospitals, AIIMS, ESIC, Railways, and private hospitals. Staff Nurse, GNM, BSc Nursing recruitment.', 'nursing jobs 2025, staff nurse vacancy, aiims nursing recruitment, gnm bsc nursing jobs', 15),
(18, 'Medical Jobs', 'medical-jobs', 'Medical Jobs 2025 Online Apply', 'Find doctor, pharmacist, lab technician, and paramedical staff jobs 2025 in government and private healthcare sectors.', 'medical jobs 2025, doctor recruitment, pharmacist vacancy, paramedical jobs', 15),
(19, 'IT Jobs', 'it-jobs', 'IT Jobs 2025 Apply Online', 'Latest IT sector jobs 2025 for software developers, data analysts, cybersecurity experts in MNCs and startups.', 'it jobs 2025, software developer vacancy, data science jobs, fresher it recruitment', 15),
(20, 'Fresher Jobs', 'fresher-jobs', 'Fresher Jobs 2025 Online Apply', 'Latest entry-level jobs 2025 for fresh graduates in government, PSU, banking, and private companies.', 'fresher jobs 2025, campus placement, entry level vacancy, graduate jobs', 15),
(21, '10th Pass Govt Jobs', '10th-pass-govt-jobs', '10th Pass Government Jobs 2025', 'Apply online for 10th pass sarkari naukri 2025 in SSC MTS, Railway Group D, Police Constable, and Peon jobs.', '10th pass govt jobs 2025, mts vacancy, group d recruitment, 10th pass sarkari naukri', 70),
(22, 'Graduate Jobs', 'graduate-jobs', 'Graduate Jobs 2025 Apply Online', 'Latest job opportunities 2025 for graduates in UPSC, SSC, Banking, Teaching, and corporate sectors.', 'graduate jobs 2025, ba bsc bcom vacancy, government jobs for graduates', 17),
(23, 'Diploma Jobs', 'diploma-jobs', 'Diploma Jobs 2025 Apply Online', 'Find diploma holder jobs 2025 in engineering, polytechnic, ITI pass vacancies in PSU and government departments.', 'diploma jobs 2025, polytechnic recruitment, iti diploma vacancy', 15),
(24, 'Pharmacist Jobs', 'pharmacist-jobs', 'Pharmacist Jobs 2025 Apply Online', 'Latest pharmacist recruitment 2025 in government hospitals, ESIC, Railways, and private medical stores.', 'pharmacist jobs 2025, dpharma bpharma vacancy, railway pharmacist recruitment', 17),
(25, 'Clerk Jobs', 'clerk-jobs', 'Clerk Jobs 2025 Apply Online', 'Apply for clerical posts 2025 in banks, SSC, railways, courts, and government offices with online forms.', 'clerk jobs 2025, ibps clerk vacancy, ssc clerk recruitment, office assistant jobs', 14),
(26, 'Driver Jobs', 'driver-jobs', 'Driver Jobs 2025 Government & Private', 'Latest driver vacancies 2025 in government transport, police, army, and private companies for LMV/HMV license holders.', 'driver jobs 2025, government driver vacancy, army driver recruitment, private driver jobs', 16),
(27, 'Stenographer Jobs', 'stenographer-jobs', 'Stenographer Jobs 2025 Apply Online', 'Latest stenographer recruitment 2025 in SSC Stenographer, High Court, and government ministries.', 'stenographer jobs 2025, ssc steno vacancy, court stenographer recruitment', 19),
(28, 'Lab Technician Jobs', 'lab-technician-jobs', 'Lab Technician Jobs 2025 Apply Online', 'Find DMLT, BMLT lab technician jobs 2025 in government hospitals, diagnostic centers, and research labs.', 'lab technician jobs 2025, dmlt vacancy, medical lab technician recruitment', 13),
(29, 'Accountant Jobs', 'accountant-jobs', 'Accountant Jobs 2025 Apply Online', 'Latest accountant vacancies 2025 in government departments, CA firms, banks, and corporate companies.', 'accountant jobs 2025, ca vacancy, government accountant recruitment', 13),
(30, 'Data Entry Jobs', 'data-entry-jobs', 'Data Entry Jobs 2025 Online Apply', 'Latest data entry operator jobs 2025 in government offices, banks, and BPO companies for 12th pass & graduates.', 'data entry jobs 2025, deo vacancy, computer operator recruitment', 13),
(31, 'Work From Home Jobs', 'work-from-home-jobs', 'Work From Home Jobs 2025', 'Latest remote job opportunities 2025 in content writing, customer support, teaching, and IT support.', 'work from home jobs 2025, remote jobs, online teaching vacancy, wfh recruitment', 16),
(32, 'Women Govt Jobs', 'women-govt-jobs', 'Women Government Jobs 2025', 'Exclusive sarkari naukri for women 2025 with reservations in SSC, Railway, Police, and Teaching.', 'women govt jobs 2025, mahila sarkari naukri, female reservation vacancy', 15),
(33, 'Part Time Jobs', 'part-time-jobs', 'Part Time Jobs 2025 Near Me', 'Latest part-time job vacancies 2025 for students, housewives in teaching, data entry, and delivery.', 'part time jobs 2025, student jobs, evening shift vacancy', 17),
(34, 'Apprentice Jobs', 'apprentice-jobs', 'Apprentice Jobs 2025 Apply Online', 'Latest apprenticeship training 2025 in NAPS, NATS, Railways, PSU, and private companies.', 'apprentice jobs 2025, iti apprentice vacancy, naps recruitment', 15),
(35, 'Sports Quota Jobs', 'sports-quota-jobs', 'Sports Quota Jobs 2025', 'Government jobs under sports quota 2025 in Railway, Police, Army for national/state level players.', 'sports quota jobs 2025, railway sports recruitment, police athlete vacancy', 13),
(36, 'Ex-Servicemen Jobs', 'ex-servicemen-jobs', 'Ex-Servicemen Jobs 2025', 'Latest job reservations for ex-servicemen 2025 in security, driver, clerk, and PSU sectors.', 'ex servicemen jobs 2025, esm vacancy, army retired recruitment', 16);

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE `comments` (
  `id` int NOT NULL,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `content` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `date` datetime DEFAULT CURRENT_TIMESTAMP,
  `evf` tinyint(1) DEFAULT '0',
  `status` enum('pending','approved') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'approved',
  `post_id` int NOT NULL,
  `parent_id` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `comments`
--

INSERT INTO `comments` (`id`, `name`, `email`, `content`, `date`, `evf`, `status`, `post_id`, `parent_id`) VALUES
(1, 'Testing User', 'testing@mail.com', 'hwllo', '2026-05-16 06:45:55', 0, 'approved', 1, NULL),
(2, 'Testing User', 'testing@mail.com', 'hyyy', '2026-05-16 06:46:17', 0, 'approved', 1, 1),
(5, 'Edumint24 Support', 'contact@edumint24.com', 'hyy', '2026-05-16 07:00:07', 1, 'approved', 1, 2),
(6, 'Testing User', 'testing@mail.com', 'hyyy', '2026-05-19 17:26:23', 0, 'approved', 1, NULL),
(7, 'Rahul', 'rahul@gmail.com', 'hy yyy', '2026-05-20 14:53:42', 0, 'approved', 1, NULL),
(8, 'Rahul', 'rahul@gmail.com', 'hzhdhdh', '2026-05-20 14:53:50', 0, 'approved', 1, NULL),
(9, 'Rahul', 'rahul@gmail.com', 'sjkalwidrjdh', '2026-05-20 14:53:56', 0, 'approved', 1, NULL),
(10, 'nnnnj', 'hhh@hh.jj', 'hhh', '2026-05-22 08:49:56', 0, 'approved', 1, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `ecom_brands`
--

CREATE TABLE `ecom_brands` (
  `id` int UNSIGNED NOT NULL,
  `name` varchar(150) NOT NULL,
  `slug` varchar(170) NOT NULL,
  `logo` varchar(255) DEFAULT NULL,
  `status` enum('active','inactive') NOT NULL DEFAULT 'active',
  `is_popular` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `ecom_brands`
--

INSERT INTO `ecom_brands` (`id`, `name`, `slug`, `logo`, `status`, `is_popular`, `created_at`, `updated_at`) VALUES
(1, 'vivo', 'vivo', 'uploads/ecommerce/brands/vivo-6a9af5a450891.jpeg', 'active', 1, '2026-09-04 16:45:24', '2026-09-04 16:45:33'),
(2, 'Bikaji', 'bikaji', 'uploads/ecommerce/brands/bikaji-6a9bd833b9366.png', 'active', 0, '2026-09-05 08:52:03', '2026-09-05 08:52:03'),
(3, 'mi', 'mi', NULL, 'active', 0, '2026-09-06 01:13:52', '2026-09-06 01:13:52'),
(4, 'Wheel', 'wheel', NULL, 'active', 0, '2026-09-07 06:57:13', '2026-09-07 06:57:13');

-- --------------------------------------------------------

--
-- Table structure for table `ecom_business_settings`
--

CREATE TABLE `ecom_business_settings` (
  `id` int UNSIGNED NOT NULL,
  `business_name` varchar(200) DEFAULT NULL,
  `tagline` varchar(255) DEFAULT NULL,
  `seo_description` text,
  `address` text,
  `location` varchar(255) DEFAULT NULL,
  `phone` varchar(30) DEFAULT NULL,
  `contact_numbers` text COMMENT 'JSON array of phone numbers',
  `email` varchar(190) DEFAULT NULL,
  `website_url` varchar(255) DEFAULT NULL,
  `business_hours` varchar(255) DEFAULT NULL,
  `gstin` varchar(20) DEFAULT NULL,
  `pan_number` varchar(20) DEFAULT NULL,
  `fssai_number` varchar(30) DEFAULT NULL COMMENT 'Optional — for food businesses',
  `show_gst_on_invoice` tinyint(1) NOT NULL DEFAULT '1',
  `state` varchar(100) DEFAULT NULL,
  `logo` varchar(255) DEFAULT NULL,
  `logo_display_width` int NOT NULL DEFAULT '150',
  `invoice_title` varchar(100) NOT NULL DEFAULT 'Tax Invoice',
  `invoice_footer_note` text,
  `printer_format` enum('a4','thermal_58','thermal_80') NOT NULL DEFAULT 'a4',
  `barcode_footer_text` varchar(100) DEFAULT NULL,
  `order_id_prefix` varchar(10) NOT NULL DEFAULT 'ORD',
  `order_sequence_next` int UNSIGNED NOT NULL DEFAULT '1',
  `receipt_sequence_next` int UNSIGNED NOT NULL DEFAULT '1',
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `social_facebook` varchar(255) DEFAULT NULL,
  `social_instagram` varchar(255) DEFAULT NULL,
  `social_youtube` varchar(255) DEFAULT NULL,
  `social_x` varchar(255) DEFAULT NULL,
  `social_linkedin` varchar(255) DEFAULT NULL,
  `social_whatsapp` varchar(255) DEFAULT NULL,
  `return_policy` text,
  `site_header_display` enum('title','logo','both') NOT NULL DEFAULT 'both',
  `invoice_display` enum('logo','name','both') NOT NULL DEFAULT 'both',
  `show_gstin_on_invoice` tinyint(1) NOT NULL DEFAULT '1',
  `show_pan_on_invoice` tinyint(1) NOT NULL DEFAULT '1',
  `show_address_on_invoice` tinyint(1) NOT NULL DEFAULT '1',
  `show_location_on_invoice` tinyint(1) NOT NULL DEFAULT '1',
  `invoice_contact_numbers` text COMMENT 'JSON array of phone numbers to print on invoices',
  `social_media_json` text COMMENT 'JSON array of {platform,url} objects',
  `show_fssai_on_invoice` tinyint(1) NOT NULL DEFAULT '1',
  `pos_print_mode` enum('thermal','a4','both') NOT NULL DEFAULT 'both',
  `shortcut_complete_sale` varchar(5) NOT NULL DEFAULT 'F2',
  `shortcut_print` varchar(5) NOT NULL DEFAULT 'F3',
  `shortcut_new_sale` varchar(5) NOT NULL DEFAULT 'F4'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `ecom_business_settings`
--

INSERT INTO `ecom_business_settings` (`id`, `business_name`, `tagline`, `seo_description`, `address`, `location`, `phone`, `contact_numbers`, `email`, `website_url`, `business_hours`, `gstin`, `pan_number`, `fssai_number`, `show_gst_on_invoice`, `state`, `logo`, `logo_display_width`, `invoice_title`, `invoice_footer_note`, `printer_format`, `barcode_footer_text`, `order_id_prefix`, `order_sequence_next`, `receipt_sequence_next`, `updated_at`, `social_facebook`, `social_instagram`, `social_youtube`, `social_x`, `social_linkedin`, `social_whatsapp`, `return_policy`, `site_header_display`, `invoice_display`, `show_gstin_on_invoice`, `show_pan_on_invoice`, `show_address_on_invoice`, `show_location_on_invoice`, `invoice_contact_numbers`, `social_media_json`, `show_fssai_on_invoice`, `pos_print_mode`, `shortcut_complete_sale`, `shortcut_print`, `shortcut_new_sale`) VALUES
(1, 'My Business', '', '', 'nke', '', '6200771784', '[\"6200771784\"]', '', 'https://edumint24.com', '', '', '', '', 1, '', 'uploads/ecommerce/business/logo-6a9faab34601c.png', 190, 'Tax Invoice', '', 'a4', '', 'ORD', 14, 12, '2026-09-08 06:26:59', NULL, NULL, NULL, NULL, NULL, NULL, '', 'both', 'both', 1, 1, 1, 1, '[]', '[]', 1, 'both', 'F2', 'F3', 'F4');

-- --------------------------------------------------------

--
-- Table structure for table `ecom_categories`
--

CREATE TABLE `ecom_categories` (
  `id` int UNSIGNED NOT NULL,
  `name` varchar(150) NOT NULL,
  `slug` varchar(170) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `meta_keywords` varchar(500) DEFAULT NULL,
  `meta_description` text,
  `serial` int NOT NULL DEFAULT '0',
  `status` enum('active','inactive') NOT NULL DEFAULT 'active',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `ecom_categories`
--

INSERT INTO `ecom_categories` (`id`, `name`, `slug`, `image`, `meta_keywords`, `meta_description`, `serial`, `status`, `created_at`, `updated_at`) VALUES
(1, 'category1', 'category1', NULL, NULL, NULL, 0, 'active', '2026-09-04 15:55:05', '2026-09-04 15:55:05'),
(2, 'ct2', 'ct2', NULL, NULL, NULL, 0, 'active', '2026-09-04 15:55:13', '2026-09-04 15:55:13'),
(3, 'snacks', 'snacks', 'uploads/ecommerce/categories/snacks-6a9bd7460b112.png', NULL, NULL, 0, 'active', '2026-09-05 08:48:06', '2026-09-05 08:48:06'),
(4, 'Car', 'car', NULL, NULL, NULL, 0, 'active', '2026-09-05 10:10:20', '2026-09-05 10:10:20');

-- --------------------------------------------------------

--
-- Table structure for table `ecom_coupons`
--

CREATE TABLE `ecom_coupons` (
  `id` int UNSIGNED NOT NULL,
  `title` varchar(150) NOT NULL,
  `code` varchar(60) NOT NULL,
  `number_of_times` int UNSIGNED NOT NULL DEFAULT '1',
  `used_count` int UNSIGNED NOT NULL DEFAULT '0',
  `discount_type` enum('percentage','fixed') NOT NULL DEFAULT 'percentage',
  `discount_value` decimal(12,2) NOT NULL DEFAULT '0.00',
  `applies_to` enum('all','product','category','subcategory') NOT NULL DEFAULT 'all',
  `product_id` int UNSIGNED DEFAULT NULL,
  `category_id` int UNSIGNED DEFAULT NULL,
  `subcategory_id` int UNSIGNED DEFAULT NULL,
  `status` enum('active','inactive') NOT NULL DEFAULT 'active',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `ecom_coupons`
--

INSERT INTO `ecom_coupons` (`id`, `title`, `code`, `number_of_times`, `used_count`, `discount_type`, `discount_value`, `applies_to`, `product_id`, `category_id`, `subcategory_id`, `status`, `created_at`, `updated_at`) VALUES
(1, 'new offer', 'NEW', 1, 1, 'percentage', 10.00, 'all', NULL, NULL, NULL, 'active', '2026-09-05 06:11:29', '2026-09-05 10:13:44');

-- --------------------------------------------------------

--
-- Table structure for table `ecom_credits`
--

CREATE TABLE `ecom_credits` (
  `id` int UNSIGNED NOT NULL,
  `order_id` int UNSIGNED DEFAULT NULL,
  `customer_id` int UNSIGNED DEFAULT NULL,
  `customer_name` varchar(150) NOT NULL,
  `customer_phone` varchar(30) DEFAULT NULL,
  `amount` decimal(12,2) NOT NULL DEFAULT '0.00',
  `amount_paid` decimal(12,2) NOT NULL DEFAULT '0.00',
  `promised_date` date DEFAULT NULL,
  `status` enum('pending','paid') NOT NULL DEFAULT 'pending',
  `notes` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `ecom_credits`
--

INSERT INTO `ecom_credits` (`id`, `order_id`, `customer_id`, `customer_name`, `customer_phone`, `amount`, `amount_paid`, `promised_date`, `status`, `notes`, `created_at`, `updated_at`) VALUES
(1, 5, NULL, 'Walk-in Customer', NULL, 16.80, 4.00, NULL, 'pending', NULL, '2026-09-05 11:09:56', '2026-09-06 04:05:10'),
(2, 6, 2, 'aman', '7061999403', 67.20, 61.20, NULL, 'pending', NULL, '2026-09-05 13:33:00', '2026-09-06 03:40:50'),
(3, 10, 4, 'Badal', '6200771785', 12.00, 12.00, NULL, 'paid', NULL, '2026-09-06 03:08:27', '2026-09-06 03:17:00'),
(4, 11, 4, 'Badal', '6200771785', 118.00, 118.00, NULL, 'paid', NULL, '2026-09-06 12:23:32', '2026-09-06 13:42:17'),
(5, 13, 7, 'Arjun', '7632096003', 484.00, 334.00, NULL, 'pending', NULL, '2026-09-06 13:51:23', '2026-09-06 13:54:31'),
(6, 15, 8, 'Raushan', '6299593256', 124.00, 124.00, NULL, 'paid', NULL, '2026-09-07 05:04:41', '2026-09-07 05:07:01'),
(7, 16, 8, 'Raushan', '6299593256', 136.00, 0.00, NULL, 'pending', NULL, '2026-09-07 05:11:23', '2026-09-07 05:11:23'),
(8, 18, 9, 'Shivam', '9234078046', 348.00, 100.00, NULL, 'pending', NULL, '2026-09-07 07:22:33', '2026-09-07 07:23:37');

-- --------------------------------------------------------

--
-- Table structure for table `ecom_credit_payments`
--

CREATE TABLE `ecom_credit_payments` (
  `id` int UNSIGNED NOT NULL,
  `credit_id` int UNSIGNED NOT NULL,
  `receipt_number` varchar(30) NOT NULL,
  `amount` decimal(12,2) NOT NULL DEFAULT '0.00',
  `payment_method` varchar(30) DEFAULT 'Cash',
  `notes` varchar(255) DEFAULT NULL,
  `created_by` int UNSIGNED DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `ecom_credit_payments`
--

INSERT INTO `ecom_credit_payments` (`id`, `credit_id`, `receipt_number`, `amount`, `payment_method`, `notes`, `created_by`, `created_at`) VALUES
(1, 2, 'RCPT0000001', 6.00, 'Cash', NULL, 2, '2026-09-06 03:40:50'),
(2, 1, 'RCPT0000002', 4.00, 'Cash', NULL, 2, '2026-09-06 04:05:10'),
(3, 4, 'RCPT0000003', 20.00, 'UPI', NULL, 2, '2026-09-06 13:41:04'),
(4, 4, 'RCPT0000004', 98.00, 'Cash', NULL, 2, '2026-09-06 13:42:17'),
(5, 5, 'RCPT0000005', 184.00, 'Cash', NULL, 2, '2026-09-06 13:52:11'),
(6, 5, 'RCPT0000006', 50.00, 'Cash', NULL, 2, '2026-09-06 13:52:28'),
(7, 5, 'RCPT0000007', 50.00, 'Cash', NULL, 2, '2026-09-06 13:52:29'),
(8, 5, 'RCPT0000008', 50.00, 'Cash', NULL, 2, '2026-09-06 13:54:31'),
(9, 6, 'RCPT0000009', 50.00, 'Cash', NULL, 2, '2026-09-07 05:05:40'),
(10, 6, 'RCPT0000010', 74.00, 'Cash', NULL, 2, '2026-09-07 05:07:01'),
(11, 8, 'RCPT0000011', 100.00, 'Cash', NULL, 2, '2026-09-07 07:23:37');

-- --------------------------------------------------------

--
-- Table structure for table `ecom_customers`
--

CREATE TABLE `ecom_customers` (
  `id` int UNSIGNED NOT NULL,
  `name` varchar(150) NOT NULL,
  `email` varchar(190) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `phone` varchar(30) DEFAULT NULL,
  `customer_type` enum('online','offline') NOT NULL DEFAULT 'online',
  `address` text,
  `status` enum('active','inactive') NOT NULL DEFAULT 'active',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `ecom_customers`
--

INSERT INTO `ecom_customers` (`id`, `name`, `email`, `password`, `phone`, `customer_type`, `address`, `status`, `created_at`, `updated_at`) VALUES
(1, 'aj3', 'riyasingh@gmail.com', NULL, '07632896003', 'online', NULL, 'active', '2026-09-04 17:23:54', '2026-09-04 17:23:54'),
(2, 'aman', 'aman@yahoo.com', '$2y$10$L30Ed87wM/9WepreKJRMuOMUWQdhgiyB/trprmTYGfzO7d5yXGkkO', '7061999403', 'online', 'New baZar 001', 'active', '2026-09-05 10:13:00', '2026-09-05 10:13:44'),
(3, 'kdheihdeihe', 'Aj3Arjun@gmail.inn', '$2y$10$itq5XMAMefSGhAq.Z4msRe.Bl/nTn/sBO5IZ75MvTrSG3KW89qmai', '8800220022', 'online', NULL, 'active', '2026-09-05 13:51:55', '2026-09-05 13:51:55'),
(4, 'Badal', NULL, NULL, '6200771785', 'offline', NULL, 'active', '2026-09-06 02:35:47', '2026-09-06 02:35:47'),
(5, 'dev kumar', NULL, NULL, '6200771786', 'offline', NULL, 'active', '2026-09-06 02:47:31', '2026-09-06 02:47:31'),
(6, 'Aayus', 'aayus@gmail.com', '$2y$10$LSc7rfcmFiWdInc5rFlFT.MZp6W/dcv/bBLqXG7i4hbWwSXj6T4Jm', '6200051106', 'online', 'Bettiah, Station Chowk', 'active', '2026-09-06 12:28:04', '2026-09-06 12:28:29'),
(7, 'Arjun Kumar', 'aj3arjunnn@gmail.com', NULL, '7632096003', 'offline', 'Narkatiganj, Pandey tola', 'active', '2026-09-06 13:51:23', '2026-09-06 14:44:35'),
(8, 'Raushan', 'raushan@gmail.com', NULL, '6299593256', 'offline', 'SHikarpur', 'active', '2026-09-07 05:02:18', '2026-09-07 05:03:24'),
(9, 'Shivam', NULL, NULL, '9234078046', 'offline', NULL, 'active', '2026-09-07 07:22:33', '2026-09-07 07:22:33');

-- --------------------------------------------------------

--
-- Table structure for table `ecom_gst_rates`
--

CREATE TABLE `ecom_gst_rates` (
  `id` int UNSIGNED NOT NULL,
  `label` varchar(100) NOT NULL,
  `rate` decimal(5,2) NOT NULL DEFAULT '0.00',
  `is_default` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `ecom_gst_rates`
--

INSERT INTO `ecom_gst_rates` (`id`, `label`, `rate`, `is_default`, `created_at`) VALUES
(1, 'GST Exempt / Nil-rated', 0.00, 0, '2026-09-05 05:53:36'),
(2, 'GST 5%', 5.00, 0, '2026-09-05 05:53:36'),
(3, 'GST 12%', 12.00, 1, '2026-09-05 05:53:36'),
(4, 'GST 18%', 18.00, 0, '2026-09-05 05:53:36'),
(5, 'GST 28%', 28.00, 0, '2026-09-05 05:53:36');

-- --------------------------------------------------------

--
-- Table structure for table `ecom_home_category_strip`
--

CREATE TABLE `ecom_home_category_strip` (
  `id` int NOT NULL,
  `category_id` int UNSIGNED NOT NULL,
  `sort_order` int DEFAULT '0',
  `status` enum('active','inactive') DEFAULT 'active'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ecom_home_icon_strip`
--

CREATE TABLE `ecom_home_icon_strip` (
  `id` int NOT NULL,
  `emoji` varchar(10) DEFAULT '',
  `image` varchar(255) DEFAULT NULL,
  `label` varchar(60) NOT NULL,
  `link` varchar(255) DEFAULT '#',
  `color_class` varchar(10) DEFAULT 'c1',
  `sort_order` int DEFAULT '0',
  `status` enum('active','inactive') DEFAULT 'active',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ecom_home_sections`
--

CREATE TABLE `ecom_home_sections` (
  `id` int NOT NULL,
  `section_type` enum('category_row','product_grid','festive_banner','manual_products') NOT NULL,
  `title` varchar(150) DEFAULT '',
  `category_id` int UNSIGNED DEFAULT NULL,
  `source_type` enum('manual','category','latest') NOT NULL DEFAULT 'latest',
  `card_design` enum('design1','design2','design3','design4') NOT NULL DEFAULT 'design1',
  `product_limit` int DEFAULT '10',
  `banner_text` varchar(150) DEFAULT '',
  `banner_image` varchar(255) DEFAULT NULL,
  `dismissible` tinyint(1) NOT NULL DEFAULT '0',
  `sort_order` int DEFAULT '0',
  `status` enum('active','inactive') DEFAULT 'active',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ecom_home_section_items`
--

CREATE TABLE `ecom_home_section_items` (
  `id` int NOT NULL,
  `section_id` int NOT NULL,
  `category_id` int UNSIGNED DEFAULT NULL,
  `product_id` int UNSIGNED DEFAULT NULL,
  `custom_label` varchar(100) DEFAULT '',
  `custom_image` varchar(255) DEFAULT NULL,
  `sort_order` int DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ecom_home_settings`
--

CREATE TABLE `ecom_home_settings` (
  `setting_key` varchar(60) NOT NULL,
  `setting_value` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `ecom_home_settings`
--

INSERT INTO `ecom_home_settings` (`setting_key`, `setting_value`) VALUES
('category_strip_count', '10'),
('category_strip_mode', 'all');

-- --------------------------------------------------------

--
-- Table structure for table `ecom_home_slides`
--

CREATE TABLE `ecom_home_slides` (
  `id` int NOT NULL,
  `image` varchar(255) NOT NULL,
  `button_link` varchar(255) DEFAULT '#',
  `sort_order` int DEFAULT '0',
  `status` enum('active','inactive') DEFAULT 'active',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `ecom_home_slides`
--

INSERT INTO `ecom_home_slides` (`id`, `image`, `button_link`, `sort_order`, `status`, `created_at`) VALUES
(2, 'uploads/ecommerce/homepage/slide-6a9faa159cec2.png', '#', 2, 'active', '2026-09-08 05:58:02'),
(3, 'uploads/ecommerce/homepage/slide-6a9fa3f7d3e79.avif', '#', 3, 'active', '2026-09-08 05:58:15'),
(4, 'uploads/ecommerce/homepage/slide-6a9fa3fe7c196.webp', '#', 4, 'active', '2026-09-08 05:58:22'),
(5, 'uploads/ecommerce/homepage/slide-6a9fa48b11e21.webp', '#', 5, 'active', '2026-09-08 06:00:43'),
(6, 'uploads/ecommerce/homepage/slide-6a9fa9eb36838.png', '#', 6, 'active', '2026-09-08 06:23:39');

-- --------------------------------------------------------

--
-- Table structure for table `ecom_orders`
--

CREATE TABLE `ecom_orders` (
  `id` int UNSIGNED NOT NULL,
  `order_number` varchar(50) NOT NULL,
  `customer_id` int UNSIGNED DEFAULT NULL,
  `customer_name` varchar(150) DEFAULT NULL,
  `is_guest` tinyint(1) NOT NULL DEFAULT '0',
  `customer_email` varchar(190) DEFAULT NULL,
  `shipping_address` text,
  `total_amount` decimal(12,2) NOT NULL DEFAULT '0.00',
  `paid_amount` decimal(12,2) DEFAULT NULL,
  `subtotal_amount` decimal(12,2) NOT NULL DEFAULT '0.00',
  `discount_amount` decimal(12,2) NOT NULL DEFAULT '0.00',
  `gst_amount` decimal(12,2) NOT NULL DEFAULT '0.00',
  `payment_status` enum('Unpaid','Paid') NOT NULL DEFAULT 'Unpaid',
  `payment_method` varchar(30) DEFAULT NULL,
  `order_type` enum('online','offline') NOT NULL DEFAULT 'online',
  `order_status` enum('Pending','In Progress','Delivered','Canceled') NOT NULL DEFAULT 'Pending',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `ecom_orders`
--

INSERT INTO `ecom_orders` (`id`, `order_number`, `customer_id`, `customer_name`, `is_guest`, `customer_email`, `shipping_address`, `total_amount`, `paid_amount`, `subtotal_amount`, `discount_amount`, `gst_amount`, `payment_status`, `payment_method`, `order_type`, `order_status`, `created_at`, `updated_at`) VALUES
(1, 'POS-20260905-F1E51C', NULL, 'Walk-in Customer', 0, NULL, NULL, 100.00, 100.00, 0.00, 0.00, 0.00, 'Paid', NULL, 'offline', 'Delivered', '2026-09-05 01:05:51', '2026-09-05 05:53:36'),
(2, 'POS-20260905-72D131', NULL, 'Walk-in Customer', 0, NULL, NULL, 2240.00, 2240.00, 2000.00, 0.00, 240.00, 'Paid', NULL, 'offline', 'Delivered', '2026-09-05 06:05:27', '2026-09-05 06:05:27'),
(3, 'POS-20260905-F9A797', NULL, 'Walk-in Customer', 0, NULL, NULL, 112.00, 112.00, 100.00, 0.00, 12.00, 'Paid', NULL, 'offline', 'Delivered', '2026-09-05 08:38:39', '2026-09-05 08:38:39'),
(4, 'ORD-20260905-824146', 2, 'aman', 0, 'aman@yahoo.com', NULL, 252.00, NULL, 250.00, 25.00, 27.00, 'Paid', NULL, 'online', 'Delivered', '2026-09-05 10:13:44', '2026-09-05 10:15:22'),
(5, 'POS-20260905-4C8350', NULL, 'Walk-in Customer', 0, NULL, NULL, 168.00, 151.20, 150.00, 0.00, 18.00, 'Unpaid', NULL, 'offline', 'Delivered', '2026-09-05 11:09:56', '2026-09-05 11:09:56'),
(6, 'POS-20260905-C62D20', 2, 'aman', 0, NULL, NULL, 672.00, 604.80, 600.00, 0.00, 72.00, 'Unpaid', NULL, 'offline', 'Delivered', '2026-09-05 13:33:00', '2026-09-05 13:33:00'),
(7, 'ORD0000001', 4, 'Badal', 0, NULL, NULL, 224.00, 224.00, 200.00, 0.00, 24.00, 'Paid', 'Cash', 'offline', 'Delivered', '2026-09-06 02:35:47', '2026-09-06 02:35:47'),
(8, 'ORD0000002', 4, 'Badal', 0, NULL, NULL, 560.00, 560.00, 500.00, 0.00, 60.00, 'Paid', 'Cash', 'offline', 'Delivered', '2026-09-06 02:43:39', '2026-09-06 02:43:39'),
(9, 'ORD0000003', 5, 'dev kumar', 0, NULL, NULL, 224.00, 224.00, 200.00, 0.00, 24.00, 'Paid', 'Cash', 'offline', 'Delivered', '2026-09-06 02:47:31', '2026-09-06 02:47:31'),
(10, 'ORD0000004', 4, 'Badal', 0, NULL, NULL, 112.00, 100.00, 100.00, 0.00, 12.00, 'Unpaid', 'Cash', 'offline', 'Delivered', '2026-09-06 03:08:27', '2026-09-06 03:08:27'),
(11, 'ORD0000005', 4, 'Badal', 0, NULL, NULL, 168.00, 50.00, 150.00, 0.00, 18.00, 'Unpaid', 'Cash', 'offline', 'Delivered', '2026-09-06 12:23:32', '2026-09-06 12:23:32'),
(12, 'ORD0000006', 6, 'Aayus', 0, 'aayus@gmail.com', 'Bettiah, Station Chowk', 784.00, NULL, 700.00, 0.00, 84.00, 'Unpaid', 'cod', 'online', 'Pending', '2026-09-06 12:28:29', '2026-09-06 12:41:45'),
(13, 'ORD0000007', 7, 'Arjun', 0, NULL, NULL, 784.00, 300.00, 700.00, 0.00, 84.00, 'Unpaid', 'Cash', 'offline', 'Delivered', '2026-09-06 13:51:23', '2026-09-06 13:51:23'),
(14, 'ORD0000008', 8, 'Raushan', 0, NULL, NULL, 448.00, 448.00, 400.00, 0.00, 48.00, 'Paid', 'Cash', 'offline', 'Delivered', '2026-09-07 05:02:18', '2026-09-07 05:02:18'),
(15, 'ORD0000009', 8, 'Raushan', 0, NULL, NULL, 224.00, 100.00, 200.00, 0.00, 24.00, 'Unpaid', 'Cash', 'offline', 'Delivered', '2026-09-07 05:04:41', '2026-09-07 05:04:41'),
(16, 'ORD0000010', 8, 'Raushan', 0, NULL, NULL, 336.00, 200.00, 300.00, 0.00, 36.00, 'Unpaid', 'Cash', 'offline', 'Delivered', '2026-09-07 05:11:23', '2026-09-07 05:11:23'),
(17, 'ORD0000011', 6, 'Aayus', 0, NULL, NULL, 392.00, 392.00, 350.00, 0.00, 42.00, 'Paid', 'Cash', 'offline', 'Delivered', '2026-09-07 07:12:58', '2026-09-07 07:12:58'),
(18, 'ORD0000012', 9, 'Shivam', 0, NULL, NULL, 448.00, 100.00, 400.00, 0.00, 48.00, 'Unpaid', 'UPI', 'offline', 'Delivered', '2026-09-07 07:22:33', '2026-09-07 07:22:33'),
(19, 'ORD0000013', NULL, 'Guest', 1, NULL, NULL, 280.00, 280.00, 250.00, 0.00, 30.00, 'Paid', 'Split', 'offline', 'Delivered', '2026-09-07 16:38:14', '2026-09-07 16:38:14');

-- --------------------------------------------------------

--
-- Table structure for table `ecom_order_items`
--

CREATE TABLE `ecom_order_items` (
  `id` int UNSIGNED NOT NULL,
  `order_id` int UNSIGNED NOT NULL,
  `product_id` int UNSIGNED DEFAULT NULL,
  `product_name` varchar(255) NOT NULL,
  `hsn_code` varchar(20) DEFAULT NULL,
  `qty` int UNSIGNED NOT NULL DEFAULT '1',
  `price` decimal(12,2) NOT NULL DEFAULT '0.00',
  `gst_rate` decimal(5,2) NOT NULL DEFAULT '0.00',
  `gst_amount` decimal(12,2) NOT NULL DEFAULT '0.00'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `ecom_order_items`
--

INSERT INTO `ecom_order_items` (`id`, `order_id`, `product_id`, `product_name`, `hsn_code`, `qty`, `price`, `gst_rate`, `gst_amount`) VALUES
(1, 1, 1, 'cms', NULL, 1, 100.00, 0.00, 0.00),
(2, 2, 1, 'cms', NULL, 20, 100.00, 12.00, 240.00),
(3, 3, 1, 'cms', NULL, 1, 100.00, 12.00, 12.00),
(4, 4, 2, 'new Toy car', '', 5, 50.00, 12.00, 27.00),
(5, 5, 1, 'cms', NULL, 1, 100.00, 12.00, 12.00),
(6, 5, 2, 'new Toy car', '', 1, 50.00, 12.00, 6.00),
(7, 6, 1, 'cms', NULL, 2, 100.00, 12.00, 24.00),
(8, 6, 2, 'new Toy car', '', 8, 50.00, 12.00, 48.00),
(9, 7, 1, 'cms', NULL, 2, 100.00, 12.00, 24.00),
(10, 8, 4, 'kurta', '', 1, 500.00, 12.00, 60.00),
(11, 9, 1, 'cms', NULL, 2, 100.00, 12.00, 24.00),
(12, 10, 1, 'cms', NULL, 1, 100.00, 12.00, 12.00),
(13, 11, 2, 'new Toy car', '', 3, 50.00, 12.00, 18.00),
(14, 12, 1, 'cms', NULL, 7, 100.00, 12.00, 84.00),
(16, 13, 1, 'cms', NULL, 7, 100.00, 12.00, 84.00),
(17, 14, 1, 'cms', NULL, 4, 100.00, 12.00, 48.00),
(18, 15, 2, 'new Toy car', '', 2, 50.00, 12.00, 12.00),
(19, 15, 1, 'cms', NULL, 1, 100.00, 12.00, 12.00),
(20, 16, 1, 'cms', NULL, 1, 100.00, 12.00, 12.00),
(21, 16, 2, 'new Toy car', '', 4, 50.00, 12.00, 24.00),
(22, 17, 5, 'Wheel Shurf 1KG', '', 5, 70.00, 12.00, 42.00),
(23, 18, 2, 'new Toy car', '', 4, 100.00, 12.00, 48.00),
(24, 19, 2, 'new Toy car', '', 5, 50.00, 12.00, 30.00);

-- --------------------------------------------------------

--
-- Table structure for table `ecom_order_payments`
--

CREATE TABLE `ecom_order_payments` (
  `id` int NOT NULL,
  `order_id` int UNSIGNED NOT NULL,
  `payment_method` varchar(20) NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `ecom_order_payments`
--

INSERT INTO `ecom_order_payments` (`id`, `order_id`, `payment_method`, `amount`, `created_at`) VALUES
(1, 19, 'Cash', 180.00, '2026-09-07 16:38:14'),
(2, 19, 'UPI', 100.00, '2026-09-07 16:38:14');

-- --------------------------------------------------------

--
-- Table structure for table `ecom_payment_settings`
--

CREATE TABLE `ecom_payment_settings` (
  `id` int UNSIGNED NOT NULL,
  `method_key` varchar(30) NOT NULL,
  `name` varchar(150) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `text` text,
  `config` text COMMENT 'JSON blob of gateway-specific fields (keys, merchant id, mode, etc.)',
  `is_enabled` tinyint(1) NOT NULL DEFAULT '0',
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `ecom_payment_settings`
--

INSERT INTO `ecom_payment_settings` (`id`, `method_key`, `name`, `image`, `text`, `config`, `is_enabled`, `updated_at`) VALUES
(1, 'cod', 'Cash On Delivery', NULL, 'Cash on Delivery basically means you will pay the amount of product while you get the item delivered to you.', NULL, 1, '2026-09-04 23:04:13'),
(2, 'paytm', 'Paytm', NULL, 'Paytm is the faster & safer way to send money. Make an online payment via Paytm.', NULL, 0, '2026-09-04 23:04:13'),
(3, 'phonepe', 'PhonePe', NULL, 'PhonePe is the faster & safer way to send money. Make an online payment via PhonePe.', NULL, 0, '2026-09-04 23:04:13'),
(4, 'razorpay', 'Razorpay', NULL, 'Razorpay is the faster & safer way to send money. Make an online payment via Razorpay.', NULL, 0, '2026-09-04 23:04:13'),
(5, 'bank_transfer', 'Bank Transfer', NULL, 'Account Number: 000000000\nAccount Name: Your Business Name\nBank Name: Your Bank\nIFSC Code: XXXX0000000', NULL, 0, '2026-09-04 23:04:13');

-- --------------------------------------------------------

--
-- Table structure for table `ecom_products`
--

CREATE TABLE `ecom_products` (
  `id` int UNSIGNED NOT NULL,
  `category_id` int UNSIGNED DEFAULT NULL,
  `subcategory_id` int UNSIGNED DEFAULT NULL,
  `brand_id` int UNSIGNED DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `slug` varchar(280) NOT NULL,
  `sku` varchar(100) DEFAULT NULL,
  `hsn_code` varchar(20) DEFAULT NULL,
  `barcode` varchar(50) DEFAULT NULL,
  `product_type` enum('physical','digital','license','affiliate') NOT NULL DEFAULT 'physical',
  `price` decimal(12,2) NOT NULL DEFAULT '0.00',
  `sale_price` decimal(12,2) DEFAULT NULL,
  `gst_rate` decimal(5,2) NOT NULL DEFAULT '12.00',
  `stock_qty` int DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `description` text,
  `badge_tag` varchar(50) NOT NULL DEFAULT 'none',
  `item_type` varchar(50) NOT NULL DEFAULT 'normal',
  `status` enum('active','inactive') NOT NULL DEFAULT 'active',
  `is_campaign` tinyint(1) NOT NULL DEFAULT '0',
  `campaign_price` decimal(12,2) DEFAULT NULL,
  `show_on_home` tinyint(1) NOT NULL DEFAULT '0',
  `download_link` varchar(500) DEFAULT NULL,
  `license_key` text,
  `affiliate_url` varchar(500) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `ecom_products`
--

INSERT INTO `ecom_products` (`id`, `category_id`, `subcategory_id`, `brand_id`, `name`, `slug`, `sku`, `hsn_code`, `barcode`, `product_type`, `price`, `sale_price`, `gst_rate`, `stock_qty`, `image`, `description`, `badge_tag`, `item_type`, `status`, `is_campaign`, `campaign_price`, `show_on_home`, `download_link`, `license_key`, `affiliate_url`, `created_at`, `updated_at`) VALUES
(1, 1, 2, 1, 'cms', 'cms', '', NULL, 'EM00000001', 'physical', 500.00, 100.00, 12.00, 0, 'uploads/ecommerce/products/cms-6a9afd64613ed.jpeg', '', 'none', 'normal', 'active', 1, 30.00, 0, NULL, NULL, NULL, '2026-09-04 17:18:28', '2026-09-07 05:11:23'),
(2, 4, 4, NULL, 'new Toy car', 'new-toy-car', '', '', 'EM00000002', 'physical', 100.00, 50.00, 12.00, 32, 'uploads/ecommerce/products/new-toy-car-6a9bead9ae09d.avif', '', 'none', 'normal', 'active', 0, NULL, 0, NULL, NULL, NULL, '2026-09-05 10:11:37', '2026-09-07 16:38:14'),
(3, 4, 4, 3, 'MI note 4', 'mi-note-4', 'Redmi', '', 'EM00000003', 'physical', 500.00, 100.00, 12.00, 20, NULL, '', 'none', 'normal', 'active', 0, NULL, 0, NULL, NULL, NULL, '2026-09-06 01:14:15', '2026-09-06 01:14:15'),
(4, 1, NULL, NULL, 'kurta', 'kurta', '', '', 'EM00000004', 'physical', 1000.00, 500.00, 12.00, 0, NULL, '', 'none', 'normal', 'active', 0, NULL, 0, NULL, NULL, NULL, '2026-09-06 02:42:41', '2026-09-06 02:43:39'),
(5, 4, 4, 4, 'Wheel Shurf 1KG', 'wheel-shurf-1kg', '', '', 'EM00000005', 'physical', 100.00, 70.00, 12.00, 495, NULL, '', 'none', 'normal', 'active', 0, NULL, 0, NULL, NULL, NULL, '2026-09-07 06:58:03', '2026-09-07 07:12:58');

-- --------------------------------------------------------

--
-- Table structure for table `ecom_product_images`
--

CREATE TABLE `ecom_product_images` (
  `id` int UNSIGNED NOT NULL,
  `product_id` int UNSIGNED NOT NULL,
  `image` varchar(255) NOT NULL,
  `sort_order` int NOT NULL DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ecom_product_reviews`
--

CREATE TABLE `ecom_product_reviews` (
  `id` int UNSIGNED NOT NULL,
  `product_id` int UNSIGNED NOT NULL,
  `customer_name` varchar(150) NOT NULL,
  `rating` tinyint UNSIGNED NOT NULL DEFAULT '5',
  `review_text` text,
  `status` enum('pending','approved','rejected') NOT NULL DEFAULT 'pending',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ecom_product_tags`
--

CREATE TABLE `ecom_product_tags` (
  `id` int UNSIGNED NOT NULL,
  `tag_group` enum('badge','item_type') NOT NULL,
  `label` varchar(50) NOT NULL,
  `slug` varchar(50) NOT NULL,
  `color` varchar(20) DEFAULT NULL COMMENT 'hex color for badge display, e.g. #ef4444',
  `sort_order` int NOT NULL DEFAULT '0',
  `status` enum('active','inactive') NOT NULL DEFAULT 'active',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `ecom_product_tags`
--

INSERT INTO `ecom_product_tags` (`id`, `tag_group`, `label`, `slug`, `color`, `sort_order`, `status`, `created_at`) VALUES
(1, 'badge', 'None', 'none', NULL, 0, 'active', '2026-09-06 01:10:50'),
(2, 'badge', 'New', 'new', '#3b82f6', 1, 'active', '2026-09-06 01:10:50'),
(3, 'badge', 'Best', 'best', '#10b981', 2, 'active', '2026-09-06 01:10:50'),
(4, 'badge', 'Hot', 'hot', '#ef4444', 3, 'active', '2026-09-06 01:10:50'),
(5, 'badge', 'Featured', 'featured', '#f59e0b', 4, 'active', '2026-09-06 01:10:50'),
(6, 'item_type', 'Normal', 'normal', NULL, 0, 'active', '2026-09-06 01:10:50'),
(7, 'item_type', 'Variant', 'variant', NULL, 1, 'active', '2026-09-06 01:10:50');

-- --------------------------------------------------------

--
-- Table structure for table `ecom_subcategories`
--

CREATE TABLE `ecom_subcategories` (
  `id` int UNSIGNED NOT NULL,
  `category_id` int UNSIGNED NOT NULL,
  `name` varchar(150) NOT NULL,
  `slug` varchar(170) NOT NULL,
  `status` enum('active','inactive') NOT NULL DEFAULT 'active',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `ecom_subcategories`
--

INSERT INTO `ecom_subcategories` (`id`, `category_id`, `name`, `slug`, `status`, `created_at`, `updated_at`) VALUES
(1, 2, 'ne-wct2', 'ne-wct2', 'active', '2026-09-04 16:36:31', '2026-09-04 16:36:31'),
(2, 1, 'ct-1', 'ct-1', 'active', '2026-09-04 16:36:41', '2026-09-04 16:36:41'),
(3, 3, 'Bikaji', 'bikaji', 'active', '2026-09-05 08:49:34', '2026-09-05 08:49:34'),
(4, 4, 'toy', 'toy', 'active', '2026-09-05 10:10:35', '2026-09-05 10:10:35');

-- --------------------------------------------------------

--
-- Table structure for table `ecom_wishlist`
--

CREATE TABLE `ecom_wishlist` (
  `id` int UNSIGNED NOT NULL,
  `customer_id` int UNSIGNED NOT NULL,
  `product_id` int UNSIGNED NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `media`
--

CREATE TABLE `media` (
  `id` int NOT NULL,
  `file_path` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `file_type` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `responsive_set` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  `alt_text` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT '',
  `caption` text COLLATE utf8mb4_unicode_ci,
  `description` text COLLATE utf8mb4_unicode_ci,
  `uploaded_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `post_id` int DEFAULT NULL
) ;

--
-- Dumping data for table `media`
--

INSERT INTO `media` (`id`, `file_path`, `file_type`, `responsive_set`, `alt_text`, `title`, `caption`, `description`, `uploaded_at`, `post_id`) VALUES
(3, 'uploads/on-the-rise-of-electric-cars-in-india-and-the-brand-that-sells-highest-6a056e7622a46.webp', 'banner', '{\"sm\":\"uploads\\/on-the-rise-of-electric-cars-in-india-and-the-brand-that-sells-highest-6a056e76227c6.webp\",\"md\":\"uploads\\/on-the-rise-of-electric-cars-in-india-and-the-brand-that-sells-highest-6a056e76228da.webp\",\"lg\":\"uploads\\/on-the-rise-of-electric-cars-in-india-and-the-brand-that-sells-highest-6a056e7622994.webp\",\"xl\":\"uploads\\/on-the-rise-of-electric-cars-in-india-and-the-brand-that-sells-highest-6a056e7622a46.webp\"}', 'Do on the rise of electric cars in india along with the brand that sells highest banner', '', NULL, NULL, '2026-05-14 06:40:54', NULL),
(4, 'files/techassist.pdf', 'pdf', NULL, '', '', NULL, NULL, '2026-05-14 14:38:41', NULL),
(6, 'uploads/screenshot-2026-09-03-at-21200-pm_6a9932e3571dc.png', 'image', NULL, '', '', NULL, NULL, '2026-09-03 08:42:11', NULL),
(7, 'uploads/logo_6a9e1ac19663f.webp', 'image', NULL, '', '', NULL, NULL, '2026-09-07 02:00:33', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `nws_campaigns`
--

CREATE TABLE `nws_campaigns` (
  `id` int NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` enum('newsletter','promotion') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'promotion',
  `status` enum('pending','sending','completed','failed') COLLATE utf8mb4_unicode_ci DEFAULT 'pending',
  `total_subscribers` int DEFAULT '0',
  `sent_count` int DEFAULT '0',
  `failed_count` int DEFAULT '0',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `started_at` datetime DEFAULT NULL,
  `completed_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `nws_queue`
--

CREATE TABLE `nws_queue` (
  `id` int NOT NULL,
  `campaign_id` int NOT NULL,
  `subscriber_id` int NOT NULL,
  `attempts` tinyint DEFAULT '0',
  `last_attempt` datetime DEFAULT NULL,
  `last_error` text COLLATE utf8mb4_unicode_ci,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `nws_subscriptions`
--

CREATE TABLE `nws_subscriptions` (
  `id` int NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `is_subscribed` tinyint(1) DEFAULT '1',
  `subscribed_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `posts`
--

CREATE TABLE `posts` (
  `id` int NOT NULL,
  `title` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
  `content` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `faq_json` longtext COLLATE utf8mb4_unicode_ci,
  `last_date` date DEFAULT NULL,
  `date` datetime DEFAULT CURRENT_TIMESTAMP,
  `author_id` int NOT NULL,
  `category_id` int NOT NULL,
  `state_id` int DEFAULT NULL,
  `slug` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` enum('draft','published','archived') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'draft',
  `featured_image_id` int DEFAULT NULL,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `posts`
--

INSERT INTO `posts` (`id`, `title`, `content`, `faq_json`, `last_date`, `date`, `author_id`, `category_id`, `state_id`, `slug`, `status`, `featured_image_id`, `updated_at`) VALUES
(1, 'Do on the rise of electric cars in india along with the brand that sells highest', '<p><span style=\"background-color: transparent; color: rgb(20, 20, 19);\">I remember sitting in a stuck-in-place traffic jam on Boring Road in Patna a few years ago. The heat was unbearable, the honking was deafening, and the thick, black exhaust from the bus in front of me was literally making my eyes sting. In that moment, I looked at a tiny, quiet car passing by - a Tata Tigor EV. There was no vibration, no roar, just a faint \"whir\" as it zipped through a gap.</span></p><p><span style=\"background-color: transparent; color: rgb(20, 20, 19);\">That was my \"lightbulb\" moment. I realized that the rise of electric cars in India isn\'t just about \"saving the planet\" in some abstract way; it\'s about making our chaotic daily commutes slightly more sane.</span></p><p><span style=\"background-color: transparent; color: rgb(20, 20, 19);\">Since then, the Indian EV market hasn\'t just grown; it has exploded. We aren\'t just talking about golf carts anymore. We\'re talking about a legitimate shift in how we move.</span></p><h2><strong style=\"background-color: transparent; color: rgb(20, 20, 19);\">Tata Motors: The Brand That Changed Everything</strong></h2><p><span style=\"background-color: transparent; color: rgb(20, 20, 19);\">Let\'s be real for a second. If you walk out on any street in Delhi, Mumbai, or even smaller cities like Ranchi, and you see an electric car, nine times out of ten, it\'s a Tata.</span></p><p><span style=\"background-color: transparent; color: rgb(20, 20, 19);\">In FY2026, Tata Motors sold a whopping 78,811 units. That is a 36% jump from the year before. But why? Is it just because they were first?</span></p><p><span style=\"background-color: transparent; color: rgb(20, 20, 19);\">My take on it: I think Tata cracked the \"Indian Mindset\" code. We are a people who want luxury at a discount. When I sat in the Nexon EV for a test drive, it didn\'t feel like an \"experimental\" science project. It felt like a solid, tank-like Indian car that just happened to run on batteries.</span></p><p><span style=\"background-color: transparent; color: rgb(20, 20, 19);\">They didn\'t try to build a \"Tesla for India\" (which would be too expensive). Instead, they took the cars we already loved—the Nexon, the Tiago, and the Punch—and gave them an electric heart.</span></p><div data-text=\"undefined\" data-url=\"undefined\" data-bg=\"undefined\" data-color=\"undefined\" data-radius=\"undefined\" data-padding=\"undefined\" data-align=\"undefined\" style=\"display: flex; margin: 10px 0px; width: 100%; justify-content: flex-start;\"><a href=\"undefined\" target=\"_blank\" style=\"text-decoration: none; display: inline-block; cursor: pointer; border-width: medium; border-style: none; border-color: currentcolor; border-image: initial;\"></a></div><h2><strong style=\"background-color: transparent; color: rgb(20, 20, 19);\">Why Is This Happening Now?</strong></h2><p><span style=\"background-color: transparent; color: rgb(20, 20, 19);\">The government is basically bribing us to go green, and honestly, I\'m not complaining. Schemes like FAME-II and the new PM E-DRIVE have pumped billions into making EVs cheaper.</span></p><p><span style=\"background-color: transparent; color: rgb(20, 20, 19);\">But one more thing,&nbsp;petrol is expensive! When you realize that running a petrol car costs you ₹7 - 9 per kilometer, and an EV costs you barely ₹1.5 per kilometer, the math starts to look very attractive. For a middle-class family, that\'s the difference between a local holiday and a trip to Thailand.</span></p><p><span style=\"background-color: transparent; color: rgb(20, 20, 19);\">We often talk about the car, but we forget the \"Seed\" of the EV, the Battery. Right now, we are heavily dependent on imports for Lithium-ion cells. But the government\'s PLI scheme is trying to change that. They want to produce 30 GWh of batteries locally by 2030. If we can make our own batteries, the prices of cars will drop another 20%.</span></p><p><span style=\"background-color: transparent; color: rgb(20, 20, 19);\">Imagine a world where an electric \"Alto-equivalent\" costs ₹5 lakh. That\'s when the revolution truly reaches the villages.</span></p><h2><strong style=\"background-color: transparent; color: rgb(20, 20, 19);\">The Competitors Aren\'t Sitting Still</strong></h2><p><span style=\"background-color: transparent; color: rgb(20, 20, 19);\">While Tata owns about 50% of the market, the others are waking up.</span></p><p><span style=\"background-color: transparent; color: rgb(20, 20, 19);\">JSW MG Motor: These guys are sneaky good. The Windsor EV topped sales charts recently. Why? Because they made it feel like a lounge on wheels. It\'s spacious, tech-heavy, and honestly, the glass roof makes you feel like you\'re in a spaceship.</span></p><p><span style=\"background-color: transparent; color: rgb(20, 20, 19);\">Mahindra: They were late to the party, I\'ll admit it. But with their new BE (Born Electric) series, they are coming for the crown. I saw a BE 6 recently - it looks like something out of a Marvel movie. They grew by a staggering 407% last year!</span></p><p><span style=\"background-color: transparent; color: rgb(20, 20, 19);\">The Luxury Players: Hyundai, BYD, and Kia are targeting the people who have money to burn. The Ioniq 5 is probably the coolest looking car on Indian roads right now, but at ₹45 lakh+, it\'s not exactly for the common man.</span></p><h2><strong style=\"background-color: transparent; color: rgb(20, 20, 19);\">The Part Nobody Talks About: Charging in Delhi</strong></h2><p><span style=\"background-color: transparent; color: rgb(20, 20, 19);\">The truth is, buying an EV in India still feels like a bit of a gamble to some. We call it \"Range Anxiety.\"</span></p><p><span style=\"background-color: transparent; color: rgb(20, 20, 19);\">I once took a friend\'s EV for a trip to a nearby town. I kept staring at the battery percentage like it was my phone at 2% at a party. \"Will I make it? Is there a charger?\"</span></p><p><span style=\"background-color: transparent; color: rgb(20, 20, 19);\">But here\'s what I discovered: the infrastructure is catching up faster than we think. By early 2025, charging stations had grown fivefold. Besides this, the \"Battery-as-a-Service\" model introduced by brands like MG Motor is a total game-changer.</span></p><p><span style=\"background-color: transparent; color: rgb(20, 20, 19);\">You won\'t find this in a technical brochure, but EV ownership in India has some \"unique\" challenges.</span></p><p><span style=\"background-color: transparent; color: rgb(20, 20, 19);\">The \"Earthing\" Nightmare: I know a guy who bought an EV and couldn\'t charge it at his house for a week because his home\'s electrical grounding (earthing) was bad. In India, our old houses have messy wiring. If you\'re planning to go electric, get an electrician to check your house before the car arrives!</span></p><p><span style=\"background-color: transparent; color: rgb(20, 20, 19);\">The Monsoon Fear: We\'ve all seen the videos of Mumbai or Patna streets turning into rivers during the rain. The biggest question I get is: \"Will I get electrocuted?\" The answer is no. These batteries are IP67 rated (waterproof). You can literally drive through a puddle that would drown a petrol engine.</span></p><p><span style=\"background-color: transparent; color: rgb(20, 20, 19);\">The Resale Mystery: We Indians love our \"Resale Value.\" With a Maruti Swift, you know what you\'ll get after 5 years. With an EV? We\'re still figuring it out. The battery is 40% of the car\'s cost. If the battery dies in 8 years, is the car a paperweight? This is the one thing that keeps me up at night.</span></p><h2><strong style=\"background-color: transparent; color: rgb(20, 20, 19);\">So Should You Buy One?</strong></h2><p><span style=\"background-color: transparent; color: rgb(20, 20, 19);\">I\'ll be honest with you. If you are a \"one-car family\" and you love taking 1,000 km road trips to remote mountains, maybe wait another two years.</span></p><p><span style=\"background-color: transparent; color: rgb(20, 20, 19);\">But, if you live in a city, drive 40–50 km a day, and want to save a ton of money while enjoying a silent, vibration-free cabin - just do it.</span></p><p><span style=\"background-color: transparent; color: rgb(20, 20, 19);\">The feeling of driving past a petrol pump with a \"Full\" sign and not having to stop is a special kind of freedom. It\'s like when we moved from landlines to mobile phones. There were skeptics then, too. They said, \"Where will you charge it?\" and \"The signal is bad.\" Look at us now.</span></p><p><span style=\"background-color: transparent; color: rgb(20, 20, 19);\">India is going electric. Tata is leading the charge, but the real winner is the Indian consumer who finally has a choice.</span></p><p><span style=\"background-color: transparent; color: rgb(20, 20, 19);\">Wait, one last thing... Next time you see an EV driver, ask them about their electricity bill. They\'ll probably give you a huge, smug smile. That smile is the real \"Future of Mobility.\"</span></p><p><br></p>', '[{\"q\":\"bsbdbd\",\"a\":\"dgegrh\"},{\"q\":\"faqq22\",\"a\":\"faqq22\"}]', NULL, '2026-05-13 06:26:37', 1, 21, NULL, 'on-the-rise-of-electric-cars-in-india-and-the-brand-that-sells-highest', 'published', 3, '2026-08-10 03:10:58');

-- --------------------------------------------------------

--
-- Table structure for table `post_categories`
--

CREATE TABLE `post_categories` (
  `post_id` int NOT NULL,
  `category_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `post_categories`
--

INSERT INTO `post_categories` (`post_id`, `category_id`) VALUES
(1, 2),
(1, 21),
(1, 29);

-- --------------------------------------------------------

--
-- Table structure for table `post_meta`
--

CREATE TABLE `post_meta` (
  `id` int NOT NULL,
  `post_id` int NOT NULL,
  `meta_key` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `meta_value` text COLLATE utf8mb4_unicode_ci
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `post_meta`
--

INSERT INTO `post_meta` (`id`, `post_id`, `meta_key`, `meta_value`) VALUES
(11, 1, 'description', 'hello ');

-- --------------------------------------------------------

--
-- Table structure for table `post_stats_daily`
--

CREATE TABLE `post_stats_daily` (
  `id` bigint UNSIGNED NOT NULL,
  `post_id` int UNSIGNED NOT NULL,
  `stat_date` date NOT NULL,
  `source` varchar(20) NOT NULL DEFAULT 'direct',
  `country` varchar(2) NOT NULL DEFAULT 'XX',
  `views` int UNSIGNED NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `post_stats_daily`
--

INSERT INTO `post_stats_daily` (`id`, `post_id`, `stat_date`, `source`, `country`, `views`) VALUES
(1, 1, '2026-09-03', 'direct', 'IN', 4),
(5, 1, '2026-09-03', 'direct', 'US', 1),
(6, 1, '2026-09-04', 'direct', 'IN', 2),
(8, 1, '2026-09-07', 'direct', 'IN', 1);

-- --------------------------------------------------------

--
-- Table structure for table `post_tag`
--

CREATE TABLE `post_tag` (
  `id` bigint UNSIGNED NOT NULL,
  `post_id` int NOT NULL,
  `tag_id` bigint UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `post_tag`
--

INSERT INTO `post_tag` (`id`, `post_id`, `tag_id`) VALUES
(10, 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `post_views`
--

CREATE TABLE `post_views` (
  `post_id` int NOT NULL,
  `views` int UNSIGNED NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `post_views`
--

INSERT INTO `post_views` (`post_id`, `views`) VALUES
(1, 92);

-- --------------------------------------------------------

--
-- Table structure for table `product_categories`
--

CREATE TABLE `product_categories` (
  `id` int NOT NULL,
  `name` varchar(150) NOT NULL,
  `slug` varchar(170) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `status` enum('active','inactive') NOT NULL DEFAULT 'active',
  `sort_order` int NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `product_categories`
--

INSERT INTO `product_categories` (`id`, `name`, `slug`, `image`, `status`, `sort_order`, `created_at`, `updated_at`) VALUES
(1, 'women', 'women', 'uploads/categories/category_6a9a853a83499.jpeg', 'active', 0, '2026-09-04 08:45:46', '2026-09-04 08:45:46'),
(2, 'mqn', 'man', 'uploads/categories/category_6a9a854c27224.webp', 'active', 0, '2026-09-04 08:46:04', '2026-09-04 08:46:04');

-- --------------------------------------------------------

--
-- Table structure for table `push_campaigns`
--

CREATE TABLE `push_campaigns` (
  `id` int NOT NULL,
  `post_id` int DEFAULT NULL,
  `title` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `body` varchar(300) COLLATE utf8mb4_unicode_ci NOT NULL,
  `image` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `url` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` enum('pending','processing','completed','failed') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `total_subscribers` int UNSIGNED DEFAULT '0',
  `sent` int UNSIGNED DEFAULT '0',
  `failed` int UNSIGNED DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `push_campaigns`
--

INSERT INTO `push_campaigns` (`id`, `post_id`, `title`, `body`, `image`, `url`, `status`, `total_subscribers`, `sent`, `failed`, `created_at`, `updated_at`) VALUES
(4, NULL, 'Do on the rise of electric cars in india along with the brand that sells highest', 'New government job alert! Check it out.', '/uploads/on-the-rise-of-electric-cars-in-india-and-the-brand-that-sells-highest-6a056e7622a46.webp', 'https://edumint24.com/on-the-rise-of-electric-cars-in-india-and-the-brand-that-sells-highest-1', 'completed', 1, 1, 0, '2026-05-16 17:20:53', '2026-05-16 17:23:14'),
(5, NULL, 'Do on the rise of electric cars in india along with the brand that sells highest', 'New government job alert! Check it out.', '/uploads/on-the-rise-of-electric-cars-in-india-and-the-brand-that-sells-highest-6a056e7622a46.webp', 'https://edumint24.com/on-the-rise-of-electric-cars-in-india-and-the-brand-that-sells-highest-1', 'completed', 1, 1, 0, '2026-05-16 17:38:42', '2026-05-16 17:38:58'),
(6, NULL, 'Do on the rise of electric cars in india along with the brand that sells highest', 'New government job alert! Check it out.', '/uploads/on-the-rise-of-electric-cars-in-india-and-the-brand-that-sells-highest-6a056e7622a46.webp', 'https://edumint24.com/on-the-rise-of-electric-cars-in-india-and-the-brand-that-sells-highest-1', 'completed', 1, 1, 0, '2026-05-19 16:56:46', '2026-05-19 16:57:02'),
(7, NULL, 'Do on the rise of electric cars in india along with the brand that sells highest', 'New government job alert! Check it out.', '/uploads/on-the-rise-of-electric-cars-in-india-and-the-brand-that-sells-highest-6a056e7622a46.webp', 'https://edumint24.com/on-the-rise-of-electric-cars-in-india-and-the-brand-that-sells-highest-1', 'completed', 1, 1, 0, '2026-05-21 02:34:56', '2026-05-21 02:35:03'),
(8, NULL, 'Do on the rise of electric cars in india along with the brand that sells highest', 'New government job alert! Check it out.', '/uploads/on-the-rise-of-electric-cars-in-india-and-the-brand-that-sells-highest-6a056e7622a46.webp', 'https://edumint24.com/on-the-rise-of-electric-cars-in-india-and-the-brand-that-sells-highest-1', 'pending', 6, 0, 0, '2026-09-07 00:25:30', '2026-09-07 00:25:30');

-- --------------------------------------------------------

--
-- Table structure for table `push_queue`
--

CREATE TABLE `push_queue` (
  `id` bigint UNSIGNED NOT NULL,
  `campaign_id` int NOT NULL,
  `subscription_id` int NOT NULL,
  `status` enum('pending','sent','failed','expired') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `attempts` tinyint UNSIGNED DEFAULT '0',
  `last_error` text COLLATE utf8mb4_unicode_ci,
  `processed_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `push_queue`
--

INSERT INTO `push_queue` (`id`, `campaign_id`, `subscription_id`, `status`, `attempts`, `last_error`, `processed_at`, `created_at`) VALUES
(13, 8, 6, 'pending', 0, NULL, NULL, '2026-09-07 00:25:30'),
(14, 8, 7, 'pending', 0, NULL, NULL, '2026-09-07 00:25:30'),
(15, 8, 8, 'pending', 0, NULL, NULL, '2026-09-07 00:25:30'),
(16, 8, 9, 'pending', 0, NULL, NULL, '2026-09-07 00:25:30'),
(17, 8, 10, 'pending', 0, NULL, NULL, '2026-09-07 00:25:30'),
(18, 8, 11, 'pending', 0, NULL, NULL, '2026-09-07 00:25:30');

-- --------------------------------------------------------

--
-- Table structure for table `push_subscriptions`
--

CREATE TABLE `push_subscriptions` (
  `id` int NOT NULL,
  `subscription` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `push_subscriptions`
--

INSERT INTO `push_subscriptions` (`id`, `subscription`, `created_at`) VALUES
(6, '{\"endpoint\":\"https:\\/\\/fcm.googleapis.com\\/fcm\\/send\\/cRsZ3Q1XQIk:APA91bHEVqA8X8zfOmg5RaArNfG8u03eWaGIEARssDYq2N0ywf5HXq4wcJivHN_vOeOjmBqn4yubV6E71YJzKSCtiTs8iZoShgPDtp8zclmFEYzHY6JhEu5DTenOXIc0aTp_s2M3B6Lj\",\"expirationTime\":null,\"keys\":{\"p256dh\":\"BB-YJKfEI-mQFSIWBdbA8mmXyYgXjiPPo5-6JdTazBZGrTDX7_sA8clePDu3Sm6Sbz32yQPZR_FknKYC00i94g8\",\"auth\":\"SVpRNvYnIzohODUbxe68QA\"}}', '2026-05-16 17:18:18'),
(7, '{\"endpoint\":\"https:\\/\\/fcm.googleapis.com\\/fcm\\/send\\/ertwmBeQfi4:APA91bEcc8pUJROpHxiLue0AFlM6GbnJf8G2ivXYQso9WP3Jsji3Nj8msdVBYt9LxDPh21LS_Tspq4NWF16reUv6rQoxeuKTOGiWRfsfHgmOd3oCYS1OZHiMbpOpv_XpRfYfjBVXNhTv\",\"expirationTime\":null,\"keys\":{\"p256dh\":\"BCFkfUUR-eQzvsCgMnlohEI3ZjwlQH2tQ49uUogpyEdXdTn6o43oRoIBVeb7SHBRw0eFW-PcoHD3fPifMMZO-6c\",\"auth\":\"y_QYcBXXWdBMlCZ6Qd6cDw\"}}', '2026-08-10 05:39:29'),
(8, '{\"endpoint\":\"https:\\/\\/fcm.googleapis.com\\/fcm\\/send\\/ertwmBeQfi4:APA91bEcc8pUJROpHxiLue0AFlM6GbnJf8G2ivXYQso9WP3Jsji3Nj8msdVBYt9LxDPh21LS_Tspq4NWF16reUv6rQoxeuKTOGiWRfsfHgmOd3oCYS1OZHiMbpOpv_XpRfYfjBVXNhTv\",\"expirationTime\":null,\"keys\":{\"p256dh\":\"BCFkfUUR-eQzvsCgMnlohEI3ZjwlQH2tQ49uUogpyEdXdTn6o43oRoIBVeb7SHBRw0eFW-PcoHD3fPifMMZO-6c\",\"auth\":\"y_QYcBXXWdBMlCZ6Qd6cDw\"}}', '2026-08-10 05:39:33'),
(9, '{\"endpoint\":\"https:\\/\\/fcm.googleapis.com\\/fcm\\/send\\/f2AiD1dlAbg:APA91bGfeEbsGi52Mw_eugd3V3hPBQEfkhUJqxF4kAcxS5xu5ZppmsxNizAlK4BfISNRf3A6mUICuC5GXGSC9iU5kpH5WqV9kr2_sMi76sMfGEONz-G-lYGN7xsck3nIuiqRyIbMUxCx\",\"expirationTime\":null,\"keys\":{\"p256dh\":\"BEUtqnDFpfJhAVpVOP2Z-UlHIynFl6-RuSFv2RH696ic3NUGdWWbtF4Zw42Glc7I0jPD6toDnYIzixjhyOUiwTs\",\"auth\":\"GlFj2rWEwiOc3hr0RYll1A\"}}', '2026-09-03 17:03:03'),
(10, '{\"endpoint\":\"https:\\/\\/updates.push.services.mozilla.com\\/wpush\\/v2\\/gAAAAABqmbFfr3rgp8rW90W00WiAy1gAo-JDXhEYLchPpu0G3wHhcWq-nhFih-F3WzLyi_yOJK_eDbfE4kRtjT6gHCV6FrKDrlJeyTu1jr3S1XUQyR40rNgm2IcrlQIAZj6F4LC5MoHiMrPr74MxGB2Klq290861xkV0nqKUT5ECVZaiV8Ox-IY\",\"expirationTime\":null,\"keys\":{\"auth\":\"mkUbx7wfyjm-8QfcHj9tUg\",\"p256dh\":\"BJ0FYYxQydR55xAqBsAkrKNkef-N6QY-fY9LvvMLE9goqYXYPJQTrtEQOqmuRQLIsivdwpA1AHJ6-xOseRxi_UM\"}}', '2026-09-03 17:41:52'),
(11, '{\"endpoint\":\"https:\\/\\/fcm.googleapis.com\\/fcm\\/send\\/cbW5Lvx8vIg:APA91bGEv9HQY7Hutip42MTj7sVI9lifuDWoRA1kBqvu1aNAMw9R71WGMPf6RmdddNxJTXZQg3yqKrh9qNcAOSztl3rBqoX394wBJxKpNgU5f-XUJ5taseEL3muA81sn2FoBnq-EGNYu\",\"expirationTime\":null,\"keys\":{\"p256dh\":\"BNEBW4N9jMuzr24wU2eVgfGoSU0uZFZO3cbETKqhZbghFlOVkNizYOGqBLdzlEqELBHwBRb54f76wFB2FP49iBU\",\"auth\":\"jJVvDHHvz1Guy3-L6uEg5Q\"}}', '2026-09-04 02:22:16');

-- --------------------------------------------------------

--
-- Table structure for table `shop_categories`
--

CREATE TABLE `shop_categories` (
  `id` int UNSIGNED NOT NULL,
  `name` varchar(120) NOT NULL,
  `slug` varchar(140) NOT NULL,
  `description` text,
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `shop_categories`
--

INSERT INTO `shop_categories` (`id`, `name`, `slug`, `description`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 'category1', 'item', 'e22', 1, '2026-09-04 06:34:35', '2026-09-04 06:34:35');

-- --------------------------------------------------------

--
-- Table structure for table `shop_customers`
--

CREATE TABLE `shop_customers` (
  `id` int UNSIGNED NOT NULL,
  `name` varchar(160) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(40) DEFAULT NULL,
  `address` text,
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `total_spent` decimal(12,2) NOT NULL DEFAULT '0.00',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `shop_orders`
--

CREATE TABLE `shop_orders` (
  `id` int UNSIGNED NOT NULL,
  `order_number` varchar(32) NOT NULL,
  `customer_id` int UNSIGNED NOT NULL,
  `subtotal` decimal(12,2) NOT NULL DEFAULT '0.00',
  `shipping` decimal(12,2) NOT NULL DEFAULT '0.00',
  `total` decimal(12,2) NOT NULL DEFAULT '0.00',
  `payment_status` enum('pending','paid','failed','refunded') NOT NULL DEFAULT 'pending',
  `fulfillment_status` enum('pending','processing','shipped','delivered','cancelled') NOT NULL DEFAULT 'pending',
  `shipping_address` text,
  `notes` text,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `shop_order_items`
--

CREATE TABLE `shop_order_items` (
  `id` int UNSIGNED NOT NULL,
  `order_id` int UNSIGNED NOT NULL,
  `product_id` int UNSIGNED DEFAULT NULL,
  `product_name` varchar(180) NOT NULL,
  `sku` varchar(80) DEFAULT NULL,
  `quantity` int UNSIGNED NOT NULL DEFAULT '1',
  `unit_price` decimal(12,2) NOT NULL DEFAULT '0.00',
  `line_total` decimal(12,2) NOT NULL DEFAULT '0.00'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `shop_products`
--

CREATE TABLE `shop_products` (
  `id` int UNSIGNED NOT NULL,
  `category_id` int UNSIGNED DEFAULT NULL,
  `name` varchar(180) NOT NULL,
  `slug` varchar(200) NOT NULL,
  `sku` varchar(80) NOT NULL,
  `description` text,
  `image_url` varchar(500) DEFAULT NULL,
  `price` decimal(12,2) NOT NULL DEFAULT '0.00',
  `compare_price` decimal(12,2) DEFAULT NULL,
  `inventory` int NOT NULL DEFAULT '0',
  `status` enum('draft','published','archived') NOT NULL DEFAULT 'draft',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `states`
--

CREATE TABLE `states` (
  `id` int NOT NULL,
  `state_name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `views` int DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `states`
--

INSERT INTO `states` (`id`, `state_name`, `slug`, `description`, `views`, `created_at`) VALUES
(1, 'Andhra Pradesh', 'andhra-pradesh', 'All Andhra Pradesh Government Jobs, APPSC and all state entities body of exams. Check latest recruitment notifications.', 14, '2026-05-10 13:45:04'),
(2, 'Arunachal Pradesh', 'arunachal-pradesh', 'All Arunachal Pradesh Government Jobs, APPSC and all state entities body of exams. Check latest recruitment notifications.', 15, '2026-05-10 13:45:04'),
(3, 'Assam', 'assam', 'All Assam Government Jobs, APSC and all state entities body of exams. Check latest recruitment notifications.', 18, '2026-05-10 13:45:04'),
(4, 'Bihar', 'bihar', 'All Bihar Government Jobs, BPSC and all state entities body of exams. Check latest recruitment notifications.', 15, '2026-05-10 13:45:04'),
(5, 'Chhattisgarh', 'chhattisgarh', 'All Chhattisgarh Government Jobs, CGPSC and all state entities body of exams. Check latest recruitment notifications.', 13, '2026-05-10 13:45:04'),
(6, 'Goa', 'goa', 'All Goa Government Jobs, GPSC and all state entities body of exams. Check latest recruitment notifications.', 14, '2026-05-10 13:45:04'),
(7, 'Gujarat', 'gujarat', 'All Gujarat Government Jobs, GPSC and all state entities body of exams. Check latest recruitment notifications.', 13, '2026-05-10 13:45:04'),
(8, 'Haryana', 'haryana', 'All Haryana Government Jobs, HPSC and all state entities body of exams. Check latest recruitment notifications.', 14, '2026-05-10 13:45:04'),
(9, 'Himachal Pradesh', 'himachal-pradesh', 'All Himachal Pradesh Government Jobs, HPPSC and all state entities body of exams. Check latest recruitment notifications.', 13, '2026-05-10 13:45:04'),
(10, 'Jharkhand', 'jharkhand', 'All Jharkhand Government Jobs, JPSC and all state entities body of exams. Check latest recruitment notifications.', 13, '2026-05-10 13:45:04'),
(11, 'Karnataka', 'karnataka', 'All Karnataka Government Jobs, KPSC and all state entities body of exams. Check latest recruitment notifications.', 13, '2026-05-10 13:45:04'),
(12, 'Kerala', 'kerala', 'All Kerala Government Jobs, KPSC and all state entities body of exams. Check latest recruitment notifications.', 14, '2026-05-10 13:45:04'),
(13, 'Madhya Pradesh', 'madhya-pradesh', 'All Madhya Pradesh Government Jobs, MPPSC and all state entities body of exams. Check latest recruitment notifications.', 16, '2026-05-10 13:45:04'),
(14, 'Maharashtra', 'maharashtra', 'All Maharashtra Government Jobs, MPSC and all state entities body of exams. Check latest recruitment notifications.', 15, '2026-05-10 13:45:04'),
(15, 'Manipur', 'manipur', 'All Manipur Government Jobs, MPSC and all state entities body of exams. Check latest recruitment notifications.', 12, '2026-05-10 13:45:04'),
(16, 'Meghalaya', 'meghalaya', 'All Meghalaya Government Jobs, MPSC and all state entities body of exams. Check latest recruitment notifications.', 15, '2026-05-10 13:45:04'),
(17, 'Mizoram', 'mizoram', 'All Mizoram Government Jobs, MPSC and all state entities body of exams. Check latest recruitment notifications.', 14, '2026-05-10 13:45:04'),
(18, 'Nagaland', 'nagaland', 'All Nagaland Government Jobs, NPSC and all state entities body of exams. Check latest recruitment notifications.', 12, '2026-05-10 13:45:04'),
(19, 'Odisha', 'odisha', 'All Odisha Government Jobs, OPSC and all state entities body of exams. Check latest recruitment notifications.', 14, '2026-05-10 13:45:04'),
(20, 'Punjab', 'punjab', 'All Punjab Government Jobs, PPSC and all state entities body of exams. Check latest recruitment notifications.', 15, '2026-05-10 13:45:04'),
(21, 'Rajasthan', 'rajasthan', 'All Rajasthan Government Jobs, RPSC, RSMSSB and all state entities body of exams. Check latest recruitment notifications.', 16, '2026-05-10 13:45:04'),
(22, 'Sikkim', 'sikkim', 'All Sikkim Government Jobs, SPPSC and all state entities body of exams. Check latest recruitment notifications.', 16, '2026-05-10 13:45:04'),
(23, 'Tamil Nadu', 'tamil-nadu', 'All Tamil Nadu Government Jobs, TNPSC and all state entities body of exams. Check latest recruitment notifications.', 14, '2026-05-10 13:45:04'),
(24, 'Telangana', 'telangana', 'All Telangana Government Jobs, TSPSC and all state entities body of exams. Check latest recruitment notifications.', 18, '2026-05-10 13:45:04'),
(25, 'Tripura', 'tripura', 'All Tripura Government Jobs, TPSC and all state entities body of exams. Check latest recruitment notifications.', 15, '2026-05-10 13:45:04'),
(26, 'Uttar Pradesh', 'uttar-pradesh', 'All Uttar Pradesh Government Jobs, UPPSC, UPSSSC and all state entities body of exams. Check latest recruitment notifications.', 14, '2026-05-10 13:45:04'),
(27, 'Uttarakhand', 'uttarakhand', 'All Uttarakhand Government Jobs, UKPSC and all state entities body of exams. Check latest recruitment notifications.', 15, '2026-05-10 13:45:04'),
(28, 'West Bengal', 'west-bengal', 'All West Bengal Government Jobs, WBPSC and all state entities body of exams. Check latest recruitment notifications.', 16, '2026-05-10 13:45:04'),
(29, 'Andaman and Nicobar Islands', 'andaman-nicobar', 'All Andaman and Nicobar Government Jobs and all UT entities body of exams. Check latest recruitment notifications.', 14, '2026-05-10 13:45:04'),
(30, 'Chandigarh', 'chandigarh', 'All Chandigarh Government Jobs and all UT entities body of exams. Check latest recruitment notifications.', 14, '2026-05-10 13:45:04'),
(31, 'Dadra and Nagar Haveli and Daman and Diu', 'dadra-nagar-haveli-daman-diu', 'All Dadra and Nagar Haveli and Daman and Diu Government Jobs and all UT entities body of exams. Check latest recruitment notifications.', 11, '2026-05-10 13:45:04'),
(32, 'Delhi', 'delhi', 'All Delhi Government Jobs, DSSSB and all UT entities body of exams. Check latest recruitment notifications.', 15, '2026-05-10 13:45:04'),
(33, 'Jammu and Kashmir', 'jammu-kashmir', 'All Jammu and Kashmir Government Jobs, JKPSC and all UT entities body of exams. Check latest recruitment notifications.', 16, '2026-05-10 13:45:04'),
(34, 'Ladakh', 'ladakh', 'All Ladakh Government Jobs and all UT entities body of exams. Check latest recruitment notifications.', 15, '2026-05-10 13:45:04'),
(35, 'Lakshadweep', 'lakshadweep', 'All Lakshadweep Government Jobs and all UT entities body of exams. Check latest recruitment notifications.', 14, '2026-05-10 13:45:04'),
(36, 'Puducherry', 'puducherry', 'All Puducherry Government Jobs and all UT entities body of exams. Check latest recruitment notifications.', 15, '2026-05-10 13:45:04');

-- --------------------------------------------------------

--
-- Table structure for table `table_templates`
--

CREATE TABLE `table_templates` (
  `id` int NOT NULL,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `html` text COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tags`
--

CREATE TABLE `tags` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `views` int DEFAULT '0',
  `is_active` tinyint(1) DEFAULT '1',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tags`
--

INSERT INTO `tags` (`id`, `name`, `slug`, `views`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 'helloee', 'hello7', 15, 1, '2026-05-13 06:26:37', '2026-09-06 02:38:47');

-- --------------------------------------------------------

--
-- Table structure for table `tools_tracking`
--

CREATE TABLE `tools_tracking` (
  `id` int UNSIGNED NOT NULL,
  `tool_name` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tool_slug` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `visits` int UNSIGNED NOT NULL DEFAULT '0',
  `last_visited` datetime DEFAULT NULL,
  `star_1` int UNSIGNED NOT NULL DEFAULT '0',
  `star_2` int UNSIGNED NOT NULL DEFAULT '0',
  `star_3` int UNSIGNED NOT NULL DEFAULT '0',
  `star_4` int UNSIGNED NOT NULL DEFAULT '0',
  `star_5` int UNSIGNED NOT NULL DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `username` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password_hash` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` enum('admin','editor','author') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'author',
  `status` enum('active','pending','suspended') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `permissions` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP
) ;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password_hash`, `role`, `status`, `permissions`, `created_at`) VALUES
(2, 'Aj3Arjun', 'admin@edumint24.com', '$2y$10$iTe.SYiI65syX5GnUuBipO1H72TGetBjbYvNgR9Uf1ABfcRMBXYkq', 'admin', 'active', '{\"dashboard_access\":true,\"blogs\":{\"create\":true,\"edit_own\":true,\"edit_all\":true,\"delete_own\":true,\"delete_all\":true,\"publish\":true,\"unpublish\":true,\"schedule\":true,\"feature\":true,\"manage_categories\":true,\"manage_tags\":true,\"manage_comments\":true,\"view_drafts\":true,\"manage_seo\":true},\"media\":{\"upload\":true,\"delete\":true,\"manage_all\":true},\"push_notifications\":{\"send\":true,\"schedule\":true,\"manage_templates\":true},\"ecommerce\":{\"manage_categories\":true,\"manage_products\":true,\"manage_orders\":true,\"manage_customers\":true,\"manage_coupons\":true,\"manage_payment\":true,\"manage_billing\":true,\"manage_credits\":true},\"users\":{\"create\":true,\"edit\":true,\"delete\":true,\"suspend\":true,\"change_roles\":true,\"manage_permissions\":true},\"authors\":{\"create\":true,\"edit\":true,\"delete\":true,\"approve\":true,\"feature\":true},\"analytics\":{\"view_basic\":true,\"view_advanced\":true},\"ads\":{\"manage_ads\":true,\"view_revenue\":true},\"settings\":{\"general\":true,\"seo\":true,\"smtp\":true,\"api_keys\":true,\"maintenance_mode\":true},\"pages\":{\"create\":true,\"edit\":true,\"delete\":true},\"files\":{\"access_file_manager\":true},\"security\":{\"view_logs\":true,\"manage_blacklist\":true,\"manage_recaptcha\":true}}', '2026-05-13 04:38:34'),
(4, 'eeee', 'aj3arjunkumar@gmail.com', '$2y$10$R/FNf48NpA0dUR4BUktpB.z5g35h6tA5O5o3fQGyTFXrOymgK3bfW', 'author', 'pending', '{\"dashboard_access\":true,\"blogs\":{\"create\":true,\"edit_own\":true,\"edit_all\":false,\"delete_own\":true,\"delete_all\":false,\"publish\":false,\"unpublish\":false,\"schedule\":false,\"feature\":false,\"manage_categories\":false,\"manage_tags\":false,\"manage_comments\":false,\"view_drafts\":true,\"manage_seo\":true},\"media\":{\"upload\":true,\"delete\":false,\"manage_all\":false},\"push_notifications\":{\"send\":false,\"schedule\":false,\"manage_templates\":false},\"users\":{\"create\":false,\"edit\":false,\"delete\":false,\"suspend\":false,\"change_roles\":false,\"manage_permissions\":false},\"authors\":{\"create\":false,\"edit\":false,\"delete\":false,\"approve\":false,\"feature\":false},\"analytics\":{\"view_basic\":true,\"view_advanced\":false},\"ads\":{\"manage_ads\":false,\"view_revenue\":false},\"settings\":{\"general\":false,\"seo\":false,\"smtp\":false,\"api_keys\":false,\"maintenance_mode\":false},\"pages\":{\"create\":false,\"edit\":false,\"delete\":false},\"files\":{\"access_file_manager\":true},\"security\":{\"view_logs\":false,\"manage_blacklist\":false,\"manage_recaptcha\":false}}', '2026-09-02 12:52:58');

-- --------------------------------------------------------

--
-- Table structure for table `visitor_log`
--

CREATE TABLE `visitor_log` (
  `id` bigint UNSIGNED NOT NULL,
  `visit_date` date NOT NULL,
  `visitor_id` varchar(64) NOT NULL,
  `post_id` int UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `visitor_log`
--

INSERT INTO `visitor_log` (`id`, `visit_date`, `visitor_id`, `post_id`) VALUES
(3, '2026-09-03', '0d1dadc39e701798e232c15c02389a37', 1),
(5, '2026-09-03', '1aac462686608266ba5f2df50e16811f', 1),
(1, '2026-09-03', '51fd029c93f5f024d08c84cebf7369fc', 1),
(4, '2026-09-03', '996d0daf283eaf9e21c12033dcf3ce41', 1),
(6, '2026-09-04', '0d1dadc39e701798e232c15c02389a37', 1),
(7, '2026-09-04', 'f8fc3d863ab7e273ae32a472d7e90074', 1),
(8, '2026-09-07', 'f8fc3d863ab7e273ae32a472d7e90074', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `activity_logs`
--
ALTER TABLE `activity_logs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ad_blocks`
--
ALTER TABLE `ad_blocks`
  ADD PRIMARY KEY (`block_number`);

--
-- Indexes for table `ad_units`
--
ALTER TABLE `ad_units`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_placement` (`placement`),
  ADD KEY `idx_enabled` (`enabled`);

--
-- Indexes for table `app_config`
--
ALTER TABLE `app_config`
  ADD PRIMARY KEY (`config_key`);

--
-- Indexes for table `authors`
--
ALTER TABLE `authors`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `slug` (`slug`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `fk_author_user` (`user_id`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `slug` (`slug`);

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `parent_id` (`parent_id`),
  ADD KEY `idx_post_id` (`post_id`),
  ADD KEY `idx_date` (`date`),
  ADD KEY `idx_post_id_date` (`post_id`,`date`),
  ADD KEY `idx_comments_status` (`status`);

--
-- Indexes for table `ecom_brands`
--
ALTER TABLE `ecom_brands`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uniq_slug` (`slug`);

--
-- Indexes for table `ecom_business_settings`
--
ALTER TABLE `ecom_business_settings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ecom_categories`
--
ALTER TABLE `ecom_categories`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uniq_slug` (`slug`);

--
-- Indexes for table `ecom_coupons`
--
ALTER TABLE `ecom_coupons`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uniq_code` (`code`),
  ADD KEY `idx_product_id` (`product_id`),
  ADD KEY `idx_category_id` (`category_id`),
  ADD KEY `idx_subcategory_id` (`subcategory_id`);

--
-- Indexes for table `ecom_credits`
--
ALTER TABLE `ecom_credits`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_customer_id` (`customer_id`),
  ADD KEY `idx_order_id` (`order_id`),
  ADD KEY `idx_status` (`status`);

--
-- Indexes for table `ecom_credit_payments`
--
ALTER TABLE `ecom_credit_payments`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uniq_receipt_number` (`receipt_number`),
  ADD KEY `idx_credit_id` (`credit_id`);

--
-- Indexes for table `ecom_customers`
--
ALTER TABLE `ecom_customers`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uniq_email` (`email`);

--
-- Indexes for table `ecom_gst_rates`
--
ALTER TABLE `ecom_gst_rates`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ecom_home_category_strip`
--
ALTER TABLE `ecom_home_category_strip`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uniq_cat` (`category_id`);

--
-- Indexes for table `ecom_home_icon_strip`
--
ALTER TABLE `ecom_home_icon_strip`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ecom_home_sections`
--
ALTER TABLE `ecom_home_sections`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ecom_home_section_items`
--
ALTER TABLE `ecom_home_section_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_section` (`section_id`);

--
-- Indexes for table `ecom_home_settings`
--
ALTER TABLE `ecom_home_settings`
  ADD PRIMARY KEY (`setting_key`);

--
-- Indexes for table `ecom_home_slides`
--
ALTER TABLE `ecom_home_slides`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ecom_orders`
--
ALTER TABLE `ecom_orders`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uniq_order_number` (`order_number`),
  ADD KEY `idx_order_status` (`order_status`),
  ADD KEY `idx_customer_id` (`customer_id`);

--
-- Indexes for table `ecom_order_items`
--
ALTER TABLE `ecom_order_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_order_id` (`order_id`);

--
-- Indexes for table `ecom_order_payments`
--
ALTER TABLE `ecom_order_payments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_order` (`order_id`);

--
-- Indexes for table `ecom_payment_settings`
--
ALTER TABLE `ecom_payment_settings`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uniq_method_key` (`method_key`);

--
-- Indexes for table `ecom_products`
--
ALTER TABLE `ecom_products`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uniq_slug` (`slug`),
  ADD UNIQUE KEY `uniq_barcode` (`barcode`),
  ADD KEY `idx_category_id` (`category_id`),
  ADD KEY `idx_brand_id` (`brand_id`),
  ADD KEY `idx_status` (`status`),
  ADD KEY `idx_is_campaign` (`is_campaign`);

--
-- Indexes for table `ecom_product_images`
--
ALTER TABLE `ecom_product_images`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_product_id` (`product_id`);

--
-- Indexes for table `ecom_product_reviews`
--
ALTER TABLE `ecom_product_reviews`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_product_id` (`product_id`);

--
-- Indexes for table `ecom_product_tags`
--
ALTER TABLE `ecom_product_tags`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uniq_group_slug` (`tag_group`,`slug`);

--
-- Indexes for table `ecom_subcategories`
--
ALTER TABLE `ecom_subcategories`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uniq_slug` (`slug`),
  ADD KEY `idx_category_id` (`category_id`);

--
-- Indexes for table `ecom_wishlist`
--
ALTER TABLE `ecom_wishlist`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uniq_customer_product` (`customer_id`,`product_id`),
  ADD KEY `fk_wishlist_product` (`product_id`);

--
-- Indexes for table `media`
--
ALTER TABLE `media`
  ADD PRIMARY KEY (`id`),
  ADD KEY `post_id` (`post_id`);

--
-- Indexes for table `nws_campaigns`
--
ALTER TABLE `nws_campaigns`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_status` (`status`);

--
-- Indexes for table `nws_queue`
--
ALTER TABLE `nws_queue`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_sub` (`campaign_id`,`subscriber_id`),
  ADD KEY `idx_campaign_pending` (`campaign_id`,`attempts`);

--
-- Indexes for table `nws_subscriptions`
--
ALTER TABLE `nws_subscriptions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `slug` (`slug`),
  ADD KEY `idx_slug` (`slug`),
  ADD KEY `author_id` (`author_id`),
  ADD KEY `featured_image_id` (`featured_image_id`),
  ADD KEY `idx_status` (`status`),
  ADD KEY `idx_date` (`date`),
  ADD KEY `idx_category_id` (`category_id`),
  ADD KEY `idx_status_date` (`status`,`date`),
  ADD KEY `idx_category_status_date` (`category_id`,`status`,`date`);

--
-- Indexes for table `post_categories`
--
ALTER TABLE `post_categories`
  ADD PRIMARY KEY (`post_id`,`category_id`),
  ADD KEY `category_id` (`category_id`);

--
-- Indexes for table `post_meta`
--
ALTER TABLE `post_meta`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_post_id` (`post_id`);

--
-- Indexes for table `post_stats_daily`
--
ALTER TABLE `post_stats_daily`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uniq_post_date_source_country` (`post_id`,`stat_date`,`source`,`country`),
  ADD KEY `idx_stat_date` (`stat_date`),
  ADD KEY `idx_post_id` (`post_id`),
  ADD KEY `idx_country` (`country`);

--
-- Indexes for table `post_tag`
--
ALTER TABLE `post_tag`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_post_tag` (`post_id`,`tag_id`),
  ADD KEY `fk_tag_link` (`tag_id`);

--
-- Indexes for table `post_views`
--
ALTER TABLE `post_views`
  ADD PRIMARY KEY (`post_id`);

--
-- Indexes for table `product_categories`
--
ALTER TABLE `product_categories`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `slug` (`slug`);

--
-- Indexes for table `push_campaigns`
--
ALTER TABLE `push_campaigns`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_status` (`status`),
  ADD KEY `post_id` (`post_id`);

--
-- Indexes for table `push_queue`
--
ALTER TABLE `push_queue`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_campaign_status` (`campaign_id`,`status`),
  ADD KEY `idx_subscription` (`subscription_id`);

--
-- Indexes for table `push_subscriptions`
--
ALTER TABLE `push_subscriptions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `shop_categories`
--
ALTER TABLE `shop_categories`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `slug` (`slug`);

--
-- Indexes for table `shop_customers`
--
ALTER TABLE `shop_customers`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `idx_shop_customers_name` (`name`);

--
-- Indexes for table `shop_orders`
--
ALTER TABLE `shop_orders`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `order_number` (`order_number`),
  ADD KEY `idx_shop_orders_customer` (`customer_id`),
  ADD KEY `idx_shop_orders_status` (`fulfillment_status`);

--
-- Indexes for table `shop_order_items`
--
ALTER TABLE `shop_order_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_shop_items_order` (`order_id`),
  ADD KEY `fk_shop_items_product` (`product_id`);

--
-- Indexes for table `shop_products`
--
ALTER TABLE `shop_products`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `slug` (`slug`),
  ADD UNIQUE KEY `sku` (`sku`),
  ADD KEY `idx_shop_products_category` (`category_id`),
  ADD KEY `idx_shop_products_status` (`status`);

--
-- Indexes for table `states`
--
ALTER TABLE `states`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `slug` (`slug`);

--
-- Indexes for table `table_templates`
--
ALTER TABLE `table_templates`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tags`
--
ALTER TABLE `tags`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `slug` (`slug`);

--
-- Indexes for table `tools_tracking`
--
ALTER TABLE `tools_tracking`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `tool_slug_unique` (`tool_slug`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `visitor_log`
--
ALTER TABLE `visitor_log`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uniq_visit` (`visit_date`,`visitor_id`,`post_id`),
  ADD KEY `idx_visit_date` (`visit_date`),
  ADD KEY `idx_post_id` (`post_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `activity_logs`
--
ALTER TABLE `activity_logs`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=270;

--
-- AUTO_INCREMENT for table `ad_units`
--
ALTER TABLE `ad_units`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `authors`
--
ALTER TABLE `authors`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `ecom_brands`
--
ALTER TABLE `ecom_brands`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `ecom_business_settings`
--
ALTER TABLE `ecom_business_settings`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `ecom_categories`
--
ALTER TABLE `ecom_categories`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `ecom_coupons`
--
ALTER TABLE `ecom_coupons`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `ecom_credits`
--
ALTER TABLE `ecom_credits`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `ecom_credit_payments`
--
ALTER TABLE `ecom_credit_payments`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `ecom_customers`
--
ALTER TABLE `ecom_customers`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `ecom_gst_rates`
--
ALTER TABLE `ecom_gst_rates`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `ecom_home_category_strip`
--
ALTER TABLE `ecom_home_category_strip`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ecom_home_icon_strip`
--
ALTER TABLE `ecom_home_icon_strip`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ecom_home_sections`
--
ALTER TABLE `ecom_home_sections`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ecom_home_section_items`
--
ALTER TABLE `ecom_home_section_items`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ecom_home_slides`
--
ALTER TABLE `ecom_home_slides`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `ecom_orders`
--
ALTER TABLE `ecom_orders`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `ecom_order_items`
--
ALTER TABLE `ecom_order_items`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `ecom_order_payments`
--
ALTER TABLE `ecom_order_payments`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `ecom_payment_settings`
--
ALTER TABLE `ecom_payment_settings`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `ecom_products`
--
ALTER TABLE `ecom_products`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `ecom_product_images`
--
ALTER TABLE `ecom_product_images`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ecom_product_reviews`
--
ALTER TABLE `ecom_product_reviews`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ecom_product_tags`
--
ALTER TABLE `ecom_product_tags`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `ecom_subcategories`
--
ALTER TABLE `ecom_subcategories`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `ecom_wishlist`
--
ALTER TABLE `ecom_wishlist`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `media`
--
ALTER TABLE `media`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `nws_campaigns`
--
ALTER TABLE `nws_campaigns`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `nws_queue`
--
ALTER TABLE `nws_queue`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `nws_subscriptions`
--
ALTER TABLE `nws_subscriptions`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `posts`
--
ALTER TABLE `posts`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `post_meta`
--
ALTER TABLE `post_meta`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `post_stats_daily`
--
ALTER TABLE `post_stats_daily`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `post_tag`
--
ALTER TABLE `post_tag`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `product_categories`
--
ALTER TABLE `product_categories`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `push_campaigns`
--
ALTER TABLE `push_campaigns`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `push_queue`
--
ALTER TABLE `push_queue`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `push_subscriptions`
--
ALTER TABLE `push_subscriptions`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `shop_categories`
--
ALTER TABLE `shop_categories`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `shop_customers`
--
ALTER TABLE `shop_customers`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `shop_orders`
--
ALTER TABLE `shop_orders`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `shop_order_items`
--
ALTER TABLE `shop_order_items`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `shop_products`
--
ALTER TABLE `shop_products`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `states`
--
ALTER TABLE `states`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT for table `table_templates`
--
ALTER TABLE `table_templates`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tags`
--
ALTER TABLE `tags`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `tools_tracking`
--
ALTER TABLE `tools_tracking`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `visitor_log`
--
ALTER TABLE `visitor_log`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `authors`
--
ALTER TABLE `authors`
  ADD CONSTRAINT `fk_author_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`parent_id`) REFERENCES `comments` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `ecom_credit_payments`
--
ALTER TABLE `ecom_credit_payments`
  ADD CONSTRAINT `fk_credit_payment` FOREIGN KEY (`credit_id`) REFERENCES `ecom_credits` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `ecom_home_section_items`
--
ALTER TABLE `ecom_home_section_items`
  ADD CONSTRAINT `fk_home_section_items_section` FOREIGN KEY (`section_id`) REFERENCES `ecom_home_sections` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `ecom_order_items`
--
ALTER TABLE `ecom_order_items`
  ADD CONSTRAINT `fk_orderitem_order` FOREIGN KEY (`order_id`) REFERENCES `ecom_orders` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `ecom_order_payments`
--
ALTER TABLE `ecom_order_payments`
  ADD CONSTRAINT `fk_order_payments_order` FOREIGN KEY (`order_id`) REFERENCES `ecom_orders` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `ecom_product_images`
--
ALTER TABLE `ecom_product_images`
  ADD CONSTRAINT `fk_gallery_product` FOREIGN KEY (`product_id`) REFERENCES `ecom_products` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `ecom_product_reviews`
--
ALTER TABLE `ecom_product_reviews`
  ADD CONSTRAINT `fk_review_product` FOREIGN KEY (`product_id`) REFERENCES `ecom_products` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `ecom_subcategories`
--
ALTER TABLE `ecom_subcategories`
  ADD CONSTRAINT `fk_subcat_category` FOREIGN KEY (`category_id`) REFERENCES `ecom_categories` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `ecom_wishlist`
--
ALTER TABLE `ecom_wishlist`
  ADD CONSTRAINT `fk_wishlist_customer` FOREIGN KEY (`customer_id`) REFERENCES `ecom_customers` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_wishlist_product` FOREIGN KEY (`product_id`) REFERENCES `ecom_products` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `media`
--
ALTER TABLE `media`
  ADD CONSTRAINT `media_ibfk_1` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `nws_queue`
--
ALTER TABLE `nws_queue`
  ADD CONSTRAINT `nws_queue_ibfk_1` FOREIGN KEY (`campaign_id`) REFERENCES `nws_campaigns` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `posts`
--
ALTER TABLE `posts`
  ADD CONSTRAINT `posts_ibfk_1` FOREIGN KEY (`author_id`) REFERENCES `authors` (`id`),
  ADD CONSTRAINT `posts_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`),
  ADD CONSTRAINT `posts_ibfk_3` FOREIGN KEY (`featured_image_id`) REFERENCES `media` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `post_categories`
--
ALTER TABLE `post_categories`
  ADD CONSTRAINT `post_categories_ibfk_1` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `post_categories_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `post_meta`
--
ALTER TABLE `post_meta`
  ADD CONSTRAINT `post_meta_ibfk_1` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `post_tag`
--
ALTER TABLE `post_tag`
  ADD CONSTRAINT `fk_post_link` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_tag_link` FOREIGN KEY (`tag_id`) REFERENCES `tags` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `post_views`
--
ALTER TABLE `post_views`
  ADD CONSTRAINT `post_views_ibfk_1` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `push_campaigns`
--
ALTER TABLE `push_campaigns`
  ADD CONSTRAINT `push_campaigns_ibfk_1` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `push_queue`
--
ALTER TABLE `push_queue`
  ADD CONSTRAINT `push_queue_ibfk_1` FOREIGN KEY (`campaign_id`) REFERENCES `push_campaigns` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `push_queue_ibfk_2` FOREIGN KEY (`subscription_id`) REFERENCES `push_subscriptions` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `shop_orders`
--
ALTER TABLE `shop_orders`
  ADD CONSTRAINT `fk_shop_orders_customer` FOREIGN KEY (`customer_id`) REFERENCES `shop_customers` (`id`) ON DELETE RESTRICT;

--
-- Constraints for table `shop_order_items`
--
ALTER TABLE `shop_order_items`
  ADD CONSTRAINT `fk_shop_items_order` FOREIGN KEY (`order_id`) REFERENCES `shop_orders` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_shop_items_product` FOREIGN KEY (`product_id`) REFERENCES `shop_products` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `shop_products`
--
ALTER TABLE `shop_products`
  ADD CONSTRAINT `fk_shop_products_category` FOREIGN KEY (`category_id`) REFERENCES `shop_categories` (`id`) ON DELETE SET NULL;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
