import { useEffect, useState } from 'react';
import '../../style/Dropdown.css'
import { FaCaretDown, FaCaretUp } from 'react-icons/fa';
import { DropdownItem } from './DropdownItem';

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

type DropdownProps = {
    selected: Function
    products: Product[]
}

export const Dropdown = ({selected, products}: DropdownProps) => {
  const [showMenu, setShowMenu] = useState(false)
  const [filteredItems, setFilteredItems] = useState<Product[]>([])
  const handleClick = (product: Product) => {
    const currentOptionIndex = products.findIndex((selectedProduct) => {
      return product.id === selectedProduct.id
    })
    const tempArr = [...products]
    tempArr[currentOptionIndex].selected = product.selected
    selected([...tempArr])
  }
  useEffect(() => {
    setFilteredItems(products.filter((product:Product) => {
      return !product.selected
    }))
  }, [products])
  return (
    <>
      <div className='dropdown-container'>
        <div className='dropdown-header-container'
             onClick={() => {setShowMenu(!showMenu)}}>
          <div className='dropdown-header'>
            Select to add item to basket
          </div>
          <div className='caret'>
            {showMenu ? <FaCaretUp /> : <FaCaretDown />}
          </div>
        </div>
        {
          showMenu
          && 
          <div className="dropdown-content">
            {filteredItems.map((option, idx) => {
                return <DropdownItem key={idx}
                                      option={option}
                                      handleDropdownClick={() => handleClick(option)}/>
            })}
          </div>
        }
      </div>
    </>
  );
}
