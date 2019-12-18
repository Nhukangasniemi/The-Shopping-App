import React from "react";
import {
  Platform,
  Text,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  TouchableNativeFeedback
} from "react-native";
import DefaultText from './../DefaultText';
import Card from './../UI/Card';

const ProductItem = props => {
  let TouchableCmp = TouchableOpacity;
  if (Platform.OS === "android" && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }
  return (
    <Card style={styles.product}>
      <View style={styles.touchable}>
        <TouchableCmp onPress={props.onSelect} useForeground>
          <View>
            <View style={styles.imageContainer}>
              <Image style={styles.image} source={{ uri: props.image }} />
            </View>
            <View style={styles.details}>
              <DefaultText style={styles.title}>{props.title}</DefaultText>
              <DefaultText style={styles.price}>${parseFloat(props.price).toFixed(2)}</DefaultText>
            </View>
            <View style={styles.action}>
              {props.children}
            </View>
          </View>
        </TouchableCmp>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  product: {
    height: 300,
    margin: 20
  },
  touchable: {
    overflow: "hidden",
    borderRadius: 10
  },
  imageContainer: {
    width: "100%",
    height: "60%",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: "hidden"
  },
  image: {
    width: "100%",
    height: "100%"
  },
  title: {
    fontSize: 18,
    marginVertical: 2
  },
  price: {
    fontSize: 14,
    color: "#888"
  },
  action: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: "23%",
    paddingHorizontal: 20
  },
  details: {
    alignItems: "center",
    height: "17%",
    padding: 10
  }
});

export default ProductItem;
