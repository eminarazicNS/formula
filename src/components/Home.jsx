import { useEffect } from "react";
import BackgroundVideo from "./BackgroundVideo";


export default function Home(props) {
    useEffect(() => {
        props.setSearchIsVisible(false);
        props.setSelectIsVisible(false);
        props.setCol2IsVisible(false);
    }, []);

    return (
        <>
        
        <div className="wrapper" >
        <BackgroundVideo />
            {/* <div className="col2" style={{flex:"0",opacity:"0.0"}}></div> */}
        
        </div>          
        </>
    );
}