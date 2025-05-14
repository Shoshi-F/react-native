import type React from "react"
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native"

interface ColorPickerProps {
  selectedColor: string
  onSelectColor: (color: string) => void
}

const ColorPicker: React.FC<ColorPickerProps> = ({ selectedColor, onSelectColor }) => {
  // רשימת צבעים לבחירה
  const colors = [
    "#4c6ef5", // כחול
    "#f03e3e", // אדום
    "#40c057", // ירוק
    "#fab005", // צהוב
    "#7950f2", // סגול
    "#fd7e14", // כתום
    "#15aabf", // טורקיז
    "#e64980", // ורוד
    "#212529", // שחור
  ]

  return (
    <View style={styles.container}>
      <Text style={styles.label}>צבע:</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.colorsContainer}>
        {colors.map((color) => (
          <TouchableOpacity
            key={color}
            style={[
              styles.colorButton,
              { backgroundColor: color },
              selectedColor === color && styles.selectedColorButton,
            ]}
            onPress={() => onSelectColor(color)}
          />
        ))}
      </ScrollView>
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
  colorsContainer: {
    paddingVertical: 8,
    flexDirection: "row",
  },
  colorButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 12,
  },
  selectedColorButton: {
    borderWidth: 3,
    borderColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 3,
  },
})

export default ColorPicker