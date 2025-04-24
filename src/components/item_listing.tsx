import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import Image from "next/image";

import Item from "./item";

import { isMonsterHuntable } from "@/lib/handlers";

import item_cats from "@/data/item_cats.json"
import item_data from "@/data/item_data.json"

type ItemCat = {
	[id: string]: {
		name:	string
		icon:	string
		items:	string[]
	}
}

export type ItemData = {
	[id: string]: {
		name:	string
		icon:	string
	}
};

export default function ItemListing() {
	for(const x in (item_cats as ItemCat)) {
		const items = (item_cats as ItemCat)[x].items
		if(items.length % 3 === 1) {
			items.splice(items.length-1, 0, "_padding")
			items.splice(items.length, 0, "_padding2")
		}else if(items.length % 3 === 2) {
			items.splice(items.length-1, 0, "_padding")
		}

		(item_cats as ItemCat)[x].items = items;
	}

	const cat: ItemCat = item_cats;
	const data: ItemData = item_data;

	return (
		<Accordion type="multiple" className="w-full">
			{Object.entries(cat)
				.filter(([id]) => (isMonsterHuntable(id)))
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
							<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
								{entry.items.map(i => (
									<div key={id.concat(i)}>
										{i !== "_padding" && i !== "_padding2" && (
											<Item id={i} name={data[i].name} icon={data[i].icon}/>
										)}
									</div>
									
								))}
							</div>
						</div>
					</AccordionContent>
				</AccordionItem>
			))}
		</Accordion>
	);
}