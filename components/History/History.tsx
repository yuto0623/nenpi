import { Spinner } from "@nextui-org/react";
import type { DataList } from "@prisma/client";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

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
		console.log(dataList);
		if (dataList) return;
		getAllDataList();
	}, [getAllDataList, dataList]);

	return (
		<div>
			{dataList == null && <Spinner />}
			{dataList?.map((data) => (
				<div key={data.created_at.toString()} className="my-4">
					<p>
						登録時間：
						{new Date(data.created_at).toLocaleString("ja-JP", {
							timeZone: "Asia/Tokyo",
							year: "numeric",
							month: "long",
							day: "numeric",
							hour: "numeric",
						})}
						{new Date(data.created_at)
							.toLocaleString("ja-JP", {
								timeZone: "Asia/Tokyo",
								minute: "numeric",
								second: "numeric",
							})
							.replace(":", "分")}
						秒
					</p>
					<p>走行距離：{data.mileage}</p>
					<p>ガソリン価格：{data.gasPrice}</p>
					<p>給油量：{data.gas}</p>
				</div>
			))}
		</div>
	);
}
