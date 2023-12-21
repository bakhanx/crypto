import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import { fetchCoins } from "../api";

// ============== Style Component =============
const Container = styled.div`
  padding-top: 100px;
  max-width: 720px;
  margin: auto;
`;
const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Title = styled.h1`
  color: ${(props) => props.theme.accentColor};
  font-size: 22px;
  font-weight: 700;
`;
const CoinList = styled.ul`
  max-width: 720px;
  padding: 20px;
  display: grid;
  @media screen and (max-width: 500px) {
    grid-template-columns: repeat(2, 1fr);
  }
  grid-template-columns: repeat(4, 1fr);
  /* grid-column-gap: 20px; */
  grid-row-gap: 20px;
  grid-column-gap: 20px;
  width: 100vw;
`;
const Coin = styled.li`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  padding: 20px;
  color: ${(props) => props.theme.textColor};
  max-width: 720px;

  a {
    transition: color 0.2s ease-in;
    font-size: 20px;
  }
  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;
const Card = styled.div`
  border: 2px solid transparent;
  background: linear-gradient(
      to right bottom,
      ${(props) => props.theme.cardColor},
      ${(props) => props.theme.bgColor},
      ${(props) => props.theme.cardColor}
    ),
    linear-gradient(to right top, #febb02, white);

  background-origin: border-box;
  background-clip: content-box, border-box;
  height: 240px;
  border-radius: 16px;
`;
const Loading = styled.div`
  font-size: 48px;
  margin-top: 50px;
  text-align: center;
`;

const Img = styled.img`
  width: 40px;
  margin-bottom: 20px;
`;

// ============== Interface ================

interface ICoins {
  id: string;
  name: string;
  symbol: string;
  rank: number;
}

// ========================================

export const Coins = () => {
  const { data: coins, isLoading } = useQuery<ICoins[]>(
    ["allCoins"],
    fetchCoins
  );

  return (
    <Container>
      <Header>
        <Title> Top100 시가 총액별 암호화폐</Title>
      </Header>
      {isLoading ? (
        <Loading>Loading...</Loading>
      ) : (
        <CoinList>
          {coins?.slice(0, 10).map((coin) => (
            <Link to={`/${coin.id}`} state={coin} key={coin.id}>
              <Card>
                <Coin>
                  <Img
                    src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
                  ></Img>
                  <span>{coin.name}</span>
                </Coin>
              </Card>
            </Link>
          ))}

          {/* Dummy Data
          {[1, 1, 1, 1].map(() => (
            <Card>
              <Coin>asd</Coin>
            </Card>
          ))} */}
        </CoinList>
      )}
    </Container>
  );
};
