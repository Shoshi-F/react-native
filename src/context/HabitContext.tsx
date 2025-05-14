// import type React from "react"
// import { createContext, useState, useEffect, useContext } from "react"
// import type { Habit, HabitContextType, Completion } from "../utils/types"
// import { saveHabits, getHabits } from "../utils/storage"

// // יצירת קונטקסט להרגלים
// const HabitContext = createContext<HabitContextType | undefined>(undefined)

// // פרובידר להרגלים
// export const HabitProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [habits, setHabits] = useState<Habit[]>([])
//   const [isLoading, setIsLoading] = useState<boolean>(true)

//   // טעינת נתונים בעת טעינת האפליקציה
//   useEffect(() => {
//     const loadData = async () => {
//       setIsLoading(true)
//       const storedHabits = await getHabits()
//       setHabits(storedHabits)
//       setIsLoading(false)
//     }

//     loadData()
//   }, [])

//   // הוספת הרגל חדש
//   const addHabit = (newHabit: Omit<Habit, "id" | "createdAt" | "completions">) => {
//     const habitWithId: Habit = {
//       ...newHabit,
//       id: Date.now().toString(),
//       createdAt: new Date().toISOString(),
//       completions: [],
//     }

//     const updatedHabits = [...habits, habitWithId]
//     setHabits(updatedHabits)
//     saveHabits(updatedHabits)
//   }

//   // עדכון הרגל קיים
//   const updateHabit = (id: string, updates: Partial<Habit>) => {
//     const updatedHabits = habits.map((habit) => (habit.id === id ? { ...habit, ...updates } : habit))
//     setHabits(updatedHabits)
//     saveHabits(updatedHabits)
//   }

//   // מחיקת הרגל
//   const deleteHabit = (id: string) => {
//     const updatedHabits = habits.filter((habit) => habit.id !== id)
//     setHabits(updatedHabits)
//     saveHabits(updatedHabits)
//   }

//   // סימון הרגל כהושלם
//   const completeHabit = (id: string, date: string, notes?: string) => {
//     const updatedHabits = habits.map((habit) => {
//       if (habit.id === id) {
//         // בדיקה אם כבר קיימת השלמה לתאריך זה
//         const existingCompletionIndex = habit.completions.findIndex((completion) => completion.date.startsWith(date))

//         let updatedCompletions: Completion[]

//         if (existingCompletionIndex >= 0) {
//           // עדכון השלמה קיימת
//           updatedCompletions = [...habit.completions]
//           updatedCompletions[existingCompletionIndex] = {
//             date,
//             completed: true,
//             notes,
//           }
//         } else {
//           // הוספת השלמה חדשה
//           updatedCompletions = [
//             ...habit.completions,
//             {
//               date,
//               completed: true,
//               notes,
//             },
//           ]
//         }

//         return {
//           ...habit,
//           completions: updatedCompletions,
//         }
//       }
//       return habit
//     })

//     setHabits(updatedHabits)
//     saveHabits(updatedHabits)
//   }

//   // ביטול השלמת הרגל
//   const uncompleteHabit = (id: string, date: string) => {
//     const updatedHabits = habits.map((habit) => {
//       if (habit.id === id) {
//         // בדיקה אם קיימת השלמה לתאריך זה
//         const existingCompletionIndex = habit.completions.findIndex((completion) => completion.date.startsWith(date))

//         if (existingCompletionIndex >= 0) {
//           // עדכון השלמה קיימת ל-completed: false
//           const updatedCompletions = [...habit.completions]
//           updatedCompletions[existingCompletionIndex] = {
//             ...updatedCompletions[existingCompletionIndex],
//             completed: false,
//           }

//           return {
//             ...habit,
//             completions: updatedCompletions,
//           }
//         }
//       }
//       return habit
//     })

//     setHabits(updatedHabits)
//     saveHabits(updatedHabits)
//   }

//   // קבלת הרגל לפי מזהה
//   const getHabitById = (id: string): Habit | undefined => {
//     return habits.find((habit) => habit.id === id)
//   }

//   // קבלת הרגלים שהושלמו בתאריך מסוים
//   const getCompletedHabitsForDate = (date: string): Habit[] => {
//     return habits.filter((habit) =>
//       habit.completions.some((completion) => completion.date.startsWith(date) && completion.completed),
//     )
//   }

//   // חישוב רצף ימים של השלמת הרגל
//   const getStreakForHabit = (id: string): number => {
//     const habit = habits.find((h) => h.id === id)
//     if (!habit || habit.frequency !== "יומי") {
//       return 0
//     }

//     // מיון ההשלמות לפי תאריך (מהחדש לישן)
//     const sortedCompletions = [...habit.completions]
//       .filter((c) => c.completed)
//       .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

//     if (sortedCompletions.length === 0) {
//       return 0
//     }

//     let streak = 1
//     let currentDate = new Date(sortedCompletions[0].date)

//     // בדיקה אם ההשלמה האחרונה היא מהיום או מאתמול
//     const today = new Date()
//     today.setHours(0, 0, 0, 0)

//     const yesterday = new Date(today)
//     yesterday.setDate(yesterday.getDate() - 1)

//     const latestCompletionDate = new Date(sortedCompletions[0].date)
//     latestCompletionDate.setHours(0, 0, 0, 0)

//     // אם ההשלמה האחרונה אינה מהיום או מאתמול, אין רצף נוכחי
//     if (latestCompletionDate.getTime() < yesterday.getTime()) {
//       return 0
//     }

//     // חישוב הרצף
//     for (let i = 1; i < sortedCompletions.length; i++) {
//       const prevDate = new Date(currentDate)
//       prevDate.setDate(prevDate.getDate() - 1)

//       const completionDate = new Date(sortedCompletions[i].date)
//       completionDate.setHours(0, 0, 0, 0)

//       // אם התאריך הקודם הוא יום אחד לפני התאריך הנוכחי, הרצף נמשך
//       if (completionDate.getTime() === prevDate.getTime()) {
//         streak++
//         currentDate = completionDate
//       } else {
//         break
//       }
//     }

//     return streak
//   }

//   return (
//     <HabitContext.Provider
//       value={{
//         habits,
//         addHabit,
//         updateHabit,
//         deleteHabit,
//         completeHabit,
//         uncompleteHabit,
//         getHabitById,
//         getCompletedHabitsForDate,
//         getStreakForHabit,
//       }}
//     >
//       {!isLoading && children}
//     </HabitContext.Provider>
//   )
// }

// // הוק לשימוש בקונטקסט
// export const useHabits = (): HabitContextType => {
//   const context = useContext(HabitContext)
//   if (context === undefined) {
//     throw new Error("useHabits must be used within a HabitProvider")
//   }
//   return context
// }
import type React from "react"
import { createContext, useState, useEffect, useContext } from "react"
import type { Habit, HabitContextType, Completion } from "../utils/types"
import { saveHabits, getHabits } from "../utils/storage"

// יצירת קונטקסט להרגלים
const HabitContext = createContext<HabitContextType | undefined>(undefined)

// פרובידר להרגלים
export const HabitProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [habits, setHabits] = useState<Habit[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)

  // טעינת נתונים בעת טעינת האפליקציה
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true)
      const storedHabits = await getHabits()
      setHabits(storedHabits)
      setIsLoading(false)
    }

    loadData()
  }, [])

  // הוספת הרגל חדש
  const addHabit = (newHabit: Omit<Habit, "id" | "createdAt" | "completions">) => {
    const habitWithId: Habit = {
      ...newHabit,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      completions: [],
    }

    const updatedHabits = [...habits, habitWithId]
    setHabits(updatedHabits)
    saveHabits(updatedHabits)
  }

  // עדכון הרגל קיים
  const updateHabit = (id: string, updates: Partial<Habit>) => {
    const updatedHabits = habits.map((habit) => (habit.id === id ? { ...habit, ...updates } : habit))
    setHabits(updatedHabits)
    saveHabits(updatedHabits)
  }

  // מחיקת הרגל
  const deleteHabit = (id: string) => {
    const updatedHabits = habits.filter((habit) => habit.id !== id)
    setHabits(updatedHabits)
    saveHabits(updatedHabits)
  }

  // סימון הרגל כהושלם
  const completeHabit = (id: string, date: string, notes?: string) => {
    const updatedHabits = habits.map((habit) => {
      if (habit.id === id) {
        // בדיקה אם כבר קיימת השלמה לתאריך זה
        const existingCompletionIndex = habit.completions.findIndex((completion) => completion.date.startsWith(date))

        let updatedCompletions: Completion[]

        if (existingCompletionIndex >= 0) {
          // עדכון השלמה קיימת
          updatedCompletions = [...habit.completions]
          updatedCompletions[existingCompletionIndex] = {
            date,
            completed: true,
            notes,
          }
        } else {
          // הוספת השלמה חדשה
          updatedCompletions = [
            ...habit.completions,
            {
              date,
              completed: true,
              notes,
            },
          ]
        }

        return {
          ...habit,
          completions: updatedCompletions,
        }
      }
      return habit
    })

    setHabits(updatedHabits)
    saveHabits(updatedHabits)
  }

  // ביטול השלמת הרגל
  const uncompleteHabit = (id: string, date: string) => {
    const updatedHabits = habits.map((habit) => {
      if (habit.id === id) {
        // בדיקה אם קיימת השלמה לתאריך זה
        const existingCompletionIndex = habit.completions.findIndex((completion) => completion.date.startsWith(date))

        if (existingCompletionIndex >= 0) {
          // עדכון השלמה קיימת ל-completed: false
          const updatedCompletions = [...habit.completions]
          updatedCompletions[existingCompletionIndex] = {
            ...updatedCompletions[existingCompletionIndex],
            completed: false,
          }

          return {
            ...habit,
            completions: updatedCompletions,
          }
        }
      }
      return habit
    })

    setHabits(updatedHabits)
    saveHabits(updatedHabits)
  }

  // קבלת הרגל לפי מזהה
  const getHabitById = (id: string): Habit | undefined => {
    return habits.find((habit) => habit.id === id)
  }

  // קבלת הרגלים שהושלמו בתאריך מסוים
  const getCompletedHabitsForDate = (date: string): Habit[] => {
    return habits.filter((habit) =>
      habit.completions.some((completion) => completion.date.startsWith(date) && completion.completed),
    )
  }

  // חישוב רצף ימים של השלמת הרגל
  const getStreakForHabit = (id: string): number => {
    const habit = habits.find((h) => h.id === id)
    if (!habit || habit.frequency !== "יומי") {
      return 0
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

  return (
    <HabitContext.Provider
      value={{
        habits,
        addHabit,
        updateHabit,
        deleteHabit,
        completeHabit,
        uncompleteHabit,
        getHabitById,
        getCompletedHabitsForDate,
        getStreakForHabit,
      }}
    >
      {!isLoading && children}
    </HabitContext.Provider>
  )
}

// הוק לשימוש בקונטקסט
export const useHabits = (): HabitContextType => {
  const context = useContext(HabitContext)
  if (context === undefined) {
    throw new Error("useHabits must be used within a HabitProvider")
  }
  return context
}
