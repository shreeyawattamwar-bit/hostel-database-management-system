-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 08, 2026 at 07:43 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `hostel_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `gate_pass`
--

CREATE TABLE `gate_pass` (
  `gate_id` int(11) NOT NULL,
  `student_id` int(11) DEFAULT NULL,
  `exit_time` datetime DEFAULT NULL,
  `entry_time` datetime DEFAULT NULL,
  `reason` varchar(255) DEFAULT NULL,
  `status` varchar(20) DEFAULT 'Pending'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `gate_pass`
--

INSERT INTO `gate_pass` (`gate_id`, `student_id`, `exit_time`, `entry_time`, `reason`, `status`) VALUES
(1, 1, '2026-03-03 18:51:44', '2026-03-03 13:28:26', NULL, 'IN'),
(2, 1, '2026-03-03 18:51:48', '2026-03-03 13:28:26', NULL, 'IN'),
(3, 2, '2026-03-03 13:30:00', '2026-03-03 13:30:03', 'General', 'IN'),
(4, 1, '2026-03-07 12:26:17', '2026-03-07 14:05:56', NULL, 'IN'),
(5, 1, '2026-03-07 14:20:33', NULL, NULL, 'OUT'),
(6, 1, '2026-03-07 14:20:36', NULL, NULL, 'OUT'),
(7, 1, '2026-03-07 14:21:08', NULL, NULL, 'OUT'),
(8, 4, '2026-03-07 14:21:11', NULL, NULL, 'IN'),
(9, 1, '2026-03-07 14:23:11', NULL, NULL, 'OUT'),
(10, 1, '2026-03-07 19:17:34', NULL, NULL, 'OUT'),
(11, 1, '2026-03-07 19:17:36', NULL, NULL, 'IN'),
(12, 1, NULL, NULL, NULL, 'IN'),
(13, 2, NULL, NULL, NULL, 'IN'),
(14, 1, NULL, NULL, NULL, 'IN');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `gate_pass`
--
ALTER TABLE `gate_pass`
  ADD PRIMARY KEY (`gate_id`),
  ADD KEY `student_id` (`student_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `gate_pass`
--
ALTER TABLE `gate_pass`
  MODIFY `gate_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `gate_pass`
--
ALTER TABLE `gate_pass`
  ADD CONSTRAINT `gate_pass_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `students` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
