// הגדרת טיפוסים לשימוש באפליקציה

export interface Habit {
    id: string
    name: string
    description: string
    category: HabitCategory
    frequency: HabitFrequency
    createdAt: string
    completions: Completion[]
    reminderTime?: string // שעת תזכורת (אופציונלי)
    color: string // צבע לזיהוי ויזואלי
  }
  
  export type HabitCategory = "בריאות" | "כושר" | "למידה" | "עבודה" | "אישי" | "אחר"
  
  export type HabitFrequency = "יומי" | "שבועי" | "חודשי"
  
  export interface Completion {
    date: string // תאריך ההשלמה בפורמט ISO
    completed: boolean
    notes?: string // הערות אופציונליות
  }
  
  export interface HabitContextType {
    habits: Habit[]
    addHabit: (habit: Omit<Habit, "id" | "createdAt" | "completions">) => void
    updateHabit: (id: string, updates: Partial<Habit>) => void
    deleteHabit: (id: string) => void
    completeHabit: (id: string, date: string, notes?: string) => void
    uncompleteHabit: (id: string, date: string) => void
    getHabitById: (id: string) => Habit | undefined
    getCompletedHabitsForDate: (date: string) => Habit[]
    getStreakForHabit: (id: string) => number
  }
  
  export interface SettingsType {
    darkMode: boolean
    notifications: boolean
    reminderTime: string // שעת תזכורת ברירת מחדל
  }