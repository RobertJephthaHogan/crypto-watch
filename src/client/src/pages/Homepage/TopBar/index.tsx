import React from 'react'
import { SelectCreator } from '../../../components/inputs/SelectCreator'
import { displayPercent } from '../../../helpers'
import './styles.css'





interface TopBarProps {
    coinsList?: any,
    exchangeIDs?: any
    globalData?: any
    vsCurrencies?: any
    onVsCurrencySelect?: Function
}

export default function TopBar(props : TopBarProps) {

    return (
        <div className="top-bar">
            <div className="top-bar-content">
                <div className='top-bar-left'>
                    <div className='top-bar-item'>
                        <span className='top-bar-def'>Coins:</span>
                        <span className='top-bar-value'>{props?.coinsList?.length }</span>
                    </div>
                    <div className='top-bar-item'>
                        <span className='top-bar-def'>Exchanges:</span>
                        <span className='top-bar-value'>{props?.exchangeIDs?.length}</span>
                    </div>
                    {/* <div className='top-bar-item'>
                        <span className='top-bar-def'>Market Cap:</span>
                        <span className='top-bar-value'>$1,066,381,174,123</span>
                    </div> */}
                    <div className='top-bar-item'>
                        <span className='top-bar-def'>BTC Dominance:</span>
                        <span className='top-bar-value'>{displayPercent(props?.globalData?.market_cap_percentage?.btc)}</span>
                    </div>
                </div>
                <div className='top-bar-right'>
                    <SelectCreator 
                        data={props?.vsCurrencies}
                        onSelect={props?.onVsCurrencySelect}
                    />
                </div>
            </div>
        </div>
    )
}