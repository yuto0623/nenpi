"use client";
import React, { useState, useEffect } from "react";
import { Input } from "@nextui-org/input";
import { Button, ButtonGroup } from "@nextui-org/button";
import { Navigationbar } from "@/components/Navigationbar/Navigationbar";
import { useSession } from "next-auth/react";
import Login from "@/components/Login/Login";
import axios from "axios";
import { Spinner, Card, CardHeader, CardBody } from "@nextui-org/react";
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
		<>
			{status === "authenticated" ? (
				<>
					<Navigationbar />
					<main className="px-4">
						{page === "home" ? (
							<form action={onSubmit}>
								<Card className="max-w-[800px] mx-auto ">
									<CardHeader>走行距離の登録</CardHeader>
									<CardBody className="flex flex-col items-center justify-center gap-4">
										<Input
											name="mileage"
											placeholder={
												userSettings ? userSettings.mileage.toString() : "0"
											}
											endContent="km"
											isRequired
										/>
										<Button type="submit" radius="full" color="success">
											登録
										</Button>
									</CardBody>
								</Card>
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
					</main>
					<BottomBar page={page} setPageHandler={setPageHandler} />
				</>
			) : (
				<main>
					<Login />
				</main>
			)}
		</>
	);
}
