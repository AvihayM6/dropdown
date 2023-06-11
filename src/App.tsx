import React, { useEffect, useState } from 'react';
import {Dropdown} from './components/Dropdown/Dropdown'
import './style/App.css'
import {Card} from './components/Card'
import {Summary} from './components/Summary'

type Product = {
  id: string
  selected: boolean
  name?: string
  color?: string
  price?: number
  stock?: number
  totalPrice?: number
  userQuantity?: number
}

export const App = () => {
  const INITIAL_ITEMS = [
    {
      id: 'apple',
      name: 'Apple',
      selected: false,
    }, 
    {
      id: 'carrot',
      name: 'Carrot',
      selected: false,
    }, 
    {
      id: 'melon',
      name: 'Melon',
      selected: false,
    },
    {
      id: 'pear',
      name: 'Pear',
      selected: false,
    }
    , 
    {
      id: 'lemon',
      name:'Lemon',
      selected: false,
    }, 
    {
      id: 'orange',
      name:'Orange',
      selected: false,
    }, 
    {
      id: 'salad', 
      name: 'Salad', 
      selected: false,
    }
  ] as Product[]
  const [products, setProducts] = useState<Product[]>([...INITIAL_ITEMS])
  /* const [items, setItems] = useState<Product[]>([...INITIAL_ITEMS]) */
  const [filteredSelectedItems, setFilteredSelectedItems] = useState<Product[]>([])
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
  }

  useEffect(() => {
    setFilteredSelectedItems(products.filter((product:Product) => {
      return product.selected
    }))
  }, [products])

  const getSelected = ((products:Product[]) => {
    setProducts(products)
  })

  const updateItems = ((productId:string) => {
    const currentOptionIndex = products.findIndex((selectedProduct) => {
      return productId === selectedProduct.id
    })
    const tempArr = [...products]
    tempArr[currentOptionIndex].selected = false
    setProducts([...tempArr])
  })

  const updateProducts = (product:Product) => {
    const currentOptionIndex = products.findIndex((innerProduct) => {
      return product.id === innerProduct.id
    })
    const tempArr = [...products]
    tempArr[currentOptionIndex].stock = product.stock
    tempArr[currentOptionIndex].userQuantity = product.userQuantity
    tempArr[currentOptionIndex].totalPrice = product.totalPrice
    setProducts([...tempArr])
  }
  
  return (
    <div className='app'>
      <Dropdown selected={getSelected} products={products}/>
      <form onSubmit={(event:React.FormEvent<HTMLFormElement>) => handleSubmit(event)}>
        <div className='cards-container'>
          {filteredSelectedItems.map((selectedItem:Product) => {
            return <Card productId={selectedItem.id} 
                         closeCard={updateItems}
                         updateProduct={updateProducts}
                         key={selectedItem.name}/>
          })}
        </div>
      </form>
      <div className="app-seprator"></div>
      {products && <Summary products={products}/>}
    </div>
  );
}