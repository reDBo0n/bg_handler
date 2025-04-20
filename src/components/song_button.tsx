import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "./ui/dialog";
import Image from "next/image";

import { parseIconText } from "./icon";

import song_cats from "@/data/song_cats.json";
import song_data from "@/data/song_data.json"

type SongCat = {
	[id: string]: {
		name:	string;
		list:	string[];
	}
}

type SongData = {
	[id: string]: {
		name:	string;
		desc:	string;
	}
}

interface SongButtonProps {
	id:	string;
}

export default function SongButton({ id }: SongButtonProps) {
	const cats: SongCat = song_cats as SongCat;
	const data: SongData = song_data as SongData;

	return (
		<Dialog>
			<DialogTrigger>
				<span className="text-blue-600 hover:underline">
					{cats[id].name.concat(" Song List")}
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

					<div className="absolute max-w-[79%] top-[5%] left-[1%] flex items-center justify-center text-white text-2xl rounded z-1">
						{cats[id].name.concat(" Song List")}
					</div>

					<div className="absolute top-[15%] grid grid-cols-1 m-5 gap-5">
						{cats[id].list.map(i => (
							<div key={id.concat(i)} className="grid grid-cols-1">
								<b>{parseIconText(data[i].name)}:</b>
								<span>{parseIconText(data[i].desc)}</span>
							</div>
						))}
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}