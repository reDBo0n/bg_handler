import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "./ui/dialog";
import Image from "next/image";
import { cn } from "@/lib/utils";

import { parseIconText } from "./icon";

import card_data from "@/data/card_data.json";

type CardData = {
	[id: string]: {
		name:		string;
		agility:	string;
		rules:		string;
		mechanic?:	string;
		stamina?:	"finisher"|"normal";
		damage?:	string;
		armor?:		string;
		range?:		string;
		break?:		string;
		combo?:		string;
		move?: {
			when:	string;
			type:	string;
			amnt:	string;
		};
		special?:	string;
		special2?:	string;
		res?: {
			icon:	string;
			amnt:	string;
		}
	}
}

interface CardButtonProps {
	id:	string;
}

export default function CardButton({ id }: CardButtonProps) {
	const data: CardData = (card_data as unknown) as CardData;

	return (
		<Dialog>
			<DialogTrigger>
				<span className="text-blue-600 hover:underline">
					{data[id].name}
				</span>
			</DialogTrigger>
			<DialogContent className="bg-transparent border-none [&>button:last-child]:hidden p-0 max-w-none max-h-md sm:max-h-xl">
				<DialogTitle />

				<div className="relative h-full aspect-[744/1051]">
					<Image
						src="/bg_handler/mh/card.png"
						alt="Card"
						fill
						className="object-cover rounded-md z-0"
					/>

					{/* top row */}
					<div className="absolute max-w-[79%] top-[5%] left-[1%] flex items-center justify-center text-white text-2xl rounded z-1">
						{data[id].name}
					</div>
					<div className="absolute top-[2%] right-[2%] w-15 h-15 sm:w-25 sm:h-25 z-1">
						<Image
							src="/bg_handler/mh/agility.png"
							alt="Agility"
							fill
						/>
						<span className="absolute inset-0 flex items-center justify-center text-white text-2xl font-bold rounded sm:pt-1 sm:pr-1.5">
							{data[id].agility}
						</span>
					</div>

					{data[id].mechanic && (
						<div className="flex justify-center z-1">
							<div className="relative w-25 h-25 mt-20">
								<Image
									src={"/bg_handler/mh/".concat(data[id].mechanic)}
									alt={data[id].mechanic}
									fill
									className="object-contain z-1"
								/>
							</div>
						</div>
					)}

					{/* middle row */}
					<div className="absolute inset-0 pt-[45%] z-1">
						{data[id].stamina && (
							<Image
								src={data[id].stamina === "finisher" ? "/bg_handler/mh/stamina_fin.png" : "/bg_handler/mh/stamina.png"}
								alt="Stamina"
								fill
								className="object-contain z-1"
							/>
						)}
						<div className="flex justify-center z-2">
							{data[id].move && data[id].move.when === "pre" && (
								<div className="relative w-35 h-35 sm:w-50 sm:h-50 z-2">
									<Image
										src="/bg_handler/mh/move.png"
										alt="Pre-Move"
										fill
										className="object-contain"
									/>
									<span className={`absolute inset-0 flex items-center justify-center text-white text-2xl font-bold rounded ${data[id].move.type == "free" && "mt-1"} ${data[id].move.type == "away" && "mt-25 sm:mt-35"} ${data[id].move.type == "closer" && "mb-20 sm:mb-28"}`}>
										{data[id].move.amnt}
									</span>
								</div>
							)}
							{data[id].damage && (
								<div className="relative w-35 h-35 sm:w-50 sm:h-50 z-2">
									<Image
										src="/bg_handler/mh/damage.png"
										alt="Damage"
										fill
										className="object-contain"
									/>
									<span className="absolute inset-0 mt-8 flex items-center justify-center text-white text-2xl font-bold rounded">
										{data[id].damage}
									</span>
								</div>
							)}
							{data[id].armor && (
								<div className="relative w-35 h-35 sm:w-50 sm:h-50 z-2">
									<Image
										src="/bg_handler/mh/armor.png"
										alt="Armour"
										fill
										className="object-contain"
									/>
									<span className="absolute inset-0 mt-8 flex items-center justify-center text-white text-2xl font-bold rounded">
										{data[id].armor}
									</span>
								</div>
							)}
							{data[id].res && (
								<div className="relative w-35 h-35 sm:w-50 sm:h-50 z-2">
									<Image
										src={"/bg_handler/mh/".concat(data[id].res.icon)}
										alt="Armour"
										fill
										className="object-contain"
									/>
									<span className="absolute inset-0 mt-8 flex items-center justify-center text-white text-2xl font-bold rounded">
										{data[id].res.amnt}
									</span>
								</div>
							)}
							{data[id].special && (
								<div className="relative w-35 h-35 sm:w-50 sm:h-50 z-2">
									<Image
										src={"/bg_handler/mh/".concat(data[id].special)}
										alt={data[id].special}
										fill
										className="object-contain z-2"
									/>
								</div>
							)}
							{data[id].special2 && (
								<div className="relative w-35 h-35 sm:w-50 sm:h-50 z-2">
									<Image
										src={"/bg_handler/mh/".concat(data[id].special2)}
										alt={data[id].special2}
										fill
										className="object-contain z-2"
									/>
								</div>
							)}
							{data[id].move && data[id].move.when === "post" && (
								<div className="relative w-35 h-35 sm:w-50 sm:h-50 z-2">
									<Image
										src="/bg_handler/mh/move.png"
										alt="Post-Move"
										fill
										className="object-contain"
									/>
									<span className={`absolute inset-0 flex items-center justify-center text-white text-2xl font-bold rounded ${data[id].move.type == "free" && "mt-1"} ${data[id].move.type == "away" && "mt-25 sm:mt-35"} ${data[id].move.type == "closer" && "mb-20 sm:mb-28"}`}>
										{data[id].move.amnt}
									</span>
								</div>
							)}
						</div>
					</div>

					{/* text */}
					<div className="absolute inset-0 top-[40%] flex items-center justify-center text-white text-center z-5">
						<div>
							{parseIconText(data[id].rules)}
						</div>
					</div>

					{/* bottom row */}
					{data[id].range && (
						<div>
							<div className="absolute bottom-[2%] left-[2%] w-15 h-15 sm:w-25 sm:h-25">
								<Image
									src="/bg_handler/mh/range.png"
									alt="Range"
									fill
									className={cn(data[id].range === "0" ? "filter opacity-60" : "no-filter")}
								/>
								<span className="absolute inset-0 flex items-center justify-center text-white text-2xl font-bold rounded">
									{data[id].range}
								</span>
							</div>
							<div className="absolute bottom-[2%] left-[41%] sm:left-[40%] w-15 h-15 sm:w-25 sm:h-25">
								<Image
									src="/bg_handler/mh/break.png"
									alt="Break"
									fill
									className={cn(data[id].break === "0" ? "filter opcatiy-60" : "no-filter")}
								/>
								<span className="absolute inset-0 flex items-center justify-center text-white text-2xl font-bold rounded">
									{data[id].break}
								</span>
							</div>
							<div className="absolute bottom-[2%] right-[2%] w-15 h-15 sm:w-25 sm:h-25">
								<Image
									src="/bg_handler/mh/combo.png"
									alt="Combo"
									fill
									className={cn(data[id].combo === "0" ? "filter opacity-60" : "no-filter")}
								/>
								<span className="absolute inset-0 flex items-center justify-center text-white text-2xl font-bold rounded">
									{data[id].combo}
								</span>
							</div>
						</div>
					)}
				</div>
			</DialogContent>
		</Dialog>
	);
}