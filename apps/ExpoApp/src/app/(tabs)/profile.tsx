import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, StyleSheet } from "react-native";
import { router } from "expo-router";
import ProfileHeader from "@/components/profile/profileheader";
import ProfileInfoCard from "@/components/profile/infocard";
import ProfileMenuItem from "@/components/profile/profilemenu";
import LogoutButton from "@/components/profile/logout";

export default function Profile() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ProfileHeader />

        <ProfileInfoCard />

        <ProfileMenuItem
          icon="person-outline"
          title="Edit Profile"
          onPress={() => {router.push("/editprofile")}}
        />

        <ProfileMenuItem
          icon="settings-outline"
          title="Settings"
          onPress={() => {router.push("/settings")}}
        />

        <ProfileMenuItem
          icon="notifications-outline"
          title="Notifications"
          onPress={() => {router.push("/nortification")}}
        />

        <ProfileMenuItem
          icon="help-circle-outline"
          title="Help & Support"
          onPress={() => {router.push("/helpsupport")}}
        />

        <LogoutButton onPress={() => router.replace("/login")} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f7fb",
    padding: 15,
  },
});
