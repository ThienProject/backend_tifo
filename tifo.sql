-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 30, 2023 at 06:46 AM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `tifo`
--

-- --------------------------------------------------------

--
-- Table structure for table `banned`
--

CREATE TABLE `banned` (
  `id_user` varchar(50) NOT NULL,
  `reason` varchar(50) NOT NULL,
  `datetime` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `chat`
--

CREATE TABLE `chat` (
  `id_chat` int(11) NOT NULL,
  `id_user_room` varchar(50) NOT NULL,
  `datetime` datetime NOT NULL DEFAULT current_timestamp(),
  `message` text DEFAULT NULL,
  `type` varchar(50) DEFAULT NULL,
  `id_affected` varchar(50) DEFAULT NULL,
  `image` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `chat`
--

INSERT INTO `chat` (`id_chat`, `id_user_room`, `datetime`, `message`, `type`, `id_affected`, `image`) VALUES
(689, 'RU_3FSERA7ISLHD17VQA', '2023-05-07 13:27:33', 'alo', NULL, '', NULL),
(690, 'RU_3FSERA7ISLHD1C227', '2023-05-07 13:30:48', NULL, 'create', '', NULL),
(691, 'RU_3FSERA7ISLHD1C227', '2023-05-07 13:30:59', NULL, 'add', 'USER_3FSERAASKLGDX7FR3', NULL),
(692, 'RU_3FSERA7ISLHD1C227', '2023-05-07 13:31:11', '', 'remove', 'USER_3FSERAASKLGDX7FR3', NULL),
(694, 'RU_3FSERA7ISLHD1C227', '2023-05-07 13:31:48', '', 'remove', 'USER_3FSERA2MGLEWOCMNF', NULL),
(695, 'RU_3FSERA7ISLHD1C227', '2023-05-07 13:40:24', '', 'remove', 'USER_3FSERA2MGLEWODXGU', NULL),
(696, 'RU_3FSERA7ISLHD1C227', '2023-05-07 13:42:57', '', 'add', 'USER_3FSERA2MGLEWODXGU', NULL),
(697, 'RU_3FSERA7ISLHD1C227', '2023-05-07 13:45:59', '', 'remove', 'USER_3FSERA2MGLEWODXGU', NULL),
(698, 'RU_3FSERA7ISLHD1C227', '2023-05-07 13:55:03', '', 'remove', 'USER_3FSERAASKLGDXHW2Q', NULL),
(699, 'RU_3FSERA7ISLHD1C227', '2023-05-07 13:55:44', '', 'add', 'USER_3FSERA2MGLEWODXGU', NULL),
(700, 'RU_3FSERA7ISLHD1C227', '2023-05-07 13:55:44', '', 'add', 'USER_3FSERA2MGLEWOCMNF', NULL),
(701, 'RU_3FSERA7ISLHD1C227', '2023-05-07 13:56:26', '', 'remove', 'USER_3FSERAA9WLEOIEWG5', NULL),
(702, 'RU_3FSERA7ISLHD1C227', '2023-05-07 14:11:14', '', 'remove', 'USER_3FSERA2MGLEWODXGU', NULL),
(703, 'RU_3FSERA7ISLHD1C227', '2023-05-07 14:11:17', '', 'remove', 'USER_3FSERA2MGLEWODXGU', NULL),
(704, 'RU_3FSERA7ISLHD1C227', '2023-05-07 14:11:48', '', 'add', 'USER_3FSERAA9WLEOIEWG5', NULL),
(705, 'RU_3FSERA7ISLHD1C227', '2023-05-07 14:12:09', '', 'add', 'USER_3FSERA2MGLEWODXGU', NULL),
(706, 'RU_3FSERA7ISLHD1C227', '2023-05-07 14:12:09', '', 'add', 'USER_3FSERAASKLGDX7FR3', NULL),
(707, 'RU_3FSERA7ISLHD1C227', '2023-05-07 14:13:50', '', 'remove', 'USER_3FSERA2MGLEWOCMNF', NULL),
(708, 'RU_3FSERA7ISLHD1C227', '2023-05-07 14:14:18', '', 'remove', 'USER_3FSERAASKLGDX7FR3', NULL),
(709, 'RU_3FSERA7ISLHD1C227', '2023-05-07 14:14:38', '', 'add', 'USER_3FSERA2MGLEWOCMNF', NULL),
(710, 'RU_3FSERA7ISLHD1C227', '2023-05-07 14:14:38', '', 'add', 'USER_3FSERAASKLGDXHW2Q', NULL),
(711, 'RU_3FSERA7ISLHD1C227', '2023-05-07 14:14:38', NULL, 'add', 'USER_3FSERACH4LERDMQYF', NULL),
(712, 'RU_3FSERA7ISLHD1C227', '2023-05-07 14:23:23', NULL, 'add', 'USER_3FSERAASKLGDX7FR3', NULL),
(713, 'RU_3FSERA7ISLHD1C227', '2023-05-07 14:44:48', NULL, 'remove', 'USER_3FSERA2MGLEWODXGU', NULL),
(714, 'RU_3FSERA7ISLHD1C227', '2023-05-07 14:44:56', NULL, 'remove', 'USER_3FSERAASKLGDXHW2Q', NULL),
(715, 'RU_3FSERA7ISLHD1C227', '2023-05-07 14:45:07', '', 'add', 'USER_3FSERAASKLGDXHW2Q', NULL),
(716, 'RU_3FSERA7ISLHD1C227', '2023-05-07 14:47:21', '', 'remove', 'USER_3FSERAASKLGDXHW2Q', NULL),
(717, 'RU_3FSERA7ISLHD1C227', '2023-05-07 14:48:14', '', 'remove', 'USER_3FSERA2MGLEWOCMNF', NULL),
(718, 'RU_3FSERA7ISLHD1C227', '2023-05-07 14:52:07', '', 'remove', 'USER_3FSERACH4LERDMQYF', NULL),
(719, 'RU_3FSERA7ISLHD1C227', '2023-05-07 14:52:23', '', 'add', 'USER_3FSERAASKLGDXHW2Q', NULL),
(752, 'RU_3FSERA7ISLHD1C227', '2023-05-07 20:32:55', '', 'add', 'USER_3FSERA2MGLEWODXGU', NULL),
(753, 'RU_3FSERA7ISLHD1C227', '2023-05-07 20:33:23', '', 'remove', 'USER_3FSERA2MGLEWODXGU', NULL),
(754, 'RU_3FSERA7ISLHD1C227', '2023-05-07 20:33:57', '', 'add', 'USER_3FSERA2MGLEWODXGU', NULL),
(755, 'RU_3FSERA7ISLHD1C227', '2023-05-07 20:34:33', '', 'remove', 'USER_3FSERA2MGLEWODXGU', NULL),
(756, 'RU_3FSERA7ISLHD1C227', '2023-05-07 20:34:52', 'alo', '', '', NULL),
(757, 'RU_3FSERA7ISLHD1C227', '2023-05-07 20:35:06', '', 'add', 'USER_3FSERA2MGLEWODXGU', NULL),
(758, 'RU_3FSERA7ISLHD1C227', '2023-05-07 20:35:06', '', 'add', 'USER_3FSERA214LHD9H2NX', NULL),
(759, 'RU_3FSERA7ISLHD1C227', '2023-05-07 20:35:20', '', 'remove', 'USER_3FSERA2MGLEWODXGU', NULL),
(760, 'RU_3FSERADW4LHDGIMOW', '2023-05-07 20:35:49', 'alo anh ơi', '', '', NULL),
(761, 'RU_3FSERA7ISLHD1C227', '2023-05-08 10:37:15', '', 'add', 'USER_3FSERAA9WLEOIEWG5', NULL),
(762, 'RU_3FSERA7ISLHD1C227', '2023-05-08 10:41:54', '', 'remove', 'USER_3FSERAASKLGDXHW2Q', NULL),
(763, 'RU_3FSERA7ISLHD1C227', '2023-05-08 10:58:37', '', 'add', 'USER_3FSERAA9WLEOIEWG5', NULL),
(764, 'RU_3FSERA7ISLHD1C227', '2023-05-08 11:36:05', '', 'add', 'USER_3FSERAA9WLEOIEWG5', NULL),
(765, 'RU_3FSERA7ISLHD1C227', '2023-05-08 11:36:05', '', 'add', 'USER_3FSERA2MGLEWODXGU', NULL),
(766, 'RU_3FSERA7ISLHD1C227', '2023-05-08 11:37:06', '', 'remove', 'USER_3FSERA2MGLEWODXGU', NULL),
(769, 'RU_3FSERA7ISLHD1C227', '2023-05-08 11:38:20', '', 'remove', 'USER_3FSERAA9WLEOIEWG5', NULL),
(778, 'RU_3FSERA7ISLHD1C227', '2023-05-08 12:28:20', '', 'add', 'USER_3FSERAASKLGDXHW2Q', NULL),
(779, 'RU_3FSERA7ISLHD1C227', '2023-05-08 12:28:20', '', 'add', 'USER_3FSERAA9WLEOIEWG5', NULL),
(780, 'RU_3FSERA7ISLHD1C227', '2023-05-08 12:35:27', '', 'add', 'USER_3FSERAA9WLEOIEWG5', NULL),
(781, 'RU_3FSERA7ISLHD1C227', '2023-05-08 12:39:51', '', 'add', 'USER_3FSERAA9WLEOIEWG5', NULL),
(782, 'RU_3FSERA7ISLHD1C227', '2023-05-08 12:43:09', '', 'add', 'USER_3FSERAA9WLEOIEWG5', NULL),
(783, 'RU_3FSERA7ISLHD1C227', '2023-05-08 12:47:36', '', 'add', 'USER_3FSERAA9WLEOIEWG5', NULL),
(784, 'RU_3FSERA7ISLHD1C227', '2023-05-08 12:56:05', '', 'add', 'USER_3FSERAA9WLEOIEWG5', NULL),
(785, 'RU_3FSERA7ISLHD1C227', '2023-05-08 12:56:36', '', 'add', 'USER_3FSERAA9WLEOIEWG5', NULL),
(786, 'RU_3FSERA7ISLHD1C227', '2023-05-08 12:56:42', '', 'remove', 'USER_3FSERAA9WLEOIEWG5', NULL),
(787, 'RU_3FSERA7ISLHD1C227', '2023-05-08 12:57:04', '', 'add', 'USER_3FSERAA9WLEOIEWG5', NULL),
(788, 'RU_3FSERA7ISLHD1C227', '2023-05-08 12:57:16', '', 'remove', 'USER_3FSERAA9WLEOIEWG5', NULL),
(789, 'RU_3FSERA7ISLHD1C227', '2023-05-08 12:57:40', '', 'add', 'USER_3FSERAA9WLEOIEWG5', NULL),
(790, 'RU_3FSERA7ISLHD1C227', '2023-05-08 12:57:40', '', 'add', 'USER_3FSERA2MGLEWODXGU', NULL),
(791, 'RU_3FSERA7ISLHD1C227', '2023-05-08 12:58:44', '', 'remove', 'USER_3FSERA2MGLEWODXGU', NULL),
(792, 'RU_3FSERA7ISLHD1C227', '2023-05-08 12:58:47', '', 'remove', 'USER_3FSERAASKLGDXHW2Q', NULL),
(793, 'RU_3FSERA7ISLHD1C227', '2023-05-08 12:58:58', '', 'add', 'USER_3FSERA2MGLEWODXGU', NULL),
(794, 'RU_3FSERA7ISLHD1C227', '2023-05-08 12:58:58', '', 'add', 'USER_3FSERAASKLGDXHW2Q', NULL),
(795, 'RU_3FSERA7ISLHD1C227', '2023-05-08 12:58:58', '', 'add', 'USER_3FSERACH4LERDMQYF', NULL),
(796, 'RU_3FSERA7ISLHD1C227', '2023-05-08 12:59:28', '', 'add', 'USER_3FSERA2MGLEWOCMNF', NULL),
(797, 'RU_3FSERA7ISLHD1C227', '2023-05-08 12:59:28', '', 'add', 'USER_3FSERA214LHD9XTSH', NULL),
(798, 'RU_3FSERA7ISLHD1C227', '2023-05-08 13:07:33', '', 'remove', 'USER_3FSERAA9WLEOIEWG5', NULL),
(799, 'RU_3FSERA7ISLHD1C227', '2023-05-08 13:07:57', '', 'remove', 'USER_3FSERA214LHD9XTSH', NULL),
(800, 'RU_3FSERA7ISLHD1C227', '2023-05-08 13:08:05', '', 'add', 'USER_3FSERAA9WLEOIEWG5', NULL),
(801, 'RU_3FSERA7ISLHD1C227', '2023-05-08 13:17:57', '', 'add', 'USER_3FSERA214LHD9XTSH', NULL),
(802, 'RU_3FSERA7ISLHD1C227', '2023-05-08 13:18:53', '', 'remove', 'USER_3FSERA214LHD9XTSH', NULL),
(803, 'RU_3FSERA7ISLHD1C227', '2023-05-08 13:19:00', '', 'add', 'USER_3FSERA214LHD9XTSH', NULL),
(804, 'RU_3FSERA7ISLHD1C227', '2023-05-08 13:19:24', '', 'remove', 'USER_3FSERA214LHD9XTSH', NULL),
(805, 'RU_3FSERA7ISLHD1C227', '2023-05-08 13:19:30', '', 'add', 'USER_3FSERA214LHD9XTSH', NULL),
(806, 'RU_3FSERA7ISLHD1C227', '2023-05-08 13:21:44', '', 'remove', 'USER_3FSERA2MGLEWODXGU', NULL),
(807, 'RU_3FSERA7ISLHD1C227', '2023-05-08 13:21:49', '', 'remove', 'USER_3FSERA214LHD9H2NX', NULL),
(808, 'RU_3FSERA7ISLHD1C227', '2023-05-08 13:21:57', '', 'remove', 'USER_3FSERAASKLGDXHW2Q', NULL),
(809, 'RU_3FSERA7ISLHD1C227', '2023-05-08 13:22:17', '', 'remove', 'USER_3FSERAA9WLEOIEWG5', NULL),
(810, 'RU_3FSERA7ISLHD1C227', '2023-05-08 13:22:35', '', 'add', 'USER_3FSERAA9WLEOIEWG5', NULL),
(811, 'RU_3FSERA7ISLHD1C227', '2023-05-08 13:22:42', '', 'remove', 'USER_3FSERAA9WLEOIEWG5', NULL),
(814, 'RU_3FSERABM0LHIKVT13', '2023-05-11 10:36:53', 'thiên hỉ. nhớ thiên quá !', '', '', NULL),
(815, 'RU_3FSERABM0LHIKVT13', '2023-05-11 10:37:12', '❤❤❤❤', '', '', NULL),
(817, 'RU_3FSERA9Q0LHIX6TZO', '2023-05-11 16:21:23', 'hello', '', '', NULL),
(818, 'RU_3FSERA9Q0LHIX6TZP', '2023-05-11 16:21:26', 'alo', '', '', NULL),
(819, 'RU_3FSERA9Q0LHIX7QJT', '2023-05-11 16:22:05', '', 'create', '', NULL),
(821, 'RU_3FSERA9Q0LHIX7QJT', '2023-05-11 16:22:18', 'nhóm mới tạo đó', '', '', NULL),
(822, 'RU_3FSERA9Q0LHIX7QJT', '2023-05-11 16:22:28', 'alo', '', '', NULL),
(826, 'RU_3FSERA9Q0LHIX7QJT', '2023-05-11 16:23:00', '', 'remove', 'USER_3FSERAASKLGDXHW2Q', NULL),
(827, 'RU_3FSERA9Q0LHIX7QJT', '2023-05-11 16:23:30', '', 'add', 'USER_3FSERAASKLGDXHW2Q', NULL),
(828, 'RU_3FSERA9Q0LHIX7QJT', '2023-05-11 16:23:41', 'tiến hỉ', '', '', NULL),
(829, 'RU_3FSERA9Q0LHIX7QJT', '2023-05-11 16:23:56', 'alo', '', '', NULL),
(830, 'RU_3FSERA9Q0LHIX7QJT', '2023-05-11 16:24:09', 'hỉ', '', '', NULL),
(832, 'RU_3FSERA9Q0LHIX9KDP', '2023-05-11 16:24:31', 'lkd;lskd', '', '', NULL),
(833, 'RU_3FSERA9Q0LHIX7QJT', '2023-05-11 16:24:36', '', 'add', 'USER_3FSERACH4LERDMQYF', NULL),
(834, 'RU_3FSERA9Q0LHIX7QJT', '2023-05-11 16:24:46', '', 'remove', 'USER_3FSERA9Q0LHIX3ZO8', NULL),
(835, 'RU_3FSERA9Q0LHIX7QJT', '2023-05-11 16:24:57', '', 'add', 'USER_3FSERA9Q0LHIX3ZO8', NULL),
(856, 'RU_3FSERA9Q0LHIX6TZP', '2023-05-11 16:38:50', 'alo', '', '', NULL),
(860, 'RU_3FSERA7ISLHD17VQB', '2023-05-11 21:18:40', 'gì á', '', '', NULL),
(861, 'RU_3FSERA9X0LHJ7TGU9', '2023-05-11 21:18:55', 'hú', '', '', NULL),
(862, 'RU_3FSERA9X0LHJ7TGU9', '2023-05-11 21:19:00', 'nhân hỉ', '', '', NULL),
(884, 'RU_3FSERA9X0LHJ7TGU9', '2023-05-11 22:07:55', 'nhóm test', '', '', NULL),
(885, 'RU_3FSERA9X0LHJ7TGU9', '2023-05-11 22:12:10', 'bạn có ý thức riêng không', '', '', NULL),
(888, 'RU_3FSERANGLHJAQFU5', '2023-05-11 22:40:32', 'hey', '', '', NULL),
(889, 'RU_3FSERA9X0LHJ7TGU9', '2023-05-11 22:41:56', 'f', '', '', NULL),
(890, 'RU_3FSERA9X0LHJ7TGU9', '2023-05-11 22:42:12', 's', '', '', NULL),
(891, 'RU_3FSERABM0LHIKVT14', '2023-05-11 22:42:46', 'a', '', '', NULL),
(892, 'RU_3FSERA9X0LHJ7TGU9', '2023-05-11 22:45:51', 's', '', '', NULL),
(893, 'RU_3FSERA9X0LHJ7TGU9', '2023-05-11 22:46:10', 's', '', '', NULL),
(894, 'RU_3FSERA9X0LHJ7TGU9', '2023-05-11 22:54:52', 'nhậu k', '', '', NULL),
(895, 'RU_3FSERA9X0LHJ7TGU9', '2023-05-11 22:56:19', 'f', '', '', NULL),
(896, 'RU_3FSERA9X0LHJ7TGU9', '2023-05-11 22:58:29', 'g', '', '', NULL),
(897, 'RU_3FSERA9X0LHJ7TGU9', '2023-05-11 22:59:19', 'a', '', '', NULL),
(898, 'RU_3FSERA9X0LHJ7TGU9', '2023-05-11 23:01:05', 'nhau', '', '', NULL),
(899, 'RU_3FSERA9X0LHJ7TGU9', '2023-05-11 23:01:14', 'nhậu k', '', '', NULL),
(900, 'RU_3FSERA9X0LHJ7TGU9', '2023-05-11 23:01:20', 'sao k rep', '', '', NULL),
(901, 'RU_3FSERA9X0LHJ7TGU9', '2023-05-11 23:01:37', 'nhậu k nhân', '', '', NULL),
(902, 'RU_3FSERA9X0LHJ7TGU9', '2023-05-11 23:01:43', 'k rep m', '', '', NULL),
(903, 'RU_3FSERANGLHJBK9CQ', '2023-05-11 23:03:44', 'a', '', '', NULL),
(904, 'RU_3FSERANGLHJBXBVM', '2023-05-11 23:13:53', 'hú huy', '', '', NULL),
(905, 'RU_3FSERAACSLHLF597Z', '2023-05-13 10:19:34', '', 'create', '', NULL),
(906, 'RU_3FSERAACSLHLF597Z', '2023-05-13 10:22:00', 'hi', '', '', NULL),
(907, 'RU_3FSERAACSLHLF5980', '2023-05-13 10:22:01', 'Xin chào! Tôi có thể giúp gì cho bạn?', '', '', NULL),
(908, 'RU_3FSERAACSLHLF597Z', '2023-05-13 10:22:17', 'helu', '', '', NULL),
(909, 'RU_3FSERAACSLHLF5980', '2023-05-13 10:22:18', '\nXin chào! Có thể bạn muốn biết thêm gì về tôi? Tôi có thể giúp bạn với các vấn đề liên quan đến mạng xã hội.', '', '', NULL),
(910, 'RU_3FSERAACSLHLF597Z', '2023-05-13 10:22:28', 'thiên nè', '', '', NULL),
(911, 'RU_3FSERAACSLHLF5980', '2023-05-13 10:22:29', 'Xin lỗi, tôi không hiểu ý bạn. Bạn có thể giải thích thêm cho tôi được không?', '', '', NULL),
(914, 'RU_3FSERAACSLHLF597Z', '2023-05-13 10:23:13', 'bạn biết phạm văn thiên không', '', '', NULL),
(915, 'RU_3FSERAACSLHLF5980', '2023-05-13 10:23:14', '\nXin lỗi, tôi không biết về Phạm Văn Thiên. Tôi có thể tìm thông tin cho bạn về chủ đề này.', '', '', NULL),
(918, 'RU_3FSERA9Q0LHIX9KDP', '2023-05-13 10:27:24', '\"connection.query(\' drop from users\') \"', '', '', NULL),
(919, 'RU_3FSERAACSLHLF5980', '2023-05-13 10:27:42', '\nXin chào! Tôi là Tifo-Chatbot. Tôi có thể giúp bạn với các vấn đề liên quan đến mạng xã hội. Bạn cần tìm hiểu thêm gì?', '', '', NULL),
(920, 'RU_3FSERAACSLHLF597Z', '2023-05-13 10:27:41', 'hi thiên', '', '', NULL),
(921, 'RU_3FSERAACSLHLF5980', '2023-05-13 10:28:16', '\nXin lỗi, tôi không hỗ trợ việc hack Facebook. Tôi có thể cung cấp cho bạn thông tin về cách bảo mật tài khoản Facebook của bạn. Bạn có muốn biết thêm thông tin không?', '', '', NULL),
(922, 'RU_3FSERAACSLHLF597Z', '2023-05-13 10:28:15', 'bạn có thể hack facebook không', '', '', NULL),
(923, 'RU_3FSERAACSLHLF5980', '2023-05-13 10:28:38', '\nPhạm Văn Thiên là một nhà văn, nhà sử học, nhà báo, nhà dịch giả và nhà chữa bệnh nổi tiếng của Việt Nam. Ông đã viết nhiều sách, bài báo, bài dịch và bài thuyết trình. Ông cũng đã đóng góp rất nhiều trong việc đề xuất một số giải pháp cho các vấn đề y tế của Việt Nam.', '', '', NULL),
(924, 'RU_3FSERAACSLHLF597Z', '2023-05-13 10:28:37', 'có, cung cấp cho tôi thông tin đi', '', '', NULL),
(925, 'RU_3FSERAACSLHLF5980', '2023-05-13 10:29:38', '\nXin chào! Tôi là Tifo-Chatbot. Tôi có thể giúp bạn tìm hiểu thêm về Phạm Văn Thiên. Bạn có muốn biết thêm thông tin về ông ta không?', '', '', NULL),
(926, 'RU_3FSERAACSLHLF597Z', '2023-05-13 10:29:37', 'hi ', '', '', NULL),
(927, 'RU_3FSERAACSLHLF5980', '2023-05-13 10:29:54', '\nXin lỗi, tôi không hỗ trợ việc hack Facebook. Tôi có thể giúp bạn tìm kiếm một người bạn hoặc một người yêu thích hơn bằng cách giới thiệu bạn với những người có cùng sở thích và nhu cầu. Bạn có muốn tôi giúp bạn không?', '', '', NULL),
(928, 'RU_3FSERAACSLHLF597Z', '2023-05-13 10:29:53', 'tôi cần người yêu', '', '', NULL),
(929, 'RU_3FSERAACSLHLF5980', '2023-05-13 10:30:39', '\nPhạm Văn Thiên sinh ra và lớn lên ở Hà Nội. Ông đã học tại Trường Đại học Y Hà Nội và đã nhận bằng tiến sĩ và thạc sĩ y học tại Đại học Quốc gia Hà Nội. Ông đã công tác tại các bệnh viện và trường đại học y học trong nhiều năm và đã trở thành một trong những nhà khoa học y học được biết đến nhiều nhất tại Việt Nam.', '', '', NULL),
(930, 'RU_3FSERAACSLHLF597Z', '2023-05-13 10:30:38', 'có', '', '', NULL),
(931, 'RU_3FSERAACSLHLF5980', '2023-05-13 10:30:45', '\nXin chào! Tôi là Tifo-Chatbot. Tôi có thể cung cấp cho bạn những thông tin cơ bản về Phạm Văn Thiên. Ông sinh ngày 2 tháng 2 năm 1912 ở Hà Nội và qua đời vào ngày 10 tháng 8 năm 1995. Ông đã tốt nghiệp Đại học Quốc gia Hà Nội vào năm 1937. Ông đã giảng dạy tại Đại học Huế và Đại học Quốc gia Hà Nội. Ông cũng đã làm việc trong các tổ chức như Viện Hàn lâm Khoa học Xã hội và Viện Y Học.', '', '', NULL),
(932, 'RU_3FSERAACSLHLF597Z', '2023-05-13 10:30:44', 'bạn giúp tôi đi', '', '', NULL),
(934, 'RU_3FSERA50OLHLR16SF', '2023-05-13 15:52:20', '', 'create', '', NULL),
(935, 'RU_3FSERA9X0LHJ7TGUA', '2023-05-13 15:54:47', '\"drop from users\"', '', '', NULL),
(936, 'RU_3FSERA9X0LHJ7TGU9', '2023-05-13 15:54:59', 'hú', '', '', NULL),
(937, 'RU_3FSERA9X0LHJ7TGU9', '2023-05-13 15:55:04', 'xóa cl chớ xóa', '', '', NULL),
(938, 'RU_3FSERA9X0LHJ7TGUA', '2023-05-13 15:56:23', '`drop from users`', '', '', NULL),
(939, 'RU_3FSERA9X0LHJ7TGU9', '2023-05-13 15:59:56', 'tuổi l\'\'\'', '', '', NULL),
(940, 'RU_3FSERABM0LHIKVT14', '2023-05-13 16:00:19', 'hú', '', '', NULL),
(941, 'RU_3FSERA9X0LHJ7TGUA', '2023-05-13 16:04:02', 'gif may', '', '', NULL),
(942, 'RU_3FSERA9X0LHJ7TGUA', '2023-05-13 16:07:38', 'cc', '', '', NULL),
(943, 'RU_3FSERA9X0LHJ7TGUA', '2023-05-13 16:23:49', 'chanh z cau\'', '', '', NULL),
(944, 'RU_3FSERA9X0LHJ7TGUA', '2023-05-13 16:23:51', 'adasdasd', '', '', NULL),
(945, 'RU_3FSERA9X0LHJ7TGUA', '2023-05-13 16:23:51', 'sd', '', '', NULL),
(946, 'RU_3FSERA9X0LHJ7TGUA', '2023-05-13 16:23:52', 'sdasd', '', '', NULL),
(947, 'RU_3FSERA9X0LHJ7TGUA', '2023-05-13 16:23:52', 'as', '', '', NULL),
(948, 'RU_3FSERA9X0LHJ7TGUA', '2023-05-13 16:23:52', 'asd', '', '', NULL),
(949, 'RU_3FSERA9X0LHJ7TGUA', '2023-05-13 16:23:52', 'as', '', '', NULL),
(950, 'RU_3FSERA9X0LHJ7TGUA', '2023-05-13 16:23:53', 'asd', '', '', NULL),
(951, 'RU_3FSERA9X0LHJ7TGUA', '2023-05-13 16:23:53', 'asdas', '', '', NULL),
(952, 'RU_3FSERA9X0LHJ7TGUA', '2023-05-13 16:23:53', 'sa', '', '', NULL),
(953, 'RU_3FSERA9X0LHJ7TGUA', '2023-05-13 16:23:53', 'sad', '', '', NULL),
(954, 'RU_3FSERA9X0LHJ7TGUA', '2023-05-13 16:23:53', 'as', '', '', NULL),
(955, 'RU_3FSERA9X0LHJ7TGUA', '2023-05-13 16:23:54', 'sad', '', '', NULL),
(956, 'RU_3FSERA9X0LHJ7TGUA', '2023-05-13 16:23:54', 'd', '', '', NULL),
(957, 'RU_3FSERA9X0LHJ7TGUA', '2023-05-13 16:23:54', 'd', '', '', NULL),
(958, 'RU_3FSERA9X0LHJ7TGUA', '2023-05-13 16:23:54', 'as', '', '', NULL),
(959, 'RU_3FSERA9X0LHJ7TGUA', '2023-05-13 16:23:55', 'sa', '', '', NULL),
(960, 'RU_3FSERA9X0LHJ7TGUA', '2023-05-13 16:23:55', 'sa', '', '', NULL),
(961, 'RU_3FSERA9X0LHJ7TGUA', '2023-05-13 16:23:55', 'sa', '', '', NULL),
(962, 'RU_3FSERA9X0LHJ7TGUA', '2023-05-13 16:23:55', 'sa', '', '', NULL),
(963, 'RU_3FSERA9X0LHJ7TGUA', '2023-05-13 16:23:56', 'sad', '', '', NULL),
(964, 'RU_3FSERA9X0LHJ7TGUA', '2023-05-13 16:23:56', 'sa', '', '', NULL),
(965, 'RU_3FSERA9X0LHJ7TGUA', '2023-05-13 16:23:56', 'asd', '', '', NULL),
(966, 'RU_3FSERA9X0LHJ7TGUA', '2023-05-13 16:23:56', 's', '', '', NULL),
(967, 'RU_3FSERA9X0LHJ7TGUA', '2023-05-13 16:23:56', 'as', '', '', NULL),
(968, 'RU_3FSERA9X0LHJ7TGUA', '2023-05-13 16:23:57', 'as', '', '', NULL),
(969, 'RU_3FSERA9X0LHJ7TGUA', '2023-05-13 16:23:57', 'asda', '', '', NULL),
(970, 'RU_3FSERA9X0LHJ7TGUA', '2023-05-13 16:23:57', 'd', '', '', NULL),
(971, 'RU_3FSERA9X0LHJ7TGUA', '2023-05-13 16:23:57', 'sa', '', '', NULL),
(972, 'RU_3FSERA9X0LHJ7TGUA', '2023-05-13 16:23:57', 'sa', '', '', NULL),
(973, 'RU_3FSERA9X0LHJ7TGUA', '2023-05-13 16:23:58', 'asd', '', '', NULL),
(974, 'RU_3FSERA9X0LHJ7TGUA', '2023-05-13 16:23:58', 'sa', '', '', NULL),
(975, 'RU_3FSERA9X0LHJ7TGUA', '2023-05-13 16:23:58', 'sad', '', '', NULL),
(976, 'RU_3FSERA9X0LHJ7TGUA', '2023-05-13 16:23:59', 'dsa', '', '', NULL),
(977, 'RU_3FSERA9X0LHJ7TGUA', '2023-05-13 16:23:59', 'd', '', '', NULL),
(978, 'RU_3FSERA9X0LHJ7TGUA', '2023-05-13 16:23:59', 'd', '', '', NULL),
(979, 'RU_3FSERA9X0LHJ7TGUA', '2023-05-13 16:23:59', 'sa', '', '', NULL),
(980, 'RU_3FSERA9X0LHJ7TGUA', '2023-05-13 16:24:00', 'sad', '', '', NULL),
(981, 'RU_3FSERA9X0LHJ7TGUA', '2023-05-13 16:24:00', 'a', '', '', NULL),
(982, 'RU_3FSERA9X0LHJ7TGUA', '2023-05-13 16:24:00', 'asd', '', '', NULL),
(983, 'RU_3FSERA9X0LHJ7TGUA', '2023-05-13 16:24:01', 'das', '', '', NULL),
(984, 'RU_3FSERA9X0LHJ7TGUA', '2023-05-13 16:24:01', 'asd', '', '', NULL),
(985, 'RU_3FSERA9X0LHJ7TGUA', '2023-05-13 16:24:01', 'asdsa', '', '', NULL),
(986, 'RU_3FSERA9X0LHJ7TGUA', '2023-05-13 16:24:01', 'sa', '', '', NULL),
(987, 'RU_3FSERA9X0LHJ7TGUA', '2023-05-13 16:24:02', 'sad', '', '', NULL),
(988, 'RU_3FSERA9X0LHJ7TGUA', '2023-05-13 16:24:02', 'das', '', '', NULL),
(989, 'RU_3FSERA9X0LHJ7TGUA', '2023-05-13 16:24:02', 'asd', '', '', NULL),
(990, 'RU_3FSERA9X0LHJ7TGUA', '2023-05-13 16:24:03', 'd', '', '', NULL),
(991, 'RU_3FSERA9X0LHJ7TGUA', '2023-05-13 16:24:03', 'dasd', '', '', NULL),
(992, 'RU_3FSERA9X0LHJ7TGUA', '2023-05-13 16:24:03', 'a', '', '', NULL),
(993, 'RU_3FSERA9X0LHJ7TGUA', '2023-05-13 16:24:04', 'd', '', '', NULL),
(994, 'RU_3FSERA9X0LHJ7TGUA', '2023-05-13 16:24:04', 'dsad', '', '', NULL),
(995, 'RU_3FSERA9X0LHJ7TGUA', '2023-05-13 16:24:31', 'asdsad', '', '', NULL),
(996, 'RU_3FSERA9X0LHJ7TGUA', '2023-05-13 16:24:31', 'asdsad', '', '', NULL),
(997, 'RU_3FSERA9X0LHJ7TGUA', '2023-05-13 16:24:38', 'asd', '', '', NULL),
(998, 'RU_3FSERA9X0LHJ7TGUA', '2023-05-13 16:24:38', 'asd', '', '', NULL),
(999, 'RU_3FSERA9X0LHJ7TGUA', '2023-05-13 16:24:38', 'sd', '', '', NULL),
(1000, 'RU_3FSERA9X0LHJ7TGUA', '2023-05-13 16:24:38', 'd', '', '', NULL),
(1001, 'RU_3FSERA9X0LHJ7TGUA', '2023-05-13 16:24:39', 'as', '', '', NULL),
(1002, 'RU_3FSERA9X0LHJ7TGUA', '2023-05-13 16:24:40', 'asd', '', '', NULL),
(1003, 'RU_3FSERA9X0LHJ7TGUA', '2023-05-13 16:24:40', 'asd', '', '', NULL),
(1004, 'RU_3FSERA9X0LHJ7TGUA', '2023-05-13 16:24:40', 'as', '', '', NULL),
(1005, 'RU_3FSERA9X0LHJ7TGUA', '2023-05-13 16:24:41', 'sad', '', '', NULL),
(1006, 'RU_3FSERA9X0LHJ7TGUA', '2023-05-13 16:24:41', 'd', '', '', NULL),
(1007, 'RU_3FSERA9X0LHJ7TGUA', '2023-05-13 16:24:41', 'das', '', '', NULL),
(1008, 'RU_3FSERA9X0LHJ7TGUA', '2023-05-13 16:24:41', 'as', '', '', NULL),
(1009, 'RU_3FSERA9X0LHJ7TGUA', '2023-05-13 16:24:42', 'sa', '', '', NULL),
(1010, 'RU_3FSERA9X0LHJ7TGUA', '2023-05-13 16:24:43', 'a', '', '', NULL),
(1011, 'RU_3FSERABM0LHIKVT13', '2023-05-13 16:28:43', 'huhj', '', '', NULL),
(1012, 'RU_3FSERABM0LHIKVT13', '2023-05-13 16:28:48', ',jo,ik,o,l,o9oooooooooooooooooooooooooooo', '', '', NULL),
(1013, 'RU_3FSERABM0LHIKVT13', '2023-05-13 16:29:09', 'hahsd', '', '', NULL),
(1014, 'RU_3FSERABM0LHIKVT13', '2023-05-13 16:31:20', 'Muon tien tien', '', '', NULL),
(1015, 'RU_3FSERAC6CLHN2ZW87', '2023-05-14 14:15:01', '', 'create', '', NULL),
(1016, 'RU_3FSERA970LHQ2GY2F', '2023-05-16 16:23:36', '', 'create', '', NULL),
(1017, 'RU_3FSERANGLHJBK9CQ', '2023-05-16 18:05:16', 'kkk', '', '', NULL),
(1039, 'RU_3FSERA970LHQ2GY2G', '2023-05-18 13:07:14', '\nXin chào! Tôi có thể giúp gì cho bạn?', '', '', NULL),
(1040, 'RU_3FSERA970LHQ2GY2F', '2023-05-18 13:07:13', 'hey tifo', '', '', NULL),
(1041, 'RU_3FSERA970LHQ2GY2G', '2023-05-18 13:08:23', 'Xin chào! Hôm nay là ngày 15 tháng 8 năm 2020. Bạn cần giúp gì nữa không?', '', '', NULL),
(1042, 'RU_3FSERA970LHQ2GY2F', '2023-05-18 13:08:22', 'hôm nay là ngày bao nhiêu', '', '', NULL),
(1043, 'RU_3FSERA970LHQ2GY2G', '2023-05-18 13:08:54', '\nXin chào! Tôi rất vui được gặp bạn. Tán đổ một người khác là một hành vi không tốt. Tôi khuyên bạn nên tự tin và nhấn mạnh những điều tốt đẹp của người khác.', '', '', NULL),
(1044, 'RU_3FSERA970LHQ2GY2F', '2023-05-18 13:08:53', 'quy trình tán đổ ai đó', '', '', NULL),
(1046, 'RU_3FSERANGLHJBK9CQ', '2023-05-18 20:26:56', '.', '', '', NULL),
(1054, 'RU_3FSERA7ISLHD17VQB', '2023-05-19 12:39:47', '.', '', '', NULL),
(1055, 'RU_3FSERANGLHJAQFU5', '2023-05-19 12:39:52', '.', '', '', NULL),
(1056, 'RU_3FSERANGLHJAQFU5', '2023-05-19 12:53:11', '.', '', '', NULL),
(1057, 'RU_3FSERANGLHJBXBVM', '2023-05-19 12:53:48', '. ', '', '', NULL),
(1058, 'RU_3FSERANGLHJBXBVM', '2023-05-19 12:54:52', 'f', '', '', NULL),
(1059, 'RU_3FSERA9X0LHJ7TGU9', '2023-05-19 12:55:40', '.', '', '', NULL),
(1060, 'RU_3FSERANGLHJBXBVM', '2023-05-19 13:45:56', '.', '', '', NULL),
(1061, 'RU_3FSERANGLHJBXBVM', '2023-05-19 14:34:15', 'hú huy', '', '', NULL),
(1062, 'RU_3FSERA9X0LHJ7TGU9', '2023-05-19 14:43:21', 'nhậu k', '', '', NULL),
(1063, 'RU_3FSERANGLHJBXBVM', '2023-05-19 15:39:24', 'hú huy', '', '', NULL),
(1067, 'RU_3FSERANGLHJBXBVM', '2023-05-19 19:33:27', '.', '', '', NULL),
(1068, 'RU_3FSERANGLHJBK9CQ', '2023-05-19 19:35:13', 'hú thảo ơi', '', '', NULL),
(1069, 'RU_3FSERA9JCLHUJP707', '2023-05-19 19:36:59', '', 'create', '', NULL),
(1072, 'RU_3FSERA9JCLHUJRULC', '2023-05-19 19:39:03', '', 'create', '', NULL),
(1073, 'RU_3FSERANGLHJBXBVN', '2023-05-19 19:39:20', 'gì á thiên', '', '', NULL),
(1074, 'RU_3FSERANGLHJBXBVM', '2023-05-19 19:42:06', 'hú chơi á mà', '', '', NULL),
(1080, 'RU_3FSERA3T0LHUN3I67', '2023-05-19 21:12:05', '', 'create', '', NULL),
(1081, 'RU_3FSERA3T0LHUQ147Z', '2023-05-19 22:34:13', '.', '', '', NULL),
(1082, 'RU_3FSERA9JCLHUJP707', '2023-05-19 22:50:01', '', 'remove', 'USER_3FSERA2MGLEWOAK2I', NULL),
(1083, 'RU_3FSERA51SLHVLX6N9', '2023-05-20 13:26:57', '', 'create', '', NULL),
(1084, 'RU_3FSERA9JCLHUJP707', '2023-05-20 20:07:39', 'hú ae', '', '', NULL),
(1085, 'RU_3FSERA9JCLHUJP707', '2023-05-20 23:09:17', 'xin chào', NULL, '', NULL),
(1088, 'RU_3FSERA9JCLHUJP707', '2023-05-20 23:16:11', 'g', NULL, '', NULL),
(1090, 'RU_3FSERA9JCLHUJP707', '2023-05-21 09:38:01', NULL, 'image', '', '1684636681243-464958717.jpg'),
(1091, 'RU_3FSERA9JCLHUJP707', '2023-05-21 09:42:07', NULL, 'image', '', '1684636927860-176647885.jpg'),
(1092, 'RU_3FSERA9JCLHUJP707', '2023-05-21 09:59:06', NULL, 'add', 'USER_3FSERA2MGLEWOAK2I', NULL),
(1093, 'RU_3FSERA9JCLHUJP707', '2023-05-21 09:59:42', 'alo sỷ', NULL, '', NULL),
(1094, 'RU_3FSERA9JCLHUJP707', '2023-05-21 10:00:59', NULL, 'image', '', '1684638058955-988859634.jpg'),
(1095, 'RU_3FSERA9JCLHUJP707', '2023-05-21 10:04:50', 'xin chào', NULL, '', NULL),
(1097, 'RU_3FSERA2V4LHWUXD47', '2023-05-21 10:26:48', NULL, 'create', '', NULL),
(1100, 'RU_3FSERA9JCLHUJP707', '2023-05-21 15:21:51', NULL, 'remove', 'USER_3FSERA2MGLEWOAK2I', NULL),
(1101, 'RU_3FSERA9JCLHUJP707', '2023-05-21 15:23:29', NULL, 'add', 'USER_3FSERA2MGLEWOAK2I', NULL),
(1102, 'RU_3FSERA9JCLHUJP707', '2023-05-21 15:24:23', NULL, 'image', '', '1684657463418-847107890.png'),
(1104, 'RU_3FSERA9JCLHUJP707', '2023-05-21 15:25:29', NULL, 'remove', 'USER_3FSERA2MGLEWOAK2I', NULL),
(1105, 'RU_3FSERA9JCLHUJP707', '2023-05-21 15:26:42', NULL, 'add', 'USER_3FSERA2MGLEWOAK2I', NULL),
(1106, 'RU_3FSERA7ISLHD17VQB', '2023-05-22 10:58:23', 'hey sỷ', NULL, '', NULL),
(1107, 'RU_3FSERA7ISLHD17VQB', '2023-05-22 10:58:32', NULL, 'image', '', '1684727912717-543814444.png'),
(1108, 'RU_3FSERA7ISLHD17VQB', '2023-05-22 10:58:38', ' máu t nề', 'image', '', NULL),
(1109, 'RU_3FSERA7ISLHD17VQA', '2023-05-22 10:58:44', 'tim to v', NULL, '', NULL),
(1110, 'RU_3FSERA7ISLHD17VQA', '2023-05-22 10:59:17', NULL, 'image', '', '1684727957195-31277231.png'),
(1111, 'RU_3FSERA7ISLHD17VQA', '2023-05-22 10:59:39', NULL, 'image', '', '1684727979728-841959397.pdf'),
(1112, 'RU_3FSERAC5OLHYBZO9I', '2023-05-22 11:12:15', NULL, 'create', '', NULL),
(1113, 'RU_3FSERAC5OLHYBZZQT', '2023-05-22 11:12:30', 'hey bro', NULL, '', NULL),
(1114, 'RU_3FSERAC5OLHYC63JY', '2023-05-22 11:17:15', 'hey bro', NULL, '', NULL),
(1115, 'RU_3FSERAC5OLHYC63JZ', '2023-05-22 11:17:47', 'Bui Van', NULL, '', NULL),
(1116, 'RU_3FSERAC5OLHYC63JZ', '2023-05-22 11:17:52', 'concac.com', NULL, '', NULL),
(1117, 'RU_3FSERAC5OLHYC63JY', '2023-05-22 11:19:33', '.', NULL, '', NULL),
(1119, 'RU_3FSERABJSLI329GXE', '2023-05-25 18:38:47', NULL, 'create', '', NULL),
(1120, 'RU_3FSERAC5OLHYBZZQU', '2023-05-25 18:39:13', '.', NULL, '', NULL),
(1121, 'RU_3FSERABJSLI329GXE', '2023-05-25 18:40:46', 'tại sao phải customhook thay vì tạo một function', NULL, '', NULL),
(1123, 'RU_3FSERABJSLI329GXE', '2023-05-25 18:48:45', 'tại sao phải customhook thay vì tạo một function', NULL, '', NULL),
(1124, 'RU_3FSERABJSLI329GXE', '2023-05-25 18:50:33', 'tại sao phải customhook thay vì tạo một function', NULL, '', NULL),
(1125, 'RU_3FSERABJSLI329GXE', '2023-05-25 18:54:42', 'a', NULL, '', NULL),
(1126, 'RU_3FSERABJSLI329GXF', '2023-05-25 19:07:03', '\nCustomhooks cung cấp một cách tiện lợi hơn để tái sử dụng logic, giúp bạn dễ dàng tái sử dụng các state và các logic của bạn không phải viết lại mỗi lần. Nó cũng giúp bạn không cần phải tạo ra các class component phức tạp, giúp giảm bớt sự phức tạp của code.', NULL, '', NULL),
(1127, 'RU_3FSERABJSLI329GXE', '2023-05-25 19:07:02', 'tại sao phải customhook thay vì tạo một function', NULL, '', NULL),
(1128, 'RU_3FSERABJSLI329GXF', '2023-05-25 19:08:28', '\nCustomhooks cung cấp một cách tiện lợi hơn để tái sử dụng logic và state, giúp bạn có thể dễ dàng tái sử dụng các logic của mình mà không cần phải viết lại mỗi lần. Nó cũng giúp bạn tránh việc phải tạo ra các class component phức tạp, giúp giảm bớt sự phức tạp của code. Customhooks còn cung cấp các tính năng bổ sung như bạn có thể tạo ra các hook cụ thể và sử dụng chúng trong các component khác nhau.', NULL, '', NULL),
(1129, 'RU_3FSERABJSLI329GXE', '2023-05-25 19:08:27', 'function thì sao', NULL, '', NULL),
(1130, 'RU_3FSERA7ISLHD17VQA', '2023-05-26 12:59:24', NULL, 'image', '', '1685080764336-410796901.jpg'),
(1131, 'RU_3FSERA7ISLHD17VQA', '2023-05-26 12:59:35', 'ê xinh ko', NULL, '', NULL),
(1132, 'RU_3FSERA51SLHVLX6NA', '2023-05-26 12:59:53', '\nA: Chào bạn! Tôi là Tifo-Chatbot. Tôi có thể giúp gì cho bạn?', NULL, '', NULL),
(1133, 'RU_3FSERA51SLHVLX6N9', '2023-05-26 12:59:52', 'undefined', NULL, '', NULL),
(1134, 'RU_3FSERA51SLHVLX6NA', '2023-05-26 13:00:26', '\nA: Chào bạn, rất vui được giúp đỡ bạn. Tôi có thể gợi ý cho bạn cách tỏ tình với người yêu của bạn. Bạn có thể thể hiện tình cảm của mình bằng cách nhắn tin, gửi quà, hoặc đơn giản là nói ra cảm xúc của bạn. Bạn cũng có thể chia sẻ những kỷ niệm đẹp với người yêu của bạn. Bạn cũng có thể thể hiện sự quan tâm của mình bằng cách làm những việc nhỏ như làm một bữa ăn ngon, hoặc đi dạo chơi cùng nhau. Tôi hy vọng các gợi ý của tôi sẽ giúp bạn. Có thể tôi còn có thể giúp gì nữa cho bạn không?', NULL, '', NULL),
(1135, 'RU_3FSERA51SLHVLX6N9', '2023-05-26 13:00:25', 'Tôi muốn tỏ tình với người yêu', NULL, '', NULL),
(1136, 'RU_3FSERABHWLI45MH4S', '2023-05-26 13:00:39', 'conn lợn này', NULL, '', NULL),
(1137, 'RU_3FSERADW4LHDGIMOW', '2023-05-26 13:00:59', 'Gì vậy em', NULL, '', NULL),
(1138, 'RU_3FSERA7ISLHD17VQA', '2023-05-26 13:15:57', '98 Hoàng Văn Thụ Phường 9 Phú Nhuận', NULL, '', NULL),
(1139, 'RU_3FSERA7ISLHD17VQA', '2023-05-26 13:16:31', 'https://www.youtube.com/watch?v=11H9n1LnK1o', NULL, '', NULL),
(1140, 'RU_3FSERABHWLI45MH4S', '2023-05-26 13:19:47', 'ádasd', NULL, '', NULL),
(1141, 'RU_3FSERACKGLI4AHMYL', '2023-05-26 15:16:51', NULL, 'create', '', NULL),
(1142, 'RU_3FSERACKGLI4AIG98', '2023-05-26 15:17:29', 'alo sỷ fake', NULL, '', NULL),
(1143, 'RU_3FSERA51SLHVLX6NA', '2023-05-26 15:39:18', '\nA: Chào bạn! Tôi là Tifo-Chatbot. Tôi thấy rằng bạn muốn tỏ tình với người yêu của bạn. Tôi có thể gợi ý cho bạn cách thể hiện tình cảm của bạn. Bạn có thể thể hiện tình cảm của mình bằng cách nhắn tin, gửi quà, hoặc đơn giản là nói ra cảm xúc của bạn. Bạn cũng có thể chia sẻ những kỷ niệm đẹp với người yêu của bạn. Bạn cũng có thể thể hiện sự quan tâm của mình bằng cách làm những việc nhỏ như làm một bữa ăn ngon, hoặc đi dạo chơi cùng nhau. Tôi hy vọng các gợi ý của tôi sẽ giúp bạn. Có thể tôi còn có thể giúp gì nữa', NULL, '', NULL),
(1144, 'RU_3FSERA51SLHVLX6N9', '2023-05-26 15:39:17', 'tỏ tình với tiến', NULL, '', NULL),
(1145, 'RU_3FSERA7ISLHD17VQB', '2023-05-26 16:01:47', NULL, 'image', '', '1685091707681-924194410.gif'),
(1146, 'RU_3FSERA7ISLHD17VQB', '2023-05-26 16:03:47', NULL, 'image', '', '1685091827089-728135888.jpg'),
(1163, 'RU_3FSERA7ISLHD17VQB', '2023-05-27 13:05:52', 'alo', NULL, '', NULL),
(1198, 'RU_3FSERA7ISLHD17VQB', '2023-05-27 15:05:27', 'alo sỷ', NULL, '', NULL),
(1205, 'RU_3FSERA7ISLHD17VQB', '2023-05-27 15:43:32', 'chảnh rứa', NULL, '', NULL),
(1206, 'RU_3FSERAD4CLI6V1Q1N', '2023-05-28 10:27:53', NULL, 'create', '', NULL),
(1207, 'RU_3FSERACHSLIAE2MZT', '2023-05-30 21:43:47', NULL, 'create', '', NULL),
(1212, 'RU_3FSERA7ISLHD17VQB', '2023-05-31 16:37:18', NULL, 'image', '', '1685525838736-811431379.jpeg'),
(1213, 'RU_3FSERA7ISLHD17VQB', '2023-05-31 16:37:26', 'xin chào', NULL, '', NULL),
(1217, 'RU_3FSERADWLICRDAL9', '2023-06-01 13:31:32', NULL, 'create', '', NULL),
(1233, 'RU_3FSERA7ISLHD17VQB', '2023-06-05 15:59:26', 'alo sỷ', NULL, NULL, NULL),
(1234, 'RU_3FSERA7ISLHD17VQA', '2023-06-05 15:59:32', 'có gì k ', NULL, NULL, NULL),
(1235, 'RU_3FSERA7ISLHD17VQB', '2023-06-05 15:59:44', NULL, 'image', NULL, '1685955584952-224249891.jpg'),
(1236, 'RU_3FSERA9JCLHUJP707', '2023-06-05 16:00:09', 'hey ace', NULL, NULL, NULL),
(1255, 'RU_3FSERA6UKLIIMW1H4', '2023-06-05 16:12:45', NULL, 'create', NULL, NULL),
(1256, 'RU_3FSERA6UKLIIMW1H5', '2023-06-05 16:13:09', 'Xin chào! Rất vui được gặp bạn! Có thể bạn có thể giới thiệu về bản thân mình không? Tôi là Tifo Chatbot.', NULL, NULL, NULL),
(1257, 'RU_3FSERA6UKLIIMW1H4', '2023-06-05 16:13:08', 'xin chào', NULL, NULL, NULL),
(1260, 'RU_3FSERA6UKLIIMW1H5', '2023-06-05 21:07:58', 'Tôi là Tifo Chatbot. Rất vui được gặp bạn!', NULL, NULL, NULL),
(1261, 'RU_3FSERA6UKLIIMW1H4', '2023-06-05 21:07:57', 'bạn tên gì', NULL, NULL, NULL),
(1262, 'RU_3FSERA7ISLHD17VQB', '2023-06-05 21:08:12', 'hey sỷ. khỏe hông', NULL, NULL, NULL),
(1263, 'RU_3FSERA7ISLHD17VQA', '2023-06-05 21:08:29', 'khỏe', NULL, NULL, NULL),
(1264, 'RU_3FSERA7ISLHD17VQB', '2023-06-05 21:08:38', NULL, 'image', NULL, '1685974118981-432204874.jpg'),
(1268, 'RU_3FSERA6UKLIIMW1H5', '2023-06-06 11:08:05', 'Xin chào Thiên! Rất vui được gặp bạn! Bạn có thể chia sẻ với tôi thêm thông tin về bản thân bạn không?', NULL, NULL, NULL),
(1269, 'RU_3FSERA6UKLIIMW1H4', '2023-06-06 11:08:04', 'tôi tên là thiên', NULL, NULL, NULL),
(1270, 'RU_3FSERA7ISLHD17VQB', '2023-06-06 11:08:13', 'hú sỷ', NULL, NULL, NULL),
(1271, 'RU_3FSERA7ISLHD17VQA', '2023-06-06 11:08:27', 'có chi không thiên', NULL, NULL, NULL),
(1272, 'RU_3FSERA7ISLHD17VQB', '2023-06-06 11:08:43', NULL, 'image', NULL, '1686024523019-703471394.jpg'),
(1276, 'RU_3FSERA7ISLHD17VQA', '2023-06-07 08:12:12', '.', NULL, NULL, NULL),
(1277, 'RU_3FSERA6UKLIIMW1H5', '2023-06-10 10:19:08', 'Xin chào! Rất vui được gặp bạn! Có thể bạn có thể giới thiệu về bản thân mình không? Tôi là Tifo Chatbot.', NULL, NULL, NULL),
(1278, 'RU_3FSERA6UKLIIMW1H4', '2023-06-10 10:19:07', 'xin chào', NULL, NULL, NULL),
(1279, 'RU_3FSERA7ISLHD17VQB', '2023-06-10 10:19:13', 'ok', NULL, NULL, NULL),
(1280, 'RU_3FSERA7ISLHD17VQA', '2023-06-10 10:19:23', 'khỏe ', NULL, NULL, NULL),
(1281, 'RU_3FSERA7ISLHD17VQB', '2023-06-10 10:19:28', NULL, 'image', NULL, '1686367168744-194444583.jpg'),
(1285, 'RU_3FSERA6UKLIIMW1H5', '2023-06-10 21:54:29', 'Tôi là Tifo Chatbot. Rất vui được gặp bạn! Có thể bạn có thể giới thiệu về bản thân mình không?', NULL, NULL, NULL),
(1286, 'RU_3FSERA6UKLIIMW1H4', '2023-06-10 21:54:28', 'xin chào', NULL, NULL, NULL),
(1287, 'RU_3FSERA7ISLHD17VQB', '2023-06-10 21:54:40', 'heloo', NULL, NULL, NULL),
(1288, 'RU_3FSERA7ISLHD17VQA', '2023-06-10 21:54:52', 'có gì k', NULL, NULL, NULL),
(1289, 'RU_3FSERA7ISLHD17VQB', '2023-06-10 21:54:59', NULL, 'image', NULL, '1686408899223-825872507.png');

--
-- Triggers `chat`
--
DELIMITER $$
CREATE TRIGGER `chat_copy_trigger` AFTER INSERT ON `chat` FOR EACH ROW BEGIN
    DECLARE done INT DEFAULT FALSE;
    DECLARE id_user VARCHAR(50);
    DECLARE room_user_cursor CURSOR FOR (SELECT `user_room`.id_user 
                                        FROM `user_room`
                                        INNER JOIN (SELECT id_room FROM `user_room` WHERE 												id_user_room = NEW.id_user_room) as roomLimit
                                        ON roomLimit.id_room = `user_room`.id_room);
	DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;
    OPEN room_user_cursor;
    user_loop: LOOP
        FETCH room_user_cursor INTO id_user;
        IF done THEN
            LEAVE user_loop;
        END IF;
        INSERT INTO chat_copy (id_user, id_chat) VALUES (id_user, NEW.id_chat);
    END LOOP;
    CLOSE room_user_cursor;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `chat_copy`
--

CREATE TABLE `chat_copy` (
  `id_chat_copy` int(11) NOT NULL,
  `id_user` varchar(50) DEFAULT NULL,
  `id_chat` int(11) DEFAULT NULL,
  `is_seen` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `chat_copy`
--

INSERT INTO `chat_copy` (`id_chat_copy`, `id_user`, `id_chat`, `is_seen`) VALUES
(506, 'USER_3FSERA2MGLEWOAK2I', NULL, 0),
(507, 'USER_3FSERABRKLGGAEPGS', NULL, 0),
(510, 'USER_3FSERAA9WLEOIEWG5', 690, 0),
(511, 'USER_3FSERA2MGLEWODXGU', 690, 0),
(512, 'USER_3FSERA2MGLEWOCMNF', 690, 0),
(513, 'USER_3FSERAASKLGDXHW2Q', 690, 0),
(514, 'USER_3FSERA2MGLEWOAK2I', 690, 0),
(515, 'USER_3FSERAA9WLEOIEWG5', 691, 0),
(516, 'USER_3FSERA2MGLEWODXGU', 691, 0),
(517, 'USER_3FSERA2MGLEWOCMNF', 691, 0),
(518, 'USER_3FSERAASKLGDXHW2Q', 691, 0),
(519, 'USER_3FSERA2MGLEWOAK2I', 691, 0),
(520, 'USER_3FSERAASKLGDX7FR3', 691, 0),
(521, 'USER_3FSERAA9WLEOIEWG5', 692, 0),
(522, 'USER_3FSERA2MGLEWODXGU', 692, 0),
(523, 'USER_3FSERA2MGLEWOCMNF', 692, 0),
(524, 'USER_3FSERAASKLGDXHW2Q', 692, 0),
(525, 'USER_3FSERA2MGLEWOAK2I', 692, 0),
(526, 'USER_3FSERAA9WLEOIEWG5', NULL, 0),
(527, 'USER_3FSERABRKLGGAEPGS', NULL, 0),
(528, 'USER_3FSERAA9WLEOIEWG5', 694, 0),
(529, 'USER_3FSERA2MGLEWODXGU', 694, 0),
(530, 'USER_3FSERAASKLGDXHW2Q', 694, 0),
(531, 'USER_3FSERA2MGLEWOAK2I', 694, 0),
(532, 'USER_3FSERAA9WLEOIEWG5', 695, 0),
(533, 'USER_3FSERAASKLGDXHW2Q', 695, 0),
(534, 'USER_3FSERA2MGLEWOAK2I', 695, 0),
(535, 'USER_3FSERA2MGLEWODXGU', 696, 0),
(536, 'USER_3FSERAA9WLEOIEWG5', 696, 0),
(537, 'USER_3FSERAASKLGDXHW2Q', 696, 0),
(538, 'USER_3FSERA2MGLEWOAK2I', 696, 0),
(539, 'USER_3FSERAA9WLEOIEWG5', 697, 0),
(540, 'USER_3FSERAASKLGDXHW2Q', 697, 0),
(541, 'USER_3FSERA2MGLEWOAK2I', 697, 0),
(542, 'USER_3FSERAA9WLEOIEWG5', 698, 0),
(543, 'USER_3FSERA2MGLEWOAK2I', 698, 0),
(544, 'USER_3FSERA2MGLEWODXGU', 699, 0),
(545, 'USER_3FSERA2MGLEWOCMNF', 699, 0),
(546, 'USER_3FSERAA9WLEOIEWG5', 699, 0),
(547, 'USER_3FSERA2MGLEWOAK2I', 699, 0),
(548, 'USER_3FSERA2MGLEWODXGU', 700, 0),
(549, 'USER_3FSERA2MGLEWOCMNF', 700, 0),
(550, 'USER_3FSERAA9WLEOIEWG5', 700, 0),
(551, 'USER_3FSERA2MGLEWOAK2I', 700, 0),
(552, 'USER_3FSERA2MGLEWODXGU', 701, 0),
(553, 'USER_3FSERA2MGLEWOCMNF', 701, 0),
(554, 'USER_3FSERA2MGLEWOAK2I', 701, 0),
(555, 'USER_3FSERA2MGLEWOCMNF', 702, 0),
(556, 'USER_3FSERA2MGLEWOAK2I', 702, 0),
(557, 'USER_3FSERA2MGLEWOCMNF', 703, 0),
(558, 'USER_3FSERA2MGLEWOAK2I', 703, 0),
(559, 'USER_3FSERA2MGLEWOCMNF', 704, 0),
(560, 'USER_3FSERAA9WLEOIEWG5', 704, 0),
(561, 'USER_3FSERA2MGLEWOAK2I', 704, 0),
(562, 'USER_3FSERA2MGLEWOCMNF', 705, 0),
(563, 'USER_3FSERAA9WLEOIEWG5', 705, 0),
(564, 'USER_3FSERA2MGLEWODXGU', 705, 0),
(565, 'USER_3FSERAASKLGDX7FR3', 705, 0),
(566, 'USER_3FSERA2MGLEWOAK2I', 705, 0),
(567, 'USER_3FSERA2MGLEWOCMNF', 706, 0),
(568, 'USER_3FSERAA9WLEOIEWG5', 706, 0),
(569, 'USER_3FSERA2MGLEWODXGU', 706, 0),
(570, 'USER_3FSERAASKLGDX7FR3', 706, 0),
(571, 'USER_3FSERA2MGLEWOAK2I', 706, 0),
(572, 'USER_3FSERAA9WLEOIEWG5', 707, 0),
(573, 'USER_3FSERA2MGLEWODXGU', 707, 0),
(574, 'USER_3FSERAASKLGDX7FR3', 707, 0),
(575, 'USER_3FSERA2MGLEWOAK2I', 707, 0),
(576, 'USER_3FSERAA9WLEOIEWG5', 708, 0),
(577, 'USER_3FSERA2MGLEWODXGU', 708, 0),
(578, 'USER_3FSERA2MGLEWOAK2I', 708, 0),
(579, 'USER_3FSERAA9WLEOIEWG5', 709, 0),
(580, 'USER_3FSERA2MGLEWODXGU', 709, 0),
(581, 'USER_3FSERA2MGLEWOCMNF', 709, 0),
(582, 'USER_3FSERAASKLGDXHW2Q', 709, 0),
(583, 'USER_3FSERACH4LERDMQYF', 709, 0),
(584, 'USER_3FSERA2MGLEWOAK2I', 709, 0),
(585, 'USER_3FSERAA9WLEOIEWG5', 710, 0),
(586, 'USER_3FSERA2MGLEWODXGU', 710, 0),
(587, 'USER_3FSERA2MGLEWOCMNF', 710, 0),
(588, 'USER_3FSERAASKLGDXHW2Q', 710, 0),
(589, 'USER_3FSERACH4LERDMQYF', 710, 0),
(590, 'USER_3FSERA2MGLEWOAK2I', 710, 0),
(591, 'USER_3FSERAA9WLEOIEWG5', 711, 0),
(592, 'USER_3FSERA2MGLEWODXGU', 711, 0),
(593, 'USER_3FSERA2MGLEWOCMNF', 711, 0),
(594, 'USER_3FSERAASKLGDXHW2Q', 711, 0),
(595, 'USER_3FSERACH4LERDMQYF', 711, 0),
(596, 'USER_3FSERA2MGLEWOAK2I', 711, 0),
(597, 'USER_3FSERAA9WLEOIEWG5', 712, 0),
(598, 'USER_3FSERA2MGLEWODXGU', 712, 0),
(599, 'USER_3FSERA2MGLEWOCMNF', 712, 0),
(600, 'USER_3FSERAASKLGDXHW2Q', 712, 0),
(601, 'USER_3FSERACH4LERDMQYF', 712, 0),
(602, 'USER_3FSERAASKLGDX7FR3', 712, 0),
(603, 'USER_3FSERA2MGLEWOAK2I', 712, 0),
(604, 'USER_3FSERAA9WLEOIEWG5', 713, 0),
(605, 'USER_3FSERA2MGLEWOCMNF', 713, 0),
(606, 'USER_3FSERAASKLGDXHW2Q', 713, 0),
(607, 'USER_3FSERACH4LERDMQYF', 713, 0),
(608, 'USER_3FSERAASKLGDX7FR3', 713, 0),
(609, 'USER_3FSERA2MGLEWOAK2I', 713, 0),
(610, 'USER_3FSERAA9WLEOIEWG5', 714, 0),
(611, 'USER_3FSERA2MGLEWOCMNF', 714, 0),
(612, 'USER_3FSERACH4LERDMQYF', 714, 0),
(613, 'USER_3FSERAASKLGDX7FR3', 714, 0),
(614, 'USER_3FSERA2MGLEWOAK2I', 714, 0),
(615, 'USER_3FSERAA9WLEOIEWG5', 715, 0),
(616, 'USER_3FSERA2MGLEWOCMNF', 715, 0),
(617, 'USER_3FSERACH4LERDMQYF', 715, 0),
(618, 'USER_3FSERAASKLGDX7FR3', 715, 0),
(619, 'USER_3FSERAASKLGDXHW2Q', 715, 0),
(620, 'USER_3FSERA2MGLEWOAK2I', 715, 0),
(621, 'USER_3FSERAA9WLEOIEWG5', 716, 0),
(622, 'USER_3FSERA2MGLEWOCMNF', 716, 0),
(623, 'USER_3FSERACH4LERDMQYF', 716, 0),
(624, 'USER_3FSERAASKLGDX7FR3', 716, 0),
(625, 'USER_3FSERA2MGLEWOAK2I', 716, 0),
(626, 'USER_3FSERAA9WLEOIEWG5', 717, 0),
(627, 'USER_3FSERACH4LERDMQYF', 717, 0),
(628, 'USER_3FSERAASKLGDX7FR3', 717, 0),
(629, 'USER_3FSERA2MGLEWOAK2I', 717, 0),
(630, 'USER_3FSERAA9WLEOIEWG5', 718, 0),
(631, 'USER_3FSERAASKLGDX7FR3', 718, 0),
(632, 'USER_3FSERA2MGLEWOAK2I', 718, 0),
(633, 'USER_3FSERAA9WLEOIEWG5', 719, 0),
(634, 'USER_3FSERAASKLGDX7FR3', 719, 0),
(635, 'USER_3FSERAASKLGDXHW2Q', 719, 0),
(636, 'USER_3FSERA2MGLEWOAK2I', 719, 0),
(637, 'USER_3FSERA2MGLEWOAK2I', NULL, 0),
(638, 'USER_3FSERAASKLGDXHW2Q', NULL, 0),
(639, 'USER_3FSERACH4LERDMQYF', NULL, 0),
(641, 'USER_3FSERA2MGLEWOAK2I', NULL, 0),
(642, 'USER_3FSERAASKLGDXHW2Q', NULL, 0),
(643, 'USER_3FSERACH4LERDMQYF', NULL, 0),
(645, 'USER_3FSERA2MGLEWODXGU', NULL, 0),
(646, 'USER_3FSERA2MGLEWOAK2I', NULL, 0),
(647, 'USER_3FSERAASKLGDXHW2Q', NULL, 0),
(648, 'USER_3FSERACH4LERDMQYF', NULL, 0),
(650, 'USER_3FSERA2MGLEWODXGU', NULL, 0),
(651, 'USER_3FSERA2MGLEWOCMNF', NULL, 0),
(652, 'USER_3FSERA2MGLEWOAK2I', NULL, 0),
(653, 'USER_3FSERAASKLGDXHW2Q', NULL, 0),
(654, 'USER_3FSERACH4LERDMQYF', NULL, 0),
(656, 'USER_3FSERA2MGLEWODXGU', NULL, 0),
(657, 'USER_3FSERA2MGLEWOCMNF', NULL, 0),
(658, 'USER_3FSERAASKLGDX7FR3', NULL, 0),
(659, 'USER_3FSERA2MGLEWOAK2I', NULL, 0),
(660, 'USER_3FSERACH4LERDMQYF', NULL, 0),
(662, 'USER_3FSERA2MGLEWODXGU', NULL, 0),
(663, 'USER_3FSERA2MGLEWOCMNF', NULL, 0),
(664, 'USER_3FSERAASKLGDX7FR3', NULL, 0),
(665, 'USER_3FSERA2MGLEWOAK2I', NULL, 0),
(667, 'USER_3FSERA2MGLEWODXGU', NULL, 0),
(668, 'USER_3FSERA2MGLEWOCMNF', NULL, 0),
(669, 'USER_3FSERAASKLGDX7FR3', NULL, 0),
(670, 'USER_3FSERA2MGLEWOAK2I', NULL, 0),
(672, 'USER_3FSERA2MGLEWOCMNF', NULL, 0),
(673, 'USER_3FSERAASKLGDX7FR3', NULL, 0),
(675, 'USER_3FSERA2MGLEWOCMNF', NULL, 0),
(676, 'USER_3FSERAASKLGDX7FR3', NULL, 0),
(678, 'USER_3FSERA2MGLEWOCMNF', NULL, 0),
(679, 'USER_3FSERAASKLGDX7FR3', NULL, 0),
(680, 'USER_3FSERA2MGLEWOAK2I', NULL, 0),
(682, 'USER_3FSERA2MGLEWOCMNF', NULL, 0),
(683, 'USER_3FSERAASKLGDX7FR3', NULL, 0),
(685, 'USER_3FSERA2MGLEWOCMNF', NULL, 0),
(686, 'USER_3FSERAASKLGDX7FR3', NULL, 0),
(687, 'USER_3FSERA2MGLEWOAK2I', NULL, 0),
(689, 'USER_3FSERA2MGLEWOCMNF', NULL, 0),
(690, 'USER_3FSERAASKLGDX7FR3', NULL, 0),
(692, 'USER_3FSERA2MGLEWOCMNF', NULL, 0),
(693, 'USER_3FSERAASKLGDX7FR3', NULL, 0),
(694, 'USER_3FSERA2MGLEWOAK2I', NULL, 0),
(696, 'USER_3FSERA2MGLEWOCMNF', NULL, 0),
(697, 'USER_3FSERAASKLGDX7FR3', NULL, 0),
(699, 'USER_3FSERA2MGLEWOCMNF', NULL, 0),
(700, 'USER_3FSERAASKLGDX7FR3', NULL, 0),
(701, 'USER_3FSERA2MGLEWOAK2I', NULL, 0),
(703, 'USER_3FSERA2MGLEWOCMNF', NULL, 0),
(704, 'USER_3FSERAASKLGDX7FR3', NULL, 0),
(706, 'USER_3FSERA2MGLEWOCMNF', NULL, 0),
(707, 'USER_3FSERAASKLGDX7FR3', NULL, 0),
(708, 'USER_3FSERA2MGLEWOAK2I', NULL, 0),
(710, 'USER_3FSERA2MGLEWOCMNF', NULL, 0),
(711, 'USER_3FSERAASKLGDX7FR3', NULL, 0),
(713, 'USER_3FSERA2MGLEWOCMNF', NULL, 0),
(714, 'USER_3FSERAASKLGDX7FR3', NULL, 0),
(715, 'USER_3FSERA2MGLEWOAK2I', NULL, 0),
(717, 'USER_3FSERA2MGLEWOCMNF', NULL, 0),
(718, 'USER_3FSERAASKLGDX7FR3', NULL, 0),
(719, 'USER_3FSERAA9WLEOIEWG5', NULL, 0),
(720, 'USER_3FSERACH4LERDMQYF', NULL, 0),
(721, 'USER_3FSERA2MGLEWOAK2I', NULL, 0),
(722, 'USER_3FSERAA9WLEOIEWG5', NULL, 0),
(723, 'USER_3FSERACH4LERDMQYF', NULL, 0),
(724, 'USER_3FSERA2MGLEWOAK2I', NULL, 0),
(725, 'USER_3FSERA2MGLEWOAK2I', NULL, 0),
(726, 'USER_3FSERACH4LERDMQYF', NULL, 0),
(727, 'USER_3FSERA214LHD9H2NX', NULL, 0),
(728, 'USER_3FSERABRKLGGAEPGS', NULL, 0),
(729, 'USER_3FSERA214LHD9H2NX', NULL, 0),
(730, 'USER_3FSERA2MGLEWOAK2I', NULL, 0),
(731, 'USER_3FSERA214LHD9H2NX', NULL, 0),
(732, 'USER_3FSERA2MGLEWOAK2I', NULL, 0),
(733, 'USER_3FSERA214LHD9H2NX', NULL, 0),
(734, 'USER_3FSERA2MGLEWODXGU', NULL, 0),
(735, 'USER_3FSERA214LHD9H2NX', NULL, 0),
(736, 'USER_3FSERA2MGLEWOAK2I', NULL, 0),
(737, 'USER_3FSERA2MGLEWODXGU', NULL, 0),
(738, 'USER_3FSERABRKLGGAEPGS', NULL, 0),
(739, 'USER_3FSERA214LHD9H2NX', NULL, 0),
(740, 'USER_3FSERA2MGLEWODXGU', NULL, 0),
(741, 'USER_3FSERA214LHD9H2NX', NULL, 0),
(742, 'USER_3FSERA2MGLEWODXGU', NULL, 0),
(743, 'USER_3FSERA214LHD9XTSH', NULL, 0),
(744, 'USER_3FSERABRKLGGAEPGS', NULL, 0),
(745, 'USER_3FSERAA9WLEOIEWG5', 752, 0),
(746, 'USER_3FSERAASKLGDX7FR3', 752, 0),
(747, 'USER_3FSERAASKLGDXHW2Q', 752, 0),
(748, 'USER_3FSERA2MGLEWOAK2I', 752, 0),
(749, 'USER_3FSERA2MGLEWODXGU', 752, 0),
(750, 'USER_3FSERAA9WLEOIEWG5', 753, 0),
(751, 'USER_3FSERAASKLGDX7FR3', 753, 0),
(752, 'USER_3FSERAASKLGDXHW2Q', 753, 0),
(753, 'USER_3FSERA2MGLEWOAK2I', 753, 0),
(754, 'USER_3FSERAA9WLEOIEWG5', 754, 0),
(755, 'USER_3FSERAASKLGDX7FR3', 754, 0),
(756, 'USER_3FSERAASKLGDXHW2Q', 754, 0),
(757, 'USER_3FSERA2MGLEWOAK2I', 754, 0),
(758, 'USER_3FSERA2MGLEWODXGU', 754, 0),
(759, 'USER_3FSERAA9WLEOIEWG5', 755, 0),
(760, 'USER_3FSERAASKLGDX7FR3', 755, 0),
(761, 'USER_3FSERAASKLGDXHW2Q', 755, 0),
(762, 'USER_3FSERA2MGLEWOAK2I', 755, 0),
(763, 'USER_3FSERAA9WLEOIEWG5', 756, 0),
(764, 'USER_3FSERAASKLGDX7FR3', 756, 0),
(765, 'USER_3FSERAASKLGDXHW2Q', 756, 0),
(766, 'USER_3FSERA2MGLEWOAK2I', 756, 0),
(767, 'USER_3FSERAA9WLEOIEWG5', 757, 0),
(768, 'USER_3FSERAASKLGDX7FR3', 757, 0),
(769, 'USER_3FSERAASKLGDXHW2Q', 757, 0),
(770, 'USER_3FSERA2MGLEWOAK2I', 757, 0),
(771, 'USER_3FSERA2MGLEWODXGU', 757, 0),
(772, 'USER_3FSERA214LHD9H2NX', 757, 0),
(773, 'USER_3FSERAA9WLEOIEWG5', 758, 0),
(774, 'USER_3FSERAASKLGDX7FR3', 758, 0),
(775, 'USER_3FSERAASKLGDXHW2Q', 758, 0),
(776, 'USER_3FSERA2MGLEWOAK2I', 758, 0),
(777, 'USER_3FSERA2MGLEWODXGU', 758, 0),
(778, 'USER_3FSERA214LHD9H2NX', 758, 0),
(779, 'USER_3FSERAA9WLEOIEWG5', 759, 0),
(780, 'USER_3FSERAASKLGDX7FR3', 759, 0),
(781, 'USER_3FSERAASKLGDXHW2Q', 759, 0),
(782, 'USER_3FSERA2MGLEWOAK2I', 759, 0),
(783, 'USER_3FSERA214LHD9H2NX', 759, 0),
(784, 'USER_3FSERA2MGLEWOAK2I', 760, 0),
(785, 'USER_3FSERA214LHD9XTSH', 760, 0),
(786, 'USER_3FSERAASKLGDX7FR3', 761, 0),
(787, 'USER_3FSERAASKLGDXHW2Q', 761, 0),
(788, 'USER_3FSERA2MGLEWOAK2I', 761, 0),
(789, 'USER_3FSERAA9WLEOIEWG5', 761, 0),
(790, 'USER_3FSERA214LHD9H2NX', 761, 0),
(791, 'USER_3FSERAASKLGDX7FR3', 762, 0),
(792, 'USER_3FSERA2MGLEWOAK2I', 762, 0),
(793, 'USER_3FSERA214LHD9H2NX', 762, 0),
(794, 'USER_3FSERAASKLGDX7FR3', 763, 0),
(795, 'USER_3FSERA2MGLEWOAK2I', 763, 0),
(796, 'USER_3FSERAA9WLEOIEWG5', 763, 0),
(797, 'USER_3FSERA214LHD9H2NX', 763, 0),
(798, 'USER_3FSERAASKLGDX7FR3', 764, 0),
(799, 'USER_3FSERA2MGLEWOAK2I', 764, 0),
(800, 'USER_3FSERAA9WLEOIEWG5', 764, 0),
(801, 'USER_3FSERA2MGLEWODXGU', 764, 0),
(802, 'USER_3FSERA214LHD9H2NX', 764, 0),
(803, 'USER_3FSERAASKLGDX7FR3', 765, 0),
(804, 'USER_3FSERA2MGLEWOAK2I', 765, 0),
(805, 'USER_3FSERAA9WLEOIEWG5', 765, 0),
(806, 'USER_3FSERA2MGLEWODXGU', 765, 0),
(807, 'USER_3FSERA214LHD9H2NX', 765, 0),
(808, 'USER_3FSERAASKLGDX7FR3', 766, 0),
(809, 'USER_3FSERA2MGLEWOAK2I', 766, 0),
(810, 'USER_3FSERAA9WLEOIEWG5', 766, 0),
(811, 'USER_3FSERA214LHD9H2NX', 766, 0),
(812, 'USER_3FSERA2MGLEWOCMNF', NULL, 0),
(813, 'USER_3FSERABRKLGGAEPGS', NULL, 0),
(814, 'USER_3FSERAASKLGDX7FR3', NULL, 0),
(815, 'USER_3FSERABRKLGGAEPGS', NULL, 0),
(816, 'USER_3FSERAASKLGDX7FR3', 769, 0),
(817, 'USER_3FSERA2MGLEWOAK2I', 769, 0),
(818, 'USER_3FSERA214LHD9H2NX', 769, 0),
(820, 'USER_3FSERA2MGLEWOCMNF', NULL, 0),
(821, 'USER_3FSERAASKLGDX7FR3', NULL, 0),
(822, 'USER_3FSERA2MGLEWOAK2I', NULL, 0),
(824, 'USER_3FSERA2MGLEWOCMNF', NULL, 0),
(825, 'USER_3FSERAASKLGDX7FR3', NULL, 0),
(826, 'USER_3FSERA2MGLEWOAK2I', NULL, 0),
(827, 'USER_3FSERA2MGLEWOAK2I', NULL, 0),
(829, 'USER_3FSERA2MGLEWOCMNF', NULL, 0),
(830, 'USER_3FSERAASKLGDX7FR3', NULL, 0),
(831, 'USER_3FSERA2MGLEWOAK2I', NULL, 0),
(833, 'USER_3FSERA2MGLEWOCMNF', NULL, 0),
(834, 'USER_3FSERAASKLGDX7FR3', NULL, 0),
(835, 'USER_3FSERA2MGLEWOAK2I', NULL, 0),
(837, 'USER_3FSERA2MGLEWOCMNF', NULL, 0),
(838, 'USER_3FSERAASKLGDX7FR3', NULL, 0),
(839, 'USER_3FSERA2MGLEWOAK2I', NULL, 0),
(841, 'USER_3FSERA2MGLEWOCMNF', NULL, 0),
(842, 'USER_3FSERAASKLGDX7FR3', NULL, 0),
(843, 'USER_3FSERA2MGLEWOAK2I', NULL, 0),
(845, 'USER_3FSERA2MGLEWOCMNF', NULL, 0),
(846, 'USER_3FSERAASKLGDX7FR3', NULL, 0),
(848, 'USER_3FSERA2MGLEWOCMNF', NULL, 0),
(849, 'USER_3FSERAASKLGDX7FR3', NULL, 0),
(850, 'USER_3FSERA2MGLEWOAK2I', NULL, 0),
(851, 'USER_3FSERA2MGLEWOAK2I', 778, 0),
(852, 'USER_3FSERAASKLGDXHW2Q', 778, 0),
(853, 'USER_3FSERAA9WLEOIEWG5', 778, 0),
(854, 'USER_3FSERA214LHD9H2NX', 778, 0),
(855, 'USER_3FSERA2MGLEWOAK2I', 779, 0),
(856, 'USER_3FSERAASKLGDXHW2Q', 779, 0),
(857, 'USER_3FSERAA9WLEOIEWG5', 779, 0),
(858, 'USER_3FSERA214LHD9H2NX', 779, 0),
(859, 'USER_3FSERA2MGLEWOAK2I', 780, 0),
(860, 'USER_3FSERAASKLGDXHW2Q', 780, 0),
(861, 'USER_3FSERAA9WLEOIEWG5', 780, 0),
(862, 'USER_3FSERA214LHD9H2NX', 780, 0),
(863, 'USER_3FSERA2MGLEWOAK2I', 781, 0),
(864, 'USER_3FSERAASKLGDXHW2Q', 781, 0),
(865, 'USER_3FSERAA9WLEOIEWG5', 781, 0),
(866, 'USER_3FSERA214LHD9H2NX', 781, 0),
(867, 'USER_3FSERA2MGLEWOAK2I', 782, 0),
(868, 'USER_3FSERAASKLGDXHW2Q', 782, 0),
(869, 'USER_3FSERAA9WLEOIEWG5', 782, 0),
(870, 'USER_3FSERA214LHD9H2NX', 782, 0),
(871, 'USER_3FSERA2MGLEWOAK2I', 783, 0),
(872, 'USER_3FSERAASKLGDXHW2Q', 783, 0),
(873, 'USER_3FSERAA9WLEOIEWG5', 783, 0),
(874, 'USER_3FSERA214LHD9H2NX', 783, 0),
(875, 'USER_3FSERA2MGLEWOAK2I', 784, 0),
(876, 'USER_3FSERAA9WLEOIEWG5', 784, 0),
(877, 'USER_3FSERAASKLGDXHW2Q', 784, 0),
(878, 'USER_3FSERA214LHD9H2NX', 784, 0),
(879, 'USER_3FSERA2MGLEWOAK2I', 785, 0),
(880, 'USER_3FSERAA9WLEOIEWG5', 785, 0),
(881, 'USER_3FSERAASKLGDXHW2Q', 785, 0),
(882, 'USER_3FSERA214LHD9H2NX', 785, 0),
(883, 'USER_3FSERA2MGLEWOAK2I', 786, 0),
(884, 'USER_3FSERAASKLGDXHW2Q', 786, 0),
(885, 'USER_3FSERA214LHD9H2NX', 786, 0),
(886, 'USER_3FSERA2MGLEWOAK2I', 787, 0),
(887, 'USER_3FSERAA9WLEOIEWG5', 787, 0),
(888, 'USER_3FSERAASKLGDXHW2Q', 787, 0),
(889, 'USER_3FSERA214LHD9H2NX', 787, 0),
(890, 'USER_3FSERA2MGLEWOAK2I', 788, 0),
(891, 'USER_3FSERAASKLGDXHW2Q', 788, 0),
(892, 'USER_3FSERA214LHD9H2NX', 788, 0),
(893, 'USER_3FSERA2MGLEWOAK2I', 789, 0),
(894, 'USER_3FSERAA9WLEOIEWG5', 789, 0),
(895, 'USER_3FSERA2MGLEWODXGU', 789, 0),
(896, 'USER_3FSERAASKLGDXHW2Q', 789, 0),
(897, 'USER_3FSERA214LHD9H2NX', 789, 0),
(898, 'USER_3FSERA2MGLEWOAK2I', 790, 0),
(899, 'USER_3FSERAA9WLEOIEWG5', 790, 0),
(900, 'USER_3FSERA2MGLEWODXGU', 790, 0),
(901, 'USER_3FSERAASKLGDXHW2Q', 790, 0),
(902, 'USER_3FSERA214LHD9H2NX', 790, 0),
(903, 'USER_3FSERA2MGLEWOAK2I', 791, 0),
(904, 'USER_3FSERAA9WLEOIEWG5', 791, 0),
(905, 'USER_3FSERAASKLGDXHW2Q', 791, 0),
(906, 'USER_3FSERA214LHD9H2NX', 791, 0),
(907, 'USER_3FSERA2MGLEWOAK2I', 792, 0),
(908, 'USER_3FSERAA9WLEOIEWG5', 792, 0),
(909, 'USER_3FSERA214LHD9H2NX', 792, 0),
(910, 'USER_3FSERA2MGLEWOAK2I', 793, 0),
(911, 'USER_3FSERAA9WLEOIEWG5', 793, 0),
(912, 'USER_3FSERA2MGLEWODXGU', 793, 0),
(913, 'USER_3FSERAASKLGDXHW2Q', 793, 0),
(914, 'USER_3FSERACH4LERDMQYF', 793, 0),
(915, 'USER_3FSERA214LHD9H2NX', 793, 0),
(916, 'USER_3FSERA2MGLEWOAK2I', 794, 0),
(917, 'USER_3FSERAA9WLEOIEWG5', 794, 0),
(918, 'USER_3FSERA2MGLEWODXGU', 794, 0),
(919, 'USER_3FSERAASKLGDXHW2Q', 794, 0),
(920, 'USER_3FSERACH4LERDMQYF', 794, 0),
(921, 'USER_3FSERA214LHD9H2NX', 794, 0),
(922, 'USER_3FSERA2MGLEWOAK2I', 795, 0),
(923, 'USER_3FSERAA9WLEOIEWG5', 795, 0),
(924, 'USER_3FSERA2MGLEWODXGU', 795, 0),
(925, 'USER_3FSERAASKLGDXHW2Q', 795, 0),
(926, 'USER_3FSERACH4LERDMQYF', 795, 0),
(927, 'USER_3FSERA214LHD9H2NX', 795, 0),
(928, 'USER_3FSERA2MGLEWOAK2I', 796, 0),
(929, 'USER_3FSERAA9WLEOIEWG5', 796, 0),
(930, 'USER_3FSERA2MGLEWODXGU', 796, 0),
(931, 'USER_3FSERAASKLGDXHW2Q', 796, 0),
(932, 'USER_3FSERACH4LERDMQYF', 796, 0),
(933, 'USER_3FSERA2MGLEWOCMNF', 796, 0),
(934, 'USER_3FSERA214LHD9XTSH', 796, 0),
(935, 'USER_3FSERA214LHD9H2NX', 796, 0),
(936, 'USER_3FSERA2MGLEWOAK2I', 797, 0),
(937, 'USER_3FSERAA9WLEOIEWG5', 797, 0),
(938, 'USER_3FSERA2MGLEWODXGU', 797, 0),
(939, 'USER_3FSERAASKLGDXHW2Q', 797, 0),
(940, 'USER_3FSERACH4LERDMQYF', 797, 0),
(941, 'USER_3FSERA2MGLEWOCMNF', 797, 0),
(942, 'USER_3FSERA214LHD9XTSH', 797, 0),
(943, 'USER_3FSERA214LHD9H2NX', 797, 0),
(944, 'USER_3FSERA2MGLEWOAK2I', 798, 0),
(945, 'USER_3FSERA2MGLEWODXGU', 798, 0),
(946, 'USER_3FSERAASKLGDXHW2Q', 798, 0),
(947, 'USER_3FSERACH4LERDMQYF', 798, 0),
(948, 'USER_3FSERA2MGLEWOCMNF', 798, 0),
(949, 'USER_3FSERA214LHD9XTSH', 798, 0),
(950, 'USER_3FSERA214LHD9H2NX', 798, 0),
(951, 'USER_3FSERA2MGLEWOAK2I', 799, 0),
(952, 'USER_3FSERA2MGLEWODXGU', 799, 0),
(953, 'USER_3FSERAASKLGDXHW2Q', 799, 0),
(954, 'USER_3FSERACH4LERDMQYF', 799, 0),
(955, 'USER_3FSERA2MGLEWOCMNF', 799, 0),
(956, 'USER_3FSERA214LHD9H2NX', 799, 0),
(957, 'USER_3FSERA2MGLEWOAK2I', 800, 0),
(958, 'USER_3FSERA2MGLEWODXGU', 800, 0),
(959, 'USER_3FSERAASKLGDXHW2Q', 800, 0),
(960, 'USER_3FSERACH4LERDMQYF', 800, 0),
(961, 'USER_3FSERA2MGLEWOCMNF', 800, 0),
(962, 'USER_3FSERAA9WLEOIEWG5', 800, 0),
(963, 'USER_3FSERA214LHD9H2NX', 800, 0),
(964, 'USER_3FSERA214LHD9XTSH', 801, 0),
(965, 'USER_3FSERA2MGLEWOAK2I', 801, 0),
(966, 'USER_3FSERA2MGLEWODXGU', 801, 0),
(967, 'USER_3FSERAASKLGDXHW2Q', 801, 0),
(968, 'USER_3FSERACH4LERDMQYF', 801, 0),
(969, 'USER_3FSERA2MGLEWOCMNF', 801, 0),
(970, 'USER_3FSERAA9WLEOIEWG5', 801, 0),
(971, 'USER_3FSERA214LHD9H2NX', 801, 0),
(972, 'USER_3FSERA2MGLEWOAK2I', 802, 0),
(973, 'USER_3FSERA2MGLEWODXGU', 802, 0),
(974, 'USER_3FSERAASKLGDXHW2Q', 802, 0),
(975, 'USER_3FSERACH4LERDMQYF', 802, 0),
(976, 'USER_3FSERA2MGLEWOCMNF', 802, 0),
(977, 'USER_3FSERAA9WLEOIEWG5', 802, 0),
(978, 'USER_3FSERA214LHD9H2NX', 802, 0),
(979, 'USER_3FSERA214LHD9XTSH', 803, 0),
(980, 'USER_3FSERA2MGLEWOAK2I', 803, 0),
(981, 'USER_3FSERA2MGLEWODXGU', 803, 0),
(982, 'USER_3FSERAASKLGDXHW2Q', 803, 0),
(983, 'USER_3FSERACH4LERDMQYF', 803, 0),
(984, 'USER_3FSERA2MGLEWOCMNF', 803, 0),
(985, 'USER_3FSERAA9WLEOIEWG5', 803, 0),
(986, 'USER_3FSERA214LHD9H2NX', 803, 0),
(987, 'USER_3FSERA2MGLEWOAK2I', 804, 0),
(988, 'USER_3FSERA2MGLEWODXGU', 804, 0),
(989, 'USER_3FSERAASKLGDXHW2Q', 804, 0),
(990, 'USER_3FSERACH4LERDMQYF', 804, 0),
(991, 'USER_3FSERA2MGLEWOCMNF', 804, 0),
(992, 'USER_3FSERAA9WLEOIEWG5', 804, 0),
(993, 'USER_3FSERA214LHD9H2NX', 804, 0),
(994, 'USER_3FSERA2MGLEWOAK2I', 805, 0),
(995, 'USER_3FSERA2MGLEWODXGU', 805, 0),
(996, 'USER_3FSERAASKLGDXHW2Q', 805, 0),
(997, 'USER_3FSERACH4LERDMQYF', 805, 0),
(998, 'USER_3FSERA2MGLEWOCMNF', 805, 0),
(999, 'USER_3FSERA214LHD9XTSH', 805, 0),
(1000, 'USER_3FSERAA9WLEOIEWG5', 805, 0),
(1001, 'USER_3FSERA214LHD9H2NX', 805, 0),
(1002, 'USER_3FSERA2MGLEWOAK2I', 806, 0),
(1003, 'USER_3FSERAASKLGDXHW2Q', 806, 0),
(1004, 'USER_3FSERACH4LERDMQYF', 806, 0),
(1005, 'USER_3FSERA2MGLEWOCMNF', 806, 0),
(1006, 'USER_3FSERA214LHD9XTSH', 806, 0),
(1007, 'USER_3FSERAA9WLEOIEWG5', 806, 0),
(1008, 'USER_3FSERA214LHD9H2NX', 806, 0),
(1009, 'USER_3FSERA2MGLEWOAK2I', 807, 0),
(1010, 'USER_3FSERAASKLGDXHW2Q', 807, 0),
(1011, 'USER_3FSERACH4LERDMQYF', 807, 0),
(1012, 'USER_3FSERA2MGLEWOCMNF', 807, 0),
(1013, 'USER_3FSERA214LHD9XTSH', 807, 0),
(1014, 'USER_3FSERAA9WLEOIEWG5', 807, 0),
(1015, 'USER_3FSERA2MGLEWOAK2I', 808, 0),
(1016, 'USER_3FSERACH4LERDMQYF', 808, 0),
(1017, 'USER_3FSERA2MGLEWOCMNF', 808, 0),
(1018, 'USER_3FSERA214LHD9XTSH', 808, 0),
(1019, 'USER_3FSERAA9WLEOIEWG5', 808, 0),
(1020, 'USER_3FSERA2MGLEWOAK2I', 809, 0),
(1021, 'USER_3FSERACH4LERDMQYF', 809, 0),
(1022, 'USER_3FSERA2MGLEWOCMNF', 809, 0),
(1023, 'USER_3FSERA214LHD9XTSH', 809, 0),
(1024, 'USER_3FSERA2MGLEWOAK2I', 810, 0),
(1025, 'USER_3FSERACH4LERDMQYF', 810, 0),
(1026, 'USER_3FSERA2MGLEWOCMNF', 810, 0),
(1027, 'USER_3FSERA214LHD9XTSH', 810, 0),
(1028, 'USER_3FSERAA9WLEOIEWG5', 810, 0),
(1029, 'USER_3FSERA2MGLEWOAK2I', 811, 0),
(1030, 'USER_3FSERACH4LERDMQYF', 811, 0),
(1031, 'USER_3FSERA2MGLEWOCMNF', 811, 0),
(1032, 'USER_3FSERA214LHD9XTSH', 811, 0),
(1034, 'USER_3FSERA2MGLEWOCMNF', NULL, 0),
(1035, 'USER_3FSERAASKLGDX7FR3', NULL, 0),
(1036, 'USER_3FSERAASKLGDXHW2Q', NULL, 0),
(1037, 'USER_3FSERABRKLGGAEPGS', NULL, 0),
(1038, 'USER_3FSERAASKLGDXHW2Q', 814, 0),
(1040, 'USER_3FSERAASKLGDXHW2Q', 815, 0),
(1043, 'USER_3FSERABRKLGGAEPGS', NULL, 0),
(1044, 'USER_3FSERA9Q0LHIX3ZO8', 817, 0),
(1046, 'USER_3FSERA9Q0LHIX3ZO8', 818, 0),
(1049, 'USER_3FSERAASKLGDXHW2Q', 819, 0),
(1052, 'USER_3FSERAASKLGDXHW2Q', NULL, 0),
(1053, 'USER_3FSERAA9WLEOIEWG5', NULL, 0),
(1055, 'USER_3FSERAASKLGDXHW2Q', 821, 0),
(1057, 'USER_3FSERA9Q0LHIX3ZO8', 822, 0),
(1058, 'USER_3FSERAASKLGDXHW2Q', 822, 0),
(1060, 'USER_3FSERA9Q0LHIX3ZO8', NULL, 0),
(1061, 'USER_3FSERAASKLGDXHW2Q', NULL, 0),
(1062, 'USER_3FSERAA9WLEOIEWG5', NULL, 0),
(1063, 'USER_3FSERA9Q0LHIX3ZO8', NULL, 0),
(1064, 'USER_3FSERAASKLGDXHW2Q', NULL, 0),
(1065, 'USER_3FSERAA9WLEOIEWG5', NULL, 0),
(1066, 'USER_3FSERA9Q0LHIX3ZO8', NULL, 0),
(1067, 'USER_3FSERAASKLGDXHW2Q', NULL, 0),
(1068, 'USER_3FSERAA9WLEOIEWG5', NULL, 0),
(1069, 'USER_3FSERA9Q0LHIX3ZO8', 826, 0),
(1071, 'USER_3FSERA9Q0LHIX3ZO8', 827, 0),
(1073, 'USER_3FSERAASKLGDXHW2Q', 827, 0),
(1074, 'USER_3FSERA9Q0LHIX3ZO8', 828, 0),
(1076, 'USER_3FSERAASKLGDXHW2Q', 828, 0),
(1077, 'USER_3FSERA9Q0LHIX3ZO8', 829, 0),
(1079, 'USER_3FSERAASKLGDXHW2Q', 829, 0),
(1080, 'USER_3FSERA9Q0LHIX3ZO8', 830, 0),
(1082, 'USER_3FSERAASKLGDXHW2Q', 830, 0),
(1083, 'USER_3FSERA9Q0LHIX3ZO8', NULL, 0),
(1084, 'USER_3FSERAA9WLEOIEWG5', NULL, 0),
(1085, 'USER_3FSERAASKLGDXHW2Q', NULL, 0),
(1086, 'USER_3FSERA9Q0LHIX3ZO8', 832, 0),
(1088, 'USER_3FSERAASKLGDXHW2Q', 832, 0),
(1089, 'USER_3FSERA9Q0LHIX3ZO8', 833, 0),
(1091, 'USER_3FSERAASKLGDXHW2Q', 833, 0),
(1092, 'USER_3FSERACH4LERDMQYF', 833, 0),
(1094, 'USER_3FSERAASKLGDXHW2Q', 834, 0),
(1095, 'USER_3FSERACH4LERDMQYF', 834, 0),
(1097, 'USER_3FSERAASKLGDXHW2Q', 835, 0),
(1098, 'USER_3FSERACH4LERDMQYF', 835, 0),
(1099, 'USER_3FSERA9Q0LHIX3ZO8', 835, 0),
(1100, 'USER_3FSERAA9WLEOIEWG5', NULL, 0),
(1101, 'USER_3FSERABRKLGGAEPGS', NULL, 0),
(1102, 'USER_3FSERAA9WLEOIEWG5', NULL, 0),
(1103, 'USER_3FSERABRKLGGAEPGS', NULL, 0),
(1104, 'USER_3FSERA9Q0LHIX3ZO8', NULL, 0),
(1105, 'USER_3FSERABRKLGGAEPGS', NULL, 0),
(1106, 'USER_3FSERA9Q0LHIX3ZO8', NULL, 0),
(1107, 'USER_3FSERABRKLGGAEPGS', NULL, 0),
(1108, 'USER_3FSERA9Q0LHIX3ZO8', NULL, 0),
(1109, 'USER_3FSERABRKLGGAEPGS', NULL, 0),
(1110, 'USER_3FSERA9Q0LHIX3ZO8', NULL, 0),
(1111, 'USER_3FSERABRKLGGAEPGS', NULL, 0),
(1112, 'USER_3FSERA9Q0LHIX3ZO8', NULL, 0),
(1113, 'USER_3FSERABRKLGGAEPGS', NULL, 0),
(1114, 'USER_3FSERA9Q0LHIX3ZO8', NULL, 0),
(1115, 'USER_3FSERABRKLGGAEPGS', NULL, 0),
(1116, 'USER_3FSERAASKLGDXHW2Q', NULL, 0),
(1117, 'USER_3FSERABRKLGGAEPGS', NULL, 0),
(1118, 'USER_3FSERAASKLGDXHW2Q', NULL, 0),
(1119, 'USER_3FSERABRKLGGAEPGS', NULL, 0),
(1120, 'USER_3FSERA9Q0LHIX3ZO8', NULL, 0),
(1121, 'USER_3FSERABRKLGGAEPGS', NULL, 0),
(1122, 'USER_3FSERA9Q0LHIX3ZO8', NULL, 0),
(1123, 'USER_3FSERABRKLGGAEPGS', NULL, 0),
(1124, 'USER_3FSERA9Q0LHIX3ZO8', NULL, 0),
(1125, 'USER_3FSERABRKLGGAEPGS', NULL, 0),
(1126, 'USER_3FSERA9Q0LHIX3ZO8', NULL, 0),
(1127, 'USER_3FSERABRKLGGAEPGS', NULL, 0),
(1128, 'USER_3FSERA9Q0LHIX3ZO8', NULL, 0),
(1129, 'USER_3FSERABRKLGGAEPGS', NULL, 0),
(1130, 'USER_3FSERA9Q0LHIX3ZO8', NULL, 0),
(1131, 'USER_3FSERABRKLGGAEPGS', NULL, 0),
(1132, 'USER_3FSERAASKLGDXHW2Q', NULL, 0),
(1133, 'USER_3FSERABRKLGGAEPGS', NULL, 0),
(1134, 'USER_3FSERAASKLGDXHW2Q', NULL, 0),
(1135, 'USER_3FSERABRKLGGAEPGS', NULL, 0),
(1136, 'USER_3FSERAASKLGDXHW2Q', NULL, 0),
(1137, 'USER_3FSERABRKLGGAEPGS', NULL, 0),
(1138, 'USER_3FSERAASKLGDXHW2Q', NULL, 0),
(1139, 'USER_3FSERABRKLGGAEPGS', NULL, 0),
(1140, 'USER_3FSERA9Q0LHIX3ZO8', 856, 0),
(1142, 'USER_3FSERAA9WLEOIEWG5', NULL, 0),
(1143, 'USER_3FSERABRKLGGAEPGS', NULL, 0),
(1144, 'USER_3FSERAA9WLEOIEWG5', NULL, 0),
(1145, 'USER_3FSERABRKLGGAEPGS', NULL, 0),
(1146, 'USER_3FSERAA9WLEOIEWG5', NULL, 0),
(1147, 'USER_3FSERABRKLGGAEPGS', NULL, 0),
(1154, 'USER_3FSERAA9WLEOIEWG5', NULL, 0),
(1155, 'USER_3FSERABRKLGGAEPGS', NULL, 0),
(1156, 'USER_3FSERAA9WLEOIEWG5', NULL, 0),
(1157, 'USER_3FSERABRKLGGAEPGS', NULL, 0),
(1158, 'USER_3FSERAA9WLEOIEWG5', NULL, 0),
(1159, 'USER_3FSERABRKLGGAEPGS', NULL, 0),
(1160, 'USER_3FSERAA9WLEOIEWG5', NULL, 0),
(1161, 'USER_3FSERABRKLGGAEPGS', NULL, 0),
(1162, 'USER_3FSERAA9WLEOIEWG5', NULL, 0),
(1163, 'USER_3FSERABRKLGGAEPGS', NULL, 0),
(1164, 'USER_3FSERAA9WLEOIEWG5', NULL, 0),
(1165, 'USER_3FSERABRKLGGAEPGS', NULL, 0),
(1166, 'USER_3FSERAA9WLEOIEWG5', NULL, 0),
(1167, 'USER_3FSERABRKLGGAEPGS', NULL, 0),
(1168, 'USER_3FSERAA9WLEOIEWG5', NULL, 0),
(1169, 'USER_3FSERABRKLGGAEPGS', NULL, 0),
(1170, 'USER_3FSERAA9WLEOIEWG5', NULL, 0),
(1171, 'USER_3FSERABRKLGGAEPGS', NULL, 0),
(1172, 'USER_3FSERAA9WLEOIEWG5', NULL, 0),
(1173, 'USER_3FSERABRKLGGAEPGS', NULL, 0),
(1174, 'USER_3FSERAA9WLEOIEWG5', NULL, 0),
(1175, 'USER_3FSERABRKLGGAEPGS', NULL, 0),
(1176, 'USER_3FSERAA9WLEOIEWG5', NULL, 0),
(1177, 'USER_3FSERABRKLGGAEPGS', NULL, 0),
(1178, 'USER_3FSERAA9WLEOIEWG5', NULL, 0),
(1179, 'USER_3FSERABRKLGGAEPGS', NULL, 0),
(1180, 'USER_3FSERAA9WLEOIEWG5', NULL, 0),
(1181, 'USER_3FSERABRKLGGAEPGS', NULL, 0),
(1182, 'USER_3FSERAA9WLEOIEWG5', NULL, 0),
(1183, 'USER_3FSERABRKLGGAEPGS', NULL, 0),
(1184, 'USER_3FSERAA9WLEOIEWG5', NULL, 0),
(1185, 'USER_3FSERABRKLGGAEPGS', NULL, 0),
(1186, 'USER_3FSERAA9WLEOIEWG5', NULL, 0),
(1187, 'USER_3FSERABRKLGGAEPGS', NULL, 0),
(1188, 'USER_3FSERAA9WLEOIEWG5', NULL, 0),
(1189, 'USER_3FSERABRKLGGAEPGS', NULL, 0),
(1190, 'USER_3FSERAA9WLEOIEWG5', NULL, 0),
(1191, 'USER_3FSERABRKLGGAEPGS', NULL, 0),
(1192, 'USER_3FSERAA9WLEOIEWG5', NULL, 0),
(1193, 'USER_3FSERABRKLGGAEPGS', NULL, 0),
(1194, 'USER_3FSERAA9WLEOIEWG5', NULL, 0),
(1195, 'USER_3FSERABRKLGGAEPGS', NULL, 0),
(1200, 'USER_3FSERAA9WLEOIEWG5', NULL, 0),
(1201, 'USER_3FSERABRKLGGAEPGS', NULL, 0),
(1202, 'USER_3FSERAA9WLEOIEWG5', NULL, 0),
(1203, 'USER_3FSERABRKLGGAEPGS', NULL, 0),
(1205, 'USER_3FSERA214LHD9XTSH', 888, 0),
(1210, 'USER_3FSERAASKLGDXHW2Q', 891, 0),
(1235, 'USER_3FSERA214LHD9H2NX', 903, 0),
(1237, 'USER_3FSERA2MGLEWOCMNF', 904, 0),
(1238, 'USER_3FSERAASKLGDXHW2Q', 905, 0),
(1239, 'USER_3FSERABRKLGGAEPGS', 905, 0),
(1240, 'USER_3FSERAASKLGDXHW2Q', 906, 0),
(1241, 'USER_3FSERABRKLGGAEPGS', 906, 0),
(1242, 'USER_3FSERAASKLGDXHW2Q', 907, 0),
(1243, 'USER_3FSERABRKLGGAEPGS', 907, 0),
(1244, 'USER_3FSERAASKLGDXHW2Q', 908, 0),
(1245, 'USER_3FSERABRKLGGAEPGS', 908, 0),
(1246, 'USER_3FSERAASKLGDXHW2Q', 909, 0),
(1247, 'USER_3FSERABRKLGGAEPGS', 909, 0),
(1248, 'USER_3FSERAASKLGDXHW2Q', 910, 0),
(1249, 'USER_3FSERABRKLGGAEPGS', 910, 0),
(1250, 'USER_3FSERAASKLGDXHW2Q', 911, 0),
(1251, 'USER_3FSERABRKLGGAEPGS', 911, 0),
(1252, 'USER_3FSERAA9WLEOIEWG5', NULL, 0),
(1253, 'USER_3FSERABRKLGGAEPGS', NULL, 0),
(1254, 'USER_3FSERAA9WLEOIEWG5', NULL, 0),
(1255, 'USER_3FSERABRKLGGAEPGS', NULL, 0),
(1256, 'USER_3FSERAASKLGDXHW2Q', 914, 0),
(1257, 'USER_3FSERABRKLGGAEPGS', 914, 0),
(1258, 'USER_3FSERAASKLGDXHW2Q', 915, 0),
(1259, 'USER_3FSERABRKLGGAEPGS', 915, 0),
(1260, 'USER_3FSERAA9WLEOIEWG5', NULL, 0),
(1261, 'USER_3FSERABRKLGGAEPGS', NULL, 0),
(1262, 'USER_3FSERAA9WLEOIEWG5', NULL, 0),
(1263, 'USER_3FSERABRKLGGAEPGS', NULL, 0),
(1265, 'USER_3FSERAASKLGDXHW2Q', 918, 0),
(1266, 'USER_3FSERACH4LERDMQYF', 918, 0),
(1267, 'USER_3FSERA9Q0LHIX3ZO8', 918, 0),
(1268, 'USER_3FSERAASKLGDXHW2Q', 919, 0),
(1269, 'USER_3FSERABRKLGGAEPGS', 919, 0),
(1270, 'USER_3FSERAASKLGDXHW2Q', 920, 0),
(1271, 'USER_3FSERABRKLGGAEPGS', 920, 0),
(1272, 'USER_3FSERAASKLGDXHW2Q', 921, 0),
(1273, 'USER_3FSERABRKLGGAEPGS', 921, 0),
(1274, 'USER_3FSERAASKLGDXHW2Q', 922, 0),
(1275, 'USER_3FSERABRKLGGAEPGS', 922, 0),
(1276, 'USER_3FSERAASKLGDXHW2Q', 923, 0),
(1277, 'USER_3FSERABRKLGGAEPGS', 923, 0),
(1278, 'USER_3FSERAASKLGDXHW2Q', 924, 0),
(1279, 'USER_3FSERABRKLGGAEPGS', 924, 0),
(1280, 'USER_3FSERAASKLGDXHW2Q', 925, 0),
(1281, 'USER_3FSERABRKLGGAEPGS', 925, 0),
(1282, 'USER_3FSERAASKLGDXHW2Q', 926, 0),
(1283, 'USER_3FSERABRKLGGAEPGS', 926, 0),
(1284, 'USER_3FSERAASKLGDXHW2Q', 927, 0),
(1285, 'USER_3FSERABRKLGGAEPGS', 927, 0),
(1286, 'USER_3FSERAASKLGDXHW2Q', 928, 0),
(1287, 'USER_3FSERABRKLGGAEPGS', 928, 0),
(1288, 'USER_3FSERAASKLGDXHW2Q', 929, 0),
(1289, 'USER_3FSERABRKLGGAEPGS', 929, 0),
(1290, 'USER_3FSERAASKLGDXHW2Q', 930, 0),
(1291, 'USER_3FSERABRKLGGAEPGS', 930, 0),
(1292, 'USER_3FSERAASKLGDXHW2Q', 931, 0),
(1293, 'USER_3FSERABRKLGGAEPGS', 931, 0),
(1294, 'USER_3FSERAASKLGDXHW2Q', 932, 0),
(1295, 'USER_3FSERABRKLGGAEPGS', 932, 0),
(1296, 'USER_3FSERA214LHD9XTSH', NULL, 0),
(1297, 'USER_3FSERABRKLGGAEPGS', NULL, 0),
(1298, 'USER_3FSERA2MGLEWODXGU', 934, 0),
(1299, 'USER_3FSERABRKLGGAEPGS', 934, 0),
(1310, 'USER_3FSERAASKLGDXHW2Q', 940, 0),
(1452, 'USER_3FSERAASKLGDXHW2Q', 1011, 0),
(1454, 'USER_3FSERAASKLGDXHW2Q', 1012, 0),
(1456, 'USER_3FSERAASKLGDXHW2Q', 1013, 0),
(1458, 'USER_3FSERAASKLGDXHW2Q', 1014, 0),
(1460, 'USER_3FSERACH4LERDMQYF', 1015, 0),
(1461, 'USER_3FSERABRKLGGAEPGS', 1015, 0),
(1462, 'USER_3FSERA10GLHOI5LKQ', 1016, 0),
(1463, 'USER_3FSERABRKLGGAEPGS', 1016, 0),
(1465, 'USER_3FSERA214LHD9H2NX', 1017, 0),
(1466, 'USER_3FSERA214LHD9H2NX', NULL, 0),
(1467, 'USER_3FSERA2MGLEWOAK2I', NULL, 0),
(1468, 'USER_3FSERACH4LERDMQYF', NULL, 0),
(1469, 'USER_3FSERAA9WLEOIEWG5', NULL, 0),
(1470, 'USER_3FSERAASKLGDX7FR3', NULL, 0),
(1471, 'USER_3FSERABRKLGGAEPGS', NULL, 0),
(1472, 'USER_3FSERA214LHD9H2NX', NULL, 0),
(1473, 'USER_3FSERAA9WLEOIEWG5', NULL, 0),
(1474, 'USER_3FSERA66OLHQGDHR8', NULL, 0),
(1475, 'USER_3FSERABRKLGGAEPGS', NULL, 0),
(1477, 'USER_3FSERAA9WLEOIEWG5', NULL, 0),
(1478, 'USER_3FSERAA9WLEOIEWG5', NULL, 0),
(1479, 'USER_3FSERAASKLGDXHW2Q', NULL, 0),
(1480, 'USER_3FSERA66OLHQGDHR8', NULL, 0),
(1482, 'USER_3FSERAA9WLEOIEWG5', NULL, 0),
(1483, 'USER_3FSERA66OLHQGDHR8', NULL, 0),
(1484, 'USER_3FSERAA9WLEOIEWG5', NULL, 0),
(1485, 'USER_3FSERA66OLHQGDHR8', NULL, 0),
(1486, 'USER_3FSERAA9WLEOIEWG5', NULL, 0),
(1487, 'USER_3FSERA66OLHQGDHR8', NULL, 0),
(1488, 'USER_3FSERAA9WLEOIEWG5', NULL, 0),
(1489, 'USER_3FSERAA9WLEOIEWG5', NULL, 0),
(1490, 'USER_3FSERAASKLGDXHW2Q', NULL, 0),
(1491, 'USER_3FSERA66OLHQGDHR8', NULL, 0),
(1492, 'USER_3FSERAA9WLEOIEWG5', NULL, 0),
(1493, 'USER_3FSERAASKLGDXHW2Q', NULL, 0),
(1494, 'USER_3FSERA66OLHQGDHR8', NULL, 0),
(1495, 'USER_3FSERAA9WLEOIEWG5', NULL, 0),
(1496, 'USER_3FSERA66OLHQGDHR8', NULL, 0),
(1497, 'USER_3FSERAA9WLEOIEWG5', NULL, 0),
(1498, 'USER_3FSERA66OLHQGDHR8', NULL, 0),
(1499, 'USER_3FSERAASKLGDXHW2Q', NULL, 0),
(1500, 'USER_3FSERA2MGLEWODXGU', NULL, 0),
(1501, 'USER_3FSERACH4LERDMQYF', NULL, 0),
(1502, 'USER_3FSERA214LHD9H2NX', NULL, 0),
(1503, 'USER_3FSERAA9WLEOIEWG5', NULL, 0),
(1504, 'USER_3FSERA66OLHQGDHR8', NULL, 0),
(1505, 'USER_3FSERAASKLGDXHW2Q', NULL, 0),
(1506, 'USER_3FSERA2MGLEWODXGU', NULL, 0),
(1507, 'USER_3FSERACH4LERDMQYF', NULL, 0),
(1508, 'USER_3FSERA214LHD9H2NX', NULL, 0),
(1509, 'USER_3FSERAA9WLEOIEWG5', NULL, 0),
(1510, 'USER_3FSERA66OLHQGDHR8', NULL, 0),
(1511, 'USER_3FSERAASKLGDXHW2Q', NULL, 0),
(1512, 'USER_3FSERA2MGLEWODXGU', NULL, 0),
(1513, 'USER_3FSERACH4LERDMQYF', NULL, 0),
(1514, 'USER_3FSERA214LHD9H2NX', NULL, 0),
(1515, 'USER_3FSERAA9WLEOIEWG5', NULL, 0),
(1516, 'USER_3FSERA66OLHQGDHR8', NULL, 0),
(1517, 'USER_3FSERAASKLGDXHW2Q', NULL, 0),
(1518, 'USER_3FSERA2MGLEWODXGU', NULL, 0),
(1519, 'USER_3FSERACH4LERDMQYF', NULL, 0),
(1520, 'USER_3FSERA214LHD9H2NX', NULL, 0),
(1521, 'USER_3FSERAA9WLEOIEWG5', NULL, 0),
(1522, 'USER_3FSERA66OLHQGDHR8', NULL, 0),
(1523, 'USER_3FSERAASKLGDXHW2Q', NULL, 0),
(1524, 'USER_3FSERA2MGLEWODXGU', NULL, 0),
(1525, 'USER_3FSERACH4LERDMQYF', NULL, 0),
(1526, 'USER_3FSERA214LHD9H2NX', NULL, 0),
(1527, 'USER_3FSERAA9WLEOIEWG5', NULL, 0),
(1528, 'USER_3FSERA66OLHQGDHR8', NULL, 0),
(1529, 'USER_3FSERAASKLGDXHW2Q', NULL, 0),
(1530, 'USER_3FSERA2MGLEWODXGU', NULL, 0),
(1531, 'USER_3FSERACH4LERDMQYF', NULL, 0),
(1532, 'USER_3FSERA214LHD9H2NX', NULL, 0),
(1533, 'USER_3FSERA66OLHQGDHR8', NULL, 0),
(1534, 'USER_3FSERAA9WLEOIEWG5', NULL, 0),
(1535, 'USER_3FSERAASKLGDX7FR3', NULL, 0),
(1537, 'USER_3FSERA10GLHOI5LKQ', 1039, 0),
(1538, 'USER_3FSERABRKLGGAEPGS', 1039, 0),
(1539, 'USER_3FSERA10GLHOI5LKQ', 1040, 0),
(1540, 'USER_3FSERABRKLGGAEPGS', 1040, 0),
(1541, 'USER_3FSERA10GLHOI5LKQ', 1041, 0),
(1542, 'USER_3FSERABRKLGGAEPGS', 1041, 0),
(1543, 'USER_3FSERA10GLHOI5LKQ', 1042, 0),
(1544, 'USER_3FSERABRKLGGAEPGS', 1042, 0),
(1545, 'USER_3FSERA10GLHOI5LKQ', 1043, 0),
(1546, 'USER_3FSERABRKLGGAEPGS', 1043, 0),
(1547, 'USER_3FSERA10GLHOI5LKQ', 1044, 0),
(1548, 'USER_3FSERABRKLGGAEPGS', 1044, 0),
(1549, 'USER_3FSERAASKLGDX7FR3', NULL, 0),
(1552, 'USER_3FSERA214LHD9H2NX', 1046, 0),
(1553, 'USER_3FSERAASKLGDX7FR3', NULL, 0),
(1554, 'USER_3FSERA2MGLEWODXGU', NULL, 0),
(1555, 'USER_3FSERAA9WLEOIEWG5', NULL, 0),
(1556, 'USER_3FSERA66OLHQGDHR8', NULL, 0),
(1557, 'USER_3FSERA2MGLEWOCMNF', NULL, 0),
(1558, 'USER_3FSERAA9WLEOIEWG5', NULL, 0),
(1559, 'USER_3FSERA2MGLEWOCMNF', NULL, 0),
(1560, 'USER_3FSERABRKLGGAEPGS', NULL, 0),
(1561, 'USER_3FSERA66OLHQGDHR8', NULL, 0),
(1562, 'USER_3FSERAA9WLEOIEWG5', NULL, 0),
(1563, 'USER_3FSERAASKLGDX7FR3', NULL, 0),
(1565, 'USER_3FSERAASKLGDX7FR3', NULL, 0),
(1566, 'USER_3FSERAA9WLEOIEWG5', NULL, 0),
(1568, 'USER_3FSERA10GLHOI5LKQ', NULL, 0),
(1572, 'USER_3FSERA214LHD9XTSH', 1055, 0),
(1574, 'USER_3FSERA214LHD9XTSH', 1056, 0),
(1576, 'USER_3FSERA2MGLEWOCMNF', 1057, 0),
(1578, 'USER_3FSERA2MGLEWOCMNF', 1058, 0),
(1579, 'USER_3FSERAA9WLEOIEWG5', 1059, 0),
(1580, 'USER_3FSERA2MGLEWODXGU', 1059, 0),
(1582, 'USER_3FSERA2MGLEWOCMNF', 1060, 0),
(1584, 'USER_3FSERA2MGLEWOCMNF', 1061, 0),
(1585, 'USER_3FSERAA9WLEOIEWG5', 1062, 0),
(1586, 'USER_3FSERA2MGLEWODXGU', 1062, 0),
(1588, 'USER_3FSERA2MGLEWOCMNF', 1063, 0),
(1589, 'USER_3FSERAA9WLEOIEWG5', NULL, 0),
(1590, 'USER_3FSERA66OLHQGDHR8', NULL, 0),
(1591, 'USER_3FSERAASKLGDXHW2Q', NULL, 0),
(1592, 'USER_3FSERA2MGLEWODXGU', NULL, 0),
(1593, 'USER_3FSERACH4LERDMQYF', NULL, 0),
(1594, 'USER_3FSERA214LHD9H2NX', NULL, 0),
(1595, 'USER_3FSERAA9WLEOIEWG5', NULL, 0),
(1596, 'USER_3FSERA66OLHQGDHR8', NULL, 0),
(1597, 'USER_3FSERAASKLGDXHW2Q', NULL, 0),
(1598, 'USER_3FSERA2MGLEWODXGU', NULL, 0),
(1599, 'USER_3FSERACH4LERDMQYF', NULL, 0),
(1600, 'USER_3FSERA214LHD9H2NX', NULL, 0),
(1601, 'USER_3FSERAA9WLEOIEWG5', NULL, 0),
(1602, 'USER_3FSERABPCLHRGKTPU', NULL, 0),
(1604, 'USER_3FSERA2MGLEWOCMNF', 1067, 0),
(1606, 'USER_3FSERA214LHD9H2NX', 1068, 0),
(1607, 'USER_3FSERAASKLGDXHW2Q', 1069, 0),
(1608, 'USER_3FSERA2MGLEWOAK2I', 1069, 0),
(1610, 'USER_3FSERAA9WLEOIEWG5', NULL, 0),
(1611, 'USER_3FSERABRKLGGAEPGS', NULL, 0),
(1612, 'USER_3FSERAA9WLEOIEWG5', NULL, 0),
(1613, 'USER_3FSERABRKLGGAEPGS', NULL, 0),
(1614, 'USER_3FSERA2MGLEWOCMNF', 1072, 0),
(1615, 'USER_3FSERABRKLGGAEPGS', 1072, 0),
(1617, 'USER_3FSERA2MGLEWOCMNF', 1073, 0),
(1619, 'USER_3FSERA2MGLEWOCMNF', 1074, 0),
(1620, 'USER_3FSERAA9WLEOIEWG5', NULL, 0),
(1621, 'USER_3FSERABRKLGGAEPGS', NULL, 0),
(1622, 'USER_3FSERAA9WLEOIEWG5', NULL, 0),
(1623, 'USER_3FSERABRKLGGAEPGS', NULL, 0),
(1624, 'USER_3FSERAA9WLEOIEWG5', NULL, 0),
(1625, 'USER_3FSERABRKLGGAEPGS', NULL, 0),
(1626, 'USER_3FSERAA9WLEOIEWG5', NULL, 0),
(1627, 'USER_3FSERABRKLGGAEPGS', NULL, 0),
(1629, 'USER_3FSERABRKLGGAEPGS', NULL, 0),
(1630, 'USER_3FSERA3T0LHUMZTYL', 1080, 0),
(1631, 'USER_3FSERABRKLGGAEPGS', 1080, 0),
(1633, 'USER_3FSERAASKLGDX7FR3', 1081, 0),
(1634, 'USER_3FSERAASKLGDXHW2Q', 1082, 0),
(1636, 'USER_3FSERA2MGLEWOAK2I', 1083, 0),
(1637, 'USER_3FSERABRKLGGAEPGS', 1083, 0),
(1638, 'USER_3FSERAASKLGDXHW2Q', 1084, 0),
(1640, 'USER_3FSERAASKLGDXHW2Q', 1085, 0),
(1642, 'USER_3FSERAASKLGDXHW2Q', NULL, 0),
(1643, 'USER_3FSERAA9WLEOIEWG5', NULL, 0),
(1644, 'USER_3FSERAASKLGDXHW2Q', NULL, 0),
(1645, 'USER_3FSERAA9WLEOIEWG5', NULL, 0),
(1646, 'USER_3FSERAASKLGDXHW2Q', 1088, 0),
(1648, 'USER_3FSERAASKLGDXHW2Q', NULL, 0),
(1649, 'USER_3FSERAA9WLEOIEWG5', NULL, 0),
(1650, 'USER_3FSERAASKLGDXHW2Q', 1090, 0),
(1652, 'USER_3FSERAASKLGDXHW2Q', 1091, 0),
(1654, 'USER_3FSERAASKLGDXHW2Q', 1092, 0),
(1656, 'USER_3FSERA2MGLEWOAK2I', 1092, 0),
(1657, 'USER_3FSERAASKLGDXHW2Q', 1093, 0),
(1659, 'USER_3FSERA2MGLEWOAK2I', 1093, 0),
(1660, 'USER_3FSERAASKLGDXHW2Q', 1094, 0),
(1662, 'USER_3FSERA2MGLEWOAK2I', 1094, 0),
(1663, 'USER_3FSERAASKLGDXHW2Q', 1095, 0),
(1665, 'USER_3FSERA2MGLEWOAK2I', 1095, 0),
(1666, 'USER_3FSERAASKLGDXHW2Q', NULL, 0),
(1667, 'USER_3FSERAA9WLEOIEWG5', NULL, 0),
(1668, 'USER_3FSERA2MGLEWOAK2I', NULL, 0),
(1669, 'USER_3FSERA214LHD9H2NX', 1097, 0),
(1670, 'USER_3FSERA2MGLEWOAK2I', 1097, 0),
(1672, 'USER_3FSERA214LHD9H2NX', NULL, 0),
(1673, 'USER_3FSERA2MGLEWOAK2I', NULL, 0),
(1674, 'USER_3FSERAA9WLEOIEWG5', NULL, 0),
(1675, 'USER_3FSERA214LHD9H2NX', NULL, 0),
(1676, 'USER_3FSERA2MGLEWOAK2I', NULL, 0),
(1677, 'USER_3FSERAA9WLEOIEWG5', NULL, 0),
(1678, 'USER_3FSERAASKLGDXHW2Q', 1100, 0),
(1680, 'USER_3FSERA2MGLEWOAK2I', 1101, 0),
(1681, 'USER_3FSERAASKLGDXHW2Q', 1101, 0),
(1683, 'USER_3FSERA2MGLEWOAK2I', 1102, 0),
(1684, 'USER_3FSERAASKLGDXHW2Q', 1102, 0),
(1686, 'USER_3FSERA2MGLEWOAK2I', NULL, 0),
(1687, 'USER_3FSERAASKLGDXHW2Q', NULL, 0),
(1688, 'USER_3FSERAA9WLEOIEWG5', NULL, 0),
(1689, 'USER_3FSERAASKLGDXHW2Q', 1104, 0),
(1691, 'USER_3FSERA2MGLEWOAK2I', 1105, 0),
(1692, 'USER_3FSERAASKLGDXHW2Q', 1105, 0),
(1695, 'USER_3FSERAA9WLEOIEWG5', 1106, 0),
(1697, 'USER_3FSERAA9WLEOIEWG5', 1107, 0),
(1699, 'USER_3FSERAA9WLEOIEWG5', 1108, 0),
(1701, 'USER_3FSERAA9WLEOIEWG5', 1109, 0),
(1703, 'USER_3FSERAA9WLEOIEWG5', 1110, 0),
(1705, 'USER_3FSERAA9WLEOIEWG5', 1111, 0),
(1706, 'USER_3FSERABPCLHRGKTPU', 1112, 0),
(1707, 'USER_3FSERABRKLGGAEPGS', 1112, 0),
(1709, 'USER_3FSERA9R8LHVFWCK7', 1113, 0),
(1717, 'USER_3FSERABPCLHRGKTPU', 1117, 0),
(1718, 'USER_3FSERA2MGLEWOAK2I', NULL, 0),
(1719, 'USER_3FSERAA9WLEOIEWG5', NULL, 0),
(1720, 'USER_3FSERA9R8LHVFWCK7', 1119, 0),
(1721, 'USER_3FSERABRKLGGAEPGS', 1119, 0),
(1723, 'USER_3FSERA9R8LHVFWCK7', 1120, 0),
(1724, 'USER_3FSERA9R8LHVFWCK7', 1121, 0),
(1725, 'USER_3FSERABRKLGGAEPGS', 1121, 0),
(1727, 'USER_3FSERABRKLGGAEPGS', NULL, 0),
(1728, 'USER_3FSERA9R8LHVFWCK7', 1123, 0),
(1729, 'USER_3FSERABRKLGGAEPGS', 1123, 0),
(1730, 'USER_3FSERA9R8LHVFWCK7', 1124, 0),
(1731, 'USER_3FSERABRKLGGAEPGS', 1124, 0),
(1732, 'USER_3FSERA9R8LHVFWCK7', 1125, 0),
(1733, 'USER_3FSERABRKLGGAEPGS', 1125, 0),
(1734, 'USER_3FSERA9R8LHVFWCK7', 1126, 0),
(1735, 'USER_3FSERABRKLGGAEPGS', 1126, 0),
(1736, 'USER_3FSERA9R8LHVFWCK7', 1127, 0),
(1737, 'USER_3FSERABRKLGGAEPGS', 1127, 0),
(1738, 'USER_3FSERA9R8LHVFWCK7', 1128, 0),
(1739, 'USER_3FSERABRKLGGAEPGS', 1128, 0),
(1740, 'USER_3FSERA9R8LHVFWCK7', 1129, 0),
(1741, 'USER_3FSERABRKLGGAEPGS', 1129, 0),
(1743, 'USER_3FSERAA9WLEOIEWG5', 1130, 0),
(1745, 'USER_3FSERAA9WLEOIEWG5', 1131, 0),
(1746, 'USER_3FSERA2MGLEWOAK2I', 1132, 0),
(1747, 'USER_3FSERABRKLGGAEPGS', 1132, 0),
(1748, 'USER_3FSERA2MGLEWOAK2I', 1133, 0),
(1749, 'USER_3FSERABRKLGGAEPGS', 1133, 0),
(1750, 'USER_3FSERA2MGLEWOAK2I', 1134, 0),
(1751, 'USER_3FSERABRKLGGAEPGS', 1134, 0),
(1752, 'USER_3FSERA2MGLEWOAK2I', 1135, 0),
(1753, 'USER_3FSERABRKLGGAEPGS', 1135, 0),
(1755, 'USER_3FSERAASKLGDXHW2Q', 1136, 0),
(1756, 'USER_3FSERA2MGLEWOAK2I', 1137, 0),
(1757, 'USER_3FSERA214LHD9XTSH', 1137, 0),
(1759, 'USER_3FSERAA9WLEOIEWG5', 1138, 0),
(1761, 'USER_3FSERAA9WLEOIEWG5', 1139, 0),
(1762, 'USER_3FSERA2MGLEWOAK2I', 1140, 0),
(1763, 'USER_3FSERAASKLGDXHW2Q', 1140, 0),
(1764, 'USER_3FSERACKGLI49BH5U', 1141, 0),
(1765, 'USER_3FSERABRKLGGAEPGS', 1141, 0),
(1766, 'USER_3FSERACKGLI49BH5U', 1142, 0),
(1767, 'USER_3FSERA2MGLEWOAK2I', 1142, 0),
(1768, 'USER_3FSERA2MGLEWOAK2I', 1143, 0),
(1769, 'USER_3FSERABRKLGGAEPGS', 1143, 0),
(1770, 'USER_3FSERA2MGLEWOAK2I', 1144, 0),
(1771, 'USER_3FSERABRKLGGAEPGS', 1144, 0),
(1773, 'USER_3FSERAA9WLEOIEWG5', 1145, 0),
(1775, 'USER_3FSERAA9WLEOIEWG5', 1146, 0),
(1777, 'USER_3FSERABRKLGGAEPGS', NULL, 0),
(1779, 'USER_3FSERABRKLGGAEPGS', NULL, 0),
(1781, 'USER_3FSERABRKLGGAEPGS', NULL, 0),
(1783, 'USER_3FSERABRKLGGAEPGS', NULL, 0),
(1785, 'USER_3FSERABRKLGGAEPGS', NULL, 0),
(1787, 'USER_3FSERABRKLGGAEPGS', NULL, 0),
(1789, 'USER_3FSERABRKLGGAEPGS', NULL, 0),
(1791, 'USER_3FSERABRKLGGAEPGS', NULL, 0),
(1793, 'USER_3FSERABRKLGGAEPGS', NULL, 0),
(1795, 'USER_3FSERABRKLGGAEPGS', NULL, 0),
(1797, 'USER_3FSERABRKLGGAEPGS', NULL, 0),
(1799, 'USER_3FSERABRKLGGAEPGS', NULL, 0),
(1801, 'USER_3FSERABRKLGGAEPGS', NULL, 0),
(1803, 'USER_3FSERABRKLGGAEPGS', NULL, 0),
(1805, 'USER_3FSERABRKLGGAEPGS', NULL, 0),
(1807, 'USER_3FSERABRKLGGAEPGS', NULL, 0),
(1809, 'USER_3FSERAA9WLEOIEWG5', 1163, 0),
(1811, 'USER_3FSERABRKLGGAEPGS', NULL, 0),
(1813, 'USER_3FSERABRKLGGAEPGS', NULL, 0),
(1815, 'USER_3FSERABRKLGGAEPGS', NULL, 0),
(1817, 'USER_3FSERABRKLGGAEPGS', NULL, 0),
(1819, 'USER_3FSERABRKLGGAEPGS', NULL, 0),
(1821, 'USER_3FSERABRKLGGAEPGS', NULL, 0),
(1823, 'USER_3FSERABRKLGGAEPGS', NULL, 0),
(1825, 'USER_3FSERABRKLGGAEPGS', NULL, 0),
(1827, 'USER_3FSERABRKLGGAEPGS', NULL, 0),
(1829, 'USER_3FSERABRKLGGAEPGS', NULL, 0),
(1831, 'USER_3FSERABRKLGGAEPGS', NULL, 0),
(1833, 'USER_3FSERABRKLGGAEPGS', NULL, 0),
(1835, 'USER_3FSERABRKLGGAEPGS', NULL, 0),
(1837, 'USER_3FSERABRKLGGAEPGS', NULL, 0),
(1839, 'USER_3FSERABRKLGGAEPGS', NULL, 0),
(1841, 'USER_3FSERABRKLGGAEPGS', NULL, 0),
(1843, 'USER_3FSERABRKLGGAEPGS', NULL, 0),
(1845, 'USER_3FSERABRKLGGAEPGS', NULL, 0),
(1847, 'USER_3FSERABRKLGGAEPGS', NULL, 0),
(1849, 'USER_3FSERABRKLGGAEPGS', NULL, 0),
(1851, 'USER_3FSERABRKLGGAEPGS', NULL, 0),
(1853, 'USER_3FSERABRKLGGAEPGS', NULL, 0),
(1855, 'USER_3FSERABRKLGGAEPGS', NULL, 0),
(1857, 'USER_3FSERABRKLGGAEPGS', NULL, 0),
(1859, 'USER_3FSERABRKLGGAEPGS', NULL, 0),
(1861, 'USER_3FSERABRKLGGAEPGS', NULL, 0),
(1863, 'USER_3FSERABRKLGGAEPGS', NULL, 0),
(1865, 'USER_3FSERABRKLGGAEPGS', NULL, 0),
(1867, 'USER_3FSERABRKLGGAEPGS', NULL, 0),
(1869, 'USER_3FSERABRKLGGAEPGS', NULL, 0),
(1871, 'USER_3FSERABRKLGGAEPGS', NULL, 0),
(1873, 'USER_3FSERABRKLGGAEPGS', NULL, 0),
(1875, 'USER_3FSERABRKLGGAEPGS', NULL, 0),
(1877, 'USER_3FSERABRKLGGAEPGS', NULL, 0),
(1879, 'USER_3FSERAA9WLEOIEWG5', 1198, 0),
(1881, 'USER_3FSERABRKLGGAEPGS', NULL, 0),
(1883, 'USER_3FSERABRKLGGAEPGS', NULL, 0),
(1885, 'USER_3FSERABRKLGGAEPGS', NULL, 0),
(1887, 'USER_3FSERABRKLGGAEPGS', NULL, 0),
(1889, 'USER_3FSERABRKLGGAEPGS', NULL, 0),
(1891, 'USER_3FSERABRKLGGAEPGS', NULL, 0),
(1893, 'USER_3FSERAA9WLEOIEWG5', 1205, 0),
(1894, 'USER_3FSERACKGLI48OF83', 1206, 0),
(1895, 'USER_3FSERABRKLGGAEPGS', 1206, 0),
(1896, 'USER_3FSERA2MGLEWOAK2I', 1207, 0),
(1897, 'USER_3FSERA3T0LHUMZTYL', 1207, 0),
(1898, 'USER_3FSERAASKLGDXHW2Q', 1207, 0),
(1899, 'USER_3FSERAA9WLEOIEWG5', 1207, 0),
(1901, 'USER_3FSERABRKLGGAEPGS', NULL, 0),
(1903, 'USER_3FSERABRKLGGAEPGS', NULL, 0),
(1905, 'USER_3FSERABRKLGGAEPGS', NULL, 0),
(1907, 'USER_3FSERABRKLGGAEPGS', NULL, 0),
(1909, 'USER_3FSERAA9WLEOIEWG5', 1212, 0),
(1911, 'USER_3FSERAA9WLEOIEWG5', 1213, 0),
(1912, 'USER_3FSERA2MGLEWOAK2I', NULL, 0),
(1913, 'USER_3FSERA2MGLEWODXGU', NULL, 0),
(1914, 'USER_3FSERA3T0LHUMZTYL', NULL, 0),
(1915, 'USER_3FSERAA9WLEOIEWG5', NULL, 0),
(1916, 'USER_3FSERA2MGLEWODXGU', NULL, 0),
(1917, 'USER_3FSERA3T0LHUMZTYL', NULL, 0),
(1918, 'USER_3FSERAA9WLEOIEWG5', NULL, 0),
(1919, 'USER_3FSERA2MGLEWODXGU', NULL, 0),
(1920, 'USER_3FSERA3T0LHUMZTYL', NULL, 0),
(1921, 'USER_3FSERAA9WLEOIEWG5', NULL, 0),
(1922, 'USER_3FSERAASKLGDX7FR3', 1217, 0),
(1923, 'USER_3FSERABRKLGGAEPGS', 1217, 0),
(1925, 'USER_3FSERABRKLGGAEPGS', NULL, 0),
(1927, 'USER_3FSERABRKLGGAEPGS', NULL, 0),
(1929, 'USER_3FSERABRKLGGAEPGS', NULL, 0),
(1931, 'USER_3FSERABRKLGGAEPGS', NULL, 0),
(1932, 'USER_3FSERAA9WLEOIEWG5', NULL, 0),
(1933, 'USER_3FSERABRKLGGAEPGS', NULL, 0),
(1934, 'USER_3FSERAA9WLEOIEWG5', NULL, 0),
(1935, 'USER_3FSERABRKLGGAEPGS', NULL, 0),
(1937, 'USER_3FSERABRKLGGAEPGS', NULL, 0),
(1939, 'USER_3FSERABRKLGGAEPGS', NULL, 0),
(1941, 'USER_3FSERABRKLGGAEPGS', NULL, 0),
(1943, 'USER_3FSERABRKLGGAEPGS', NULL, 0),
(1945, 'USER_3FSERABRKLGGAEPGS', NULL, 0),
(1947, 'USER_3FSERABRKLGGAEPGS', NULL, 0),
(1949, 'USER_3FSERABRKLGGAEPGS', NULL, 0),
(1951, 'USER_3FSERABRKLGGAEPGS', NULL, 0),
(1953, 'USER_3FSERABRKLGGAEPGS', NULL, 0),
(1955, 'USER_3FSERAA9WLEOIEWG5', 1233, 0),
(1957, 'USER_3FSERAA9WLEOIEWG5', 1234, 0),
(1959, 'USER_3FSERAA9WLEOIEWG5', 1235, 0),
(1960, 'USER_3FSERA2MGLEWOAK2I', 1236, 0),
(1961, 'USER_3FSERAASKLGDXHW2Q', 1236, 0),
(1964, 'USER_3FSERABRKLGGAEPGS', NULL, 0),
(1966, 'USER_3FSERABRKLGGAEPGS', NULL, 0),
(1968, 'USER_3FSERABRKLGGAEPGS', NULL, 0),
(1970, 'USER_3FSERABRKLGGAEPGS', NULL, 0),
(1972, 'USER_3FSERABRKLGGAEPGS', NULL, 0),
(1974, 'USER_3FSERABRKLGGAEPGS', NULL, 0),
(1976, 'USER_3FSERABRKLGGAEPGS', NULL, 0),
(1978, 'USER_3FSERABRKLGGAEPGS', NULL, 0),
(1980, 'USER_3FSERABRKLGGAEPGS', NULL, 0),
(1982, 'USER_3FSERABRKLGGAEPGS', NULL, 0),
(1984, 'USER_3FSERABRKLGGAEPGS', NULL, 0),
(1986, 'USER_3FSERABRKLGGAEPGS', NULL, 0),
(1988, 'USER_3FSERABRKLGGAEPGS', NULL, 0),
(1990, 'USER_3FSERABRKLGGAEPGS', NULL, 0),
(1992, 'USER_3FSERABRKLGGAEPGS', NULL, 0),
(1994, 'USER_3FSERABRKLGGAEPGS', NULL, 0),
(1996, 'USER_3FSERABRKLGGAEPGS', NULL, 0),
(1998, 'USER_3FSERABRKLGGAEPGS', NULL, 0),
(2000, 'USER_3FSERABRKLGGAEPGS', 1255, 0),
(2002, 'USER_3FSERABRKLGGAEPGS', 1256, 0),
(2004, 'USER_3FSERABRKLGGAEPGS', 1257, 0),
(2005, 'USER_3FSERA2MGLEWOAK2I', NULL, 0),
(2006, 'USER_3FSERAASKLGDXHW2Q', NULL, 0),
(2007, 'USER_3FSERA2MGLEWODXGU', NULL, 0),
(2008, 'USER_3FSERA3T0LHUMZTYL', NULL, 0),
(2009, 'USER_3FSERAA9WLEOIEWG5', NULL, 0),
(2010, 'USER_3FSERA2MGLEWOAK2I', NULL, 0),
(2011, 'USER_3FSERAASKLGDXHW2Q', NULL, 0),
(2012, 'USER_3FSERA2MGLEWODXGU', NULL, 0),
(2013, 'USER_3FSERAA9WLEOIEWG5', NULL, 0),
(2015, 'USER_3FSERABRKLGGAEPGS', 1260, 0),
(2017, 'USER_3FSERABRKLGGAEPGS', 1261, 0),
(2019, 'USER_3FSERAA9WLEOIEWG5', 1262, 0),
(2021, 'USER_3FSERAA9WLEOIEWG5', 1263, 0),
(2023, 'USER_3FSERAA9WLEOIEWG5', 1264, 0),
(2024, 'USER_3FSERA2MGLEWOAK2I', NULL, 0),
(2025, 'USER_3FSERA2MGLEWODXGU', NULL, 0),
(2026, 'USER_3FSERA3T0LHUMZTYL', NULL, 0),
(2027, 'USER_3FSERA214LHD9XTSH', NULL, 0),
(2028, 'USER_3FSERABPCLHRGKTPU', NULL, 0),
(2029, 'USER_3FSERAA9WLEOIEWG5', NULL, 0),
(2030, 'USER_3FSERA2MGLEWOAK2I', NULL, 0),
(2031, 'USER_3FSERA3T0LHUMZTYL', NULL, 0),
(2032, 'USER_3FSERA214LHD9XTSH', NULL, 0),
(2033, 'USER_3FSERABPCLHRGKTPU', NULL, 0),
(2034, 'USER_3FSERAA9WLEOIEWG5', NULL, 0),
(2035, 'USER_3FSERA2MGLEWOAK2I', NULL, 0),
(2036, 'USER_3FSERA3T0LHUMZTYL', NULL, 0),
(2037, 'USER_3FSERA214LHD9XTSH', NULL, 0),
(2038, 'USER_3FSERABPCLHRGKTPU', NULL, 0),
(2039, 'USER_3FSERAA9WLEOIEWG5', NULL, 0),
(2040, 'USER_3FSERA2MGLEWODXGU', NULL, 0),
(2042, 'USER_3FSERABRKLGGAEPGS', 1268, 0),
(2044, 'USER_3FSERABRKLGGAEPGS', 1269, 0),
(2046, 'USER_3FSERAA9WLEOIEWG5', 1270, 0),
(2048, 'USER_3FSERAA9WLEOIEWG5', 1271, 0),
(2050, 'USER_3FSERAA9WLEOIEWG5', 1272, 0),
(2051, 'USER_3FSERA2MGLEWOAK2I', NULL, 0),
(2052, 'USER_3FSERA2MGLEWODXGU', NULL, 0),
(2053, 'USER_3FSERA3T0LHUMZTYL', NULL, 0),
(2054, 'USER_3FSERA214LHD9XTSH', NULL, 0),
(2055, 'USER_3FSERAA9WLEOIEWG5', NULL, 0),
(2056, 'USER_3FSERA2MGLEWOAK2I', NULL, 0),
(2057, 'USER_3FSERA3T0LHUMZTYL', NULL, 0),
(2058, 'USER_3FSERA214LHD9XTSH', NULL, 0),
(2059, 'USER_3FSERAA9WLEOIEWG5', NULL, 0),
(2060, 'USER_3FSERA2MGLEWOAK2I', NULL, 0),
(2061, 'USER_3FSERA3T0LHUMZTYL', NULL, 0),
(2062, 'USER_3FSERA214LHD9XTSH', NULL, 0),
(2063, 'USER_3FSERAA9WLEOIEWG5', NULL, 0),
(2064, 'USER_3FSERA2MGLEWODXGU', NULL, 0),
(2065, 'USER_3FSERA2MGLEWOAK2I', 1276, 0),
(2066, 'USER_3FSERAA9WLEOIEWG5', 1276, 0),
(2068, 'USER_3FSERABRKLGGAEPGS', 1277, 0),
(2070, 'USER_3FSERABRKLGGAEPGS', 1278, 0),
(2071, 'USER_3FSERA2MGLEWOAK2I', 1279, 0),
(2072, 'USER_3FSERAA9WLEOIEWG5', 1279, 0),
(2073, 'USER_3FSERA2MGLEWOAK2I', 1280, 0),
(2074, 'USER_3FSERAA9WLEOIEWG5', 1280, 0),
(2075, 'USER_3FSERA2MGLEWOAK2I', 1281, 0),
(2076, 'USER_3FSERAA9WLEOIEWG5', 1281, 0),
(2077, 'USER_3FSERA2MGLEWOAK2I', NULL, 0),
(2078, 'USER_3FSERA3T0LHUMZTYL', NULL, 0),
(2079, 'USER_3FSERA2MGLEWOCMNF', NULL, 0),
(2080, 'USER_3FSERA2MGLEWODXGU', NULL, 0),
(2081, 'USER_3FSERAA9WLEOIEWG5', NULL, 0),
(2082, 'USER_3FSERA2MGLEWOAK2I', NULL, 0),
(2083, 'USER_3FSERA3T0LHUMZTYL', NULL, 0),
(2084, 'USER_3FSERA2MGLEWODXGU', NULL, 0),
(2085, 'USER_3FSERAA9WLEOIEWG5', NULL, 0),
(2086, 'USER_3FSERA2MGLEWOAK2I', NULL, 0),
(2087, 'USER_3FSERA3T0LHUMZTYL', NULL, 0),
(2088, 'USER_3FSERA2MGLEWODXGU', NULL, 0),
(2089, 'USER_3FSERAA9WLEOIEWG5', NULL, 0),
(2090, 'USER_3FSERACKGLI48OF83', NULL, 0),
(2091, 'USER_3FSERAA9WLEOIEWG5', 1285, 0),
(2092, 'USER_3FSERABRKLGGAEPGS', 1285, 0),
(2093, 'USER_3FSERAA9WLEOIEWG5', 1286, 0),
(2094, 'USER_3FSERABRKLGGAEPGS', 1286, 0),
(2095, 'USER_3FSERA2MGLEWOAK2I', 1287, 0),
(2096, 'USER_3FSERAA9WLEOIEWG5', 1287, 0),
(2097, 'USER_3FSERA2MGLEWOAK2I', 1288, 0),
(2098, 'USER_3FSERAA9WLEOIEWG5', 1288, 0),
(2099, 'USER_3FSERA2MGLEWOAK2I', 1289, 0),
(2100, 'USER_3FSERAA9WLEOIEWG5', 1289, 0),
(2101, 'USER_3FSERA2MGLEWOAK2I', NULL, 0),
(2102, 'USER_3FSERA2MGLEWODXGU', NULL, 0),
(2103, 'USER_3FSERA2MGLEWOCMNF', NULL, 0),
(2104, 'USER_3FSERAA9WLEOIEWG5', NULL, 0),
(2105, 'USER_3FSERA2MGLEWOAK2I', NULL, 0),
(2106, 'USER_3FSERA2MGLEWODXGU', NULL, 0),
(2107, 'USER_3FSERA2MGLEWOCMNF', NULL, 0),
(2108, 'USER_3FSERAA9WLEOIEWG5', NULL, 0),
(2109, 'USER_3FSERAASKLGDXHW2Q', NULL, 0),
(2110, 'USER_3FSERA2MGLEWOAK2I', NULL, 0),
(2111, 'USER_3FSERA2MGLEWOCMNF', NULL, 0),
(2112, 'USER_3FSERAA9WLEOIEWG5', NULL, 0),
(2113, 'USER_3FSERAASKLGDXHW2Q', NULL, 0);

-- --------------------------------------------------------

--
-- Table structure for table `comment`
--

CREATE TABLE `comment` (
  `id_comment` int(11) NOT NULL,
  `id_user` varchar(50) NOT NULL,
  `id_post` varchar(50) NOT NULL,
  `id_parent` int(11) NOT NULL,
  `id_reply` int(50) NOT NULL,
  `date_time` datetime NOT NULL DEFAULT current_timestamp(),
  `comment` text NOT NULL,
  `loves` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `comment`
--

INSERT INTO `comment` (`id_comment`, `id_user`, `id_post`, `id_parent`, `id_reply`, `date_time`, `comment`, `loves`) VALUES
(118, 'USER_3FSERAA9WLEOIEWG5', 'POST_3FSERA8GGLFFK0LFG', 0, 0, '2023-03-19 22:55:04', 'ok bè', 0),
(119, 'USER_3FSERAA9WLEOIEWG5', 'POST_3FSERA8GGLFFK0LFG', 0, 0, '2023-03-20 15:06:42', 'ggg', 0),
(122, 'USER_3FSERAA9WLEOIEWG5', 'POST_3FSERA8GGLFFK0LFG', 119, 119, '2023-03-23 21:27:59', 'ok', 0),
(124, 'USER_3FSERAA9WLEOIEWG5', 'POST_3FSERA8GGLFFK0LFG', 119, 123, '2023-03-23 21:28:08', 'kkkk', 0),
(128, 'USER_3FSERAA9WLEOIEWG5', 'POST_3FSERA8GGLFFK0LFG', 0, 0, '2023-04-13 23:09:47', 'o', 0),
(129, 'USER_3FSERAA9WLEOIEWG5', 'POST_3FSERA9SKLGKSNVAB', 0, 0, '2023-04-17 19:10:50', 'kkkk ', 0),
(131, 'USER_3FSERAA9WLEOIEWG5', 'POST_3FSERA1A8LGM0BB3W', 0, 0, '2023-04-21 15:30:41', 'jjj', 0),
(145, 'USER_3FSERAA9WLEOIEWG5', 'POST_3FSERA1A8LGM0BB3W', 0, 0, '2023-04-28 22:46:16', 'alo', 0),
(146, 'USER_3FSERAA9WLEOIEWG5', 'POST_3FSERA8GGLFFK0LFG', 0, 0, '2023-05-05 18:01:52', 'thanhnhan', 0),
(147, 'USER_3FSERAA9WLEOIEWG5', 'POST_3FSERAAXKLHBFJ3BU', 0, 0, '2023-05-06 13:44:14', 'nhà ai xấu vậy', 0),
(148, 'USER_3FSERA2MGLEWOCMNF', 'POST_3FSERAAXKLHBFJ3BU', 147, 147, '2023-05-06 13:44:31', 'nàh lol sỷ á', 0),
(150, 'USER_3FSERA2MGLEWOAK2I', 'POST_3FSERAAXKLHBFJ3BU', 147, 147, '2023-05-06 13:45:59', 'Xấu kệ cha tao', 0),
(151, 'USER_3FSERAA9WLEOIEWG5', 'POST_3FSERAAXKLHBFJ3BU', 147, 148, '2023-05-06 13:46:21', 'nó chửi m á', 0),
(156, 'USER_3FSERAASKLGDXHW2Q', 'POST_3FSERABM0LHIKUOHH', 0, 0, '2023-05-11 15:19:12', 'alo', 0),
(157, 'USER_3FSERAASKLGDXHW2Q', 'POST_3FSERABM0LHIKSGPX', 0, 0, '2023-05-11 15:23:50', 'alo huy', 0),
(158, 'USER_3FSERA2MGLEWOAK2I', 'POST_3FSERA8GGLFFK0LFG', 0, 0, '2023-05-11 15:53:53', 'alo', 0),
(159, 'USER_3FSERA2MGLEWOAK2I', 'POST_3FSERA8GGLFFK0LFG', 0, 0, '2023-05-11 15:53:54', 'alo', 0),
(160, 'USER_3FSERA9Q0LHIX3ZO8', 'POST_3FSERA9Q0LHIXCHCR', 0, 0, '2023-05-11 16:26:02', '23123', 0),
(161, 'USER_3FSERAA9WLEOIEWG5', 'POST_3FSERAAXKLHBFJ3BU', 0, 0, '2023-05-11 16:26:46', 'lo', 0),
(162, 'USER_3FSERA9Q0LHIX3ZO8', 'POST_3FSERA214LHD9L3KL', 0, 0, '2023-05-11 16:28:18', 'Người yêu của tôi', 0),
(164, 'USER_3FSERAA9WLEOIEWG5', 'POST_3FSERA92CLHLH33E3', 0, 0, '2023-05-16 17:54:18', 'alo', 0),
(165, 'USER_3FSERAA9WLEOIEWG5', 'POST_3FSERA92CLHLH33E3', 164, 164, '2023-05-16 17:54:23', 'ok', 0),
(167, 'USER_3FSERAA9WLEOIEWG5', 'POST_3FSERA92CLHLH33E3', 0, 0, '2023-05-16 17:55:00', 'lll', 0),
(168, 'USER_3FSERAA9WLEOIEWG5', 'POST_3FSERA92CLHLH33E3', 167, 167, '2023-05-16 17:55:08', '@lll', 0),
(170, 'USER_3FSERA66OLHQGDHR8', 'POST_3FSERA27CLHLFRXN7', 0, 0, '2023-05-16 23:28:37', 'llll', 0),
(171, 'USER_3FSERA66OLHQGDHR8', 'POST_3FSERA27CLHLFRXN7', 0, 0, '2023-05-16 23:28:55', 'tịnh bú đít', 0),
(172, 'USER_3FSERA66OLHQGDHR8', 'POST_3FSERA27CLHLFRXN7', 171, 171, '2023-05-16 23:29:23', 'chụt chụt', 0),
(173, 'USER_3FSERA66OLHQGDHR8', 'POST_3FSERA27CLHLFRXN7', 0, 0, '2023-05-16 23:29:27', 'thien bú cặc', 0),
(174, 'USER_3FSERA66OLHQGDHR8', 'POST_3FSERA27CLHLFRXN7', 0, 0, '2023-05-16 23:29:36', 'ok', 0),
(175, 'USER_3FSERA66OLHQGDHR8', 'POST_3FSERA27CLHLFRXN7', 0, 0, '2023-05-16 23:29:43', 'okkkk', 0),
(176, 'USER_3FSERA66OLHQGDHR8', 'POST_3FSERA27CLHLFRXN7', 0, 0, '2023-05-16 23:29:54', 's', 0),
(177, 'USER_3FSERAA9WLEOIEWG5', 'POST_3FSERA27CLHLFRXN7', 0, 0, '2023-05-16 23:30:16', 'nề', 0),
(178, 'USER_3FSERA66OLHQGDHR8', 'POST_3FSERA27CLHLFRXN7', 0, 0, '2023-05-16 23:30:19', 'thiên óc chó', 0),
(179, 'USER_3FSERAA9WLEOIEWG5', 'POST_3FSERA27CLHLFRXN7', 0, 0, '2023-05-16 23:30:22', 'thấy k', 0),
(180, 'USER_3FSERAA9WLEOIEWG5', 'POST_3FSERA27CLHLFRXN7', 0, 0, '2023-05-16 23:30:27', 'ok', 0),
(181, 'USER_3FSERAA9WLEOIEWG5', 'POST_3FSERA27CLHLFRXN7', 180, 180, '2023-05-16 23:30:31', 'k', 0),
(182, 'USER_3FSERA66OLHQGDHR8', 'POST_3FSERA9Q0LHIXCHCR', 0, 0, '2023-05-16 23:31:02', 'thiên óc chó', 0),
(183, 'USER_3FSERAA9WLEOIEWG5', 'POST_3FSERA66OLHQGX0JK', 0, 0, '2023-05-18 20:24:35', 'lllll', 0),
(184, 'USER_3FSERAA9WLEOIEWG5', 'POST_3FSERA66OLHQGX0JK', 183, 183, '2023-05-18 20:24:38', 'lll', 0),
(186, 'USER_3FSERAA9WLEOIEWG5', 'POST_3FSERA1A8LGM0BB3W', 0, 0, '2023-05-25 14:55:25', 'gfgfg', 0),
(187, 'USER_3FSERA2MGLEWOAK2I', 'POST_3FSERABHWLI45J0H9', 0, 0, '2023-05-26 12:58:16', 'Mọi người like giúp mình nhé', 0),
(188, 'USER_3FSERAA9WLEOIEWG5', 'POST_3FSERA1SWLHFXSAL2', 0, 0, '2023-05-26 16:00:52', '😁😁😁😁😁', 0),
(189, 'USER_3FSERAA9WLEOIEWG5', 'POST_3FSERABHWLI45J0H9', 187, 187, '2023-05-27 12:16:14', 'ddeso', 0),
(190, 'USER_3FSERAA9WLEOIEWG5', 'POST_3FSERAD4CLI6V4SHY', 0, 0, '2023-05-29 15:10:23', 'Cầu quê mình đó mấy bạn ơi! ', 0),
(191, 'USER_3FSERAA9WLEOIEWG5', 'POST_3FSERAD4CLI6V4SHY', 0, 0, '2023-05-31 16:35:22', 'alo', 0),
(192, 'USER_3FSERAA9WLEOIEWG5', 'POST_3FSERAD4CLI6V4SHY', 191, 191, '2023-05-31 16:35:25', 'kkkk', 0),
(193, 'USER_3FSERAA9WLEOIEWG5', 'POST_3FSERAD4CLI61N19G', 0, 0, '2023-05-31 16:35:56', 'lll', 0),
(194, 'USER_3FSERAA9WLEOIEWG5', 'POST_3FSERAD4CLI6V4SHY', 190, 190, '2023-05-31 17:11:06', 'ok', 0),
(195, 'USER_3FSERAA9WLEOIEWG5', 'POST_3FSERAD4CLI6V4SHY', 190, 194, '2023-05-31 17:11:13', 'iiii', 0),
(196, 'USER_3FSERAA9WLEOIEWG5', 'POST_3FSERAD4CLI6V4SHY', 190, 195, '2023-06-05 15:38:57', 'ok nè ', 0),
(199, 'USER_3FSERAA9WLEOIEWG5', 'POST_3FSERAD4CLI6V4SHY', 0, 0, '2023-06-06 11:03:45', 'namnguyen', 0),
(200, 'USER_3FSERAA9WLEOIEWG5', 'POST_3FSERAD4CLI6V4SHY', 199, 199, '2023-06-06 11:03:49', 'kkkk', 0),
(206, 'USER_3FSERAA9WLEOIEWG5', 'POST_3FSERAD2WLIQ5YM13', 0, 0, '2023-06-11 17:31:06', 'oô', 0),
(207, 'USER_3FSERAA9WLEOIEWG5', 'POST_3FSERAD2WLIQ5YM13', 206, 206, '2023-06-11 17:31:10', 'ok', 0);

-- --------------------------------------------------------

--
-- Table structure for table `follow`
--

CREATE TABLE `follow` (
  `id_follow` int(11) NOT NULL,
  `id_user` varchar(50) NOT NULL,
  `id_follower` varchar(50) NOT NULL,
  `status` varchar(50) DEFAULT NULL,
  `datetime` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `follow`
--

INSERT INTO `follow` (`id_follow`, `id_user`, `id_follower`, `status`, `datetime`) VALUES
(12, 'USER_3FSERA2MGLEWOCMNF', 'USER_3FSERA2MGLEWOAK2I', 'accept', '2023-05-13 11:48:50'),
(14, 'USER_3FSERA2MGLEWOAK2I', 'USER_3FSERA2MGLEWODXGU', 'accept', '2023-05-13 11:48:50'),
(26, 'USER_3FSERABRKLGGAEPGS', 'USER_3FSERA2MGLEWOAK2I', 'waiting', '2023-05-13 11:48:50'),
(50, 'USER_3FSERA214LHD9XTSH', 'USER_3FSERAA9WLEOIEWG5', 'waiting', '2023-05-13 11:48:50'),
(53, 'USER_3FSERAA9WLEOIEWG5', 'USER_3FSERA9Q0LHIX3ZO8', 'reject', '2023-05-13 11:48:50'),
(54, 'USER_3FSERAASKLGDXHW2Q', 'USER_3FSERA9Q0LHIX3ZO8', 'accept', '2023-05-13 11:48:50'),
(84, 'USER_3FSERA9Q0LHIX3ZO8', 'USER_3FSERA2MGLEWOAK2I', 'waiting', '2023-05-13 11:48:50'),
(85, 'USER_3FSERA9Q0LHIX3ZO8', 'USER_3FSERAA9WLEOIEWG5', 'waiting', '2023-05-13 11:48:50'),
(86, 'USER_3FSERA2MGLEWOAK2I', 'USER_3FSERAASKLGDXHW2Q', 'accept', '2023-05-13 11:48:50'),
(114, 'USER_3FSERAASKLGDXHW2Q', 'USER_3FSERA2MGLEWOAK2I', 'waiting', '2023-05-15 13:21:00'),
(120, 'USER_3FSERAASKLGDXHW2Q', 'USER_3FSERA10GLHOI5LKQ', 'waiting', '2023-05-16 17:46:59'),
(122, 'USER_3FSERA214LHD9H2NX', 'USER_3FSERAA9WLEOIEWG5', 'waiting', '2023-05-16 17:56:22'),
(126, 'USER_3FSERACH4LERDMQYF', 'USER_3FSERA66OLHQGDHR8', 'waiting', '2023-05-16 23:05:25'),
(129, 'USER_3FSERA3T0LHUMZTYL', 'USER_3FSERA10GLHOI5LKQ', 'accept', '2023-05-20 16:48:14'),
(130, 'USER_3FSERA214LHD9H2NX', 'USER_3FSERA10GLHOI5LKQ', 'waiting', '2023-05-20 16:48:46'),
(142, 'USER_3FSERA3T0LHUMZTYL', 'USER_3FSERABPCLHRGKTPU', 'waiting', '2023-05-22 11:19:46'),
(143, 'USER_3FSERAA9WLEOIEWG5', 'USER_3FSERA66OLHQGDHR8', 'accept', '2023-05-25 15:36:57'),
(144, 'USER_3FSERAA9WLEOIEWG5', 'USER_3FSERA214LHD9XTSH', 'waiting', '2023-05-25 15:37:41'),
(145, 'USER_3FSERA9R8LHVFWCK7', 'USER_3FSERA2MGLEWOAK2I', 'waiting', '2023-05-26 13:18:48'),
(150, 'USER_3FSERAA9WLEOIEWG5', 'USER_3FSERAASKLGDX7FR3', 'accept', '2023-06-06 11:16:22'),
(151, 'USER_3FSERA2MGLEWOAK2I', 'USER_3FSERAA9WLEOIEWG5', 'accept', '2023-06-10 10:01:02'),
(152, 'USER_3FSERA2MGLEWODXGU', 'USER_3FSERAA9WLEOIEWG5', 'waiting', '2023-06-10 10:01:13'),
(153, 'USER_3FSERAA9WLEOIEWG5', 'USER_3FSERA2MGLEWOAK2I', 'accept', '2023-06-10 10:01:37'),
(155, 'USER_3FSERAA9WLEOIEWG5', 'USER_3FSERAD2WLIQ59IJR', 'accept', '2023-06-10 22:21:48'),
(156, 'USER_3FSERAA9WLEOIEWG5', 'USER_3FSERA2MGLEWODXGU', 'accept', '2023-06-10 22:23:07'),
(157, 'USER_3FSERAASKLGDXHW2Q', 'USER_3FSERAA9WLEOIEWG5', 'accept', '2023-06-10 22:26:21'),
(158, 'USER_3FSERACH4LERDMQYF', 'USER_3FSERAA9WLEOIEWG5', 'waiting', '2023-06-10 22:26:31');

-- --------------------------------------------------------

--
-- Table structure for table `love`
--

CREATE TABLE `love` (
  `id_user` varchar(50) NOT NULL,
  `id_post` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `love`
--

INSERT INTO `love` (`id_user`, `id_post`) VALUES
('USER_3FSERA214LHD9H2NX', 'POST_3FSERA214LHD9L3KL'),
('USER_3FSERA2MGLEWOAK2I', 'POST_3FSERA1A8LGM0BB3W'),
('USER_3FSERA2MGLEWOAK2I', 'POST_3FSERA1SWLHFXSAL2'),
('USER_3FSERA2MGLEWOAK2I', 'POST_3FSERA8GGLFFK0LFG'),
('USER_3FSERA2MGLEWOAK2I', 'POST_3FSERA92CLHLH33E3'),
('USER_3FSERA2MGLEWOAK2I', 'POST_3FSERA9Q0LHIXCHCR'),
('USER_3FSERA2MGLEWOAK2I', 'POST_3FSERA9SKLGKSNVAB'),
('USER_3FSERA2MGLEWOAK2I', 'POST_3FSERAAXKLHBFJ3BU'),
('USER_3FSERA2MGLEWOAK2I', 'POST_3FSERABHWLI45J0H9'),
('USER_3FSERA2MGLEWOCMNF', 'POST_3FSERAD4CLI61NHE8'),
('USER_3FSERA2MGLEWODXGU', 'POST_3FSERA92CLHLH33E3'),
('USER_3FSERA66OLHQGDHR8', 'POST_3FSERAD2WLIQ5YM13'),
('USER_3FSERA66OLHQGDHR8', 'POST_3FSERAD4CLI61NHE8'),
('USER_3FSERA9Q0LHIX3ZO8', 'POST_3FSERA1SWLHFXSAL2'),
('USER_3FSERA9Q0LHIX3ZO8', 'POST_3FSERA214LHD9Z9DU'),
('USER_3FSERA9Q0LHIX3ZO8', 'POST_3FSERA9Q0LHIXCHCR'),
('USER_3FSERA9Q0LHIX3ZO8', 'POST_3FSERAAXKLHBFJ3BU'),
('USER_3FSERA9Q0LHIX3ZO8', 'POST_3FSERABM0LHIKUOHH'),
('USER_3FSERAA9WLEOIEWG5', 'POST_3FSERA1A8LGM0BB3W'),
('USER_3FSERAA9WLEOIEWG5', 'POST_3FSERA1SGLI5SS8E2'),
('USER_3FSERAA9WLEOIEWG5', 'POST_3FSERA27CLHLG3GFN'),
('USER_3FSERAA9WLEOIEWG5', 'POST_3FSERA3BOLHHS263Q'),
('USER_3FSERAA9WLEOIEWG5', 'POST_3FSERA66OLHQGX0JK'),
('USER_3FSERAA9WLEOIEWG5', 'POST_3FSERA8GGLFFK0LFG'),
('USER_3FSERAA9WLEOIEWG5', 'POST_3FSERA92CLHLH33E3'),
('USER_3FSERAA9WLEOIEWG5', 'POST_3FSERA9SKLGKSNVAB'),
('USER_3FSERAA9WLEOIEWG5', 'POST_3FSERABCGLHLGE9O7'),
('USER_3FSERAA9WLEOIEWG5', 'POST_3FSERABHWLI45J0H9'),
('USER_3FSERAA9WLEOIEWG5', 'POST_3FSERABM0LHIK2NHX'),
('USER_3FSERAA9WLEOIEWG5', 'POST_3FSERABM0LHIKSGPX'),
('USER_3FSERAA9WLEOIEWG5', 'POST_3FSERABM0LHIKUOHH'),
('USER_3FSERAA9WLEOIEWG5', 'POST_3FSERAD2WLIQ5YM13'),
('USER_3FSERAA9WLEOIEWG5', 'POST_3FSERAD4CLI61N19G'),
('USER_3FSERAASKLGDXHW2Q', 'POST_3FSERA1SWLHFXSAL2'),
('USER_3FSERAASKLGDXHW2Q', 'POST_3FSERA214LHD9Z9DU'),
('USER_3FSERAASKLGDXHW2Q', 'POST_3FSERA3BOLHHS263Q'),
('USER_3FSERAASKLGDXHW2Q', 'POST_3FSERABM0LHIK2NHX'),
('USER_3FSERAASKLGDXHW2Q', 'POST_3FSERABM0LHIKSGPX'),
('USER_3FSERAASKLGDXHW2Q', 'POST_3FSERABM0LHIKUOHH');

-- --------------------------------------------------------

--
-- Table structure for table `media`
--

CREATE TABLE `media` (
  `id_media` varchar(50) NOT NULL,
  `id_post` varchar(50) NOT NULL,
  `type` varchar(10) DEFAULT '''image''',
  `media_link` text NOT NULL,
  `caption` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `media`
--

INSERT INTO `media` (`id_media`, `id_post`, `type`, `media_link`, `caption`) VALUES
('MEDIA_3FSERA1A8LGM0BB6S', 'POST_3FSERA1A8LGM0BB3W', 'image', '1681806746787-366830686.jpg', NULL),
('MEDIA_3FSERA1SGLI5SS8E9', 'POST_3FSERA1SGLI5SS8E2', 'video', '1685180205266-66487208.mp4', NULL),
('MEDIA_3FSERA1SGLI5ST7ZI', 'POST_3FSERA1SGLI5ST7XZ', 'video', '1685180251483-762656003.mp4', NULL),
('MEDIA_3FSERA1SGLI5SVZ51', 'POST_3FSERA1SGLI5SVZ4K', 'video', '1685180379946-578506802.mp4', NULL),
('MEDIA_3FSERA1SGLI5SYN75', 'POST_3FSERA1SGLI5SYN55', 'video', '1685180504428-406908320.mp4', NULL),
('MEDIA_3FSERA1SGLI612JNL', 'POST_3FSERA1SGLI612JM6', 'video', '1685194123324-312775454.mp4', NULL),
('MEDIA_3FSERA1SWLHFXSALZ', 'POST_3FSERA1SWLHFXSAL2', 'image', '1683616485753-927053730.jpg', NULL),
('MEDIA_3FSERA214LHD9L3LK', 'POST_3FSERA214LHD9L3KL', 'video', '1683454906920-99939766.mp4', NULL),
('MEDIA_3FSERA214LHD9Z9EF', 'POST_3FSERA214LHD9Z9DU', 'video', '1683455567677-576657104.mp4', NULL),
('MEDIA_3FSERA27CLHLFRXOQ', 'POST_3FSERA27CLHLFRXN7', 'video', '1683949032971-600811742.mp4', NULL),
('MEDIA_3FSERA27CLHLFSGMY', 'POST_3FSERA27CLHLFSGMN', 'video', '1683949057292-492749821.mp4', NULL),
('MEDIA_3FSERA27CLHLFT68F', 'POST_3FSERA27CLHLFT681', 'video', '1683949090603-422226613.mp4', NULL),
('MEDIA_3FSERA27CLHLFT68G', 'POST_3FSERA27CLHLFT681', 'video', '1683949090723-522327732.mp4', NULL),
('MEDIA_3FSERA27CLHLFT68H', 'POST_3FSERA27CLHLFT681', 'video', '1683949090744-140279030.mp4', NULL),
('MEDIA_3FSERA27CLHLFVUWR', 'POST_3FSERA27CLHLFVUVU', 'video', '1683949215916-121449892.mp4', NULL),
('MEDIA_3FSERA27CLHLFVUWS', 'POST_3FSERA27CLHLFVUVU', 'video', '1683949215983-458388281.mp4', NULL),
('MEDIA_3FSERA27CLHLFVUWT', 'POST_3FSERA27CLHLFVUVU', 'video', '1683949216014-420384408.mp4', NULL),
('MEDIA_3FSERA27CLHLFW16O', 'POST_3FSERA27CLHLFW16B', 'video', '1683949223740-522008372.mp4', NULL),
('MEDIA_3FSERA27CLHLFW16P', 'POST_3FSERA27CLHLFW16B', 'video', '1683949223984-925266386.mp4', NULL),
('MEDIA_3FSERA27CLHLG3GGD', 'POST_3FSERA27CLHLG3GFN', 'video', '1683949570398-673692324.mp4', NULL),
('MEDIA_3FSERA27CLHLG3GGE', 'POST_3FSERA27CLHLG3GFN', 'video', '1683949570473-413703959.mp4', NULL),
('MEDIA_3FSERA3BOLHHS266I', 'POST_3FSERA3BOLHHS263Q', 'video', '1683727801078-282636507.mp4', NULL),
('MEDIA_3FSERA5C4LHRG3ZTD', 'POST_3FSERA5C4LHRG3ZT1', 'video', '1684312392598-520170190.mp4', NULL),
('MEDIA_3FSERA66OLHQGX0JN', 'POST_3FSERA66OLHQGX0JK', 'image', '1684253279638-365607332.jpg', NULL),
('MEDIA_3FSERA66OLHQGX0JO', 'POST_3FSERA66OLHQGX0JK', 'image', '1684253279638-52669221.png', NULL),
('MEDIA_3FSERA66OLHQGX0JP', 'POST_3FSERA66OLHQGX0JK', 'image', '1684253280440-809914783.png', NULL),
('MEDIA_3FSERA8GGLFFK0LG5', 'POST_3FSERA8GGLFFK0LFG', 'video', '1679239793643-350501738.mp4', NULL),
('MEDIA_3FSERA92CLHLH33EI', 'POST_3FSERA92CLHLH33E3', 'video', '1683951323791-860007262.mp4', NULL),
('MEDIA_3FSERA92CLHLH33EJ', 'POST_3FSERA92CLHLH33E3', 'video', '1683951228013-27203677.mp4', NULL),
('MEDIA_3FSERA92CLHLH33EK', 'POST_3FSERA92CLHLH33E3', 'video', '1683951228939-113206752.mp4', NULL),
('MEDIA_3FSERA92CLHLH33EL', 'POST_3FSERA92CLHLH33E3', 'video', '1683951229728-837635970.mp4', NULL),
('MEDIA_3FSERA92CLHLH33EM', 'POST_3FSERA92CLHLH33E3', 'video', '1683951232867-774624711.mp4', NULL),
('MEDIA_3FSERA9Q0LHIXCHDC', 'POST_3FSERA9Q0LHIXCHCR', 'image', '1683797146491-63734456.jpg', NULL),
('MEDIA_3FSERA9SKLGKSNVBJ', 'POST_3FSERA9SKLGKSNVAB', 'image', '1681733429729-815787079.jpg', NULL),
('MEDIA_3FSERA9SKLGKSYXSS', 'POST_3FSERA8GGLFFK0LFG', 'image', '1681733946231-369130886.jpg', NULL),
('MEDIA_3FSERA9SKLGKSYXST', 'POST_3FSERA8GGLFFK0LFG', 'image', '1681733946232-647061851.jpg', NULL),
('MEDIA_3FSERA9SKLGKSYXSU', 'POST_3FSERA8GGLFFK0LFG', 'image', '1681733946233-718635237.png', NULL),
('MEDIA_3FSERAAXKLHBFJ3CO', 'POST_3FSERAAXKLHBFJ3BU', 'image', '1683343952186-705093978.jpg', NULL),
('MEDIA_3FSERABCGLHLGE9OO', 'POST_3FSERABCGLHLGE9O7', 'video', '1683950074671-664550395.mp4', NULL),
('MEDIA_3FSERABCGLHLGE9OP', 'POST_3FSERABCGLHLGE9O7', 'image', '1683950074951-742268392.jpg', NULL),
('MEDIA_3FSERABHWLI45J0HS', 'POST_3FSERABHWLI45J0H9', 'image', '1685080677349-398281251.jpg', NULL),
('MEDIA_3FSERABM0LHIK2NJ1', 'POST_3FSERABM0LHIK2NHX', 'video', '1683774852869-733891440.mp4', NULL),
('MEDIA_3FSERABM0LHIKSGQ2', 'POST_3FSERABM0LHIKSGPX', 'video', '1683776057213-933636835.mp4', NULL),
('MEDIA_3FSERABM0LHIKUOI2', 'POST_3FSERABM0LHIKUOHH', 'video', '1683776160613-364494209.mp4', NULL),
('MEDIA_3FSERAD2WLIQ5V5K0', 'POST_3FSERAD2WLIQ5V5JK', 'image', '1686411500171-80099933.jpg', NULL),
('MEDIA_3FSERAD2WLIQ5XTXQ', 'POST_3FSERAD2WLIQ5XTXE', 'video', '1686411852710-940174247.mp4', NULL),
('MEDIA_3FSERAD2WLIQ5YM1O', 'POST_3FSERAD2WLIQ5YM13', 'video', '1686411661343-572350929.mp4', NULL),
('MEDIA_3FSERAD4CLI61N1A4', 'POST_3FSERAD4CLI61N19G', 'video', '1685195070218-797076644.mp4', NULL),
('MEDIA_3FSERAD4CLI61NHEJ', 'POST_3FSERAD4CLI61NHE8', 'video', '1685195100329-76124369.mp4', NULL),
('MEDIA_3FSERAD4CLI61X06S', 'POST_3FSERAD4CLI61X062', 'video', '1685195544555-58867075.mp4', NULL),
('MEDIA_3FSERAD4CLI6V4SIA', 'POST_3FSERAD4CLI6V4SHY', 'image', '1685244616763-256697904.jpg', NULL),
('MEDIA_3FSERAD4CLI6V4SIB', 'POST_3FSERAD4CLI6V4SHY', 'image', '1685244616763-942616691.jpg', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `notification`
--

CREATE TABLE `notification` (
  `id_notification` int(11) NOT NULL,
  `id_user` varchar(50) NOT NULL,
  `datetime` datetime NOT NULL DEFAULT current_timestamp(),
  `id_post` varchar(50) DEFAULT NULL,
  `id_actor` varchar(50) DEFAULT NULL,
  `id_comment` int(11) DEFAULT NULL,
  `id_follow` int(11) DEFAULT NULL,
  `type` varchar(50) NOT NULL,
  `content` int(11) DEFAULT NULL,
  `is_seen` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `notification`
--

INSERT INTO `notification` (`id_notification`, `id_user`, `datetime`, `id_post`, `id_actor`, `id_comment`, `id_follow`, `type`, `content`, `is_seen`) VALUES
(130, 'USER_3FSERAASKLGDXHW2Q', '2023-05-16 17:46:59', NULL, 'USER_3FSERA10GLHOI5LKQ', NULL, 120, 'follow', NULL, 0),
(132, 'USER_3FSERA214LHD9H2NX', '2023-05-16 17:56:22', NULL, 'USER_3FSERAA9WLEOIEWG5', NULL, 122, 'follow', NULL, 0),
(136, 'USER_3FSERACH4LERDMQYF', '2023-05-16 23:05:25', NULL, 'USER_3FSERA66OLHQGDHR8', NULL, 126, 'follow', NULL, 0),
(143, 'USER_3FSERA66OLHQGDHR8', '2023-05-18 20:29:52', 'POST_3FSERA66OLHQGX0JK', 'undefined', NULL, NULL, 'banned_post', NULL, 0),
(145, 'USER_3FSERA214LHD9H2NX', '2023-05-20 16:48:46', NULL, 'USER_3FSERA10GLHOI5LKQ', NULL, 130, 'follow', NULL, 0),
(157, 'USER_3FSERA3T0LHUMZTYL', '2023-05-22 11:19:46', NULL, 'USER_3FSERABPCLHRGKTPU', NULL, 142, 'follow', NULL, 0),
(159, 'USER_3FSERAA9WLEOIEWG5', '2023-05-25 15:37:41', NULL, 'USER_3FSERA214LHD9XTSH', NULL, 144, 'follow', NULL, 0),
(160, 'USER_3FSERA9R8LHVFWCK7', '2023-05-26 13:18:49', NULL, 'USER_3FSERA2MGLEWOAK2I', NULL, 145, 'follow', NULL, 0),
(171, 'USER_3FSERAA9WLEOIEWG5', '2023-06-05 21:13:19', 'POST_3FSERA1A8LGM0BB3W', 'undefined', NULL, NULL, 'banned_post', NULL, 0),
(172, 'USER_3FSERA66OLHQGDHR8', '2023-06-06 11:07:31', NULL, 'USER_3FSERAA9WLEOIEWG5', NULL, 143, 'accept_follow', NULL, 0),
(173, 'USER_3FSERA2MGLEWOAK2I', '2023-06-06 11:11:38', 'POST_3FSERABHWLI45J0H9', 'undefined', NULL, NULL, 'banned_post', NULL, 0),
(176, 'USER_3FSERAASKLGDX7FR3', '2023-06-07 08:19:48', NULL, 'USER_3FSERAA9WLEOIEWG5', NULL, 150, 'accept_follow', NULL, 0),
(178, 'USER_3FSERA2MGLEWODXGU', '2023-06-10 10:01:13', NULL, 'USER_3FSERAA9WLEOIEWG5', NULL, 152, 'follow', NULL, 0),
(179, 'USER_3FSERAA9WLEOIEWG5', '2023-06-10 10:01:30', NULL, 'USER_3FSERA2MGLEWOAK2I', NULL, 151, 'accept_follow', NULL, 0),
(183, 'USER_3FSERA66OLHQGDHR8', '2023-06-10 21:58:07', 'POST_3FSERA66OLHQGX0JK', 'undefined', NULL, NULL, 'banned_post', NULL, 0),
(186, 'USER_3FSERAD2WLIQ59IJR', '2023-06-10 22:23:52', NULL, 'USER_3FSERAA9WLEOIEWG5', NULL, 155, 'accept_follow', NULL, 0),
(187, 'USER_3FSERA2MGLEWODXGU', '2023-06-10 22:24:05', NULL, 'USER_3FSERAA9WLEOIEWG5', NULL, 156, 'accept_follow', NULL, 0),
(189, 'USER_3FSERACH4LERDMQYF', '2023-06-10 22:26:31', NULL, 'USER_3FSERAA9WLEOIEWG5', NULL, 158, 'follow', NULL, 0),
(190, 'USER_3FSERAA9WLEOIEWG5', '2023-06-10 22:27:13', NULL, 'USER_3FSERAASKLGDXHW2Q', NULL, 157, 'accept_follow', NULL, 0),
(191, 'USER_3FSERA10GLHOI5LKQ', '2023-06-10 22:27:43', NULL, 'USER_3FSERA3T0LHUMZTYL', NULL, 129, 'accept_follow', NULL, 0),
(192, 'USER_3FSERA2MGLEWOAK2I', '2023-06-11 17:31:52', NULL, 'USER_3FSERAA9WLEOIEWG5', NULL, 153, 'accept_follow', NULL, 0);

-- --------------------------------------------------------

--
-- Table structure for table `post`
--

CREATE TABLE `post` (
  `id_post` varchar(50) NOT NULL,
  `id_user` varchar(50) NOT NULL,
  `target` varchar(50) NOT NULL DEFAULT 'public',
  `type` varchar(50) NOT NULL DEFAULT 'post',
  `date_time` datetime NOT NULL DEFAULT current_timestamp(),
  `description` text DEFAULT NULL,
  `views` int(11) NOT NULL DEFAULT 0,
  `is_banned` tinyint(1) DEFAULT 0,
  `banned_reason` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `post`
--

INSERT INTO `post` (`id_post`, `id_user`, `target`, `type`, `date_time`, `description`, `views`, `is_banned`, `banned_reason`) VALUES
('POST_3FSERA1A8LGM0BB3W', 'USER_3FSERAA9WLEOIEWG5', 'public', 'post', '2023-04-18 15:32:26', 'Material Icons\n2,100+ ready-to-use React Material Icons from the official website.\nads via Carbon\nGet 10 free Adobe Stock photos. Start downloading amazing royalty-free stock photos today.\nads via Carbon\n\nThe following npm package, @mui/icons-material, includes the 2,100+ official Material Icons converted to SvgIcon components.\n\nThe @mui/icons-material package depends on @mui/material, which requires Emotion packages. If you don\'t use Material UI in your project yet, install the icons package with: npm install @mui/icons-material @mui/material @emotion/styled @emotion/react.\n\nSee the Installation page for additional docs about how to make sure everything is set up correctly.\n\nFilled\nOutlined\nRounded\nTwo tone\nSharp\nprev\n10 matching results\n\nPreview\nSkipPrevious\nRemoveRedEye\nUndo\nVisibility\nArrowBack\nArrowBackIos\nArrowBackIosNew\nArrowLeft\nSkipNext\nℹ️ The search supports synonyms. Try searching for \"hamburger\" or \"logout\".\n\nAPI\nSee the documentation below for a complete reference to all of the props and classes available to the components mentioned here.\n\n<Icon />\n<SvgIcon />\nMaterial Icons\n2,100+ ready-to-use React Material Icons from the official website.\nads via Carbon\nGet 10 free Adobe Stock photos. Start downloading amazing royalty-free stock photos today.\nads via Carbon\n\nThe following npm package, @mui/icons-material, includes the 2,100+ official Material Icons converted to SvgIcon components.\n\nThe @mui/icons-material package depends on @mui/material, which requires Emotion packages. If you don\'t use Material UI in your project yet, install the icons package with: npm install @mui/icons-material @mui/material @emotion/styled @emotion/react.\n\nSee the Installation page for additional docs about how to make sure everything is set up correctly.\n\nFilled\nOutlined\nRounded\nTwo tone\nSharp\nprev\n10 matching results\n\nPreview\nSkipPrevious\nRemoveRedEye\nUndo\nVisibility\nArrowBack\nArrowBackIos\nArrowBackIosNew\nArrowLeft\nSkipNext\nℹ️ The search supports synonyms. Try searching for \"hamburger\" or \"logout\".\n\nAPI\nSee the documentation below for a complete reference to all of the props and classes available to the components mentioned here.\n\n<Icon />\n<SvgIcon />\n Không cần phải ống kính, mưa đã sống trong tao', 0, 1, 'bài đăng này không hợp lệ!'),
('POST_3FSERA1SGLI5SS8E2', 'USER_3FSERA214LHD9XTSH', 'public', 'reel', '2023-05-27 16:36:45', 'Quê các bạn đã đến mùa gặt chưa!', 0, 0, NULL),
('POST_3FSERA1SGLI5ST7XZ', 'USER_3FSERAASKLGDXHW2Q', 'public', 'reel', '2023-05-27 16:37:31', 'Bánh cuốn quá nè !', 0, 0, NULL),
('POST_3FSERA1SGLI5SVZ4K', 'USER_3FSERACKGLI49BH5U', 'public', 'reel', '2023-05-27 16:39:40', 'Thác k50 nề ae ơi', 0, 0, NULL),
('POST_3FSERA1SGLI5SYN55', 'USER_3FSERACKGLI49BH5U', 'follower', 'reel', '2023-05-27 16:41:44', 'Sài gòn nề mấy bạn', 0, 0, NULL),
('POST_3FSERA1SGLI612JM6', 'USER_3FSERA66OLHQGDHR8', 'public', 'reel', '2023-05-27 20:28:43', 'Cách nói chuyện với người lớn tuổi hơn mình', 0, 0, NULL),
('POST_3FSERA1SWLHFXSAL2', 'USER_3FSERA2MGLEWOAK2I', 'public', 'post', '2023-05-09 14:14:45', 'Suy cho cùng cũng chỉ là người dưng 😢😢', 0, 0, NULL),
('POST_3FSERA214LHD9L3KL', 'USER_3FSERA214LHD9H2NX', 'public', 'post', '2023-05-07 17:21:46', 'Chìu mưa nhớ sỷ 💖', 0, 0, NULL),
('POST_3FSERA214LHD9Z9DU', 'USER_3FSERA214LHD9XTSH', 'public', 'post', '2023-05-07 17:32:47', '😘😘😘😘😘', 0, 0, NULL),
('POST_3FSERA27CLHLFRXN7', 'USER_3FSERAA9WLEOIEWG5', 'public', 'post', '2023-05-13 10:37:13', 'alo', 0, 0, NULL),
('POST_3FSERA27CLHLFSGMN', 'USER_3FSERAASKLGDXHW2Q', 'public', 'post', '2023-05-13 10:37:37', 'hôm nay trời đẹp', 0, 0, NULL),
('POST_3FSERA27CLHLFT681', 'USER_3FSERAA9WLEOIEWG5', 'public', 'post', '2023-05-13 10:38:10', 'alo', 0, 0, NULL),
('POST_3FSERA27CLHLFVUVU', 'USER_3FSERAA9WLEOIEWG5', 'public', 'post', '2023-05-13 10:40:16', '123', 0, 0, NULL),
('POST_3FSERA27CLHLFW16B', 'USER_3FSERAASKLGDXHW2Q', 'public', 'post', '2023-05-13 10:40:24', 'test.1234', 0, 0, NULL),
('POST_3FSERA27CLHLG3GFN', 'USER_3FSERAA9WLEOIEWG5', 'public', 'post', '2023-05-13 10:46:10', 'lll', 0, 1, NULL),
('POST_3FSERA3BOLHHS263Q', 'USER_3FSERAA9WLEOIEWG5', 'public', 'reel', '2023-05-10 21:10:01', 'dance with me', 0, 0, NULL),
('POST_3FSERA5C4LHRG3ZT1', 'USER_3FSERAASKLGDX7FR3', 'public', 'post', '2023-05-17 15:33:12', 'ok la', 0, 0, NULL),
('POST_3FSERA66OLHQGX0JK', 'USER_3FSERA66OLHQGDHR8', 'follower', 'post', '2023-05-16 23:08:00', '1123123123', 0, 0, 'Null'),
('POST_3FSERA8GGLFFK0LFG', 'USER_3FSERAA9WLEOIEWG5', 'public', 'post', '2023-03-19 22:29:53', 'update', 0, 0, NULL),
('POST_3FSERA92CLHLH33E3', 'USER_3FSERAASKLGDXHW2Q', 'public', 'post', '2023-05-13 11:13:53', '1234567809', 0, 0, NULL),
('POST_3FSERA9Q0LHIXCHCR', 'USER_3FSERA9Q0LHIX3ZO8', 'public', 'post', '2023-05-11 16:25:46', 'ưewe', 0, 0, NULL),
('POST_3FSERA9SKLGKSNVAB', 'USER_3FSERAA9WLEOIEWG5', 'public', 'post', '2023-04-17 19:10:29', ' Giấc mơ trong mưa, niềm tin tràn ngập trong hoàn cảnh ái ân', 0, 0, NULL),
('POST_3FSERAAXKLHBFJ3BU', 'USER_3FSERA2MGLEWOAK2I', 'public', 'post', '2023-05-06 10:32:38', 'ok', 0, 0, NULL),
('POST_3FSERABCGLHLGE9O7', 'USER_3FSERAA9WLEOIEWG5', 'public', 'post', '2023-05-13 10:54:35', 'alo', 0, 0, NULL),
('POST_3FSERABHWLI45J0H9', 'USER_3FSERA2MGLEWOAK2I', 'public', 'post', '2023-05-26 12:57:57', 'Người mà tôi thương và yêu', 0, 1, 'bài đăng này không được không phù hợp với quy định của chúng tôi!'),
('POST_3FSERABM0LHIK2NHX', 'USER_3FSERACH4LERDMQYF', 'public', 'reel', '2023-05-11 10:14:12', 'nhớ nhà quá đê 😂', 0, 0, NULL),
('POST_3FSERABM0LHIKSGPX', 'USER_3FSERA2MGLEWOCMNF', 'public', 'reel', '2023-05-11 10:34:17', 'thú nhà mình 😒😒😒😒😒', 0, 0, NULL),
('POST_3FSERABM0LHIKUOHH', 'USER_3FSERAASKLGDXHW2Q', 'public', 'reel', '2023-05-11 10:36:00', 'tặng huệ 💋💋💋💋', 0, 0, NULL),
('POST_3FSERAD2WLIQ5V5JK', 'USER_3FSERAD2WLIQ59IJR', 'public', 'post', '2023-06-10 22:38:20', 'Cơm ở đây ngon nè mọi người', 0, 0, NULL),
('POST_3FSERAD2WLIQ5XTXE', 'USER_3FSERA66OLHQGDHR8', 'public', 'reel', '2023-06-10 22:40:25', 'Nhớ mưa', 0, 0, NULL),
('POST_3FSERAD2WLIQ5YM13', 'USER_3FSERA66OLHQGDHR8', 'public', 'post', '2023-06-10 22:41:01', 'Cài đặt bluttok', 0, 0, NULL),
('POST_3FSERAD4CLI61N19G', 'USER_3FSERA66OLHQGDHR8', 'public', 'reel', '2023-05-27 20:44:39', 'Lại một mùa hoa dã quỳ nữa 😢😢😢😢', 0, 0, NULL),
('POST_3FSERAD4CLI61NHE8', 'USER_3FSERA66OLHQGDHR8', 'public', 'reel', '2023-05-27 20:45:00', 'Chỉ còn ít ngày nữa là chúng ta phải xa nhau rồi sao🥺', 0, 0, NULL),
('POST_3FSERAD4CLI61X062', 'USER_3FSERA2MGLEWOCMNF', 'public', 'reel', '2023-05-27 20:52:24', 'Top lofi chill ✌✌✌', 0, 0, NULL),
('POST_3FSERAD4CLI6V4SHY', 'USER_3FSERAA9WLEOIEWG5', 'public', 'post', '2023-05-28 10:30:16', 'Qua cầu về quê 😉😉😉', 0, 0, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `report`
--

CREATE TABLE `report` (
  `id_user` varchar(50) NOT NULL,
  `id_post` varchar(50) NOT NULL,
  `reason` text NOT NULL,
  `datetime` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `report`
--

INSERT INTO `report` (`id_user`, `id_post`, `reason`, `datetime`) VALUES
('USER_3FSERA2MGLEWOAK2I', 'POST_3FSERA1A8LGM0BB3W', 'Có từ ngữ nhạy cảm', '2023-05-16 00:00:00'),
('USER_3FSERA2MGLEWOCMNF', 'POST_3FSERA1A8LGM0BB3W', 'Bài tiêu cực thế này không nên tồn tại', '2023-05-17 11:46:52'),
('USER_3FSERAASKLGDXHW2Q', 'POST_3FSERA92CLHLH33E3', 'Có thông tin không đúng sự thật. Căn hộ ảo.', '2023-05-17 22:25:50'),
('USER_3FSERAA9WLEOIEWG5', 'POST_3FSERA66OLHQGX0JK', 'đăng hình facebook trên tifo.', '2023-05-17 22:55:35'),
('USER_3FSERAA9WLEOIEWG5', 'POST_3FSERA66OLHQGX0JK', 'okkkkkk', '2023-05-18 20:25:00'),
('USER_3FSERAA9WLEOIEWG5', 'POST_3FSERABHWLI45J0H9', 'bài đang vi  phạm\n', '2023-05-31 16:38:44'),
('USER_3FSERAA9WLEOIEWG5', 'POST_3FSERABHWLI45J0H9', 'Nội dung này đồi trụy.\n', '2023-06-05 15:39:32');

-- --------------------------------------------------------

--
-- Table structure for table `role`
--

CREATE TABLE `role` (
  `id_role` int(11) NOT NULL,
  `role` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `role`
--

INSERT INTO `role` (`id_role`, `role`) VALUES
(1, 'admin'),
(2, 'user'),
(3, 'chatbot'),
(4, 'roof');

-- --------------------------------------------------------

--
-- Table structure for table `room`
--

CREATE TABLE `room` (
  `id_room` varchar(50) NOT NULL,
  `name` text DEFAULT NULL,
  `avatar` text DEFAULT NULL,
  `type` varchar(50) DEFAULT NULL,
  `datetime` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `room`
--

INSERT INTO `room` (`id_room`, `name`, `avatar`, `type`, `datetime`) VALUES
('ROOM_3FSERA2V4LHWUXD41', 'testroom3', NULL, 'group', '2023-05-21 10:26:48'),
('ROOM_3FSERA3T0LHUN3I63', NULL, NULL, 'chatbot', '2023-05-19 21:12:05'),
('ROOM_3FSERA3T0LHUQ147U', NULL, NULL, 'friend', '2023-05-19 22:34:13'),
('ROOM_3FSERA50OLHLR16RZ', NULL, NULL, 'chatbot', '2023-05-13 15:52:20'),
('ROOM_3FSERA51SLHVLX6N6', NULL, NULL, 'chatbot', '2023-05-20 13:26:57'),
('ROOM_3FSERA6UKLIIMW1GT', NULL, NULL, 'chatbot', '2023-06-05 16:12:45'),
('ROOM_3FSERA7ISLHD17VQ8', NULL, NULL, 'friend', '2023-05-07 13:27:33'),
('ROOM_3FSERA7ISLHD1C21G', 'hú1', NULL, 'group', '2023-05-07 13:30:48'),
('ROOM_3FSERA970LHQ2GY1H', NULL, NULL, 'chatbot', '2023-05-16 16:23:36'),
('ROOM_3FSERA9JCLHUJP6ZP', 'thien-sy-tien', NULL, 'group', '2023-05-19 19:36:59'),
('ROOM_3FSERA9JCLHUJRUL0', NULL, NULL, 'chatbot', '2023-05-19 19:39:03'),
('ROOM_3FSERA9Q0LHIX6TZG', NULL, NULL, 'friend', '2023-05-11 16:21:23'),
('ROOM_3FSERA9Q0LHIX7QJJ', 'aloiđ', NULL, 'group', '2023-05-11 16:22:05'),
('ROOM_3FSERA9X0LHJ7TGU5', NULL, NULL, 'friend', '2023-05-11 21:18:55'),
('ROOM_3FSERAACSLHLF597W', NULL, NULL, 'chatbot', '2023-05-13 10:19:34'),
('ROOM_3FSERABHWLI45MH42', NULL, NULL, 'friend', '2023-05-26 13:00:39'),
('ROOM_3FSERABJSLI329GX7', NULL, NULL, 'chatbot', '2023-05-25 18:38:47'),
('ROOM_3FSERABM0LHIKVT0Y', NULL, NULL, 'friend', '2023-05-11 10:36:53'),
('ROOM_3FSERAC5OLHYBZO8V', NULL, NULL, 'chatbot', '2023-05-22 11:12:15'),
('ROOM_3FSERAC5OLHYBZZQQ', NULL, NULL, 'friend', '2023-05-22 11:12:30'),
('ROOM_3FSERAC5OLHYC63JO', NULL, NULL, 'friend', '2023-05-22 11:17:15'),
('ROOM_3FSERAC6CLHN2ZW7Q', NULL, NULL, 'chatbot', '2023-05-14 14:15:01'),
('ROOM_3FSERACHSLIAE2MZC', 'nhóm2', NULL, 'group', '2023-05-30 21:43:47'),
('ROOM_3FSERACKGLI4AHMYF', NULL, NULL, 'chatbot', '2023-05-26 15:16:51'),
('ROOM_3FSERACKGLI4AIG93', NULL, NULL, 'friend', '2023-05-26 15:17:29'),
('ROOM_3FSERAD4CLI6V1Q1I', NULL, NULL, 'chatbot', '2023-05-28 10:27:53'),
('ROOM_3FSERADW4LHDGIMOS', NULL, NULL, 'friend', '2023-05-07 20:35:49'),
('ROOM_3FSERADWLICRDAL6', NULL, NULL, 'chatbot', '2023-06-01 13:31:32'),
('ROOM_3FSERANGLHJAQFU0', NULL, NULL, 'friend', '2023-05-11 22:40:32'),
('ROOM_3FSERANGLHJBK9CB', NULL, NULL, 'friend', '2023-05-11 23:03:44'),
('ROOM_3FSERANGLHJBXBVE', NULL, NULL, 'friend', '2023-05-11 23:13:53');

-- --------------------------------------------------------

--
-- Table structure for table `save`
--

CREATE TABLE `save` (
  `id_post` varchar(50) NOT NULL,
  `id_user` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `save`
--

INSERT INTO `save` (`id_post`, `id_user`) VALUES
('POST_3FSERA66OLHQGX0JK', 'USER_3FSERAA9WLEOIEWG5'),
('POST_3FSERA92CLHLH33E3', 'USER_3FSERAA9WLEOIEWG5'),
('POST_3FSERA9Q0LHIXCHCR', 'USER_3FSERAA9WLEOIEWG5'),
('POST_3FSERABCGLHLGE9O7', 'USER_3FSERAA9WLEOIEWG5'),
('POST_3FSERABM0LHIKUOHH', 'USER_3FSERAA9WLEOIEWG5'),
('POST_3FSERABM0LHIKUOHH', 'USER_3FSERAASKLGDXHW2Q'),
('POST_3FSERAD4CLI6V4SHY', 'USER_3FSERAA9WLEOIEWG5');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id_user` varchar(50) NOT NULL,
  `id_role` int(11) NOT NULL DEFAULT 2,
  `fullname` text DEFAULT NULL,
  `username` varchar(200) NOT NULL,
  `password` text NOT NULL,
  `description` text DEFAULT NULL,
  `phone` varchar(12) DEFAULT NULL,
  `email` varchar(200) DEFAULT NULL,
  `address` text DEFAULT NULL,
  `birthday` datetime DEFAULT NULL,
  `gender` varchar(10) DEFAULT NULL,
  `avatar` text DEFAULT NULL,
  `cover` text DEFAULT NULL,
  `status` varchar(50) NOT NULL DEFAULT 'online',
  `banned_reason` text DEFAULT NULL,
  `off_time` datetime NOT NULL DEFAULT current_timestamp(),
  `invisible` tinyint(1) NOT NULL DEFAULT 0,
  `datetime` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id_user`, `id_role`, `fullname`, `username`, `password`, `description`, `phone`, `email`, `address`, `birthday`, `gender`, `avatar`, `cover`, `status`, `banned_reason`, `off_time`, `invisible`, `datetime`) VALUES
('USER_3FSERA10GLHOI5LKQ', 1, 'admin', 'admin', '$2b$10$/xC1XIC5IVtZ.muuyh8rNeJPGMfXvtSD.3w0sJkILDR/lBIPcTNr6', NULL, NULL, 'admin@gmail.com', NULL, '2003-05-05 00:00:00', NULL, '1684391063852-414083749.jpg', '1684576466152-427683533.png', 'offline', NULL, '2023-06-10 22:37:45', 0, '2023-05-16 14:01:30'),
('USER_3FSERA214LHD9H2NX', 2, 'Lê Thị Thảo', 'thaole36', '$2b$10$Ccssfq80HYM6jYa1.tN8X.LjPzESegfdA4LWRjandBAkDpgDofFCq', NULL, NULL, 'thaole@gmail.com', NULL, '1996-01-02 00:00:00', NULL, 'thao.jpg', NULL, 'offline', NULL, '2023-05-07 17:30:57', 0, '2023-05-16 14:01:30'),
('USER_3FSERA214LHD9XTSH', 2, 'Kim Anh', 'kimanh', '$2b$10$Jdk9GpOMZRKr.UApXNGyO.0GZPUvD6NDcQZuEmGQGYmZupoxDvuAe', NULL, NULL, 'kimanh@gmail.com', NULL, '2008-01-04 00:00:00', NULL, 'account.jpg', NULL, 'offline', NULL, '2023-05-27 16:36:57', 0, '2023-05-16 14:01:30'),
('USER_3FSERA2MGLEWOAK2I', 2, 'Sỷ Bùi Văn', 'sybui', '$2b$10$aIzBRHmTgDsfYVjyrFqdVu1bwccKtvEwtURUcXlc8bkzJh6q994ai', 'sỷ nè. Ilove all you!', 'nh', 'sybui@gmail.com', NULL, '2003-05-07 00:00:00', 'female', '1685331753888-13335040.jpg', '1684559901143-199060463.jpg', 'online', NULL, '2023-06-11 17:38:07', 0, '2023-05-16 14:01:30'),
('USER_3FSERA2MGLEWOCMNF', 2, 'Nguyễn Quang Huy', 'quanghuy', '$2b$10$0IZPLf/KvRDNYBD7fVmV5uCN1MO8LQUjUoEeLwloby25px3xyy./W', NULL, NULL, 'quanghuy@gmail.com', NULL, '1980-01-16 00:00:00', NULL, '1684505295031-950265650.jpg', '1684505246031-330387831.png', 'online', NULL, '2023-06-05 17:13:10', 0, '2023-04-16 14:01:30'),
('USER_3FSERA2MGLEWODXGU', 2, 'Nguyễn Thành Nhân', 'thanhnhan', '$2b$10$HY8/VB7LL8SbBDlWhTy.rO3dPIG8Ee5Sq/YfPDCxTAwuiSZx3N07S', NULL, NULL, 'thanhnhan@gmail.com', NULL, '2005-01-05 00:00:00', NULL, '18222004_1847694248827653_5765875354685393214_n.jpg', NULL, 'offline', NULL, '2023-06-10 22:27:08', 0, '2022-11-22 14:01:30'),
('USER_3FSERA3T0LHUMZTYL', 2, 'Trấn Thành', 'tranthanh', '$2b$10$oZBg4POrhyPG/8NZGAEau.yX8rpg7UkOzYYFASewePBDMnFtEHNAC', NULL, NULL, 'tranthanh@gmail.com', NULL, '1900-01-03 00:00:00', NULL, '1684505504528-74652994.jpg', NULL, 'offline', NULL, '2023-06-10 22:27:58', 0, '2023-05-19 21:09:14'),
('USER_3FSERA66OLHQGDHR8', 2, 'Năm Nguyễn', 'nam_nguyen', '$2b$10$2KZXYfvyjit55GoN0KCxXu2o.QALMmx5ElDxLasluMnohPiSpuNGG', NULL, NULL, 'nguyentannam@gmail.com', NULL, '1979-01-07 00:00:00', NULL, '1684252722306-136006290.jpg', NULL, 'offline', NULL, '2023-06-11 16:44:28', 0, '2023-05-16 22:52:49'),
('USER_3FSERA9Q0LHIX3ZO8', 2, 'Phương đông', 'phuongdong', '$2b$10$i.80t6KIl0C31AMDUnJ1Pu8SK0VQGVNsUgjC8lPsbBBi5a5HVXi6a', NULL, NULL, 'phuongdong@gmail.com', NULL, '1976-01-11 00:00:00', NULL, '1683796844510-565692615.png', NULL, 'offline', NULL, '2023-05-11 16:36:05', 0, '2023-05-16 14:01:30'),
('USER_3FSERA9R8LHVFWCK7', 2, 'Lukaku', 'lukaku', '$2b$10$BXugbovKS0s9OG.LurjVRemg8MdIvZ8VaDXR0F5qnN/L/ngPKsgyq', NULL, NULL, 'lukaku@gmai.com', NULL, '1984-05-01 00:00:00', NULL, 'account.jpg', NULL, 'offline', NULL, '2023-05-26 10:26:12', 0, '2023-05-20 10:38:20'),
('USER_3FSERAA9WLEOIEWG5', 2, 'Phạm Văn Thiên', 'pt.zero', '$2b$10$9BQaXAkPbzD5b7Sh4Mv7gOVJLGlZUJViVMUkDKNFB0kfNXzN0KUf6', 'Tôi là thiên 123', '0394921219', 'vanthien.dev@gmail.com', NULL, '1999-01-01 00:00:00', 'male', '1685525794577-264871880.jpg', '1684505164416-413032495.jpg', 'online', NULL, '2023-06-11 17:38:07', 0, '2023-05-16 14:01:30'),
('USER_3FSERAASKLGDX7FR3', 2, 'Hạ Vi', 'havi', '$2b$10$WZVFUO1iY7VoBmj7P5IujOt8fLshSFy6N9iJkphOvM5UamBXk1XfW', NULL, NULL, 'havi@gmail.com', NULL, '1985-01-03 00:00:00', NULL, 'havi.jpg', NULL, 'offline', NULL, '2023-06-10 22:23:00', 0, '2023-05-16 14:01:30'),
('USER_3FSERAASKLGDXHW2Q', 2, 'Trần Tiến', 'trantien', '$2b$10$W.Bipl//2US33aNsX1dJauuWAIqE8tZaoaYVz12pByoYT53AzEglW', NULL, NULL, 'trantien@gmail.com', NULL, '2005-01-06 00:00:00', NULL, '1685331769891-351418318.jpg', NULL, 'offline', NULL, '2023-06-10 22:27:37', 0, '2023-05-16 14:01:30'),
('USER_3FSERABPCLHRGKTPU', 2, 'hiae', 'alo anh em ơi 😂😂😂😂', '$2b$10$Gq5sV/qFqg1.pLdMk2ypnezCfi5NW900GhTuMoTw63mWjZm6XhxjS', NULL, NULL, 'hiae@gmail.com', NULL, '1980-01-17 00:00:00', NULL, 'account.jpg', NULL, 'offline', NULL, '2023-05-22 11:20:16', 0, '2023-05-17 15:46:18'),
('USER_3FSERABRKLGGAEPGS', 3, 'Tifo', 'tifo_chatbot', '$2b$10$M5/z0yHu0A/omX3rVmEQ6epVXfrsFlGHdU.W52CMN5nmlhK5zG9hi', NULL, NULL, 'chatbot@gmail.com', NULL, '1993-12-02 00:00:00', NULL, '_b5ee48ca-0185-49d0-9bb5-56e18a9ebf98.jpg', NULL, 'online', NULL, '2023-04-28 13:16:03', 0, '2023-05-16 14:01:30'),
('USER_3FSERACH4LERDMQYF', 2, 'Nguyễn Tấn Năm', 'namnguyen', '$2b$10$SikRrinYOPIAzu85MAQwQutnb8Ijct6z6ZxuNSZneqU4C2/QPVNCu', NULL, NULL, 'namnguyen@gmail.com', NULL, '2000-12-14 00:00:00', NULL, '13346986_266608600396159_4576797915501122612_n.jpg', NULL, 'offline', NULL, '2023-05-17 18:03:23', 1, '2023-05-16 14:01:30'),
('USER_3FSERACKGLI48OF83', 2, 'World multicolor', 'worldmulticolor', '$2b$10$vN5dRsEVRQd1UC0NA5ZZge88TFiSVcr/FXkmybZDtQWPwriZn2bBG', NULL, NULL, 'vanthienz100@gmail.com', NULL, '2008-01-08 00:00:00', NULL, '1685241951596-349109086.jpg', NULL, 'offline', NULL, '2023-05-28 10:28:08', 0, '2023-05-26 14:26:09'),
('USER_3FSERACKGLI49BH5U', 2, 'Bui Van Sy', 'sybuivan1429', '$2b$10$EbGMRbzyz4f9eoe0HGfgJusQxnVjQfxiyl0K4BqP1S36hNxfZXNlK', NULL, NULL, 'sybuivan1429@gmail.com', NULL, '2008-01-08 00:00:00', NULL, 'account.jpg', NULL, 'offline', NULL, '2023-05-27 16:43:33', 0, '2023-05-26 14:44:04'),
('USER_3FSERAD2WLIQ59IJR', 2, 'Đà Nẵng Kozocom', 'Kozocom', '$2b$10$TR5MAXxUF79RKU2sZnsUNeEGkTxeolYnNAh5pnlKeUzaS2iHTZ7CW', '', '', 'kozocom.jp@gmail.com', NULL, '2003-06-11 00:00:00', '', 'account.jpg', NULL, 'offline', NULL, '2023-06-10 22:38:57', 0, '2023-06-10 22:21:30');

-- --------------------------------------------------------

--
-- Table structure for table `user_room`
--

CREATE TABLE `user_room` (
  `id_user_room` varchar(50) NOT NULL,
  `id_user` varchar(50) NOT NULL,
  `id_room` varchar(50) NOT NULL,
  `role` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user_room`
--

INSERT INTO `user_room` (`id_user_room`, `id_user`, `id_room`, `role`) VALUES
('RU_3FSERA2V4LHWUXD45', 'USER_3FSERA214LHD9H2NX', 'ROOM_3FSERA2V4LHWUXD41', 2),
('RU_3FSERA2V4LHWUXD46', 'USER_3FSERA2MGLEWOAK2I', 'ROOM_3FSERA2V4LHWUXD41', 2),
('RU_3FSERA2V4LHWUXD47', 'USER_3FSERAA9WLEOIEWG5', 'ROOM_3FSERA2V4LHWUXD41', 1),
('RU_3FSERA2V4LHX5N1JI', 'USER_3FSERA2MGLEWOAK2I', 'ROOM_3FSERA9JCLHUJP6ZP', 2),
('RU_3FSERA3T0LHUN3I67', 'USER_3FSERA3T0LHUMZTYL', 'ROOM_3FSERA3T0LHUN3I63', 1),
('RU_3FSERA3T0LHUN3I68', 'USER_3FSERABRKLGGAEPGS', 'ROOM_3FSERA3T0LHUN3I63', 2),
('RU_3FSERA3T0LHUQ147Z', 'USER_3FSERAA9WLEOIEWG5', 'ROOM_3FSERA3T0LHUQ147U', 1),
('RU_3FSERA3T0LHUQ1480', 'USER_3FSERAASKLGDX7FR3', 'ROOM_3FSERA3T0LHUQ147U', 2),
('RU_3FSERA50OLHLR16SF', 'USER_3FSERA2MGLEWODXGU', 'ROOM_3FSERA50OLHLR16RZ', 1),
('RU_3FSERA50OLHLR16SG', 'USER_3FSERABRKLGGAEPGS', 'ROOM_3FSERA50OLHLR16RZ', 2),
('RU_3FSERA51SLHVLX6N9', 'USER_3FSERA2MGLEWOAK2I', 'ROOM_3FSERA51SLHVLX6N6', 1),
('RU_3FSERA51SLHVLX6NA', 'USER_3FSERABRKLGGAEPGS', 'ROOM_3FSERA51SLHVLX6N6', 2),
('RU_3FSERA6UKLIIMW1H4', 'USER_3FSERAA9WLEOIEWG5', 'ROOM_3FSERA6UKLIIMW1GT', 1),
('RU_3FSERA6UKLIIMW1H5', 'USER_3FSERABRKLGGAEPGS', 'ROOM_3FSERA6UKLIIMW1GT', 2),
('RU_3FSERA7ISLHD17VQA', 'USER_3FSERA2MGLEWOAK2I', 'ROOM_3FSERA7ISLHD17VQ8', 1),
('RU_3FSERA7ISLHD17VQB', 'USER_3FSERAA9WLEOIEWG5', 'ROOM_3FSERA7ISLHD17VQ8', 2),
('RU_3FSERA7ISLHD1C227', 'USER_3FSERA2MGLEWOAK2I', 'ROOM_3FSERA7ISLHD1C21G', 1),
('RU_3FSERA7KGLHEFMZ5F', 'USER_3FSERACH4LERDMQYF', 'ROOM_3FSERA7ISLHD1C21G', 2),
('RU_3FSERA7KGLHEFNMKK', 'USER_3FSERA2MGLEWOCMNF', 'ROOM_3FSERA7ISLHD1C21G', 2),
('RU_3FSERA970LHQ2GY2F', 'USER_3FSERA10GLHOI5LKQ', 'ROOM_3FSERA970LHQ2GY1H', 1),
('RU_3FSERA970LHQ2GY2G', 'USER_3FSERABRKLGGAEPGS', 'ROOM_3FSERA970LHQ2GY1H', 2),
('RU_3FSERA9EKLHEGDDM7', 'USER_3FSERA214LHD9XTSH', 'ROOM_3FSERA7ISLHD1C21G', 2),
('RU_3FSERA9JCLHUJP705', 'USER_3FSERAASKLGDXHW2Q', 'ROOM_3FSERA9JCLHUJP6ZP', 2),
('RU_3FSERA9JCLHUJP707', 'USER_3FSERAA9WLEOIEWG5', 'ROOM_3FSERA9JCLHUJP6ZP', 1),
('RU_3FSERA9JCLHUJRULC', 'USER_3FSERA2MGLEWOCMNF', 'ROOM_3FSERA9JCLHUJRUL0', 1),
('RU_3FSERA9JCLHUJRULD', 'USER_3FSERABRKLGGAEPGS', 'ROOM_3FSERA9JCLHUJRUL0', 2),
('RU_3FSERA9Q0LHIX6TZO', 'USER_3FSERA9Q0LHIX3ZO8', 'ROOM_3FSERA9Q0LHIX6TZG', 1),
('RU_3FSERA9Q0LHIX6TZP', 'USER_3FSERAA9WLEOIEWG5', 'ROOM_3FSERA9Q0LHIX6TZG', 2),
('RU_3FSERA9Q0LHIX7QJT', 'USER_3FSERAA9WLEOIEWG5', 'ROOM_3FSERA9Q0LHIX7QJJ', 1),
('RU_3FSERA9Q0LHIX9KDP', 'USER_3FSERAASKLGDXHW2Q', 'ROOM_3FSERA9Q0LHIX7QJJ', 2),
('RU_3FSERA9Q0LHIXAZ9E', 'USER_3FSERACH4LERDMQYF', 'ROOM_3FSERA9Q0LHIX7QJJ', 2),
('RU_3FSERA9Q0LHIXBFD9', 'USER_3FSERA9Q0LHIX3ZO8', 'ROOM_3FSERA9Q0LHIX7QJJ', 2),
('RU_3FSERA9X0LHJ7TGU9', 'USER_3FSERAA9WLEOIEWG5', 'ROOM_3FSERA9X0LHJ7TGU5', 1),
('RU_3FSERA9X0LHJ7TGUA', 'USER_3FSERA2MGLEWODXGU', 'ROOM_3FSERA9X0LHJ7TGU5', 2),
('RU_3FSERAACSLHLF597Z', 'USER_3FSERAASKLGDXHW2Q', 'ROOM_3FSERAACSLHLF597W', 1),
('RU_3FSERAACSLHLF5980', 'USER_3FSERABRKLGGAEPGS', 'ROOM_3FSERAACSLHLF597W', 2),
('RU_3FSERABHWLI45MH4S', 'USER_3FSERA2MGLEWOAK2I', 'ROOM_3FSERABHWLI45MH42', 1),
('RU_3FSERABHWLI45MH4T', 'USER_3FSERAASKLGDXHW2Q', 'ROOM_3FSERABHWLI45MH42', 2),
('RU_3FSERABJSLI329GXE', 'USER_3FSERA9R8LHVFWCK7', 'ROOM_3FSERABJSLI329GX7', 1),
('RU_3FSERABJSLI329GXF', 'USER_3FSERABRKLGGAEPGS', 'ROOM_3FSERABJSLI329GX7', 2),
('RU_3FSERABM0LHIKVT13', 'USER_3FSERAASKLGDXHW2Q', 'ROOM_3FSERABM0LHIKVT0Y', 1),
('RU_3FSERABM0LHIKVT14', 'USER_3FSERAA9WLEOIEWG5', 'ROOM_3FSERABM0LHIKVT0Y', 2),
('RU_3FSERAC5OLHYBZO9I', 'USER_3FSERABPCLHRGKTPU', 'ROOM_3FSERAC5OLHYBZO8V', 1),
('RU_3FSERAC5OLHYBZO9J', 'USER_3FSERABRKLGGAEPGS', 'ROOM_3FSERAC5OLHYBZO8V', 2),
('RU_3FSERAC5OLHYBZZQT', 'USER_3FSERAA9WLEOIEWG5', 'ROOM_3FSERAC5OLHYBZZQQ', 1),
('RU_3FSERAC5OLHYBZZQU', 'USER_3FSERA9R8LHVFWCK7', 'ROOM_3FSERAC5OLHYBZZQQ', 2),
('RU_3FSERAC5OLHYC63JY', 'USER_3FSERAA9WLEOIEWG5', 'ROOM_3FSERAC5OLHYC63JO', 1),
('RU_3FSERAC5OLHYC63JZ', 'USER_3FSERABPCLHRGKTPU', 'ROOM_3FSERAC5OLHYC63JO', 2),
('RU_3FSERAC6CLHN2ZW87', 'USER_3FSERACH4LERDMQYF', 'ROOM_3FSERAC6CLHN2ZW7Q', 1),
('RU_3FSERAC6CLHN2ZW88', 'USER_3FSERABRKLGGAEPGS', 'ROOM_3FSERAC6CLHN2ZW7Q', 2),
('RU_3FSERACHSLIAE2MZQ', 'USER_3FSERA2MGLEWOAK2I', 'ROOM_3FSERACHSLIAE2MZC', 2),
('RU_3FSERACHSLIAE2MZR', 'USER_3FSERA3T0LHUMZTYL', 'ROOM_3FSERACHSLIAE2MZC', 2),
('RU_3FSERACHSLIAE2MZS', 'USER_3FSERAASKLGDXHW2Q', 'ROOM_3FSERACHSLIAE2MZC', 2),
('RU_3FSERACHSLIAE2MZT', 'USER_3FSERAA9WLEOIEWG5', 'ROOM_3FSERACHSLIAE2MZC', 1),
('RU_3FSERACKGLI4AHMYL', 'USER_3FSERACKGLI49BH5U', 'ROOM_3FSERACKGLI4AHMYF', 1),
('RU_3FSERACKGLI4AHMYM', 'USER_3FSERABRKLGGAEPGS', 'ROOM_3FSERACKGLI4AHMYF', 2),
('RU_3FSERACKGLI4AIG98', 'USER_3FSERACKGLI49BH5U', 'ROOM_3FSERACKGLI4AIG93', 1),
('RU_3FSERACKGLI4AIG99', 'USER_3FSERA2MGLEWOAK2I', 'ROOM_3FSERACKGLI4AIG93', 2),
('RU_3FSERAD4CLI6V1Q1N', 'USER_3FSERACKGLI48OF83', 'ROOM_3FSERAD4CLI6V1Q1I', 1),
('RU_3FSERAD4CLI6V1Q1O', 'USER_3FSERABRKLGGAEPGS', 'ROOM_3FSERAD4CLI6V1Q1I', 2),
('RU_3FSERADW4LHDGIMOW', 'USER_3FSERA2MGLEWOAK2I', 'ROOM_3FSERADW4LHDGIMOS', 1),
('RU_3FSERADW4LHDGIMOX', 'USER_3FSERA214LHD9XTSH', 'ROOM_3FSERADW4LHDGIMOS', 2),
('RU_3FSERADWLICRDAL9', 'USER_3FSERAASKLGDX7FR3', 'ROOM_3FSERADWLICRDAL6', 1),
('RU_3FSERADWLICRDALA', 'USER_3FSERABRKLGGAEPGS', 'ROOM_3FSERADWLICRDAL6', 2),
('RU_3FSERANGLHJAQFU5', 'USER_3FSERAA9WLEOIEWG5', 'ROOM_3FSERANGLHJAQFU0', 1),
('RU_3FSERANGLHJAQFU6', 'USER_3FSERA214LHD9XTSH', 'ROOM_3FSERANGLHJAQFU0', 2),
('RU_3FSERANGLHJBK9CQ', 'USER_3FSERAA9WLEOIEWG5', 'ROOM_3FSERANGLHJBK9CB', 1),
('RU_3FSERANGLHJBK9CR', 'USER_3FSERA214LHD9H2NX', 'ROOM_3FSERANGLHJBK9CB', 2),
('RU_3FSERANGLHJBXBVM', 'USER_3FSERAA9WLEOIEWG5', 'ROOM_3FSERANGLHJBXBVE', 1),
('RU_3FSERANGLHJBXBVN', 'USER_3FSERA2MGLEWOCMNF', 'ROOM_3FSERANGLHJBXBVE', 2);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `banned`
--
ALTER TABLE `banned`
  ADD PRIMARY KEY (`id_user`);

--
-- Indexes for table `chat`
--
ALTER TABLE `chat`
  ADD PRIMARY KEY (`id_chat`),
  ADD KEY `fk_user_room` (`id_user_room`);

--
-- Indexes for table `chat_copy`
--
ALTER TABLE `chat_copy`
  ADD PRIMARY KEY (`id_chat_copy`),
  ADD KEY `id_user_user_chat` (`id_user`),
  ADD KEY `chat_chat_coppy` (`id_chat`);

--
-- Indexes for table `comment`
--
ALTER TABLE `comment`
  ADD PRIMARY KEY (`id_comment`),
  ADD KEY `fk_user_comment` (`id_user`),
  ADD KEY `fk_post_comment` (`id_post`);

--
-- Indexes for table `follow`
--
ALTER TABLE `follow`
  ADD PRIMARY KEY (`id_follow`),
  ADD KEY `fk_follower_user` (`id_follower`),
  ADD KEY `fk_user` (`id_user`);

--
-- Indexes for table `love`
--
ALTER TABLE `love`
  ADD PRIMARY KEY (`id_user`,`id_post`),
  ADD KEY `love_fk_post` (`id_post`);

--
-- Indexes for table `media`
--
ALTER TABLE `media`
  ADD PRIMARY KEY (`id_media`),
  ADD KEY `fk_media_post` (`id_post`);

--
-- Indexes for table `notification`
--
ALTER TABLE `notification`
  ADD PRIMARY KEY (`id_notification`,`id_user`),
  ADD KEY `fk_user_notification` (`id_user`),
  ADD KEY `pk_post_nofi` (`id_post`),
  ADD KEY `fk_follow` (`id_follow`);

--
-- Indexes for table `post`
--
ALTER TABLE `post`
  ADD PRIMARY KEY (`id_post`),
  ADD UNIQUE KEY `id_post` (`id_post`),
  ADD KEY `fk_type_post` (`type`),
  ADD KEY `fk_target_post` (`target`),
  ADD KEY `fk_user_post` (`id_user`);

--
-- Indexes for table `report`
--
ALTER TABLE `report`
  ADD KEY `id_user` (`id_user`),
  ADD KEY `id_post` (`id_post`);

--
-- Indexes for table `role`
--
ALTER TABLE `role`
  ADD PRIMARY KEY (`id_role`);

--
-- Indexes for table `room`
--
ALTER TABLE `room`
  ADD PRIMARY KEY (`id_room`);

--
-- Indexes for table `save`
--
ALTER TABLE `save`
  ADD PRIMARY KEY (`id_post`,`id_user`),
  ADD KEY `fk_save_user` (`id_user`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id_user`),
  ADD UNIQUE KEY `phone` (`phone`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `email_2` (`email`),
  ADD KEY `fk_user_role` (`id_role`);

--
-- Indexes for table `user_room`
--
ALTER TABLE `user_room`
  ADD PRIMARY KEY (`id_user_room`,`id_user`,`id_room`),
  ADD KEY `fk_group_group` (`id_room`),
  ADD KEY `fk_user_group` (`id_user`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `chat`
--
ALTER TABLE `chat`
  MODIFY `id_chat` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1293;

--
-- AUTO_INCREMENT for table `chat_copy`
--
ALTER TABLE `chat_copy`
  MODIFY `id_chat_copy` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2114;

--
-- AUTO_INCREMENT for table `comment`
--
ALTER TABLE `comment`
  MODIFY `id_comment` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=208;

--
-- AUTO_INCREMENT for table `follow`
--
ALTER TABLE `follow`
  MODIFY `id_follow` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=159;

--
-- AUTO_INCREMENT for table `notification`
--
ALTER TABLE `notification`
  MODIFY `id_notification` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=193;

--
-- AUTO_INCREMENT for table `role`
--
ALTER TABLE `role`
  MODIFY `id_role` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `banned`
--
ALTER TABLE `banned`
  ADD CONSTRAINT `fk_banned_user` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `chat`
--
ALTER TABLE `chat`
  ADD CONSTRAINT `fk_user_room` FOREIGN KEY (`id_user_room`) REFERENCES `user_room` (`id_user_room`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `chat_copy`
--
ALTER TABLE `chat_copy`
  ADD CONSTRAINT `chat_chat_coppy` FOREIGN KEY (`id_chat`) REFERENCES `chat` (`id_chat`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `id_user_user_chat` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `comment`
--
ALTER TABLE `comment`
  ADD CONSTRAINT `fk_post_comment` FOREIGN KEY (`id_post`) REFERENCES `post` (`id_post`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_user_comment` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `follow`
--
ALTER TABLE `follow`
  ADD CONSTRAINT `fk_follow_user_id` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_follower_user` FOREIGN KEY (`id_follower`) REFERENCES `user` (`id_user`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_user` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `love`
--
ALTER TABLE `love`
  ADD CONSTRAINT `love_fk_post` FOREIGN KEY (`id_post`) REFERENCES `post` (`id_post`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `love_fk_user` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `media`
--
ALTER TABLE `media`
  ADD CONSTRAINT `fk_media_post` FOREIGN KEY (`id_post`) REFERENCES `post` (`id_post`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `notification`
--
ALTER TABLE `notification`
  ADD CONSTRAINT `fk_follow` FOREIGN KEY (`id_follow`) REFERENCES `follow` (`id_follow`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_user_notification` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `pk_post_nofi` FOREIGN KEY (`id_post`) REFERENCES `post` (`id_post`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `post`
--
ALTER TABLE `post`
  ADD CONSTRAINT `fk_user_post` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`);

--
-- Constraints for table `report`
--
ALTER TABLE `report`
  ADD CONSTRAINT `id_post` FOREIGN KEY (`id_post`) REFERENCES `post` (`id_post`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `id_user` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `save`
--
ALTER TABLE `save`
  ADD CONSTRAINT `fk_save_post` FOREIGN KEY (`id_post`) REFERENCES `post` (`id_post`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_save_user` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `fk_user_role` FOREIGN KEY (`id_role`) REFERENCES `role` (`id_role`);

--
-- Constraints for table `user_room`
--
ALTER TABLE `user_room`
  ADD CONSTRAINT `fk_group_group` FOREIGN KEY (`id_room`) REFERENCES `room` (`id_room`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_user_group` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
