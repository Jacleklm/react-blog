import React, { useState, useEffect } from 'react'
import axios from 'axios'
import servicePath from '../config/apiUrl'

const Test = props => {
	const [data, setData] = useState(0)
	useEffect(() => {
		fetchData()
	}, [])
	const fetchData = () => {
		axios(servicePath.getArticleList).then(res => {
			setData(res.data.test)
		})
	}
	return (
		<div>
			<h1>getInitialProps: {props.test}</h1>
			<h1>Hook: {data}</h1>
		</div>
	)
}

Test.getInitialProps = async () => {
	const promise = new Promise(resolve => {
		axios(servicePath.getArticleList).then(res => {
			resolve(res.data)
		})
	})
	return await promise
}

export default Test
