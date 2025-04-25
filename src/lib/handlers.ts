export enum QuestType {
	none = "",
	assigned = "A",
	investigation = "I",
	tempered = "T"
}

type LocalQuest = {
	[id: string]:	QuestType[];
}

class QuestHandler {
	private storageKey: string = "mhw.quests";
	private quests: LocalQuest = {};
	
	constructor() {
		if(typeof window !== "undefined") {
			const savedState = localStorage.getItem(this.storageKey);
			this.quests = savedState ? JSON.parse(savedState) : {};
		}
	}

	get(monster: string): QuestType[] {
		if (!(monster in this.quests)) {
			this.quests[monster] = Array(5).fill(QuestType.none);
		}

		return this.quests[monster];
	}

	set(monster: string, idx: number, type: QuestType) {
		this.quests[monster][idx] = type;

		localStorage.setItem(this.storageKey, JSON.stringify(this.quests));
	}
}

type LocalInv = {
	[id: string]:	number;
}

class InventoryHandler {
	private storageKey: string = "mhw.inv";
	private inv: LocalInv = {};
	private updateCallback: (() => void) | null = null;

	constructor() {
		if(typeof window !== "undefined") {
			const savedState = localStorage.getItem(this.storageKey);
			this.inv = savedState ? JSON.parse(savedState) : {};
		}
	}

	setUpdateCallback(cb: () => void) {
		this.updateCallback = cb;
	}

	private notifyUpdate() {
		this.updateCallback?.();
	}

	get(item: string): number {
		if(!(item in this.inv)) {
			this.inv[item] = 0;
		}

		return this.inv[item];
	}

	set(item: string, amnt: number) {
		if(amnt < 0) {
			return;
		}
		this.inv[item] = amnt;

		localStorage.setItem(this.storageKey, JSON.stringify(this.inv));

		this.notifyUpdate();
	}
}

type LocalArm = {
	[id: string]:	boolean;
}

type LocalSoloArm = {
	[id: string]:	number;
}

class ArmoryHandler {
	private storageKey: string = "mhw.arm";
	private arm: LocalArm = {};
	private soloArm: LocalSoloArm = {};
	private updateCallback: (() => void) | null = null;

	constructor() {
		if(typeof window !== "undefined") {
			const savedState = localStorage.getItem(this.storageKey);
			this.arm = savedState ? JSON.parse(savedState) : {};

			const savedSoloState = localStorage.getItem(this.storageKey.concat("_solo"));
			this.soloArm = savedSoloState ? JSON.parse(savedSoloState) : {};
		}
	}

	setUpdateCallback(cb: () => void) {
		this.updateCallback = cb;
	}

	private notifyUpdate() {
		this.updateCallback?.();
	}

	get(equip: string): boolean {
		if(equip === "twin_nails_t" || equip === "twin_nails_k") {
			equip = "twin_nails";
		}
		else if(equip === "fire_and_ice_t" || equip === "fire_and_ice_k") {
			equip = "fire_and_ice";
		}

		if(!(equip in this.arm)) {
			this.arm[equip] = false;
		}

		return this.arm[equip];
	}

	set(equip: string, state: boolean) {
		if(equip === "twin_nails_t" || equip === "twin_nails_k") {
			equip = "twin_nails";
		}
		else if(equip === "fire_and_ice_t" || equip === "fire_and_ice_k") {
			equip = "fire_and_ice";
		}

		this.arm[equip] = state;

		localStorage.setItem(this.storageKey, JSON.stringify(this.arm));

		this.notifyUpdate();
	}

	getSolo(equip: string) {
		if(equip === "twin_nails_t" || equip === "twin_nails_k") {
			equip = "twin_nails";
		}
		else if(equip === "fire_and_ice_t" || equip === "fire_and_ice_k") {
			equip = "fire_and_ice";
		}

		if(!(equip in this.soloArm)) {
			this.soloArm[equip] = 0;
		}

		return this.soloArm[equip];
	}

	setSolo(equip:string, amnt: number) {
		if(equip === "twin_nails_t" || equip === "twin_nails_k") {
			equip = "twin_nails";
		}
		else if(equip === "fire_and_ice_t" || equip === "fire_and_ice_k") {
			equip = "fire_and_ice";
		}

		amnt = Math.min(Math.max(amnt, 0), 4);
		this.soloArm[equip] = amnt;

		localStorage.setItem(this.storageKey.concat("_solo"), JSON.stringify(this.soloArm));

		this.notifyUpdate();
	}
}

type LocalExpansion = {
	[id: string]:	boolean;
}

class ExpansionHandler {
	private storageKey: string = "mhw.exp";
	private exp: LocalExpansion = {};
	private updateCallback: (() => void) | null = null;

	private soloMode: boolean = false;

	constructor() {
		if(typeof(window) !== "undefined") {
			const savedState = localStorage.getItem(this.storageKey);
			this.exp = savedState ? JSON.parse(savedState) : { "_solo": false, "_stamina": false };
		}
	}

	setUpdateCallback(cb: () => void) {
		this.updateCallback = cb;
	}

	private notifyCallback() {
		this.updateCallback?.();
	}

	get(expansion: string) {
		if(!(expansion in this.exp)) {
			this.exp[expansion] = true;
		}

		return this.exp[expansion];
	}

	set(expansion: string, state: boolean) {
		this.exp[expansion] = state;

		localStorage.setItem(this.storageKey, JSON.stringify(this.exp));

		this.notifyCallback();
	}
}

export const questHandler = new QuestHandler();
export const inventoryHandler = new InventoryHandler();
export const armoryHandler = new ArmoryHandler();
export const expansionHandler = new ExpansionHandler();

import { Expansion } from "@/app/page";
import expansions from "@/data/expansions.json"

const exp: Expansion = expansions;

export function isMonsterHuntable(monster: string) {
	if(["leather", "chain", "alloy", "ore", "bone", "common", "other"].includes(monster)) {
		return true;
	}

	if(monster === "rath_bone") {
		return expansionHandler.get("forest") && expansionHandler.get("bones")
	}

	for(const e in exp){
		for(const m of exp[e].ids) {
			if(m === monster) {
				return expansionHandler.get(e);
			}
		}
	}

	return false;
}