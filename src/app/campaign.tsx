import ResourceButtons from "@/components/resource_buttons";
import QuestList from "@/components/quest_list";
import DayTracḱer from "@/components/day_tracker";
import { expansionHandler } from "@/lib/handlers";


export default function CampaignTab() {
	return (
		<div className="grid gap-3">
			<ResourceButtons storage="potions" icon="potion.png"/>
			{expansionHandler.get("_stamina") && (
				<ResourceButtons storage="rations" icon="ration.png"/>
			)}
			<DayTracḱer />
			<QuestList />
		</div>
	);
}