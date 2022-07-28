import Link from "next/link"
import { useContext } from "react"
import { CartContext } from "../../../context/ContextProvider"
import { HiOutlineArrowSmLeft } from "react-icons/hi"
import { useForm, SubmitHandler } from "react-hook-form"

type Inputs = { 
    email: string,
    password: string
}

export default function SignIn(){ 
    const { register, handleSubmit, formState: {errors}} = useForm<Inputs>()
    const { setDriverRegistration, driverRegistration, signInDriver, authError } = useContext(CartContext)
    function handleChange(e){ 
        const {name, value} = e.target

        setDriverRegistration((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const formSubmit:SubmitHandler <Inputs> = data => { 
        console.log(data, "data")
        console.log(errors, "errors")
        signInDriver(data.email, data.password)
    }
    return (
        <div className="name-form-container small-margin-top"> 
            <div className="w-auto flex flex-col justify-center items-center background-red rounded" > 
            <Link passHref href = "/"><HiOutlineArrowSmLeft className='back-arrow' /></Link>
            <form className="w-auto flex flex-col justify-center items-center max-w-lg" onSubmit={handleSubmit(formSubmit)}> 
                <h2 className=" text-3xl text-white ">Create new account</h2>
                <label className="  text-white ">Email</label>
                <input 
                    className="name-input" 
                    placeholder="email" 
                    type="text" 
                    {...register('email', 
                        {
                        required: 'true', 
                        pattern: { 
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "invalid email address"
                    }})} 
                    name = "email"></input>
                    {errors.email && <p className="text-white bold text-base">{errors.email.message}</p>}
                <label className="text-white">Password</label>
                <input 
                    className="name-input" 
                    placeholder="password" 
                    {...register('password', { 
                        required: 'true',
                        pattern: { 
                            value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{7,99}$/,
                            message: "Password must be at least 7 characters and contain at least one number, one uppercase and one lowercase letter"
                        }
                        
                    })} 
                    type = 'password' 
                    name = "password"></input>
                    {errors.password && <p className="text-white text-sm ml-1 p-1">{errors.password.message}</p>}
                <input type = "submit" value={"submit"} className="new-order-button white"></input>
                {/* {errors && <span>This field is required</span>} */}
                {authError ? <p className="text-white">{authError}</p> : null}
            </form>
               
            </div> 
    
    
                <p>Don&apos;t have an account? Sign up <Link href="/driver/auth/signup" passHref>Here</Link></p>
        </div>
        )
}