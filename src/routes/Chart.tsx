import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../atoms";

interface IChartProps {
  coinId?: string;
}

interface IHistorical {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

const Chart = ({ coinId}: IChartProps) => {
  const isDark = useRecoilValue(isDarkAtom);

  const { isLoading, data } = useQuery<IHistorical[]>(["ohlcv", coinId], () =>
    fetchCoinHistory(coinId),
    {
      // refetchInterval:1000000,
    }
  );

  return (
    <div>
      
      {isLoading ? (
        "Chart Loading..."
      ) : (
        <ApexChart
          type="line"
          series={[
            {
              name: "price",
              data: data?.map((price) => price.close) as number[],
            },
          ]}
          options={{
            chart: {
              height: 500,
              width: 500,
              background: "transparent",
            },
            theme: {
              mode : isDark ? "dark" : "light",
             
            },
            stroke: {
              curve: "smooth",
              width: 3,
            },
            grid: {
              show: false,
            },
            xaxis: {
              labels: {
                show: false,
              },
              categories: data?.map((price) => price.time_close) as string[],
              type: "datetime",
            },
            yaxis: {
              labels: {
                formatter: (value) => value>10 ? `$${value.toFixed(2)} ` : `$${value.toFixed(4)}`,
              },
            },
            tooltip: {
              y: {
                formatter: (value) => value>10 ? `$${value.toFixed(2)}` : `$${value.toFixed(4)}`,
              },
            },
          }}
        />
      )}
    </div>
  );
};

export default Chart;