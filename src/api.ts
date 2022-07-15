const BASE_URL = "https://api.coinpaprika.com/v1";

export let FetchCoins = async () => {
  return fetch(`${BASE_URL}/coins`).then((response) => response.json());
};

export let FetchCoinInfo = async (coinId: string) => {
  return fetch(`${BASE_URL}/coins/${coinId}`).then((Response) =>
    Response.json()
  );
};

export let FetchCoinTicker = async (coinId?: string) => {
  return fetch(`${BASE_URL}/tickers/${coinId}`).then((Response) =>
    Response.json()
  );
};

export let FetchCoinHistory = async (coinId? : string)=>{
    const endDate = Math.floor(Date.now() /1000);
    const startDate = endDate - 60 * 60 * 23;
    return fetch(`${BASE_URL}/coins/${coinId}/ohlcv/historical?start=${startDate}&end=${endDate}`).then((response)=>response.json());
}