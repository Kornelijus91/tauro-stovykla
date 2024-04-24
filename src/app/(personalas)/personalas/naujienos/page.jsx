'use client'

import { useState, useEffect } from 'react'
import { Plus, Trash, Spinner, Edit } from "@/components/Svgs"
import { collection, query, getDocs, orderBy, limit, getCountFromServer, startAfter, endBefore, doc, deleteDoc  } from "firebase/firestore"
import { database } from '@/app/firebase'
import useStore from "@/app/state"
import Link from 'next/link'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import ReactPaginate from 'react-paginate'
import Tooltip from '@/components/Tooltip'
import { deleteFile } from '@/lib/utils'
import DelArticleConfirm from '@/components/DelArticleConfirm'

const Naujienos = () => {

    const ITEMS_PER_PAGE = 20

    const { setToast } = useStore((state) => state)
    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(false)
    const [deletingArticle, setDeletingArticle] = useState('')
    const [loadingPage, setLoadingPage] = useState(false)
    const [currentPage, setCurrentPage] = useState(0)
    const [pageCount, setPageCount] = useState(0)
    const [pagination, setPagination] = useState({
        prev: null,
        next: null
    })
    const [deletingArticleConfirm, setDeletingArticleConfirm] = useState({
        item: null,
        open: false
    })

    const getPageData = async (querySnapshot) => {
        return new Promise(async (resolve, reject) => {
            try {
                const cq = query(collection(database, "naujienos"), orderBy("created", "desc"))
                const countSnapshot = await getCountFromServer(cq)
                let data = []
                querySnapshot.forEach((doc) => {
                    const item = doc.data()
                    data.push({
                        id: doc.id,
                        title: item.title,
                        content: item.content,
                        imageURL: item.imageURL,
                        created: 
                            new Date(item.created.seconds * 1000).getFullYear() + '-' +
                            ('0' + new Date(item.created.seconds * 1000).getMonth()).slice(-2) + '-' + 
                            ('0' + new Date(item.created.seconds * 1000).getDate()).slice(-2)
                    })
                })
                setArticles(data)
                setPageCount(Math.ceil(countSnapshot.data().count / ITEMS_PER_PAGE))
                resolve()
            } catch (err) {
                console.error(err)
                setToast(
                    'warning',
                    'Klaida! Nepavyko gauti naujienų, pabandykite vėliau.'      
                )
                reject()
            }
		})
    }
    

    const getNextPage = async () => {
        try {
            setLoadingPage(true)
            const q = query(collection(database, "naujienos"), orderBy("created", "desc"), startAfter(pagination.next), limit(ITEMS_PER_PAGE))
            const querySnapshot = await getDocs(q)
            setPagination({
                prev: querySnapshot.docs[0],
                next: querySnapshot.docs[querySnapshot.docs.length-1]
            })
            await getPageData(querySnapshot)
            setLoading(false)
            setLoadingPage(false)
        } catch (err) {
            console.error(err)
            setToast(
                'warning',
                'Klaida! Nepavyko gauti naujienų, pabandykite vėliau.'      
            )
            setLoadingPage(false)
        }
    }

    const getPrevPage = async () => {
        try {
            setLoadingPage(true)
            const q = query(collection(database, "naujienos"), orderBy("created", "desc"), endBefore(pagination.prev), limit(ITEMS_PER_PAGE))
            const querySnapshot = await getDocs(q)
            setPagination({
                prev: querySnapshot.docs[0],
                next: querySnapshot.docs[querySnapshot.docs.length-1]
            })
            await getPageData(querySnapshot)
            setLoading(false)
            setLoadingPage(false)
        } catch (err) {
            console.error(err)
            setToast(
                'warning',
                'Klaida! Nepavyko gauti naujienų, pabandykite vėliau.'      
            )
            setLoadingPage(false)
        }
    }

    const getFirstPage = async () => {
        try {
            setLoading(true)
            const q = query(collection(database, "naujienos"), orderBy("created", "desc"), limit(ITEMS_PER_PAGE))
            const querySnapshot = await getDocs(q)
            setPagination({
                prev: querySnapshot.docs[0],
                next: querySnapshot.docs[querySnapshot.docs.length-1]
            })
            await getPageData(querySnapshot)
            setLoading(false)
        } catch (err) {
            console.error(err)
            setToast(
                'warning',
                'Klaida! Nepavyko gauti naujienų, pabandykite vėliau.'      
            )
            setLoading(false)
        }
    }

    const handlePageClick = (page) => {
        setCurrentPage(page.selected)
        if (page.selected > currentPage) {
            getNextPage()
        } else {
            getPrevPage()
        }
    }

    const deleteArticle = async (item) => {
        try {
            setDeletingArticle(item.id)
            await deleteFile(item.imageURL)
            // if (deletingImage === 'error') return
            await deleteDoc(doc(database, "naujienos", item.id))
            setDeletingArticle('')
            setDeletingArticleConfirm({
                item: null,
                open: false
            })
            setToast('success', 'Naujiena ištrinta.')
            getFirstPage()
        } catch (err) {
            console.error(err)
            setDeletingArticle('')
            setToast(
                'warning',
                'Klaida! Nepavyko ištrinti naujienos.'      
            )
        }
    }

    useEffect(() => {
        getFirstPage()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            <DelArticleConfirm 
                deletingArticleConfirm={deletingArticleConfirm} 
                setDeletingArticleConfirm={setDeletingArticleConfirm} 
                delFunction={deleteArticle}
            />
            <div className="px-2 xl:px-0 pb-4 xl:pb-0 flex flex-col min-h-full">
                <div className='                    
                        after:my-2 
                        after:w-full 
                        after:h-px 
                        flex 
                        flex-col 
                        justify-between 
                        after:bg-fontColor-dark 
                        after:rounded-full
                    '
                >   
                    <div className='flex justify-between items-center'>
                        <h2 className='
                            font-TitleFont 
                            font-bold 
                            text-4xl 
                            md:text-4xl 
                            '
                        >
                            Naujienos
                        </h2>
                        <Link 
                            href="/personalas/naujienos/nauja" 
                            className='
                                flex
                                gap-4
                                bg-btnGreen-main
                                hover:bg-btnGreen-hover
                                active:bg-btnGreen-active
                                text-bgColor-input
                                w-max
                                px-4
                                py-2
                                rounded-md
                                drop-shadow-md
                                transition-all 
                                ease-in-out 
                                duration-200
                            '
                        >
                            Pridėti naujieną
                            <Plus className='h-6 w-6'/>
                        </Link>
                    </div>
                </div>
                <div className='flex flex-col grow justify-between'>
                    <div className='rounded-lg overflow-hidden'>
                        {loading ? 
                            <div className='flex flex-col grow justify-center items-center'>
                                <h1>Gaunamos naujienos ...</h1>
                                <Spinner className='h-8 w-8 animate-spin-reverse' />
                            </div>
                            : articles.length <= 0 ?
                            <p>Naujienų nėra</p>
                            : 
                            <Table 
                                style={{ opacity: loadingPage ? '40%' : '100%' }}
                                className='transition-all ease-in-out duration-150'
                            >
                                <TableHeader className='[&_tr]:border-none bg-bgColor-dark '>
                                    <TableRow>
                                        <TableHead className="w-36">Data</TableHead>
                                        <TableHead>Antraštė</TableHead>
                                        <TableHead className="text-right">Veiksmai</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody className='[&_tr]:border-b-tableDivider'>
                                    {articles.map((item, index) => 
                                        <TableRow key={index}>
                                            <TableCell className="font-medium">{item.created}</TableCell>
                                            <TableCell className='max-w-96 truncate'>{item.title}</TableCell>
                                            <TableCell className="text-right flex justify-end gap-4">
                                                <Tooltip text='Redaguoti'>
                                                    <Link href={`/personalas/naujienos/nauja?id=${item.id}`}>
                                                        <Edit className='h-5 w-5 hover:text-fontColor-light transition ease-in-out duration-200'/>
                                                    </Link>
                                                </Tooltip>
                                                <Tooltip text='Ištrinti'>
                                                    <button 
                                                        onClick={() => {
                                                            setDeletingArticleConfirm({
                                                                item: item,
                                                                open: true
                                                            })
                                                        }}
                                                        disabled={deletingArticle === item.id}
                                                    >
                                                        {deletingArticle === item.id ? 
                                                            <Spinner className='h-5 w-5 animate-spin-reverse' />
                                                        :
                                                            <Trash className='h-5 w-5 hover:text-fontColor-light transition ease-in-out duration-200'/>
                                                        }
                                                    </button>
                                                </Tooltip>
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        }
                    </div>
                    <div>
                        <ReactPaginate
                            breakLabel="..."
                            nextLabel=">"
                            onPageChange={handlePageClick}
                            pageRangeDisplayed={5}
                            pageCount={pageCount}
                            previousLabel="<"
                            renderOnZeroPageCount={null}
                            containerClassName='
                                list-none 
                                flex 
                                justify-center 
                                items-center 
                                p-4
                            '
                            pageLinkClassName='w-10 p-2 hover:bg-bgColor-input rounded-lg flex justify-center items-center transition ease-in-out duration-150'
                            previousLinkClassName='w-10 p-2 hover:bg-bgColor-input rounded-lg flex justify-center items-center transition ease-in-out duration-150'
                            nextLinkClassName='w-10 p-2 hover:bg-bgColor-input rounded-lg flex justify-center items-center transition ease-in-out duration-150'
                            activeLinkClassName='w-10 p-2 bg-bgColor-dark hover:bg-bgColor-input rounded-lg flex justify-center items-center transition ease-in-out duration-150'
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Naujienos