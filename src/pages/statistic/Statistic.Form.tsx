import React, { useState, useEffect } from 'react';
import { Line } from "@ant-design/charts";
import { StatisticOrderByMonth } from '../../services/Setting.Service';
import Spinner from '../../components/Spinner';
import Header from "./Statistic.Header";

const StatisticForm = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<any[]>([]);
  const [config, setConfig] = useState<any>();
  const [statistic, setStatistic] = useState([
    {
      month: 0, total: 0
    },
    {
      month: 0, total: 0
    }
  ]);

  useEffect(() => {
    StatisticOrderByMonth()
      .then(res => {
        setStatistic(res.data.result);
        setLoading(false);
      })
      .catch(e => {
        console.log(e);
        setLoading(false);
      })
  }, []);

  useEffect(() => {
    for (let i = 0; i < statistic.length; i++) {
      //@ts-ignore
      const custom = { month: statistic[i].month, value: statistic[i].total }
      setData(prev => [...prev, custom]);
    }
  }, [statistic]);

  useEffect(() => {
    setConfig({
      data,
      height: 400,
      xField: 'month',
      yField: 'value',
      point: {
        size: 5,
        shape: 'diamond',
      },
    })
  }, [data]);

  return (
    <>
      {
        loading ? (
          <Spinner />
        ) : (
          <>
            <Header />
            {
              config && <Line {...config} />
            }
          </>
        )
      }
    </>
  )
}

export default StatisticForm
