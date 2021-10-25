import AsyncStorage from "@react-native-async-storage/async-storage";
import { size } from "lodash";
import { SEARCH_HISTORY, API_URL } from "../utils/constants";
import { sortArrayByDate } from "../utils/functions";

export async function getSearchHistory() {
	try {
		const history = await AsyncStorage.getItem(SEARCH_HISTORY);
		if (!history) return [];
		return sortArrayByDate(JSON.parse(history));
	} catch (error) {
		console.log(error);
		return [];
	}
}

export async function updateSearchHistory(search) {
	const history = await getSearchHistory();

	if (size(history) > 5) history.pop();

	history.push({
		search,
		date: new Date(),
	});
	await AsyncStorage.setItem(SEARCH_HISTORY, JSON.stringify(history));
}

export async function searchProductApi(search) {
	try {
		const url = `${API_URL}/products?_q=${search}&_limit=40`;
		const response = await fetch(url);
		const result = await response.json();
		return result;
	} catch (error) {
		console.log(error);
		return null;
	}
}
