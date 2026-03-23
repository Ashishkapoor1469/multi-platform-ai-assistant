import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";


export default function HelpSupport() {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (!message.trim()) {
      Alert.alert("Error", "Please enter your message");
      return;
    }

    Alert.alert("Sent", "Support request submitted!");
    setMessage("");
  };

  return (
    <SafeAreaView style={styles.container}>

      <Text style={styles.title}>Help & Support</Text>

      <ScrollView showsVerticalScrollIndicator={false}>
        
        <Text style={styles.section}>Frequently Asked Questions</Text>

        <View style={styles.card}>
          <Text style={styles.q}>How does OmniAI work?</Text>
          <Text style={styles.a}>
            OmniAI uses AI to generate responses, automate tasks, and assist with productivity.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.q}>Is my data safe?</Text>
          <Text style={styles.a}>
            Yes, your data is securely stored and not shared without permission.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.q}>How can I reset my password?</Text>
          <Text style={styles.a}>
            Go to Settings → Change Password to update your credentials.
          </Text>
        </View>

        <Text style={styles.section}>Contact Support</Text>

        <TextInput
          placeholder="Describe your issue..."
          multiline
          value={message}
          onChangeText={setMessage}
          style={styles.textarea}
        />

        <TouchableOpacity style={styles.btn} onPress={handleSend}>
          <Ionicons name="send" size={18} color="#fff" />
          <Text style={styles.btnText}>Send Message</Text>
        </TouchableOpacity>


        <Text style={styles.section}>Quick Help</Text>

        <TouchableOpacity style={styles.quick}>
          <Ionicons name="mail" size={20} />
          <Text style={styles.quickText}>support@omniai.com</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.quick}>
          <Ionicons name="globe" size={20} />
          <Text style={styles.quickText}>Visit Help Center</Text>
        </TouchableOpacity>

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

  card: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 12,
    marginBottom: 10,
  },

  q: {
    fontWeight: "600",
  },

  a: {
    color: "#555",
    marginTop: 4,
  },

  textarea: {
    backgroundColor: "#eef1f4",
    padding: 12,
    borderRadius: 12,
    minHeight: 100,
    textAlignVertical: "top",
  },

  btn: {
    marginTop: 10,
    backgroundColor: "#4a6cf7",
    padding: 14,
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },

  btnText: {
    color: "#fff",
    fontWeight: "600",
  },

  quick: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    padding: 12,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginTop: 10,
  },

  quickText: {
    fontSize: 14,
  },
});