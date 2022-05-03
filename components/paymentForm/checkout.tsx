import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useContext } from 'react';
import { CartContext } from '../../context/ContextProvider';
import { useRouter } from 'next/router';
import { useState } from 'react';


export default function CheckoutForm(){
  
  const context = useContext(CartContext);

  const [ errorMessage, setErrorMessage ] = useState<string | null>('');
  const [ processing, setProcessing ] = useState<boolean>(false);
  const stripe = useStripe()
  const elements = useElements()

  console.log(context.error)



  

  if(context.clientSecret){ 
    return (
      <div> 
          <form className='stripe-payment-form' onSubmit = {(event) => context.handleSubmit(event, elements, stripe, setErrorMessage, setProcessing)}>
            <PaymentElement />
            <button className={!processing ? "stripe-form-submit-button" : "stripe-form-submit-button-disabled"} disabled = {!stripe || processing}>Submit</button>
            {errorMessage && <span className="stripe-error-message">{errorMessage}</span>}
          </form> 
          <div className={processing && !context.error ? 'processing-payment' : "processing-payment-hidden"}> 
              <span className='processing-text'>We're currently looking for a driver to pick up your order, Please wait</span>
              <div className='loader'> </div>
          </div>

          
      </div>

    )
  } else { 
    return ( 
      <div>
        <p>Loading...</p>
      </div>
    )
  }
    
    
  
  } 
