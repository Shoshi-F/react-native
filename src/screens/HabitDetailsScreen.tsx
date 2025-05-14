import type React from "react"
import { useState, useEffect } from "react"
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Modal,
  TextInput,
  SafeAreaView,
} from "react-native"
import Ionicons from "@expo/vector-icons/Ionicons"
import { useRoute, useNavigation } from "@react-navigation/native"
import type { RouteProp } from "@react-navigation/native"
import type { RootStackParamList } from "../../App"
import { useHabits } from "../context/HabitContext"
import ProgressCalendar from "../components/ProgressCalendar"
import { getCategoryIcon, formatDateHebrew } from "../utils/helpers"

type HabitDetailsRouteProp = RouteProp<RootStackParamList, "HabitDetails">

const HabitDetailsScreen: React.FC = () => {
  const route = useRoute<HabitDetailsRouteProp>()
  const navigation = useNavigation()
  const { habitId } = route.params
  const { getHabitById, deleteHabit, completeHabit, getStreakForHabit } = useHabits()

  const [habit, setHabit] = useState(getHabitById(habitId))
  const [selectedDate, setSelectedDate] = useState("")
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [notes, setNotes] = useState("")

  // עדכון ההרגל כאשר משתנה
  useEffect(() => {
    setHabit(getHabitById(habitId))
  }, [habitId, getHabitById])

  // אם ההרגל לא נמצא, חזור למסך הבית
  if (!habit) {
    navigation.goBack()
    return null
  }

  // חישוב רצף ימים
  const streak = getStreakForHabit(habitId)

  // פונקציה למחיקת הרגל
  const handleDeleteHabit = () => {
    Alert.alert("מחיקת הרגל", "האם אתה בטוח שברצונך למחוק הרגל זה? פעולה זו אינה ניתנת לביטול.", [
      { text: "ביטול", style: "cancel" },
      {
        text: "מחק",
        onPress: () => {
          deleteHabit(habitId)
          navigation.goBack()
        },
        style: "destructive",
      },
    ])
  }

  // פונקציה לבחירת תאריך בלוח השנה
  const handleSelectDate = (date: string) => {
    setSelectedDate(date)
    setNotes("")
    setIsModalVisible(true)
  }

  // פונקציה לסימון השלמת הרגל
  const handleCompleteHabit = () => {
    completeHabit(habitId, selectedDate, notes)
    setIsModalVisible(false)

    // עדכון ההרגל המקומי
    setHabit(getHabitById(habitId))
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <View style={[styles.header, { backgroundColor: habit.color }]}>
          <View style={styles.headerContent}>
            <Text style={styles.habitName}>{habit.name}</Text>
            <View style={styles.categoryContainer}>
              <Ionicons ornament={getCategoryIcon(habit.category)} size={20} color="white" />
              <Text style={styles.category}>{habit.category}</Text>
            </View>
          </View>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Ionicons name="calendar-outline" size={24} color="#4c6ef5" />
            <Text style={styles.statValue}>{habit.frequency}</Text>
            <Text style={styles.statLabel}>תדירות</Text>
          </View>

          <View style={styles.statItem}>
            <Ionicons name="flame" size={24} color="#ff9800" />
            <Text style={styles.statValue}>{streak}</Text>
            <Text style={styles.statLabel}>רצף ימים</Text>
          </View>

          <View style={styles.statItem}>
            <Ionicons name="time-outline" size={24} color="#4c6ef5" />
            <Text style={styles.statValue}>{habit.reminderTime || "אין"}</Text>
            <Text style={styles.statLabel}>תזכורת</Text>
          </View>
        </View>

        {habit.description ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>תיאור</Text>
            <Text style={styles.description}>{habit.description}</Text>
          </View>
        ) : null}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>מעקב התקדמות</Text>
          <ProgressCalendar habit={habit} onSelectDate={handleSelectDate} />
        </View>

        <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteHabit}>
          <Ionicons name="trash-outline" size={20} color="white" />
          <Text style={styles.deleteButtonText}>מחק הרגל</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* מודל להוספת השלמה */}
      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{formatDateHebrew(selectedDate)}</Text>

            <Text style={styles.modalSubtitle}>האם השלמת את ההרגל "{habit.name}"?</Text>

            <TextInput
              style={styles.notesInput}
              value={notes}
              onChangeText={setNotes}
              placeholder="הוסף הערות (אופציונלי)"
              multiline
              placeholderTextColor="#999"
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setIsModalVisible(false)}
              >
                <Text style={styles.cancelButtonText}>ביטול</Text>
              </TouchableOpacity>

              <TouchableOpacity style={[styles.modalButton, styles.completeButton]} onPress={handleCompleteHabit}>
                <Text style={styles.completeButtonText}>סמן כהושלם</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
    padding: 20,
    paddingTop: 40,
    paddingBottom: 40,
  },
  headerContent: {
    alignItems: "center",
  },
  habitName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
  categoryContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
  },
  category: {
    color: "white",
    marginLeft: 4,
    fontWeight: "500",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 16,
    backgroundColor: "white",
    borderRadius: 8,
    margin: 16,
    marginTop: -20,
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
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginTop: 4,
  },
  statLabel: {
    fontSize: 12,
    color: "#666",
    marginTop: 2,
  },
  section: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 16,
    margin: 16,
    marginTop: 0,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#333",
  },
  description: {
    fontSize: 16,
    color: "#666",
    lineHeight: 24,
  },
  deleteButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f03e3e",
    borderRadius: 8,
    padding: 16,
    margin: 16,
    marginTop: 0,
    marginBottom: 40,
  },
  deleteButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 8,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 16,
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 16,
    width: "100%",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center",
    color: "#333",
  },
  modalSubtitle: {
    fontSize: 16,
    marginBottom: 16,
    textAlign: "center",
    color: "#666",
  },
  notesInput: {
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#ddd",
    marginBottom: 16,
    minHeight: 100,
    textAlignVertical: "top",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  modalButton: {
    flex: 1,
    borderRadius: 8,
    padding: 12,
    alignItems: "center",
    marginHorizontal: 4,
  },
  cancelButton: {
    backgroundColor: "#f1f3f5",
  },
  cancelButtonText: {
    color: "#666",
    fontWeight: "bold",
  },
  completeButton: {
    backgroundColor: "#4c6ef5",
  },
  completeButtonText: {
    color: "white",
    fontWeight: "bold",
  },
})

export default HabitDetailsScreen