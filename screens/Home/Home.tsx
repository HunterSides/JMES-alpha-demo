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
    {
      key: 3,
      name: "Design",
      uri: require("../../assets/images/genres/Design.jpeg"),
    },
    {
      key: 4,
      name: "Digital",
      uri: require("../../assets/images/genres/Digital.jpeg"),
    },
    {
      key: 5,
      name: "Expressionism",
      uri: require("../../assets/images/genres/Expressionism.jpeg"),
    },
    {
      key: 6,
      name: "Generative",
      uri: require("../../assets/images/genres/Generative.png"),
    },
    {
      key: 7,
      name: "Impressionsim",
      uri: require("../../assets/images/genres/Impressionsim.jpeg"),
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

  return (
    <View style={styles.container}>
      <Background4>
        <ScrollView>
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
  title: {
    color: "#FFF",
    fontSize: 36,
    fontFamily: "Comfortaa_300Light",
  },
  description: {
    fontWeight: "bold",
    flex: 0,
    color: "#FFF",
    fontSize: 16,
    lineHeight: 18,
    paddingTop: 15,
    // alignSelf: "flex-start",
    fontFamily: "Roboto_500Medium",
    textTransform: "uppercase",
    width: "70%",
    alignSelf: "center",
  },
  section: {
    fontWeight: "bold",
    color: "#FFF",
    flex: 0,
    fontSize: 24,
    lineHeight: 28,
    paddingTop: 15,
    paddingBottom: 25,
    // alignSelf: "flex-start",
    textTransform: "uppercase",
    width: "70%",
    alignSelf: "center",
    textAlign: "center",
    fontFamily: "Roboto_500Medium",
    textTransform: "uppercase",
  },
  item: {
    fontWeight: "bold",
    color: "#FFF",
    alignSelf: "center",
  },

  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
