import { StatusBar } from "expo-status-bar";
import { useState, useEffect } from "react";
import {
  Platform,
  StyleSheet,
  Button,
  Pressable,
  SafeAreaView,
  Image,
  ScrollView,
} from "react-native";

import { Text, View } from "../../components/Themed/Themed";
import Background4 from "../../components/Background4/Background4";
import {
  useFonts,
  Comfortaa_300Light,
  Comfortaa_400Regular,
  Comfortaa_500Medium,
  Comfortaa_600SemiBold,
  Comfortaa_700Bold,
} from "@expo-google-fonts/comfortaa";
import { Roboto_500Medium, Roboto_900Black } from "@expo-google-fonts/roboto";
import { Navigation } from "../../types";

type Props = {
  navigation: Navigation;
};

export default function HomeScreen({ navigation }: Props) {
  const [assets, setAssets] = useState([
    {
      key: 1,
      name: "Abstract",
      uri: require("../../assets/images/genres/Abstract.jpeg"),
    },
    {
      key: 2,
      name: "Collage",
      uri: require("../../assets/images/genres/Collage.jpg"),
    },
  ]);

  let [fontsLoaded] = useFonts({
    Comfortaa_300Light,
    Comfortaa_400Regular,
    Comfortaa_500Medium,
    Comfortaa_600SemiBold,
    Comfortaa_700Bold,
    Roboto_500Medium,
    Roboto_900Black,
  });
  /**
   *  <ScrollView>
          {assets.map((item) => {
            return (
              <View
                key={item.key}
                style={{
                  paddingBottom: 21,
                  backgroundColor: "transparent",
                }}
              >
                <Image source={item.uri} style={{ width: 375, height: 267 }} />
                <Text
                  style={{
                    textAlign: "left",
                    fontSize: 20,
                    paddingTop: 5,
                    paddingLeft: 4,
                  }}
                >
                  {item.name}
                </Text>
              </View>
            );
          })}
        </ScrollView>
   */
  return (
    <View style={styles.container}>
      <Background4>
        <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
        {/* Use a light status bar on iOS to account for the black space above the modal */}
      </Background4>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
