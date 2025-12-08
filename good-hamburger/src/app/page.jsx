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
import { Loading } from "./components/Loading";

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

  const removeItemFromCart = (itemId) => {
    setShoppingCartItems(prev => prev.filter((item) => item.id !== itemId));
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
    <div className="flex flex-col min-h-screen h-fit lg:h-screen items-center bg-background font-sans px-4 lg:px-20 pt-25 pb-10 lg:overflow-hidden">
      <div className="flex w-full h-20 fixed top-0 px-4 lg:px-20 bg-white items-center justify-between">
        <h1 className="text-xl lg:text-4xl font-bold text-primary-600">Good Hamburger</h1>
        <Button type="" onClick={() => openOrCloseModal()}>Open Orders</Button>
      </div>
      <div className="flex flex-col lg:flex-row gap-4 w-full h-fit lg:h-full lg:overflow-hidden">
        <div className="flex flex-col w-full gap-4 h-fit lg:h-full lg:overflow-hidden">
          <div className="flex items-start justify-start w-full">
            <Filter onFilterChange={onFilterChange} selectedCategory={selectedCategory} />
          </div>
          <div className="flex w-full h-fit lg:h-full lg:overflow-hidden">
            <div className="flex flex-col gap-4 w-full h-fit lg:h-full">
              {isLoading &&
                <div className="flex min-w-full min-h-full items-center justify-center">
                  <Loading />
                </div>
              }
              {!isLoading && <TitleText text={selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}></TitleText>}
              <div className="flex flex-col sm:flex-row gap-4 w-full flex-wrap h-fit lg:h-full lg:overflow-y-auto">
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

      <SuccessfullOrderToast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={() => setToast({ isVisible: false, message: '', type: 'success' })}
      />
    </div>
  );
}
