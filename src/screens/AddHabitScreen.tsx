// import type React from "react"
// import { useState } from "react"
// import {
//   View,
//   Text,
//   StyleSheet,
//   TextInput,
//   TouchableOpacity,
//   KeyboardAvoidingView,
//   Platform,
//   ScrollView,
//   Alert,
//   SafeAreaView,
// } from "react-native"
// import { useNavigation } from "@react-navigation/native"
// import type { HabitCategory, HabitFrequency } from "../utils/types"
// import { useHabits } from "../context/HabitContext"
// import CategoryPicker from "../components/CategoryPicker"
// import FrequencyPicker from "../components/FrequencyPicker"
// import ColorPicker from "../components/ColorPicker"

// const AddHabitScreen: React.FC = () => {
//   const navigation = useNavigation()
//   const { addHabit } = useHabits()

//   const [name, setName] = useState("")
//   const [description, setDescription] = useState("")
//   const [category, setCategory] = useState<HabitCategory>("אישי")
//   const [frequency, setFrequency] = useState<HabitFrequency>("יומי")
//   const [color, setColor] = useState("#4c6ef5")
//   const [reminderTime, setReminderTime] = useState("20:00")

//   // פונקציה להוספת הרגל חדש
//   const handleAddHabit = () => {
//     // בדיקת תקינות הקלט
//     if (!name.trim()) {
//       Alert.alert("שגיאה", "אנא הזן שם להרגל")
//       return
//     }

//     // יצירת אובייקט הרגל חדש
//     const newHabit = {
//       name: name.trim(),
//       description: description.trim(),
//       category,
//       frequency,
//       color,
//       reminderTime,
//     }

//     // הוספת ההרגל למערכת
//     addHabit(newHabit)

//     // הצגת הודעת אישור
//     Alert.alert("הרגל נוסף", "ההרגל נוסף בהצלחה", [{ text: "אישור", onPress: () => navigation.goBack() }])
//   }

//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <KeyboardAvoidingView
//         style={styles.container}
//         behavior={Platform.OS === "ios" ? "padding" : "height"}
//         keyboardVerticalOffset={100}
//       >
//         <ScrollView contentContainerStyle={styles.scrollContent}>
//           <View style={styles.formGroup}>
//             <Text style={styles.label}>שם ההרגל:</Text>
//             <TextInput
//               style={styles.input}
//               value={name}
//               onChangeText={setName}
//               placeholder="הזן שם להרגל"
//               placeholderTextColor="#999"
//             />
//           </View>

//           <View style={styles.formGroup}>
//             <Text style={styles.label}>תיאור:</Text>
//             <TextInput
//               style={[styles.input, styles.textArea]}
//               value={description}
//               onChangeText={setDescription}
//               placeholder="הזן תיאור להרגל (אופציונלי)"
//               multiline
//               placeholderTextColor="#999"
//             />
//           </View>

//           <CategoryPicker selectedCategory={category} onSelectCategory={setCategory} />

//           <FrequencyPicker selectedFrequency={frequency} onSelectFrequency={setFrequency} />

//           <ColorPicker selectedColor={color} onSelectColor={setColor} />

//           <View style={styles.formGroup}>
//             <Text style={styles.label}>שעת תזכורת:</Text>
//             <TextInput
//               style={styles.input}
//               value={reminderTime}
//               onChangeText={setReminderTime}
//               placeholder="הזן שעת תזכורת (לדוגמה: 20:00)"
//               placeholderTextColor="#999"
//             />
//           </View>

//           <TouchableOpacity style={styles.addButton} onPress={handleAddHabit}>
//             <Text style={styles.addButtonText}>הוסף הרגל</Text>
//           </TouchableOpacity>
//         </ScrollView>
//       </KeyboardAvoidingView>
//     </SafeAreaView>
//   )
// }

// const styles = StyleSheet.create({
//   safeArea: {
//     flex: 1,
//     backgroundColor: "#f5f5f5",
//   },
//   container: {
//     flex: 1,
//   },
//   scrollContent: {
//     padding: 16,
//   },
//   formGroup: {
//     marginBottom: 16,
//   },
//   label: {
//     fontSize: 16,
//     fontWeight: "bold",
//     marginBottom: 8,
//     color: "#333",
//   },
//   input: {
//     backgroundColor: "white",
//     borderRadius: 8,
//     padding: 12,
//     fontSize: 16,
//     borderWidth: 1,
//     borderColor: "#ddd",
//   },
//   textArea: {
//     minHeight: 100,
//     textAlignVertical: "top",
//   },
//   addButton: {
//     backgroundColor: "#4c6ef5",
//     borderRadius: 8,
//     padding: 16,
//     alignItems: "center",
//     marginTop: 24,
//     marginBottom: 40,
//   },
//   addButtonText: {
//     color: "white",
//     fontSize: 16,
//     fontWeight: "bold",
//   },
// })

// export default AddHabitScreen

import type React from "react"
import { useState } from "react"
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
  SafeAreaView,
} from "react-native"
import { useNavigation } from "@react-navigation/native"
import AsyncStorage from "@react-native-async-storage/async-storage"  // הוספת AsyncStorage
import type { HabitCategory, HabitFrequency } from "../utils/types"
import CategoryPicker from "../components/CategoryPicker"
import FrequencyPicker from "../components/FrequencyPicker"
import ColorPicker from "../components/ColorPicker"

const AddHabitScreen: React.FC = () => {
  const navigation = useNavigation()

  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState<HabitCategory>("אישי")
  const [frequency, setFrequency] = useState<HabitFrequency>("יומי")
  const [color, setColor] = useState("#4c6ef5")
  const [reminderTime, setReminderTime] = useState("20:00")

  // פונקציה להוספת הרגל חדש
  const handleAddHabit = async () => {
    // בדיקת תקינות הקלט
    if (!name.trim()) {
      Alert.alert("שגיאה", "אנא הזן שם להרגל")
      return
    }

    // יצירת אובייקט הרגל חדש
    const newHabit = {
      name: name.trim(),
      description: description.trim(),
      category,
      frequency,
      color,
      reminderTime,
    }

    try {
      // קריאה ל- AsyncStorage כדי לקבל את ההרגלים הקיימים
      const storedHabits = await AsyncStorage.getItem("habits")
      const habits = storedHabits ? JSON.parse(storedHabits) : []

      // הוספת ההרגל החדש לרשימה
      const updatedHabits = [...habits, newHabit]

      // שמירת ההרגלים המעודכנים ב- AsyncStorage
      await AsyncStorage.setItem("habits", JSON.stringify(updatedHabits))

      // הצגת הודעת אישור
      Alert.alert("הרגל נוסף", "ההרגל נוסף בהצלחה", [{ text: "אישור", onPress: () => navigation.goBack() }])
    } catch (error) {
      console.error("שגיאה בשמירה ל- AsyncStorage: ", error)
      Alert.alert("שגיאה", "לא הצלחנו לשמור את ההרגל. אנא נסה שנית.")
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={100}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.formGroup}>
            <Text style={styles.label}>שם ההרגל:</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="הזן שם להרגל"
              placeholderTextColor="#999"
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>תיאור:</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={description}
              onChangeText={setDescription}
              placeholder="הזן תיאור להרגל (אופציונלי)"
              multiline
              placeholderTextColor="#999"
            />
          </View>

          <CategoryPicker selectedCategory={category} onSelectCategory={setCategory} />

          <FrequencyPicker selectedFrequency={frequency} onSelectFrequency={setFrequency} />

          <ColorPicker selectedColor={color} onSelectColor={setColor} />

          <View style={styles.formGroup}>
            <Text style={styles.label}>שעת תזכורת:</Text>
            <TextInput
              style={styles.input}
              value={reminderTime}
              onChangeText={setReminderTime}
              placeholder="הזן שעת תזכורת (לדוגמה: 20:00)"
              placeholderTextColor="#999"
            />
          </View>

          <TouchableOpacity style={styles.addButton} onPress={handleAddHabit}>
            <Text style={styles.addButtonText}>הוסף הרגל</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
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
  scrollContent: {
    padding: 16,
  },
  formGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#333",
  },
  input: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  textArea: {
    minHeight: 100,
    textAlignVertical: "top",
  },
  addButton: {
    backgroundColor: "#4c6ef5",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
    marginTop: 24,
    marginBottom: 40,
  },
  addButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
})

export default AddHabitScreen
