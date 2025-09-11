import { View, Text, Button } from "react-native";
import { router } from "expo-router";

export default function Profile() {
  return (
    <View>
      <Text>Meu Perfil</Text>
      <Button title="Editar Perfil" onPress={() => router.push("/profile/edit")} />
      <Button title="Histórico" onPress={() => router.push("/profile/report")} />
    </View>
  );
}