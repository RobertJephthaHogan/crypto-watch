import { getConfig } from '../config/Constants'
import axios from 'axios'


const config = getConfig()

const apiInstance = axios.create({
    baseURL: `${config.apiUrl}/`,
    headers: {
        'Content-Type': 'application/json',
    },
})


export const cryptoService = {
    getAllCoinMarketData,
    getCoinsList,
    getExchangesList,
    getExchangeIDs,
    getGlobalCryptoData,
    getSupportedCurrencyPairs
}


function getAllCoinMarketData() {
    return new Promise((resolve, reject) => {
        apiInstance
            .get(`/cg/all_coin_market_data/USD`)
            .then((response) => {
                return resolve(response)
            })
            .catch((error) => {
                console.error(error)
                reject(error)
            })
    })
}


function getCoinsList() {
    return new Promise((resolve, reject) => {
        apiInstance
            .get(`/cg/coins_list`)
            .then((response) => {
                return resolve(response)
            })
            .catch((error) => {
                console.error(error)
                reject(error)
            })
    })
}


function getExchangesList() {
    return new Promise((resolve, reject) => {
        apiInstance
            .get(`/cg/get_exchanges_list`)
            .then((response) => {
                return resolve(response)
            })
            .catch((error) => {
                console.error(error)
                reject(error)
            })
    })
}


function getExchangeIDs() {
    return new Promise((resolve, reject) => {
        apiInstance
            .get(`/cg/exchanges/exchange_ids`)
            .then((response) => {
                return resolve(response)
            })
            .catch((error) => {
                console.error(error)
                reject(error)
            })
    })
}


function getGlobalCryptoData() {
    return new Promise((resolve, reject) => {
        apiInstance
            .get(`/cg/get_global_data`)
            .then((response) => {
                return resolve(response)
            })
            .catch((error) => {
                console.error(error)
                reject(error)
            })
    })
}



function getSupportedCurrencyPairs() {
    return new Promise((resolve, reject) => {
        apiInstance
            .get(`/cg/get_supported_currency_pairs`)
            .then((response) => {
                return resolve(response)
            })
            .catch((error) => {
                console.error(error)
                reject(error)
            })
    })
}