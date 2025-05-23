import React, { useState, useContext } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  Alert,
  TouchableOpacity,
} from "react-native";
import { loginUser } from "../firebase/firebaseAuth";
import { AuthContext } from "../contexts/AuthContext";

export default function LoginScreen({ navigation }) {
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const { signIn } = useContext(AuthContext);

  const handleLogin = async () => {
    try {
      const userData = await loginUser(emailInput, passwordInput);
      await signIn(userData.idToken, userData.localId);
    } catch (error) {
      Alert.alert("Помилка", "Невірна електронна пошта або пароль.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Вхід до акаунту</Text>
      <TextInput
        placeholder="Електронна пошта"
        style={styles.input}
        value={emailInput}
        onChangeText={setEmailInput}
        keyboardType="email-address"
        autoCapitalize="none"
        placeholderTextColor="#888"
      />
      <TextInput
        placeholder="Пароль"
        style={styles.input}
        value={passwordInput}
        onChangeText={setPasswordInput}
        secureTextEntry
        placeholderTextColor="#888"
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Увійти</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.secondaryButton}
        onPress={() => navigation.navigate("Register")}
      >
        <Text style={styles.secondaryButtonText}>Створити акаунт</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    backgroundColor: "#f5f7fa",
  },
  title: {
    fontSize: 24,
    marginBottom: 32,
    textAlign: "center",
    fontWeight: "bold",
    color: "#333",
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
    backgroundColor: "#fff",
    fontSize: 16,
  },
  button: {
    backgroundColor: "#2196F3",
    paddingVertical: 14,
    borderRadius: 8,
    marginBottom: 12,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "600",
  },
  secondaryButton: {
    backgroundColor: "#e0e0e0",
    paddingVertical: 14,
    borderRadius: 8,
  },
  secondaryButtonText: {
    color: "#333",
    fontSize: 16,
    textAlign: "center",
  },
});
