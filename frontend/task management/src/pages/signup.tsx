import Auth from "../components/Auth";
import Quote from "../components/quote";

export default  function Signupage(){
    return(
        <>
        <div className="grid grid-cols-2 ">
        <div className="grid col-span-1">
                <Quote/>
            </div>
            <div className="grid col-span-1">
            <Auth type="signup"></Auth>
            </div>
                

        </div>
        </>
    )
}