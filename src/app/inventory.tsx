'use Client';

import { useState, useEffect } from "react";

import ItemListing from "@/components/item_listing";

import { inventoryHandler } from "@/lib/handlers";

export default function InventoryTab() {
	const [, forceUpdate] = useState(0);

	useEffect(() => {
		inventoryHandler.setUpdateCallback(() => forceUpdate((v) => v+1));
	})

	return (
		<div>
			<ItemListing />
		</div>
	);
}