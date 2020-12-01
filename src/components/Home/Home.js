import React, { useContext } from 'react';
import { UserContext } from '../../App';
import Header from '../Header/Header';
import TravelingSection from '../TravelingSection/TravelingSection';


const Home = () => {
    const [showArea] = useContext( UserContext )

    const styleHome = {
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.70), rgba(0, 0, 0, 0.5)), 
        url(${showArea.img})`,
        backgroundSize: 'cover',
        height: '100vh'
    }
    
    return (
        <div style={styleHome}>
            <Header />
            <TravelingSection />
        </div>
    );
};

export default Home;