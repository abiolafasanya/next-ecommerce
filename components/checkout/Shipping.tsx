import { PrismaClient, Product } from '@prisma/client';
import { GetServerSideProps } from 'next';
import React, { useState } from 'react'
import Axios from '../../utils/Axios';

interface Iprops {
    onClick: () => void
    cartQuantity: number;
    cartItems: CartItem[];
    products: Product[];
}

type CartItem = {
    id: string;
    quantity: number;
};

const Shipping = (props: Iprops) => {
    const [filled, setFilled] = useState(false);
    const [shipped, setShipped] = useState(false);
    async function handleSubmit(e: React.SyntheticEvent) {
        e.preventDefault();
        const target = e.target as typeof e.target & {
            fullname: {value: string},
            address: {value: string},
            phone: {value: number},
            city: {value: string},
            postalcode: {value: string},
            country: {value: string},
        };
        const p =  props.cartItems.reduce((total, cartItem) => {
            const product = props.products?.map((product) => product);
            const item = product?.find((item) => item.id === cartItem.id);
            return total + (item?.price || 0) * cartItem.quantity;
          }, 0)

        const extract = {
            fullname: target.fullname.value,
            address: target.address.value,
            phone: target.phone.value,
            city: target.city.value,
            postalcode: target.postalcode.value,
            country: target.country.value,
            cartItems: props.cartItems,
            quantity: props.cartQuantity,
            price: p,
        }

        const {fullname, address, phone, city, postalcode, country, price} = extract
        if(fullname === '' || address === '' || city === '' || phone === 0 || postalcode === ''){
            alert('Please enter all credentials')
            return false
        }
        
        console.log(extract)
        const {data, status} = await Axios.post('/api/checkout/shipment', extract);
        if (status === 200 || status === 201) {
            console.log(data)
        setFilled(filled => !filled)
        }
        if(data.error){
            console.log(data.error, status)
        }
    }

  return (
    <div>
        <div className="card">
            {shipped}
            <form onSubmit={handleSubmit}>
                <div className='form-group'>
                    <label htmlFor="fullname" className='form-label'>Full Name</label>
                    <input type='text' id='fullname' className='form-control'/>
                </div>
                <div className='form-group'>
                    <label htmlFor="address" className='form-label'>Address</label>
                    <input type='text' id='address' className='form-control'/>
                </div>
                <div className='form-group'>
                    <label htmlFor="phone" className='form-label'>Phone</label>
                    <input type='tel' id='phone' className='form-control'/>
                </div>
                <div className='form-group'>
                    <label htmlFor="city" className='form-label'>City</label>
                    <input type='text' id='city' className='form-control'/>
                </div>
                <div className='form-group'>
                    <label htmlFor="postalcode" className='form-label'>Postal Code</label>
                    <input type='number' id='postalcode' className='form-control'/>
                </div>
                <div className='form-group'>
                    <label htmlFor="country" className='form-label'>Country</label>
                    <input type='text' id='country' className='form-control'/>
                </div>
                <div className="form-group">
                    {
                        filled ? (<button className='btn bg-yellow-500 hover:bg-yellow-600 py-3 px-5'
                        >Submit</button>) :
                        (<button className='btn bg-yellow-500 hover:bg-yellow-600 py-3 px-5'
                        onClick={props.onClick}
                        >Continue</button>)
                    }
                </div>
            </form>
        </div>
    </div>
  )
}

export default Shipping
