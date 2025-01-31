import { Link } from "expo-router";
import React from "react";
import { View, StyleSheet } from "react-native";

const Page = () => {
  return (
    <View style={styles.container}>
      <Link href="/(tabs)/explore">Lets explore bird!</Link>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default Page;
