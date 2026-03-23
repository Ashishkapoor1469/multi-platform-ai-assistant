import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Switch,
} from "react-native";
import Slider from "@react-native-community/slider";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as DocumentPicker from "expo-document-picker";
import BackButton from "@/components/tasks/backbutton";

export default function Settings() {
  const [provider, setProvider] = useState("ollama");

  const [ollamaUrl, setOllamaUrl] = useState("");
  const [openRouterKey, setOpenRouterKey] = useState("");
  const [model, setModel] = useState("mistral");

  const [temperature, setTemperature] = useState(0.7);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [skills, setSkills] = useState("");
  const [notifications, setNotifications] = useState(true);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    const data = await AsyncStorage.getItem("settings");
    if (data) {
      const parsed = JSON.parse(data);
      setProvider(parsed.provider || "ollama");
      setOllamaUrl(parsed.ollamaUrl || "");
      setOpenRouterKey(parsed.openRouterKey || "");
      setModel(parsed.model || "mistral");
      setTemperature(parsed.temperature || 0.7);
      setEmail(parsed.email || "");
      setPassword(parsed.password || "");
      setSkills(parsed.skills?.join(", ") || "");
      setNotifications(parsed.notifications ?? true);
    }
  };

  const handleSave = async () => {
    const data = {
      provider,
      ollamaUrl,
      openRouterKey,
      model,
      temperature,
      email,
      password,
      skills: skills.split(",").map((s) => s.trim()),
      notifications,
    };

    await AsyncStorage.setItem("settings", JSON.stringify(data));

    alert("Settings Saved ");
  };

  const pickSkillsFile = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ["application/json", "text/plain"],
        copyToCacheDirectory: true,
      });

      if (result.canceled) return;

      const file = result.assets[0];

      const response = await fetch(file.uri);
      const text = await response.text();

      let parsedSkills = [];

      try {
        const json = JSON.parse(text);

        if (Array.isArray(json)) {
          parsedSkills = json;
        } else if (json.skills) {
          parsedSkills = json.skills;
        }
      } catch {
        parsedSkills = text.split(",").map((s) => s.trim());
      }

      const current = skills ? skills.split(",").map((s) => s.trim()) : [];

      const merged = [...new Set([...current, ...parsedSkills])];

      setSkills(merged.join(", "));
    } catch (err) {
      console.log(err);
      alert("Failed to load file");
    }
  };

  return (
    <SafeAreaView style={styles.container}>

      <Text style={styles.title}>Advanced Settings</Text>

      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.section}>AI Provider</Text>
        <View style={styles.row}>
          <Text>Ollama</Text>
          <Switch
            value={provider === "openrouter"}
            onValueChange={(val) => setProvider(val ? "openrouter" : "ollama")}
          />
          <Text>OpenRouter</Text>
        </View>

        {provider === "ollama" && (
          <TextInput
            placeholder="Ollama URL (http://localhost:11434)"
            value={ollamaUrl}
            onChangeText={setOllamaUrl}
            style={styles.input}
          />
        )}

        {provider === "openrouter" && (
          <TextInput
            placeholder="OpenRouter API Key"
            value={openRouterKey}
            onChangeText={setOpenRouterKey}
            style={styles.input}
          />
        )}

        <Text style={styles.section}>Model</Text>
        <TextInput
          placeholder="Model (mistral, llama3, etc)"
          value={model}
          onChangeText={setModel}
          style={styles.input}
        />

        <Text style={styles.section}>
          Temperature: {temperature.toFixed(2)}
        </Text>
        <Slider
          minimumValue={0}
          maximumValue={1}
          value={temperature}
          minimumTrackTintColor="#3B4A5A"
          maximumTrackTintColor="#d1d5db"
          thumbTintColor="#3B4A5A"
          onValueChange={setTemperature}
        />

        <Text style={styles.section}>Email (Nodemailer)</Text>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
        />
        <TextInput
          placeholder="App Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          style={styles.input}
        />

        <Text style={styles.section}>Skills</Text>
        <TextInput
          placeholder="coding, email, research..."
          value={skills}
          onChangeText={setSkills}
          style={styles.input}
        />

        <TouchableOpacity style={styles.uploadBtn} onPress={pickSkillsFile}>
          <Text style={styles.uploadText}>Upload Skills File</Text>
        </TouchableOpacity>

        <Text style={styles.section}>Notifications</Text>
        <View style={styles.row}>
          <Text>Enable Notifications</Text>
          <Switch value={notifications} onValueChange={setNotifications} />
        </View>

        <TouchableOpacity style={styles.btn} onPress={handleSave}>
          <Text style={styles.btnText}>Save Settings</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15, backgroundColor: "#f8fafc" },

  title: { fontSize: 22, fontWeight: "700", marginBottom: 10 },

  section: {
    marginTop: 20,
    marginBottom: 10,
    fontWeight: "600",
    color: "#666",
  },

  input: {
    backgroundColor: "#eef1f4",
    padding: 12,
    borderRadius: 12,
    marginBottom: 10,
  },

  row: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  uploadBtn: {
    backgroundColor: "#e2e8f0",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 10,
  },

  uploadText: {
    fontWeight: "600",
  },

  btn: {
    marginTop: 20,
    backgroundColor: "#3B4A5A",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
  },

  btnText: {
    color: "#fff",
    fontWeight: "600",
  },
});
