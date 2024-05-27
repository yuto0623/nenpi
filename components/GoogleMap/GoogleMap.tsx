import React from "react";
import { GoogleMap as Gmap, LoadScript, Marker } from "@react-google-maps/api";

const containerStyle = {
	width: "100%",
	height: "30vh",
};

const zoom = 13;

export default function GoogleMap({
	center,
}: { center: { lat: number; lng: number } }) {
	return (
		<LoadScript
			googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API || ""}
		>
			<Gmap mapContainerStyle={containerStyle} center={center} zoom={zoom}>
				<Marker position={center} />
			</Gmap>
		</LoadScript>
	);
}
