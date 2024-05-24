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
import { UserDetail } from "../UserDetail/UserDetail";
import Logout from "../Logout/Logout";
import Settings from "../Settings/Settings";
import UserNameSet from "../UserNameSet/UserNameSet";

export function Navigationbar() {
	const [isMenuOpen, setIsMenuOpen] = React.useState(false);

	return (
		<Navbar maxWidth="xl" onMenuOpenChange={setIsMenuOpen}>
			<NavbarContent className="sm:hidden" justify="start">
				<NavbarMenuToggle />
				<NavbarBrand>
					<p className="font-bold text-inherit">nenpi!</p>
				</NavbarBrand>
			</NavbarContent>
			<NavbarContent className="hidden sm:flex">
				<NavbarBrand>
					<p className="font-bold text-inherit">nenpi!</p>
				</NavbarBrand>
				<Settings>
					<UserDetail />
				</Settings>
			</NavbarContent>
			<NavbarMenu>
				<UserDetail />
				<NavbarMenuItem>
					{/* <Settings>Settings</Settings> */}
					<div className="flex items-center text-sm">
						ナイトモード：
						<ThemeSwitcher />
					</div>
				</NavbarMenuItem>
				<NavbarMenuItem>
					<UserNameSet />
				</NavbarMenuItem>
				<NavbarMenuItem>
					<Logout />
				</NavbarMenuItem>
			</NavbarMenu>
		</Navbar>
	);
}
