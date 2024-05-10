import React from "react";
import { Tabs, Tab } from "@nextui-org/react";

export default function BottomBar() {
	return (
		<Tabs
			radius="full"
			color="primary"
			classNames={{
				tabList:
					"fixed bottom-4 left-1/2 -translate-x-1/2 w-[95%] max-w-[500px]",
			}}
		>
			<Tab title="HOME" />
			<Tab title="HOME2" />
			<Tab title="HOME3" />
			<Tab title="HOME4" />
		</Tabs>
	);
}
