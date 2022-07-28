import { useForm, SubmitHandler } from "react-hook-form"
import { useContext } from "react";
import { CartContext } from "../../context/ContextProvider";
import { Router, useRouter } from "next/router";
import { gql, useMutation } from "@apollo/client";
import { client } from "../../apollo-client";
import { parseCookies } from "../../lib/parseCookies";

export default function Address({ token }){ 
    const { register, handleSubmit, formState: {errors}} = useForm<Address>()
    const updateUserMutation = gql`
        mutation updateUser($roomNumber: String, $buildingNumber:String, $specialInstructions: String, $completedRegistration: Boolean $token: String){
            updateUser(token: $token, buildingNumber: $buildingNumber, specialInstructions: $specialInstructions roomNumber: $roomNumber completedRegistration: $completedRegistration){
                buildingNumber
                specialInstructions
                roomNumber
            }
        }`
    const [updateAddress, { data, loading, error }] = useMutation(updateUserMutation)
    const { updateUser, user } = useContext(CartContext);
    const router = useRouter()
    type Address = { 
        buildingNumber: string, 
        roomNumber: string, 
        specialInstructions: string,
    }

    const formSubmit:SubmitHandler <Address> = async inputs => {
        await updateAddress({ 
            variables: { 
                buildingNumber: inputs.buildingNumber,
                specialInstructions: inputs.specialInstructions,
                roomNumber: inputs.roomNumber,
                completedRegistration: true,
                token: token
            }
        })
        if(data){ 
            router.push('/profile/user')
            return data
        }

        if(error){ 
            console.log(error.message)
            return error.message
        }
    }

    if(loading){ 
        return ( 
            <div> 
                loading...
            </div>
        )
    }

    return ( 
        <div className="flex flex-col justify-center items-center w-screen h-80h ">
            <div className="flex flex-col bg-red lg: w-fit w-80 h-96 justify-between items-center rounded-lg"> 
                <h1 className="text-xl text-white p-3">
                    Lets get some more information from you to complete your profile
                </h1> 
                <h3 className="text-lg text-white p-3">
                    Where on base do you live?
                </h3>
                <form onSubmit = {handleSubmit(formSubmit)} className= 'flex flex-col place-content-center'> 
                    <input {...register('buildingNumber', { 
                        required: 'Please enter your building number',
                    })} type = "text" className="rounded-lg mb-3 px-3 border border-grey placeholder:text-slate-400 placeholder:italic text-slate-700 space-y-10" placeholder="building number"></input>
                    {errors.buildingNumber && <p className="text-white bold text-base self-center">{errors.buildingNumber.message}</p>}
                    <input {...register('roomNumber', { 
                        required: 'Please enter your room number',
                    })} type='text' placeholder = "room number" className = "rounded-lg mb-3 px-3 border border-grey placeholder:text-slate-400 placeholder:italic text-slate-700"></input>
                    {errors.roomNumber && <p className="text-white bold text-base self-center">{errors.roomNumber.message}</p>}
                    <label className="text-white">special delivery instructions</label>
                    <textarea  {...register('specialInstructions')} className="placeholder:text-slate-400 placeholder:italic px-3 mb-3 text-slate-700 not-italic" placeholder = "use the phone outside to call"></textarea>
                    <input type={"submit"} className= "rounded-lg bg-white w-40 m-4" value = "Submit"></input>
                </form>
    
            </div>
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