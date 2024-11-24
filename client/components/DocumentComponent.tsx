import { uploadDocument } from "@/api/visitorApi";
import { borderRadius, COLORS, fontSize, spacing } from "@/constants";
import { useVisitorRegistrationStore } from "@/store/VisitorRegistrationStore";
import { Ionicons } from "@expo/vector-icons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import * as DocumentPicker from "expo-document-picker";
import mime from "mime";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface uploadedDocumentProps {
  name: string;
  size: number;
  type: string;
  uri: string;
}

const DocumentComponent = () => {
  const [uploadedDocument, setUploadedDocument] =
    useState<uploadedDocumentProps | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const visitorId = useVisitorRegistrationStore((state) => state.visitorId);

  const handlePickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "application/pdf",
        copyToCacheDirectory: false,
        multiple: false,
      });

      if (result.assets?.[0]) {
        const documentDetails = result.assets[0];

        const mimeType = mime.getType(documentDetails.mimeType!);

        const fileToUpload = {
          name: documentDetails.name,
          size: documentDetails.size!,
          uri: documentDetails.uri,
          type: "application/pdf",
        };

        setUploadedDocument(fileToUpload);
      }
    } catch (err) {
      console.error("Error picking document:", err);
    }
  };

  const handleUpload = async () => {
    if (!uploadedDocument || !visitorId) return;

    try {
      setIsUploading(true);

      const formData = new FormData();

      formData.append("document", {
        uri:
          Platform.OS === "android"
            ? uploadedDocument.uri
            : uploadedDocument.uri.replace("file://", ""),
        type: uploadedDocument.type,
        name: uploadedDocument.name,
      } as any);

      formData.append("visitorId", visitorId);

      const response = await uploadDocument(formData);

      setIsUploading(false);
    } catch (error) {
      console.error("Error uploading:", error);
      setIsUploading(false);
    }
  };

  return (
    <View style={styles.container}>
      {uploadedDocument ? (
        <>
          <View style={styles.previewContainer}>
            <View style={styles.documentPreview}>
              <MaterialCommunityIcons
                name="file-pdf-box"
                size={50}
                color={COLORS.slate}
              />
              <Text style={styles.fileName} numberOfLines={1}>
                {uploadedDocument.name}
              </Text>
            </View>
            <TouchableOpacity
              style={styles.previewCloseButton}
              onPress={() => setUploadedDocument(null)}
            >
              <Ionicons name="close" size={30} color={COLORS.white} />
            </TouchableOpacity>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.uploadButton]}
              onPress={handleUpload}
              accessibilityLabel="Upload photo"
            >
              <Text style={styles.uploadButtonText}>
                {isUploading ? (
                  <ActivityIndicator size="small" color={COLORS.white} />
                ) : (
                  "Upload"
                )}
              </Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
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
      )}
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
  previewCloseButton: {
    position: "absolute",
    top: -20,
    right: -10,
    backgroundColor: COLORS.slate,
    borderRadius: 20,
    padding: 5,
  },
  documentPreview: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderRadius: borderRadius.medium,
    justifyContent: "center",
    alignItems: "center",
    padding: spacing.medium,
    borderWidth: 1,
    borderColor: COLORS.slate,
  },

  fileName: {
    marginTop: spacing.small,
    fontSize: fontSize.medium,
    color: COLORS.slate,
    textAlign: "center",
  },
});

export default DocumentComponent;
