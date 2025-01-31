import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { FlatList } from "react-native";

const PhotoIdentification = () => {
  // State for storing the selected image URI
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  // State for storing analysed birds with their identified names
  const [analyzedBirds, setAnalyzedBirds] = useState<
    { image: string; name: string }[]
  >([]);
  // Function to allow users to pick an image from the device gallery
  const handlePickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  // Function to analyse the selected image - (placeholder for actual analysis logic)
  const handleAnalyzePhoto = () => {
    if (!selectedImage) {
      Alert.alert("No Image was selected", "Please upload an image");
      return;
    }
    // Simulated analysis result - cnn model here
    const birdName = "Bird Name";
    // Add the analysed image and its name to list of identified birds
    setAnalyzedBirds((prevBirds) => [
      ...prevBirds,
      { image: selectedImage, name: birdName },
    ]);

    // Reset the selected image after analysis
    setSelectedImage(null);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Photo Identification</Text>
      <Text style={styles.instructions}>
        Please upload an image of the species of bird you wish to identify
      </Text>
      {/* Display selected image or placeholder message*/}
      <View style={styles.imageContainer}>
        {selectedImage ? (
          <Image source={{ uri: selectedImage }} style={styles.image} />
        ) : (
          <Text style={styles.placeHolderText}>No image selected</Text>
        )}
      </View>

      {/* Button to pick an image*/}
      <TouchableOpacity style={styles.button} onPress={handlePickImage}>
        <Text style={styles.buttonText}>Upload Image</Text>
      </TouchableOpacity>
      {/* Button to analyse the selected image*/}
      <TouchableOpacity
        style={[styles.button, styles.analyzeButton]}
        onPress={handleAnalyzePhoto}
      >
        <Text style={styles.buttonText}>Analyze Image</Text>
      </TouchableOpacity>

      {/* Display the list of identified birds*/}

      <FlatList
        data={analyzedBirds}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.birdItem}>
            <Image source={{ uri: item.image }} style={styles.birdImage} />
            <Text style={styles.birdName}>{item.name}</Text>
          </View>
        )}
        ListHeaderComponent={() =>
          analyzedBirds.length > 0 && (
            <Text style={styles.analyzedBirdsTitle}>Identified Birds</Text>
          )
        }
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

// Styles for UI elements
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  instructions: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 20,
  },
  imageContainer: {
    width: 200,
    height: 200,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 12,
  },
  placeHolderText: {
    fontSize: 14,
    color: "#aaa",
  },
  button: {
    backgroundColor: "#007bFF",
    padding: 15,
    borderRadius: 8,
    width: "80%",
    alignItems: "center",
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },
  analyzeButton: {
    backgroundColor: "#28a745",
  },
  analyzedBirdsTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
    color: "#333",
  },
  listContainer: {
    width: "100%",
    paddingBottom: 20,
  },
  birdItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 8,
    width: "100%",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  birdImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 10,
  },
  birdName: {
    fontSize: 16,
    color: "#333",
    flex: 1,
    textAlign: "left",
  },
});

export default PhotoIdentification;
