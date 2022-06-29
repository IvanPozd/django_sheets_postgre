import React, {useState, useEffect} from 'react';
import DataService from '../services/datas';
import {Link} from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card'


const DataList = props => {
    const [someData, setSomeDate ] = useState([])

    useEffect(() => {
        retrieveData();
    }, [props.token]);

    const retrieveData = () => {
        DataService.getAll(props.token).then(response => {
            setSomeDate(response.data);
            localStorage.setItem('data', response.data);
        })
        .catch(e => {
            console.log(e)
        });
    }

    return (
        <Container>
            {someData.map((oneData) => {
                return (
                    <Card key={oneData.id} className="mb-3">
                        <Card.Body>
                            <div>
                                <Card.Title><b>Номер заказа: </b>{oneData.order_number}</Card.Title>
                                <Card.Text><b>Цена в долларах: </b>{oneData.price_usd}</Card.Text>
                                <Card.Text><b>Дата доставки: </b>{oneData.date_ship}</Card.Text>
                                <Card.Text><b>Цена в рублях: </b>{oneData.price_rub}</Card.Text>
                            </div>
                            <Link to={{
                                pathname: "/datas/" + oneData.id,
                                state: {
                                    currentData: oneData
                                }
                            }}>
                                <Button variant="online-info" className="me-2">Изменить</Button>
                            </Link>
                            <Button variant="outline-danger">Delete</Button>
                        </Card.Body>
                    </Card>
                )
            })}
        </Container>
    );
}

export default DataList;