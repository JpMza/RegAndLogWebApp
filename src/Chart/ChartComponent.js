import React from "react";
import Chart from "./Chart";
import openSocket from 'socket.io-client';

const socket = openSocket('http://localhost:8570');
class ChartComponent extends React.Component {

  constructor(props) {
    super(props);
    this.getDaysArray = this.getDaysArray.bind(this);
  }

  state = {
    loading: true,
    lineChartData: {
      labels: [],
      datasets: [
        {
          type: "bar",
          label: "Usuarios Registrados",
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
          ],
          borderWidth: "2",
          lineTension: 1,
          data: [10, 20, 30, 40, 50, 60, 70, 80, 100]
        }
      ]
    },
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
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
    //this.setState({labels : daysNumbers})
    console.log(daysNumbers);
    return daysNumbers;
  }

  componentDidMount() {
    this.setState({ labels: this.getDaysArray(), loading: false })

    // const subscribe = {
    //   type: "subscribe",
    //   channels: [
    //     {
    //       name: "ticker",
    //       product_ids: ["BTC-USD"]
    //     }
    //   ]
    // };

    //this.ws = new WebSocket("http://localhost:8570");
//    this.ws = openSocket('http://localhost:8570');

    socket.onopen = () => {
      //this.ws.send(JSON.stringify(subscribe));
      this.ws.send("Here's some text that the server is urgently awaiting!");

    };

    // this.ws.onmessage = e => {
    //   const value = JSON.parse(e.data);
    //   if (value.type !== "ticker") {
    //     return;
    //   }

    //   const oldBtcDataSet = this.state.lineChartData.datasets[0];
    //   const newBtcDataSet = { ...oldBtcDataSet };
    //   newBtcDataSet.data.push(value.price);

    //   const newChartData = {
    //     ...this.state.lineChartData,
    //     datasets: [newBtcDataSet],
    //     labels: this.state.lineChartData.labels.concat(
    //       new Date().toLocaleTimeString()
    //     )
    //   };
    //   this.setState({ lineChartData: newChartData });
    //};
  }

  componentWillUnmount() {
    this.ws.close();
  }

  render() {
    //const { classes } = this.props;

    return (
      <div className="align-content-center">
        <div className="card" style={{ width: 50 + 'rem' }} >
          <div className="card-body">

            <Chart
              data={this.state.lineChartData}
              options={this.state.lineChartOptions}
            />
          </div>
        </div>
      </div>
    );

  }
}

export default ChartComponent