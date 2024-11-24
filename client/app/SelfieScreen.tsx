import SelfieComponent from "@/components/SelfieComponent";
import { COLORS, fontSize, spacing } from "@/constants";
import React from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";

const SelfieScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={styles.formContainer}>
          <Text style={styles.title}>Upload Selfie</Text>

          <View style={styles.optionsContainer}>
            <SelfieComponent />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SelfieScreen;

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
});
