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
	Checkbox,
} from "@nextui-org/react";
import type { DataList, Settings, UserData } from "@prisma/client";
import axios from "axios";
import { createRef, useRef, useState, type Dispatch } from "react";
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
	const processing = useRef(false);
	const [isDisabled, setDisabled] = useState(false);
	const [isLocationEnabled, setLocationEnabled] = useState(false);
	const [Location, setLocation] = useState<GeolocationPosition>();

	const handleDisabled = (e: boolean) => {
		setDisabled(e);
		// console.log(e);
	};

	const locationHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
		setLocationEnabled(e.target.checked);
		await navigator.geolocation.getCurrentPosition(
			(position) => {
				setLocation(position);
			},
			null,
			{ enableHighAccuracy: true },
		);
		// console.log(Location);
		// console.log(e.target.checked);
	};

	const onSubmit = async (formData: FormData) => {
		if (!userData) return;
		if (processing.current) return;
		processing.current = true;
		handleDisabled(true);

		setUserData({
			...userData,
			// mileage: Number(formData.get("mileage")),
			// gasPrice: Number(formData.get("gasPrice")),
			// gas: Number(formData.get("gas")),
		});

		const mileage = Number(formData.get("mileage"));
		const putBody = {
			mileage: mileage,
			// mileageIncrement: dataList
			// 	? dataList.length > 0
			// 		? mileage - dataList[0].mileage
			// 		: mileage
			// 	: 0,
			gasPrice: formData.get("gasPrice"),
			gas: formData.get("gas"),
			...(isLocationEnabled &&
				Location && {
					location: {
						latitude: Location.coords.latitude,
						longitude: Location.coords.longitude,
					},
				}),
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
		processing.current = false;
		handleDisabled(false);
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
										autoFocus
										name="gasPrice"
										placeholder={
											dataList
												? dataList.length > 0
													? dataList[0].gasPrice.toString()
													: ""
												: "Loading..."
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
											dataList
												? dataList.length > 0
													? dataList[0].mileage.toString()
													: ""
												: "Loading..."
										}
										endContent="km"
										label="オドメーター"
										isRequired
										type="number"
										max={2147483647}
										min={
											dataList
												? dataList.length > 0
													? dataList[0].mileage.toString()
													: 0
												: 0
										}
									/>
									<Input
										name="gas"
										placeholder={
											dataList
												? dataList.length > 0
													? dataList[0].mileage.toString()
													: ""
												: "Loading..."
										}
										endContent="L"
										label="給油量"
										isRequired
										type="number"
										max={2147483647}
									/>
									<Checkbox
										onChange={(e) => {
											locationHandler(e);
										}}
									>
										位置情報を登録する
									</Checkbox>
									<Button
										type="submit"
										radius="full"
										color="success"
										isDisabled={isDisabled}
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
