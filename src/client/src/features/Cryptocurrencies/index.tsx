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


    useEffect(() => {
        cryptoService.getAllCoinMarketData(coinsPage).then((resp:any) => {
            console.log('resp', resp)
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
                <div className='token-data-cell'><span className='tr-text'>{token.name}</span></div>
                <div className='token-data-cell'><span className='tr-text'>{formatAsCurrency(token.current_price)}</span></div>
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