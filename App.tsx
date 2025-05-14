import "react-native-gesture-handler"
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import { SafeAreaProvider } from "react-native-safe-area-context"
import { StatusBar } from "expo-status-bar"
import HomeScreen from "./src/screens/HomeScreen"
import AddHabitScreen from "./src/screens/AddHabitScreen"
import HabitDetailsScreen from "./src/screens/HabitDetailsScreen"
import SettingsScreen from "./src/screens/SettingsScreen"
import { HabitProvider } from "./src/context/HabitContext"

// הגדרת טיפוסי המסכים בניווט
export type RootStackParamList = {
  Home: undefined
  AddHabit: undefined
  HabitDetails: { habitId: string }
  Settings: undefined
}

const Stack = createStackNavigator<RootStackParamList>()

export default function App() {
  return (
    <SafeAreaProvider>
      <HabitProvider>
        <NavigationContainer>
          <StatusBar style="auto" />
          <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{
              headerStyle: {
                backgroundColor: "#4c6ef5",
              },
              headerTintColor: "#fff",
              headerTitleStyle: {
                fontWeight: "bold",
              },
            }}
          >
            <Stack.Screen name="Home" component={HomeScreen} options={{ title: "מעקב הרגלים" }} />
            <Stack.Screen name="AddHabit" component={AddHabitScreen} options={{ title: "הוספת הרגל חדש" }} />
            <Stack.Screen name="HabitDetails" component={HabitDetailsScreen} options={{ title: "פרטי הרגל" }} />
            <Stack.Screen name="Settings" component={SettingsScreen} options={{ title: "הגדרות" }} />
          </Stack.Navigator>
        </NavigationContainer>
      </HabitProvider>
    </SafeAreaProvider>
  )
}