import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import { fetchCoins } from "../api";

// ============== Style Component =============
const Container = styled.div`
  padding-top: 50px;
`;
const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Title = styled.h1`
  color: ${(props) => props.theme.accentColor};
  font-size: 48px;
`;
const CoinList = styled.ul`
  display: grid;
  grid-template-columns: 360px 360px;
  /* grid-column-gap: 20px; */
  grid-row-gap: 20px;
  grid-column-gap: 20px;
  width: 100vw;
  justify-content: center;
  align-items: center;
`;
const Coin = styled.li`
  padding: 10px;
  background-color: ${(props) => props.theme.listBgColor};
  color: ${(props) => props.theme.textColor};
  margin-bottom: 10px;
  border-radius: 15px;
  max-width: 720px;
  a {
    padding: 20px;
    transition: color 0.2s ease-in;
    display: flex;
    align-items: center;
    font-size: 20px;
  }
  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;

const Loading = styled.div`
  font-size: 48px;
  margin-top: 50px;
  text-align: center;
`;

const Img = styled.img`
  width: 40px;
  margin-right: 9px;
`;

// ============== Interface ================

interface ICoins {
  id: string;
  name: string;
  symbol: string;
  rank : number,
}

// ========================================

export const Coins = () => {
  const { data:coins, isLoading } = useQuery<ICoins[]>("allCoins", fetchCoins);

  return (
    <Container>
      <Header>
        <Title> Rank Top 10</Title>
      </Header>
      {isLoading ? (
        <Loading>Loading...</Loading>
      ) : (
        <CoinList>
          {coins?.slice(0,10).map((coin) => (
            <Coin key={coin.id}>
              <Link to={`/${coin.id}`} state={coin}>
                <Img
                  src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
                ></Img>
                {coin.name} &rarr;
              </Link>
            </Coin>
          ))}
        </CoinList>
      )}
    </Container>
  );
};
