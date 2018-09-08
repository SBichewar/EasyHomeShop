USE [master]
GO
/****** Object:  Database [EasyHomeShop]    Script Date: 8/22/2018 10:00:53 AM ******/
CREATE DATABASE [EasyHomeShop]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'EasyHomeShop', FILENAME = N'C:\Program Files (x86)\Microsoft SQL Server\MSSQL12.SQLEXPRESS\MSSQL\DATA\EasyHomeShop.mdf' , SIZE = 10432KB , MAXSIZE = UNLIMITED, FILEGROWTH = 1024KB )
 LOG ON 
( NAME = N'EasyHomeShop_log', FILENAME = N'C:\Program Files (x86)\Microsoft SQL Server\MSSQL12.SQLEXPRESS\MSSQL\DATA\EasyHomeShop_log.ldf' , SIZE = 1344KB , MAXSIZE = 2048GB , FILEGROWTH = 10%)
GO
ALTER DATABASE [EasyHomeShop] SET COMPATIBILITY_LEVEL = 120
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [EasyHomeShop].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [EasyHomeShop] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [EasyHomeShop] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [EasyHomeShop] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [EasyHomeShop] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [EasyHomeShop] SET ARITHABORT OFF 
GO
ALTER DATABASE [EasyHomeShop] SET AUTO_CLOSE ON 
GO
ALTER DATABASE [EasyHomeShop] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [EasyHomeShop] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [EasyHomeShop] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [EasyHomeShop] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [EasyHomeShop] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [EasyHomeShop] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [EasyHomeShop] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [EasyHomeShop] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [EasyHomeShop] SET  ENABLE_BROKER 
GO
ALTER DATABASE [EasyHomeShop] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [EasyHomeShop] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [EasyHomeShop] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [EasyHomeShop] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [EasyHomeShop] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [EasyHomeShop] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [EasyHomeShop] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [EasyHomeShop] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [EasyHomeShop] SET  MULTI_USER 
GO
ALTER DATABASE [EasyHomeShop] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [EasyHomeShop] SET DB_CHAINING OFF 
GO
ALTER DATABASE [EasyHomeShop] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [EasyHomeShop] SET TARGET_RECOVERY_TIME = 0 SECONDS 
GO
ALTER DATABASE [EasyHomeShop] SET DELAYED_DURABILITY = DISABLED 
GO
USE [EasyHomeShop]
GO
/****** Object:  Table [dbo].[Category]    Script Date: 8/22/2018 10:00:53 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Category](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](50) NULL,
	[CatImage] [nvarchar](max) NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Feedback]    Script Date: 8/22/2018 10:00:53 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Feedback](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](100) NULL,
	[Comment] [nvarchar](max) NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Login]    Script Date: 8/22/2018 10:00:53 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Login](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[UserName] [nvarchar](20) NULL,
	[Password] [nvarchar](20) NULL
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[ProductDiscount]    Script Date: 8/22/2018 10:00:53 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ProductDiscount](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[ProductId] [int] NULL,
	[Discount] [decimal](10, 2) NULL
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Products]    Script Date: 8/22/2018 10:00:53 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Products](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](50) NULL,
	[Description] [nvarchar](200) NULL,
	[Weight] [nvarchar](50) NULL,
	[Price] [decimal](10, 2) NULL,
	[Discount] [decimal](10, 2) NULL,
	[Image] [nvarchar](max) NULL,
	[CatId] [int] NULL,
	[SubCatId] [int] NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
/****** Object:  Table [dbo].[SpecialOffers]    Script Date: 8/22/2018 10:00:53 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[SpecialOffers](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[OfferTitle] [nvarchar](100) NULL,
	[OfferDetails] [nvarchar](max) NULL,
	[StartDate] [datetime] NULL,
	[EndDate] [datetime] NULL,
	[OfferImage] [nvarchar](max) NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
/****** Object:  Table [dbo].[SubCategory]    Script Date: 8/22/2018 10:00:53 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[SubCategory](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](50) NULL,
	[SubCatImage] [nvarchar](max) NULL,
	[CatId] [int] NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
USE [master]
GO
ALTER DATABASE [EasyHomeShop] SET  READ_WRITE 
GO
