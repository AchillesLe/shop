USE [master]
GO
/****** Object:  Database [BanHang]    Script Date: 10/6/2018 13:08:36 ******/
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
/****** Object:  User [WebDatabaseUser]    Script Date: 10/6/2018 13:08:37 ******/
CREATE USER [WebDatabaseUser] FOR LOGIN [IIS APPPOOL\DefaultAppPool] WITH DEFAULT_SCHEMA=[dbo]
GO
/****** Object:  User [NT AUTHORITY\NETWORK SERVICE]    Script Date: 10/6/2018 13:08:37 ******/
CREATE USER [NT AUTHORITY\NETWORK SERVICE] FOR LOGIN [NT AUTHORITY\NETWORK SERVICE] WITH DEFAULT_SCHEMA=[dbo]
GO
/****** Object:  User [NT AUTHORITY\IUSR]    Script Date: 10/6/2018 13:08:37 ******/
CREATE USER [NT AUTHORITY\IUSR] FOR LOGIN [NT AUTHORITY\IUSR]
GO
/****** Object:  User [ACHILLESPC\Administrator]    Script Date: 10/6/2018 13:08:37 ******/
CREATE USER [ACHILLESPC\Administrator] FOR LOGIN [ACHILLESPC\Administrator] WITH DEFAULT_SCHEMA=[dbo]
GO
/****** Object:  User [ACHILLES_COMPUT\cusoc]    Script Date: 10/6/2018 13:08:37 ******/
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
/****** Object:  Table [dbo].[Category]    Script Date: 10/6/2018 13:08:37 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Category](
	[idCategory] [int] IDENTITY(1,1) NOT NULL,
	[name] [varchar](250) NOT NULL,
	[idCreator] [int] NOT NULL,
	[isDelete] [int] NOT NULL,
	[createdDate] [datetime] NOT NULL,
	[updatedDate] [datetime] NOT NULL,
 CONSTRAINT [PK_tblCategory] PRIMARY KEY CLUSTERED 
(
	[idCategory] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[DetailReciept]    Script Date: 10/6/2018 13:08:37 ******/
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
/****** Object:  Table [dbo].[Login]    Script Date: 10/6/2018 13:08:37 ******/
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
/****** Object:  Table [dbo].[Product]    Script Date: 10/6/2018 13:08:37 ******/
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
	[quantity] [int] NOT NULL,
	[description] [text] NULL,
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
/****** Object:  Table [dbo].[Receipt]    Script Date: 10/6/2018 13:08:37 ******/
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
/****** Object:  Table [dbo].[User]    Script Date: 10/6/2018 13:08:38 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[User](
	[idUser] [int] IDENTITY(1,1) NOT NULL,
	[fullName] [varchar](250) NOT NULL,
	[userName] [varchar](50) NOT NULL,
	[password] [varchar](250) NOT NULL,
	[role] [int] NOT NULL,
	[isDelete] [int] NOT NULL,
	[createdDate] [datetime] NOT NULL,
	[updatedDate] [datetime] NOT NULL,
 CONSTRAINT [PK_tblUser] PRIMARY KEY CLUSTERED 
(
	[idUser] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[Category] ON 

INSERT [dbo].[Category] ([idCategory], [name], [idCreator], [isDelete], [createdDate], [updatedDate]) VALUES (1, N'Cate 1', 3, 0, CAST(N'2018-08-10T15:33:15.000' AS DateTime), CAST(N'2018-09-24T17:53:16.137' AS DateTime))
SET IDENTITY_INSERT [dbo].[Category] OFF
SET IDENTITY_INSERT [dbo].[User] ON 

INSERT [dbo].[User] ([idUser], [fullName], [userName], [password], [role], [isDelete], [createdDate], [updatedDate]) VALUES (3, N'admin', N'admin', N'123', 1, 0, CAST(N'2018-08-10T15:33:15.000' AS DateTime), CAST(N'2018-08-10T15:33:15.000' AS DateTime))
INSERT [dbo].[User] ([idUser], [fullName], [userName], [password], [role], [isDelete], [createdDate], [updatedDate]) VALUES (4, N'Vu', N'Vu', N'123', 1, 0, CAST(N'2018-08-10T15:33:15.000' AS DateTime), CAST(N'2018-09-24T17:52:08.920' AS DateTime))
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
REFERENCES [dbo].[User] ([idUser])
GO
ALTER TABLE [dbo].[Login] CHECK CONSTRAINT [FK_tblLogin_tblUser]
GO
ALTER TABLE [dbo].[Product]  WITH CHECK ADD  CONSTRAINT [FK__tblProduc__idCre__66603565] FOREIGN KEY([idCreator])
REFERENCES [dbo].[User] ([idUser])
GO
ALTER TABLE [dbo].[Product] CHECK CONSTRAINT [FK__tblProduc__idCre__66603565]
GO
ALTER TABLE [dbo].[Product]  WITH CHECK ADD  CONSTRAINT [FK_tblProduct_tblCategory] FOREIGN KEY([idCategory])
REFERENCES [dbo].[Category] ([idCategory])
GO
ALTER TABLE [dbo].[Product] CHECK CONSTRAINT [FK_tblProduct_tblCategory]
GO
ALTER TABLE [dbo].[Receipt]  WITH CHECK ADD  CONSTRAINT [FK_tblReceipt_tblUser] FOREIGN KEY([idUpdator])
REFERENCES [dbo].[User] ([idUser])
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
