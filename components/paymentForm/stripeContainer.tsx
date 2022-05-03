import {PaymentElement} from '@stripe/react-stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useContext } from 'react';
import { CartContext } from '../../context/ContextProvider';
import CheckoutForm from './checkout';
import Link from 'next/link';


export default function StripeContainer(){ 
const stripePromise = loadStripe('pk_test_51KKSAgC28IfjvtGXAa1Qewp5GIrdadC6y0s3UZ9XknMxgAdmUPLmPvLQjt1bXYMadYlgR8yEnB37ZXw6uzItEcFs00jiZOOd9O');
const context = useContext(CartContext);
if(!context.clientSecret){
    return( 
        <div>
            <p>Oops something went wrong, <Link href = "/">return home?</Link></p>
        </div> 
    )
}
  const options = {
    // passing the client secret obtained from the server
    clientSecret: context.clientSecret
  };

    return (
        <Elements stripe={stripePromise} options={options}>
            <CheckoutForm />
        </Elements>
      );
}