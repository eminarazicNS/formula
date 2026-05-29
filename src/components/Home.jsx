import { useEffect } from "react";


export default function Home(props) {
    useEffect(() => {
        props.setSearchIsVisible(false);
        props.setSelectIsVisible(false);
        props.setCol2IsVisible(false);
    }, []);

    return (
        <div className="wrapper">
            <footer>
                <p>&copy; 2026 Green classroom group II. All rights reserved.</p>
                <address>
                    Contact us at <a href="mailto:school@smartschool.rs">school@smartschool.rs</a>
                </address>
            </footer>
        </div>

    );
}