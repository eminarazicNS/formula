import { useEffect } from "react";
import BackgroundVideo from "./BackgroundVideo";


export default function Home(props) {
    useEffect(() => {
        props.setSearchIsVisible(false);
        props.setSelectIsVisible(false);
        props.setCol2IsVisible(false);
    }, []);

    return (    
        <BackgroundVideo />              
    );
}