import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import React, { useEffect, useState } from 'react'
import { displayPercent, formatAsCurrency, formatNumber } from '../../helpers'
import { cryptoService } from '../../services/crypto.service'
import './styles.css'




interface CryptoProps {
    marketData?: any
}

export default function Cryptocurrencies(props : CryptoProps) {

    const [coinsPage, setCoinsPage] = useState<any>(1)
    const [marketData, setMarketData] = useState<any>()
    const [loading, setLoading] = useState<any>(true)
    const [lastMessage, setLastMessage] = useState<any>()
    const [referenceState, setReferenceState] = useState<any>({})


    // useEffect(() => {

    //     let ws : any = new WebSocket('wss://crypto.financialmodelingprep.com')

    //     ws.onopen = (event : any) => {
    //         console.log('on open event', event)
    //         console.log('process.env.REACT_APP_FMP_KEY', process.env.REACT_APP_FMP_KEY)
    //         ws.send(JSON.stringify({ "event": "login", "data": { "apiKey": process.env.REACT_APP_FMP_KEY } }));
            
    //     };

    //     ws.onmessage = (event: any) => {
    //         let message = JSON.parse(event.data)
    //         console.log('message', message)
    //         if (message.message == 'Authenticated') {
    //             ws.send(JSON.stringify({ "event": "subscribe", "data": { "ticker": "btcusd" } }))
    //             ws.send(JSON.stringify({ "event": "subscribe", "data": { "ticker": "ethusd" } }))
    //             ws.send(JSON.stringify({ "event": "subscribe", "data": { "ticker": "adausd" } }))
    //             ws.send(JSON.stringify({ "event": "subscribe", "data": { "ticker": "solusd" } }))
    //         }
    //         setLastMessage(message)
    //     }    
        

    //     return function cleanup() {
    //         ws.close()
    //     }

    // }, [])

    useEffect(() => {

        if (marketData) {
            let ws : any = new WebSocket('wss://crypto.financialmodelingprep.com')

            ws.onopen = (event : any) => {
                console.log('on open event', event)
                console.log('process.env.REACT_APP_FMP_KEY', process.env.REACT_APP_FMP_KEY)
                ws.send(JSON.stringify({ "event": "login", "data": { "apiKey": process.env.REACT_APP_FMP_KEY } }));
                
            };
    
            ws.onmessage = (event: any) => {
                let message = JSON.parse(event.data)
                console.log('message', message)
                if (message.message == 'Authenticated') {
                    console.log('MARKET DATA', marketData)
                    marketData.slice(0,25).forEach((element : any) => { // subscribe to the price feed for the first 25 tokens on current page (api subscription limit)
                        ws.send(JSON.stringify({ "event": "subscribe", "data": { "ticker": `${element?.symbol}usd` } }))
                    });
                }
                setLastMessage(message)
            }    
            
    
            return function cleanup() {
                ws.close()
            }
        }
        

    }, [marketData])

    useEffect(() => {
        const sym = lastMessage?.s?.slice(0,3)
        const ele = document.getElementById(`${sym}-price`)
        const workingState = {...referenceState}
        if (workingState.sym == lastMessage?.lp){
            //console.log('nothing changed')
        } else if (workingState.sym > lastMessage?.lp) { // if the new price is greater than the old price
            console.log('greater than')
            if (ele) {
                ele.innerText = formatAsCurrency(lastMessage?.lp)
                ele.style.color = '#3CF045'
                workingState[sym] = lastMessage?.lp
                setReferenceState(workingState)
            }
        } else if (workingState.sym < lastMessage?.lp) { // if the new price is less than the old price
            console.log('less than')
            if (ele) {
                ele.innerText = formatAsCurrency(lastMessage?.lp)
                ele.style.color = '#F05B3C'
                workingState[sym] = lastMessage?.lp
                setReferenceState(workingState)
            }
        } else {
            workingState.sym = lastMessage?.lp
            setReferenceState(workingState)
        }
        
        
    }, [lastMessage])


    useEffect(() => {
        cryptoService.getAllCoinMarketData(coinsPage).then((resp:any) => {
            setMarketData(resp.data)
            setLoading(false)
        }).catch((err:any) => {
            console.error('Error getting Coin Data', err)
        })
    }, [coinsPage])


    const decrementCoinPage = () => {
        if (coinsPage > 1) {
            setCoinsPage(coinsPage - 1)
        }
        setLoading(true)
    }


    const incrementCoinPage = () => {
        setCoinsPage(coinsPage + 1)
        setLoading(true)
    }


    return (
        <div className='cryptocurrencies'>
            <div className='cryptocurrencies-content'>
                {
                    !loading 
                    ? (
                        <TokenRows marketData={marketData}/>
                    ) 
                    : (
                        <div className='flex jc-c h-100' style={{position:'relative'}}>
                            <div className=' mt-9 loader-dual-ring'></div>
                        </div>
                    )
                }
                
                <div className='pagination-bar'>
                    <div className='pagination-back'>
                        <button
                            onClick={() => decrementCoinPage()}
                        >
                            <LeftOutlined/>
                        </button>
                    </div>
                    <div className='pagination-current'>
                        <div className='bordered flex jc-c' style={{width:'50px', display: 'flex', justifyContent:'center'}}>
                            {coinsPage}
                        </div>
                    </div>
                    <div className='pagination-next'>
                        <button
                            onClick={() => incrementCoinPage()}
                        >
                            <RightOutlined/>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}




function TokenRows(props : CryptoProps) {

    const rows = props?.marketData?.map((token: any) => {
        return (
            <div className='token-row'>
                <div className='token-data-cell'><span className='tr-text'>#{token.market_cap_rank}</span></div>
                <div className='token-data-cell'><span className='tr-text'>{token.symbol}</span></div>
                <div className='token-data-cell'><span className='tr-text'>{token.name}</span></div>
                <div className='token-data-cell'><span className='tr-text' id={`${token.symbol}-price`}>{formatAsCurrency(token.current_price)}</span></div>
                <div className='token-data-cell'><span className='tr-text'>{formatAsCurrency(token.ath)}</span></div>
                <div className='token-data-cell'><span className='tr-text'>{displayPercent(token.ath_change_percentage)}</span></div>
                <div className='token-data-cell'><span className='tr-text'>{new Date(token.ath_date)?.toLocaleDateString('en-US')}</span></div>
                <div className='token-data-cell'><span  className='tr-text'>{formatNumber(token.circulating_supply)}</span></div>
            </div>
        )
    }) || []


    return (
        <div>
            <div className='token-row-container'>
                <div className='flex brdr-b'>
                    <div className='token-data-cell'><span className='th-text'>Market Cap Rank</span></div>
                    <div className='token-data-cell'><span className='th-text'>Symbol</span></div>
                    <div className='token-data-cell'><span className='th-text'>Token Name</span></div>
                    <div className='token-data-cell'><span className='th-text'>Current Price</span></div>
                    <div className='token-data-cell'><span className='th-text'>All Time High</span></div>
                    <div className='token-data-cell'><span className='th-text'>ATH % Change</span></div>
                    <div className='token-data-cell'><span className='th-text'>ATH Date</span></div>
                    <div className='token-data-cell'><span className='th-text'>Circulating </span></div>
                </div>
                {rows}
            </div>
            
        </div>
    )
}