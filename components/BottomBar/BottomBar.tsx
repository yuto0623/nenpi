"use client";
import type React from "react";
import { Tabs, Tab } from "@nextui-org/react";

export default function BottomBar({
	setPageHandler,
	page,
}: { setPageHandler: (page: string) => void; page: string }) {
	return (
		<Tabs
			radius="full"
			color="primary"
			selectedKey={page}
			onSelectionChange={(key) => setPageHandler(key.toString())}
			classNames={{
				tabList:
					"fixed bottom-4 left-1/2 -translate-x-1/2 w-[95%] max-w-[500px]",
			}}
		>
			<Tab key="home" title="HOME" />
			<Tab key="friend" title="FRIEND" />
			{/* <Tab title="HOME3" />
			<Tab title="HOME4" /> */}
		</Tabs>
	);
}
