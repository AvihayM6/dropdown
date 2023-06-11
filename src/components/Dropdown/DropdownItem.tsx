import '../../style/DropDownItem.css'
import { useEffect, useState } from 'react'

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

type DropdownItemProps = {
    option: Product
    handleDropdownClick: Function
}

export const DropdownItem = ({option, handleDropdownClick}: DropdownItemProps) => {
  const [icon, setIcon] = useState('')
  const handleClick = (option: Product) => {
    option.selected ? option.selected = false : option.selected = true
    handleDropdownClick(option)
  }
  
  useEffect(() => {
    const importedIcon = async () => {
      const iconPath = await import(`../../images/${option.id}.svg`)
      setIcon(iconPath.default)
      return iconPath
    }
    importedIcon()
  }, [option])

  return (
    <>
      <div className='item-conteiner'
           onClick={() => handleClick(option)}>
        <div className='item-option'>
        {option.name}
        </div>
        <div className='seprator'></div>
        <img src={icon} alt={option.name} />
      </div>
    </>
  );
}
