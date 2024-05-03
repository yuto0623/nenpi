"use client";
import React from "react";
import {
	Navbar,
	NavbarBrand,
	NavbarContent,
	NavbarItem,
	NavbarMenuToggle,
	NavbarMenu,
	NavbarMenuItem,
	Link,
} from "@nextui-org/react";
import { ThemeSwitcher } from "../Button/ThemeSwitcher";

export function Navigationbar() {
	const [isMenuOpen, setIsMenuOpen] = React.useState(false);
	const menuItems = [
		"Profile",
		"Dashboard",
		"Activity",
		"Analytics",
		"System",
		"Deployments",
		"My Settings",
		"Team Settings",
		"Help & Feedback",
		"Log Out",
	];
	return (
		<Navbar onMenuOpenChange={setIsMenuOpen}>
			<NavbarContent className="sm:hidden" justify="start">
				<NavbarMenuToggle />
				<NavbarBrand>
					<p className="font-bold text-inherit">ねんぴはかる！</p>
				</NavbarBrand>
			</NavbarContent>
			<NavbarContent className="hidden sm:flex">
				<NavbarBrand>
					<p className="font-bold text-inherit">ねんぴはかる！</p>
				</NavbarBrand>
				<NavbarItem>
					<ThemeSwitcher />
				</NavbarItem>
			</NavbarContent>
			<NavbarMenu>
				{menuItems.map((item, index) => (
					<NavbarMenuItem key={item}>
						<Link
							className="w-full"
							color={
								index === 2
									? "warning"
									: index === menuItems.length - 1
										? "danger"
										: "foreground"
							}
							href="#"
							size="lg"
						>
							{item}
						</Link>
					</NavbarMenuItem>
				))}
				<ThemeSwitcher />
			</NavbarMenu>
		</Navbar>
	);
}
