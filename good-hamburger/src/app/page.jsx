"use client"
import { useEffect, useState, useMemo } from "react";
import { MenuItemCard } from "./components/MenuItemCard";
import { menuApi } from "./services/menuApi";
import { ShoppingCart } from "./components/ShoppingCart";
import { Filter } from "./components/Filter";
import { OrdersModal } from "./components/OrdersModal";
import { SuccessfullOrderToast } from "./components/SuccessfullOrderToast";
import { Button } from "./components/Button";
import { TitleText } from "./components/TitleText";

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

  const resetShop = () => {
    setSelectedCategory('all')
    setIsShoppingCartOpen(false)
    setShoppingCartItems([])
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

  const removeItemFromCart = (itemId) => {
    setShoppingCartItems(prev => prev.filter((item) => item.id !== itemId));
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
    <div className="flex flex-col min-h-screen h-screen items-center bg-background font-sans px-20 pt-25 pb-10 overflow-hidden">
      <div className="flex w-full h-20 fixed top-0 px-20 bg-white items-center justify-between">
        <h1 className="text-4xl font-bold text-primary-600">Good Hamburger</h1>
        <Button type="" onClick={() => openOrCloseModal()}>Open Orders</Button>
      </div>
      <div className="flex gap-4 w-full h-full overflow-hidden">
        <div className="flex flex-col w-full gap-4 h-full overflow-hidden">
          <div className="flex items-start justify-start w-full">
            <Filter onFilterChange={onFilterChange} selectedCategory={selectedCategory} />
          </div>
          <div className="flex w-full h-full overflow-hidden">
            <div className="flex flex-col gap-4 w-full h-full">
              {isLoading &&
                <div>Loading...</div>
              }
              <TitleText text={selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}></TitleText>
              <div className="flex gap-4 w-full flex-wrap h-full overflow-y-auto">
                {filteredMenu?.map((item, key) => {
                  return (
                    <div key={key} className="flex flex-col">
                      <MenuItemCard item={item} addItemToShoppingCart={addItemToShoppingCart} />
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
        <ShoppingCart resetShop={resetShop} setOrders={setOrders} shoppingCartItems={shoppingCartItems} isShoppingCartOpen={isShoppingCartOpen} toggleShoppingCart={toggleShoppingCart} totalPrice={totalPrice} discountPercentage={discountPercentage} basePrice={basePrice} removeItemFromCart={removeItemFromCart} />
      </div>
      <SuccessfullOrderToast
        message={error}
        type="error"
        isVisible={error}
        onClose={() => setError(false)}
      />
      {modal && <OrdersModal orders={orders} openOrCloseModal={openOrCloseModal} />}
    </div>
  );
}
