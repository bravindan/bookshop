import React, { useState,useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'



export default function Books() {
const [books, setBooks]=useState([])
const [searchTerm, setSearchTerm] = useState('')
// fetch all books from the database
async function getBooks() {
  await axios.get('http://127.0.0.1:2014/books')
  .then(res=>{
    setBooks(res.data)
    // console.log(res.data)
  })
} 
useEffect(()=>{     
  getBooks()  
  },[])
  if(!books.length >= 1){
    return (
      <>
    <div className='text-center text-3xl py-8'>No Records... <br></br></div>
    <div className='text-center text-sm text-blue-700 underline p-4'><Link to ='/add'>Add New Book</Link></div>
      </>
    )
   }
  // handle book deletion
  const removeBook= async (bookId)=>{
    let confirmation = window.confirm('Are you sure you want to delete this book?')
    if(confirmation){
      await axios.delete(`http://127.0.0.1:2014/books/${bookId}`)
      .then(res =>{
        setBooks(books.filter(book => book.id !== bookId));
        toast.success('item removed',{autoClose:1000});
      })
      .catch(error => toast.error(error))}else{
        toast.info('Cancelling',{autoClose:1000})
    }
      
    }

  return (
    <>
    <form className=' flex justify-center items-center mt-1 mb-4  border-0 border-b-2 border-gray-300'>
          <input type="text" placeholder='type to search' name='search' value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)} className='rounded-lg h-12 w-96  placeholder:text-blue-700 mb-2'/>
    </form>
    <div className='grid justify-items-center grid-cols-1 sm:grid-cols-4 gap-y-6'>
     {/* search functionality when mapping  */}
       {books.filter((book) =>{
        if(searchTerm ===''){
          return book;
        }else if(book.title.toLowerCase().includes(searchTerm.toLowerCase())){
          return book;
        }else if(book.author.toLowerCase().includes(searchTerm.toLowerCase())){
          return book;
        }
        return null;
       }).map(book => (
        
        <div key={book.id} className="card rounded">
          <img src={book.cover} alt="" className=' bg-sky-200 h-72 w-56 mx-auto'/>
          <ul className='font-bold mb-4 text-sm '>
            {book.title.toUpperCase()}
          </ul>
        <ul className="mb-4 text-sm"> <span className='font-semibold'>By:{"  "}</span>
          {book.author.toUpperCase()}
        </ul>
        <div className=' space-x-4 float-right flex items-center justify-between'>
        <div>
        <button className='bg-black px-3 rounded text-white font-bold mr-4'><Link to={`/books/${book.id}/details`}>VIEW</Link> </button>

        </div>
        <div className=''>
            <button className='bg-blue-700 px-3 rounded text-white font-bold mr-4'><Link to={`/books/${book.id}`}>EDIT</Link> </button>
            <button className='bg-red-600 px-3 rounded text-white font-bold' onClick={()=>removeBook(book.id)}>REMOVE</button>
        </div>
        
        </div>
        </div>
      ))}
        
    </div>
    </>
  )
}

