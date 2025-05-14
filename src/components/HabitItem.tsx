import type React from "react"
import { View, Text, StyleSheet, TouchableOpacity } from "react-native"
// import { Ionicons } from "@expo/vector-icons"
import Ionicons from "@expo/vector-icons/Ionicons"
import type { Habit } from "../utils/types"
import { useHabits } from "../context/HabitContext"
import { getCategoryIcon, getCurrentDateISO } from "../utils/helpers"

interface HabitItemProps {
  habit: Habit
  onPress: () => void
}

const HabitItem: React.FC<HabitItemProps> = ({ habit, onPress }) => {
  const { completeHabit, uncompleteHabit, getStreakForHabit } = useHabits()

  const today = getCurrentDateISO()

  // בדיקה אם ההרגל הושלם היום
  const isCompletedToday = habit.completions.some(
    (completion) => completion.date.startsWith(today) && completion.completed,
  )

  // חישוב רצף ימים
  const streak = getStreakForHabit(habit.id)

  // טיפול בלחיצה על כפתור ההשלמה
  const handleToggleCompletion = () => {
    if (isCompletedToday) {
      uncompleteHabit(habit.id, today)
    } else {
      completeHabit(habit.id, today)
    }
  }

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <TouchableOpacity
        style={[
          styles.checkButton,
          isCompletedToday && styles.completedCheckButton,
          { backgroundColor: isCompletedToday ? habit.color : "transparent" },
        ]}
        onPress={handleToggleCompletion}
      >
        {isCompletedToday && <Ionicons name="checkmark" size={24} color="white" />}
      </TouchableOpacity>

      <View style={styles.details}>
        <Text style={styles.name}>{habit.name}</Text>
        <View style={styles.categoryContainer}>
          <Ionicons ornament={getCategoryIcon(habit.category)} size={16} color={habit.color} />
          <Text style={[styles.category, { color: habit.color }]}>{habit.category}</Text>
        </View>
      </View>

      <View style={styles.streakContainer}>
        {streak > 0 && (
          <>
            <Ionicons name="flame" size={20} color="#ff9800" />
            <Text style={styles.streakText}>{streak}</Text>
          </>
        )}
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "white",
    borderRadius: 8,
    marginBottom: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 2,
  },
  checkButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: "#4c6ef5",
    justifyContent: "center",
    alignItems: "center",
  },
  completedCheckButton: {
    borderColor: "transparent",
  },
  details: {
    flex: 1,
    marginLeft: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  categoryContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  category: {
    fontSize: 12,
    marginLeft: 4,
  },
  streakContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  streakText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#ff9800",
    marginLeft: 4,
  },
})

export default HabitItem