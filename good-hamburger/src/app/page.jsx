"use client"
import { useEffect, useState, useMemo } from "react";
import { MenuItemCard } from "./components/MenuItemCard";
import { menuApi } from "./services/menuApi";
import { ShoppingCart } from "./components/ShoppingCart";
import { Filter } from "./components/Filter";

export default function Home() {

  const [menu, setMenu] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [orders, setOrders] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isShoppingCartOpen, setIsShoppingCartOpen] = useState(false)
  const [shoppingCartItems, setShoppingCartItems] = useState([])
  const [error, setError] = useState("")
  const menuApiInstance = new menuApi()
  const [modal, setModal] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        const data = await menuApiInstance.getMenuData()

        setMenu(data)
      } catch (error) {
        console.error("Error: ", error)
      } finally {
        setIsLoading(false)
      }
    };

    fetchData()
  }, [])

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError("");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [error])

  const toggleShoppingCart = () => {
    setIsShoppingCartOpen(!isShoppingCartOpen)
  }


  const openOrCloseModal = () => setModal(!modal)

  const addItemToShoppingCart = (id, category) => {
    setError("")

    if (category === "sandwich") {
      const sandwichInOrder = shoppingCartItems.some((item) => item.category === category)
      if (sandwichInOrder) {
        setError("You can't add more than one sandwich")
        return
      }
    }

    if (category === "extra") {
      const idInOrder = shoppingCartItems.some((item) => item.id === id)
      if (idInOrder) {
        setError("You can't add more than one of this item")
        return
      }
    }

    const item = menu.find((item) => item.id === id);
    if (item) {
      setShoppingCartItems(prev => [...prev, item]);
    }
  }

  const onFilterChange = (category) => {
    setSelectedCategory(category);
  }

  const filteredMenu = selectedCategory === 'all'
    ? menu
    : menu.filter((item) => item.category === selectedCategory);


  const basePrice = useMemo(() => {
    return shoppingCartItems.reduce((total, item) => total + item.price, 0);
  }, [shoppingCartItems]);

  const { totalPrice, discountPercentage } = useMemo(() => {
    const sandwichCount = shoppingCartItems.filter(item => item.category === "sandwich").length;
    const extraCount = shoppingCartItems.filter(item => item.category === "extra").length;

    if (sandwichCount === 1 && extraCount === 2) {
      return { totalPrice: basePrice * 0.8, discountPercentage: 20 };
    }

    if (sandwichCount === 1 && extraCount === 1) {
      return { totalPrice: basePrice * 0.85, discountPercentage: 15 };
    }

    if (extraCount === 2) {
      return { totalPrice: basePrice * 0.9, discountPercentage: 10 };
    }

    return { totalPrice: basePrice, discountPercentage: 0 };
  }, [basePrice, shoppingCartItems]);


  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-zinc-50 font-sans">
      <h1 className="text-4xl font-bold text-black">Good Hamburger</h1>
      <div className="flex items-start justify-start w-full px-[2rem]">
        <Filter onFilterChange={onFilterChange} />
      </div>
      <div className="flex">
        <div>
          {error &&
            <div className="text-red-500">{error}</div>
          }
        </div>
        <div>
          {isLoading &&
            <div>Loading...</div>
          }
          {filteredMenu.map((item, key) => {
            return (
              <div key={key} className="flex flex-col">
                <MenuItemCard item={item} addItemToShoppingCart={addItemToShoppingCart} />
              </div>
            )
          })}
        </div>
        <ShoppingCart setOrders={setOrders} shoppingCartItems={shoppingCartItems} isShoppingCartOpen={isShoppingCartOpen} toggleShoppingCart={toggleShoppingCart} totalPrice={totalPrice} discountPercentage={discountPercentage} basePrice={basePrice} />
        <button className='absolute bottom-4 cursor-pointer right-4 w-fit h-fit px-4 py-2 rounded-full bg-green-600 text-white shadow-lg disabled:bg-gray-400 disabled:cursor-not-allowed' onClick={() => openOrCloseModal()}>Open Orders</button>
      </div>
    </div>
  );
}
