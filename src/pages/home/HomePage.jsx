import './style.less';
import './h5ds/css/h5ds.4.1.0.css'; // 编辑器样式
import './layers/plus'; // 手机端会执行的代码

import * as layers from './layers';

import React, { Component } from 'react'; // ...

import H5DS from './h5ds'; // ..
import { Modal } from 'antd';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { github } from 'react-syntax-highlighter/styles/hljs';
import pretty from 'pretty';

/**
 * @desc H5DS 接口参数
 * @param plugins [Component] 插件挂载
 *  Component 参数 {
 *     type: 'img',
 *     icon: <i className="h5ds ico-xxx" />,
 *     name: '图片',
 *     editor: Component, // 编辑区域
 *     layerdom: Component, // layer dom 纯react组件
 *     selectIcon: function() { return new Promise }
 *     origindata: json, // 原始数据
 *     willMount: function, // 挂载之前执行
 *     didMount: function, // 挂载之后执行
 *     willUnmount: function, // 挂载之后执行
 *     modal: Component, // 弹窗
 *     editorSet: { // 编辑器设置区域设置
            y: false,
            x: false,
            width: false,
            height: false,
            rotate: false,
            borderRadius: false,
            hide: false,
            opacity: false,
            shadow: false,
            border: false,
            animate: false, // 是否有动画
            interaction: false // 交互
        },
        scripts: [] // 加载第三方插件库
 *  }
 * @param data object 初始数据
 * @param storeback function 实例化store后，返回store对象
 * @param before function 初始化之前
 * @param success function 初始化之后 ...
 * @param fail function 失败时
 */
export default class HomePage extends Component {
  state = {
    visible: false,
    shtml: null
  };

  // 保存当前页面
  savePage = (appid, cdata) => {
    console.log('保存当前页面', appid, cdata);
    return new Promise((resolve, reject) => {
      // ...
      resolve();
    });
  };

  // 保存 app
  saveApp = (appid, cdata) => {
    console.log('保存APP', appid, cdata);
    return new Promise((resolve, reject) => {
      // ...
      resolve();
    });
  };

  // 发布
  publishApp = (appid, cdata, shtml) => {
    // console.log('发布应用', appid, cdata, shtml);
    return new Promise((resolve, reject) => {
      this.setState({ visible: true, shtml: pretty(shtml) });
      resolve();
    });
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  render() {
    const { visible, shtml } = this.state;
    return (
      <div>
        <H5DS
          appid="h5ds_demoid" 
          config={{ appHost: '', appCDN: '/assets', backUrl: '/' }}
          uploadSet={{}}
          savePage={this.savePage}
          saveApp={this.saveApp}
          publishApp={this.publishApp}
          plugins={[layers.domLayer]}
        />
        <Modal width={1200} title="生成代码" visible={visible} onOk={this.handleCancel} onCancel={this.handleCancel}>
          <div className="codes-detail">
            {/* <pre>{shtml}</pre> */}
            <SyntaxHighlighter language="htmlbars" style={github}>
              {shtml}
            </SyntaxHighlighter>
          </div>
        </Modal>
      </div>
    );
  }
}
