import { useImageUploader } from "@/libs/uploadthing";
import { openSettings } from "expo-linking";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";

export default function UploadButton() {
  console.log(
    "process.env.EXPO_PUBLIC_BACKEND_URL",
    process.env.EXPO_PUBLIC_BACKEND_URL
  );
  const { openImagePicker, isUploading } = useImageUploader("selfieUploader", {
    onClientUploadComplete: (res) => {
      if (res && res.length > 0) {
        Alert.alert("Upload Completed");
      }
    },
    onUploadError: (error) => Alert.alert("Upload Error", error.message),
  });
 

  const handleImagePick = async () => {
    try {
      await openImagePicker({
        source: "camera",
        onInsufficientPermissions: () => {
          Alert.alert(
            "No Permissions",
            "You need to grant permission to your Photos to use this",
            [
              { text: "Dismiss" },
              { text: "Open Settings", onPress: openSettings },
            ]
          );
        },
      });
    } catch (error) {
      console.error("Image picker error:", error);
    }
  };

  return (
    <View>
      <Pressable
        style={styles.button}
        disabled={isUploading}
        onPress={handleImagePick}
      >
        <Text style={styles.buttonText}>
          {isUploading ? "Uploading..." : "Select Image"}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});
