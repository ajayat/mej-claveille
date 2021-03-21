
import React, { Component } from 'react'
import AdminTemplate from "../../templates/admin/admin"
import Input from "../input/input"
import SunEditor from "suneditor-react"
import katex from "katex"
import 'katex/dist/katex.min.css'
import 'suneditor/dist/css/suneditor.min.css'

export default class ArticleEditor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: props.title,
            content: props.content
        }
    }
    render() {
        return <AdminTemplate.Body>
            <AdminTemplate.SubTitle value="Meta data"/>
            <div>
                <Input
                    type='text'
                    sendValue={value => {
                        this.setState({title: value})
                        this.props.updateTitle(value)
                    }}
                    defaultValue={this.state.title}
                    disable={false}>Titre</Input>
            </div>
            <AdminTemplate.SubTitle value="Contenu"/>
            <div>
                <SunEditor
                    onChange={value => {
                        this.setState({content: value})
                        this.props.updateContent(value)
                    }}
                    defaultValue={this.state.content}
                    lang="fr"
                    placeholder="Veuillez rédiger votre article ici..."
                    setOptions={{
                        katex: katex,
                        height: 200,
                        buttonList: [
                            ['undo', 'redo'],
                            ['fontSize', 'formatBlock'],
                            ['bold', 'underline', 'italic', 'strike', 'subscript', 'superscript'],
                            ['fontColor', 'hiliteColor', 'textStyle'],
                            ['paragraphStyle', 'blockquote'],
                            ['removeFormat'],
                            ['outdent', 'indent'],
                            ['align', 'horizontalRule', 'list', 'lineHeight'],
                            ['table', 'link', 'image', 'video', 'audio'],
                            ['fullScreen', 'showBlocks', 'codeView'],
                            ['math']
                        ]
                    }}  />
            </div>
        </AdminTemplate.Body>
    }
}