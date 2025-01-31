// main application component that displays to user a welcome screen for the Bird Biodiversity app
import {
  View,
  Text,
  StyleSheet,
  Touchable,
  TouchableOpacity,
  Image,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

const App = () => {
  const router = useRouter(); // Navigation hook from the Expo Router
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Bird Biodiversity</Text>
      <Text style={styles.subheading}>
        Connecting citizens with the outside world
      </Text>
      {/*Display a cartoon bird image as a part of the welcome screen */}
      <Image
        source={require("/Users/adi/Desktop/MSC/bird-identification-app/assets/cartoon-bird.jpg")}
        style={styles.birdImage}
      />
      {/*Button to navigate to the explore screen */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/explore")}
      >
        <Text style={styles.buttonText}>Welcome</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

//Stylesheet for the application's welcome screen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 20,
  },
  text: {
    fontSize: 20,
    color: "black",
    fontWeight: "bold",
    marginTop: 20,
  },
  subheading: {
    fontSize: 15,
    color: "gray",
    marginTop: 10,
    textAlign: "center",
  },
  birdImage: {
    width: 150,
    height: 150,
    marginTop: 200,
    marginBottom: 30,
    borderRadius: 8,
    textAlign: "center",
  },
  button: {
    position: "absolute", // Positioned at the bottom-right of the screen
    bottom: 20,
    right: 20,
    backgroundColor: "#4CAF50",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default App;
