




from requests import session
from pycoingecko import CoinGeckoAPI




cg = CoinGeckoAPI()

class CoinGecko:

    def __init__(self, **kwargs):
        self.kwargs = kwargs
        self.id = kwargs.get("id") if kwargs.get("id") else None 
        self.ids = kwargs.get("ids") if kwargs.get("ids") else None 
        self.vs_currency = kwargs.get("vs_currency") if kwargs.get("vs_currency") else None 
        self.vs_currencies = kwargs.get("vs_currencies") if kwargs.get("vs_currencies") else None 
        self.days = kwargs.get("days") if kwargs.get("days") else None 
        self.contract_address = kwargs.get("contract_address") if kwargs.get("contract_address") else None 
        self.contract_addresses = kwargs.get("contract_addresses") if kwargs.get("contract_addresses") else None 
        self.window = kwargs.get("window") if kwargs.get("window") else None 
        self.exchange_id = kwargs.get("exchange_id") if kwargs.get("exchange_id") else None 
        self.page = kwargs.get("page") if kwargs.get("page") else 1 


    # ------{ Simple }------- #

    # Get current price
    async def get_price_for_a_cryptocurrency(self):
        return cg.get_price(ids = self.ids, vs_currencies = self.vs_currencies)


    # Get current price of tokens using contract addresses for a given platform 
    async def get_price_of_token_by_contract_address(self):
        return cg.get_token_price(id = self.id, vs_currencies = self.vs_currencies, contract_addresses = self.contract_addresses)


    # Get supported currency pairs
    async def get_supported_currency_pairs():
        return cg.get_supported_vs_currencies()

    

    # ------{ Coins }------- #

    # List all supported coins id, name and symbol (no pagination required)
    async def get_coins_list():
        return cg.get_coins_list()


    # List all supported coins price, market cap, volume, and market related data
    async def get_coins_markets(self):
        return cg.get_coins_markets(vs_currency = self.vs_currency, page = self.page)


    # Get current data (name, price, market, ... including exchange tickers) for a coin
    async def get_current_data_for_a_coin(self):
        return cg.get_coin_by_id(id = self.id)


    # Get coin tickers (paginated to 100 items)
    async def get_coin_ticker_by_id(self):
        return cg.get_coin_ticker_by_id(id = self.id)


    # Get historical data (name, price, market, stats) at a given date for a coin
    # Meh - Probably dont need this - just snapshots of a coins data at a point in time (can allready get current)


    # Get historical market data include price, market cap, and 24h volume (granularity auto)
    async def market_chart(self):
        return cg.get_coin_market_chart_by_id(id = self.id, vs_currency = self.vs_currency, days = self.days)


    # Get historical market data include price, market cap, and 24h volume within a range of timestamp (granularity auto)
    # Meh - Probably pass


    # Get coin's OHLC (beta)
    async def get_crypto_ohlc(self):
        return cg.get_coin_ohlc_by_id(id = self.id, vs_currency = self.vs_currency, days = self.days)



    # ------{ Contracts }------- #

    # Get coin info from contract address
    async def get_coin_info_by_contract_address(self):
        return cg.get_coin_info_from_contract_address_by_id(id = self.id, contract_address = self.contract_address)
    

    # Get historical market data include price, market cap, and 24h volume (granularity auto)
    async def get_market_data_by_contract_address(self):
        return cg.get_coin_market_chart_from_contract_address_by_id(id = self.id, contract_address = self.contract_address, vs_currency = self.vs_currency, days = self.days)
        


    # ------{ Asset_platforms }------- #

    # List all supported coins price, market cap, volume, and market related data
    async def asset_platforms():
        return cg.get_asset_platforms()



    # ------{ Categories }------- #

    # List all categories
    async def get_coins_categories_list():
        return cg.get_coins_categories_list()


    # List all categories with market data
    async def get_coins_categories():
        return cg.get_coins_categories()



    # ------{ Exchanges }------- #

    # List all exchanges
    async def get_exchanges_list():
        return cg.get_exchanges_list()


    # Use this to obtain all the markets' id in order to make API calls
    async def get_exchanges_id_name_list():
        return cg.get_exchanges_id_name_list()


    # Get exchange volume in BTC and tickers
    async def get_exchanges_volume(self):
        return cg.get_exchanges_by_id(id = self.exchange_id)

    
    # Get exchange tickers (paginated)
    async def get_exchanges_tickers(self):
        return cg.get_exchanges_tickers_by_id(id = self.exchange_id)


    # Get volume_chart data for a given exchange
    async def get_exchanges_volume_chart(self):
        return cg.get_exchanges_volume_chart_by_id(id = self.exchange_id, days = self.days)



    # ------{ Indexes }------- #

    # List all market indexes
    async def get_indexes():
        return cg.get_indexes()


    # List market indexes id and name
    async def get_indexes_list():
        return cg.get_indexes_list()



    # ------{ Derivaties }------- #

    # List all derivative tickers
    async def get_derivatives():
        return cg.get_derivatives()


    # List all derivative exchanges
    async def get_derivatives_exchanges():
        return cg.get_derivatives_exchanges()


    # show derivative exchange data
    async def get_derivatives_exchanges_by_id(self):
        return cg.get_derivatives_exchanges_by_id(id = self.exchange_id)


    # List all derivative exchanges name and identifier
    async def get_derivatives_exchanges_list():
        return cg.get_derivatives_exchanges_list()



    # ------{ Exchange Rates }------- #

    # Get BTC-to-Currency exchange rates
    async def get_exchange_rates():
        return cg.get_exchange_rates()



    # ------{ Search }------- #

    # Get BTC-to-Currency exchange rates
    async def cg_search(query):
        return cg.search(query)


    # ------{ Trending }------- #

    # Get trending search coins (Top-7) on CoinGecko in the last 24 hours
    async def get_search_trending():
        return cg.get_search_trending()



    # ------{ Global }------- #

    # Get cryptocurrency global data
    async def get_global_data():
        return cg.get_global()

    
    # Get Top 100 Cryptocurrency Global Eecentralized Finance(defi) data
    async def get_global_decentralized_finance_data():
        return cg.get_global_decentralized_finance_defi()



    # ------{ Companies }------- #

    # Get public companies bitcoin or ethereum holdings (Ordered by total holdings descending)
    async def public_company_treasuries(self):
        return cg.get_companies_public_treasury_by_coin_id(coin_id = self.id)