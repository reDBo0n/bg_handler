import Image from "next/image";

import Arm from "./arm";

interface ArmMaterialProps {
	icon:	string;
	equip:	string[];
}

export default function ArmMaterial({ icon, equip }: ArmMaterialProps) {
	return (
		<div className="flex gap-1 justify-center">
			<Image
				src={"/bg_handler/mh/".concat(icon)}
				alt={icon}
				width={25}
				height={25}
				className="object-contain"
			/>
			{equip.map(e => (
				<Arm key={e} id={e}/>
			))}
		</div>
	);
}