import { useEffect, useState } from 'react'
import axios from 'axios'
import '../style/Card.css'

type Product = {
  id?: string
  name?: string
  color?: string
  price?: number
  stock?: number
  totalPrice?: number
  userQuantity?: number
}

type CardProps = {
  productId: string
  closeCard: Function
  updateProduct: Function
}

export const Card = ({productId, closeCard, updateProduct}: CardProps) => {
  const mock = [
    {
      id: 'apple',
      name: 'Apple',
      color: 'red',
      price: 2,
      stock: 10,
    },
    {
      id: 'carrot',
      name: 'Carrot',
      color: 'orange',
      price: 4,
      stock: 30,
    },
    {
      id: 'melone',
      name: 'Melone',
      color: 'orange',
      price: 6,
      stock: 10,
    },
    {
      id: 'pear',
      name: 'Pear',
      color: 'orange',
      price: 2,
      stock: 1,
    },
    {
      id: 'lemon',
      name: 'Lemon',
      color: 'yellow',
      price: 6,
      stock: 90,
    },
    {
      id: 'orange',
      name: 'Orange',
      color: 'orange',
      price: 10,
      stock: 0,
    },
    {
      id: 'salad',
      name: 'Salad',
      color: 'green',
      price: 5,
      stock: 20,
    },
  ] as Product[]
  const baseUrl = 'https://front-end-exam-dot-winky-apis.ew.r.appspot.com/'
  const [product, setProduct] = useState<Product | undefined>(undefined)
  const [icon, setIcon] = useState('')
  const [hasQuantity, setHasQuantity] = useState(true)
  const [quantity, setQuantity] = useState(0)

  useEffect(() => {
    axios.get(`${baseUrl}products/${productId}`)
    .then((res) => {
      console.log(res)
      /* alert('The product was given successfully') */
      if(!product) setProduct(res.data)
    })
    .catch(function (error) {
      console.log(error)
    })
    /* const findCorrectProductFromMock = mock.findIndex((mockProduct: Product) => {
      return mockProduct.id === productId
    })
    if(!product) setProduct(mock[findCorrectProductFromMock]) */
  }, [])

  useEffect(() => {
    const importedIcon = async () => {
      const iconPath = await import(`../images/${productId.toLowerCase()}.svg`)
      setIcon(iconPath.default)
      return iconPath
    }
    importedIcon()
  }, [productId])

  useEffect(() => {
    if(product?.stock === 0) setHasQuantity(false)
    if(product) updateProduct(product)
  }, [product])

  const handleCloseCard = () => {
    closeCard(product?.id)
  }

  const handleQuantity = (event:any) => {
    const value = event.target.value;
    setQuantity(value)
    const totalPrice = value * (product?.price || 0)
    const updateStock = (product?.stock || 0)-quantity
    setProduct({...product,
      stock: updateStock,
    })
    setProduct({
      ...product,
      userQuantity: value,
      totalPrice: totalPrice,
    })
  }

  return (
    <div className='card-container'>
      <div className="header">
      {product && <div className="fruit"
             style={{backgroundColor: (product?.color || '')}}>
          <img src={icon} 
               alt="product image"
               className='card-img'/>
          <label className="product-title">{product?.name}</label>
        </div>
      }

        <div className="cancel-container"
        onClick={handleCloseCard}>
          <div className="cancel-fruit">
            x
          </div>
        </div>
      </div>
      <div className="quantity">
        <div className="quantity-header">
          <label className='quantity-label'>Selected quantity:</label>
          {product &&
            <div>
              <span className={hasQuantity? 'quantity-number' : 'quantity-number zero-quantity'}>{quantity}</span> KG
            </div>
          }
        </div>
        {product &&
        <input type="range"
               min='0'
               max={product?.stock?.toString() ?? 0}
               defaultValue="0"
               onChange={handleQuantity}
               className='slider'/>
        }
      </div>
      {product &&
      <div className="price">
        Price: <span className={hasQuantity? 'price-number' : 'price-number zero-quantity'}>${quantity*(product?.price || 0)}</span>
      </div>
}
    </div>
  );
}
