import React, { useState, useContext } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Alert,
  Text,
  TouchableOpacity,
} from "react-native";
import { registerUser } from "../firebase/firebaseAuth";
import { AuthContext } from "../contexts/AuthContext";

export default function RegisterScreen({ navigation }) {
  const [emailAddress, setEmailAddress] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const { signIn } = useContext(AuthContext);

  const handleRegistration = async () => {
    try {
      const userData = await registerUser(emailAddress, userPassword);
      await signIn(userData.idToken, userData.localId);
    } catch (error) {
      Alert.alert("Помилка", "Реєстрація не вдалася. Спробуйте ще раз.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Створити обліковий запис</Text>
      <TextInput
        placeholder="Електронна пошта"
        style={styles.input}
        value={emailAddress}
        onChangeText={setEmailAddress}
        keyboardType="email-address"
        autoCapitalize="none"
        placeholderTextColor="#888"
      />
      <TextInput
        placeholder="Пароль"
        style={styles.input}
        value={userPassword}
        onChangeText={setUserPassword}
        secureTextEntry
        placeholderTextColor="#888"
      />
      <TouchableOpacity style={styles.button} onPress={handleRegistration}>
        <Text style={styles.buttonText}>Зареєструватись</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.secondaryButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.secondaryButtonText}>Назад до входу</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    backgroundColor: "#f4f6f8",
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
    backgroundColor: "#4CAF50",
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
