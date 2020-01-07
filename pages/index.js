import React, { useState, useEffect }  from 'react'
import Link from 'next/link'
import Head from 'next/head'
import { Row, Col, List, Icon } from 'antd'
import '../public/style/pages/index.css'
import Header from '../components/Header'
import Author from '../components/Author'
import Advert from '../components/Advert'
import Footer from '../components/Footer'
import axios from 'axios'

const Home = (props) => {
  const [ mylist , setMylist ] = useState(props.data)
  // useEffect(() => {
  //   getArticle()
  // })
  // const getArticle = () => {
  //   axios('http://localhost:7001/default/index')
  //   .then((res) => {
  //     console.log(res.data)
  //   })
  // }
  return (
    <div>
      <Head>
        <title>Home</title>
      </Head>
      <Header></Header>
      <Row className="comm-main" type="flex" justify="center">
        <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}  >
          <div>    
            <List
              header={<div>最新日志</div>}
              itemLayout="vertical"
              dataSource={mylist}
              renderItem={item => (
                <List.Item>
                  <div className="list-title">
                    <Link href={{pathname:'/detailed/', query:{ id: item.id }}}>
                      <a>{item.title}</a>
                    </Link>
                  </div>
                  <div className="list-icon">
                    <span><Icon type="calendar" /> {item.addTime}</span>
                    <span><Icon type="folder" /> {item.typeName}</span>
                    <span><Icon type="fire" /> {item.view_count}人</span>
                  </div>
                  <div className="list-context">{item.introduce}</div>  
                </List.Item>
              )}
            />    
          </div>
        </Col>
        <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
          <Author />
          <Advert />
        </Col>
      </Row>
      <Footer />
    </div>
  )
}

Home.getInitialProps = async ()=> { // Next的一个方法
  const promise = new Promise((resolve)=>{
    axios('http://localhost:7002/default/getArticleList').then(
      (res)=>{
        // console.log('远程获取数据结果:',res.data)
        resolve(res.data)
      }
    )
  })
  return await promise
}



export default Home
