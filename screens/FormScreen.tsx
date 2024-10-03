import { useState } from "react";
import { View, Text, TextInput, StyleSheet, Pressable } from "react-native";
import { Controller, useForm } from "react-hook-form";
import { useData } from "../DataProvider";
import Slider from "@react-native-community/slider";
import { Checkbox } from "expo-checkbox";

export function FormScreen() {
	const { data, saveData } = useData();
	const [inputAge, setInputAge] = useState<number>(50);
	const [maleIsChecked, setMaleIsChecked] = useState(false);
	const [femaleIsChecked, setFemaleIsChecked] = useState(false);
	const [otherIsChecked, setOtherIsChecked] = useState(false);

	const {
		control,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm({
		defaultValues: {
			firstName: "",
			lastName: "",
			age: inputAge,
			gender: "",
		},
	});

	const onSubmit = handleSubmit((inputData) => {
		const newData = [...data, inputData];
		saveData(newData);
		reset();
	});

	return (
		<View style={styles.container}>
			<View style={styles.inputContainer}>
				<Text style={styles.inputLabel}>Förnamn:</Text>
				<Controller
					control={control}
					rules={{
						required: true,
					}}
					render={({ field: { onChange, onBlur, value } }) => (
						<TextInput
							style={styles.inputField}
							onBlur={onBlur}
							onChangeText={onChange}
							value={value}
						/>
					)}
					name="firstName"
				/>
				{errors.firstName && <Text>Du måste fylla i förnamn.</Text>}
			</View>
			<View style={styles.inputContainer}>
				<Text style={styles.inputLabel}>Efternamn:</Text>
				<Controller
					control={control}
					rules={{
						required: true,
					}}
					render={({ field: { onChange, onBlur, value } }) => (
						<TextInput
							style={styles.inputField}
							onBlur={onBlur}
							onChangeText={onChange}
							value={value}
						/>
					)}
					name="lastName"
				/>
				{errors.lastName && <Text>Du måste fylla i efternamn.</Text>}
			</View>
			<View style={styles.inputContainer}>
				<Text style={styles.inputLabel}>Ålder:</Text>
				<View style={styles.ageContainer}>
					<Controller
						control={control}
						rules={{
							required: false,
						}}
						render={({ field: { onChange, onBlur } }) => (
							<Slider
								style={styles.ageSlider}
								step={1}
								minimumValue={1}
								maximumValue={120}
								minimumTrackTintColor="#FFFFFF"
								maximumTrackTintColor="#000000"
								value={inputAge}
								onValueChange={(value) => {
									onChange(value);
									setInputAge(value);
								}}
							/>
						)}
						name="age"
					/>
					<View style={styles.ageOutputContainer}>
						<Text style={styles.ageOutput}>{inputAge}</Text>
					</View>
				</View>
			</View>

			<View style={styles.inputContainer}>
				<Text style={[styles.inputLabel, { marginBottom: 10 }]}>Kön:</Text>
				<Controller
					control={control}
					rules={{
						required: false,
					}}
					render={({ field: { onChange, onBlur } }) => (
						<View>
							<View style={styles.checkboxContainer}>
								<Text
									style={
										maleIsChecked
											? [styles.checkboxLabel, styles.checkboxLabelChecked]
											: [styles.checkboxLabel]
									}
								>
									Man
								</Text>
								<Checkbox
									// style={styles.checkbox}
									value={maleIsChecked}
									onValueChange={(value) => {
										onChange(value ? "male" : "");
										setMaleIsChecked(value);
										setFemaleIsChecked(false);
										setOtherIsChecked(false);
									}}
									color={maleIsChecked ? "#4630EB" : undefined}
								/>
							</View>
							<View style={styles.checkboxContainer}>
								<Text
									style={
										femaleIsChecked
											? [styles.checkboxLabel, styles.checkboxLabelChecked]
											: [styles.checkboxLabel]
									}
								>
									Kvinna
								</Text>
								<Checkbox
									// style={styles.checkbox}
									value={femaleIsChecked}
									onValueChange={(value) => {
										onChange(value ? "female" : "");
										setMaleIsChecked(false);
										setFemaleIsChecked(value);
										setOtherIsChecked(false);
									}}
									color={femaleIsChecked ? "#4630EB" : undefined}
								/>
							</View>
							<View style={styles.checkboxContainer}>
								<Text
									style={
										otherIsChecked
											? [styles.checkboxLabel, styles.checkboxLabelChecked]
											: [styles.checkboxLabel]
									}
								>
									Annat
								</Text>
								<Checkbox
									// style={styles.checkbox}
									value={otherIsChecked}
									onValueChange={(value) => {
										onChange(value ? "other" : "");
										setMaleIsChecked(false);
										setFemaleIsChecked(false);
										setOtherIsChecked(value);
									}}
									color={otherIsChecked ? "#4630EB" : undefined}
								/>
							</View>
						</View>
					)}
					name="gender"
				/>
			</View>

			<Pressable style={styles.button} onPress={onSubmit}>
				<Text style={styles.buttonText}>Spara</Text>
			</Pressable>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		alignItems: "center",
		width: "100%",
		height: "100%",
	},
	inputContainer: {
		width: "80%",
		margin: 5,
	},
	inputLabel: {
		fontSize: 20,
		fontWeight: "bold",
	},
	inputField: {
		height: 40,
		fontSize: 20,
		borderWidth: 1,
		borderColor: "grey",
	},
	ageContainer: {
		width: "100%",
		margin: 5,
		flexDirection: "row",
	},
	ageSlider: {
		flex: 1,
		height: 40,
	},
	ageOutputContainer: {
		alignItems: "center",
		justifyContent: "center",
	},
	ageOutput: {
		fontSize: 20,
		width: 40,
		fontWeight: "bold",
		textAlign: "center",
	},
	checkboxWrapper: {
		width: "80%",
		margin: 5,
	},
	checkboxContainer: {
		flexDirection: "row",
		alignItems: "center",
	},
	checkboxLabel: {
		fontSize: 20,
		width: 100,
	},
	checkboxLabelChecked: {
		fontWeight: "bold",
	},
	button: {
		position: "absolute",
		bottom: 0,
		height: 50,
		backgroundColor: "#2196f3",
		width: "100%",
		justifyContent: "center",
		alignItems: "center",
	},
	buttonText: {
		color: "white",
		fontSize: 20,
	},
});
