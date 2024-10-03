import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import SubmitsScreen from "./screens/SubmitScreen";
import { FormScreen } from "./screens/FormScreen";
import RandomImageScreen from "./screens/RandomImageScreen";
import DataProvider from "./DataProvider";

import Ionicons from "@expo/vector-icons/Ionicons";
const Tab = createBottomTabNavigator();

export default function App() {
	return (
		<DataProvider>
			<NavigationContainer>
				<Tab.Navigator>
					<Tab.Screen
						name="Formulär"
						component={FormScreen}
						options={{
							tabBarLabel: "Formulär",
							tabBarIcon: ({ color, size }) => (
								<Ionicons name="add" color={color} size={size} />
							),
						}}
					/>
					<Tab.Screen
						name="Submits"
						component={SubmitsScreen}
						options={{
							tabBarLabel: "Submits",
							tabBarIcon: ({ color, size }) => (
								<Ionicons name="list" color={color} size={size} />
							),
						}}
					/>
					<Tab.Screen
						name="Random image"
						component={RandomImageScreen}
						options={{
							tabBarLabel: "Random Image",
							tabBarIcon: ({ color, size }) => (
								<Ionicons name="image" color={color} size={size} />
							),
						}}
					/>
				</Tab.Navigator>
			</NavigationContainer>
		</DataProvider>
	);
}
