import { StatusBar } from "expo-status-bar";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import {
  Platform,
  StyleSheet,
  Pressable,
  Image,
  TextInput,
  SafeAreaView,
  Button,
} from "react-native";
import { Text, View } from "../../components/Themed/Themed";
import { useState, useEffect } from "react";
import Background4 from "../../components/Background4/Background4";
import { Navigation } from "../../types";
import { LOCAL_SERVER_PATH } from "../../utils";

type Props = {
  navigation: Navigation;
};

export default function CreateAssetScreen({ navigation }: Props) {
  const [title, onChangeTitle] = useState("");
  const [shares, onChangeShares] = useState("");
  const [price, onChangePrice] = useState("");
  const [image, setImage] = useState(null);

  const handleUpload = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log("Result", result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
    return result;
  };

  const performNFTMint = async function () {
    console.log(`------------------`);
    console.log(`Minting NFT${title}`);
    console.log(`------------------`);
    console.log(`Shares: ${shares}`);
    console.log(`Price: ${price}`);
    console.log(`------------------`);

    try {
      const response = await FileSystem.uploadAsync(
        `http://192.168.0.2:3001/multipart-upload`,
        image,
        {
          headers: {
            "Content-Type": "image/png",
            //"Custom-Header": "WASD",
          },
          httpMethod: "PATCH",
          sessionType: FileSystem.FileSystemSessionType.BACKGROUND,
          uploadType: FileSystem.FileSystemUploadType.MULTIPART,
          fieldName: "photo",
          mimeType: "type",
          parameters: {
            title: title,
            shares: shares,
            price: price,
          },
        }
      );
      console.log("UPLOAD RESPONSE", JSON.stringify(response, null, 4));
      console.log(image, "image");
    } catch (error) {
      console.log("There was an error. See:", error);
    }
    console.log("Created NFT request", title);
    // @ts-ignore
    return navigation.navigate({
      name: "CreateAssetConfirm",
      params: {
        image,
        title,
        price,
        shares,
      },
    });
  };

  return (
    <View style={styles.container}>
      <Background4>
        <Text style={styles.secondTitle}>Title</Text>
        <SafeAreaView>
          <TextInput
            style={styles.input}
            onChangeText={onChangeTitle}
            value={title}
            placeholder="Enter a title"
          />

          <Text style={styles.secondTitle}>Image</Text>
        </SafeAreaView>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "transparent",
          }}
        >
          {image && (
            <Image
              source={{ uri: image }}
              style={{ width: 200, height: 200 }}
            />
          )}
          <Pressable style={styles.button} onPress={handleUpload}>
            <Text style={styles.buttonText}>Upload</Text>
          </Pressable>
        </View>
        <TextInput
          style={styles.input}
          onChangeText={onChangeShares}
          value={shares}
          placeholder="Enter # of shares"
        />
        <TextInput
          style={styles.input}
          onChangeText={onChangePrice}
          value={price}
          placeholder="Enter a price"
        />
        <Pressable
          onPress={async () => {
            await performNFTMint();

            return navigation.navigate("CreateAssetConfirm");
          }}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Mint</Text>
        </Pressable>
        {/* Use a light status bar on iOS to account for the black space above the modal */}
        <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
      </Background4>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 24,

    borderColor: "black",
    textTransform: "uppercase",
    fontFamily: "Roboto_900Black",
  },
  iconImageView: {
    flexDirection: "row",
  },
  button: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: "#FFFFFF",
    borderRadius: 6,
    color: "#000000",
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 25,
    paddingRight: 25,
    fontSize: 24,
    textTransform: "uppercase",
    fontFamily: "Roboto_900Black",
  },
  title: {
    fontSize: 36,
    fontFamily: "Comfortaa_300Light",
  },
  input: {
    backgroundColor: "white",
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  secondTitle: {
    fontSize: 36,
    fontFamily: "Comfortaa_300Light",
    paddingTop: 40,
  },
  balanceJMES: {
    fontWeight: "bold",
    flex: 0,
    fontSize: 24,
    lineHeight: 28,
    paddingTop: 15,
    alignSelf: "center",
    fontFamily: "Roboto_900Black",
    textTransform: "uppercase",
  },
  balanceEUR: {
    fontWeight: "bold",
    flex: 0,
    fontSize: 24,
    lineHeight: 28,
    paddingTop: 15,
    alignSelf: "center",
    fontFamily: "Roboto_900Black",
    textTransform: "uppercase",
  },
  buttonImage: {
    padding: 10,
  },
  iconImage: {
    width: 30,
    height: 30,
    margin: 10,
  },
  section: {
    fontWeight: "bold",
    flex: 1,
    fontSize: 24,
    lineHeight: 28,
    paddingTop: 15,
    alignSelf: "flex-start",
    fontFamily: "Roboto_900Black",
    textTransform: "uppercase",
  },
  noAssetText: {
    fontWeight: "bold",
    flex: 1,
    fontSize: 24,
    lineHeight: 28,
    paddingTop: 15,
    alignSelf: "center",
    fontFamily: "Roboto_900Black",
    textTransform: "uppercase",
  },

  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
