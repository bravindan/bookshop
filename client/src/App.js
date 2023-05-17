import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Books from './Books';
import Add from './Add';
import Update from './Update';
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { BookDetails } from './BookDetails';


function App() {
  return (
    <div className=" ">
      <header className="App-header flex justify-between items-center mx-2 sm:mx-8">
        <p className='text-blue-700 text-3xl font-bold pt-3 mb-4 uppercase'>
          BookStore
        </p>
        <button className='bg-blue-700 rounded-md px-4 h-8 text-white font-bold'><a href='add'>Add Book</a></button>
        
      </header>
      <hr/>
      <ToastContainer theme="colored" autoClose={2000} />
      <div className=" ">
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<Books/>}/>
          <Route path="/add" element={<Add/>}/>
          <Route path='/books/:id' element={<Update/>}/>
          <Route path='/books/:id/details' element={<BookDetails/>}/>

        </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
