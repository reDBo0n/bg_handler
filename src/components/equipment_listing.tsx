import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import Image from "next/image";

import ArmMaterial from "./arm_material";

import { expansionHandler, isMonsterHuntable } from "@/lib/handlers";

import equip_cats from "@/data/equip_cats.json"

export type EquipCat = {
	[id: string]: {
		name:	string;
		icon:	string;
		cat:	MaterialCat;
	};
}

type MaterialCat = {
	[id: string]: {
		icon:	string;
		equip:	string[];
	};
}

export default function EquipmentListing() {
	const cat: EquipCat = equip_cats;

	return (
		<Accordion type="multiple" className="w-full">
			{Object.entries(cat)
				.filter(([id]) => (expansionHandler.get(id)))
				.map(([id, entry]) => (
				<AccordionItem key={id} value={id}>
					<AccordionTrigger className="cursor-pointer">
						<div>
							<Image
								src={"/bg_handler/mh/".concat(entry.icon)}
								alt={entry.icon}
								width={30}
								height={30}
							/>
							{entry.name}
						</div>
					</AccordionTrigger>
					<AccordionContent>
						<div className="flex justify-center">
							<div className="grid grid-cols-2 gap-4">
								{Object.entries(entry.cat)
									.filter(([type]) => (isMonsterHuntable(type)))
									.map(([type, entry]) => (
									<ArmMaterial key={id.concat(type)} icon={entry.icon} equip={entry.equip}/>
								))}
							</div>
						</div>
					</AccordionContent>
				</AccordionItem>
			))}
		</Accordion>
	);
}