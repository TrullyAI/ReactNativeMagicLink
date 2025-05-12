import Loader from "@/components/Loader";
import { COLORS } from "@/constants/Colors";
import { CONFIG } from "@/constants/Config";
import { Text } from "@react-navigation/elements";
import { useLocalSearchParams } from "expo-router";
import { navigate } from "expo-router/build/global-state/routing";
import { useEffect, useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";

export default function HomeScreen() {
  const { error } = useLocalSearchParams();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (error) console.error(error);
  }, [error]);

  const handlePress = async () => {
    setLoading(true);
    const res = await getUrl();

    if (!res) {
      console.error("Error al crear el magic link");
      setLoading(false);
      return;
    }

    const { magic_link_url, token } = res;

    navigate({
      pathname: "/webview",
      params: {
        url: magic_link_url,
        token,
      },
    });
  };

  const getUrl = async () => {
    const res = await fetch("https://sandbox.trully.ai/v1/magic-link", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": CONFIG.API_KEY,
      },
      body: JSON.stringify({
        one_time_only: true,
        external_id: CONFIG.USER_ID,
        metadata: {
          redirect_url: CONFIG.REDIRECT_URL, // Necessary for Deep Linking
        },
      }),
    });

    if (!res.ok) return null;

    const data = await res.json();

    const {
      data: { magic_link_url, token },
    } = data;

    return { magic_link_url, token };
  };

  if (loading) return <Loader />;

  return (
    <View style={styles.container}>
      <Pressable style={styles.button} onPress={handlePress}>
        <Text style={styles.buttonText}>Crear Magic Link</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 16,
    paddingRight: 16,
    backgroundColor: COLORS.DODGER_BLUE,
    borderRadius: 52,
  },
  buttonText: {
    color: COLORS.WHITE,
    fontSize: 16,
    fontWeight: "semibold",
  },
});
