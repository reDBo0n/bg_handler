'use client';

import { useState, useEffect } from "react";
import { NavBar } from "@/components/nav_bar";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreVertical } from "lucide-react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";

import { expansionHandler } from "@/lib/handlers";

import CampaignTab from "./campaign";
import InventoryTab from "./inventory";
import ArmoryTab from "./armory";

import expansions from "@/data/expansions.json";
import equip_cats from "@/data/equip_cats.json";

export type Expansion = {
	[id: string]:{
		name:	string;
		ids:	string[];
	}
};
import { EquipCat } from "@/components/equipment_listing";

export default function Home() {
	const exp: Expansion = expansions;
	const equip: EquipCat = equip_cats;

	const [activeTab, setActiveTab] = useState('campaign');
	const [, forceUpdate] = useState(0);

	useEffect(() => {
		expansionHandler.setUpdateCallback(() => forceUpdate((v) => v+1));
	})

	const tabs = [
		{ id: 'campaign', label: 'Campaign', icon: <Image src="/bg_handler/mh/quest.png" alt="quest" width={20} height={20} className={cn("transition-all", activeTab === 'campaign' ? "filter-none" : "filter opacity-60")}/> },
		{ id: 'inventory', label: 'Inventory', icon: <Image src="/bg_handler/mh/box.png" alt="box" width={20} height={20} className={cn("transition-all", activeTab === 'inventory' ? "filter-none" : "filter opacity-60")}/> },
		{ id: 'armory', label: 'Armory', icon: <Image src="/bg_handler/mh/armory.png" alt="armory" width={20} height={20} className={cn("transition-all", activeTab === 'armory' ? "filter-none" : "filter opacity-60")}/> }
	];

	const getToday = () => {
		const today = new Date();
		const year = today.getFullYear();
		const month = String(today.getMonth() + 1).padStart(2, "0");
		const day = String(today.getDate()).padStart(2, "0");

		return `${year}-${month}-${day}`;
	};

	const exportData = () => {
		const data = { ...localStorage };
		const json = JSON.stringify(data, null, 2);
		const blob = new Blob([json], { type: "application/json" });
		const url = URL.createObjectURL(blob);

		const a = document.createElement("a");
		a.href = url;
		a.download = getToday().concat(".mhw");
		a.click();

		URL.revokeObjectURL(url);
	};

	const importData = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if(file) {
			importDataImpl(file);
		}
	}

	const importDataImpl = (file: File) => {
		const reader = new FileReader();

		reader.onload = (event) => {
			try {
				const result = event.target?.result;
				if(!result || typeof result !== "string") {
					console.log("fail");
					return;
				}

				const data = JSON.parse(result);

				for(const key in data) {
					localStorage.setItem(key, data[key]);
				}

				location.reload();
			}catch(err) {
				alert("Error Importing data");
				console.error(err);
			}
		}

		reader.readAsText(file);
	};

	const resetData = () => {
		localStorage.clear();
		location.reload();
	};

	const gitHub= () => {
		open("https://github.com/reDBo0n/bg_handler", "_blank")?.focus();
	};

	return(
		<div className="min-h-screen pb-20 px-4 pt-6 bg-background text-foreground">
			<div className="flex justify-end">
				<AlertDialog><Dialog>
					<DropdownMenu>
						<DropdownMenuTrigger className="cursor-pointer">
							<MoreVertical className="w-5 h-5"/>
						</DropdownMenuTrigger>
						<DropdownMenuContent>
							<DialogTrigger asChild>
								<DropdownMenuItem className="cursor-pointer">Settings</DropdownMenuItem>
							</DialogTrigger>
							<DropdownMenuSeparator />
							<DropdownMenuLabel>Savefile</DropdownMenuLabel>
							<DropdownMenuItem onClick={exportData} className="cursor-pointer">Export</DropdownMenuItem>
							<DropdownMenuItem onSelect={(e) => e.preventDefault()}>
								<label htmlFor="import" className="w-full cursor-pointer">
									Import
									<input
										id="import"
										type="file"
										accept=".mhw"
										onChange={importData}
										className="hidden"
									/>
								</label>
							</DropdownMenuItem>
							<DropdownMenuSeparator />
							<AlertDialogTrigger asChild>
								<DropdownMenuItem className="cursor-pointer">Reset</DropdownMenuItem>
							</AlertDialogTrigger>
							<DropdownMenuSeparator />
							<DropdownMenuItem onClick={gitHub} className="cursor-pointer">GitHub</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
					{/* Resest Dialog */}
					<AlertDialogContent>
						<AlertDialogHeader>
							<AlertDialogTitle>
								Are you absolutely sure?
							</AlertDialogTitle>
							<AlertDialogDescription>
								Deleted Data can not be recovered.
							</AlertDialogDescription>
						</AlertDialogHeader>
						<AlertDialogFooter>
							<AlertDialogCancel className="cursor-pointer">Cancel</AlertDialogCancel>
							<AlertDialogAction onClick={resetData} className="cursor-pointer">Delete Data</AlertDialogAction>
						</AlertDialogFooter>
					</AlertDialogContent>
					{/* Settings Dialog */}
					<DialogContent className="max-h-[90vh] overflow-y-auto scroll-smooth overscroll-contain">
						<DialogHeader>
							<DialogTitle>
								Settings
							</DialogTitle>
						</DialogHeader>
						<div className="grid grid-cols-1">
							<div className="flex items-center space-x-2">
								<Checkbox id="solo-box" checked={expansionHandler.get("_solo")} onCheckedChange={(val) => expansionHandler.set("_solo", val === true)} className="cursor-pointer"/>
								<label htmlFor="solo-box" className="cursor-pointer">Manage multiple hunters</label>
							</div>
							<div className="flex items-center space-x-2">
								<Checkbox id="stamina-box" disabled/>
								<label htmlFor="stamina-box"><s>Use new stamina rules</s></label>
							</div>
							<div className="flex items-center space-x-2">
								<Checkbox id="time-box" disabled/>
								<label htmlFor="time-box"><s>Automatically manage time</s></label>
							</div>
							<Separator />
							<h2>Weapons:</h2>
							{Object.entries(equip)
								.filter(([id]) => id !== "armor")
								.map(([id, entry]) => (
								<div key={id} className="flex items-center space-x-2">
									<Checkbox id={id} checked={expansionHandler.get(id)} onCheckedChange={(val) => expansionHandler.set(id, val === true)} className="cursor-pointer"/>
									<label htmlFor={id} className="cursor-pointer">{entry.name}</label>
								</div>
							))}
							<Separator />
							<h2>Expansions:</h2>
							{Object.entries(exp).map(([id, entry]) => (
								<div key={id} className="flex items-center space-x-2">
									<Checkbox id={id} checked={expansionHandler.get(id)} onCheckedChange={(val) => expansionHandler.set(id, val === true)} className="cursor-pointer"/>
									<label htmlFor={id} className="cursor-pointer">{entry.name}</label>
								</div>
							))}
						</div>
					</DialogContent>
				</Dialog></AlertDialog>
			</div>
			<div className="max-w-2x1 mx-auto">
				{activeTab === 'campaign' && <div><CampaignTab /></div>}
				{activeTab === 'inventory' && <div><InventoryTab /></div>}
				{activeTab === 'armory' && <div><ArmoryTab /></div>}
			</div>

			<NavBar tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
		</div>
	);
}