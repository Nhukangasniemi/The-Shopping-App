import React from "react";
import { FlatList, Button, Platform } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import ProductItem from "../../components/shop/ProductItem";
import * as cartActions from "../../store/actions/cart";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../../components/UI/HeaderButton";
import Colors from '../../constants/Colors'

const ProductsOverviewScreen = props => {
  const products = useSelector(state => state.products.availableProducts);
  const dispatch = useDispatch();

  const selectItemHandler = (id, title) => {
    props.navigation.navigate("ProductDetail", {
      id: id,
      title: title
    });
  };

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

export default ProductsOverviewScreen;
