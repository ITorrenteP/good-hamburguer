"use client"
import { useEffect, useState, useMemo } from "react";
import { MenuItemCard } from "./components/MenuItemCard";
import { menuApi } from "./services/menuApi";
import { ShoppingCart } from "./components/ShoppingCart";
import { Filter } from "./components/Filter";

export default function Home() {

  const [menu, setMenu] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [isLoading, setIsLoading] = useState(true)
  const [isShoppingCartOpen, setIsShoppingCartOpen] = useState(false)
  const [shoppingCartItems, setShoppingCartItems] = useState([])
  const menuApiInstance = new menuApi()

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

  const addItemToShoppingCart = (id) => {
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



  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-zinc-50 font-sans">
      <h1 className="text-4xl font-bold">Good Hamburger</h1>
      <div className="flex items-start justify-start w-full px-[2rem]">
        <Filter onFilterChange={onFilterChange} />
      </div>
      <div className="flex">
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
        <ShoppingCart shoppingCartItems={shoppingCartItems} isShoppingCartOpen={isShoppingCartOpen} toggleShoppingCart={toggleShoppingCart} />
      </div>
    </div>
  );
}
