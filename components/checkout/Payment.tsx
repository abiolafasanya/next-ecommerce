import React, {useState, useEffect} from 'react'
import Button from '../Button';
import { formatCurrency } from './../../utils/formatter';

interface Iprops {
    onClick: (any?: object) => void
}

type detailType = {
    fullname: string;
    address: string;
    phone: number;
    city: string;
    postalcode: number | string;
    country: string;
}

const Payment = (props: Iprops) => {
    const [details, setDetails] = useState<detailType>()
    useEffect(() => {
        const store = JSON.parse(localStorage.getItem('shippingData') as string);
       setDetails(store)
    },[])
  return (
    <div>
                <section>
                <div className='flex justify-between px-5'>
                <h2 className="text-base font-semibold">Your Address</h2>
                <h3 className="text-base">Change Address</h3>
                </div>
                <div className="card">
                    <h3 className="text-base font-semi">{details?.fullname || 'Abiola Fasanya'}</h3>
                    <p className="text-base">{details?.address} 
                    <br/>
                    {details?.city +' - '+  (details?.postalcode) ||'Lagos - Ikorodu (Igbogbo)'}
                    <br/>
                    { details?.phone || '+2348102307473'}
                     </p>
                </div>
                </section>
                <section>
                    <h2 className="text-base font-bold">Select a delivery method</h2>
                    <div className="card">
                        <ul>
                            <li>Pickup Station</li>
                            <li>Door Delivery</li>
                        </ul>
                    </div>
                </section>
                <section>
                    <h2 className="text-base font-bold">Shipment Details</h2>
                    <div className="card">
                        <h4 className="font-semibold">Shipment 1 of 1</h4>
                        <div>
                            <div>1x Six pairs-in-1 Quality Ankle Socks</div>
                            <div>{"Men's Trendy Zipper Comfort Hoodie Jacket Sweatshirts - White"}</div>
                            <span>Delivery Date Monday 6 Feb</span>
                        </div>
                    </div>
                </section>
                <section>
                    <h2 className="text-base font-semibold">Items Total</h2>
                    <div className='card flex flex-col'>
                    <div className="flex justify-between py-2 border-b">
                        <div>Items Total</div>
                        <div>{formatCurrency(4599)}</div>
                    </div> 
                    <div className="flex justify-between py-2 border-b">
                        <div>Shipping Fees</div>
                        <div>{formatCurrency(1160)}</div>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                        <div>Total</div>
                        <div> {formatCurrency(5759)}</div>
                    </div>
                    </div>
                    <Button className="sm:block mb-2 md:mx-auto md:inline-block bg-yellow-500 hover:bg-yellow-600 rounded-sm py-2 px-5"
                    onClick={props.onClick}
                    >Continue</Button>
                </section>
    </div>
  )
}

export default Payment