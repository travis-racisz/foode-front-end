import { useContext } from "react";
import { useForm, SubmitHandler } from "react-hook-form"
import { CartContext } from "../../context/ContextProvider";
import { gql, useMutation, useQuery } from "@apollo/client";
import { parseCookies } from "../../lib/parseCookies";
import { useRouter } from "next/router";
export default function Register({ token }) {
    const router = useRouter();
    const { register, handleSubmit, formState: {errors} } = useForm<Inputs>();
    const updateUserMutation = gql`
        mutation updateUser($phoneNumber:String, $firstName: String, $lastName: String, $token: String){
            updateUser(token: $token, phoneNumber: $phoneNumber, firstName: $firstName, lastName: $lastName){
                firstName
                lastName
                phoneNumber
            }
        }`
    const [updateUser, { data, loading, error }] = useMutation(updateUserMutation)
    type Inputs = {
        firstName: string,
        lastName: string,
        phoneNumber: number, 
    }


    const formSubmit:SubmitHandler<Inputs> = async (inputs)=> {
        await updateUser({
            variables: {
                phoneNumber: inputs.phoneNumber,
                firstName: inputs.firstName,
                lastName: inputs.lastName,
                token: token
            }})

           

            if(data){ 
                router.push('/user/address')
                return data
            }
        // take the data and update the user in firebase 
        
    }

    if(loading){ 
        return ( 
            <div> 
                loading...
            </div>
        )
    }

    if(error){ 
        return ( 
            <div> 
                {error.message}
            </div>
        )
    }
    return ( 
        <div className="container flex flex-col place-content-center w-screen items-center h-80h"> 
            <form onSubmit={handleSubmit(formSubmit)} className= "container h-96 flex flex-col w-80 rounded-lg bg-red lg: w-96 ">
                 <h1 className="text-white self-center text-2xl">Lets gather some information</h1>
                    <label className="text-white text-2xl self-center">First Name</label>
                    <input className="rounded-lg text-lg self-center px-3" type = "text" {...register('firstName', { 
                        required: 'please enter your first name',
                })}></input>
                    
                
                
                <label className="text-white text-2xl self-center " >Last Name</label>
                <input className="rounded-lg text-lg self-center required: border-red-500 px-3" type='text' { ...register('lastName', { 
                    required: 'Please enter your last name',
                    
                })}></input>
                <label className="text-white text-2xl self-center">Phone Number</label>
                <input className="rounded-lg text-lg self-center px-3 invalid: text-red-100" type="tel" {...register('phoneNumber', { 
                    required: 'Please enter a phone number',
                    pattern: {
                        value: /^[0-9]{10}$/,
                        message: "Phone number must be 10 digits"
                }})}></input>
                {errors.phoneNumber && <p className="text-white bold text-base self-center">{errors.phoneNumber.message}</p>}
                <input className="rounded bg-white text-black m-10 w-40 self-center" type = "submit" value = "next"></input>
                </form>
        </div>
    )
}

export function getServerSideProps({ req }){
    const cookies = parseCookies(req)
    return { 
        props: { 
            token: cookies.token
        }
    } 

}