"use client";
import {
	Button,
	Card,
	CardBody,
	CardHeader,
	Input,
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	useDisclosure,
} from "@nextui-org/react";
import type { DataList, Settings, UserData } from "@prisma/client";
import axios from "axios";
import { createRef, type Dispatch } from "react";
import AddIcon from "@mui/icons-material/Add";

export default function DataListSubmit({
	userData,
	dataList,
	getUserData,
	setUserData,
}: {
	userData: UserData | undefined;
	dataList: DataList[] | undefined;
	getUserData: () => void;
	setUserData: Dispatch<React.SetStateAction<UserData | undefined>>;
}) {
	const { isOpen, onOpen, onOpenChange } = useDisclosure();

	const onSubmit = async (formData: FormData) => {
		if (!userData) return;
		setUserData({
			...userData,
			// mileage: Number(formData.get("mileage")),
			// gasPrice: Number(formData.get("gasPrice")),
			// gas: Number(formData.get("gas")),
		});
		const mileage = Number(formData.get("mileage"));
		const putBody = {
			mileage: mileage,
			mileageIncrement: dataList ? mileage - dataList[0].mileage : 0,
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
		onOpenChange();
	};

	const ref = createRef<HTMLFormElement>();

	return (
		<>
			<Button
				isIconOnly
				className="fixed bottom-20 right-5 p-2"
				onPress={onOpen}
				size="lg"
			>
				<AddIcon />
			</Button>
			<Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
				<ModalContent>
					{(onClose) => (
						<form ref={ref} action={onSubmit}>
							<Card className="max-w-[800px] mx-auto">
								<CardHeader>
									ガソリン価格とオドメーターと給油量の登録
								</CardHeader>
								<CardBody className="flex flex-col items-center justify-center gap-4">
									<Input
										name="gasPrice"
										placeholder={
											dataList ? dataList[0].gasPrice.toString() : "Loading..."
										}
										endContent="円/L"
										label="ガソリン価格"
										isRequired
										type="number"
										max={2147483647}
									/>
									<Input
										name="mileage"
										placeholder={
											dataList ? dataList[0].mileage.toString() : "Loading..."
										}
										endContent="km"
										label="オドメーター"
										isRequired
										type="number"
										max={2147483647}
										min={dataList ? dataList[0].mileage : 0}
									/>
									<Input
										name="gas"
										placeholder={
											dataList ? dataList[0].gas.toString() : "Loading..."
										}
										endContent="L"
										label="給油量"
										isRequired
										type="number"
										max={2147483647}
									/>
									<Button
										type="submit"
										radius="full"
										color="success"
										isDisabled={!dataList}
									>
										登録
									</Button>
								</CardBody>
							</Card>
						</form>
					)}
				</ModalContent>
			</Modal>
		</>
	);
}
