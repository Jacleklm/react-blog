import '../public/style/pages/detailed.css'
import Head from 'next/head'
import { Row, Col, Icon, Breadcrumb, Affix } from 'antd'
// import ReactMarkdown from 'react-markdown'
import React, { useState, useEffect }  from 'react'
import Header from '../components/Header'
import Author from '../components/Author'
import Advert from '../components/Advert'
import Footer from '../components/Footer'
// import MarkNav from 'markdown-navbar'
import 'markdown-navbar/dist/navbar.css'
import axios from 'axios'
import marked from 'marked'
import hljs from 'highlight.js';
import 'highlight.js/styles/monokai-sublime.css';
import Tocify from '../components/tocify.tsx'
import  servicePath  from '../config/apiUrl'

const Detailed = (props) => {
	const [ mylist , setMylist ] = useState(props)

	const tocify = new Tocify()
	// marked相应配置
	const renderer = new marked.Renderer();
	// 重新定义对#这种标签的解析
	renderer.heading = function(text, level, raw) {
		const anchor = tocify.add(text, level);
		return `<a id="${anchor}" href="#${anchor}" class="anchor-fix"><h${level}>${text}</h${level}></a>\n`;
	};
	marked.setOptions({
    renderer: renderer, // 这个是必须填写的，你可以通过自定义的Renderer渲染出自定义的格式
    gfm: true, // 启动类似Github样式的Markdown,填写true或者false
    pedantic: false, //只解析符合Markdown定义的，不修正Markdown的错误。填写true或者false
    sanitize: false, // 原始输出，忽略HTML标签，这个作为一个开发人员，一定要写flase
    tables: true, // 支持Github形式的表格，必须打开gfm选项
    breaks: false, // 支持Github换行符，必须打开gfm选项，填写true或者false
    smartLists: true, // 优化列表输出，这个填写ture之后，你的样式会好看很多，所以建议设置成ture
    smartypants: false,
    highlight: function (code) { // 高亮显示规则 ，这里我们将使用highlight.js来完成
      return hljs.highlightAuto(code).value;
    }
	}); 
	// 把文章内容用marked()进行渲染
	let html = marked( mylist.article_content )

	return (
		<div>
			<Head>
				<title>{ mylist.title }</title>
			</Head>
			<Header />
			<Row className="comm-main" type="flex" justify="center">
				<Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
					<Author />
					<Advert />
					<Affix offsetTop={5}>
						<div className="detailed-nav comm-box">
							<div className="nav-title">文章目录</div>
							<div className="toc-list">
  							{tocify && tocify.render()}
							</div>
						</div>
					</Affix>
				</Col>
				<Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}>
					<div>
						<div className="bread-div">
							<Breadcrumb>
								<Breadcrumb.Item>
									<a href="/">首页</a>
								</Breadcrumb.Item>
								<Breadcrumb.Item>视频列表</Breadcrumb.Item>
								<Breadcrumb.Item>{ mylist.title }</Breadcrumb.Item>
							</Breadcrumb>
						</div>
						<div>
							<div className="detailed-title">{ mylist.title }</div>
							<div className="list-icon center">
								<span>
									<Icon type="calendar" /> 发表于 { mylist.addTime }
								</span>
								<span>
									<Icon type="folder" /> 分类于 { mylist.typeName }
								</span>
								<span>
									<Icon type="fire" /> { mylist.view_count }人
								</span>
							</div>

							<div className="detailed-content" dangerouslySetInnerHTML={{__html:html}}>
							</div>
						</div>
					</div>
				</Col>
			</Row>
			<Footer />
		</div>
	)
}

Detailed.getInitialProps = async(context)=>{
	let id =context.query.id
  const promise = new Promise((resolve)=>{
    axios(servicePath.getArticleById + id).then(
      (res)=>{
        resolve(res.data.data[0])
      }
    )
  })
  return await promise
}

export default Detailed
