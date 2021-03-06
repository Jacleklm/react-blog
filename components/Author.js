import React from 'react'
import { Avatar, Divider, Tooltip } from 'antd'
import '../public/style/components/author.css'

const Author = () => {
    return (
      <div className="author-div comm-box">
        <div> <Avatar size={100} src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1578292717901&di=6a96c32da656ef91c40f8bc4171e4b24&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20180625%2Ffea477a5e5b64805a8e2fd6be1199cf5.jpeg" /></div>
        <div className="author-name">JacleKlm</div>
        <div className="author-introduction">
          专注于WEB前端开发
          <Divider>社交账号</Divider>
          <Tooltip title="https://github.com/Jacleklm">
            <a href="https://github.com/Jacleklm" target="#">
              <Avatar size={28} icon="github" className="account" />
            </a>
          </Tooltip>
          <Tooltip title="QQ: 1061161721">
            <Avatar size={28} icon="qq"  className="account" />
          </Tooltip>
          <Tooltip title="wechat: JacleKlm">
            <Avatar size={28} icon="wechat"  className="account"  />
          </Tooltip>
        </div>
      </div>
    )
}

export default Author