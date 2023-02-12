from fastapi import APIRouter
from .. import CoinGecko



router = APIRouter()

class CryptoController:

    def __init__(self, **kwargs):
        self.kwargs = kwargs
        self.tags = ['Crypto']



    # ------{ Simple }------- #

    # Get current price
    @router.get("/get_price_for_a_cryptocurrency/{id}/{vs_currencies}")
    async def get_entity_filing_history(id, vs_currencies ):
        return await CoinGecko(ids = id, vs_currencies = vs_currencies).get_price_for_a_cryptocurrency()


    # Get current price of tokens using contract addresses for a given platform 
    @router.get("/get_price_of_token_by_contract_address/{inputs}")
    async def get_price_of_token_by_contract_address(inputs):
        return await CoinGecko(inputs).get_price_of_token_by_contract_address()


    # Get supported currency pairs
    @router.get("/get_supported_currency_pairs")
    async def get_supported_currency_pairs():
        return await CoinGecko.get_supported_currency_pairs()



    # ------{ Coins }------- #

    # List all supported coins id, name and symbol (no pagination required)
    @router.get("/coins_list")
    async def get_crypto_coins_list():
        return await CoinGecko.get_coins_list()


    # List all supported coins price, market cap, volume, and market related data
    @router.get("/all_coin_market_data/{vs_currency}")
    async def get_entity_filing_history(vs_currency):
        return await CoinGecko(vs_currency = vs_currency).get_coins_markets()


    # Get current data (name, price, market, ... including exchange tickers) for a coin
    @router.get("/get_data_for_a_coin/{id}")
    async def get_data_for_a_coin(id):
        return await CoinGecko(id = id).get_current_data_for_a_coin()


    # Get coin tickers (paginated to 100 items)
    @router.get("/get_coin_ticker_by_id/{id}")
    async def get_coin_ticker_by_id(id):
        return await CoinGecko(id = id).get_coin_ticker_by_id()


    # Get historical market data include price, market cap, and 24h volume (granularity auto)
    @router.get("_market_chart/{id}/{vs_currency}/{days}")
    async def get_coin_ticker_by_id(id,vs_currency, days):
        return await CoinGecko(id = id, vs_currency = vs_currency , days = days ).market_chart()


    # Get coin's OHLC (beta)
    @router.get("_ohlc/{id}/{vs_currency}/{days}")
    async def get_crypto_ohlc(id,vs_currency, days):
        return await CoinGecko(id = id, vs_currency = vs_currency , days = days ).get_crypto_ohlc()


    # ------{ Contracts }------- #

    # Get coin info from contract address
    @router.get("/coin_info_from_contract_address/{id}/{contract_address}")
    async def get_coin_info_by_contract_address(id,contract_address):
        return await CoinGecko(id = id, contract_address = contract_address ).get_coin_info_by_contract_address()


    # Get historical market data include price, market cap, and 24h volume (granularity auto)
    @router.get("/get_market_data_by_contract_address/{id}/{contract_address}/{vs_currency}/{days}")
    async def get_market_data_by_contract_address(id, contract_address, vs_currency, days):
        return await CoinGecko(id = id, contract_address = contract_address, vs_currency = vs_currency , days = days ).get_market_data_by_contract_address()



    # ------{ Asset_platforms }------- #

    # List all supported coins price, market cap, volume, and market related data
    @router.get("/asset_platforms")
    async def get_crypto_coins_list():
        return await CoinGecko.asset_platforms()
    

    # ------{ Categories }------- #

    # List all categories
    @router.get("/list_all_categories")
    async def get_coins_categories_list():
        return await CoinGecko.get_coins_categories_list()


    # List all categories with market data
    @router.get("/get_coins_categories")
    async def get_coins_categories():
        return await CoinGecko.get_coins_categories()


    # ------{ Exchanges }------- #

    # List all exchanges
    @router.get("/get_exchanges_list")
    async def get_exchanges_list():
        return await CoinGecko.get_exchanges_list()


    # Use this to obtain all the markets' id in order to make API calls
    @router.get("/exchanges/exchange_ids")
    async def get_exchanges_id_name_list():
        return await CoinGecko.get_exchanges_id_name_list()


    # Get current data (name, price, market, ... including exchange tickers) for a coin
    @router.get("/get_exchanges_volume/{exchange_id}")
    async def get_exchanges_volume(exchange_id):
        return await CoinGecko(exchange_id = exchange_id).get_exchanges_volume()


    # Get coin tickers (paginated to 100 items)
    @router.get("/get_exchanges_tickers/{exchange_id}")
    async def get_exchanges_tickers(exchange_id):
        return await CoinGecko(exchange_id = exchange_id).get_exchanges_tickers()


    # List all supported coins price, market cap, volume, and market related data
    @router.get("/get_exchanges_volume_chart/{exchange_id}/{days}")
    async def get_exchanges_volume_chart(exchange_id, days):
        return await CoinGecko(exchange_id = exchange_id, days = days).get_exchanges_volume_chart()
    

    # ------{ Indexes }------- #

    # List all market indexes
    @router.get("/list_market_indexes")
    async def get_indexes():
        return await CoinGecko.get_indexes()


    # List market indexes id and name
    @router.get("/markets_id_and_name")
    async def get_indexes_list():
        return await CoinGecko.get_indexes_list()

    
    # ------{ Derivaties }------- #

    # List all derivative tickers
    @router.get("/list_all_derivative_tickers")
    async def get_derivatives():
        return await CoinGecko.get_derivatives()


    # List all derivative exchanges
    @router.get("/list_all_derivative_exchanges")
    async def get_derivatives_exchanges():
        return await CoinGecko.get_derivatives_exchanges()
    

    # show derivative exchange data
    @router.get("/get_derivatives_exchanges_by_id/{exchange_id}")
    async def get_derivatives_exchanges_by_id(exchange_id):
        return await CoinGecko(exchange_id = exchange_id).get_derivatives_exchanges_by_id()


    # List all derivative exchanges name and identifier
    @router.get("/get_derivatives_exchanges_list")
    async def get_derivatives_exchanges_list():
        return await CoinGecko.get_derivatives_exchanges_list()


    # ------{ Exchange Rates }------- #
    
    # Get BTC-to-Currency exchange rates
    @router.get("/btc_to_fiat_exchange_rates")
    async def get_exchange_rates():
        return await CoinGecko.get_exchange_rates()


    # ------{ Search }------- #

    # Search coin gecko
    @router.get("/search/{query}")
    async def cg_search(query):
        return await CoinGecko.cg_search(query)

    # ------{ Trending }------- #
    
    # Get trending search coins (Top-7) on CoinGecko in the last 24 hours
    @router.get("/search/trending")
    async def get_search_trending():
        return await CoinGecko.get_search_trending()


    # ------{ Global }------- #
    
    # Get cryptocurrency global data
    @router.get("/get_global_data")
    async def get_global_data():
        return await CoinGecko.get_global_data()

    
    # Get Top 100 Cryptocurrency Global Eecentralized Finance(defi) data
    @router.get("/global/decentralized_finance_defi")
    async def get_global_decentralized_finance_data():
        return await CoinGecko.get_global_decentralized_finance_data()


    # ------{ Companies }------- #

    # Get public companies bitcoin or ethereum holdings (Ordered by total holdings descending)
    @router.get("/public_company_treasuries")
    async def public_company_treasuries():
        return await CoinGecko.public_company_treasuries()