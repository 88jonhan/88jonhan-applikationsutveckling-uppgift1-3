import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import SubmitsScreen from "./screens/SubmitScreen";
import { FormScreen } from "./screens/FormScreen";
import RandomImageScreen from "./RandomImageScreen";
import DataProvider from "./DataProvider";

const Tab = createBottomTabNavigator();

export default function App() {
	return (
		// <DataProvider>
		<NavigationContainer>
			<Tab.Navigator>
				<Tab.Screen name="Formulär" component={FormScreen} />
				<Tab.Screen name="Submits" component={SubmitsScreen} />
				<Tab.Screen name="Random image" component={RandomImageScreen} />
			</Tab.Navigator>
		</NavigationContainer>
		// </DataProvider>
	);
}
