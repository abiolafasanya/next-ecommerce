import React, {useState} from 'react'
import NoSSR from '../../components/NoSSR';
import Container from '../../components/Container';
import Payment from '../../components/checkout/Payment';
import Shipping from '../../components/checkout/Shipping';
import Order from '../../components/checkout/Order';
import { Progress } from '../../components/checkout/Progress';
import UseCart from '../../hooks/useCart';
import { PrismaClient, Product } from '@prisma/client';
import { GetServerSideProps, NextPage } from 'next';

const Index: NextPage<{products: Product[]}> = (props) => {
    const {cartItems, cartQuantity} = UseCart()
    const [stage, setStage] = useState(0)
    const [progress, setProgress] = useState(25)
    function goToNext(){
        setStage(stage => stage + 1)
        setProgress(progress => progress + 25)
    }
  return (
    <Container className='bg-indigo-50'>
        <NoSSR>
            <div className="md:max-w-6xl mx-auto py-8 px-5">
            <header className='bg-gray-100  mb-4 p-5'>
                <div className=''>
                <menu className={`flex justify-between`}>
                    <li className='progress'>Signin</li>
                    <li className='progress' onClick={() => setStage(stage => {
                        setProgress(stage => 25)
                        return 0
                    })}>Payment</li>
                    <li className='progress' onClick={() => setStage(stage => 1)}>Summary</li>
                    <li className='progress' onClick={() => setStage(stage => 2)}>Delivered</li>
                </menu>
                {<Progress progress={progress} />}
                </div>

            </header>
            <main>
                    {stage === 0 && (<Shipping products={props.products} cartItems={cartItems} cartQuantity={cartQuantity} onClick={() => goToNext()}/>)}
                    {stage === 1 && (<Payment onClick={() => goToNext()}/>)}
                    {stage === 2 && (<Order />)}
                
            </main>
            <footer className='text-center border-t border-gray-200 py-5'>
                <h2 className="text-2xl">Need Help</h2>
                <span>Chat with an expert</span>
            </footer>   
            </div>
        </NoSSR>
    </Container>
  )
}

export default Index

// export const getStaticProps: GetStaticProps = async (context) => {
    export const getServerSideProps: GetServerSideProps = async (context) => {
        const prisma = new PrismaClient();
      
        const client = prisma.product;
        const products = await client.findMany();
      
        return {
          props: { products: JSON.parse(JSON.stringify(products)) },
        };
      };