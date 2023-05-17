import React,{useState, useEffect} from 'react'
import { useNavigate , useParams} from 'react-router-dom'
import axios from 'axios'

export const BookDetails = () => {
    const {id} = useParams()
    const [book, setBook] = useState('')

    useEffect(() => {
        const getBookById = async (id) => {
          try {
            const response = await axios.get(`http://127.0.0.1:2014/books/${id}`);
            setBook(response.data);
            console.log(response.data);
          } catch (error) {
            console.log(error);
          }  
        };
        getBookById(id);
      }, [id]);

    const navigate = useNavigate()
    const redirect = ()=>{
        navigate('/')
    }

  return (
    <>
    
    <h1 className='text-2xl font-bold justify-center items-center flex '>
    <p>{book.title.toUpperCase()}</p> </h1>
     <h2 className='text-sm font-bold mb-4 justify-center items-center flex '><p className='font-serif italic'>By: {book.author.toUpperCase()}</p></h2>
    
    <div className=' mx-auto  '>
        <div className='details flex my-6 w-1/3 mx-auto'>
            <div className=''>
               
                <img src={book.cover} alt="" className=' bg-sky-200 h-96 w-72 mx-auto object-cover'/>
            </div>
            <div className='ml-8 w-2/3 h-96 overflow-auto '>
                <h2 className='font-bold underline '>Overview</h2>
                <blockquote>
                    {book.overview}
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo minima in animi nemo quibusdam minus, 
                    tempore labore dolor quo quasi ea dicta nisi, corrupti aspernatur odit dolorem eligendi aperiam deleniti?
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo minima in animi nemo quibusdam minus, 
                    tempore labore dolor quo quasi ea dicta nisi, corrupti aspernatur odit dolorem eligendi aperiam deleniti?
                </blockquote>
            </div>
        </div>
        <div className=' flex items-center justify-center'>
        <button onClick={redirect} className='bg-blue-700 px-3 rounded text-white font-bold mr-4'>CLOSE</button>
        </div>
        </div>
    </>
  )
}
