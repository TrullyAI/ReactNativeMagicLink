import Loader from "@/components/Loader";
import { COLORS } from "@/constants/Colors";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Camera } from "expo-camera";
import * as Location from "expo-location";
import { useLocalSearchParams } from "expo-router";
import { navigate } from "expo-router/build/global-state/routing";
import React, { useEffect, useState } from "react";
import { Modal, Pressable, StyleSheet, View } from "react-native";
import { WebView } from "react-native-webview";

export default function WebViewScreen() {
  const { url } = useLocalSearchParams();
  const [isReady, setIsReady] = useState(false);
  const [modalVisible, setModalVisible] = useState(true);

  useEffect(() => {
    (async () => {
      // Solicitar permisos de cámara
      const { status: cameraStatus } =
        await Camera.requestCameraPermissionsAsync();

      // Solicitar permisos de ubicación
      const { status: locationStatus } =
        await Location.requestForegroundPermissionsAsync();

      if (cameraStatus !== "granted" || locationStatus !== "granted") {
        console.error(
          "Permisos requeridos",
          "La app necesita acceso a la cámara y ubicación para funcionar correctamente."
        );
      }

      setIsReady(cameraStatus === "granted" && locationStatus === "granted");
    })();
  }, []);

  const handleClose = async () => {
    navigate("/result");
  };

  if (!isReady) return <Loader />;

  return (
    <Modal
      visible={modalVisible}
      animationType="slide"
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Pressable onPress={handleClose} style={styles.closeButton}>
          <AntDesign name="close" size={24} color={COLORS.SHARK} />
        </Pressable>

        <WebView
          source={{
            uri: url as string,
          }}
          allowsInlineMediaPlayback={true}
          mediaPlaybackRequiresUserAction={false}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          startInLoadingState={true}
          mixedContentMode="compatibility"
          androidHardwareAccelerationDisabled={false}
          geolocationEnabled={true}
          mediaCapturePermissionGrantType="grantIfSameHostElsePrompt"
        />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  closeButton: {
    padding: 16,
  },
  webview: {
    flex: 1,
  },
});
