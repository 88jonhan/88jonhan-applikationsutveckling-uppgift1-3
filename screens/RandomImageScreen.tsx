import { useEffect, useState } from "react";
import {
	ActivityIndicator,
	View,
	Text,
	StyleSheet,
	Pressable,
} from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";

export default function RandomImageScreen() {
	const [image, setImage] = useState<string | null>();
	const [loading, setLoading] = useState<boolean>(false);

	const getRandomImage = async () => {
		setLoading(true);
		const response = await fetch("https://api.thecatapi.com/v1/images/search");
		const data = await response.json();
		setImage(data[0].url);
		setLoading(false);
	};

	useEffect(() => {
		getRandomImage();
	}, []);

	return (
		<View style={styles.container}>
			{loading && image == null ? (
				<ActivityIndicator size="large" color="#0000ff" />
			) : (
				<Image source={{ uri: image! }} style={{ width: 300, height: 300 }} />
			)}
			<Pressable onPress={getRandomImage} style={styles.button}>
				<LinearGradient
					// Button Linear Gradient
					colors={["#4c669f", "#3b5998", "#192f6a"]}
					style={styles.button}
				>
					<Text style={styles.buttonText}>Hämta ny bild</Text>
				</LinearGradient>
			</Pressable>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		width: "100%",
		height: "100%",
	},
	title: {
		fontSize: 20,
		fontWeight: "bold",
	},
	button: {
		position: "absolute",
		bottom: 0,
		height: 50,
		width: "100%",
		justifyContent: "center",
		alignItems: "center",
	},
	buttonText: {
		color: "white",
		fontSize: 20,
	},
});
