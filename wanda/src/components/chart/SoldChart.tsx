import React from 'react'
import ReactApexChart from 'react-apexcharts';
import { IProducts } from '../../utils/TypeScript';

interface IProps{
    related: IProducts[]
}

const SoldChart: React.FC<IProps> = ({ related }) => {
  const options = {
    chart: {
      height: 200,
      zoom: {
        enabled: true
      }
    },
    xaxis: {
        categories: related.map(item => item.title),
        crosshairs: {
          show: true
        }
    }
  };

  const series = [
    {
      name: "Sold",
      data: related.map(item => item.sold)
    },
    {
        name: "Quantity in Stock",
        data: related.map(item => item.quantityInStock)
    }
  ];

  return (
      <ReactApexChart
        type="area"
        options={options}
        series={series}
        height={350}
      />
  );
};

export default SoldChart