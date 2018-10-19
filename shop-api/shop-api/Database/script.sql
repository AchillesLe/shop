USE [master]
GO
/****** Object:  Database [BanHang]    Script Date: 10/18/2018 00:08:53 ******/
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
/****** Object:  User [WebDatabaseUser]    Script Date: 10/18/2018 00:08:53 ******/
CREATE USER [WebDatabaseUser] FOR LOGIN [IIS APPPOOL\DefaultAppPool] WITH DEFAULT_SCHEMA=[dbo]
GO
/****** Object:  User [NT AUTHORITY\NETWORK SERVICE]    Script Date: 10/18/2018 00:08:53 ******/
CREATE USER [NT AUTHORITY\NETWORK SERVICE] FOR LOGIN [NT AUTHORITY\NETWORK SERVICE] WITH DEFAULT_SCHEMA=[dbo]
GO
/****** Object:  User [NT AUTHORITY\IUSR]    Script Date: 10/18/2018 00:08:53 ******/
CREATE USER [NT AUTHORITY\IUSR] FOR LOGIN [NT AUTHORITY\IUSR]
GO
/****** Object:  User [ACHILLESPC\Administrator]    Script Date: 10/18/2018 00:08:53 ******/
CREATE USER [ACHILLESPC\Administrator] FOR LOGIN [ACHILLESPC\Administrator] WITH DEFAULT_SCHEMA=[dbo]
GO
/****** Object:  User [ACHILLES_COMPUT\cusoc]    Script Date: 10/18/2018 00:08:54 ******/
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
/****** Object:  Table [dbo].[Category]    Script Date: 10/18/2018 00:08:54 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Category](
	[idCategory] [int] IDENTITY(1,1) NOT NULL,
	[name] [varchar](250) NOT NULL,
	[isDelete] [int] NOT NULL,
	[createdDate] [datetime] NOT NULL,
	[updatedDate] [datetime] NOT NULL,
 CONSTRAINT [PK_tblCategory] PRIMARY KEY CLUSTERED 
(
	[idCategory] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[DetailReciept]    Script Date: 10/18/2018 00:08:54 ******/
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
/****** Object:  Table [dbo].[Login]    Script Date: 10/18/2018 00:08:55 ******/
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
/****** Object:  Table [dbo].[Product]    Script Date: 10/18/2018 00:08:55 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Product](
	[idProduct] [int] IDENTITY(1,1) NOT NULL,
	[idCategory] [int] NULL,
	[code] [varchar](50) NOT NULL,
	[name] [varchar](250) NOT NULL,
	[length] [decimal](6, 1) NULL,
	[width] [decimal](6, 1) NULL,
	[high] [decimal](6, 1) NULL,
	[price] [decimal](10, 0) NOT NULL,
	[madein] [varchar](250) NULL,
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
/****** Object:  Table [dbo].[Receipt]    Script Date: 10/18/2018 00:08:56 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Receipt](
	[idReceipt] [int] IDENTITY(1,1) NOT NULL,
	[nameCustomer] [varchar](250) NOT NULL,
	[address] [varchar](250) NOT NULL,
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
/****** Object:  Table [dbo].[User]    Script Date: 10/18/2018 00:08:56 ******/
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

INSERT [dbo].[Category] ([idCategory], [name], [isDelete], [createdDate], [updatedDate]) VALUES (1, N'Cate 1', 0, CAST(N'2018-08-10T15:33:15.000' AS DateTime), CAST(N'2018-09-24T17:53:16.137' AS DateTime))
INSERT [dbo].[Category] ([idCategory], [name], [isDelete], [createdDate], [updatedDate]) VALUES (2, N'XXXXX', 0, CAST(N'2018-10-15T16:27:12.793' AS DateTime), CAST(N'2018-10-15T16:27:12.793' AS DateTime))
SET IDENTITY_INSERT [dbo].[Category] OFF
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
SET IDENTITY_INSERT [dbo].[Login] OFF
SET IDENTITY_INSERT [dbo].[User] ON 

INSERT [dbo].[User] ([iduser], [fullname], [username], [password], [role], [phone], [address], [cmnd], [isDelete], [createdDate], [updatedDate]) VALUES (3, N'admin', N'admin', N'123', 1, NULL, NULL, NULL, 0, CAST(N'2018-08-10T15:33:15.000' AS DateTime), CAST(N'2018-08-10T15:33:15.000' AS DateTime))
INSERT [dbo].[User] ([iduser], [fullname], [username], [password], [role], [phone], [address], [cmnd], [isDelete], [createdDate], [updatedDate]) VALUES (4, N'Vu', N'Vu', N'123', 1, NULL, NULL, NULL, 0, CAST(N'2018-08-10T15:33:15.000' AS DateTime), CAST(N'2018-09-24T17:52:08.920' AS DateTime))
INSERT [dbo].[User] ([iduser], [fullname], [username], [password], [role], [phone], [address], [cmnd], [isDelete], [createdDate], [updatedDate]) VALUES (5, N'Le van bao', N'Achilles', N'123456', 0, NULL, NULL, NULL, 0, CAST(N'2018-10-10T20:41:10.693' AS DateTime), CAST(N'2018-10-10T20:41:12.430' AS DateTime))
INSERT [dbo].[User] ([iduser], [fullname], [username], [password], [role], [phone], [address], [cmnd], [isDelete], [createdDate], [updatedDate]) VALUES (6, N'Nowthing', N'AAAA', N'123456', 0, N'7855661112', N'HHHHHHHH', N'12564562', 0, CAST(N'2018-10-10T20:42:41.127' AS DateTime), CAST(N'2018-10-14T17:07:02.397' AS DateTime))
INSERT [dbo].[User] ([iduser], [fullname], [username], [password], [role], [phone], [address], [cmnd], [isDelete], [createdDate], [updatedDate]) VALUES (7, N'Nowthing', N'XXXXXX', N'123456', 0, NULL, NULL, NULL, 1, CAST(N'2018-10-10T20:42:41.127' AS DateTime), CAST(N'2018-10-10T21:12:35.040' AS DateTime))
INSERT [dbo].[User] ([iduser], [fullname], [username], [password], [role], [phone], [address], [cmnd], [isDelete], [createdDate], [updatedDate]) VALUES (8, N'Nowthing', N'XXXXXX', N'123456', 0, NULL, NULL, NULL, 1, CAST(N'2018-10-10T20:42:41.127' AS DateTime), CAST(N'2018-10-10T21:12:35.040' AS DateTime))
INSERT [dbo].[User] ([iduser], [fullname], [username], [password], [role], [phone], [address], [cmnd], [isDelete], [createdDate], [updatedDate]) VALUES (12, N'Nowthing', N'XXXX', N'123456', 0, N'0162552256', N'7 tr?n qu?c tu?n', N'17896335', 1, CAST(N'2018-10-14T16:38:03.667' AS DateTime), CAST(N'2018-10-14T16:38:03.667' AS DateTime))
SET IDENTITY_INSERT [dbo].[User] OFF
ALTER TABLE [dbo].[Category] ADD  CONSTRAINT [DF_tblCategory_isDelete]  DEFAULT ((0)) FOR [isDelete]
GO
ALTER TABLE [dbo].[Category] ADD  CONSTRAINT [DF_tblCategory_updatedDate]  DEFAULT (getdate()) FOR [updatedDate]
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
