// DocumentUpload.js
import SelfieComponent from "@/components/SelfieComponent";
import { borderRadius, COLORS, fontSize, spacing } from "@/constants";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const DocumentUpload = () => {
  const [isCameraActive, setIsCameraActive] = useState(false);

  const pickDocument = () => {
    // Document picker logic
  };

  const handleUpload = () => {
    // Upload logic
  };

  // Camera view takes over the entire screen when active
  if (isCameraActive) {
    return (
      <SafeAreaView style={styles.fullScreenContainer}>
        <SelfieComponent />
      </SafeAreaView>
    );
  }

  // Main document upload screen
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={styles.formContainer}>
          <Text style={styles.title}>Upload Documents and Photos</Text>

          <View style={styles.optionsContainer}>
            {/* Camera option */}
            <TouchableOpacity
              style={styles.option}
              onPress={() => setIsCameraActive(true)}
              accessibilityLabel="Take photo with camera"
            >
              <View style={styles.iconContainer}>
                <MaterialCommunityIcons
                  name="camera-outline"
                  size={40}
                  color={COLORS.slate}
                />
              </View>
              <Text style={styles.optionText}>Take Photo{"\n"}with Camera</Text>
            </TouchableOpacity>

            {/* Document upload option */}
            <TouchableOpacity
              style={styles.option}
              onPress={pickDocument}
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

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.uploadButton]}
              onPress={handleUpload}
              accessibilityLabel="Upload photo"
            >
              <Text style={styles.uploadButtonText}>Upload</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
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
  uploadButtonText: {
    color: COLORS.white,
    fontSize: fontSize.medium,
  },
  fullScreenContainer: {
    flex: 1,
    backgroundColor: COLORS.black,
  },
  fullScreenCamera: {
    flex: 1,
  },
});

export default DocumentUpload;


import SelfieComponent from "@/components/SelfieComponent";
import { borderRadius, COLORS, fontSize, spacing } from "@/constants";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useCameraPermissions } from "expo-camera";
import React, { useState } from "react";
import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const DocumentUpload = () => {
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();
  const [capturedPhoto, setCapturedPhoto] = useState<{
    uri: string;
    width: number;
    height: number;
    base64?: string;
  } | null>(null);

  const pickDocument = () => {
    // Document picker logic
  };

  const handleUpload = () => {
    // Upload logic
  };

  const handleCloseCamera = () => {
    setIsCameraActive(false);
  };

  if (isCameraActive) {
    if (!permission) {
      return <View />;
    }

    if (!permission.granted) {
      return (
        <View style={styles.container}>
          <Text style={styles.message}>We need your permission to show the camera</Text>
          <Button onPress={requestPermission} title="grant permission" />
        </View>
      );
    }

    return (
      <SafeAreaView style={styles.fullScreenContainer}>
        <SelfieComponent
          onClose={handleCloseCamera}
          onPhotoCapture={(photo) => {
            setCapturedPhoto(photo);
            setIsCameraActive(false);
          }}
        />
      </SafeAreaView>
    );
  }

  // Main document upload screen
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={styles.formContainer}>
          <Text style={styles.title}>Upload Documents and Photos</Text>

          <View style={styles.optionsContainer}>
            <TouchableOpacity
              style={styles.option}
              onPress={() => setIsCameraActive(true)}
              accessibilityLabel="Take photo with camera"
            >
              <View style={styles.iconContainer}>
                <MaterialCommunityIcons
                  name="camera-outline"
                  size={40}
                  color={COLORS.slate}
                />
              </View>
              <Text style={styles.optionText}>Take Photo{"\n"}with Camera</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.option}
              onPress={pickDocument}
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

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.uploadButton]}
              onPress={handleUpload}
              accessibilityLabel="Upload photo"
            >
              <Text style={styles.uploadButtonText}>Upload</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
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
  uploadButtonText: {
    color: COLORS.white,
    fontSize: fontSize.medium,
  },
  fullScreenContainer: {
    flex: 1,
    backgroundColor: COLORS.black,
  },
});

export default DocumentUpload;




import SelfieComponent from "@/components/SelfieComponent";
import { borderRadius, COLORS, fontSize, spacing } from "@/constants";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const DocumentUpload = () => {
  const [uploadedDocument, setUploadedDocument] = useState<string | null>(null);

  const pickDocument = async () => {
    // try {
    //   const result = await DocumentPicker.getDocumentAsync({
    //     type: "*/*",
    //     copyToCacheDirectory: false,
    //   });
    //   if (result.type === "success") {
    //     setUploadedDocument(result.uri);
    //   }
    // } catch (err) {
    //   console.error("Error picking document:", err);
    // }
  };

  const handleUpload = () => {
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
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={styles.formContainer}>
          <Text style={styles.title}>Upload Documents and Selfie</Text>

          <View style={styles.optionsContainer}>
            <SelfieComponent />

            <TouchableOpacity
              style={styles.option}
              onPress={pickDocument}
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
              {uploadedDocument && (
                <Text style={styles.capturedText}>Document uploaded</Text>
              )}
            </TouchableOpacity>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              // style={[
              //   styles.button,
              //   styles.uploadButton,
              //   (!capturedSelfie || !uploadedDocument) && styles.disabledButton,
              // ]}
              onPress={handleUpload}
              // disabled={!capturedSelfie || !uploadedDocument}
              accessibilityLabel="Upload documents"
            >
              <Text style={styles.uploadButtonText}>Upload</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
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

export default DocumentUpload;
