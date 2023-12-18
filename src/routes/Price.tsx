import { useQuery } from "react-query";
import styled from "styled-components";
import { fetchCoinTicker } from "../api";

interface IPriceProps {
  coinId?: string;
}

interface IPriceUSD {
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

const PriceData = styled.div`
  div {
    padding: 5px 20px;
  }
  span{
    font-size: small;
    color:#c23616;
    padding: 0px 20px;
  }
`;

const Price = ({ coinId }: IPriceProps) => {
  const { isLoading, data } = useQuery<IPriceUSD>(["USD", coinId], () =>
    fetchCoinTicker(coinId)
  );
  return (
    <div>
      {isLoading ? (
        "Price Loading..."
      ) : (
        <>
          <PriceData>
            <div>ATH Data : {data?.quotes.USD.ath_date}</div>
            <div>ATH Price : {data?.quotes.USD.ath_price}</div>
            <div>ATH Date : {data?.quotes.USD.ath_date}</div>
            <div>ATH Market Cap : {data?.quotes.USD.market_cap}</div>
            <div>ATH Price : {data?.quotes.USD.price}</div>
            <div>ATH Volume 24H : {data?.quotes.USD.volume_24h}</div>
            <span>{`( *ATH : All time High )`}</span>
          </PriceData>
        </>
      )}
    </div>
  );
};

export default Price;