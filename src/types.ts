export type CityRecord = {
	לשכה: string;
	סמל_ישוב: string;
	סמל_לשכת_מנא: string;
	סמל_מועצה_אזורית: string;
	שם_ישוב: string;
	שם_ישוב_לועזי: string;
	שם_מועצה: string | null;
	שם_נפה: string;
	_id: number;
};

export type StreetRecord = {
	_id: number;
	סמל_ישוב: string;
	שם_ישוב: string;
	סמל_רחוב: string;
	שם_רחוב: string;
};

export type ResultData<T> = {
	fields: Array<Object>;
	include_total: boolean;
	limit: number;
	records: T;
	record_format: string;
	resource_id: string;
	total: number;
	total_estimation_threshold: number | null;
	total_was_estimated: boolean;
	_links: Object;
};

export type GovData<U> = {
	help: string;
	result: ResultData<U>;
	success: boolean;
};

export type UserAddress = {
	city: string;
	street: string;
	homeNumber: string;
	entrance?: string;
	apratment?: string;
};
