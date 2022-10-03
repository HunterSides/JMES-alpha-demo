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
    <Background4>
      <View style={styles.contentContainer}>
        {image ? (
          <Image source={{ uri: image }} style={{ width: 381, height: 254 }} />
        ) : (
          <View
            style={{
              width: 381,
              height: 254,
              backgroundColor: "transparent",
            }}
          />
        )}
        <View style={styles.uploadButtonContainer}>
          <Pressable style={styles.uploadButton} onPress={handleUpload}>
            <Text style={styles.buttonText}>Upload</Text>
          </Pressable>
        </View>
      </View>
      <View style={styles.inputContainer}>
        <View style={styles.titleInputContainer}>
          <Text
            style={{ fontSize: 15, textTransform: "uppercase", color: "white" }}
          >
            Title
          </Text>
          <TextInput
            style={styles.titleInput}
            onChangeText={onChangeTitle}
            value={title}
            placeholder="Enter a title"
          />
        </View>
        <View style={styles.priceInputContainer}>
          <Text
            style={{ fontSize: 15, textTransform: "uppercase", color: "white" }}
          >
            Price
          </Text>
          <TextInput
            style={styles.priceInput}
            onChangeText={onChangePrice}
            value={price}
            placeholder="Enter a price"
          />
        </View>
        <View style={styles.sharesInputContainer}>
          <Text
            style={{ fontSize: 15, textTransform: "uppercase", color: "white" }}
          >
            Shares
          </Text>
          <TextInput
            style={styles.sharesInput}
            onChangeText={onChangeShares}
            value={shares}
            placeholder="Enter # of shares"
          />
        </View>
        <View style={styles.genreInputContainer}>
          <Text
            style={{ fontSize: 15, textTransform: "uppercase", color: "white" }}
          >
            Genre
          </Text>
          <TextInput
            style={styles.genreInput}
            onChangeText={onChangeShares}
            value={null}
            placeholder="Genre"
          />
        </View>
        <View style={styles.aboutInputContainer}>
          <Text
            style={{ fontSize: 15, textTransform: "uppercase", color: "white" }}
          >
            About
          </Text>
          <TextInput
            style={styles.aboutInput}
            onChangeText={onChangeShares}
            value={null}
            placeholder="Money can't buy happiness but it's more comfortable to cry in Mercedes than a bicycle. #deklart #art #mercedes #nft #motivation #success"
          />
        </View>
      </View>

      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <View style={styles.mintButtonContainer}>
        <Pressable
          onPress={async () => {
            await performNFTMint();
            return navigation.navigate("CreateAssetConfirm");
          }}
          style={styles.mintButton}
        >
          <Text style={styles.buttonText}>Mint</Text>
        </Pressable>
      </View>

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </Background4>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  contentContainer: {
    flex: 1,
    width: "100%",
    backgroundColor: "transparent",
  },

  uploadButtonContainer: {
    flexDirection: "row",
    width: 84,
    height: 31,
    paddingBottom: 9,
    paddingTop: 13,
    margin: "auto",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  mintButtonContainer: {
    flexDirection: "row",
    width: 345,
    height: 52,
    paddingBottom: 9,
    paddingTop: 10,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "transparent",
  },

  buttonText: {
    fontSize: 16,
    margin: "auto",
    borderColor: "black",
    textTransform: "uppercase",
    fontFamily: "Roboto_900Black",
  },

  mintButton: {
    backgroundColor: "#FFFFFF",
    borderRadius: 6,
    color: "#000000",
    paddingTop: 17,
    paddingBottom: 16,
    margin: "auto",
    fontSize: 16,
    width: "100%",
    textTransform: "uppercase",
    fontFamily: "Roboto_900Black",
  },

  uploadButton: {
    backgroundColor: "#FFFFFF",
    borderRadius: 6,
    color: "#000000",
    paddingTop: 7,
    paddingBottom: 7,
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: 16,
    width: "100%",
    height: 31,
    textTransform: "uppercase",
    fontFamily: "Roboto_900Black",
  },

  separator: {
    height: 3,
    width: "100%",
  },

  inputContainer: {
    flexDirection: "column",

    alignItems: "flex-end",
    backgroundColor: "#2B2B2B",
    width: 381,
    height: 345,
  },
  titleInputContainer: {
    backgroundColor: "transparent",
    paddingRight: 15,
    paddingTop: 10,
    width: 270,
  },
  titleInput: {
    backgroundColor: "#5B5B5B",
    borderRadius: 6,
    width: "100%",
    height: 34,
  },
  priceInputContainer: {
    backgroundColor: "transparent",
    paddingRight: 15,
    paddingTop: 22,
    paddingBottom: 22,
    width: 161,
  },
  priceInput: {
    backgroundColor: "#5B5B5B",
    borderRadius: 6,
    width: "100%",
    height: 34,
  },
  sharesInputContainer: {
    backgroundColor: "transparent",
    paddingRight: 15,
    paddingBottom: 22,
    width: 161,
  },
  sharesInput: {
    backgroundColor: "#5B5B5B",
    borderRadius: 6,
    width: "100%",
    height: 34,
  },
  genreInputContainer: {
    backgroundColor: "transparent",
    paddingRight: 15,
    paddingBottom: 22,
    width: 205,
  },
  genreInput: {
    backgroundColor: "#5B5B5B",
    borderRadius: 6,
    width: "100%",
    height: 36,
  },
  aboutInputContainer: {
    backgroundColor: "transparent",
    paddingRight: 15,
    paddingBottom: 22,
    width: 275,
  },
  aboutInput: {
    backgroundColor: "#5B5B5B",
    borderRadius: 6,
    width: "100%",
    height: 103,
  },
});
