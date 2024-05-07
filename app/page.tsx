"use client";
import React from "react";
import { Input } from "@nextui-org/input";
import { Button, ButtonGroup } from "@nextui-org/button";
import { Navigationbar } from "@/components/Navigationbar/Navigationbar";
import { useSession } from "next-auth/react";
import Login from "@/components/Login/Login";
import prisma from "@/lib/PrismaClient";

export default function Home() {
	const { data: session, status } = useSession();

	const onSubmit = async () => {
		try {
			const res = await fetch("/api/test").then((res) => res.json());
			console.log(res);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<main>
			{status === "authenticated" ? (
				<>
					<Navigationbar />
					<div>
						<Input />
						<Button onClick={() => onSubmit()}>送信</Button>
					</div>
				</>
			) : (
				<Login />
			)}
		</main>
	);
}
