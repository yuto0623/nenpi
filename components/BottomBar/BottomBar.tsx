"use client";
import React from "react";
import { Tabs, Tab } from "@nextui-org/react";
import { usePathname } from 'next/navigation';

export default function BottomBar() {
	const pathname = usePathname();
	console.log(pathname);
	return (
		<Tabs
			radius="full"
			color="primary"
			selectedKey={pathname}
			classNames={{
				tabList:
					"fixed bottom-4 left-1/2 -translate-x-1/2 w-[95%] max-w-[500px]",
				}}
				>
			<Tab key="/" title="HOME" href="/"/>
			<Tab key="/friend" title="FRIEND" href="/friend"/>
			<Tab title="HOME3" />
			<Tab title="HOME4" />
		</Tabs>
	);
}
