import { useContext } from "react"
import { CartContext } from "../context/ContextProvider";
import Router from "next/router";
export default function Error(){ 
    const { errorMessage, clearError } = useContext(CartContext);
    const router = Router.router
    return( 
        <div className={errorMessage ? "error-message": "hidden"}> 
            <div className="error-content">
                {errorMessage}
                <button onClick={() => clearError()}>return home</button>
            </div> 
        </div>
    )
}