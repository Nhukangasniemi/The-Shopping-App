export const ADD_ORDER = "ADD_ORDER";

export const addOrder = (cartItems, totalAmount) => async dispatch => {
  const response = await fetch(
    "https://the-shopping-app-7385a.firebaseio.com/products.json",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title,
        description,
        imageUrl,
        price
      })
    }
  );

  const resData = await response.json();
  dispatch({
    type: ADD_ORDER,
    orderData: {
      items: cartItems,
      amount: totalAmount
    }
  });
};
