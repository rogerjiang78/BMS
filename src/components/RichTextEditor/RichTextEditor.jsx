import React, { Component } from 'react';

import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';


class RichTextEditor extends Component {
  state = {
    editorState: EditorState.createEmpty(), // 构建一个初始化状态的编辑器 + 空内容
  }

  onEditorStateChange = (editorState) => {
    this.setState({ editorState });
  };
  // 获取带有样式的富文本的HTML
  getRichText = () => {
    return draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))
  }

  // 将带有样式的富文本的租房处转换为 HTML
  setRichText = (html) => {
    const contentBlock = htmlToDraft(html);
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
          // editorClassName="demo-editor"     // 编辑区域的样式, 也可以使用下面的内联样式替代
          editorStyle={{
            border:'1px solid black',
            lineHeight: '15px',
            minHeight: '200px'
          }}
          onEditorStateChange={this.onEditorStateChange}
        />
        {/* <textarea
          disabled
          value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
        /> */}
      </div>
    );
  }
}

export default RichTextEditor
