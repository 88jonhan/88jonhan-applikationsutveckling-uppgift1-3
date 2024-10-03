import { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
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
		console.log(data);
		const newData = [...data, inputData];
		saveData(newData);
		reset();
	});

	return (
		<View
			style={{
				flex: 1,
				justifyContent: "center",
				alignItems: "center",
				padding: 15,
			}}
		>
			<View
				style={{
					flexDirection: "row",
					alignItems: "center",
					justifyContent: "space-between",
					width: "100%",
					// gap: 10,
				}}
			>
				<Text style={{ fontSize: 30 }}>Förnamn:</Text>
				<Controller
					control={control}
					rules={{
						required: true,
					}}
					render={({ field: { onChange, onBlur, value } }) => (
						<TextInput
							style={styles.textInput}
							onBlur={onBlur}
							onChangeText={onChange}
							value={value}
						/>
					)}
					name="firstName"
				/>
				{errors.firstName && <Text>This is required.</Text>}
			</View>
			<View
				style={{
					flexDirection: "row",
					alignItems: "center",
					justifyContent: "space-between",
					width: "100%",
					// gap: 10,
				}}
			>
				<Text style={{ fontSize: 30 }}>Efternamn:</Text>
				<Controller
					control={control}
					rules={{
						required: true,
					}}
					render={({ field: { onChange, onBlur, value } }) => (
						<TextInput
							style={styles.textInput}
							onBlur={onBlur}
							onChangeText={onChange}
							value={value}
						/>
					)}
					name="lastName"
				/>
				{errors.lastName && <Text>This is required.</Text>}
			</View>
			<View
				style={{
					flexDirection: "row",
					alignItems: "center",
					justifyContent: "space-between",
					width: "100%",
					// gap: 10,
				}}
			>
				<Text style={{ fontSize: 30 }}>Ålder:</Text>
				<Controller
					control={control}
					rules={{
						required: false,
					}}
					render={({ field: { onChange, onBlur } }) => (
						<Slider
							style={styles.ageInput}
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
				<View>
					<Text>{inputAge}</Text>
				</View>
			</View>

			<View
				style={{
					flexDirection: "row",
					alignItems: "center",
					justifyContent: "space-between",
					width: "100%",
					// gap: 10,
				}}
			>
				<Text style={{ fontSize: 30 }}>Kön:</Text>
				<Controller
					control={control}
					rules={{
						required: false,
					}}
					render={({ field: { onChange, onBlur } }) => (
						<View>
							<Checkbox
								style={styles.checkbox}
								value={maleIsChecked}
								onValueChange={(value) => {
									onChange(value ? "male" : "");
									setMaleIsChecked(value);
									setFemaleIsChecked(false);
									setOtherIsChecked(false);
								}}
								color={maleIsChecked ? "#4630EB" : undefined}
							/>
							<Checkbox
								style={styles.checkbox}
								value={femaleIsChecked}
								onValueChange={(value) => {
									onChange(value ? "female" : "");
									setMaleIsChecked(false);
									setFemaleIsChecked(value);
									setOtherIsChecked(false);
								}}
								color={femaleIsChecked ? "#4630EB" : undefined}
							/>
							<Checkbox
								style={styles.checkbox}
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
					)}
					name="gender"
				/>
				<View>
					<Text>
						{maleIsChecked
							? "male"
							: femaleIsChecked
							? "female"
							: otherIsChecked
							? "other"
							: "none"}
					</Text>
				</View>
			</View>

			<Button title="Submit" onPress={onSubmit} />
		</View>
	);
}

const styles = {
	textInput: {
		width: 200,
		height: 40,
		borderColor: "gray",
		borderWidth: 1,
	},
	ageInput: {
		width: 200,
		height: 40,
	},
	checkbox: {
		margin: 8,
	},
};
