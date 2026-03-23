import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  Text,
  StyleSheet,
  Switch,
  ScrollView,
} from "react-native";
import { useState } from "react";

export default function Notifications() {
  const [pushEnabled, setPushEnabled] = useState(true);
  const [emailEnabled, setEmailEnabled] = useState(false);
  const [aiAlerts, setAiAlerts] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);

  return (
    <SafeAreaView style={styles.container}>

      <Text style={styles.title}>Notifications</Text>

      <ScrollView showsVerticalScrollIndicator={false}>
        

        <Text style={styles.section}>General</Text>

        <View style={styles.row}>
          <Text style={styles.label}>Push Notifications</Text>
          <Switch
            value={pushEnabled}
            onValueChange={setPushEnabled}
          />
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Email Notifications</Text>
          <Switch
            value={emailEnabled}
            onValueChange={setEmailEnabled}
          />
        </View>

        <Text style={styles.section}>AI Alerts</Text>

        <View style={styles.row}>
          <Text style={styles.label}>AI Suggestions</Text>
          <Switch value={aiAlerts} onValueChange={setAiAlerts} />
        </View>

  
        <Text style={styles.section}>Sound</Text>

        <View style={styles.row}>
          <Text style={styles.label}>Notification Sound</Text>
          <Switch
            value={soundEnabled}
            onValueChange={setSoundEnabled}
          />
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: "#f8fafc",
  },

  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 10,
  },

  section: {
    marginTop: 20,
    marginBottom: 10,
    fontWeight: "600",
    color: "#666",
  },

  row: {
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 12,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  label: {
    fontSize: 14,
    fontWeight: "500",
  },
});