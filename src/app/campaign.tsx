import PotionButtons from "@/components/potion_buttons";
import QuestList from "@/components/quest_list";
import DayTracḱer from "@/components/day_tracker";

export default function CampaignTab() {
	return (
		<div className="grid gap-3">
			<PotionButtons />
			<DayTracḱer />
			<QuestList />
		</div>
	);
}