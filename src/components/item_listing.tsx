import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import Image from "next/image";

import Item from "./item";

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
	const cat: ItemCat = item_cats;
	const data: ItemData = item_data;

	return (
		<Accordion type="multiple" className="w-full">
			{Object.entries(cat).map(([id, entry]) => (
				<AccordionItem key={id} value={id}>
					<AccordionTrigger>
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
										<Item id={i} name={data[i].name} icon={data[i].icon}/>
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