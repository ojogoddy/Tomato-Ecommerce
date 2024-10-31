import { ReactNode, createContext, useEffect, useState } from "react";
import { food_list } from "../assets/frontend_assets/assets";
interface FoodItemType{
    _id: string;
    name: string;
    description: string;
    price: number;
    image: string;
}

interface StoreContextType{
    food_list: FoodItemType[]
}

export const StoreContext = createContext<StoreContextType | null>(null)

interface StoreContextProviderProps{
    children: ReactNode
}

//store context provider function
const StoreContextProvider:React.FC<StoreContextProviderProps> =({children}) =>{
    const [cartItems, setCartItems] = useState({})

    const addToCart = (itemId) =>{
        if(!cartItems[itemId]){
            setCartItems((prev)=>({...prev, [itemId]: 1}))
        }else{
            setCartItems(prev => ({...prev, [itemId]:prev[itemId] + 1}))
        }
    }
    const removeFromCart = (itemId) =>{
        setCartItems(prev => ({...prev, [itemId]: prev[itemId] - 1}))
    }
    useEffect(()=>{
        console.log(cartItems)
    },[cartItems])

    const contextValue: StoreContextType ={
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart
    }
    return(
        <StoreContext.Provider value={contextValue}>
            {children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider
