import React from "react";
import Chart from "./Chart";
import openSocket from 'socket.io-client';
import {barBGColors,barBorderColors} from './BarColors';

const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
  responsive: true
}
class ChartComponent extends React.Component {

  constructor(props) {
    super(props);
    this.getDaysArray = this.getDaysArray.bind(this);
  }

  state = {
    daysQuantity: 0,
    barData: {
      labels: [],
      datasets: [
        {
          // type: "bar",
          label: `Usuarios Registrados ${new Date().getMonth().toLocaleString()}`,
          backgroundColor: barBGColors, 
          borderColor: barBorderColors ,
          borderWidth: "2",
          //lineTension: 1,
          data: [42, 12, 32, 78, 45, 66, 79, 95, 6]
        }
      ]
    }

  };

  getDaysArray = () => {

    let daysNumbers = [];
    let date = new Date()
    let year = date.getUTCFullYear();
    let month = date.getUTCMonth() + 1;
    let days = new Date(year, month, 0).getDate();
    for (let index = 1; index <= days; index++) {
      daysNumbers.push(index.toString());
    }
    return daysNumbers;
  }

  componentDidMount() {
    let daysArray = this.getDaysArray();
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
    return (
      <div className="ml-5 align-content-center">
        <div className="card" style={{ width: 50 + 'rem' }} >
          <div className="card-body">
            <button onClick={() => { console.log(this.state) }}>estado</button>
            <Chart
              //dadatasetKeyProvider={}
              data={this.state.barData}
              options={options}
            />
          </div>
        </div>
      </div>
    );

  }
}

export default ChartComponent