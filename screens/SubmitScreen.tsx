import { View, Text } from "react-native";
import { useData } from "../DataProvider";

export default function SubmitsScreen() {
	const { data } = useData();

	return (
		<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
			{data.map((data, index) => (
				<Text key={index}>
					{data.firstName} {data.lastName}, {data.age}, {data.gender}
				</Text>
			))}
		</View>
	);
}
