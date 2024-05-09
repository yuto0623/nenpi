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
	const [user, setUser] = useState({
		id: "",
		name: "",
		email: "",
		image: "",
		mileage: null,
	});

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
		// console.log(response.data);
		setUser(response.data);
	};

	useEffect(() => {
		if (!user.mileage) {
			getUserDetail();
		}
	}, [getUserDetail, user]);

	const onSubmit = async (formData: FormData) => {
		if (!user) return;
		const putBody = {
			id: user.id,
			mileage: formData.get("mileage"),
		};
		const response = await axios.put("/api/user", JSON.stringify(putBody));
		// console.log(response.data);
		getUserDetail();
	};

	return (
		<main>
			{status === "authenticated" ? (
				<>
					<Navigationbar />
					<form action={onSubmit}>
						<Input name="mileage" />
						<Button type="submit">送信</Button>
						{user.mileage ? (
							<p>{user.mileage}</p>
						) : (
							<div>
								<Spinner />
							</div>
						)}
					</form>
				</>
			) : (
				<Login />
			)}
		</main>
	);
}
