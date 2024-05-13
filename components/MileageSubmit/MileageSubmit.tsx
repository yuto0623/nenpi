"use client";
import { Button, Card, CardBody, CardHeader, Input } from "@nextui-org/react";
import type { Settings, UserData } from "@prisma/client";
import axios from "axios";
import { createRef, type Dispatch } from "react";

export default function MileageSubmit({
	userData,
	getUserData,
	setUserData,
}: {
	userData: UserData | undefined;
	getUserData: () => void;
	setUserData: Dispatch<React.SetStateAction<UserData | undefined>>;
}) {
	const onSubmit = async (formData: FormData) => {
		if (!userData) return;
		setUserData({ ...userData, mileage: Number(formData.get("mileage")) });
		const putBody = {
			mileage: formData.get("mileage"),
		};
		const response = await axios.patch(
			`/api/userData/${userData.userId}`,
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
				<CardHeader>走行距離とガソリン価格の登録</CardHeader>
				<CardBody className="flex flex-col items-center justify-center gap-4">
					<Input
						name="mileage"
						placeholder={userData ? userData.mileage.toString() : "0"}
						endContent="km"
						label="走行距離"
						isRequired
					/>
					<Button type="submit" radius="full" color="success">
						登録
					</Button>
				</CardBody>
			</Card>
		</form>
	);
}
