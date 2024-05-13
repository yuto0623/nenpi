import { Button, Card, CardBody, CardHeader, Input } from "@nextui-org/react";
import type { Settings } from "@prisma/client";
import axios from "axios";

export default function MileageSubmit({
	userSettings,
	getUserSettings,
}: { userSettings: Settings | undefined; getUserSettings: () => void }) {
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
		<form action={onSubmit}>
			<Card className="max-w-[800px] mx-auto ">
				<CardHeader>走行距離の登録</CardHeader>
				<CardBody className="flex flex-col items-center justify-center gap-4">
					<Input
						name="mileage"
						placeholder={userSettings ? userSettings.mileage.toString() : "0"}
						endContent="km"
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
