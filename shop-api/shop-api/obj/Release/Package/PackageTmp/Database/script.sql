USE [master]
GO
/****** Object:  Database [BanHang]    Script Date: 11/10/2018 14:30:53 ******/
CREATE DATABASE [BanHang]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'BanHang', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL14.ACHILLESLESQL\MSSQL\DATA\BanHang.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'BanHang_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL14.ACHILLESLESQL\MSSQL\DATA\BanHang_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
GO
ALTER DATABASE [BanHang] SET COMPATIBILITY_LEVEL = 140
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [BanHang].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [BanHang] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [BanHang] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [BanHang] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [BanHang] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [BanHang] SET ARITHABORT OFF 
GO
ALTER DATABASE [BanHang] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [BanHang] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [BanHang] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [BanHang] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [BanHang] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [BanHang] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [BanHang] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [BanHang] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [BanHang] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [BanHang] SET  DISABLE_BROKER 
GO
ALTER DATABASE [BanHang] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [BanHang] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [BanHang] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [BanHang] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [BanHang] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [BanHang] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [BanHang] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [BanHang] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [BanHang] SET  MULTI_USER 
GO
ALTER DATABASE [BanHang] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [BanHang] SET DB_CHAINING OFF 
GO
ALTER DATABASE [BanHang] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [BanHang] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [BanHang] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [BanHang] SET QUERY_STORE = OFF
GO
USE [BanHang]
GO
/****** Object:  User [WebDatabaseUser]    Script Date: 11/10/2018 14:30:53 ******/
CREATE USER [WebDatabaseUser] FOR LOGIN [IIS APPPOOL\DefaultAppPool] WITH DEFAULT_SCHEMA=[dbo]
GO
/****** Object:  User [NT AUTHORITY\NETWORK SERVICE]    Script Date: 11/10/2018 14:30:53 ******/
CREATE USER [NT AUTHORITY\NETWORK SERVICE] FOR LOGIN [NT AUTHORITY\NETWORK SERVICE] WITH DEFAULT_SCHEMA=[dbo]
GO
/****** Object:  User [NT AUTHORITY\IUSR]    Script Date: 11/10/2018 14:30:53 ******/
CREATE USER [NT AUTHORITY\IUSR] FOR LOGIN [NT AUTHORITY\IUSR]
GO
/****** Object:  User [ACHILLESPC\Administrator]    Script Date: 11/10/2018 14:30:53 ******/
CREATE USER [ACHILLESPC\Administrator] FOR LOGIN [ACHILLESPC\Administrator] WITH DEFAULT_SCHEMA=[dbo]
GO
/****** Object:  User [ACHILLES_COMPUT\cusoc]    Script Date: 11/10/2018 14:30:53 ******/
CREATE USER [ACHILLES_COMPUT\cusoc] FOR LOGIN [ACHILLESPC\cusoc] WITH DEFAULT_SCHEMA=[dbo]
GO
ALTER ROLE [db_owner] ADD MEMBER [WebDatabaseUser]
GO
ALTER ROLE [db_datareader] ADD MEMBER [NT AUTHORITY\NETWORK SERVICE]
GO
ALTER ROLE [db_datawriter] ADD MEMBER [NT AUTHORITY\NETWORK SERVICE]
GO
ALTER ROLE [db_owner] ADD MEMBER [NT AUTHORITY\IUSR]
GO
ALTER ROLE [db_owner] ADD MEMBER [ACHILLESPC\Administrator]
GO
ALTER ROLE [db_datareader] ADD MEMBER [ACHILLESPC\Administrator]
GO
ALTER ROLE [db_datawriter] ADD MEMBER [ACHILLESPC\Administrator]
GO
ALTER ROLE [db_owner] ADD MEMBER [ACHILLES_COMPUT\cusoc]
GO
/****** Object:  Table [dbo].[Bill]    Script Date: 11/10/2018 14:30:53 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Bill](
	[idBill] [int] IDENTITY(1,1) NOT NULL,
	[codeBill] [decimal](15, 0) NOT NULL,
	[nameSupplier] [nvarchar](250) NOT NULL,
	[total] [decimal](15, 0) NOT NULL,
	[idUpdator] [int] NOT NULL,
	[createdDate] [datetime] NOT NULL,
	[updatedDate] [datetime] NOT NULL,
 CONSTRAINT [PK_Bill] PRIMARY KEY CLUSTERED 
(
	[idBill] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Category]    Script Date: 11/10/2018 14:30:54 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Category](
	[idCategory] [int] IDENTITY(1,1) NOT NULL,
	[name] [nvarchar](250) NOT NULL,
	[avatar] [varchar](250) NULL,
	[isDelete] [int] NOT NULL,
	[createdDate] [datetime] NOT NULL,
	[updatedDate] [datetime] NOT NULL,
 CONSTRAINT [PK_tblCategory] PRIMARY KEY CLUSTERED 
(
	[idCategory] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[DetailBill]    Script Date: 11/10/2018 14:30:54 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[DetailBill](
	[idDetailBill] [int] IDENTITY(1,1) NOT NULL,
	[idBill] [int] NOT NULL,
	[idProduct] [int] NOT NULL,
	[quantity] [int] NOT NULL,
	[price] [decimal](18, 0) NOT NULL,
 CONSTRAINT [PK_DetailBill] PRIMARY KEY CLUSTERED 
(
	[idDetailBill] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[DetailReciept]    Script Date: 11/10/2018 14:30:54 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[DetailReciept](
	[idDetail] [int] IDENTITY(1,1) NOT NULL,
	[idReciept] [int] NOT NULL,
	[idProduct] [int] NOT NULL,
	[quantity] [int] NOT NULL,
	[price] [decimal](18, 0) NOT NULL,
 CONSTRAINT [PK_tblDetailReciept] PRIMARY KEY CLUSTERED 
(
	[idDetail] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Login]    Script Date: 11/10/2018 14:30:54 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Login](
	[idLogin] [int] IDENTITY(1,1) NOT NULL,
	[idUser] [int] NOT NULL,
	[token] [varchar](50) NOT NULL,
	[createdTime] [datetime] NOT NULL,
	[expiredTime] [datetime] NOT NULL,
 CONSTRAINT [PK_tblLogin] PRIMARY KEY CLUSTERED 
(
	[idLogin] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Product]    Script Date: 11/10/2018 14:30:54 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Product](
	[idProduct] [int] IDENTITY(1,1) NOT NULL,
	[idCategory] [int] NULL,
	[code] [varchar](50) NOT NULL,
	[name] [nvarchar](250) NOT NULL,
	[length] [decimal](6, 1) NULL,
	[width] [decimal](6, 1) NULL,
	[high] [decimal](6, 1) NULL,
	[priceIn] [decimal](10, 0) NOT NULL,
	[priceOut] [decimal](10, 0) NOT NULL,
	[madein] [nvarchar](250) NULL,
	[quantity] [int] NOT NULL,
	[description] [text] NULL,
	[avatar] [varchar](250) NULL,
	[images] [text] NULL,
	[idCreator] [int] NOT NULL,
	[isDelete] [int] NOT NULL,
	[createdDate] [datetime] NOT NULL,
	[updatedDate] [datetime] NOT NULL,
 CONSTRAINT [PK_tblProduct] PRIMARY KEY CLUSTERED 
(
	[idProduct] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Receipt]    Script Date: 11/10/2018 14:30:54 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Receipt](
	[idReceipt] [int] IDENTITY(1,1) NOT NULL,
	[nameCustomer] [nvarchar](250) NOT NULL,
	[address] [nvarchar](250) NOT NULL,
	[phone] [varchar](11) NOT NULL,
	[description] [text] NULL,
	[total] [decimal](15, 0) NOT NULL,
	[status] [int] NOT NULL,
	[idUpdator] [int] NULL,
	[createdDate] [datetime] NOT NULL,
	[updatedDate] [datetime] NOT NULL,
 CONSTRAINT [PK_HoaDon] PRIMARY KEY CLUSTERED 
(
	[idReceipt] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[User]    Script Date: 11/10/2018 14:30:54 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[User](
	[iduser] [int] IDENTITY(1,1) NOT NULL,
	[fullname] [varchar](250) NOT NULL,
	[username] [varchar](50) NULL,
	[password] [varchar](250) NULL,
	[role] [int] NOT NULL,
	[phone] [varchar](11) NULL,
	[address] [varchar](250) NULL,
	[cmnd] [varchar](10) NULL,
	[isDelete] [int] NOT NULL,
	[createdDate] [datetime] NOT NULL,
	[updatedDate] [datetime] NOT NULL,
 CONSTRAINT [PK_tblUser] PRIMARY KEY CLUSTERED 
(
	[iduser] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[Category] ON 

INSERT [dbo].[Category] ([idCategory], [name], [avatar], [isDelete], [createdDate], [updatedDate]) VALUES (1, N'Cate 1', NULL, 0, CAST(N'2018-08-10T15:33:15.000' AS DateTime), CAST(N'2018-09-24T17:53:16.137' AS DateTime))
INSERT [dbo].[Category] ([idCategory], [name], [avatar], [isDelete], [createdDate], [updatedDate]) VALUES (2, N'rô bốt', NULL, 0, CAST(N'2018-10-15T16:27:12.793' AS DateTime), CAST(N'2018-10-15T16:27:12.793' AS DateTime))
INSERT [dbo].[Category] ([idCategory], [name], [avatar], [isDelete], [createdDate], [updatedDate]) VALUES (3, N'xếp hình', NULL, 0, CAST(N'2018-10-29T14:31:50.810' AS DateTime), CAST(N'2018-10-29T14:31:50.810' AS DateTime))
SET IDENTITY_INSERT [dbo].[Category] OFF
SET IDENTITY_INSERT [dbo].[DetailReciept] ON 

INSERT [dbo].[DetailReciept] ([idDetail], [idReciept], [idProduct], [quantity], [price]) VALUES (1, 1, 2, 5, CAST(50000 AS Decimal(18, 0)))
INSERT [dbo].[DetailReciept] ([idDetail], [idReciept], [idProduct], [quantity], [price]) VALUES (2, 1, 3, 5, CAST(50000 AS Decimal(18, 0)))
INSERT [dbo].[DetailReciept] ([idDetail], [idReciept], [idProduct], [quantity], [price]) VALUES (3, 1, 4, 5, CAST(50000 AS Decimal(18, 0)))
INSERT [dbo].[DetailReciept] ([idDetail], [idReciept], [idProduct], [quantity], [price]) VALUES (4, 1, 5, 5, CAST(50000 AS Decimal(18, 0)))
INSERT [dbo].[DetailReciept] ([idDetail], [idReciept], [idProduct], [quantity], [price]) VALUES (5, 1, 6, 5, CAST(50000 AS Decimal(18, 0)))
INSERT [dbo].[DetailReciept] ([idDetail], [idReciept], [idProduct], [quantity], [price]) VALUES (6, 2, 7, 10, CAST(50000 AS Decimal(18, 0)))
INSERT [dbo].[DetailReciept] ([idDetail], [idReciept], [idProduct], [quantity], [price]) VALUES (7, 2, 8, 5, CAST(50000 AS Decimal(18, 0)))
INSERT [dbo].[DetailReciept] ([idDetail], [idReciept], [idProduct], [quantity], [price]) VALUES (8, 2, 9, 5, CAST(50000 AS Decimal(18, 0)))
INSERT [dbo].[DetailReciept] ([idDetail], [idReciept], [idProduct], [quantity], [price]) VALUES (9, 2, 10, 5, CAST(50000 AS Decimal(18, 0)))
INSERT [dbo].[DetailReciept] ([idDetail], [idReciept], [idProduct], [quantity], [price]) VALUES (10, 2, 11, 5, CAST(50000 AS Decimal(18, 0)))
INSERT [dbo].[DetailReciept] ([idDetail], [idReciept], [idProduct], [quantity], [price]) VALUES (11, 3, 9, 19, CAST(50000 AS Decimal(18, 0)))
INSERT [dbo].[DetailReciept] ([idDetail], [idReciept], [idProduct], [quantity], [price]) VALUES (12, 3, 10, 10, CAST(50000 AS Decimal(18, 0)))
INSERT [dbo].[DetailReciept] ([idDetail], [idReciept], [idProduct], [quantity], [price]) VALUES (13, 3, 12, 10, CAST(50000 AS Decimal(18, 0)))
INSERT [dbo].[DetailReciept] ([idDetail], [idReciept], [idProduct], [quantity], [price]) VALUES (14, 3, 13, 15, CAST(50000 AS Decimal(18, 0)))
INSERT [dbo].[DetailReciept] ([idDetail], [idReciept], [idProduct], [quantity], [price]) VALUES (15, 3, 14, 15, CAST(50000 AS Decimal(18, 0)))
INSERT [dbo].[DetailReciept] ([idDetail], [idReciept], [idProduct], [quantity], [price]) VALUES (16, 4, 12, 19, CAST(50000 AS Decimal(18, 0)))
INSERT [dbo].[DetailReciept] ([idDetail], [idReciept], [idProduct], [quantity], [price]) VALUES (17, 4, 13, 10, CAST(50000 AS Decimal(18, 0)))
INSERT [dbo].[DetailReciept] ([idDetail], [idReciept], [idProduct], [quantity], [price]) VALUES (18, 4, 14, 10, CAST(50000 AS Decimal(18, 0)))
INSERT [dbo].[DetailReciept] ([idDetail], [idReciept], [idProduct], [quantity], [price]) VALUES (19, 4, 15, 15, CAST(50000 AS Decimal(18, 0)))
INSERT [dbo].[DetailReciept] ([idDetail], [idReciept], [idProduct], [quantity], [price]) VALUES (20, 4, 16, 15, CAST(50000 AS Decimal(18, 0)))
INSERT [dbo].[DetailReciept] ([idDetail], [idReciept], [idProduct], [quantity], [price]) VALUES (21, 5, 12, 19, CAST(50000 AS Decimal(18, 0)))
INSERT [dbo].[DetailReciept] ([idDetail], [idReciept], [idProduct], [quantity], [price]) VALUES (22, 5, 13, 10, CAST(50000 AS Decimal(18, 0)))
INSERT [dbo].[DetailReciept] ([idDetail], [idReciept], [idProduct], [quantity], [price]) VALUES (23, 5, 14, 10, CAST(50000 AS Decimal(18, 0)))
INSERT [dbo].[DetailReciept] ([idDetail], [idReciept], [idProduct], [quantity], [price]) VALUES (24, 5, 15, 15, CAST(50000 AS Decimal(18, 0)))
INSERT [dbo].[DetailReciept] ([idDetail], [idReciept], [idProduct], [quantity], [price]) VALUES (25, 5, 16, 15, CAST(50000 AS Decimal(18, 0)))
SET IDENTITY_INSERT [dbo].[DetailReciept] OFF
SET IDENTITY_INSERT [dbo].[Login] ON 

INSERT [dbo].[Login] ([idLogin], [idUser], [token], [createdTime], [expiredTime]) VALUES (1, 3, N'YWRtaW4xMC83LzIwMTggMTI6NDc6MTc=', CAST(N'2018-10-07T12:47:17.803' AS DateTime), CAST(N'2018-10-07T13:17:18.097' AS DateTime))
INSERT [dbo].[Login] ([idLogin], [idUser], [token], [createdTime], [expiredTime]) VALUES (2, 3, N'YWRtaW4xMC83LzIwMTggMTM6MDY6MTI=', CAST(N'2018-10-07T13:06:12.247' AS DateTime), CAST(N'2018-10-07T13:36:12.247' AS DateTime))
INSERT [dbo].[Login] ([idLogin], [idUser], [token], [createdTime], [expiredTime]) VALUES (3, 3, N'YWRtaW4xMC83LzIwMTggMTM6MzY6MDI=', CAST(N'2018-10-07T13:36:02.587' AS DateTime), CAST(N'2018-10-07T14:06:02.590' AS DateTime))
INSERT [dbo].[Login] ([idLogin], [idUser], [token], [createdTime], [expiredTime]) VALUES (5, 3, N'YWRtaW4xMC84LzIwMTggMTM6NDE6MTM=', CAST(N'2018-10-08T13:41:13.363' AS DateTime), CAST(N'2018-10-08T14:11:13.363' AS DateTime))
INSERT [dbo].[Login] ([idLogin], [idUser], [token], [createdTime], [expiredTime]) VALUES (7, 3, N'M2FkbWluMTAvOC8yMDE4IDE1OjIwOjI4', CAST(N'2018-10-08T15:20:28.617' AS DateTime), CAST(N'2018-10-08T15:50:28.617' AS DateTime))
INSERT [dbo].[Login] ([idLogin], [idUser], [token], [createdTime], [expiredTime]) VALUES (8, 3, N'M2FkbWluMTAvOC8yMDE4IDIzOjEzOjQ4', CAST(N'2018-10-08T23:13:48.610' AS DateTime), CAST(N'2018-10-08T23:43:48.610' AS DateTime))
INSERT [dbo].[Login] ([idLogin], [idUser], [token], [createdTime], [expiredTime]) VALUES (9, 3, N'M2FkbWluMTAvMTAvMjAxOCAyMDozMzozMA==', CAST(N'2018-10-10T20:33:30.280' AS DateTime), CAST(N'2018-10-10T21:03:30.280' AS DateTime))
INSERT [dbo].[Login] ([idLogin], [idUser], [token], [createdTime], [expiredTime]) VALUES (10, 3, N'M2FkbWluMTAvMTAvMjAxOCAyMTowNzo0NA==', CAST(N'2018-10-10T21:07:44.063' AS DateTime), CAST(N'2018-10-10T21:37:44.063' AS DateTime))
INSERT [dbo].[Login] ([idLogin], [idUser], [token], [createdTime], [expiredTime]) VALUES (12, 3, N'M2FkbWluMTAvMTQvMjAxOCAxNjoxNjozNQ==', CAST(N'2018-10-14T16:16:35.433' AS DateTime), CAST(N'2018-10-14T16:46:35.433' AS DateTime))
INSERT [dbo].[Login] ([idLogin], [idUser], [token], [createdTime], [expiredTime]) VALUES (13, 3, N'M2FkbWluMTAvMTQvMjAxOCAxNjo1MjowNg==', CAST(N'2018-10-14T16:52:06.857' AS DateTime), CAST(N'2018-10-14T17:22:06.857' AS DateTime))
INSERT [dbo].[Login] ([idLogin], [idUser], [token], [createdTime], [expiredTime]) VALUES (14, 3, N'M2FkbWluMTAvMTQvMjAxOCAyMzoxNjoyMg==', CAST(N'2018-10-14T23:16:22.697' AS DateTime), CAST(N'2018-10-14T23:46:22.697' AS DateTime))
INSERT [dbo].[Login] ([idLogin], [idUser], [token], [createdTime], [expiredTime]) VALUES (15, 3, N'M2FkbWluMTAvMTUvMjAxOCAxNjoyNDo0NA==', CAST(N'2018-10-15T16:24:44.050' AS DateTime), CAST(N'2018-10-15T16:54:44.050' AS DateTime))
INSERT [dbo].[Login] ([idLogin], [idUser], [token], [createdTime], [expiredTime]) VALUES (16, 3, N'M2FkbWluMTAvMjAvMjAxOCAxMTozMDozOA==', CAST(N'2018-10-20T11:30:38.617' AS DateTime), CAST(N'2018-10-20T12:00:38.617' AS DateTime))
INSERT [dbo].[Login] ([idLogin], [idUser], [token], [createdTime], [expiredTime]) VALUES (17, 3, N'M2FkbWluMTAvMjEvMjAxOCAxMTowMzoyOQ==', CAST(N'2018-10-21T11:03:29.077' AS DateTime), CAST(N'2018-10-21T11:33:29.077' AS DateTime))
INSERT [dbo].[Login] ([idLogin], [idUser], [token], [createdTime], [expiredTime]) VALUES (18, 3, N'M2FkbWluMTAvMjEvMjAxOCAxMTo1NjoyOQ==', CAST(N'2018-10-21T11:56:29.987' AS DateTime), CAST(N'2018-10-21T12:26:29.987' AS DateTime))
INSERT [dbo].[Login] ([idLogin], [idUser], [token], [createdTime], [expiredTime]) VALUES (19, 3, N'M2FkbWluMTAvMjEvMjAxOCAxMjoyNzo1NQ==', CAST(N'2018-10-21T12:27:55.163' AS DateTime), CAST(N'2018-10-21T12:57:55.163' AS DateTime))
INSERT [dbo].[Login] ([idLogin], [idUser], [token], [createdTime], [expiredTime]) VALUES (20, 3, N'M2FkbWluMTAvMjEvMjAxOCAxMzowOTo1NA==', CAST(N'2018-10-21T13:09:54.923' AS DateTime), CAST(N'2018-10-21T13:39:54.923' AS DateTime))
INSERT [dbo].[Login] ([idLogin], [idUser], [token], [createdTime], [expiredTime]) VALUES (21, 3, N'M2FkbWluMTAvMjEvMjAxOCAxMzo0MDo0OQ==', CAST(N'2018-10-21T13:40:49.233' AS DateTime), CAST(N'2018-10-21T14:10:49.233' AS DateTime))
INSERT [dbo].[Login] ([idLogin], [idUser], [token], [createdTime], [expiredTime]) VALUES (22, 3, N'M2FkbWluMTAvMjEvMjAxOCAxNDoxNjowOA==', CAST(N'2018-10-21T14:16:08.753' AS DateTime), CAST(N'2018-10-21T14:46:08.753' AS DateTime))
INSERT [dbo].[Login] ([idLogin], [idUser], [token], [createdTime], [expiredTime]) VALUES (23, 3, N'M2FkbWluMTAvMjEvMjAxOCAxNDo0ODoyOA==', CAST(N'2018-10-21T14:48:28.423' AS DateTime), CAST(N'2018-10-21T15:18:28.423' AS DateTime))
INSERT [dbo].[Login] ([idLogin], [idUser], [token], [createdTime], [expiredTime]) VALUES (24, 3, N'M2FkbWluMTAvMjIvMjAxOCAxMjozMDozMw==', CAST(N'2018-10-22T12:30:33.877' AS DateTime), CAST(N'2018-10-22T13:00:33.877' AS DateTime))
INSERT [dbo].[Login] ([idLogin], [idUser], [token], [createdTime], [expiredTime]) VALUES (25, 3, N'M2FkbWluMTAvMjQvMjAxOCAyMTo1MDowNQ==', CAST(N'2018-10-24T21:44:56.273' AS DateTime), CAST(N'2018-10-24T22:20:05.743' AS DateTime))
INSERT [dbo].[Login] ([idLogin], [idUser], [token], [createdTime], [expiredTime]) VALUES (26, 3, N'M2FkbWluMTAvMjcvMjAxOCAxMzowOToyNw==', CAST(N'2018-10-27T13:09:27.857' AS DateTime), CAST(N'2018-10-27T13:39:27.857' AS DateTime))
INSERT [dbo].[Login] ([idLogin], [idUser], [token], [createdTime], [expiredTime]) VALUES (27, 3, N'M2FkbWluMTAvMjcvMjAxOCAxNDo1MjozNA==', CAST(N'2018-10-27T14:52:34.797' AS DateTime), CAST(N'2018-10-27T15:22:34.797' AS DateTime))
INSERT [dbo].[Login] ([idLogin], [idUser], [token], [createdTime], [expiredTime]) VALUES (28, 3, N'M2FkbWluMTAvMjcvMjAxOCAxNzo0Nzo0Nw==', CAST(N'2018-10-27T17:47:47.047' AS DateTime), CAST(N'2018-10-27T18:17:47.047' AS DateTime))
INSERT [dbo].[Login] ([idLogin], [idUser], [token], [createdTime], [expiredTime]) VALUES (29, 3, N'M2FkbWluMTAvMjcvMjAxOCAyMjoyNjoyMw==', CAST(N'2018-10-27T22:26:23.800' AS DateTime), CAST(N'2018-10-27T22:56:23.800' AS DateTime))
INSERT [dbo].[Login] ([idLogin], [idUser], [token], [createdTime], [expiredTime]) VALUES (30, 3, N'M2FkbWluMTAvMjcvMjAxOCAyMzoxMzowNw==', CAST(N'2018-10-27T23:13:07.783' AS DateTime), CAST(N'2018-10-27T23:43:07.783' AS DateTime))
INSERT [dbo].[Login] ([idLogin], [idUser], [token], [createdTime], [expiredTime]) VALUES (31, 3, N'M2FkbWluMTAvMjkvMjAxOCAxNDo0NDoxMg==', CAST(N'2018-10-29T14:26:16.607' AS DateTime), CAST(N'2018-10-29T15:14:12.110' AS DateTime))
INSERT [dbo].[Login] ([idLogin], [idUser], [token], [createdTime], [expiredTime]) VALUES (32, 3, N'M2FkbWluMTEvNC8yMDE4IDEyOjUwOjMw', CAST(N'2018-11-04T12:50:30.497' AS DateTime), CAST(N'2018-11-04T13:20:30.497' AS DateTime))
SET IDENTITY_INSERT [dbo].[Login] OFF
SET IDENTITY_INSERT [dbo].[Product] ON 

INSERT [dbo].[Product] ([idProduct], [idCategory], [code], [name], [length], [width], [high], [priceIn], [priceOut], [madein], [quantity], [description], [avatar], [images], [idCreator], [isDelete], [createdDate], [updatedDate]) VALUES (2, 1, N'P0123456', N'hộp đồ ráp Ken shin 1', CAST(10.0 AS Decimal(6, 1)), CAST(19.0 AS Decimal(6, 1)), CAST(20.0 AS Decimal(6, 1)), CAST(50000 AS Decimal(10, 0)), CAST(800000 AS Decimal(10, 0)), N'China', 100, N'nothing', NULL, NULL, 3, 0, CAST(N'2018-10-26T00:00:00.000' AS DateTime), CAST(N'2018-10-26T00:00:00.000' AS DateTime))
INSERT [dbo].[Product] ([idProduct], [idCategory], [code], [name], [length], [width], [high], [priceIn], [priceOut], [madein], [quantity], [description], [avatar], [images], [idCreator], [isDelete], [createdDate], [updatedDate]) VALUES (3, 1, N'P0123457', N'Lắp ráp shu shi 1', CAST(10.0 AS Decimal(6, 1)), CAST(22.0 AS Decimal(6, 1)), CAST(20.0 AS Decimal(6, 1)), CAST(70000 AS Decimal(10, 0)), CAST(800000 AS Decimal(10, 0)), N'China', 100, N'nothing', NULL, NULL, 3, 0, CAST(N'2018-10-26T00:00:00.000' AS DateTime), CAST(N'2018-10-26T00:00:00.000' AS DateTime))
INSERT [dbo].[Product] ([idProduct], [idCategory], [code], [name], [length], [width], [high], [priceIn], [priceOut], [madein], [quantity], [description], [avatar], [images], [idCreator], [isDelete], [createdDate], [updatedDate]) VALUES (4, 1, N'P0123458', N'Sửa xe máy 1', CAST(26.0 AS Decimal(6, 1)), CAST(40.0 AS Decimal(6, 1)), CAST(35.0 AS Decimal(6, 1)), CAST(10000 AS Decimal(10, 0)), CAST(120000 AS Decimal(10, 0)), N'Việt Nam', 100, N'nothing', NULL, NULL, 3, 0, CAST(N'2018-10-26T00:00:00.000' AS DateTime), CAST(N'2018-10-26T00:00:00.000' AS DateTime))
INSERT [dbo].[Product] ([idProduct], [idCategory], [code], [name], [length], [width], [high], [priceIn], [priceOut], [madein], [quantity], [description], [avatar], [images], [idCreator], [isDelete], [createdDate], [updatedDate]) VALUES (5, 1, N'P0123459', N'hộp đồ ráp Ken shin 2', CAST(10.0 AS Decimal(6, 1)), CAST(19.0 AS Decimal(6, 1)), CAST(20.0 AS Decimal(6, 1)), CAST(50000 AS Decimal(10, 0)), CAST(800000 AS Decimal(10, 0)), N'China', 100, N'nothing', NULL, NULL, 3, 0, CAST(N'2018-10-26T00:00:00.000' AS DateTime), CAST(N'2018-10-26T00:00:00.000' AS DateTime))
INSERT [dbo].[Product] ([idProduct], [idCategory], [code], [name], [length], [width], [high], [priceIn], [priceOut], [madein], [quantity], [description], [avatar], [images], [idCreator], [isDelete], [createdDate], [updatedDate]) VALUES (6, 1, N'P0123420', N'Lắp ráp shu shi 2', CAST(10.0 AS Decimal(6, 1)), CAST(22.0 AS Decimal(6, 1)), CAST(20.0 AS Decimal(6, 1)), CAST(70000 AS Decimal(10, 0)), CAST(800000 AS Decimal(10, 0)), N'China', 100, N'nothing', NULL, NULL, 3, 0, CAST(N'2018-10-26T00:00:00.000' AS DateTime), CAST(N'2018-10-26T00:00:00.000' AS DateTime))
INSERT [dbo].[Product] ([idProduct], [idCategory], [code], [name], [length], [width], [high], [priceIn], [priceOut], [madein], [quantity], [description], [avatar], [images], [idCreator], [isDelete], [createdDate], [updatedDate]) VALUES (7, 1, N'P0123452', N'Sửa xe máy 2', CAST(26.0 AS Decimal(6, 1)), CAST(40.0 AS Decimal(6, 1)), CAST(35.0 AS Decimal(6, 1)), CAST(10000 AS Decimal(10, 0)), CAST(120000 AS Decimal(10, 0)), N'Việt Nam', 100, N'nothing', NULL, NULL, 3, 0, CAST(N'2018-10-26T00:00:00.000' AS DateTime), CAST(N'2018-10-26T00:00:00.000' AS DateTime))
INSERT [dbo].[Product] ([idProduct], [idCategory], [code], [name], [length], [width], [high], [priceIn], [priceOut], [madein], [quantity], [description], [avatar], [images], [idCreator], [isDelete], [createdDate], [updatedDate]) VALUES (8, 1, N'P0123456', N'hộp đồ ráp Ken shin  3', CAST(10.0 AS Decimal(6, 1)), CAST(19.0 AS Decimal(6, 1)), CAST(20.0 AS Decimal(6, 1)), CAST(50000 AS Decimal(10, 0)), CAST(800000 AS Decimal(10, 0)), N'China', 100, N'nothing', NULL, NULL, 3, 0, CAST(N'2018-10-26T00:00:00.000' AS DateTime), CAST(N'2018-10-26T00:00:00.000' AS DateTime))
INSERT [dbo].[Product] ([idProduct], [idCategory], [code], [name], [length], [width], [high], [priceIn], [priceOut], [madein], [quantity], [description], [avatar], [images], [idCreator], [isDelete], [createdDate], [updatedDate]) VALUES (9, 1, N'P0123457', N'Lắp ráp shu shi 3', CAST(10.0 AS Decimal(6, 1)), CAST(22.0 AS Decimal(6, 1)), CAST(20.0 AS Decimal(6, 1)), CAST(70000 AS Decimal(10, 0)), CAST(800000 AS Decimal(10, 0)), N'China', 100, N'nothing', NULL, NULL, 3, 0, CAST(N'2018-10-26T00:00:00.000' AS DateTime), CAST(N'2018-10-26T00:00:00.000' AS DateTime))
INSERT [dbo].[Product] ([idProduct], [idCategory], [code], [name], [length], [width], [high], [priceIn], [priceOut], [madein], [quantity], [description], [avatar], [images], [idCreator], [isDelete], [createdDate], [updatedDate]) VALUES (10, 1, N'P0123458', N'Sửa xe máy 3', CAST(26.0 AS Decimal(6, 1)), CAST(40.0 AS Decimal(6, 1)), CAST(35.0 AS Decimal(6, 1)), CAST(10000 AS Decimal(10, 0)), CAST(120000 AS Decimal(10, 0)), N'Việt Nam', 100, N'nothing', NULL, NULL, 3, 0, CAST(N'2018-10-26T00:00:00.000' AS DateTime), CAST(N'2018-10-26T00:00:00.000' AS DateTime))
INSERT [dbo].[Product] ([idProduct], [idCategory], [code], [name], [length], [width], [high], [priceIn], [priceOut], [madein], [quantity], [description], [avatar], [images], [idCreator], [isDelete], [createdDate], [updatedDate]) VALUES (11, 1, N'P0123459', N'hộp đồ ráp Ken shin 4', CAST(10.0 AS Decimal(6, 1)), CAST(19.0 AS Decimal(6, 1)), CAST(20.0 AS Decimal(6, 1)), CAST(50000 AS Decimal(10, 0)), CAST(800000 AS Decimal(10, 0)), N'China', 100, N'nothing', NULL, NULL, 3, 0, CAST(N'2018-10-26T00:00:00.000' AS DateTime), CAST(N'2018-10-26T00:00:00.000' AS DateTime))
INSERT [dbo].[Product] ([idProduct], [idCategory], [code], [name], [length], [width], [high], [priceIn], [priceOut], [madein], [quantity], [description], [avatar], [images], [idCreator], [isDelete], [createdDate], [updatedDate]) VALUES (12, 1, N'P0123420', N'Lắp ráp shu shi 4', CAST(10.0 AS Decimal(6, 1)), CAST(22.0 AS Decimal(6, 1)), CAST(20.0 AS Decimal(6, 1)), CAST(70000 AS Decimal(10, 0)), CAST(800000 AS Decimal(10, 0)), N'China', 100, N'nothing', NULL, NULL, 3, 0, CAST(N'2018-10-26T00:00:00.000' AS DateTime), CAST(N'2018-10-26T00:00:00.000' AS DateTime))
INSERT [dbo].[Product] ([idProduct], [idCategory], [code], [name], [length], [width], [high], [priceIn], [priceOut], [madein], [quantity], [description], [avatar], [images], [idCreator], [isDelete], [createdDate], [updatedDate]) VALUES (13, 1, N'P0123452', N'Sửa xe máy 4', CAST(26.0 AS Decimal(6, 1)), CAST(40.0 AS Decimal(6, 1)), CAST(35.0 AS Decimal(6, 1)), CAST(10000 AS Decimal(10, 0)), CAST(120000 AS Decimal(10, 0)), N'Việt Nam', 100, N'nothing', NULL, NULL, 3, 0, CAST(N'2018-10-26T00:00:00.000' AS DateTime), CAST(N'2018-10-26T00:00:00.000' AS DateTime))
INSERT [dbo].[Product] ([idProduct], [idCategory], [code], [name], [length], [width], [high], [priceIn], [priceOut], [madein], [quantity], [description], [avatar], [images], [idCreator], [isDelete], [createdDate], [updatedDate]) VALUES (14, 1, N'P0123456', N'hộp đồ ráp Ken shi 5', CAST(10.0 AS Decimal(6, 1)), CAST(19.0 AS Decimal(6, 1)), CAST(20.0 AS Decimal(6, 1)), CAST(50000 AS Decimal(10, 0)), CAST(800000 AS Decimal(10, 0)), N'China', 100, N'nothing', NULL, NULL, 3, 0, CAST(N'2018-10-26T00:00:00.000' AS DateTime), CAST(N'2018-10-26T00:00:00.000' AS DateTime))
INSERT [dbo].[Product] ([idProduct], [idCategory], [code], [name], [length], [width], [high], [priceIn], [priceOut], [madein], [quantity], [description], [avatar], [images], [idCreator], [isDelete], [createdDate], [updatedDate]) VALUES (15, 1, N'P0123457', N'Lắp ráp shu shi 5', CAST(10.0 AS Decimal(6, 1)), CAST(22.0 AS Decimal(6, 1)), CAST(20.0 AS Decimal(6, 1)), CAST(70000 AS Decimal(10, 0)), CAST(800000 AS Decimal(10, 0)), N'China', 100, N'nothing', NULL, NULL, 3, 0, CAST(N'2018-10-26T00:00:00.000' AS DateTime), CAST(N'2018-10-26T00:00:00.000' AS DateTime))
INSERT [dbo].[Product] ([idProduct], [idCategory], [code], [name], [length], [width], [high], [priceIn], [priceOut], [madein], [quantity], [description], [avatar], [images], [idCreator], [isDelete], [createdDate], [updatedDate]) VALUES (16, 1, N'P0123458', N'Sửa xe máy 5', CAST(26.0 AS Decimal(6, 1)), CAST(40.0 AS Decimal(6, 1)), CAST(35.0 AS Decimal(6, 1)), CAST(10000 AS Decimal(10, 0)), CAST(120000 AS Decimal(10, 0)), N'Việt Nam', 100, N'nothing', NULL, NULL, 3, 0, CAST(N'2018-10-26T00:00:00.000' AS DateTime), CAST(N'2018-10-26T00:00:00.000' AS DateTime))
INSERT [dbo].[Product] ([idProduct], [idCategory], [code], [name], [length], [width], [high], [priceIn], [priceOut], [madein], [quantity], [description], [avatar], [images], [idCreator], [isDelete], [createdDate], [updatedDate]) VALUES (17, 1, N'P0123459', N'hộp đồ ráp Ken shin 6', CAST(10.0 AS Decimal(6, 1)), CAST(19.0 AS Decimal(6, 1)), CAST(20.0 AS Decimal(6, 1)), CAST(50000 AS Decimal(10, 0)), CAST(800000 AS Decimal(10, 0)), N'China', 100, N'nothing', NULL, NULL, 3, 0, CAST(N'2018-10-26T00:00:00.000' AS DateTime), CAST(N'2018-10-26T00:00:00.000' AS DateTime))
INSERT [dbo].[Product] ([idProduct], [idCategory], [code], [name], [length], [width], [high], [priceIn], [priceOut], [madein], [quantity], [description], [avatar], [images], [idCreator], [isDelete], [createdDate], [updatedDate]) VALUES (18, 1, N'P0123420', N'Lắp ráp shu shi 6', CAST(10.0 AS Decimal(6, 1)), CAST(22.0 AS Decimal(6, 1)), CAST(20.0 AS Decimal(6, 1)), CAST(70000 AS Decimal(10, 0)), CAST(800000 AS Decimal(10, 0)), N'China', 100, N'nothing', NULL, NULL, 3, 0, CAST(N'2018-10-26T00:00:00.000' AS DateTime), CAST(N'2018-10-26T00:00:00.000' AS DateTime))
INSERT [dbo].[Product] ([idProduct], [idCategory], [code], [name], [length], [width], [high], [priceIn], [priceOut], [madein], [quantity], [description], [avatar], [images], [idCreator], [isDelete], [createdDate], [updatedDate]) VALUES (19, 1, N'P0123452', N'Sửa xe máy 7', CAST(26.0 AS Decimal(6, 1)), CAST(40.0 AS Decimal(6, 1)), CAST(35.0 AS Decimal(6, 1)), CAST(10000 AS Decimal(10, 0)), CAST(120000 AS Decimal(10, 0)), N'Việt Nam', 100, N'nothing', NULL, NULL, 3, 0, CAST(N'2018-10-26T00:00:00.000' AS DateTime), CAST(N'2018-10-26T00:00:00.000' AS DateTime))
INSERT [dbo].[Product] ([idProduct], [idCategory], [code], [name], [length], [width], [high], [priceIn], [priceOut], [madein], [quantity], [description], [avatar], [images], [idCreator], [isDelete], [createdDate], [updatedDate]) VALUES (20, 1, N'P0123456', N'hộp đồ ráp Ken shin  7', CAST(10.0 AS Decimal(6, 1)), CAST(19.0 AS Decimal(6, 1)), CAST(20.0 AS Decimal(6, 1)), CAST(50000 AS Decimal(10, 0)), CAST(800000 AS Decimal(10, 0)), N'China', 100, N'nothing', NULL, NULL, 3, 0, CAST(N'2018-10-26T00:00:00.000' AS DateTime), CAST(N'2018-10-26T00:00:00.000' AS DateTime))
INSERT [dbo].[Product] ([idProduct], [idCategory], [code], [name], [length], [width], [high], [priceIn], [priceOut], [madein], [quantity], [description], [avatar], [images], [idCreator], [isDelete], [createdDate], [updatedDate]) VALUES (21, 1, N'P0123457', N'Lắp ráp shu shi 8', CAST(10.0 AS Decimal(6, 1)), CAST(22.0 AS Decimal(6, 1)), CAST(20.0 AS Decimal(6, 1)), CAST(70000 AS Decimal(10, 0)), CAST(800000 AS Decimal(10, 0)), N'China', 100, N'nothing', NULL, NULL, 3, 0, CAST(N'2018-10-26T00:00:00.000' AS DateTime), CAST(N'2018-10-26T00:00:00.000' AS DateTime))
INSERT [dbo].[Product] ([idProduct], [idCategory], [code], [name], [length], [width], [high], [priceIn], [priceOut], [madein], [quantity], [description], [avatar], [images], [idCreator], [isDelete], [createdDate], [updatedDate]) VALUES (22, 1, N'P0123458', N'Sửa xe máy 8', CAST(26.0 AS Decimal(6, 1)), CAST(40.0 AS Decimal(6, 1)), CAST(35.0 AS Decimal(6, 1)), CAST(10000 AS Decimal(10, 0)), CAST(120000 AS Decimal(10, 0)), N'Việt Nam', 100, N'nothing', NULL, NULL, 3, 0, CAST(N'2018-10-26T00:00:00.000' AS DateTime), CAST(N'2018-10-26T00:00:00.000' AS DateTime))
INSERT [dbo].[Product] ([idProduct], [idCategory], [code], [name], [length], [width], [high], [priceIn], [priceOut], [madein], [quantity], [description], [avatar], [images], [idCreator], [isDelete], [createdDate], [updatedDate]) VALUES (23, 1, N'P0123459', N'hộp đồ ráp Ken shin 9', CAST(10.0 AS Decimal(6, 1)), CAST(19.0 AS Decimal(6, 1)), CAST(20.0 AS Decimal(6, 1)), CAST(50000 AS Decimal(10, 0)), CAST(800000 AS Decimal(10, 0)), N'China', 100, N'nothing', NULL, NULL, 3, 0, CAST(N'2018-10-26T00:00:00.000' AS DateTime), CAST(N'2018-10-26T00:00:00.000' AS DateTime))
INSERT [dbo].[Product] ([idProduct], [idCategory], [code], [name], [length], [width], [high], [priceIn], [priceOut], [madein], [quantity], [description], [avatar], [images], [idCreator], [isDelete], [createdDate], [updatedDate]) VALUES (24, 1, N'P0123420', N'Lắp ráp shu shi 9', CAST(10.0 AS Decimal(6, 1)), CAST(22.0 AS Decimal(6, 1)), CAST(20.0 AS Decimal(6, 1)), CAST(70000 AS Decimal(10, 0)), CAST(800000 AS Decimal(10, 0)), N'China', 100, N'nothing', NULL, NULL, 3, 0, CAST(N'2018-10-26T00:00:00.000' AS DateTime), CAST(N'2018-10-26T00:00:00.000' AS DateTime))
INSERT [dbo].[Product] ([idProduct], [idCategory], [code], [name], [length], [width], [high], [priceIn], [priceOut], [madein], [quantity], [description], [avatar], [images], [idCreator], [isDelete], [createdDate], [updatedDate]) VALUES (25, 1, N'P0123452', N'Sửa xe máy 9', CAST(26.0 AS Decimal(6, 1)), CAST(40.0 AS Decimal(6, 1)), CAST(35.0 AS Decimal(6, 1)), CAST(10000 AS Decimal(10, 0)), CAST(120000 AS Decimal(10, 0)), N'Việt Nam', 100, N'nothing', NULL, NULL, 3, 0, CAST(N'2018-10-26T00:00:00.000' AS DateTime), CAST(N'2018-10-26T00:00:00.000' AS DateTime))
INSERT [dbo].[Product] ([idProduct], [idCategory], [code], [name], [length], [width], [high], [priceIn], [priceOut], [madein], [quantity], [description], [avatar], [images], [idCreator], [isDelete], [createdDate], [updatedDate]) VALUES (32, 1, N'P001230', N'product test', CAST(16.0 AS Decimal(6, 1)), CAST(13.0 AS Decimal(6, 1)), CAST(15.0 AS Decimal(6, 1)), CAST(150000 AS Decimal(10, 0)), CAST(160000 AS Decimal(10, 0)), N'Việt Nam', 100, N'No thing', NULL, NULL, 3, 0, CAST(N'2018-10-21T14:26:54.993' AS DateTime), CAST(N'2018-10-21T14:26:54.993' AS DateTime))
SET IDENTITY_INSERT [dbo].[Product] OFF
SET IDENTITY_INSERT [dbo].[Receipt] ON 

INSERT [dbo].[Receipt] ([idReceipt], [nameCustomer], [address], [phone], [description], [total], [status], [idUpdator], [createdDate], [updatedDate]) VALUES (1, N'Achilles', N'7 Ð?ng kiên ', N'01658545222', N'Giao hàng lúc 11h', CAST(500000 AS Decimal(15, 0)), 3, NULL, CAST(N'2018-10-27T14:24:44.550' AS DateTime), CAST(N'2018-10-27T14:24:44.550' AS DateTime))
INSERT [dbo].[Receipt] ([idReceipt], [nameCustomer], [address], [phone], [description], [total], [status], [idUpdator], [createdDate], [updatedDate]) VALUES (2, N'Achilles', N'7 Ð?ng kiên ', N'01658545222', N'Giao hàng lúc 11h', CAST(500000 AS Decimal(15, 0)), 1, NULL, CAST(N'2018-10-27T22:23:36.003' AS DateTime), CAST(N'2018-10-27T22:23:36.003' AS DateTime))
INSERT [dbo].[Receipt] ([idReceipt], [nameCustomer], [address], [phone], [description], [total], [status], [idUpdator], [createdDate], [updatedDate]) VALUES (3, N'Achilles', N'7 Ð?ng kiên ', N'01658545222', N'Giao hàng lúc 11h', CAST(500000 AS Decimal(15, 0)), 2, NULL, CAST(N'2018-10-27T22:32:23.727' AS DateTime), CAST(N'2018-10-27T22:32:23.727' AS DateTime))
INSERT [dbo].[Receipt] ([idReceipt], [nameCustomer], [address], [phone], [description], [total], [status], [idUpdator], [createdDate], [updatedDate]) VALUES (4, N'Achilles', N'7 Ð?ng kiên ', N'01658545222', N'Giao hàng lúc 11h', CAST(500000 AS Decimal(15, 0)), 3, NULL, CAST(N'2018-10-27T22:35:18.037' AS DateTime), CAST(N'2018-10-27T22:35:18.037' AS DateTime))
INSERT [dbo].[Receipt] ([idReceipt], [nameCustomer], [address], [phone], [description], [total], [status], [idUpdator], [createdDate], [updatedDate]) VALUES (5, N'Achilles', N'7 Ð?ng kiên ', N'01658545222', N'Giao hàng lúc 11h', CAST(500000 AS Decimal(15, 0)), 2, NULL, CAST(N'2018-11-04T12:27:09.543' AS DateTime), CAST(N'2018-11-04T12:27:09.543' AS DateTime))
SET IDENTITY_INSERT [dbo].[Receipt] OFF
SET IDENTITY_INSERT [dbo].[User] ON 

INSERT [dbo].[User] ([iduser], [fullname], [username], [password], [role], [phone], [address], [cmnd], [isDelete], [createdDate], [updatedDate]) VALUES (3, N'admin', N'admin', N'123', 1, NULL, NULL, NULL, 0, CAST(N'2018-08-10T15:33:15.000' AS DateTime), CAST(N'2018-08-10T15:33:15.000' AS DateTime))
INSERT [dbo].[User] ([iduser], [fullname], [username], [password], [role], [phone], [address], [cmnd], [isDelete], [createdDate], [updatedDate]) VALUES (4, N'Vu', N'Vu', N'123', 1, NULL, NULL, NULL, 0, CAST(N'2018-08-10T15:33:15.000' AS DateTime), CAST(N'2018-09-24T17:52:08.920' AS DateTime))
INSERT [dbo].[User] ([iduser], [fullname], [username], [password], [role], [phone], [address], [cmnd], [isDelete], [createdDate], [updatedDate]) VALUES (5, N'Le van bao', N'Achilles', N'123456', 0, NULL, NULL, NULL, 0, CAST(N'2018-10-10T20:41:10.693' AS DateTime), CAST(N'2018-10-10T20:41:12.430' AS DateTime))
INSERT [dbo].[User] ([iduser], [fullname], [username], [password], [role], [phone], [address], [cmnd], [isDelete], [createdDate], [updatedDate]) VALUES (6, N'Nowthing', N'AAAA', N'123456', 0, N'7855661112', N'HHHHHHHH', N'12564562', 0, CAST(N'2018-10-10T20:42:41.127' AS DateTime), CAST(N'2018-10-14T17:07:02.397' AS DateTime))
INSERT [dbo].[User] ([iduser], [fullname], [username], [password], [role], [phone], [address], [cmnd], [isDelete], [createdDate], [updatedDate]) VALUES (7, N'Nowthing', N'XXXXXX', N'123456', 0, NULL, NULL, NULL, 1, CAST(N'2018-10-10T20:42:41.127' AS DateTime), CAST(N'2018-10-10T21:12:35.040' AS DateTime))
INSERT [dbo].[User] ([iduser], [fullname], [username], [password], [role], [phone], [address], [cmnd], [isDelete], [createdDate], [updatedDate]) VALUES (8, N'Nowthing', N'XXXXXX', N'123456', 0, NULL, NULL, NULL, 1, CAST(N'2018-10-10T20:42:41.127' AS DateTime), CAST(N'2018-10-10T21:12:35.040' AS DateTime))
INSERT [dbo].[User] ([iduser], [fullname], [username], [password], [role], [phone], [address], [cmnd], [isDelete], [createdDate], [updatedDate]) VALUES (12, N'Nowthing', N'XXXX', N'123456', 0, N'0162552256', N'7 tr?n qu?c tu?n', N'17896335', 1, CAST(N'2018-10-14T16:38:03.667' AS DateTime), CAST(N'2018-10-14T16:38:03.667' AS DateTime))
SET IDENTITY_INSERT [dbo].[User] OFF
ALTER TABLE [dbo].[Bill] ADD  CONSTRAINT [DF_Bill_updatedDate]  DEFAULT (getdate()) FOR [updatedDate]
GO
ALTER TABLE [dbo].[Category] ADD  CONSTRAINT [DF_tblCategory_isDelete]  DEFAULT ((0)) FOR [isDelete]
GO
ALTER TABLE [dbo].[Category] ADD  CONSTRAINT [DF_tblCategory_updatedDate]  DEFAULT (getdate()) FOR [updatedDate]
GO
ALTER TABLE [dbo].[DetailBill] ADD  CONSTRAINT [DF_DetailBill_quantity]  DEFAULT ((0)) FOR [quantity]
GO
ALTER TABLE [dbo].[DetailBill] ADD  CONSTRAINT [DF_DetailBill_price]  DEFAULT ((0)) FOR [price]
GO
ALTER TABLE [dbo].[DetailReciept] ADD  CONSTRAINT [DF_tblDetailReciept_quantity]  DEFAULT ((0)) FOR [quantity]
GO
ALTER TABLE [dbo].[DetailReciept] ADD  CONSTRAINT [DF_tblDetailReciept_price]  DEFAULT ((0)) FOR [price]
GO
ALTER TABLE [dbo].[Product] ADD  CONSTRAINT [DF_tblProduct_isDelete]  DEFAULT ((0)) FOR [isDelete]
GO
ALTER TABLE [dbo].[Product] ADD  CONSTRAINT [DF_tblProduct_updatedDate]  DEFAULT (getdate()) FOR [updatedDate]
GO
ALTER TABLE [dbo].[Receipt] ADD  CONSTRAINT [DF_HoaDon_status]  DEFAULT ((0)) FOR [status]
GO
ALTER TABLE [dbo].[Receipt] ADD  CONSTRAINT [DF_HoaDon_updatedDate]  DEFAULT (getdate()) FOR [updatedDate]
GO
ALTER TABLE [dbo].[User] ADD  CONSTRAINT [DF_tblUser_role]  DEFAULT ((0)) FOR [role]
GO
ALTER TABLE [dbo].[User] ADD  CONSTRAINT [DF_tblUser_isDelete]  DEFAULT ((0)) FOR [isDelete]
GO
ALTER TABLE [dbo].[User] ADD  CONSTRAINT [DF_tblUser_updatedDate]  DEFAULT (getdate()) FOR [updatedDate]
GO
ALTER TABLE [dbo].[Bill]  WITH CHECK ADD  CONSTRAINT [FK_Bill_User] FOREIGN KEY([idUpdator])
REFERENCES [dbo].[User] ([iduser])
GO
ALTER TABLE [dbo].[Bill] CHECK CONSTRAINT [FK_Bill_User]
GO
ALTER TABLE [dbo].[DetailBill]  WITH CHECK ADD  CONSTRAINT [FK_DetailBill_Bill] FOREIGN KEY([idBill])
REFERENCES [dbo].[Bill] ([idBill])
GO
ALTER TABLE [dbo].[DetailBill] CHECK CONSTRAINT [FK_DetailBill_Bill]
GO
ALTER TABLE [dbo].[DetailBill]  WITH CHECK ADD  CONSTRAINT [FK_DetailBill_Product] FOREIGN KEY([idProduct])
REFERENCES [dbo].[Product] ([idProduct])
GO
ALTER TABLE [dbo].[DetailBill] CHECK CONSTRAINT [FK_DetailBill_Product]
GO
ALTER TABLE [dbo].[DetailReciept]  WITH CHECK ADD  CONSTRAINT [FK_tblDetailReciept_tblProduct] FOREIGN KEY([idProduct])
REFERENCES [dbo].[Product] ([idProduct])
GO
ALTER TABLE [dbo].[DetailReciept] CHECK CONSTRAINT [FK_tblDetailReciept_tblProduct]
GO
ALTER TABLE [dbo].[DetailReciept]  WITH CHECK ADD  CONSTRAINT [FK_tblDetailReciept_tblReceipt] FOREIGN KEY([idReciept])
REFERENCES [dbo].[Receipt] ([idReceipt])
GO
ALTER TABLE [dbo].[DetailReciept] CHECK CONSTRAINT [FK_tblDetailReciept_tblReceipt]
GO
ALTER TABLE [dbo].[Login]  WITH CHECK ADD  CONSTRAINT [FK_tblLogin_tblUser] FOREIGN KEY([idUser])
REFERENCES [dbo].[User] ([iduser])
GO
ALTER TABLE [dbo].[Login] CHECK CONSTRAINT [FK_tblLogin_tblUser]
GO
ALTER TABLE [dbo].[Product]  WITH CHECK ADD  CONSTRAINT [FK__tblProduc__idCre__66603565] FOREIGN KEY([idCreator])
REFERENCES [dbo].[User] ([iduser])
GO
ALTER TABLE [dbo].[Product] CHECK CONSTRAINT [FK__tblProduc__idCre__66603565]
GO
ALTER TABLE [dbo].[Product]  WITH CHECK ADD  CONSTRAINT [FK_tblProduct_tblCategory] FOREIGN KEY([idCategory])
REFERENCES [dbo].[Category] ([idCategory])
GO
ALTER TABLE [dbo].[Product] CHECK CONSTRAINT [FK_tblProduct_tblCategory]
GO
ALTER TABLE [dbo].[Receipt]  WITH CHECK ADD  CONSTRAINT [FK_tblReceipt_tblUser] FOREIGN KEY([idUpdator])
REFERENCES [dbo].[User] ([iduser])
GO
ALTER TABLE [dbo].[Receipt] CHECK CONSTRAINT [FK_tblReceipt_tblUser]
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Số lượng * giá của product' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'DetailBill', @level2type=N'COLUMN',@level2name=N'price'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Số lượng * giá của product' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'DetailReciept', @level2type=N'COLUMN',@level2name=N'price'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Lưu cách nhau bởi dấu ";"' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Product', @level2type=N'COLUMN',@level2name=N'images'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'0 là đang xử lý , 1 là hủy , 2 đang giao , 3 thành công' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Receipt', @level2type=N'COLUMN',@level2name=N'status'
GO
USE [master]
GO
ALTER DATABASE [BanHang] SET  READ_WRITE 
GO
