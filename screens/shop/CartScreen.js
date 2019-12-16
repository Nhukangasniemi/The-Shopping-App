import React from "react";
import { StyleSheet, View, Text, FlatList, Button } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import DefaultText from "./../../components/DefaultText";
import Colors from "../../constants/Colors";
import CartItem from "../../components/shop/CartItem";
import { removeFromCart } from "../../store/actions/cart";

const CartScreen = () => {
  const cartTotalAmount = useSelector(state =>
    state.cart.totalAmount.toFixed(2)
  );
  const cartItems = useSelector(state => {
    const transformedCartItems = [];
    for (const key in state.cart.items) {
      transformedCartItems.push({
        productId: key,
        productTitle: state.cart.items[key].productTitle,
        productPrice: state.cart.items[key].productPrice,
        quantity: state.cart.items[key].quantity,
        sum: state.cart.items[key].sum
      });
    }
    return transformedCartItems.sort((a, b) =>
      a.productId > b.productId ? 1 : -1
    );
  });
  const dispatch = useDispatch();

  return (
    <View style={styles.screen}>
      <View style={styles.summary}>
        <DefaultText style={styles.summaryText}>
          Total:{" "}
          <DefaultText style={styles.amount}>${cartTotalAmount}</DefaultText>
        </DefaultText>
        <Button
          color={Colors.accent}
          title="Order Now"
          disabled={cartItems.length === 0}
        />
      </View>
      <View>
        <FlatList
          data={cartItems}
          keyExtractor={item => item.productId}
          renderItem={({ item }) => (
            <CartItem
              quantity={item.quantity}
              title={item.productTitle}
              amount={item.sum}
              onRemove={() => dispatch(removeFromCart(item.productId))}
            />
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    margin: 20
  },
  summary: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    padding: 10,
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: "white"
  },
  summaryText: {
    fontSize: 18,
    fontFamily: "open-sans-bold"
  },
  amount: {
    color: Colors.primary
  }
});

export default CartScreen;
