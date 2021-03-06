import '../public/style/components/header.css'
import React, { useState, useEffect } from 'react'
import Router from 'next/router'
import Link from 'next/link'
import axios from 'axios'
import servicePath from '../config/apiUrl'
import { Row, Col, Menu, Icon } from 'antd'

const Header = () => {
	const [navArray, setNavArray] = useState([])
	useEffect(() => {
		fetchData()
	}, [])

	const fetchData = () => {
		axios(servicePath.getTypeInfo)
			.then(res => {
				setNavArray(res.data.data)
			})
			.catch(e => console.log(e))
	}

	const handleClick = e => {
		if (e.key == 0) {
			Router.push('/')
		} else {
			Router.push('/list?id=' + e.key)
		}
	}

	return (
		<div className="header">
			<Row type="flex" justify="center">
				<Col xs={24} sm={24} md={10} lg={15} xl={11}>
					<Link href="/">
						<span className="header-logo"><a>JacleKlm</a></span>
					</Link>
					<span className="header-txt">Focus on Front.</span>
				</Col>
				<Col className="memu-div" xs={0} sm={0} md={14} lg={10} xl={8}>
					<Menu mode="horizontal" onClick={handleClick}>
						{/*<Menu.Item key="0">
							<Icon type="home" />
							博客首页
							</Menu.Item>*/}
						{navArray.map(item => {
							return (
								<Menu.Item key={item.id}>
									<Icon type={item.icon} />
									{item.typeName}
								</Menu.Item>
							)
						})}
					</Menu>
				</Col>
			</Row>
		</div>
	)
}

export default Header
