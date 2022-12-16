import axios from "axios";

const useDextool = () => {
  const fetchDexData = async (id: string) => {
    try {
      const chart = await axios.get(
        `https://www.dextools.io/shared/search/v2?query=${id}`
        // 'https://api.coingecko.com/api/v3/coins/binance-smart-chain/contract/0xcB2aDBCa6f15E9B3F1D98FcE57aC48a093F34fA9/market_chart/?vs_currency=usd&days=1'
      );
      // console.info("chart res", chart.status)
      return chart.data;
    } catch (error) {
      console.error(error);
    }
  };


  return {
    fetchDexData,
  };
};

export default useDextool;
