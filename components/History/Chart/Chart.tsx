import { Card, CardBody } from "@nextui-org/react";
import type { DataList } from "@prisma/client";
import React from "react";
import {
	CartesianGrid,
	Legend,
	Line,
	LineChart,
	Tooltip,
	XAxis,
	YAxis,
	ResponsiveContainer,
} from "recharts";

export default function Chart(dataList: { dataList: DataList[] }) {
	const transformedData = dataList.dataList.map((item) => ({
		name: new Date(item.created_at).toLocaleString("ja-JP", {
			timeZone: "Asia/Tokyo",
			year: "numeric",
			month: "long",
			day: "numeric",
			hour: "numeric",
		}),
		mileage: item.mileage,
		ガソリン価格: item.gasPrice,
	}));

	const reversedData = transformedData.reverse();

	return (
		<Card>
			<CardBody>
				<ResponsiveContainer width="100%" height={300}>
					<LineChart
						width={700}
						height={300}
						data={reversedData}
						margin={{
							top: 5,
							right: 5,
							left: 5,
							bottom: 5,
						}}
					>
						<CartesianGrid strokeDasharray="3 3" />
						<XAxis dataKey="name" />
						<YAxis />
						<Line type="monotone" dataKey="ガソリン価格" stroke="#8884d8" />
						{/* <Line type="monotone" dataKey="正解数" stroke="#3ba2f6" />
					<Line type="monotone" dataKey="正解率" stroke="#ff0092" /> */}
						<Legend />
						<Tooltip />
					</LineChart>
				</ResponsiveContainer>
			</CardBody>
		</Card>
	);
}
