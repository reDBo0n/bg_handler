'use client';

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "./ui/button";

interface ResourceButtonsProps {
	icon:	string;
	storage:string;
}

export default function ResourceButtons({ icon, storage }: ResourceButtonsProps) {
	const storageKey = "mhw.".concat(storage);
	const resources = [
		{ id: "0", alt:	icon.concat(" 1") },
		{ id: "1", alt:	icon.concat(" 2") },
		{ id: "2", alt:	icon.concat(" 3") },
	];

	const [active, setActive] = useState<boolean[]>([false, false, false]);


	useEffect(() => {
		const savedState = localStorage.getItem(storageKey)
		if(savedState){
			setActive(JSON.parse(savedState))
		}
	}, []);

	const toggle = (idx: number) => {
		setActive((prevState) => {
			let newState = prevState;
			if(!newState[idx]) {
				newState = newState.map((state, i) => (i <= idx ? true : state));
			}else{
				if(idx !== 2 && !newState[idx+1]){
					newState = newState.map((state, i) => (i < idx ? state : false));
				}else{
					newState = newState.map((state, i) => (i <= idx ? state : false));
				}	
			}

			localStorage.setItem(storageKey, JSON.stringify(newState))

			return newState;
		});
	};

	return (
		<div className="flex gap-4 justify-center">
			{resources.map((resource, idx) => {
				const isActive = active[idx];
				return (
					<Button
						key={idx}
						onClick={() => toggle(idx)}
						variant="ghost"
						className="rounded-lg p-2 cursor-pointer"
					>
						<Image
							src={"/bg_handler/mh/".concat(icon)}
							alt={resource.alt}
							width={36}
							height={36}
							className={isActive ? '' : 'grayscale opacity-50'}
						/>
					</Button>
				);
			})}
		</div>
	);
}