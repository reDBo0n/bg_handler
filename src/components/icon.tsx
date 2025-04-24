import Image from "next/image"

const iconMap: Record<string, string> = {
	":damage:":		"/bg_handler/mh/damage.png",
	":armor:":		"/bg_handler/mh/armor.png",
	":fire_res:":	"/bg_handler/mh/fire_res.png",
	":water_res:":	"/bg_handler/mh/water_res.png",
	":ice_res:":	"/bg_handler/mh/ice_res.png",
	":thunder_res:":"/bg_handler/mh/thunder_res.png",
	":dragon_res:":	"/bg_handler/mh/dragon_res.png",
	":attacks:":	"/bg_handler/mh/hunter_attack.png",
	":break:":		"/bg_handler/mh/break_token.png",
	":poison:":		"/bg_handler/mh/poison.png",
	":ice:":		"/bg_handler/mh/ice.png",
	":thunder:":	"/bg_handler/mh/thunder.png",
	":stun:":		"/bg_handler/mh/stun.png",
	":blast:":		"/bg_handler/mh/blast.png",
	":dev:":		"/bg_handler/mh/deviation.png",
	":turn:":		"/bg_handler/mh/hunter_turn.png",
	":hammer:":		"/bg_handler/mh/hammer.png",
	":bang:":		"/bg_handler/mh/bang.png",
	":dragon:":		"/bg_handler/mh/dragon.png",
	":white:":		"/bg_handler/mh/note_white.png",
	":red:":		"/bg_handler/mh/note_red.png",
	":blue:":		"/bg_handler/mh/note_blue.png",
	":range:":		"/bg_handler/mh/range_icon.png",
	":insect2:":	"/bg_handler/mh/insect_2_icon.png"
}

export function parseIconText(text: string) {
	const split = text.split(/(:\w+:)/g);

	return split.map((part, i) => {
		if(iconMap[part]) {
			return (
				<Image
					key={i}
					src={iconMap[part]}
					alt={part}
					width={24}
					height={24}
					className="inline"
				/>
			);
		}
		return <span key={i}>{part}</span>
	});
}