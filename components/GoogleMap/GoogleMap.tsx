import React from "react";
import {
	GoogleMap as Gmap,
	LoadScript,
	Marker,
	useJsApiLoader,
} from "@react-google-maps/api";

const GoogleMapStyles = [
	{
		featureType: "all",
		elementType: "labels.text",
		stylers: [
			{
				color: "#878787",
			},
		],
	},
	{
		featureType: "all",
		elementType: "labels.text.stroke",
		stylers: [
			{
				visibility: "off",
			},
		],
	},
	{
		featureType: "landscape",
		elementType: "all",
		stylers: [
			{
				color: "#f9f5ed",
			},
		],
	},
	{
		featureType: "road.highway",
		elementType: "all",
		stylers: [
			{
				color: "#f5f5f5",
			},
		],
	},
	{
		featureType: "road.highway",
		elementType: "geometry.stroke",
		stylers: [
			{
				color: "#c9c9c9",
			},
		],
	},
	{
		featureType: "water",
		elementType: "all",
		stylers: [
			{
				color: "#aee0f4",
			},
		],
	},
];

const containerStyle = {
	width: "100%",
	height: "30vh",
};

const zoom = 13;

export default function GoogleMap({
	center,
}: { center: { lat: number; lng: number } }) {
	const { isLoaded } = useJsApiLoader({
		id: "google-map-script",
		googleMapsApiKey: `${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API}`,
		libraries: ["geometry", "drawing"],
		language: "ja",
	});

	return (
		<>
			{/* <LoadScript
				googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API || ""}
			> */}
			{isLoaded && (
				<Gmap
					mapContainerStyle={containerStyle}
					center={center}
					zoom={zoom}
					options={{ styles: GoogleMapStyles }}
				>
					<Marker position={center} />
				</Gmap>
			)}
			{/* </LoadScript> */}
		</>
	);
}
