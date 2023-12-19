import axios from "axios";

const BASE_URL = "https://api.coinpaprika.com/v1";

export let fetchCoins = async () => {
  return await axios
    .get(`${BASE_URL}/coins`)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

export let fetchCoinInfo = async (coinId: string) => {
  return await axios
    .get(`${BASE_URL}/coins/${coinId}`)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

export let fetchCoinTicker = async (coinId?: string) => {
  return await axios
    .get(`${BASE_URL}/tickers/${coinId}`)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

export let fetchCoinHistory = async (coinId?: string) => {
  const endDate = Math.floor(Date.now() / 1000);
  const startDate = endDate - 60 * 60 * 23;
  return await axios
    .get(
      `${BASE_URL}/coins/${coinId}/ohlcv/historical?start=${startDate}&end=${endDate}`
    )
    .then((res) => res.data)
    .catch((err) => console.log(err));
};
