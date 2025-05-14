// import AsyncStorage from "@react-native-async-storage/async-storage"
// import type { Habit, SettingsType } from "./types"

// // מפתחות לשמירת נתונים ב-AsyncStorage
// const HABITS_KEY = "@habit_tracker:habits"
// const SETTINGS_KEY = "@habit_tracker:settings"

// // שמירת הרגלים
// export const saveHabits = async (habits: Habit[]): Promise<void> => {
//   try {
//     await AsyncStorage.setItem(HABITS_KEY, JSON.stringify(habits))
//   } catch (error) {
//     console.error("Error saving habits:", error)
//   }
// }

// // קבלת הרגלים
// export const getHabits = async (): Promise<Habit[]> => {
//   try {
//     const habitsJson = await AsyncStorage.getItem(HABITS_KEY)
//     return habitsJson ? JSON.parse(habitsJson) : []
//   } catch (error) {
//     console.error("Error getting habits:", error)
//     return []
//   }
// }

// // שמירת הגדרות
// export const saveSettings = async (settings: SettingsType): Promise<void> => {
//   try {
//     await AsyncStorage.setItem(SETTINGS_KEY, JSON.stringify(settings))
//   } catch (error) {
//     console.error("Error saving settings:", error)
//   }
// }

// // קבלת הגדרות
// export const getSettings = async (): Promise<SettingsType> => {
//   try {
//     const settingsJson = await AsyncStorage.getItem(SETTINGS_KEY)
//     if (settingsJson) {
//       return JSON.parse(settingsJson)
//     }
//     // הגדרות ברירת מחדל
//     return {
//       darkMode: false,
//       notifications: true,
//       reminderTime: "20:00",
//     }
//   } catch (error) {
//     console.error("Error getting settings:", error)
//     // הגדרות ברירת מחדל במקרה של שגיאה
//     return {
//       darkMode: false,
//       notifications: true,
//       reminderTime: "20:00",
//     }
//   }
// }

// // מחיקת כל הנתונים (לשימוש בפונקציית איפוס)
// export const clearAllData = async (): Promise<void> => {
//   try {
//     await AsyncStorage.multiRemove([HABITS_KEY, SETTINGS_KEY])
//   } catch (error) {
//     console.error("Error clearing data:", error)
//   }
// }

import AsyncStorage from "@react-native-async-storage/async-storage"
import type { Habit, SettingsType } from "./types"

// מפתחות לשמירת נתונים ב-AsyncStorage
const HABITS_KEY = "@habit_tracker:habits"
const SETTINGS_KEY = "@habit_tracker:settings"

// שמירת הרגלים
export const saveHabits = async (habits: Habit[]): Promise<void> => {
  try {
    await AsyncStorage.setItem(HABITS_KEY, JSON.stringify(habits))
  } catch (error) {
    console.error("Error saving habits:", error)
  }
}

// קבלת הרגלים
export const getHabits = async (): Promise<Habit[]> => {
  try {
    const habitsJson = await AsyncStorage.getItem(HABITS_KEY)
    return habitsJson ? JSON.parse(habitsJson) : []
  } catch (error) {
    console.error("Error getting habits:", error)
    return []
  }
}

// שמירת הגדרות
export const saveSettings = async (settings: SettingsType): Promise<void> => {
  try {
    await AsyncStorage.setItem(SETTINGS_KEY, JSON.stringify(settings))
  } catch (error) {
    console.error("Error saving settings:", error)
  }
}

// קבלת הגדרות
export const getSettings = async (): Promise<SettingsType> => {
  try {
    const settingsJson = await AsyncStorage.getItem(SETTINGS_KEY)
    if (settingsJson) {
      return JSON.parse(settingsJson)
    }
    // הגדרות ברירת מחדל
    return {
      darkMode: false,
      notifications: true,
      reminderTime: "20:00",
    }
  } catch (error) {
    console.error("Error getting settings:", error)
    // הגדרות ברירת מחדל במקרה של שגיאה
    return {
      darkMode: false,
      notifications: true,
      reminderTime: "20:00",
    }
  }
}
