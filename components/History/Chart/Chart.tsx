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

export default function Chart(dataList: { dataList: DataList[] | undefined }) {
	if (!dataList.dataList) return null;

	const transformedData = dataList.dataList.map((item, index) => ({
		name: new Date(item.created_at).toLocaleString("ja-JP", {
			timeZone: "Asia/Tokyo",
			year: "numeric",
			month: "long",
			day: "numeric",
			hour: "numeric",
		}),
		mileage: item.mileage,
		給油までの走行距離: dataList.dataList
			? dataList?.dataList[index + 1]
				? item.mileage - dataList?.dataList[index + 1]?.mileage
				: item.mileage
			: item.mileage,
		ガソリン価格: item.gasPrice,
		給油量: item.gas,
	}));

	const reversedData = transformedData.reverse();

	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	const CustomTooltip = ({ active, payload, label }: any) => {
		if (active && payload && payload.length) {
			return (
				<div className="custom-tooltip bg-gray-100 dark:bg-slate-900 p-5 rounded-2xl">
					<p className="label">{`${label}`}</p>
					<p className="desc">
						{payload[0].value} {payload[0].unit}
					</p>
				</div>
			);
		}
	};

	return (
		<Card className="mb-4 max-h-[40%] ">
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
									animationDuration={500}
								/>
								{/* <Line type="monotone" dataKey="正解数" stroke="#3ba2f6" />
					<Line type="monotone" dataKey="正解率" stroke="#ff0092" /> */}
								<Legend />
								<Tooltip content={<CustomTooltip />} />
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
									animationDuration={500}
								/>
								{/* <Line type="monotone" dataKey="正解数" stroke="#3ba2f6" />
					<Line type="monotone" dataKey="正解率" stroke="#ff0092" /> */}
								<Legend />
								<Tooltip content={<CustomTooltip />} />
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
									animationDuration={500}
								/>
								{/* <Line type="monotone" dataKey="正解数" stroke="#3ba2f6" />
					<Line type="monotone" dataKey="正解率" stroke="#ff0092" /> */}
								<Legend />
								<Tooltip content={<CustomTooltip />} />
							</LineChart>
						</ResponsiveContainer>
					</Tab>
				</Tabs>
			</CardBody>
		</Card>
	);
}
