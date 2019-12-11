import React from "react";
import { FlatList, Text } from "react-native";
import { useSelector } from "react-redux";
import ProductItem from "../../components/shop/ProductItem";

const ProductsOverviewScreen = () => {
  const products = useSelector(state => state.products.availableProducts);
  return (
    <FlatList
      data={products}
      renderItem={itemData => (
        <ProductItem
          title={itemData.item.title}
          price={itemData.item.price}
          image={itemData.item.imageUrl}
          onViewDetail={() => {
            props.navigation.navigate({ routeName: "ProductDetail" });
          }}
          onAddToCart={() => {}}
        />
      )}
    />
  );
};

ProductsOverviewScreen.navigationOptions = {
  headerTitle: "All Products"
};

export default ProductsOverviewScreen;
