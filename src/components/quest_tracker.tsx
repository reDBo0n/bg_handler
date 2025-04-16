'use client';

import { useState, useEffect } from "react";
import Image from "next/image";
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogHeader, DialogDescription } from "./ui/dialog";
import { Button } from "./ui/button";

import { questHandler, QuestType } from "@/lib/handlers";

const COLORS = {
	A:	"bg-yellow-50",
	I:	"bg-blue-300",
	T:	"bg-purple-300"
};

interface QuestTrackerProps {
	id:			string;
	name:		string;
	image:		string;
	max_diff:	number;
}

export default function QuestTracker({ id, name, image, max_diff }: QuestTrackerProps) {
	const [questState, setQuestState] = useState<QuestType[]>([]);

	useEffect(() => {
		const state = questHandler.get(id);
		setQuestState(state || { dots: Array(5).fill(QuestType.none) });
	}, ["tracker_".concat(id)])

	const handleChoice = (type: QuestType) => {
		const idx = questState.findIndex(x => x === QuestType.none);
		if(!isFull()) {
			const newState = questState.map((state, i) => (i === idx ? type : state));
			questHandler.set(id, idx, type)
			setQuestState(newState);
		}
	};

	const deleteLast = () => {
		let idx = questState.findIndex(x => x === QuestType.none);
		if(idx === -1) {
			idx = 4;
		}else{
			idx -= 1;
		}

		const newState = questState.map((state, i) => (i === idx ? QuestType.none : state));
		questHandler.set(id, idx, QuestType.none);
		setQuestState(newState);
	}

	const firstTime = () => {
		const idx = questState.findIndex(x => x === QuestType.none);
		return idx === 0;
	};

	const isFull = () => {
		const idx = questState.findIndex(x => x === QuestType.none);
		return idx === -1;
	};

	return (
		<Dialog>
			<DialogTrigger asChild>
				<div className="flex items-center gap-2 p-2 border rounded-lg hover:bg-muted cursor-pointer max-w-[170px]">
					<Image
						src={"/mh/".concat(image)}
						alt={name}
						width={25}
						height={25}
						className="shrink-0"
					/>
					<div className="flex gap-2">
						{[...Array(5)].map((_, i) => (
							<div
								key={i}
								className={`w-3 h-3 rounded-full
									${questState[i] ? COLORS[questState[i] as keyof typeof COLORS] : "bg-gray-400"
								}`}
							/>
						))}
					</div>
				</div>
			</DialogTrigger>

			<DialogContent>
				<DialogHeader>
					<DialogTitle className="flex justify-center">{name}</DialogTitle>
					<DialogDescription className="flex justify-center">
						<Image
							src={"/mh/".concat(image)}
							alt={name}
							width={200}
							height={200}
						/>
					</DialogDescription>
				</DialogHeader>
				<div className="grid gap-4 justify-center">
					{firstTime() && (
						<Button onClick={() => handleChoice(QuestType.assigned)}>
							<Image
								src="/mh/1star.png"
								alt="1star"
								width={30}
								height={30}
							/>
							Assigned
						</Button>
					)}
					{!firstTime() && !isFull() && (
						<div className="flex gap-4">
							<Button onClick={() => handleChoice(QuestType.investigation)}>
								<Image
									src="/mh/2star.png"
									alt="2star"
									width={30}
									height={30}
								/>
								Investigation
							</Button>
							<Button onClick={() => handleChoice(QuestType.tempered)}>
								<Image
									src={"/mh/".concat(max_diff.toString(), "star.png")}
									alt={max_diff.toString().concat("star")}
									width={30}
									height={30}
								/>
								Tempered Investigation
							</Button>
						</div>
					)}
					{!firstTime() && (
						<Button onClick={() => deleteLast()}>
							Remove
						</Button>
					)}
				</div>
			</DialogContent>
		</Dialog>
	);
}