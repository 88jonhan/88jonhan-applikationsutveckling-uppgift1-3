import React, {
	useEffect,
	useState,
	useContext,
	createContext,
	ReactNode,
} from "react";
import { get, save } from "./actions";
import { InputData } from "./types";

interface InputDataContextType {
	data: InputData[];
	saveData: (newData: InputData[]) => void;
}

const NamesContext = createContext<InputDataContextType>(
	{} as InputDataContextType
);

export default function DataProvider({ children }: { children: ReactNode }) {
	const [data, setData] = useState<InputData[]>([]);

	useEffect(() => {
		get("data").then((data) => {
			if (data) {
				setData(JSON.parse(data));
			}
		});
	}, []);

	const saveData = (newData: InputData[]) => {
		setData(newData);
		save("names", JSON.stringify(newData));
	};

	return (
		<NamesContext.Provider value={{ data, saveData }}>
			{children}
		</NamesContext.Provider>
	);
}

export const useNames = () => useContext(NamesContext);
