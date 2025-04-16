import QuestTracker from "./quest_tracker";

import quests from "@/data/quests.json"

type QuestData = {
	[id: string]: {
		name:		string;
		image: 		string;
		max_diff:	number;
	};
};

export default function QuestList() {
	const data: QuestData = quests;

	return (
		<div className="flex justify-center">
			<div className="grid gap-1 b grid-cols-2 sm:grid-cols-2 lg:grid-cols-3">
				{Object.entries(data).map(([id, entry]) => (
					<QuestTracker key={id} id={id} name={entry.name} image={entry.image} max_diff={entry.max_diff}/>
				))}
			</div>
		</div>
	);
}