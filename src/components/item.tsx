'use client';

import Image from "next/image";
import { Button } from "./ui/button";

import { inventoryHandler } from "@/lib/handlers";

interface ItemProps {
	id: string;
	name: string;
	icon: string;
}

export default function Item({ id, name, icon }: ItemProps) {
	const addOne = () => {
		const currentVal = inventoryHandler.get(id);
		inventoryHandler.set(id, currentVal+1);
	};
	const subOne = () => {
		const currentVal = inventoryHandler.get(id);
		inventoryHandler.set(id, currentVal-1);
	}

	return (
			<div className="flex justify-start m-1">
				<Button size="sm" variant="ghost" onClick={subOne}>-</Button>
				<div className="relative">
					<Image
						src={"/mh/".concat(icon)}
						alt={name}
						width={30}
						height={30}
					/>
					<span className="absolute bottom-0 right-0 bg-black text-white text-xs px-1 rounded">
						{inventoryHandler.get(id)}
					</span>
				</div>
				<Button size="sm" variant="ghost" onClick={addOne}>+</Button>
				<div className="text-xs mt-2 text-center">{name}</div>
			</div>
	);
}