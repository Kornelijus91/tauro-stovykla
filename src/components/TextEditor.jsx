'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import TextAlign from '@tiptap/extension-text-align'
import Underline from '@tiptap/extension-underline'
import React, { useCallback, useState } from 'react'
import Tooltip from "@/components/Tooltip"
import Link from '@tiptap/extension-link'
import { 
    BoldIcon, 
    ItalicIcon, 
    StrikeIcon, 
    ClearIcon, 
    Header1Icon, 
    Header2Icon, 
    Header3Icon, 
    BulletListIcon,
    NumberListIcon,
    RuleIcon,
    UndoIcon,
    RedoIcon,
    AlignLeftIcon,
    AlignRightIcon,
    AlignCenterIcon,
    UnderlineIcon,
    LinkIcon,
    ParagraphIcon
} from './Svgs'

const MenuBar = ({ editor }) => {
    const setLink = useCallback(() => {
        const previousUrl = editor.getAttributes('link').href

        if ((typeof previousUrl === 'string' || previousUrl instanceof String) && previousUrl.length > 0) {
            editor.chain().focus().unsetLink().run()
            return
        }

        const url = window.prompt('URL', previousUrl)
    
        if (url === null) {
            return
        }
    
        if (url === '') {
            editor.chain().focus().extendMarkRange('link').unsetLink().run()
            return
        }
    
        editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
    }, [editor])
  
    if (!editor) return null
  
    return (
        <div 
            className='
                flex 
                gap-4 
                border-solid 
                border-2 
                border-fontColor-dark 
                rounded-t-lg 
                py-2 
                px-4
                bg-bgColor-input
                [&>button]:p-1
                [&>button]:rounded-lg
            '
        >
            <Tooltip text='Paryškinti'>
                <button
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    disabled={
                        !editor.can()
                        .chain()
                        .focus()
                        .toggleBold()
                        .run()
                    }
                    className='disabled:opacity-40 hover:bg-bgColor-light transition-all ease-in-out duration-150'
                    style={{
                        backgroundColor: editor.isActive('bold') ? '#e9ce96' : ''
                    }}
                >
                    <BoldIcon className='h-6 w-6'/>
                </button>
            </Tooltip>
            <Tooltip text='Kursyvas'>
                <button
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    disabled={
                        !editor.can()
                        .chain()
                        .focus()
                        .toggleItalic()
                        .run()
                    }
                    className='disabled:opacity-40 hover:bg-bgColor-light transition-all ease-in-out duration-150'
                    style={{
                        backgroundColor: editor.isActive('italic') ? '#e9ce96' : ''
                    }}
                >
                    <ItalicIcon className='h-6 w-6'/>
                </button>
            </Tooltip>
            <Tooltip text='Pabraukti'>
                <button
                    onClick={() => editor.chain().focus().toggleUnderline().run()}
                    disabled={
                        !editor.can()
                        .chain()
                        .focus()
                        .toggleItalic()
                        .run()
                    }
                    className='disabled:opacity-40 hover:bg-bgColor-light transition-all ease-in-out duration-150'
                    style={{
                        backgroundColor: editor.isActive('underline') ? '#e9ce96' : ''
                    }}
                >
                    <UnderlineIcon className='h-6 w-6'/>
                </button>
            </Tooltip>
            <Tooltip text='Perbraukti'>
                <button
                    onClick={() => editor.chain().focus().toggleStrike().run()}
                    disabled={
                        !editor.can()
                        .chain()
                        .focus()
                        .toggleStrike()
                        .run()
                    }
                    className='disabled:opacity-40 hover:bg-bgColor-light transition-all ease-in-out duration-150'
                    style={{
                        backgroundColor: editor.isActive('strike') ? '#e9ce96' : ''
                    }}
                >
                    <StrikeIcon className='h-6 w-6'/>
                </button>
            </Tooltip>
            <Tooltip text='Nuoroda'>
                <button
                    onClick={setLink}
                    disabled={
                        !editor.can()
                        .chain()
                        .focus()
                        .toggleStrike()
                        .run()
                    }
                    className='disabled:opacity-40 hover:bg-bgColor-light transition-all ease-in-out duration-150'
                    style={{
                        backgroundColor: editor.isActive('link') ? '#e9ce96' : ''
                    }}
                >
                    <LinkIcon className='h-6 w-6'/>
                </button>
            </Tooltip>
            <Tooltip text='Valyti formatavimą'>
                <button 
                    onClick={() => {
                            editor.chain().focus().unsetAllMarks().run()
                            editor.chain().focus().clearNodes().run()
                        }
                    } 
                    className='disabled:opacity-40 hover:bg-bgColor-light transition-all ease-in-out duration-150'
                >
                    <ClearIcon className='h-6 w-6'/>
                </button>
            </Tooltip>
            <Tooltip text='Paragrafas'>
                <button
                    onClick={() => editor.chain().focus().setParagraph().run()}
                    className='disabled:opacity-40 hover:bg-bgColor-light transition-all ease-in-out duration-150'
                    style={{
                        backgroundColor: editor.isActive('paragraph') ? '#e9ce96' : ''
                    }}
                >
                    <ParagraphIcon className='h-6 w-6'/>
                </button>
            </Tooltip>
            <Tooltip text='Antraštė 1'>
                <button
                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                    className='disabled:opacity-40 hover:bg-bgColor-light transition-all ease-in-out duration-150'
                    style={{
                        backgroundColor: editor.isActive('heading', { level: 2 }) ? '#e9ce96' : ''
                    }}
                >
                    <Header1Icon className='h-6 w-6'/>
                </button>
            </Tooltip>
            <Tooltip text='Antraštė 2'>
                <button
                    onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                    className='disabled:opacity-40 hover:bg-bgColor-light transition-all ease-in-out duration-150'
                    style={{
                        backgroundColor: editor.isActive('heading', { level: 3 }) ? '#e9ce96' : ''
                    }}
                >
                    <Header2Icon className='h-6 w-6'/>
                </button>
            </Tooltip>
            <Tooltip text='Antraštė 3'>
                <button
                    onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
                    className='disabled:opacity-40 hover:bg-bgColor-light transition-all ease-in-out duration-150'
                    style={{
                        backgroundColor: editor.isActive('heading', { level: 4 }) ? '#e9ce96' : ''
                    }}
                >
                    <Header3Icon className='h-6 w-6'/>
                </button>
            </Tooltip>
            <Tooltip text='Sąrašas'>
                <button
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    className='disabled:opacity-40 hover:bg-bgColor-light transition-all ease-in-out duration-150'
                >
                    <BulletListIcon className='h-6 w-6'/>
                </button>
            </Tooltip>
            <Tooltip text='Numeruotas sąrašas'>
                <button
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    className='disabled:opacity-40 hover:bg-bgColor-light transition-all ease-in-out duration-150'
                >
                    <NumberListIcon className='h-6 w-6'/>
                </button>
            </Tooltip>
            <Tooltip text='Skirtukas'>
                <button onClick={() => editor.chain().focus().setHorizontalRule().run()} className='disabled:opacity-40 hover:bg-bgColor-light transition-all ease-in-out duration-150'>
                    <RuleIcon className='h-6 w-6'/>
                </button>
            </Tooltip>
            <Tooltip text='Lygiuoti kairėje'>
                <button 
                    onClick={() => editor.chain().focus().setTextAlign('left').run()} 
                    className='disabled:opacity-40 hover:bg-bgColor-light transition-all ease-in-out duration-150'
                    style={{
                        backgroundColor: editor.isActive({ textAlign: 'left' }) ? '#e9ce96' : ''
                    }}
                >
                    <AlignLeftIcon className='h-6 w-6'/>
                </button>
            </Tooltip>
            <Tooltip text='Lygiuoti centre'>
                <button 
                    onClick={() => editor.chain().focus().setTextAlign('center').run()} 
                    className='disabled:opacity-40 hover:bg-bgColor-light transition-all ease-in-out duration-150'
                    style={{
                        backgroundColor: editor.isActive({ textAlign: 'center' }) ? '#e9ce96' : ''
                    }}
                >
                    <AlignCenterIcon className='h-6 w-6'/>
                </button>
            </Tooltip>
            <Tooltip text='Lygiuoti dešnėje'>
                <button 
                    onClick={() => editor.chain().focus().setTextAlign('right').run()} 
                    className='disabled:opacity-40 hover:bg-bgColor-light transition-all ease-in-out duration-150'
                    style={{
                        backgroundColor: editor.isActive({ textAlign: 'right' }) ? '#e9ce96' : ''
                    }}
                >
                    <AlignRightIcon className='h-6 w-6'/>
                </button>
            </Tooltip>
            <Tooltip text='Panaikinti'>
                <button
                    onClick={() => editor.chain().focus().undo().run()}
                    className='disabled:opacity-40 hover:bg-bgColor-light transition-all ease-in-out duration-150'
                    disabled={
                        !editor.can()
                        .chain()
                        .focus()
                        .undo()
                        .run()
                    }
                >
                    <UndoIcon className='h-6 w-6'/>
                </button>
            </Tooltip>
            <Tooltip text='Perdaryti'>
                <button
                    onClick={() => editor.chain().focus().redo().run()}
                    className='disabled:opacity-40 hover:bg-bgColor-light transition-all ease-in-out duration-150'
                    disabled={
                        !editor.can()
                        .chain()
                        .focus()
                        .redo()
                        .run()
                    }
                >
                    <RedoIcon className='h-6 w-6'/>
                </button>
            </Tooltip>
        </div>
    )
}


const Tiptap = ({ setArticleContent, articleContent }) => {

    const [loaded, setLoaded] = useState(false)

    const editor = useEditor({
        extensions: [
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
            Highlight,
        ],
        editorProps: {
            attributes: {
                class: `focus:outline-none border-solid border-x-2 border-b-2 border-fontColor-dark rounded-b-lg py-2 px-4 bg-bgColor-input flex flex-col grow h-0 min-h-full overflow-y-auto`,
            },
        },
        content: '',
        onUpdate: ({ editor }) => {
            const json = editor.getJSON()
            setArticleContent(JSON.stringify(json))
        },
    })

    if (editor && !loaded && articleContent && articleContent !== '') {
        editor.commands.setContent({
            "type": "doc",
            "content":[JSON.parse(articleContent)]
        })
        setLoaded(true)
    }

    return (
        <div className='flex flex-col grow'>
            <MenuBar editor={editor}/>
            <EditorContent 
                editor={editor} 
                className='flex flex-col grow'
            />
        </div>
    )
}

export default Tiptap