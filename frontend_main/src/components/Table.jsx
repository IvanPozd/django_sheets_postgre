import React, { useState, useEffect } from 'react';
import DataService from '../services/datas';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
// import '../css/Table.css';

 
 
const Table = props => {

    const [someData, setSomeDate ] = useState([]);

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
      <div>
        <BootstrapTable data={someData}>
          <TableHeaderColumn isKey dataField='id'>
            ID
          </TableHeaderColumn>
          <TableHeaderColumn dataField='order_number'>
            Order Number
          </TableHeaderColumn>
          <TableHeaderColumn dataField='price_usd'>
            Price USD
          </TableHeaderColumn>
          <TableHeaderColumn dataField='date_ship'>
            Date Ship
          </TableHeaderColumn>
          <TableHeaderColumn dataField='price_rub'>
            Price RUB
          </TableHeaderColumn>
        </BootstrapTable>
      </div>
    );
  
};
 
export default Table;