"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Switch } from "@nextui-org/react";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import DarkModeIcon from "@mui/icons-material/DarkMode";

export function ThemeSwitcher() {
	const [mounted, setMounted] = useState(false);
	const { theme, setTheme } = useTheme();

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) return null;

	return (
		<div>
			<Switch
				size="md"
				color={"warning"}
				aria-label="テーマの切り替え"
				isSelected={theme === "light"}
				onValueChange={(selected) => {
					setTheme(selected ? "light" : "dark");
				}}
				thumbIcon={({ isSelected, className }) =>
					isSelected ? (
						<WbSunnyIcon className={`${className} text-[#F5A524] p-1`} />
					) : (
						<DarkModeIcon className={`${className} p-1`} />
					)
				}
			/>
		</div>
	);
}
