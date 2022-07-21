import { useContext } from 'react';
import { CartContext } from '../../../context/ContextProvider';
import PhoneInput, {isValidPhoneNumber} from 'react-phone-number-input';
import 'react-phone-number-input/style.css'

export default function UserOnboarding(){ 
    const context = useContext(CartContext);
    return( 
        <div className='name-form-container'>
            <div className='name-form'> 
                <h1>Let&apos;s gather some information</h1>
                <h3>What&apos;s your name?</h3>
                <input className='name-input' type="text" placeholder="First Name"/>
                <input className='name-input' type="text" placeholder="Last Name"/>
                <div className='phone-input-container'> 

                    <PhoneInput 
                        className='phone-input'
                        withCountrySelect={false}
                        placeholder= "Mobile Number"
                        defaultCountry='US'
                        value={context.phoneNumber}
                        onChange = {context.setPhoneNumber}
                    /> 
                </div>
                <button>Continue</button>

            </div>
        </div>
    ) 
}