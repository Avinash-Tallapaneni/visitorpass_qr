import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { borderRadius, COLORS, fontSize, spacing } from "../constants";
import { FormFieldProps } from "../types";

export const FormField = ({
  label,
  value,
  onChangeText,
  placeholder,
  error,
  keyboardType = "default",
  required = false,
}: FormFieldProps) => {
  return (
    <View style={styles.inputWrapper}>
      <Text style={styles.label}>
        {label} {required && <Text style={styles.required}>*</Text>}
      </Text>
      <TextInput
        style={[styles.input, error && styles.inputError]}
        placeholder={placeholder || `Enter ${label.toLowerCase()}`}
        placeholderTextColor={COLORS.link}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        accessibilityLabel={label}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  inputWrapper: {
    marginBottom: spacing.medium,
  },
  label: {
    fontSize: fontSize.medium,
    color: COLORS.slate,
    marginBottom: spacing.small,
  },
  required: {
    color: COLORS.error,
  },
  input: {
    width: "100%",
    height: 48,
    borderWidth: 1,
    borderColor: COLORS.inputBorder,
    borderRadius: borderRadius.medium,
    paddingHorizontal: spacing.medium,
    fontSize: fontSize.medium,
    backgroundColor: COLORS.white,
  },
  inputError: {
    borderColor: COLORS.error,
  },
  errorText: {
    color: COLORS.error,
    fontSize: fontSize.small,
    marginTop: spacing.xSmall,
    marginLeft: spacing.xSmall,
  },
});
