import React, { useEffect, useState, useContext } from "react";
import {
  View,
  FlatList,
  Text,
  Alert,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { fetchPosts, deletePost } from "../firebase/firebaseDb";
import { AuthContext } from "../contexts/AuthContext";
import PostItem from "../components/PostItem";

export default function PostsListScreen({ navigation }) {
  const { userId, signOut } = useContext(AuthContext);
  const [posts, setPosts] = useState({});
  const [loading, setLoading] = useState(false);

  const loadPosts = async () => {
    setLoading(true);
    try {
      const data = await fetchPosts(userId);
      setPosts(data);
    } catch (error) {
      Alert.alert("Помилка", "Не вдалося завантажити пости");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      loadPosts();
    });
    return unsubscribe;
  }, [navigation]);

  const handleDelete = async (postId) => {
    try {
      await deletePost(userId, postId);
      loadPosts();
    } catch {
      Alert.alert("Помилка", "Не вдалося видалити пост");
    }
  };

  const renderItem = ({ item }) => (
    <PostItem
      post={item}
      onEdit={() => navigation.navigate("PostCreateEdit", { post: item })}
      onDelete={() => handleDelete(item.id)}
    />
  );

  const postsArray = Object.entries(posts).map(([id, post]) => ({
    id,
    ...post,
  }));

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Список постів</Text>

      <TouchableOpacity
        style={styles.createButton}
        onPress={() => navigation.navigate("PostCreateEdit")}
      >
        <Text style={styles.buttonText}>Створити новий пост</Text>
      </TouchableOpacity>

      {loading ? (
        <ActivityIndicator size="large" color="#2196F3" style={styles.loader} />
      ) : (
        <FlatList
          data={postsArray}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          refreshing={loading}
          onRefresh={loadPosts}
          contentContainerStyle={styles.list}
        />
      )}

      <TouchableOpacity style={styles.signOutButton} onPress={signOut}>
        <Text style={styles.buttonText}>Вийти</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    paddingHorizontal: 16,
    paddingTop: 24,
  },
  heading: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 16,
    textAlign: "center",
    color: "#333",
  },
  list: {
    paddingBottom: 20,
  },
  createButton: {
    backgroundColor: "#2196F3",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 16,
  },
  signOutButton: {
    backgroundColor: "#e53935",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 25,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  loader: {
    marginTop: 40,
  },
});
