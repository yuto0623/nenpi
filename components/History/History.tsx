import {
	Spinner,
	Table,
	TableHeader,
	TableBody,
	TableColumn,
	TableRow,
	TableCell,
	Card,
	CardHeader,
	Avatar,
	CardBody,
	Dropdown,
	DropdownTrigger,
	DropdownMenu,
	DropdownItem,
	useDisclosure,
	Modal,
	ModalContent,
	Input,
	Button,
} from "@nextui-org/react";
import type { DataList } from "@prisma/client";
import axios from "axios";
import { useSession } from "next-auth/react";
import { type Dispatch, useEffect, useState, type SetStateAction } from "react";
import Chart from "./Chart/Chart";
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";
import { Chip } from "@nextui-org/react";
import SpeedIcon from "@mui/icons-material/Speed";
import MoreVertIcon from "@mui/icons-material/MoreVert";

interface HistoryProps {
	dataList: DataList[] | undefined;
	setDataList: Dispatch<SetStateAction<DataList[] | undefined>>;
}

export default function History({ dataList, setDataList }: HistoryProps) {
	const { data: session, status } = useSession();
	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	const [editData, setEditData] = useState<DataList | null>(null);

	// const dataListProps = dataList.dataList;

	const pressDelete = async (data: DataList) => {
		await axios.delete(`/api/dataList/${data.id.toString()}`);
		setDataList((dataList) => dataList?.filter((d) => d.id !== data.id));
	};

	const handleEdit = (data: DataList) => {
		setEditData(data);
		onOpen();
	};

	const dataListUpdate = async (updatedData: FormData) => {
		const mileage = Number(updatedData.get("mileage"));
		const body = {
			mileage: mileage,
			mileageIncrement: dataList
				? dataList.length > 0
					? mileage - dataList[0].mileage
					: mileage
				: 0,
			gasPrice: Number(updatedData.get("gasPrice")),
			gas: Number(updatedData.get("gas")),
		};

		await axios.put(
			`/api/dataList/${editData?.id.toString()}`,
			JSON.stringify(body),
		);
		setDataList((prevDataList) =>
			prevDataList
				?.map((d) =>
					d.id === editData?.id
						? { ...d, ...Object.fromEntries(updatedData) }
						: d,
				)
				.sort((a, b) => Number(b.created_at) - Number(a.created_at)),
		);
		onOpenChange();
	};

	return (
		<div className="mx-auto max-w-[800px]">
			{dataList == null ? (
				<div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
					<Spinner label="Loading..." />
				</div>
			) : (
				<>
					<Chart dataList={dataList} />
					<div className="flex flex-col gap-6 ">
						{dataList?.map((data, index) => (
							<Card key={data.created_at.toString()}>
								<CardHeader className="flex gap-4 flex-row justify-between">
									<Avatar
										isBordered
										color="primary"
										size="sm"
										icon={<LocalGasStationIcon />}
									/>
									<p className="text-sm">
										{new Date(data.created_at).toLocaleString("ja-JP", {
											timeZone: "Asia/Tokyo",
											year: "numeric",
											month: "long",
											day: "numeric",
											hour: "numeric",
											minute: "numeric",
										})}
									</p>
									<Chip size="sm" variant="flat" startContent={<SpeedIcon />}>
										{data.mileage}Km
									</Chip>
									<Dropdown>
										<DropdownTrigger>
											<MoreVertIcon className="cursor-pointer" />
										</DropdownTrigger>
										<DropdownMenu>
											<DropdownItem onPress={() => handleEdit(data)}>
												編集
											</DropdownItem>
											<DropdownItem
												className="text-danger"
												color="danger"
												onPress={() => {
													pressDelete(data);
												}}
											>
												削除
											</DropdownItem>
										</DropdownMenu>
									</Dropdown>
									<Modal
										placement="center"
										isOpen={isOpen}
										onOpenChange={onOpenChange}
									>
										<ModalContent>
											{(onClose) => (
												<>
													<form action={dataListUpdate}>
														<Card className="max-w-[800px] mx-auto">
															<CardHeader>
																ガソリン価格とオドメーターと給油量の編集
															</CardHeader>
															<CardBody className="flex flex-col items-center justify-center gap-4">
																<Input
																	name="gasPrice"
																	placeholder={editData?.gasPrice.toString()}
																	defaultValue={editData?.gasPrice.toString()}
																	endContent="円/L"
																	label="ガソリン価格"
																	isRequired
																	type="number"
																	max={2147483647}
																/>
																<Input
																	name="mileage"
																	placeholder={editData?.mileage.toString()}
																	defaultValue={editData?.mileage.toString()}
																	endContent="km"
																	label="オドメーター"
																	isRequired
																	type="number"
																	max={2147483647}
																	min={0}
																/>
																<Input
																	name="gas"
																	placeholder={editData?.gas.toString()}
																	defaultValue={editData?.gas.toString()}
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
																	isDisabled={!editData}
																>
																	登録
																</Button>
															</CardBody>
														</Card>
													</form>
												</>
											)}
										</ModalContent>
									</Modal>
								</CardHeader>
								<CardBody className="text-[12px] flex flex-col gap-3 px-4">
									{/* <p>オドメーター：{data.mileage}Km</p> */}
									<div className="flex flex-row justify-between">
										<span>ガソリン価格：</span>
										<span>{data.gasPrice}円/L</span>
									</div>
									<div className="flex flex-row justify-between">
										<span>前回の給油からの走行距離：</span>
										<span>
											{dataList[index + 1]
												? data.mileage - dataList[index + 1]?.mileage
												: data.mileage}
											{/* {dataList[index - 1]?.created_at.toString()} */}
											Km
										</span>
									</div>
									<div className="flex flex-row justify-between">
										<span>給油量：</span>
										<span>{data.gas}L</span>
									</div>
								</CardBody>
							</Card>
						))}
					</div>
				</>
			)}
		</div>
	);
}
