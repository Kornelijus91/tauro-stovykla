import Bold from '@tiptap/extension-bold'
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import { generateHTML } from '@tiptap/html'
import StarterKit from '@tiptap/starter-kit'
import TextAlign from '@tiptap/extension-text-align'
import Underline from '@tiptap/extension-underline'
import Link from '@tiptap/extension-link'

const ArticleRender = ({ json }) => {
    const output = generateHTML(json, [
        // Document,
        // Paragraph,
        // Text,
        // Bold,
        StarterKit,
        Underline,
        Link.configure({
            protocols: ['ftp', 'mailto'],
            HTMLAttributes: {
                class: 'underline text-blue-500 cursor-pointer',
            },
        }),
        TextAlign.configure({
            types: ['heading', 'paragraph'],
        }),
        // Highlight,
    ])

    return (
        <div dangerouslySetInnerHTML={{ __html: output }} className='text-fontColor-dark' />
    )
}

export default ArticleRender