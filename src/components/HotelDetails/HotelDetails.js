import React from 'react';
import './HotelDetails.css'
const HotelDetails = (props) => {
    const {title, star, reviewed, bedroom, bed, bath, img, guest, price}=props.hotel
    return (
        <div class="hotelDetails">
           <div>
               <img style={{width:"250px", marginRight: "10px"}} src={img} alt=""/>
           </div>
           <div className="hotel-text-container" style={{}}>
               <h4 style={{margin:"0"}}>{title}</h4>
               <div className="hotel-features">
                   <span>{guest} guests</span>
                   <span>{bedroom} bedrooms</span>
                   <span>{bed} beds</span>
                   <span>{bath} baths</span>
               </div>
               <p>Air conditioning kitchen</p>
               <p>Cancellation flexibility available</p>
               <div className="hotel-review" style={{display:"flex", alignItems:"center"}}>
                    <span>   {star} ({reviewed})</span>
                    <span>${price}/<span className="custom-color">Day & Night</span></span>
                    <span className="custom-color">167 total</span>
               </div>
           </div>
        </div>
    );
};

export default HotelDetails