"use client"
import { useEffect, useState, useMemo } from "react";
import { MenuItemCard } from "./components/MenuItemCard";
import { menuApi } from "./services/menuApi";
import { ShoppingCart } from "./components/ShoppingCart";
import { Filter } from "./components/Filter";
import { OrdersModal } from "./components/OrdersModal";
import { Button } from "./components/Button";
import { calculateDiscount } from "./utils/discountCalculator";
import { SuccessfullOrderToast } from "./components/SuccessfullOrderToast";

export default function Home() {

  const [menu, setMenu] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [orders, setOrders] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isShoppingCartOpen, setIsShoppingCartOpen] = useState(false)
  const [shoppingCartItems, setShoppingCartItems] = useState([])
  const [toast, setToast] = useState({ isVisible: false, message: '', type: 'success' })
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
    if (category === "sandwich") {
      const sandwichInOrder = shoppingCartItems.some((item) => item.category === category)
      if (sandwichInOrder) {
        setToast({ isVisible: true, message: "You can't add more than one sandwich", type: 'error' })
        return
      }
    }

    if (category === "extra") {
      const idInOrder = shoppingCartItems.some((item) => item.id === id)
      if (idInOrder) {
        setToast({ isVisible: true, message: "You can't add more than one of this item", type: 'error' })
        return
      }
    }

    const item = menu.find((item) => item.id === id);
    if (item) {
      setShoppingCartItems(prev => [...prev, item]);
      setToast({ isVisible: true, message: `${item.name} added to cart!`, type: 'success' })
    }
  }

  const removeItemFromCart = (itemId) => {
    const item = shoppingCartItems.find((item) => item.id === itemId);
    if (item) {
      setShoppingCartItems(prev => prev.filter((item) => item.id !== itemId));
      setToast({ isVisible: true, message: `${item.name} removed from cart`, type: 'success' })
    }
  }

  const onFilterChange = (category) => {
    setSelectedCategory(category);
  }

  const filteredMenu = selectedCategory === 'all'
    ? menu
    : menu.filter((item) => item.category === selectedCategory);


  const { totalPrice, discountPercentage, basePrice } = useMemo(() => {
    return calculateDiscount(shoppingCartItems);
  }, [shoppingCartItems]);


  return (
    <div className="min-h-screen bg-linear-to-br from-amber-50 via-orange-50 to-red-50">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl sm:text-4xl font-extrabold bg-linear-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              Good Hamburger
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
        removeItemFromCart={removeItemFromCart}
      />

      {modal && <OrdersModal orders={orders} openOrCloseModal={openOrCloseModal} />}

      <SuccessfullOrderToast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={() => setToast({ isVisible: false, message: '', type: 'success' })}
      />
    </div>
  );
}
