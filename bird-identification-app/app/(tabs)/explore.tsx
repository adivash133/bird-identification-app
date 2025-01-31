import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { router } from "expo-router";
import React from "react";
import {
  FlatList,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import BIRD_IMAGES from "@/constants/background-images";
import { BIRD_DATA, BirdDataType } from "@/constants/BirdData";
import AppGradient from "@/components/AppGradient";

const Page = () => {
  return (
    <View className="flex-1">
      <AppGradient
        colors={["#161b2e", "#0a4d4a", "#766e67"]}
      >
        {/*Header section with title and subtitle */}
        <View className="mb-6">
          <Text className="text-gray-200 mb-3 font-bold text-4xl text-left">
            Bird exploration
          </Text>
          <Text className="text-indigo-100 text-xl font-medium">
            Start your journey today
          </Text>
        </View>
        {/*Flatlist to display exploration item */}
        <View>
          <FlatList
            data={BIRD_DATA}
            contentContainerStyle={styles.list}
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <Pressable
                onPress={() => router.push(`/photo`)}
                className="h-48 my-3 rounded-md overflow-hidden"
              > 
                {/*Display bird image with overlay gradient */}
                <ImageBackground
                  source={BIRD_IMAGES[item.id - 1]}
                  resizeMode="cover"
                  style={styles.backgroundImage}
                >
                  <LinearGradient
                    colors={["transparent", "rgba(0,0,0,0.8)"]}
                    style={styles.gradient}
                  >
                    <Text className="text-gray-100 text-3xl font-bold text-center">
                      {item.title}
                    </Text>
                  </LinearGradient>
                </ImageBackground>
              </Pressable>
            )}
          />
        </View>
      </AppGradient>
      <StatusBar style="light" />
    </View>
  );
};
// Styles for layout and UI components
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    borderRadius: 10,
    justifyContent: "center",
  },
  gradient: {
    alignItems: "center",
    height: "100%",
    justifyContent: "center",
    width: "100%",
  },
  list: {
    paddingBottom: 150, // Ensures proper spacing at the bottom of the l
  },
});

export default Page;
