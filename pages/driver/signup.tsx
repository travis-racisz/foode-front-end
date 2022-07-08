import Link from "next/link"
import { useContext } from "react"
import { CartContext } from "../../context/ContextProvider"
import { HiOutlineArrowSmLeft } from "react-icons/hi"
export default function signup(){ 

    const { setDriverRegistration, driverRegistration } = useContext(CartContext)
    function handleChange(e){ 
        const {name, value} = e.target

        setDriverRegistration((prev) => ({
            ...prev,
            [name]: value
        }))
    }


    return (
    <div className="name-form-container small-margin-top"> 
        <div className="w-auto flex flex-col justify-center items-center background-red rounded" > 
        <Link passHref href = "/"><HiOutlineArrowSmLeft className='back-arrow' /></Link>
            <h2 className=" text-3xl text-white ">Create new account</h2>
            <label className="  text-white ">Email</label>
            <input className="name-input" placeholder="email" type="text" value = {driverRegistration.email} onChange = {(e) => handleChange(e)} name = "email"></input>
            <label className="text-white">Password</label>
            <input className="name-input" placeholder="password" type = 'password' value = {driverRegistration.password} onChange = {(e) => handleChange(e)} name = "password"></input>
            <label className="text-white">confirm password</label>
            <input className="name-input" placeholder="password" type = 'password' value = {driverRegistration.password} onChange = {(e) => handleChange(e)} name = "password"></input>
            <button onClick = {() => console.log('click')} className="new-order-button white">Submit</button>
        </div> 


            <p>Already have an account? Sign in <Link href="/driver/signIn" passHref>Here</Link></p>
        Sign up here
    </div>
    )
}