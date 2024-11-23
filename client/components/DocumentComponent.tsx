import { borderRadius, COLORS, fontSize, spacing } from "@/constants";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import * as DocumentPicker from "expo-document-picker";
const DocumentComponent = () => {
  const [uploadedDocument, setUploadedDocument] = useState<string | null>(null);

  const handlePickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "*/*",
        copyToCacheDirectory: false,
        multiple: false,
      });

      console.log(result);



      // if (result.type === "success") {
      //   setUploadedDocument(result.uri);
      // }
    } catch (err) {
      console.error("Error picking document:", err);
    }
  };

  const handleUploadDocument = () => {
    // if (capturedSelfie && uploadedDocument) {
    //   console.log("Uploading selfie:", capturedSelfie.substring(0, 50) + "...");
    // console.log("Uploading document:", uploadedDocument);
    // Implement your upload logic here
    // } else {
    //   console.log(
    //     "Please capture a selfie and upload a document before proceeding."
    //   );
    // }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.option}
        onPress={handlePickDocument}
        accessibilityLabel="Upload Document from your phone"
      >
        <View style={styles.iconContainer}>
          <MaterialCommunityIcons
            name="file-document-multiple-outline"
            size={40}
            color={COLORS.slate}
          />
        </View>
        <Text style={styles.optionText}>
          Upload Document{"\n"}from your phone
        </Text>
        
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: COLORS.black,
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingTop: spacing.large,
  },
  contentContainer: {
    flexGrow: 1,
  },
  formContainer: {
    padding: spacing.medium,
    alignItems: "center",
  },
  title: {
    fontSize: fontSize.xLarge,
    textAlign: "center",
    color: COLORS.slate,
    marginBottom: spacing.large,
  },
  optionsContainer: {
    width: "100%",
    gap: spacing.medium,
    marginBottom: spacing.large,
  },
  option: {
    alignItems: "center",
    gap: spacing.small,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: borderRadius.medium,
    borderWidth: 1,
    borderColor: COLORS.slate,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: spacing.small,
  },
  optionText: {
    fontSize: fontSize.medium,
    color: COLORS.slate,
    textAlign: "center",
  },
  capturedText: {
    fontSize: fontSize.small,
    color: COLORS.error,
    marginTop: spacing.small,
  },
  buttonContainer: {
    width: "100%",
    gap: spacing.medium,
    marginBottom: spacing.large,
  },
  button: {
    width: "100%",
    height: 48,
    borderRadius: borderRadius.medium,
    justifyContent: "center",
    alignItems: "center",
  },
  uploadButton: {
    backgroundColor: COLORS.slate,
  },
  disabledButton: {
    opacity: 0.5,
  },
  uploadButtonText: {
    color: COLORS.white,
    fontSize: fontSize.medium,
  },
  fullScreenContainer: {
    flex: 1,
    backgroundColor: COLORS.black,
  },
  previewContainer: {
    width: "100%",
    height: 200,
    position: "relative",
    marginBottom: spacing.medium,
  },
  previewImage: {
    width: "100%",
    height: "100%",
    borderRadius: borderRadius.medium,
    transform: [{ scaleX: -1 }],
    resizeMode: "contain",
    backgroundColor: COLORS.black,
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: 5,
  },
});

export default DocumentComponent;