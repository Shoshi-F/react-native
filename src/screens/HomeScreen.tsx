import type React from "react"
import { useState } from "react"
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  SectionList,
  ImageBackground,
} from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"
import type { StackNavigationProp } from "@react-navigation/stack"
import type { RootStackParamList } from "../../App"
import { useHabits } from "../context/HabitContext"
import HabitItem from "../components/HabitItem"
import { getCurrentDateISO } from "../utils/helpers"

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, "Home">

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>()
  const { habits, getCompletedHabitsForDate } = useHabits()
  const [selectedDate] = useState(getCurrentDateISO())

  // חישוב הרגלים שהושלמו היום
  const completedHabits = getCompletedHabitsForDate(selectedDate)
  const completionRate = habits.length > 0 ? (completedHabits.length / habits.length) * 100 : 0

  // חלוקת הרגלים לפי קטגוריות
  const habitsByCategory = habits.reduce(
    (acc, habit) => {
      const category = habit.category
      if (!acc[category]) {
        acc[category] = []
      }
      acc[category].push(habit)
      return acc
    },
    {} as Record<string, typeof habits>,
  )

  // יצירת מבנה נתונים לרשימה מחולקת לפי קטגוריות
  const sections = Object.keys(habitsByCategory).map((category) => ({
    title: category,
    data: habitsByCategory[category],
  }))

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <ImageBackground
          source={{ uri: "https://placeholder.svg?height=150&width=400" }}
          style={styles.header}
          imageStyle={styles.headerImage}
        >
          <View style={styles.headerContent}>
            <Text style={styles.title}>מעקב הרגלים</Text>
            <Text style={styles.subtitle}>בנה הרגלים טובים, שנה את חייך</Text>
          </View>
        </ImageBackground>

        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{habits.length}</Text>
            <Text style={styles.statLabel}>הרגלים פעילים</Text>
          </View>

          <View style={styles.statItem}>
            <Text style={styles.statValue}>{completedHabits.length}</Text>
            <Text style={styles.statLabel}>הושלמו היום</Text>
          </View>

          <View style={styles.statItem}>
            <Text style={styles.statValue}>{completionRate.toFixed(0)}%</Text>
            <Text style={styles.statLabel}>אחוז השלמה</Text>
          </View>
        </View>

        {habits.length > 0 ? (
          <SectionList
            sections={sections}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <HabitItem habit={item} onPress={() => navigation.navigate("HabitDetails", { habitId: item.id })} />
            )}
            renderSectionHeader={({ section: { title } }) => <Text style={styles.sectionHeader}>{title}</Text>}
            stickySectionHeadersEnabled={false}
            contentContainerStyle={styles.listContent}
          />
        ) : (
          <ScrollView contentContainerStyle={styles.emptyContainer}>
            <Ionicons name="calendar-outline" size={64} color="#ccc" />
            <Text style={styles.emptyText}>אין לך הרגלים עדיין</Text>
            <Text style={styles.emptySubtext}>לחץ על כפתור ה+ כדי להוסיף הרגל חדש</Text>
          </ScrollView>
        )}

        <View style={styles.fabContainer}>
          <TouchableOpacity style={styles.settingsFab} onPress={() => navigation.navigate("Settings")}>
            <Ionicons name="settings-outline" size={24} color="white" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.fab} onPress={() => navigation.navigate("AddHabit")}>
            <Ionicons name="add" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  container: {
    flex: 1,
  },
  header: {
    height: 150,
    justifyContent: "center",
    alignItems: "center",
  },
  headerImage: {
    opacity: 0.8,
    backgroundColor: "#4c6ef5",
  },
  headerContent: {
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  subtitle: {
    fontSize: 16,
    color: "white",
    marginTop: 4,
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 16,
    backgroundColor: "white",
    borderRadius: 8,
    margin: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 2,
  },
  statItem: {
    alignItems: "center",
  },
  statValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#4c6ef5",
  },
  statLabel: {
    fontSize: 12,
    color: "#666",
    marginTop: 4,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    backgroundColor: "#f5f5f5",
    padding: 16,
    paddingBottom: 8,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 80,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#666",
    marginTop: 16,
  },
  emptySubtext: {
    fontSize: 14,
    color: "#999",
    marginTop: 8,
    textAlign: "center",
  },
  fabContainer: {
    position: "absolute",
    right: 16,
    bottom: 16,
    flexDirection: "row",
  },
  fab: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#4c6ef5",
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  settingsFab: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#748ffc",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
})

export default HomeScreen