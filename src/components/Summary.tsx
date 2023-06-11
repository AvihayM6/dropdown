import { useEffect, useState } from 'react'
import axios from 'axios'
import '../style/Summary.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


type Product = {
  id: string
  name?: string
  color?: string
  price?: number
  stock?: number
  totalPrice?: number
  userQuantity?: number
}

type SummaryProps = {
  products: Product[]
}

export const Summary = ({products}: SummaryProps) => {
  const baseUrl = 'https://front-end-exam-dot-winky-apis.ew.r.appspot.com/'
  const [filteredProducts,setFilteredProducts] = useState<Product[]>([])
  const updateApiProducts = () => {
    /* TODO: run in FOR_EACH */
    const idAndAmounFromProducts = filteredProducts.map(({ id, userQuantity }) => ({ id, amount: userQuantity }));
      axios.post(
        `${baseUrl}products/`, idAndAmounFromProducts
      )
      .then((res) => {
        if(res.status >= 200 && res.status <= 300) {
          toast.success(res.data.message, {
            position: "bottom-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          })
        }
      })
      .catch(function (error) {
        toast.error(error, {
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        })
      })
    }
  
  const errorMessage = () => {
    toast.error('The cart is empty, please fill it.', {
      position: "bottom-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    })
  }

  useEffect(() => {
    setFilteredProducts(products.filter((product:Product) => {
        return product.userQuantity !== undefined && product.userQuantity > 0
    }))
  },[products])

  return (
    <div className='summary-container'>
      <div className="items-list">
        <label className='title'>Item list:</label>
        {
        filteredProducts.length > 0 ?
            filteredProducts.map((product:Product) => {
                return <div key={product.id}
                            className='product-summary'>
                        <div className='product-name'>{product.name}</div>
                        <div className='seprator'></div>
                        <div className='user-quantity'>{product.userQuantity}KG</div>
                    </div>
            }) :
            <p className="empty-cart">No products added yet</p>
        }
      </div>
      <div className="total-price">
        <label className='title'>Total price:</label>
        ${filteredProducts.reduce((acc, product:Product) => {
          return acc+(product.totalPrice || 0)
        }, 0)}
      </div>
      <div className="submit-button"
            onClick={filteredProducts.length >0 ? updateApiProducts : errorMessage}>
        Submit
      </div>
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}
