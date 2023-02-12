import React from 'react'
import './styles.css'



interface SelectBarProps {
    onMenuSelect: Function
}

export default function SelectBar(props : SelectBarProps) {

    return (
        <div className="select-bar">
            <div className='select-bar-content'>
                <div 
                    className='select-bar-item'
                    onClick={() => props.onMenuSelect('cryptocurrencies')}
                >
                    CryptoCurrencies
                </div>
                <div 
                    className='select-bar-item'
                    onClick={() => props.onMenuSelect('exchanges')}
                >
                    Exchanges
                </div>
                <div 
                    className='select-bar-item'
                >
                    Select Bar Item
                </div>
            </div>
        </div>
    )
}