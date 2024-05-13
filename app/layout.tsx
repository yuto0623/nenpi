import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/providers/providers";
import NextAuthProvider from "@/providers/NextAuth";
import { Navigationbar } from "@/components/Navigationbar/Navigationbar";
import BottomBar from "@/components/BottomBar/BottomBar";
import { OneSignalInitial } from "@/lib/OneSignalInitial";

export const metadata: Metadata = {
	title: "nenpi!",
	description: "nenpi!",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="ja">
			<head>
				<link rel="manifest" href="/manifest.json" />
			</head>
			<body>
				<NextAuthProvider>
					<Providers>
						<OneSignalInitial />
						{children}
					</Providers>
				</NextAuthProvider>
			</body>
		</html>
	);
}
