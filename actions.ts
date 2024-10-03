import { getItemAsync, setItemAsync } from "expo-secure-store";

export async function save(key: string, value: string) {
	await setItemAsync(key, value);
}

export async function get(key: string): Promise<string | null> {
	return await getItemAsync(key);
}
