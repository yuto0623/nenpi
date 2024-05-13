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
import type { Settings, UserData } from "@prisma/client";
import MileageSubmit from "@/components/MileageSubmit/MileageSubmit";

export default function Home() {
	const { data: session, status } = useSession();
	const [userSettings, setUserSettings] = useState<Settings>();
	const [userData, setUserData] = useState<UserData>();
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

	const getUserData = async () => {
		const id = session?.user?.id;
		if (!id) return;
		const response = await axios.get(`/api/userData/${id}`);
		// console.log(response.data);
		if (response.data === userData) {
			return;
		}
		setUserData(response.data);
	};

	useEffect(() => {
		if (!userSettings) {
			getUserSettings();
		}
		if (!userData) {
			getUserData();
		}
	}, [getUserSettings, userSettings, getUserData, userData]);

	return (
		<>
			{status === "authenticated" ? (
				<>
					<Navigationbar />
					<main className="px-4">
						{page === "home" ? (
							<div>
								<MileageSubmit
									userData={userData}
									getUserData={getUserData}
									setUserData={setUserData}
								/>
								{userData ? (
									<>
										<p>{userData.mileage}</p>
									</>
								) : (
									<div>
										<Spinner />
									</div>
								)}
							</div>
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
