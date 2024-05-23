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
} from "@nextui-org/react";
import type { DataList } from "@prisma/client";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Chart from "./Chart/Chart";
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";
import { Chip } from "@nextui-org/react";
import SpeedIcon from "@mui/icons-material/Speed";

export default function History(dataList: {
	dataList: DataList[] | undefined;
}) {
	const { data: session, status } = useSession();

	const dataListProps = dataList.dataList;

	return (
		<div className="mx-auto max-w-[800px]">
			{dataList == null ? (
				<div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
					<Spinner label="Loading..." />
				</div>
			) : (
				<>
					<Chart dataList={dataListProps} />

					<div className="flex flex-col gap-6">
						{dataListProps?.map((data) => (
							<Card key={data.created_at.toString()}>
								<CardHeader className="flex gap-4 flex-row">
									<Avatar
										isBordered
										color="primary"
										size="sm"
										icon={<LocalGasStationIcon />}
									/>
									{new Date(data.created_at).toLocaleString("ja-JP", {
										timeZone: "Asia/Tokyo",
										year: "numeric",
										month: "long",
										day: "numeric",
										// hour: "numeric",
									})}
									<Chip variant="flat" startContent={<SpeedIcon />}>
										{data.mileage}Km
									</Chip>
								</CardHeader>
								<CardBody className="text-sm flex flex-col gap-3 px-4">
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
