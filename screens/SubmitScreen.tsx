import { View, Text, StyleSheet } from "react-native";
import { useData } from "../DataProvider";

export default function SubmitsScreen() {
	const { data } = useData();

	return (
		<View style={styles.container}>
			{data.map((data, index) => (
				<View key={index} style={styles.list}>
					<View style={styles.headers}>
						<Text style={styles.title}>Namn</Text>
						<Text style={styles.title}>Ålder</Text>
						<Text style={styles.title}>Kön</Text>
					</View>
					<View style={styles.items}>
						<Text style={styles.item}>
							{data.firstName} {data.lastName}
						</Text>
						<Text style={styles.item}>{data.age}</Text>
						<Text style={styles.item}>{data.gender}</Text>
					</View>
				</View>
			))}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		alignItems: "center",
		width: "100%",
		height: "100%",
	},
	list: {
		borderWidth: 1,
		borderColor: "black",
		width: "80%",
		padding: 10,
		margin: 5,
	},
	headers: {
		flexDirection: "row",
		width: "100%",
	},
	title: {
		flex: 1,
		fontSize: 20,
		fontWeight: "bold",
	},
	items: {
		flexDirection: "row",
		width: "100%",
	},
	item: {
		flex: 1,
		fontSize: 20,
	},
});
