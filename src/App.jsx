import { useEffect, useState, useContext } from "react";
import { CartContext } from "./context/appcontext";                                        
import './style.css'

function App(){

  const { productsCart = [], 
          handleCart = () => {}, 
          quantityUpdate = () => {}, 
          handleRemoveCart = () =>{}} = useContext(CartContext)

  //----------------States--------------------
  const [products, setProducts] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [grandtotal, setGrandtotal] = useState(0);
  const [shipping, setShipping] = useState(0);

  //-----------------Fetching products data-------------------

  useEffect(()=>{
    fetch("http://localhost:5173/products.json")
    .then((response)=>response.json())
    .then((result)=>{
      if(result.datas && result.datas.length > 0){
        setProducts(result.datas)
      }
    })
    .catch((error)=> console.log("Error", error))
  }, [])

  //------------------Total calculation of the cart products------------------

  useEffect(()=>{                       
    let cartTotal = 0 
    productsCart.forEach((item)=>{
      cartTotal += item.quantity * item.price                                                 
    })
    setSubtotal(cartTotal.toFixed(2))
    if(cartTotal > 0){
      setShipping(50)
      setGrandtotal(cartTotal += shipping)
    }else{
      setShipping(0)
      setGrandtotal(0)
    }
    setGrandtotal(cartTotal.toFixed(2))
  })
  
  return  <div>
            <div className="container">
              <div className="row">
                <div className="col-7" style={{borderRight: "2px solid #ccc"}}>
                  <div className="row">
                    {products.map((data, index) => (
                      <div className="col-md-4 mt-3 mb-3" key={`${data.id}-${index}`}>
                        <div className="card">
                          <img src={data.image} className="card-img-top" alt={data.title} style={{ width: "200px", height: "200px" }} />
                          <div className="card-body">
                            <h5 className="card-title">{data.title}</h5>
                            <p>{data.category}</p>                            
                            <p>Price: ${data.price}</p>                                                               
                            <a href="#" className="btn btn-primary" onClick={()=>handleCart(data)}>Add to cart</a>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="col-5 mt-3">
                  <div className="cartproducts">
                  <h5 className="text-center">CART</h5>
                    {productsCart.map((cartdata, index)=>(
                      <div className="cart" key={`${cartdata.id}-${index}`}>
                        <div>
                          <img src={cartdata.image} />
                        </div>      
                        <div>
                          <h6>{cartdata.title}</h6>
                          <p>{cartdata.category}</p>
                          <p>Price: ${cartdata.price}</p>
                          <div className="qty">
                            <p>Available stock Qty: <span>120</span></p>
                            <p>Qty:</p>
                            <button className="cartbtn" onClick={()=>quantityUpdate(cartdata.id, "decrement")}>-</button>
                            <input min={1} value={cartdata.quantity}/>
                            <button className="cartbtn" onClick={()=>quantityUpdate(cartdata.id, "increment")}>+</button>
                          </div>
                          <button className="removecart" onClick={()=>handleRemoveCart(cartdata.id)}>Remove from cart</button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="total">
                      <div>
                        <h6>Sub total: ${subtotal}</h6>
                        <h6>Shipping charges: {shipping}</h6> 
                        <h4>Grand total: ${grandtotal}</h4>                     
                      </div>
                      <div>
                        <div>
                          <button>Proceed to pay</button>
                        </div>
                      </div>
                  </div>
                </div>
              </div>
            </div>               
          </div>
}


export default App;