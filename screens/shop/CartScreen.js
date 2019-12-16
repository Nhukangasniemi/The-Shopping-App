import React from "react";
import { StyleSheet, View, Text, FlatList, Button } from "react-native";
import { useSelector } from "react-redux";
import { useSelector } from "react-redux";
import { useSelector } from "react-redux";
import DefaultText from './../../components/DefaultText';
import Colors from "../../constants/Colors";

const CartScreen = () => {
  const cartTotalAmount = useSelector(state => state.cart.totalAmount);
  return (
    <View style={styles.screen}>
      <View style={styles.summary}>
        <DefaultText style={styles.summaryText}>
          Total: <DefaultText style={styles.amount}>${cartTotalAmount}</DefaultText>
        </DefaultText>
        <Button title="Order Now" />
      </View>
      <View>
        <DefaultText>CART ITEMS</DefaultText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    margin: 20
  },
  summary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    padding: 10,
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: "white",
  },
  summaryText: {
    fontSize: 18,
    fontFamily: 'open-sans-bold'
  },
  amount: {
    color: Colors.accent
  }
});

export default CartScreen;
