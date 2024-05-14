"use client";
import { Button, Card, CardBody, CardHeader, Input } from "@nextui-org/react";
import type { DataList, Settings, UserData } from "@prisma/client";
import axios from "axios";
import { createRef, type Dispatch } from "react";

export default function DataListSubmit({
	userData,
	dataList,
	getUserData,
	setUserData,
}: {
	userData: UserData | undefined;
	dataList: DataList | undefined;
	getUserData: () => void;
	setUserData: Dispatch<React.SetStateAction<UserData | undefined>>;
}) {
	const onSubmit = async (formData: FormData) => {
		if (!userData) return;
		setUserData({
			...userData,
			// mileage: Number(formData.get("mileage")),
			// gasPrice: Number(formData.get("gasPrice")),
			// gas: Number(formData.get("gas")),
		});
		const putBody = {
			mileage: formData.get("mileage"),
			gasPrice: formData.get("gasPrice"),
			gas: formData.get("gas"),
		};
		const response = await axios.post(
			`/api/dataList/${userData.userId}`,
			JSON.stringify(putBody),
		);
		if (response) {
			ref.current?.reset();
		}
		// console.log(response.data);
		getUserData();
	};

	const ref = createRef<HTMLFormElement>();

	return (
		<form ref={ref} action={onSubmit}>
			<Card className="max-w-[800px] mx-auto ">
				<CardHeader>ガソリン価格と走行距離と給油量の登録</CardHeader>
				<CardBody className="flex flex-col items-center justify-center gap-4">
					<Input
						name="gasPrice"
						placeholder={dataList ? dataList.gasPrice.toString() : "Loading..."}
						endContent="円/L"
						label="ガソリン価格"
						isRequired
						type="number"
						max={2147483647}
					/>
					<Input
						name="mileage"
						placeholder={dataList ? dataList.mileage.toString() : "Loading..."}
						endContent="km"
						label="走行距離"
						isRequired
						type="number"
						max={2147483647}
					/>
					<Input
						name="gas"
						placeholder={dataList ? dataList.gas.toString() : "Loading..."}
						endContent="L"
						label="給油量"
						isRequired
						type="number"
						max={2147483647}
					/>
					<Button type="submit" radius="full" color="success">
						登録
					</Button>
				</CardBody>
			</Card>
		</form>
	);
}
