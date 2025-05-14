import type React from "react"
import { View, Text, StyleSheet, TouchableOpacity } from "react-native"
// import { Ionicons } from "@expo/vector-icons"
import Ionicons from "@expo/vector-icons/Ionicons"
import type { HabitFrequency } from "../utils/types"

interface FrequencyPickerProps {
  selectedFrequency: HabitFrequency
  onSelectFrequency: (frequency: HabitFrequency) => void
}

const FrequencyPicker: React.FC<FrequencyPickerProps> = ({ selectedFrequency, onSelectFrequency }) => {
  // רשימת התדירויות
  const frequencies: HabitFrequency[] = ["יומי", "שבועי", "חודשי"]

  // אייקונים לתדירויות
  const frequencyIcons: Record<string, string> = {
    יומי: "calendar-outline",
    שבועי: "calendar-number-outline",
    חודשי: "calendar-clear-outline",
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>תדירות:</Text>
      <View style={styles.buttonsContainer}>
        {frequencies.map((frequency) => (
          <TouchableOpacity
            key={frequency}
            style={[styles.frequencyButton, selectedFrequency === frequency && styles.selectedFrequency]}
            onPress={() => onSelectFrequency(frequency)}
          >
            <Ionicons
              ornament={frequencyIcons[frequency]}
              size={20}
              color={selectedFrequency === frequency ? "white" : "#4c6ef5"}
            />
            <Text style={[styles.frequencyText, selectedFrequency === frequency && styles.selectedFrequencyText]}>
              {frequency}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#333",
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  frequencyButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#e8f0fe",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 4,
  },
  selectedFrequency: {
    backgroundColor: "#4c6ef5",
  },
  frequencyText: {
    marginLeft: 8,
    color: "#4c6ef5",
    fontWeight: "500",
  },
  selectedFrequencyText: {
    color: "white",
  },
})

export default FrequencyPicker