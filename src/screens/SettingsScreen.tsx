import type React from "react"
import { useState, useEffect } from "react"
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Switch,
  Alert,
  Modal,
  SafeAreaView,
  ScrollView,
} from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { saveSettings, getSettings, clearAllData } from "../utils/storage"
import type { SettingsType } from "../utils/types"

const SettingsScreen: React.FC = () => {
  const [settings, setSettings] = useState<SettingsType>({
    darkMode: false,
    notifications: true,
    reminderTime: "20:00",
  })

  const [isModalVisible, setIsModalVisible] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // טעינת הגדרות בעת טעינת המסך
  useEffect(() => {
    const loadSettings = async () => {
      const storedSettings = await getSettings()
      setSettings(storedSettings)
      setIsLoading(false)
    }

    loadSettings()
  }, [])

  // שמירת הגדרות
  const handleSaveSettings = async () => {
    await saveSettings(settings)
    Alert.alert("הגדרות", "ההגדרות נשמרו בהצלחה")
  }

  // איפוס כל הנתונים
  const handleResetData = () => {
    Alert.alert("איפוס נתונים", "האם אתה בטוח שברצונך למחוק את כל הנתונים? פעולה זו אינה ניתנת לביטול.", [
      { text: "ביטול", style: "cancel" },
      {
        text: "איפוס",
        onPress: async () => {
          await clearAllData()
          Alert.alert("איפוס נתונים", "כל הנתונים נמחקו בהצלחה")
        },
        style: "destructive",
      },
    ])
  }

  // פתיחת מודל עזרה
  const openHelpModal = () => {
    setIsModalVisible(true)
  }

  if (isLoading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.loadingContainer}>
          <Text>טוען הגדרות...</Text>
        </View>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>הגדרות כלליות</Text>

          <View style={styles.settingItem}>
            <View style={styles.settingTextContainer}>
              <Ionicons name="moon-outline" size={24} color="#333" />
              <Text style={styles.settingText}>מצב כהה</Text>
            </View>
            <Switch
              value={settings.darkMode}
              onValueChange={(value) => setSettings({ ...settings, darkMode: value })}
              trackColor={{ false: "#ddd", true: "#748ffc" }}
              thumbColor={settings.darkMode ? "#4c6ef5" : "#f4f3f4"}
            />
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingTextContainer}>
              <Ionicons name="notifications-outline" size={24} color="#333" />
              <Text style={styles.settingText}>התראות</Text>
            </View>
            <Switch
              value={settings.notifications}
              onValueChange={(value) => setSettings({ ...settings, notifications: value })}
              trackColor={{ false: "#ddd", true: "#748ffc" }}
              thumbColor={settings.notifications ? "#4c6ef5" : "#f4f3f4"}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>הגדרות תזכורות</Text>
          <View style={styles.formGroup}>
            <Text style={styles.label}>שעת תזכורת ברירת מחדל:</Text>
            <TextInput
              style={styles.input}
              value={settings.reminderTime}
              onChangeText={(value) => setSettings({ ...settings, reminderTime: value })}
              placeholder="הזן שעת תזכורת (לדוגמה: 20:00)"
              placeholderTextColor="#999"
            />
          </View>
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={handleSaveSettings}>
          <Text style={styles.saveButtonText}>שמור הגדרות</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.helpButton} onPress={openHelpModal}>
          <Ionicons name="help-circle-outline" size={24} color="#4c6ef5" />
          <Text style={styles.helpButtonText}>עזרה ומידע</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.resetButton} onPress={handleResetData}>
          <Ionicons name="trash-outline" size={20} color="white" />
          <Text style={styles.resetButtonText}>איפוס כל הנתונים</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* מודל עזרה */}
      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>עזרה ומידע</Text>

            <ScrollView style={styles.modalScrollContent}>
              <Text style={styles.helpTitle}>איך להשתמש באפליקציה?</Text>
              <Text style={styles.helpText}>
                1. הוסף הרגלים חדשים בעזרת כפתור ה+ במסך הבית.{"\n"}
                2. סמן הרגלים כהושלמו בלחיצה על העיגול ליד כל הרגל.{"\n"}
                3. צפה בפרטי הרגל ובהיסטוריה שלו בלחיצה על ההרגל.{"\n"}
                4. עקוב אחר הרצף שלך וההתקדמות בכל הרגל.
              </Text>

              <Text style={styles.helpTitle}>אודות האפליקציה</Text>
              <Text style={styles.helpText}>
                גרסה: 1.0.0{"\n"}
                פותח על ידי: תלמיד/ה{"\n"}© 2023 כל הזכויות שמורות
              </Text>
            </ScrollView>

            <TouchableOpacity style={styles.closeButton} onPress={() => setIsModalVisible(false)}>
              <Text style={styles.closeButtonText}>סגור</Text>
            </TouchableOpacity>
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
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  section: {
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#333",
  },
  formGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: "#333",
  },
  input: {
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  settingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  settingTextContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  settingText: {
    fontSize: 16,
    marginLeft: 12,
    color: "#333",
  },
  saveButton: {
    backgroundColor: "#4c6ef5",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
    marginBottom: 16,
  },
  saveButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  helpButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    backgroundColor: "white",
    borderRadius: 8,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 2,
  },
  helpButtonText: {
    fontSize: 16,
    color: "#4c6ef5",
    fontWeight: "bold",
    marginLeft: 8,
  },
  resetButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f03e3e",
    borderRadius: 8,
    padding: 16,
    marginBottom: 40,
  },
  resetButtonText: {
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
    maxHeight: "80%",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
    color: "#333",
  },
  modalScrollContent: {
    maxHeight: 400,
  },
  helpTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 16,
    marginBottom: 8,
    color: "#333",
  },
  helpText: {
    fontSize: 16,
    lineHeight: 24,
    color: "#666",
  },
  closeButton: {
    backgroundColor: "#4c6ef5",
    borderRadius: 8,
    padding: 12,
    alignItems: "center",
    marginTop: 16,
  },
  closeButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
})

export default SettingsScreen