import {
	Spinner,
	Table,
	TableHeader,
	TableBody,
	TableColumn,
	TableRow,
	TableCell,
} from "@nextui-org/react";
import type { DataList } from "@prisma/client";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Chart from "./Chart/Chart";

export default function History(dataList: {
	dataList: DataList[] | undefined;
}) {
	const { data: session, status } = useSession();

	const dataListProps = dataList.dataList;

	return (
		<div className="mx-auto max-w-[800px]">
			{dataList == null ? (
				<div className="flex justify-center items-center w-full h-full">
					<Spinner />
				</div>
			) : (
				<>
					<Table>
						<TableHeader>
							<TableColumn>登録時間</TableColumn>
							<TableColumn>オドメーター</TableColumn>
							<TableColumn>給油までの走行距離</TableColumn>
							<TableColumn>ガソリン価格</TableColumn>
							<TableColumn>給油量</TableColumn>
						</TableHeader>
						<TableBody>
							{(dataListProps || [])?.map((data) => (
								<TableRow key={data.created_at.toString()}>
									<TableCell>
										{new Date(data.created_at).toLocaleString("ja-JP", {
											timeZone: "Asia/Tokyo",
											year: "numeric",
											month: "long",
											day: "numeric",
											// hour: "numeric",
										})}
										{/* {new Date(data.created_at)
										.toLocaleString("ja-JP", {
											timeZone: "Asia/Tokyo",
											minute: "numeric",
											second: "numeric",
										})
										.replace(":", "分")}
									秒 */}
									</TableCell>
									<TableCell>{data.mileage}Km</TableCell>
									<TableCell>{data.mileageIncrement}Km</TableCell>
									<TableCell>{data.gasPrice}円/L</TableCell>
									<TableCell>{data.gas}L</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
					<Chart dataList={dataListProps} />
				</>
			)}
		</div>
	);
}
