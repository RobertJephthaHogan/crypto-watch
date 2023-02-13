import { GithubOutlined, LinkedinOutlined, MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined } from '@ant-design/icons'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import userActions from '../../redux/actions/user'
import { store } from '../../redux/store'
import './styles.css'



export default function Header() {

    const navigate = useNavigate()

    function expandDropdown(dropdownID: any) {
        document?.getElementById(dropdownID)?.classList.toggle("show");
    }


    return (
        <div className='header' id='header'>
            <div className='header-left'>
                <div className='header-left-item'>
                    <span 
                        className='header-nav'
                        onClick={() => navigate('/')}
                    >
                        Home
                    </span>
                </div>
            </div>
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
    )
}