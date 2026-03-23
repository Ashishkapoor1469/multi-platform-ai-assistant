import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import InputField from "@/components/login/inputfeild";

export default function ProfileEdit() {
  const [name, setName] = useState("Ashish Kapoor");
  const [email, setEmail] = useState("ashish@example.com");
  const [workspace, setWorkspace] = useState("OmniAI Workspace");
  const [role, setRole] = useState("Developer");
  const [avatar, setAvatar] = useState(null);

  //  Pick Image
  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      Alert.alert("Permission required", "Allow access to photos");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
      allowsEditing: true,
      aspect: [1, 1],
    });

    if (!result.canceled) {
      setAvatar(result.assets[0].uri);
    }
  };

  //  Save Profile
  const handleSave = () => {
    const data = {
      name,
      email,
      workspace,
      role,
      avatar,
    };

    console.log("Saved:", data);
    Alert.alert("Success", "Profile updated!");
  };

  return (
    <SafeAreaView style={styles.container}>

      <Text style={styles.title}>Edit Profile</Text>


      <TouchableOpacity style={styles.avatarContainer} onPress={pickImage}>
        {avatar ? (
          <Image source={{ uri: avatar }} style={styles.avatar} />
        ) : (
          <View style={styles.avatarPlaceholder}>
            <Text style={{ color: "#888",fontSize:30 }}>+</Text>
          </View>
        )}
      </TouchableOpacity>

 <InputField label={"Name"}  placeholder="Name"  />
      
      <InputField
      label={"Email"} 
        placeholder="ashishkapoor35@gmail.com"
      />


      <InputField
      label={"Workspace Name"} 
        placeholder="CodeAxe"
      />


      <InputField
      label={"Role"} 
        placeholder="Full stack dev"
       
      />

      <TouchableOpacity style={styles.btn} onPress={handleSave}>
        <Text style={styles.btnText}>Save Changes</Text>
      </TouchableOpacity>
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
    marginBottom: 15,
  },

  avatarContainer: {
    alignItems: "center",
    marginBottom: 20,
  },

  avatar: {
    width: 100,
    height: 100,
    borderRadius: 100,
  },

  avatarPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 100,
    backgroundColor: "#eef1f4",
    alignItems: "center",
    justifyContent: "center",
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