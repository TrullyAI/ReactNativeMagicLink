import Loader from "@/components/Loader";
import { Camera } from "expo-camera";
import * as ExpoLinking from "expo-linking";
import * as Location from "expo-location";
import { useLocalSearchParams } from "expo-router";
import { navigate } from "expo-router/build/global-state/routing";
import React, { useCallback, useEffect, useState } from "react";
import { View } from "react-native";
import { WebView } from "react-native-webview";

export default function WebViewScreen() {
  const { url, token } = useLocalSearchParams();
  const [isReady, setIsReady] = useState(false);

  // In order to use the WebView, we need to request camera and location permissions
  // and check if the user has granted them. If not, the process will not work.
  useEffect(() => {
    (async () => {
      // Ask for camera permissions
      const { status: cameraStatus } =
        await Camera.requestCameraPermissionsAsync();

      // Ask for location permissions
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

  const handleDeepLink = useCallback(
    (url: string) => {
      const route = url.replace(/.*?:\/\//g, "");

      // Check if the URL contains the correct redirect URL
      if (route.startsWith("result"))
        navigate({ pathname: "/result", params: { token } });
    },
    [token]
  );

  // We use Deep Linking to handle the redirect from the WebView
  // and navigate to the result screen.
  useEffect(() => {
    const subscription = ExpoLinking.addEventListener("url", ({ url }) => {
      handleDeepLink(url);
    });

    return () => subscription.remove();
  }, [handleDeepLink]);

  if (!isReady) return <Loader />;

  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
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
  );
}
