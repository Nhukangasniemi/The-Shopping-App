import React from "react";
import { FlatList, Platform, Button } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import ProductItem from "../../components/shop/ProductItem";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../../components/UI/HeaderButton";
import Colors from "../../constants/Colors";
import { deleteProduct } from "../../store/actions/products";

export const UserProductsScreen = props => {
  const userProducts = useSelector(state => state.products.userProducts);
  const dispatch = useDispatch();

  const editProductHandler = id => {
    props.navigation.navigate("EditProduct", {
      productId: id
    });
  };
  return (
    <FlatList
      data={userProducts}
      renderItem={({ item }) => (
        <ProductItem
          price={item.price}
          title={item.title}
          price={item.price}
          image={item.imageUrl}
          onSelect={() => {
            editProductHandler(item.id);
          }}
        >
          <Button
            color={Colors.primary}
            title="Edit"
            onPress={() => {
              editProductHandler(item.id);
            }}
          />
          <Button
            color={Colors.primary}
            title="Delete"
            onPress={() => {
              dispatch(deleteProduct(item.id));
            }}
          />
        </ProductItem>
      )}
    />
  );
};

UserProductsScreen.navigationOptions = ({ navigation }) => {
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
          title="Add"
          onPress={() => {
            navigation.navigate('EditProduct')
          }}
          iconName={Platform.OS === "android" ? "md-create" : "ios-create"}
        />
      </HeaderButtons>
    )
  };
};

export default UserProductsScreen;
