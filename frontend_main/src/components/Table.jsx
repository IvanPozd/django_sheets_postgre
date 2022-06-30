import React from 'react';
import DataService from '../services/datas';


class Table extends React.Component {
  constructor(props) {
    super(props);
    this.state = {data: []};
  }

  componentDidUpdate(prevProps, prevState) {
    DataService.getAll(this.props.token).then(response => {
      if (true) {
        //console.log(prevProps)
        console.log(prevState.data)
        //console.log(this.state.data)
        this.setState(
        {data : response.data}
        );

      } else {console.log(this.state.data)}
    })
    .catch(e => {
        console.log(e)
    });
    }

  render() {
    const data = this.state.data
    // console.log(data)
    return (
      <div>
        Здесь будет таблица
      </div>
    );
  }
}
 
export default Table;