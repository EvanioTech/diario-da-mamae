import { router } from "expo-router";
import React, {useEffect, useRef} from "react";
import { View, StyleSheet, Animated } from "react-native";

export default function Splash() {
  const fadeAnim = useRef(new Animated.Value(0)).current;

 useEffect(() => {
    // Animação de fade-in
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    }).start();

    // Depois de 2,5s, vai para o Login
    const timeout = setTimeout(() => {
      router.replace("/");
    }, 2500);

    return () => clearTimeout(timeout);
  }, [fadeAnim, router]);

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require("../assets/images/splash.png")}
        style={[styles.logo, { opacity: fadeAnim }]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fcf7f7", // Cor de fundo enquanto carrega
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
    
  },
});