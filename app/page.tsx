"use client";
import React, { useState, useEffect } from "react";
import { Input } from "@nextui-org/input";
import { Button, ButtonGroup } from "@nextui-org/button";
import { Navigationbar } from "@/components/Navigationbar/Navigationbar";
import { useSession } from "next-auth/react";
import Login from "@/components/Login/Login";
import axios from "axios";
import { Spinner, Card, CardHeader, CardBody, Spacer } from "@nextui-org/react";
import BottomBar from "@/components/BottomBar/BottomBar";
import type { Settings, UserData, DataList } from "@prisma/client";
import UserDataSubmit from "@/components/DataListSubmit/DataListSubmit";
import History from "@/components/History/History";
import Friend from "@/components/Friend/Friend";

export default function Home() {
	const { data: session, status } = useSession();
	const [userData, setUserData] = useState<UserData>();
	const [dataList, setDataList] = useState<DataList[]>();

	const [page, setPage] = useState("home");

	const setPageHandler = (page: string) => {
		setPage(page);
	};

	const getUserData = async () => {
		const id = session?.user?.id;
		if (!id) return;
		const response = await axios.get(`/api/userData/${id}`);
		// console.log(response.data);
		if (response.data === userData) {
			return;
		}
		// console.log(response.data.dataList);
		setUserData(response.data);
		setDataList(response.data.dataList);
	};

	const getAllDataList = async () => {
		const id = session?.user?.id;
		if (!id) return;
		const response = await axios.get(`/api/dataList/${id}`);
		if (response.data === dataList) {
			return;
		}
		setDataList(response.data.reverse());
	};

	useEffect(() => {
		if (!userData || !dataList) {
			getUserData();
			getAllDataList();
		}
	}, [getUserData, getAllDataList, userData, dataList]);

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
									dataList={dataList}
									getUserData={getUserData}
									setUserData={setUserData}
								/>
								{dataList ? (
									<>
										<Spacer y={5} />
										<Card className="max-w-[800px] mx-auto">
											<CardHeader>前回の走行データ</CardHeader>
											<CardBody>
												<p>ガソリン価格：{dataList[0].gasPrice}円</p>
												<p>オドメーター：{dataList[0].mileage}km</p>
												<p>
													今回の走行距離：
													{dataList[0].mileageIncrement}
													km
												</p>
												<p>給油量：{dataList[0].gas}km</p>
												<p>燃費：{dataList[0].mileage / dataList[0].gas}km/L</p>
											</CardBody>
										</Card>
									</>
								) : (
									<div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
										<Spinner label="Loading..." />
									</div>
								)}
							</div>
						) : page === "history" ? (
							<History dataList={dataList} />
						) : page === "friend" ? (
							<Friend />
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
