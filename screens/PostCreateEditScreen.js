import React, { useState, useContext } from "react";
import {
  View,
  TextInput,
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { AuthContext } from "../contexts/AuthContext";
import { createPost, updatePost } from "../firebase/firebaseDb";

export default function PostCreateEditScreen({ route, navigation }) {
  const { userId } = useContext(AuthContext);
  const existingPost = route.params?.post;
  const isEditing = !!existingPost;

  const [postTitle, setPostTitle] = useState(existingPost?.title || "");
  const [postContent, setPostContent] = useState(existingPost?.body || "");

  const handleSubmit = async () => {
    if (!postTitle.trim() || !postContent.trim()) {
      Alert.alert("Помилка", "Будь ласка, заповніть усі поля.");
      return;
    }

    try {
      if (isEditing) {
        await updatePost(userId, existingPost.id, {
          title: postTitle,
          body: postContent,
        });
      } else {
        await createPost(userId, {
          title: postTitle,
          body: postContent,
        });
      }
      navigation.goBack();
    } catch (error) {
      Alert.alert("Помилка", "Не вдалося зберегти пост.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>
        {isEditing ? "Редагування поста" : "Створення нового поста"}
      </Text>
      <TextInput
        placeholder="Заголовок поста"
        style={styles.input}
        value={postTitle}
        onChangeText={setPostTitle}
        placeholderTextColor="#888"
      />
      <TextInput
        placeholder="Вміст поста"
        style={styles.textArea}
        value={postContent}
        onChangeText={setPostContent}
        multiline
        textAlignVertical="top"
        placeholderTextColor="#888"
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>
          {isEditing ? "Зберегти зміни" : "Опублікувати"}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: "#f9f9f9",
    flexGrow: 1,
  },
  heading: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 24,
    color: "#333",
    textAlign: "center",
  },
  input: {
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#ccc",
    fontSize: 16,
  },
  textArea: {
    height: 150,
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingTop: 12,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "#ccc",
    fontSize: 16,
  },
  button: {
    backgroundColor: "#2196F3",
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
