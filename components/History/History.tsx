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

	// const dataListProps = dataList.dataList;

	const pressDelete = async (data: DataList) => {
		await axios.delete(`/api/dataList/${data.id.toString()}`);
		setDataList((dataList) => dataList?.filter((d) => d.id !== data.id));
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

					<div className="flex flex-col gap-6">
						{dataList?.map((data) => (
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
											// hour: "numeric",
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
											<DropdownItem
												onPress={() => {
													pressDelete(data);
												}}
											>
												削除
											</DropdownItem>
										</DropdownMenu>
									</Dropdown>
								</CardHeader>
								<CardBody className="text-[12px] flex flex-col gap-3 px-4">
									{/* <p>オドメーター：{data.mileage}Km</p> */}
									<div className="flex flex-row justify-between">
										<span>前回の給油からの走行距離：</span>
										<span>{data.mileageIncrement}Km</span>
									</div>
									<div className="flex flex-row justify-between">
										<span>ガソリン価格：</span>
										<span>{data.gasPrice}円/L</span>
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
