import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useRef, useState } from "react";
import { borderRadius, COLORS, fontSize, spacing } from "../constants";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

const OTPAuth = () => {
  const router = useRouter();
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const inputRefs = useRef<Array<TextInput | null>>([null, null, null, null]);
  const [error, setError] = useState("");

  const handleSubmit = () => {
    router.replace("/DocumentUpload");
  };
  const handleResendOtp = () => {};
  const handleOtpChange = (value: string, index: number) => {
    console.log(value, index);
    if (value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value !== "" && index < otp.length) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };
  const handleKeyPress = (e: any, index: number) => {
    console.log(e.nativeEvent);
    if (e.nativeEvent.key === "Backspace") {
      const newOtp = [...otp];
      newOtp[index] = "";
      setOtp(newOtp);
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
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
          <Text style={styles.title}>Enter OTP</Text>
          <Text style={styles.subTitle}>OTP was send to </Text>
          <Text style={styles.phoneNumber}>+91 98765 43210 </Text>

          <View style={styles.otpContainer}>
            {otp?.map((digit, index) => (
              <TextInput
                key={index}
                ref={(ref) => (inputRefs.current[index] = ref)}
                style={styles.otpInput}
                value={digit}
                onChangeText={(value) => handleOtpChange(value, index)}
                onKeyPress={(e) => handleKeyPress(e, index)}
                keyboardType="number-pad"
                maxLength={1}
              />
            ))}
          </View>

          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <TouchableOpacity onPress={handleResendOtp}>
            <Text style={styles.resendText}>
              Didn't get code?{" "}
              <Text style={styles.resendLink}>Request again</Text>
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={handleSubmit}
            accessibilityLabel="Submit OTP"
          >
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default OTPAuth;

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
  subTitle: {
    fontSize: fontSize.xLarge,
    color: COLORS.slate,
    marginVertical: spacing.small,
  },
  phoneNumber: {
    fontSize: fontSize.xLarge,
    color: COLORS.slate,
    marginBottom: spacing.small,
    fontWeight: "bold",
  },

  otpContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: spacing.small,
    marginBottom: spacing.medium,
  },
  otpInput: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: COLORS.slate,
    borderRadius: borderRadius.small,
    textAlign: "center",
    fontSize: fontSize.large,
    color: COLORS.slate,
  },
  errorText: {
    color: COLORS.error,
    fontSize: fontSize.small,
    marginBottom: spacing.medium,
  },
  resendText: {
    fontSize: fontSize.medium,
    color: COLORS.slate,
    marginBottom: spacing.large,
  },
  resendLink: {
    color: COLORS.slate,
    textDecorationLine: "underline",
  },
  button: {
    width: "100%",
    height: 48,
    backgroundColor: COLORS.slate,
    borderRadius: borderRadius.medium,
    justifyContent: "center",
    alignItems: "center",
    marginTop: spacing.small,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: fontSize.medium,
  },
});
