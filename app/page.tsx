"use client";
import React, { useState, useEffect } from "react";
import { Input } from "@nextui-org/input";
import { Button, ButtonGroup } from "@nextui-org/button";
import { Navigationbar } from "@/components/Navigationbar/Navigationbar";
import { useSession } from "next-auth/react";
import Login from "@/components/Login/Login";
import axios from "axios";
import { Spinner } from "@nextui-org/react";

export default function Home() {
	const { data: session, status } = useSession();
	const [user, setUser] = useState("");

	const getUserDetail = async () => {
		// const body = {
		// 	id: session?.user?.id,
		// };
		const id = session?.user?.id;
		if (!id) return;
		const response = await axios.get("/api/user", {
			params: { id },
			// headers: { "Content-Type": "application/json" },
		});
		console.log(response.data);
		setUser(response.data.mileage);
	};

	useEffect(() => {
		getUserDetail();
	}, [getUserDetail]);

	const onSubmit = async () => {};

	return (
		<main>
			{status === "authenticated" ? (
				<>
					<Navigationbar />
					<div>
						<Input />
						<Button onClick={() => onSubmit()}>送信</Button>
						{user ? <p>{user}</p> : <Spinner />}
					</div>
				</>
			) : (
				<Login />
			)}
		</main>
	);
}
