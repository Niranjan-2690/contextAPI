import {useContext, useEffect, useState} from 'react';
import { appContext } from './context/appcontext';


function App(){
    const appContextData = useContext(appContext);

    const [cartData, setCartData] = useState([]);
    const [cartItem, setCartItem] = useState([]);

    useEffect(()=>{
        fetch("http://localhost:5173/products.json")
        .then((response)=>response.json())
        .then((result)=>{setCartData(result.products)})
    }, [])

    function handleCart(data){
        const cartCopy = [...cartItem].filter((item)=>item.id !== data.id)
        cartCopy.push(data)
        setCartItem(cartCopy)
    }

    return  <div>
                <div className="row">
                    <div className="col-8">
                        <div className='cart-display'>
                            {cartData.map((data, index)=>(
                                <div className='cart-products' key={`${data.id}-${index}`}>
                                <div className="img">
                                    <img src={data.image}/>
                                </div>
                                <div className='cart-content'>
                                    <h6>{data.title}</h6>
                                    <p>{data.category}</p>
                                    <p>Price: ${data.price}</p>
                                </div>
                                <div className='cart-btn'>
                                    <button onClick={()=>handleCart(data)}>Add to cart</button>
                                </div>
                            </div>
                            ))}
                        </div>
                        </div>
                    <div className="col-4 mt-4">
                        <div className="cartitems">
                            {cartItem.map((items, index)=>(
                                <div className="selected-items" key={`${items}-${index}`}>
                                    <div className='selected-image'>
                                        <img src={items.image}></img>
                                    </div>
                                    <div>
                                        <h6>{items.title}</h6>
                                        <p>{items.category}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
}

export default App;