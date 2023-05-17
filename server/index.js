const express = require('express')
const cors = require('cors') //
const mysql = require('mysql') 
const multer = require('multer');

//
const app = express()  
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(express.static('uploads'));
const port = 2014

// Set up multer middleware to handle file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../client/public/uploads/')
      // cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        const fileExtenson=file.mimetype.split('/')[1]
      const uniqueSuffix = Date.now()
      cb(null, `${file.fieldname}-${uniqueSuffix}.${fileExtenson}`)
    }
  })
  
  const upload = multer({ storage: storage })

// start server
app.listen(port || 3000, () => {
  console.log(`App running on http://localhost:${port}`)
})


// create connection to the database
const db= mysql.createConnection(
    {
        host: '127.0.0.1',
        user: 'root',
        password: 'lucidtech',
        database: 'bookstore'
    }
)
// connect to bookstore
db.connect((error)=>{
    if(error) console.log(error);
        
        console.log('Connected to MySQL db')
})



// const upload = multer({ dest: 'uploads/' })

// handle get request to render data to frontend
app.get('/books', (req, res) => {

    const sql = 'SELECT * FROM books';
    db.query(sql, (err, result) => {
        if (err) console.log(err);
        res.json(result)
        
    })
})



// geting data by id
app.get('/books/:id', (req, res) => {
    const bookId = req.params.id;
    const sql = 'SELECT * FROM books WHERE id=?';
    db.query(sql,[bookId], (err, result) => {
        if (err) throw err;
        if (result.length === 0) {
          return res.status(404).send('Book not found');
        }
    
        const book = result[0];
        return res.json(book);
      });
})



// handle post request to add new books to database
app.post('/add', upload.single('cover'),(req, res) => {
    const {title, author} = req.body
    //const coverimage =req.files.cover
    const cover = req.file ? `/uploads/${req.file.filename}` : null;
    // mysql query for inserting data into the database
  const sql = 'INSERT INTO books (title, author, cover) VALUES (?, ?, ?)';

//   declaring the values expected from the client
  const values = [title, author, cover];

//   function to execute the query
    db.query(sql, values, (error,result)=>{
        if(error){
            console.log(error)
        }else{
            // console.log("Title:" ,title, "Author:", author, "Cover image:",cover)
            // res.send( result)
            res.send('Item added successfully')
        }
    })
})



// Define a route to update book details by ID
app.put('/books/:id', upload.single('cover'), (req, res) => {
    const bookId = req.params.id;
    const { title, author} = req.body;
   
    const cover = req.file ? `/uploads/${req.file.filename}` : null;

    const sql = 'UPDATE books SET title = ?, author = ?, cover = ? WHERE id = ?';
  
    // Execute the MySQL query
    db.query(sql, [title, author, cover, bookId], (err, result) => {
      if (err) throw err;
      if (result.affectedRows === 0) {
        return res.status(404).send('Book not found');
      }
      return res.sendStatus(204);
    });
  });



// deleting item from database
app.delete('/books/:id', (req, res) =>{
    const bookId = req.params.id;
  
    const sql = `DELETE FROM books WHERE id ='${bookId}'`;
    db.query(sql, function(err, result) {
      if (err) throw err;
      res.status(200).json({ message: 'Book deleted successfully' });
    });
  });

