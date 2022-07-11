import React, {useState, useEffect} from 'react';
import DataService from '../services/datas';
import Table from 'react-bootstrap/Table';


const MyTable = props => {
    const [someData, setSomeDate ] = useState([])

    useEffect(() => {
        retrieveData();
    }, [props.token]);

    const retrieveData = () => {
        DataService.getAll(props.token).then(response => {
            setSomeDate(response.data);
            localStorage.setItem('data', response.data);
            console.log(props.token);
        })
        .catch(e => {
            console.log(e)
        });
    }

    return (
      <Table>
        <thead>
          <tr>
            <th>№</th>
            <th>Заказ №</th>
            <th>Цена USD</th>
            <th>Срок поставки</th>
            <th>Цена RUB</th>
          </tr>
        </thead>
        {someData.map((oneData) => {
            return (
                <tbody>
                  <td>{oneData.id}</td>
                  <td>{oneData.order_number}</td>
                  <td>{oneData.price_usd}</td>
                  <td>{oneData.date_ship}</td>
                  <td>{oneData.price_rub}</td>
                </tbody>
            )
        })}
        
      </Table>
    );
}

export default MyTable;