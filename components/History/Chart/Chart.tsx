import { Card, CardBody, Tabs, Tab } from "@nextui-org/react";
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
		給油までの走行距離: item.mileageIncrement,
		ガソリン価格: item.gasPrice,
		給油量: item.gas,
	}));

	const reversedData = transformedData.reverse();

	return (
		<Card>
			<CardBody>
				<Tabs aria-label="History">
					<Tab key="gasPrice" title="ガソリン価格">
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
								<Line
									type="monotone"
									dataKey="ガソリン価格"
									stroke="#8884d8"
									unit="円"
								/>
								{/* <Line type="monotone" dataKey="正解数" stroke="#3ba2f6" />
					<Line type="monotone" dataKey="正解率" stroke="#ff0092" /> */}
								<Legend />
								<Tooltip />
							</LineChart>
						</ResponsiveContainer>
					</Tab>
					<Tab key="mileageIncrement" title="給油までの走行距離">
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
								<Line
									type="monotone"
									dataKey="給油までの走行距離"
									stroke="#8884d8"
									unit="Km"
								/>
								{/* <Line type="monotone" dataKey="正解数" stroke="#3ba2f6" />
					<Line type="monotone" dataKey="正解率" stroke="#ff0092" /> */}
								<Legend />
								<Tooltip />
							</LineChart>
						</ResponsiveContainer>
					</Tab>
					<Tab key="gas" title="給油量">
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
								<Line
									type="monotone"
									dataKey="給油量"
									stroke="#8884d8"
									unit="L"
								/>
								{/* <Line type="monotone" dataKey="正解数" stroke="#3ba2f6" />
					<Line type="monotone" dataKey="正解率" stroke="#ff0092" /> */}
								<Legend />
								<Tooltip />
							</LineChart>
						</ResponsiveContainer>
					</Tab>
				</Tabs>
			</CardBody>
		</Card>
	);
}
