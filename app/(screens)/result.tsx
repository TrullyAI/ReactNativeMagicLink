import Loader from "@/components/Loader";
import { COLORS } from "@/constants/Colors";
import { CONFIG } from "@/constants/Config";
import { useLocalSearchParams } from "expo-router";
import { navigate } from "expo-router/build/global-state/routing";
import { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { Result } from "../types/Result";

export default function ResultScreen() {
  const { token } = useLocalSearchParams();
  const [result, setResult] = useState<Result | null>(null);

  useEffect(() => {
    (async () => {
      const res = await fetch(
        `https://sandbox.trully.ai/v2/history/request?magic_link_token=${token}`,
        {
          headers: {
            "content-type": "application/json",
            "x-api-key": CONFIG.API_KEY,
          },
        }
      );

      if (!res.ok) {
        goBack("No se pudo obtener el resultado");
        return;
      }

      const { data } = await res.json();
      const {
        images: {
          selfie,
          document_image: documentFront,
          document_image_back: documentBack,
        },
        response: { label },
      } = data;

      setResult({
        selfie: `data:image/png;base64,${selfie}`,
        documentFront: `data:image/png;base64,${documentFront}`,
        documentBack: `data:image/png;base64,${documentBack}`,
        label,
      });
    })();
  }, [token]);

  const getColor = (label: string) => {
    if (label === "Potential Threat") return COLORS.COPPERFIELD;
    if (label === "Review") return COLORS.PEACH_SCHNAPPS;
    return COLORS.KEPPEL;
  };

  const goBack = (msg: string) => {
    navigate({
      pathname: "/",
      params: {
        error: msg,
      },
    });
  };

  if (!result) return <Loader />;

  return (
    <View style={styles.container}>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>Label:</Text>
        <Text style={{ ...styles.label, color: getColor(result.label) }}>
          {result.label}
        </Text>
      </View>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: result.selfie }}
          style={styles.selfie}
          resizeMode="contain"
        />
      </View>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: result.documentFront }}
          style={styles.doc}
          resizeMode="contain"
        />
        <Image
          source={{ uri: result.documentBack }}
          style={styles.doc}
          resizeMode="contain"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  imageContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    width: "100%",
    gap: 8,
  },
  doc: {
    width: 200,
    height: 150,
  },
  selfie: {
    width: 150,
    height: 200,
  },
  labelContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 16,
  },
  label: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
