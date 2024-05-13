"use client";

import { useEffect } from "react";
import OneSignal from "react-onesignal";

export const OneSignalInitial = () => {
	useEffect(() => {
		const oneSignalInit = async () => {
			await OneSignal.init({
				appId: process.env.ONESIGNAL_APP_ID || "",
			}).then(() => {
				OneSignal.Slidedown.promptPush();
			});
		};
		oneSignalInit();
	}, []);
	return null;
};
