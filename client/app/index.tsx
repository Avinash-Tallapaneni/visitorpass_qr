import { registerVisitor } from "@/api/visitorApi";
import { FormField } from "@/components/FormInput";
import { borderRadius, COLORS, fontSize, spacing } from "@/constants";
import {
  visitorRegistrationSchema,
  visitorRegistrationType,
} from "@/helpers/validation";
import { useVisitorRegistrationStore } from "@/store/VisitorRegistrationStore";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ZodError } from "zod";

const VisitorRegistration = () => {
  const updateStore = useVisitorRegistrationStore(
    (state) => state.setVisitorId
  );
  const [formData, setFormData] = useState<visitorRegistrationType>({
    name: "",
    email: "",
    phoneNumber: "",
    visitingPersonName: "",
  });

  const [errors, setError] = useState<
    Record<keyof visitorRegistrationType, string>
  >({
    name: "",
    email: "",
    phoneNumber: "",
    visitingPersonName: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleFieldChange = (
    field: keyof visitorRegistrationType,
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const formValidation = () => {
    try {
      visitorRegistrationSchema.parse(formData);
      setError({
        name: "",
        email: "",
        phoneNumber: "",
        visitingPersonName: "",
      });
      return true;
    } catch (error) {
      if (error instanceof ZodError) {
        const updatedErrors: Record<keyof visitorRegistrationType, string> = {
          name: "",
          email: "",
          phoneNumber: "",
          visitingPersonName: "",
        };
        error.errors.forEach((err) => {
          const field = err.path[0] as keyof visitorRegistrationType;
          updatedErrors[field] = err.message;
        });
        setError(updatedErrors);
        return false;
      }
      return false;
    }
  };

  const handleSubmit = async () => {
    const isFormValid = formValidation();

    if (isFormValid) {
      setIsLoading(true);
      const response = await registerVisitor(formData);

      console.log("response in index", response.data);
      if (response.success === "OK") {
        updateStore(response.data[0].id);
        router.push("./OTPAuth");
      }
      setIsLoading(false);
    }

    console.log(isFormValid);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.slate} />
        </View>
      ) : (
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
        >
          <View style={styles.formContainer}>
            <Image
              source={require("../assets/images/avatar.png")}
              style={styles.logo}
              accessibilityLabel="Company logo"
            />
            <Text style={styles.title}>Visitor Pass Registration</Text>

            <View style={styles.inputContainer}>
              <FormField
                label="Full Name"
                value={formData.name}
                onChangeText={(value) => handleFieldChange("name", value)}
                error={errors.name}
                placeholder="John Doe"
                required
              />

              <FormField
                label="Email Address"
                value={formData.email}
                onChangeText={(value) => handleFieldChange("email", value)}
                error={errors.email}
                keyboardType="email-address"
                placeholder="john.doe@example.com"
                required
              />

              <FormField
                label="Phone Number"
                value={formData.phoneNumber}
                onChangeText={(value) =>
                  handleFieldChange("phoneNumber", value)
                }
                error={errors.phoneNumber}
                keyboardType="phone-pad"
                placeholder="+91 98765 43210"
                required
              />

              <FormField
                label="Visiting Person Name"
                value={formData.visitingPersonName}
                onChangeText={(value) =>
                  handleFieldChange("visitingPersonName", value)
                }
                error={errors.visitingPersonName}
                placeholder="Contacting person full name"
                required
              />
            </View>

            <TouchableOpacity
              style={styles.button}
              onPress={handleSubmit}
              accessibilityLabel="Submit registration form"
            >
              <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default VisitorRegistration;

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: COLORS.black,
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.background,
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
  logo: {
    width: 100,
    height: 100,
    marginBottom: spacing.large,
    borderRadius: borderRadius.medium,
  },
  title: {
    fontSize: fontSize.xLarge,
    color: COLORS.slate,
    marginBottom: spacing.small,
  },
  inputContainer: {
    width: "100%",
    marginBottom: spacing.large,
  },
  button: {
    width: "100%",
    height: 48,
    backgroundColor: COLORS.slate,
    borderRadius: borderRadius.medium,
    justifyContent: "center",
    alignItems: "center",
    marginTop: spacing.small,
    marginBottom: spacing.large,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: fontSize.medium,
  },
});
