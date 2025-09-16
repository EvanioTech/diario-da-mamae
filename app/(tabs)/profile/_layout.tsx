import { Stack } from "expo-router";

export default function ProfileLayout() {
  return (
    <Stack screenOptions={{ headerShown: false, animation: 'slide_from_bottom' }}>
      <Stack.Screen
        name="index"
        options={{ title: "Meu Perfil" }}
      />
      <Stack.Screen
        name="edit"
        options={{ title: "Editar Perfil" }}
      />
      <Stack.Screen
        name="report"
        options={{ title: "Relatar Problema" }}
      />
      <Stack.Screen
        name="not"
        options={{ title: "Notificações" }}
      />

    </Stack>
  );
}
