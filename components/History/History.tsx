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

export default function History() {
	const { data: session, status } = useSession();
	const [dataList, setDataList] = useState<DataList[]>();

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
		// console.log(dataList);
		if (dataList) return;
		getAllDataList();
	}, [getAllDataList, dataList]);

	return (
		<div>
			{dataList == null ? (
				<Spinner />
			) : (
				<>
					<Table>
						<TableHeader>
							<TableColumn>登録時間</TableColumn>
							<TableColumn>オドメーター</TableColumn>
							{/* <TableColumn>走行距離</TableColumn> */}
							<TableColumn>ガソリン価格</TableColumn>
							<TableColumn>給油量</TableColumn>
						</TableHeader>
						<TableBody>
							{(dataList || [])?.map((data) => (
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
									<TableCell>{data.gasPrice}円/L</TableCell>
									<TableCell>{data.gas}L</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
					<Chart dataList={dataList} />
				</>
			)}
		</div>
	);
}
