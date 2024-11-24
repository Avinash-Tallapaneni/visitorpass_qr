import { uploadSelfie } from "@/api/visitorApi";
import { borderRadius, COLORS, fontSize, spacing } from "@/constants";
import { useVisitorRegistrationStore } from "@/store/VisitorRegistrationStore";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { CameraView, useCameraPermissions } from "expo-camera";
import { router, useRouter } from "expo-router";
import React, { useRef, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const SelfieComponent = () => {
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [capturedSelfie, setCapturedSelfie] = useState<string | null>(null);
  const cameraRef = useRef<CameraView | null>(null);
  const [permission, requestPermission] = useCameraPermissions();
  const { visitorId } = useVisitorRegistrationStore();
  const [isUploading, setIsUploading] = useState(false);
  const router = useRouter();

  const handleTakeSelfie = () => {
    if (permission?.granted) {
      setIsCameraActive(true);
    } else {
      requestPermission();
    }
  };

  const handleClose = () => {
    setIsCameraActive(false);
  };

  const handleUpload = async () => {
    if (capturedSelfie && visitorId) {
      console.log("Uploading selfie...");
      setIsUploading(true);
      const response = await uploadSelfie({
        id: visitorId,
        selfie: capturedSelfie,
      });
      if (response.status === 200) {
        router.replace("/DocumentScreen");
      }
      setIsUploading(false);
    }
  };

  const handleCapture = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync({
          quality: 0.7,
          base64: true,
          exif: false,
        });
        if (photo?.base64) {
          // setCapturedSelfie(`data:image/jpeg;base64,${photo.base64}`);
          setCapturedSelfie(photo.base64);
          setIsCameraActive(false);
        }
      } catch (error) {
        console.error("Error taking picture:", error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Modal visible={isCameraActive} animationType="slide">
        <View style={styles.modalContainer}>
          <CameraView ref={cameraRef} style={styles.camera} facing={"front"}>
            <View style={styles.controlsContainer}>
              <TouchableOpacity
                style={styles.captureButton}
                onPress={handleCapture}
              >
                <View style={styles.captureButtonInner} />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.cameraCloseButton}
                onPress={handleClose}
              >
                <Ionicons name="close" size={30} color={COLORS.white} />
              </TouchableOpacity>
            </View>
          </CameraView>
        </View>
      </Modal>

      <View style={styles.optionsContainer}>
        {capturedSelfie ? (
          <>
            <View style={styles.previewContainer}>
              <Image
                source={{ uri: `data:image/jpeg;base64,${capturedSelfie}` }}
                style={styles.previewImage}
              />
              <TouchableOpacity
                style={styles.previewCloseButton}
                onPress={() => setCapturedSelfie(null)}
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
            onPress={handleTakeSelfie}
            accessibilityLabel="Take selfie with camera"
          >
            <View style={styles.iconContainer}>
              <MaterialCommunityIcons
                name="camera-outline"
                size={40}
                color={COLORS.slate}
              />
            </View>
            <Text style={styles.optionText}>Take Selfie{"\n"}with Camera</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: COLORS.black,
  },
  camera: {
    flex: 1,
  },
  controlsContainer: {
    flex: 1,
    backgroundColor: "transparent",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end",
    paddingBottom: spacing.large,
  },
  captureButton: {
    width: spacing.xxxLarge,
    height: spacing.xxxLarge,
    borderRadius: spacing.xLarge,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  captureButtonInner: {
    width: spacing.height,
    height: spacing.height,
    borderRadius: 30,
    backgroundColor: "white",
  },
  optionsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  option: {
    alignItems: "center",
    padding: 20,
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
    textAlign: "center",
    color: COLORS.slate,
  },
  previewContainer: {
    width: 200,
    height: 250,
    position: "relative",
    marginBottom: spacing.medium,
    borderRadius: borderRadius.medium,
    // backgroundColor: COLORS.black,
  },
  previewImage: {
    width: "100%",
    height: "100%",
    borderRadius: borderRadius.medium,
    transform: [{ scaleX: -1 }],
    resizeMode: "cover",
    aspectRatio: 9 / 16,
    borderWidth: 1,
    borderColor: COLORS.slate,
    backgroundColor: COLORS.slate,
    margin: "auto",
  },
  cameraCloseButton: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: COLORS.slate,
    borderRadius: 20,
    padding: 5,
  },
  previewCloseButton: {
    position: "absolute",
    top: -20,
    right: 10,
    backgroundColor: COLORS.slate,
    borderRadius: 20,
    padding: 5,
  },
  buttonContainer: {
    width: "100%",
    gap: spacing.medium,
    marginTop: spacing.large,
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
});

export default SelfieComponent;
