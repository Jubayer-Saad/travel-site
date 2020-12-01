import React, { useContext, useState } from 'react';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { UserContext } from '../../App';
import Header from '../Header/Header';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css"
import './Booking.css';

const Booking = () => {
    const [showArea] = useContext(UserContext);
    const history = useHistory();
    const [from, setFrom] = useState(null);
    const [to, setTo] = useState(null);

    const formControl = (event) => {
        event.preventDefault()
        history.push("/hotels")
    }

    const styleBooking = {
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.5)), 
        url(${showArea.img})`,
        backgroundSize: "cover",
        height: "100vh"
    }
    return (
        <div style={styleBooking}>
            <Header />
            <div className="booking-opt">
                <div className="places">
                    <h1>{showArea.title}</h1>
                    <p>{showArea.description}</p>
                </div>
                <div>
                    <Card className="booking-form">
                        <Form>
                            <Form.Group controlId="formGroupText">
                                <Form.Label>Origin</Form.Label>
                                <input type="text" className="form-control mb-3"  placeholder="Enter Origin" required />
                            </Form.Group>
                            <Form.Group controlId="formGroupText">
                                <Form.Label>Destination</Form.Label>
                                <input type="text" className="form-control mb-3" placeholder="Enter Destination" required />
                            </Form.Group>
                            <Form.Group className="date-form" controlId="formGroupText">
                                <Form.Group controlId="formGroupText">
                                    <Form.Label>From</Form.Label>
                                    <DatePicker className="date-picker from" selected={from} onChange={date => setFrom(date)} required></DatePicker>
                                </Form.Group>
                                <Form.Group controlId="formGroupText">
                                    <Form.Label>To</Form.Label>
                                    <DatePicker className="date-picker to" selected={to} onChange={date => setTo(date)} required></DatePicker>
                                </Form.Group>

                            </Form.Group>
                            <Button onClick={formControl} type="submit" variant="warning" size="lg" block>
                                Start Booking
                            </Button>
                        </Form>
                    </Card>
                </div>
            </div>
        </div>



    );
};

export default Booking;