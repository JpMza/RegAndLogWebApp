import React from "react";
import Chart from "./Chart";
import openSocket from 'socket.io-client';
import * as cns from './Constants';
import {getDaysArray , getMonth} from '../Utils/Functions';
class ChartComponent extends React.Component {

   state = {
    loading: true,
    daysQuantity: 0,
    barData: {
      labels: [],
      datasets: [
        {
          label: `${cns.REG_USERS} ${getMonth()}`,
          backgroundColor: cns.barBGColors,
          borderColor: cns.barBorderColors,
          borderWidth: "2",
          data: []
        }
      ]
    }

  };

  componentDidMount() {
    let daysArray = getDaysArray();
    let daysQuantity = daysArray.length;
    this.setState(prevState => ({
      barData: {
        ...prevState.barData,
        labels: daysArray
      },
      daysQuantity
    }));


    this.socket = openSocket('http://localhost:8570');

    this.socket.on(`pushdata`, data => {

      if (this.state.barData.datasets[0].data.length === daysQuantity) {
        this.socket.close();
        this.setState({ loading: false });
        return;
      }

      const oldDataSet = this.state.barData.datasets[0];
      const newDataSet = { ...oldDataSet };
      newDataSet.data.push(data);

      const newChartData = {
        ...this.state.barData,
        datasets: [newDataSet],
        labels: this.state.barData.labels
      };

      this.setState({ barData: newChartData });
    })

  }

  componentWillUnmount() {
    this.socket.close();
  }

  render() {

    if (this.state.loading) {
      return (
        <div className="d-flex justify-content-center">
          <div className="spinner-border text-primary" role="status">
            <span className="sr-only">Cargando...</span>
          </div>
        </div>
      )
    } else {
      return (
        <div className="d-flex justify-content-center">
          <div className="card" style={{ width: 50 + 'rem' }} >
            <div className="card-body">
              <Chart
                data={this.state.barData}
                options={cns.options}
              />
            </div>
          </div>
        </div>
      );
    }
  }
}

export default ChartComponent