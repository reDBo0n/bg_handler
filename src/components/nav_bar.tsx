'use client';

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface TabItem {
	id:		string;
	label:	string;
	icon:	ReactNode;
}

interface NavBarProps {
	tabs:		TabItem[];
	activeTab:	string;
	onTabChange:(tabId: string) => void;
	className?:	string;
}

export function NavBar({ tabs, activeTab, onTabChange, className }: NavBarProps) {
	return (
		<nav className={cn("fixed bottom-0 left-0 right-0 bg-background border-t border-border z-50", className)}>
			<div className="flex justify-around items-center py-2">
				{tabs.map((tab) => {
					const isActive = tab.id === activeTab;
					return (
						<Button
							key={tab.id}
							variant="ghost"
							className={cn(
								"flex flex-col items-center gap-1 text-muted-foreground hover:text-primary transition px-4",
								isActive && "text-primary font-medium"
							)}
							onClick={() => onTabChange(tab.id)}
						>
							{tab.icon}
							<span className="text-xs">{tab.label}</span>
						</Button>
					);
				})}
			</div>
		</nav>
	);
}