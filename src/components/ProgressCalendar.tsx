import type React from "react"
import { useState, useEffect } from "react"
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import type { Habit } from "../utils/types"

interface ProgressCalendarProps {
  habit: Habit
  onSelectDate: (date: string) => void
}

const ProgressCalendar: React.FC<ProgressCalendarProps> = ({ habit, onSelectDate }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [calendarDays, setCalendarDays] = useState<Date[]>([])

  // יצירת מערך של ימי החודש הנוכחי
  useEffect(() => {
    const days: Date[] = []
    const year = currentMonth.getFullYear()
    const month = currentMonth.getMonth()

    // מספר הימים בחודש
    const daysInMonth = new Date(year, month + 1, 0).getDate()

    // יצירת מערך של כל הימים בחודש
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i))
    }

    setCalendarDays(days)
  }, [currentMonth])

  // מעבר לחודש הקודם
  const goToPreviousMonth = () => {
    const previousMonth = new Date(currentMonth)
    previousMonth.setMonth(previousMonth.getMonth() - 1)
    setCurrentMonth(previousMonth)
  }

  // מעבר לחודש הבא
  const goToNextMonth = () => {
    const nextMonth = new Date(currentMonth)
    nextMonth.setMonth(nextMonth.getMonth() + 1)
    setCurrentMonth(nextMonth)
  }

  // בדיקה אם ההרגל הושלם בתאריך מסוים
  const isCompletedOnDate = (date: Date): boolean => {
    const dateString = date.toISOString().split("T")[0]
    return habit.completions.some((completion) => completion.date.startsWith(dateString) && completion.completed)
  }

  // שמות החודשים בעברית
  const hebrewMonths = [
    "ינואר",
    "פברואר",
    "מרץ",
    "אפריל",
    "מאי",
    "יוני",
    "יולי",
    "אוגוסט",
    "ספטמבר",
    "אוקטובר",
    "נובמבר",
    "דצמבר",
  ]

  // שמות הימים בעברית
  const hebrewDays = ["א'", "ב'", "ג'", "ד'", "ה'", "ו'", "ש'"]

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={goToPreviousMonth}>
          <Ionicons name="chevron-back" size={24} color="#4c6ef5" />
        </TouchableOpacity>

        <Text style={styles.monthTitle}>
          {hebrewMonths[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </Text>

        <TouchableOpacity onPress={goToNextMonth}>
          <Ionicons name="chevron-forward" size={24} color="#4c6ef5" />
        </TouchableOpacity>
      </View>

      <View style={styles.daysOfWeek}>
        {hebrewDays.map((day, index) => (
          <Text key={index} style={styles.dayOfWeekText}>
            {day}
          </Text>
        ))}
      </View>

      <ScrollView>
        <View style={styles.calendarGrid}>
          {/* ריווח לימים שלפני תחילת החודש */}
          {Array.from({ length: new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay() }).map(
            (_, index) => (
              <View key={`empty-${index}`} style={styles.emptyDay} />
            ),
          )}

          {/* ימי החודש */}
          {calendarDays.map((day) => {
            const isCompleted = isCompletedOnDate(day)
            const dateString = day.toISOString().split("T")[0]
            const isToday = new Date().toISOString().split("T")[0] === dateString

            return (
              <TouchableOpacity
                key={day.getDate()}
                style={[styles.calendarDay, isCompleted && styles.completedDay, isToday && styles.today]}
                onPress={() => onSelectDate(dateString)}
              >
                <Text style={[styles.dayText, isCompleted && styles.completedDayText, isToday && styles.todayText]}>
                  {day.getDate()}
                </Text>
                {isCompleted && <View style={[styles.completionDot, { backgroundColor: habit.color }]} />}
              </TouchableOpacity>
            )
          })}
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 2,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  monthTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  daysOfWeek: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 8,
  },
  dayOfWeekText: {
    fontSize: 14,
    color: "#666",
    width: 32,
    textAlign: "center",
  },
  calendarGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
  },
  calendarDay: {
    width: "14.28%",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  emptyDay: {
    width: "14.28%",
    height: 40,
  },
  dayText: {
    fontSize: 14,
    color: "#333",
  },
  completedDay: {
    position: "relative",
  },
  completedDayText: {
    color: "#333",
  },
  completionDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    position: "absolute",
    bottom: 4,
  },
  today: {
    backgroundColor: "#e8f0fe",
    borderRadius: 20,
  },
  todayText: {
    fontWeight: "bold",
    color: "#4c6ef5",
  },
})

export default ProgressCalendar