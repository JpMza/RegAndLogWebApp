import React from "react";
import { Bar } from "react-chartjs-2";

const Chart = props => <Bar
    data={props.data}
    options={props.options}
/>;

export default Chart;