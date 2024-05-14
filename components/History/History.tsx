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
		setDataList(response.data);
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
				<div key={data.id} className="my-4">
					<p>{data.created_at.toString()}</p>
					<p>{data.mileage}</p>
					<p>{data.gasPrice}</p>
					<p>{data.gas}</p>
				</div>
			))}
		</div>
	);
}
