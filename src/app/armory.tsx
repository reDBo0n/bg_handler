'use Client';

import { useState, useEffect } from "react";

import EquipmentListing from "@/components/equipment_listing";

import { armoryHandler } from "@/lib/handlers";

export default function ArmoryTab() {
	const [, forceUpdate] = useState(0);

	useEffect(() => {
		armoryHandler.setUpdateCallback(() => forceUpdate((v) => v+1));
	})

	return (
		<div>
			<EquipmentListing />
		</div>
	);
}