import { Stack } from "expo-router";

export default function ExploreLayout() {
  return (
    <Stack screenOptions={{ headerShown: false, animation: 'fade' }}>
      <Stack.Screen
        name="index"
        options={{ title: "Meu Perfil" }}
      />
      <Stack.Screen
        name="tete"
        options={{ title: "Editar Perfil" }}
      />
      <Stack.Screen
        name="coco"
        options={{ title: "Relatar Problema" }}
      />
      <Stack.Screen
        name="remedios"
        options={{ title: "Configurações" }}
      />
      <Stack.Screen
        name="banho"
        options={{ title: "Sobre o App" }}
      />
    </Stack>
  );
}
