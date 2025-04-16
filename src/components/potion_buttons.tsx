'use client';

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "./ui/button";

const potions = [
	{ id: "0", alt:	"Potion 1" },
	{ id: "1", alt:	"Potion 2" },
	{ id: "2", alt:	"Potion 3" },
];

const src = "/mh/potion.png";
const storageKey = "mhw.potions";

export default function PotionButtons() {
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
			{potions.map((potion, idx) => {
				const isActive = active[idx];
				return (
					<Button
						key={idx}
						onClick={() => toggle(idx)}
						variant="ghost"
						className="rounded-lg p-2"
					>
						<Image
							src={src}
							alt={potion.alt}
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