import React, { useContext } from 'react';
import { UserContext } from '../../App';
import './TravelingArea.css';

const TravelingArea = (props) => {
    const [showArea, setShowArea] = useContext( UserContext );
    const {title, shortDescription, img} = props.place;
    

    const backgroundImageStyle = {
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.5)), url(${img})`,
        backgroundSize: "cover",
        backgroundPosition: "right top",
        backgroundRepeat: "no-repeat",
        backgroundOrigin: "border-box",
        height: "410px",
        border:"3px solid #ff9100",
        borderRadius:"20px"
      };
    return (
        <div  
            className="card-image  mr-2 col-5" fluid style={backgroundImageStyle} 
            onClick={() => setShowArea(props.place)}>
            <h2 className="place-name">{title}</h2>
        </div>
    );
};

export default TravelingArea;