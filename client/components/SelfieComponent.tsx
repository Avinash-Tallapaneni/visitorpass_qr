import { Ionicons } from "@expo/vector-icons";
import { CameraView, useCameraPermissions } from "expo-camera";
import React, { useRef, useState } from "react";
import { StyleSheet, TouchableOpacity, View, Image, Modal } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Text } from "react-native";
import { borderRadius, COLORS, spacing } from "@/constants";

const SelfieComponent = () => {
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [capturedSelfie, setCapturedSelfie] = useState<string | null>(null);
  const cameraRef = useRef<CameraView | null>(null);
  const [permission, requestPermission] = useCameraPermissions();

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

  const handleCapture = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync({
          quality: 0.7,
          base64: true,
          exif: false,
        });
        if (photo?.base64) {
          setCapturedSelfie(`data:image/jpeg;base64,${photo.base64}`);
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
                style={styles.closeButton}
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
          <View style={styles.previewContainer}>
            <Image
              source={{ uri: capturedSelfie }}
              style={styles.previewImage}
            />
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setCapturedSelfie(null)}
            >
              <Ionicons name="close" size={30} color={COLORS.white} />
            </TouchableOpacity>
          </View>
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
    paddingBottom: 30,
  },
  captureButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  captureButtonInner: {
    width: 60,
    height: 60,
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
    width: "100%",
    height: 300,
    position: "relative",
    marginBottom: spacing.medium,
    backgroundColor: COLORS.black,
    borderRadius: borderRadius.medium,
  },
  previewImage: {
    width: "100%",
    height: "100%",
    borderRadius: borderRadius.medium,
    transform: [{ scaleX: -1 }],
    resizeMode: "cover",
    aspectRatio: 9 / 16,
    backgroundColor: COLORS.black,
    margin:"auto"
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: COLORS.slate,
    borderRadius: 20,
    padding: 5,
  },
});

export default SelfieComponent;
