import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import Image from "next/image";
import { Separator } from "./ui/separator";
import { Checkbox } from "./ui/checkbox";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils"

import { armoryHandler, expansionHandler, inventoryHandler } from "@/lib/handlers";
import CardButton from "./card_buttton";

import equip_data from "@/data/equip_data.json"
import item_data from "@/data/item_data.json"
import { ItemData } from "./item_listing";
import SongButton from "./song_button";

interface BaseEquip {
	name:	string;
	icon:	string;
	recipe: {
		[item: string]:	number;
	};
}

interface Armor extends BaseEquip {
	type:	"armor";
	armor:	string;
	res?: {
		type:	string
		amnt:	string
	};
	skill: {
		set?:	boolean;
		name:	string;
		desc:	string;
	}
}

interface Weapon extends BaseEquip {
	type:	"weapon";
	pre?:	string;
	armor?:	string;
	dev?:	string;
	damage: {
		[amnt:	string]:	number;
	};
	song?:	string;
	remove?: {
		[card:	string]:	number;
	};
	add?: {
		[card:	string]:	number;
	}
}

type EquipData = Armor | Weapon;
interface EquipDataMap {
	[id: string]:	EquipData;
}

interface ArmProps {
	id:	string;
}

export default function Arm({ id }: ArmProps) {
	// let's ignore this error with a double cast
	const eData: EquipDataMap = (equip_data as unknown) as EquipDataMap;
	const iData: ItemData = item_data;

	const createEntry = () => {
		return (
			<div>
				{/* recipe section */}
				<div>
					{Object.entries(eData[id].recipe).map(([item, amnt]) => (
						<div key={id.concat(item)} className="flex justify-between">
							<div className="flex justify-center">
								<Image
									src={"/bg_handler/mh/".concat(iData[item].icon)}
									alt={iData[item].name}
									width={20}
									height={20}
								/>
								{iData[item].name.concat(" x", amnt.toString())}
							</div>
							<div className="flex">
								<Image
									src={"/bg_handler/mh/box.png"}
									alt="box"
									width={20}
									height={20}
								/>
								{inventoryHandler.get(item)}
							</div>
						</div>
					))}
				</div>
				<Separator />
				{eData[id].type === "armor" && (
					createArmor()
				)}
				{eData[id].type === "weapon" && (
					createWeapon()
				)}
			</div>
		);
	}

	const createArmor = () => {
		return (
			<div>
				{/* defence section */}
				<div className="flex justify-center">
					<div className="relative w-8 h-8">
						<Image
							src="/bg_handler/mh/armor.png"
							alt="armor"
							fill
							className="object-contain"
						/>
						<span className="absolute inset-0 flex items-center justify-center text-white text-sm font-bold rounded">
							{eData[id].armor}
						</span>
					</div>
					{(eData[id] as Armor).res && (
						<div className="relative w-8 h-8">
							<Image
								src={"/bg_handler/mh/".concat((eData[id] as Armor).res?.type as string)}
								alt={(eData[id] as Armor).res?.type as string}
								fill
								className="object-contain"
							/>
							<span className="absolute inset-0 flex items-center justify-center text-white text-sm font-bold rounded">
								{(eData[id] as Armor).res?.amnt}
							</span>
						</div>
					)}
				</div>
				<Separator />
				{/* skill section */}
				<div>
					<div className="flex justify-start gap-1">
						{(eData[id] as Armor).skill.set && (
							<b>Set Bonus</b>
						)}
						{(eData[id] as Armor).skill.name}
					</div>
					<div>
						{(eData[id] as Armor).skill.desc}
					</div>
				</div>
			</div>
		);
	}

	const createWeapon = () => {
		return (
			<div>
				{/* damage section */}
				<div className="flex justify-center gap-4">
					{(eData[id] as Weapon).armor && (
						<div className="relative w-8 h-8">
							<Image
								src="/bg_handler/mh/armor.png"
								alt="armor"
								fill
								className="object-contain"
							/>
							<span className="absolute inset-0 flex items-center justify-center text-white text-large font-bold rounded" style={{ WebkitTextStroke: "0.6px black" }}>
								{eData[id].armor}
							</span>
						</div>
					)}
					{(eData[id] as Weapon).dev && (
						<div className="relative w-8 h-8">
						<Image
							src={"/bg_handler/mh/".concat((eData[id] as Weapon).dev as string)}
							alt={(eData[id] as Weapon).dev as string}
							fill
							className="object-contain"
						/>
					</div>
					)}
					{Object.entries((eData[id] as Weapon).damage).map(([dmg, amnt]) => (
						<div key={id.concat(dmg)} className="flex justify-center">
							<div className="relative w-8 h-8">
								<Image
									src="/bg_handler/mh/dmg.png"
									alt={dmg}
									fill
									className="object-contain"
								/>
								<span className="absolute inset-0 flex items-center justify-center text-white text-large font-bold rounded" style={{ WebkitTextStroke: "0.6px black" }}>
									{dmg}
								</span>
							</div>
							<div>
								{"x".concat(amnt.toString())}
							</div>
						</div>
					))}
				</div>
				<Separator />
				{/* card section */}
				{(eData[id] as Weapon).song && (
					<div>
						<SongButton id={(eData[id] as Weapon).song as string}/>
					</div>
				)}
				{(eData[id] as Weapon).remove && (
					<div>
						<i>Remove:</i>
						{Object.entries((eData[id] as Weapon).remove as {[card: string]: number}).map(([card, amnt]) => (
							<div key={id.concat(card)}>
								<CardButton id={card}/>
								x
								{amnt}
							</div>
						))}
						<i>Add:</i>
						{Object.entries((eData[id] as Weapon).add as {[card: string]: number}).map(([card, amnt]) => (
							<div key={id.concat(card)}>
								<CardButton id={card}/>
								x
								{amnt}
							</div>
						))}
					</div>
				)}
			</div>
		);
	}

	const isCraftable = () => {
		let tmp = !armoryHandler.get(id);
		if((eData[id] as Weapon).pre) {
			tmp = tmp && armoryHandler.get((eData[id] as Weapon).pre as string)
		}
		for(const item in eData[id].recipe) {
			if(eData[id].recipe[item] > inventoryHandler.get(item)) {
				tmp = false;
			}
		}

		return tmp;
	};

	const craftItem = () => {
		for(const item in eData[id].recipe) {
			inventoryHandler.set(item, inventoryHandler.get(item)-eData[id].recipe[item]);
		}
		armoryHandler.set(id, true);
	};

	const isCraftableSolo = () => {
		let tmp = armoryHandler.getSolo(id) < 4;

		for(const item in eData[id].recipe) {
			if(eData[id].recipe[item] > inventoryHandler.get(item)) {
				tmp = false;
			}
		}

		return tmp;
	};

	const craftItemSolo = () => {
		for(const item in eData[id].recipe) {
			inventoryHandler.set(item, inventoryHandler.get(item)-eData[id].recipe[item]);
		}
		armoryHandler.setSolo(id, armoryHandler.getSolo(id)+1);
	};

	const removeItemSolo = () => {
		armoryHandler.setSolo(id, armoryHandler.getSolo(id)-1);
	}

	const addItemSolo = () => {
		armoryHandler.setSolo(id, armoryHandler.getSolo(id)+1);
	}

	return (
		<Dialog>
			<DialogTrigger asChild className="cursor-pointer">
				<div className="relative">
					<Image
						src={"/bg_handler/mh/".concat(eData[id].icon)}
						alt={id}
						width={30}
						height={30}
						className="shrink-0"
					/>
					{(!expansionHandler.get("_solo") || eData[id].type === "weapon") && (isCraftable() || armoryHandler.get(id)) && (
						<div
							className={cn(
								"absolute bottom-0 right-0 h-3 w-3 rounded-full border border-white",
								armoryHandler.get(id) ? "bg-green-500" : "bg-yellow-400"
							)}
						/>
					)}
					{expansionHandler.get("_solo") && !(eData[id].type === "weapon") && (isCraftableSolo() || armoryHandler.getSolo(id) !== 0) && (
						<div className="relative">
							<div
								className={cn(
									"absolute bottom-0 right-0 h-3 w-3 rounded-full border border-white",
									isCraftableSolo() ? "bg-yellow-400" : "bg-green-500"
								)}
							/>
							<span className="absolute bottom-[-1] right-0 text-black text-xs px-0.5">
								{armoryHandler.getSolo(id)}
							</span>
						</div>
					)}
				</div>
			</DialogTrigger>

			<DialogContent>
				<DialogHeader>
					<DialogTitle className="flex justify-center">{eData[id].name}</DialogTitle>
					<DialogDescription>
					</DialogDescription>
				</DialogHeader>
				{createEntry()}
				{/* normal mode, only 1 per armor */}
				{(!expansionHandler.get("_solo") || eData[id].type === "weapon") && (
					<div className="flex justify-center gap-20">
						<div className="flex justify-center">
							<Image
								src="/bg_handler/mh/box.png"
								alt="box"
								width={20}
								height={20}
								className="object-contain"
							/>
							<Checkbox checked={armoryHandler.get(id)} onCheckedChange={(val) => armoryHandler.set(id, val === true)} className="cursor-pointer"/>
						</div>
						{isCraftable() && (
							<Button onClick={() => craftItem()} className="cursor-pointer">CRAFT</Button>
						)}
					</div>
				)}
				{/* solo mode, multiple cnts of armor possible */}
				{expansionHandler.get("_solo") && !(eData[id].type === "weapon") && (
					<div className="flex justify-center gap-20">
						<div className="flex justify-center">
							<Button size="sm" variant="ghost" onClick={() => removeItemSolo()} className="cursor-pointer">-</Button>
							<span className="mt-1.5">{armoryHandler.getSolo(id)}</span>
							<Button size="sm" variant="ghost" onClick={() => addItemSolo()} className="cursor-pointer">+</Button>
						</div>
						{isCraftableSolo() && (
							<Button onClick={() => craftItemSolo()} className="cursor-pointer">CRAFT</Button>
						)}
					</div>
				)}
				<DialogFooter>
					
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}