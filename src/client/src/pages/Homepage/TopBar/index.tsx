import { GithubOutlined, LinkedinOutlined } from '@ant-design/icons'
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
                        <span className='top-bar-value'>{props?.globalData?.market_cap_percentage?.btc && displayPercent(props?.globalData?.market_cap_percentage?.btc)}</span>
                    </div>
                </div>
                <div className='top-bar-right'>
                    {/* <SelectCreator 
                        data={props?.vsCurrencies}
                        onSelect={props?.onVsCurrencySelect}
                    /> */}
                    <div className='header-right flex'>
                        <div className='mr-2 header-nav'>
                            <a href="https://github.com/RobertJephthaHogan" target="_blank">
                                <GithubOutlined
                                    style={{
                                        color:'#000000'
                                    }}
                                />
                            </a>
                        </div>
                        <div className='mr-2 header-nav'>
                            <a href="https://www.linkedin.com/in/robert-hogan-378300191/" target="_blank">
                                <LinkedinOutlined
                                    style={{
                                        color:'#000000'
                                    }}
                                />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}