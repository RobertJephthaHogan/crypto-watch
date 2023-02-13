import React, { useEffect, useState } from 'react'
import Cryptocurrencies from '../../features/Cryptocurrencies'
import Exchanges from '../../features/Exchanges'
import Header from '../../layouts/Header'
import { cryptoService } from '../../services/crypto.service'
import SelectBar from './SelectBar'
import TopBar from './TopBar'



export default function Homepage() {

    const [coinsList, setCoinsList] = useState<any>()
    const [exchangesList, setExchangesList] = useState<any>()
    const [exchangeIDs, setExchangeIDs] = useState<any>()
    const [globalData, setGlobalData] = useState<any>()
    const [vsCurrencies, setVsCurrencies] = useState<any>()
    const [componentView, setComponentView] = useState<any>()


    useEffect(() => {

        cryptoService.getCoinsList().then((resp:any) => {
            console.log('resp', resp)
            setCoinsList(resp.data)
        }).catch((err:any) => {
            console.error('Error getting Coins List', err)
        })

        cryptoService.getExchangesList().then((resp:any) => {
            console.log('resp', resp)
            setExchangesList(resp.data)
        }).catch((err:any) => {
            console.error('Error getting Exchanges Lists', err)
        })

        cryptoService.getExchangeIDs().then((resp:any) => {
            console.log('resp', resp)
            setExchangeIDs(resp.data)
        }).catch((err:any) => {
            console.error('Error getting Exchange IDs', err)
        })

        cryptoService.getGlobalCryptoData().then((resp:any) => {
            console.log('resp', resp)
            setGlobalData(resp.data)
        }).catch((err:any) => {
            console.error('Error getting Global Crypto Data', err)
        })

        cryptoService.getSupportedCurrencyPairs().then((resp:any) => {
            console.log('resp', resp)
            setVsCurrencies(resp.data)
        }).catch((err:any) => {
            console.error('Error getting Global Crypto Data', err)
        })

    }, [])


    const onVsCurrencySelect = (value: any) => {
        console.log('value', value?.target?.value)
    }

    const onMenuSelect = (value: any) => {
        console.log('value', value)
        setComponentView(value)
    }


    return (
        <div>
            {/* <Header/> */}
            <TopBar
                coinsList={coinsList}
                exchangeIDs={exchangeIDs}
                globalData={globalData}
                vsCurrencies={vsCurrencies}
                onVsCurrencySelect={onVsCurrencySelect}
            />
            <SelectBar
                onMenuSelect={onMenuSelect}
            />
            <RenderSwitch 
                componentType={componentView}
                exchangeData={exchangesList}
            />
            
        </div>
    )
}





interface RenderSwitchProps {
    componentType: string
    exchangeData?: any
}

function RenderSwitch(props: RenderSwitchProps) {
    switch(props.componentType) {
        case 'cryptocurrencies':
            return <Cryptocurrencies/>
        case 'exchanges':
            return <Exchanges
                exchangeData={props.exchangeData}
            />

        default:
            return <Cryptocurrencies/>
    }
}