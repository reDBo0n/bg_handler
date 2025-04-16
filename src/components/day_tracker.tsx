'use client';

import { useState, useEffect } from "react";
import { Button } from "./ui/button";

export default function DayTracḱer() {
	const[days, setDays] = useState(25);

	useEffect(() => {
		const local = localStorage.getItem("mhw.days");
		if(local) {
			setDays(Number(local));
		}
	})

	const subOne = () => {
		const newVal = days - 1;

		localStorage.setItem("mhw.days", newVal.toString());
		setDays(newVal)
	};

	const addOne = () => {
		const newVal = days + 1;

		localStorage.setItem("mhw.days", newVal.toString());
		setDays(newVal)
	};

	return (
		<div className="grid justify-center">
			Current days:
			<div className="flex justify-center">
				<Button size="sm" variant="ghost" onClick={subOne}>-</Button>
				<span className="mt-1.5">
					{days}
				</span>
				<Button size="sm" variant="ghost" onClick={addOne}>+</Button>
			</div>
		</div>
	);
}