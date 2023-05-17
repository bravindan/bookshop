import axios from 'axios'
import React,{useEffect, useRef, useState} from 'react'
import { useNavigate, useParams} from 'react-router-dom'
import { toast } from 'react-toastify'

export default function Update() {

  //function to redirect to home upon successful update
  const redirect = useNavigate()
   const navigateHome = ()=>{
    redirect('/')
   }
const [book, setBook] = useState()
const [title, setTitle]=useState()
const [author, setAuthor]=useState()
const [cover, setCover]=useState(null)
const coverFileRef= useRef()
const {id} = useParams();

//geting the details to be edited by id

useEffect(() => {
  const getBookById = async (id) => {
    try {
      const response = await axios.get(`http://127.0.0.1:2014/books/${id}`);
      setBook(response.data);
      setTitle(response.data.title)
      setAuthor(response.data.author)
    } catch (error) {
      console.log(error);
    }
  };
  getBookById(id);
}, [id]);


if (!book) {
  return <div className='text-center font-bold text-lg text-blue-800'>Something Went Wrong...</div>;
}

// updating book details
const updateBook = async (e) => {
  e.preventDefault()
const formData = new FormData();
formData.append('title',title)
formData.append('author',author)
formData.append('cover',cover)
    try {
      await axios.put(`http://127.0.0.1:2014/books/${id}`, formData,{headers: {'Content-Type': 'multipart/form-data',}})
      .then(response=>{
        toast.success("Book Update Success")
      })
      navigateHome()
    } catch (error) {
      toast.error("Something went wrong")
      console.log(error);
    }
  };


  return (
    <div>
      <div className="container mx-auto  ">
      <form className="sm:pl-96" encType="multipart/form-data">
        <div className="font-semibold mb-4 px-2">Update Book Details</div>

        <div className="">
          <div className="relative z-0 w-96 mb-6 group px-2">
            <input
              type="text"
              name="title"
             value={title}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              onChange={(e)=>setTitle(e.target.value)}
              required
            />
            <label
              htmlFor="title"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Title
            </label>
          </div>
          <div className="relative z-0 w-96 mb-6 group px-2">
            <input
              type="text"
              name="author"
              value={author}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              onChange={(e)=>setAuthor(e.target.value)}
              required
            />
            <label
              htmlFor="author"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Author
            </label>
          </div>
          <div className="relative z-0 w-96 mb-6 group px-2">
            <input
              type="file"
              name="cover"
              ref={coverFileRef}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none"
              onChange={(e)=>setCover(e.target.files[0])}
              accept="image/*"
            />
            <label
              htmlFor="file"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Select Cover Photo
            </label>
    
            <button
            type="submit"
            onClick={updateBook}
            className=" text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg w-full sm:w-96 px-5 py-2.5 text-center"
          >
            Save Changes
          </button>
          </div>

        </div>
      </form>
    </div>



    </div>
  )
}
