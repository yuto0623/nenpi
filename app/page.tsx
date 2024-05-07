"use client";
import React from "react";
import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Button,
	useDisclosure,
} from "@nextui-org/react";
import { ThemeSwitcher } from "@/components/Button/ThemeSwitcher";
import { Navigationbar } from "@/components/Navigationbar/Navigationbar";
import { useSession } from "next-auth/react";
import Login from "@/components/Login/Login";

export default function Home() {
	const { data: session, status } = useSession();
	return (
		<main>{status === "authenticated" ? <Navigationbar /> : <Login />}</main>
	);
}
