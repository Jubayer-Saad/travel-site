import React from 'react';
import Header from '../Header/Header'
import HotelCards from '../fakeData/HotelCards';
import HotelDetails from '../HotelDetails/HotelDetails';
import Map from '../Map/Map';
import { Card } from 'react-bootstrap';
import './Hotels.css'

const Hotels = () => {
    return (
        <div>
            <Header />


            <div className="hotels row">
                <Card className="col-lg-6">
                    <div style={{ marginLeft: "15px" }}>
                        <b style={{ color: "grey" }}>252 Stays Sep 17-20</b>
                        <h3 style={{ margin: 0 }}>Stay in Cox's Bazar</h3>
                    </div>
                    {
                        HotelCards.map(hotel => {
                            return (
                                <HotelDetails key={hotel.id} hotel={hotel}></HotelDetails>
                            )
                        })
                    }
                </Card>
                <Card className="col-lg-6">
                    <Map></Map>
                </Card>
            </div>
        </div>
    );
};

export default Hotels;