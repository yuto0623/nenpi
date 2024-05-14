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
import type { Settings, UserData, DataList } from "@prisma/client";
import UserDataSubmit from "@/components/DataListSubmit/DataListSubmit";
import History from "@/components/History/History";

export default function Home() {
	const { data: session, status } = useSession();
	const [userSettings, setUserSettings] = useState<Settings>();
	const [userData, setUserData] = useState<UserData>();
	const [dataList, setDataList] = useState<DataList>();
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
		// console.log(response.data.dataList[0]);
		setUserData(response.data);
		setDataList(response.data.dataList[0]);
	};

	useEffect(() => {
		if (!userSettings) {
			getUserSettings();
		}
		if (!userData || !dataList) {
			getUserData();
		}
	}, [getUserSettings, userSettings, getUserData, userData, dataList]);

	return (
		<>
			{status === "authenticated" ? (
				<>
					<Navigationbar />
					<main className="px-4">
						{page === "home" ? (
							<div>
								<UserDataSubmit
									userData={userData}
									getUserData={getUserData}
									setUserData={setUserData}
								/>
								{dataList ? (
									<>
										<p>ガソリン価格：{dataList.gasPrice}円</p>
										<p>走行距離：{dataList.mileage}km</p>
										<p>給油量：{dataList.gas}km</p>
										<p>燃費：{dataList.mileage / dataList.gas}km/L</p>
									</>
								) : (
									<div>
										<Spinner />
									</div>
								)}
							</div>
						) : page === "history" ? (
							<History />
						) : page === "friend" ? (
							<p>friend</p>
						) : (
							<p>nopage</p>
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
