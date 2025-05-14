import type React from "react"
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native"
// import { Ionicons } from "@expo/vector-icons"
import Ionicons from "@expo/vector-icons/Ionicons"
import type { HabitCategory } from "../utils/types"
import { getCategoryIcon, getCategoryColor } from "../utils/helpers"

interface CategoryPickerProps {
  selectedCategory: HabitCategory
  onSelectCategory: (category: HabitCategory) => void
}

const CategoryPicker: React.FC<CategoryPickerProps> = ({ selectedCategory, onSelectCategory }) => {
  // רשימת הקטגוריות
  const categories: HabitCategory[] = ["בריאות", "כושר", "למידה", "עבודה", "אישי", "אחר"]

  return (
    <View style={styles.container}>
      <Text style={styles.label}>קטגוריה:</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoriesContainer}>
        {categories.map((category) => {
          const isSelected = category === selectedCategory
          const categoryColor = getCategoryColor(category)

          return (
            <TouchableOpacity
              key={category}
              style={[styles.categoryButton, { backgroundColor: isSelected ? categoryColor : `${categoryColor}20` }]}
              onPress={() => onSelectCategory(category)}
            >
              <Ionicons ornament={getCategoryIcon(category)} size={24} color={isSelected ? "white" : categoryColor} />
              <Text style={[styles.categoryText, { color: isSelected ? "white" : categoryColor }]}>{category}</Text>
            </TouchableOpacity>
          )
        })}
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
  categoriesContainer: {
    paddingVertical: 8,
  },
  categoryButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
  },
  categoryText: {
    marginLeft: 8,
    fontWeight: "500",
  },
})

export default CategoryPicker