import type { Habit } from "./types"

// פונקציה לבדיקה אם הרגל הושלם בתאריך מסוים
export const isHabitCompletedOnDate = (habit: Habit, date: string): boolean => {
  return habit.completions.some((completion) => completion.date.startsWith(date) && completion.completed)
}

// פונקציה לחישוב רצף ימים של השלמת הרגל
export const calculateStreak = (habit: Habit): number => {
  if (habit.frequency !== "יומי") {
    return 0 // רצף רלוונטי רק להרגלים יומיים
  }

  // מיון ההשלמות לפי תאריך (מהחדש לישן)
  const sortedCompletions = [...habit.completions]
    .filter((c) => c.completed)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  if (sortedCompletions.length === 0) {
    return 0
  }

  let streak = 1
  let currentDate = new Date(sortedCompletions[0].date)

  // בדיקה אם ההשלמה האחרונה היא מהיום או מאתמול
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const yesterday = new Date(today)
  yesterday.setDate(yesterday.getDate() - 1)

  const latestCompletionDate = new Date(sortedCompletions[0].date)
  latestCompletionDate.setHours(0, 0, 0, 0)

  // אם ההשלמה האחרונה אינה מהיום או מאתמול, אין רצף נוכחי
  if (latestCompletionDate.getTime() < yesterday.getTime()) {
    return 0
  }

  // חישוב הרצף
  for (let i = 1; i < sortedCompletions.length; i++) {
    const prevDate = new Date(currentDate)
    prevDate.setDate(prevDate.getDate() - 1)

    const completionDate = new Date(sortedCompletions[i].date)
    completionDate.setHours(0, 0, 0, 0)

    // אם התאריך הקודם הוא יום אחד לפני התאריך הנוכחי, הרצף נמשך
    if (completionDate.getTime() === prevDate.getTime()) {
      streak++
      currentDate = completionDate
    } else {
      break
    }
  }

  return streak
}

// פונקציה לקבלת צבע רקע לפי קטגוריה
export const getCategoryColor = (category: string): string => {
  const colors: Record<string, string> = {
    בריאות: "#4caf50", // ירוק
    כושר: "#f44336", // אדום
    למידה: "#2196f3", // כחול
    עבודה: "#ff9800", // כתום
    אישי: "#9c27b0", // סגול
    אחר: "#607d8b", // אפור-כחול
  }

  return colors[category] || "#607d8b"
}

// פונקציה לקבלת אייקון לפי קטגוריה
export const getCategoryIcon = (category: string): string => {
  const icons: Record<string, string> = {
    בריאות: "medkit-outline",
    כושר: "fitness-outline",
    למידה: "book-outline",
    עבודה: "briefcase-outline",
    אישי: "person-outline",
    אחר: "ellipsis-horizontal-outline",
  }

  return icons[category] || "ellipsis-horizontal-outline"
}

// פונקציה לפורמט תאריך לתצוגה בעברית
export const formatDateHebrew = (dateString: string): string => {
  const date = new Date(dateString)

  // מערך שמות החודשים בעברית
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

  const day = date.getDate()
  const month = hebrewMonths[date.getMonth()]
  const year = date.getFullYear()

  return `${day} ב${month} ${year}`
}

// פונקציה לקבלת התאריך הנוכחי בפורמט ISO (YYYY-MM-DD)
export const getCurrentDateISO = (): string => {
  const date = new Date()
  return date.toISOString().split("T")[0]
}