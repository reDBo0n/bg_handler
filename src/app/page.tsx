'use client';

import { useState } from "react";
import { NavBar } from "@/components/nav_bar";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreVertical } from "lucide-react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

import CampaignTab from "./campaign";
import InventoryTab from "./inventory";
import ArmoryTab from "./armory";


export default function Home() {
	const [activeTab, setActiveTab] = useState('campaign');

	const tabs = [
		{ id: 'campaign', label: 'Campaign', icon: <Image src="/mh/quest.png" alt="quest" width={20} height={20} className={cn("transition-all", activeTab === 'campaign' ? "filter-none" : "filter opacity-60")}/> },
		{ id: 'inventory', label: 'Inventory', icon: <Image src="/mh/box.png" alt="box" width={20} height={20} className={cn("transition-all", activeTab === 'inventory' ? "filter-none" : "filter opacity-60")}/> },
		{ id: 'armory', label: 'Armory', icon: <Image src="/mh/armory.png" alt="armory" width={20} height={20} className={cn("transition-all", activeTab === 'armory' ? "filter-none" : "filter opacity-60")}/> }
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

	};

	return(
		<div className="min-h-screen pb-20 px-4 pt-6 bg-background text-foreground">
			<div className="flex justify-end">
				<AlertDialog>
					<DropdownMenu>
						<DropdownMenuTrigger>
							<MoreVertical className="w-5 h-5"/>
						</DropdownMenuTrigger>
						<DropdownMenuContent>
							<DropdownMenuLabel>Savefile</DropdownMenuLabel>
							<DropdownMenuItem onClick={exportData}>Export</DropdownMenuItem>
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
								<DropdownMenuItem>Reset</DropdownMenuItem>
							</AlertDialogTrigger>
							<DropdownMenuSeparator />
							<DropdownMenuItem onClick={gitHub}>GitHub</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
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
							<AlertDialogCancel>Cancel</AlertDialogCancel>
							<AlertDialogAction onClick={resetData}>Delete Data</AlertDialogAction>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialog>
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