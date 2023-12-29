import React from "react";
import {
  Link,
  Route,
  Routes,
  useLocation,
  useMatch,
  useParams,
} from "react-router-dom";
import styled from "styled-components";
import Chart from "./Chart";
import Price from "./Price";
import { useQuery } from "react-query";
import { fetchCoinInfo, fetchCoinTicker } from "../api";

// =========== Style Component ================
const Container = styled.div`
  padding-top: 100px;
  display: flex;
  flex-direction: column;
  max-width: 720px;
  margin: auto;
  padding-left: 10px;
  padding-right: 10px;
`;
const Header = styled.header`
  height: 10vh;
  display: flex;
  align-items: center;
`;
const Title = styled.h1`
  color: ${(props) => props.theme.accentColor};
  font-size: 32px;
  display: flex;
  align-items: center;
`;
const Loading = styled.div`
  font-size: 48px;
  margin-top: 50px;
  text-align: center;
`;
const Overview = styled.div`
  max-width: 720px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color:   ${(props) => props.theme.overviewColor};
  padding: 30px 40px;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  margin-top: 20px;

  border-left-style: solid;
  border-width: 2px;
  border-image: linear-gradient(to bottom, gold, white, gold);
  border-image-slice: 1;
`;
const OverviewItem = styled.div`
  display: flex;
  /* flex-direction: column; */
  align-items: center;
  font-size: 16px;
  font-weight: 900;

  /* span:first-child {
    font-size: 16px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 16px;
  } */
`;
const Description = styled.p`
  margin: 20px 0px;
  margin-left: 10px;
`;
const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 10px;
  max-width: 720px;
  width: 100%;
`;
const Tab = styled.span<{ isActive: boolean }>`
  text-align: center;
  text-transform: uppercase;
  font-size: 16px;
  font-weight: 400px;
  background-color: rgba(0, 0, 0, 0.1);
  padding: 24px 0px;
  border-radius: 10px;
  color: ${(props) =>
    props.isActive ? props.theme.accentColor : props.theme.textColor};
  /* margin-left: 10px; */
`;
const Contents = styled.div`
width: 100%;
`;
const Arrow = styled.div<{ isPositive: boolean }>`
  display: inline;
  font-size: 24px;
  color: ${(props) => (props.isPositive ? "lime" : "red")};
`;
const Img = styled.img`
  width: 40px;
  margin-right: 9px;
`;

// =============== Interface ====================
interface ILocation {
  state: {
    id: string;
    name: string;
    symbol: string;
  };
}
interface IInfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  first_data_at: string;
  last_data_at: string;
}
interface IPriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    KRW: {
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_15m: number;
      percent_change_30m: number;
      percent_change_1h: number;
      percent_change_6h: number;
      percent_change_12h: number;
      percent_change_24h: number;
      percent_change_7d: number;
      percent_change_30d: number;
      percent_change_1y: number;
      ath_price: number;
      ath_date: string;
      percent_from_price_ath: number;
    };
  };
}

// ===============================================

export const Coin = () => {
  const { coinId } = useParams();
  const { state } = useLocation() as ILocation;
  const chartMatch = useMatch("/:coinId/chart");
  const priceMatch = useMatch("/:coinId/price");
  const { data: infoData, isLoading: infoLoading } = useQuery<IInfoData>(
    ["coinInfo", coinId],
    () => fetchCoinInfo(coinId as string)
  );
  const { data: priceData, isLoading: priceLoading } = useQuery<IPriceData>(
    ["coinPrice", coinId],
    () => fetchCoinTicker(coinId as string)
  );

  return (
    <Container>
      <Header>
        <Title>
          <Img
            src={`https://coinicons-api.vercel.app/api/icon/${state?.symbol.toLowerCase() || infoData?.symbol.toLowerCase()}`}
          />
          {state?.name || infoData?.name || "Loading..."}
        </Title>
      </Header>
      {infoLoading || priceLoading ? (
        <Loading>Loading...</Loading>
      ) : (
        <>
          <Overview>
            <OverviewItem>
              {/* 현재가격 */}
              <span>
                {priceData?.quotes.KRW.price.toLocaleString("ko-KR", {
                  maximumFractionDigits: 0,
                }) || "null"}
                원 &nbsp;
              </span>

              <span>
                {(priceData?.quotes.KRW.percent_change_24h as number) > 0 ? (
                  <Arrow isPositive={true}>⬆</Arrow>
                ) : (
                  <Arrow isPositive={false}>⬇</Arrow>
                )}
                {priceData?.quotes.KRW.percent_change_24h.toFixed(2) || "null"}%
                (24h)
              </span>
            </OverviewItem>
          </Overview>

          <Overview>
            <OverviewItem>
              <span>Rank : &nbsp;</span>
              <span>{infoData?.rank || "null"}</span>
            </OverviewItem>

            <OverviewItem>
              <span>Symbol : &nbsp;</span>
              <span>{infoData?.symbol || "null"}</span>
            </OverviewItem>
          </Overview>
          <Description>{infoData?.description || "No description"}</Description>

          <Overview>
            <OverviewItem>
              <span>시가총액 : &nbsp; </span>
              <span>
                {priceData?.quotes.KRW.market_cap.toLocaleString("ko-KR", {
                  maximumFractionDigits: 0,
                }) || "null"}
                원
              </span>
            </OverviewItem>
          </Overview>
          <Overview>
            <OverviewItem>
              <span>총 공급량 : &nbsp; </span>
              <span>{priceData?.total_supply || "null"}</span>
            </OverviewItem>
          </Overview>

          <Overview>
            <OverviewItem>
              <span>거래량(24h) : &nbsp; </span>
              <span>
                {priceData?.quotes.KRW.volume_24h.toLocaleString("ko-KR", {
                  maximumFractionDigits: 0,
                }) || "null"}
                원
              </span>
            </OverviewItem>
          </Overview>

          <Tabs>
            <Tab isActive={chartMatch !== null}>
              <Link to="chart">Chart</Link>
            </Tab>
            <Tab isActive={priceMatch !== null}>
              <Link to="price">Price</Link>
            </Tab>
          </Tabs>

          <Contents>
            <Routes>
              <Route path="chart" element={<Chart coinId={coinId} />} />
              <Route path="price" element={<Price coinId={coinId} />} />
            </Routes>
          </Contents>
        </>
      )}
    </Container>
  );
};
