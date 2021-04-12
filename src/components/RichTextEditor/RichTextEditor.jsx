import React, { Component } from 'react';
import _ from 'lodash';

import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

class RichTextEditor extends Component {
  constructor(props) {
    super(props)
    this.setRichText()
  }

  state = {
    editorState: EditorState.createEmpty(), // 构建一个初始化状态的编辑器 + 空内容, 状态值是一个对象方法的返回值
  }

  onEditorStateChange = _.throttle((editorState) => {
    this.setState({ editorState });
  }, 300)

  // 获取带有样式的富文本的HTML, 让父组件调用以用于提交信息
  getRichText = () => {
    return draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))
  }

  // 将带有样式的富文本的字符串转换为HTML, 用于回显
  setRichText = () => {
    const detail = this.props.detail || ''
    const contentBlock = htmlToDraft(detail);
    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
      const editorState = EditorState.createWithContent(contentState);
      this.setState({ editorState });
    }
  }

  render() {
    const { editorState } = this.state;
    return (
      <div>
        <Editor
          editorState={editorState}
          // wrapperClassName="demo-wrapper"   // 最外侧容器的样式
          // editorClassName="demo-editor"     // 编辑区域的样式,
          editorStyle={{                       // 使用内联样式替代
            border:'1px solid black',
            lineHeight: '15px',
            minHeight: '200px',
            paddingLeft: '10px'
          }}
          onEditorStateChange={this.onEditorStateChange}
        />
        {/* <textarea
          disabled
          value={draftToHtml(convertToRaw(editorState.getCurrentContent()))} // 将文本转换为富文本
        /> */}
      </div>
    );
  }
}

export default RichTextEditor
