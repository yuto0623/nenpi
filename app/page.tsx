"use client";
import React from "react";
import { Input } from "@nextui-org/input";
import { Button, ButtonGroup } from "@nextui-org/button";
import { Navigationbar } from "@/components/Navigationbar/Navigationbar";
import { useSession } from "next-auth/react";
import Login from "@/components/Login/Login";
import axios from "axios";

export default function Home() {
	const { data: session, status } = useSession();

	const onSubmit = async () => {
		const body = {
			id: session?.user?.id,
		};
		const json = JSON.stringify(body);
		const response = await axios.post("/api/user", json, {
			headers: { "Content-Type": "application/json" },
		});
		console.log(response.data);
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
