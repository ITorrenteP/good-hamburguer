"use client"
import { useEffect, useState, useMemo } from "react";
import { MenuItemCard } from "./components/MenuItemCard";
import { menuApi } from "./services/menuApi";
import { ShoppingCart } from "./components/ShoppingCart";
import { Filter } from "./components/Filter";
import { OrdersModal } from "./components/OrdersModal";
import { Button } from "./components/Button";

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
    <div className="min-h-screen bg-linear-to-br from-amber-50 via-orange-50 to-red-50">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl sm:text-4xl font-extrabold bg-linear-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              🍔 Good Burger
            </h1>
            <Button 
              variant="primary"
              size="md"
              className="rounded-full"
              onClick={() => openOrCloseModal()}
            >
              Orders ({orders.length})
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <Filter onFilterChange={onFilterChange} selectedCategory={selectedCategory} />
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg shadow-sm">
            <p className="text-red-700 font-medium">{error}</p>
          </div>
        )}

        {isLoading && (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
          </div>
        )}

        {!isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
            {filteredMenu.map((item, key) => (
              <MenuItemCard 
                key={key} 
                item={item} 
                addItemToShoppingCart={addItemToShoppingCart} 
              />
            ))}
          </div>
        )}

        {!isLoading && filteredMenu.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">No items found in this category</p>
          </div>
        )}
      </main>

      <ShoppingCart 
        resetShop={resetShop} 
        setOrders={setOrders} 
        shoppingCartItems={shoppingCartItems} 
        isShoppingCartOpen={isShoppingCartOpen} 
        toggleShoppingCart={toggleShoppingCart} 
        totalPrice={totalPrice} 
        discountPercentage={discountPercentage} 
        basePrice={basePrice} 
      />

      {modal && <OrdersModal orders={orders} openOrCloseModal={openOrCloseModal} />}
    </div>
  );
}
