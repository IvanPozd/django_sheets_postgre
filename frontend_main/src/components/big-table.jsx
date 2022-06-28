import React, {useState, useEffect} from 'react';
import DataService from '../services/datas';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card'


const bigTable = props => {
    const [someData, setSomeDate ] = useState([])

    useEffect(() => {
        retrieveData();
    }, [props.token]);

    const retrieveData = () => {
        DataService.getAll(props.token).then(response => {
            setSomeDate(response.data);
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
                        <div>
                            <Card.Text>{oneData.order_number}</Card.Text>
                        </div>
                    </Card>
                )
            })}
        </Container>
    );
}

export default bigTable;