import React, { useContext } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
import travelingData from '../fakeData/travelingData';
import TravelingArea from '../TravelingArea/TravelingArea';
import './TravelingSection.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { fasFaArrowRight } from '@fortawesome/free-solid-svg-icons';


const TravelPlaces = () => {
    const [showArea, setShowArea] = useContext( UserContext );
    return (
        <div className="travel-places">
            <div className="places">
                <h1>{showArea.title}</h1>
                <p>{showArea.shortDescription}</p>
                
                <Link to="/booking" >
                    <Button variant="warning">
                        Booking 
                        {/* <FontAwesomeIcon icon={fasFaArrowRight} />  */}
                    </Button>
                </Link>
            </div>
            <div className="img-card">
                {
                    travelingData.map(places => <TravelingArea key={places.id} place={places}></TravelingArea>)
                }
            </div>
        </div>
    );
};

export default TravelPlaces;