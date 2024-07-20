import React, {createContext, useState} from 'react';

export const CartContext = createContext({
  productsCart: [], 
  handleCart: ()=>{},
  quantityUpdate: ()=>{},
  handleRemoveCart: ()=>{}
})

function CartContextProvider({children}){

  //----------------State--------------------

  const [productsCart, setProductsCart] = useState([]);

  //----------------Adding to the cart-----------------------------

  function handleCart(data){                                                                
    console.log("handlecart", data)
    const productsCartCopy = [...productsCart].filter((item)=>item.id !== data.id);
    productsCartCopy.push(data)
    data.quantity = 1;
    setProductsCart(productsCartCopy);
  }

  //---------------Quantity change in the cart-------------------------

  function quantityUpdate(id, type) {
    let cartCopy = [...productsCart];
    let itemIndex = cartCopy.findIndex((item) => item.id === id);
    if (itemIndex >= 0) {
      let item = cartCopy[itemIndex];
      if (type === "increment") {
      item.quantity += 1;
      } else {
      item.quantity -= 1;
      }
      setProductsCart(cartCopy);
    }
    }

  //------------------Removing products from the cart--------------------

    function handleRemoveCart(id){
			let removeCartCopy = [...productsCart].filter((item)=>item.id !== id)
			setProductsCart(removeCartCopy)
		 }

    //-----------------------------------------------------------------

  return  <CartContext.Provider value={{productsCart, handleCart, quantityUpdate, handleRemoveCart}}>
              {children}
          </CartContext.Provider>
}                               

export default CartContextProvider;