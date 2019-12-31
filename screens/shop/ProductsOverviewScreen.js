import React, { useState, useEffect, useCallback } from "react";
import {
  FlatList,
  Button,
  Platform,
  ActivityIndicator,
  Text,
  View,
  StyleSheet
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import ProductItem from "../../components/shop/ProductItem";
import * as cartActions from "../../store/actions/cart";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../../components/UI/HeaderButton";
import Colors from "../../constants/Colors";
import { fetchProducts } from "./../../store/actions/products";

const ProductsOverviewScreen = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const products = useSelector(state => state.products.availableProducts);
  const dispatch = useDispatch();

  const loadProducts = useCallback(async () => {
    setError(null);
    setIsLoading(true);
    try {
      await dispatch(fetchProducts());
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  }, [dispatch, setIsLoading, setError]);

  useEffect(() => {
    const willFocusSub = props.navigation.addListener("willFocus", () => {
      loadProducts();
      //load Products when it will focus to this screen
    });
    //navigation props not added to dependency to void unecessary reruns 
    return () => {
      willFocusSub.remove()
    }
  }, [loadProducts]);

  useEffect(() => {
    loadProducts();
  }, [dispatch, loadProducts]);

  const selectItemHandler = (id, title) => {
    props.navigation.navigate("ProductDetail", {
      id: id,
      title: title
    });
  };

  if (error) {
    return (
      <View>
        <Text>An error occured</Text>
        <Button
          title="Try again"
          onPress={loadProducts}
          color={Colors.primary}
        />
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  if (!isLoading && products.length === 0) {
    return (
      <View style={styles.centered}>
        <Text>No Product Found</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={products}
      renderItem={({ item }) => (
        <ProductItem
          title={item.title}
          price={item.price}
          image={item.imageUrl}
          onSelect={() => {
            selectItemHandler(item.id, item.title);
          }}
        >
          <Button
            color={Colors.primary}
            title="View Details"
            onPress={() => {
              selectItemHandler(item.id, item.title);
            }}
          />
          <Button
            color={Colors.primary}
            title="To Cart"
            onPress={() => dispatch(cartActions.addToCart(item))}
          />
        </ProductItem>
      )}
    />
  );
};

ProductsOverviewScreen.navigationOptions = ({ navigation }) => {
  return {
    headerTitle: "All Products",
    headerLeft: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          onPress={() => {
            navigation.toggleDrawer();
          }}
          iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
        />
      </HeaderButtons>
    ),
    headerRight: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Cart"
          onPress={() => {
            navigation.navigate("Cart");
          }}
          iconName={Platform.OS === "android" ? "md-cart" : "ios-cart"}
        />
      </HeaderButtons>
    )
  };
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default ProductsOverviewScreen;
