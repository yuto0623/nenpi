"use client";
import React, { useState, useEffect } from "react";
import { Input } from "@nextui-org/input";
import { Button, ButtonGroup } from "@nextui-org/button";
import { Navigationbar } from "@/components/Navigationbar/Navigationbar";
import { useSession } from "next-auth/react";
import Login from "@/components/Login/Login";
import axios from "axios";
import { Spinner } from "@nextui-org/react";
import BottomBar from "@/components/BottomBar/BottomBar";
import type { Settings } from "@prisma/client";

export default function Home() {
	const { data: session, status } = useSession();
	const [userSettings, setUserSettings] = useState<Settings>();
	const [page, setPage] = useState("home");

	const setPageHandler = (page: string) => {
		setPage(page);
	};

	const getUserSettings = async () => {
		const id = session?.user?.id;
		if (!id) return;
		const response = await axios.get(`/api/settings/${id}`);
		// console.log(response.data);
		setUserSettings(response.data);
	};

	useEffect(() => {
		if (!userSettings) {
			getUserSettings();
		}
	}, [getUserSettings, userSettings]);

	const onSubmit = async (formData: FormData) => {
		if (!userSettings) return;
		const putBody = {
			mileage: formData.get("mileage"),
		};
		const response = await axios.patch(
			`/api/settings/${userSettings.userId}`,
			JSON.stringify(putBody),
		);
		// console.log(response.data);
		getUserSettings();
	};

	return (
		<main>
			{status === "authenticated" ? (
				<>
					<Navigationbar />
					{page === "home" ? (
						<form action={onSubmit}>
							<Input name="mileage" isRequired />
							<Button type="submit">送信</Button>
							{userSettings ? (
								<>
									<p>{userSettings.mileage}</p>
								</>
							) : (
								<div>
									<Spinner />
								</div>
							)}
						</form>
					) : page === "friend" ? (
						<p>friend</p>
					) : (
						<p>no-page</p>
					)}
					<BottomBar page={page} setPageHandler={setPageHandler} />
				</>
			) : (
				<Login />
			)}
		</main>
	);
}
