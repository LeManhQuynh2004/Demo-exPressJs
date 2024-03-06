const express = require("express")
const cors = require('cors')
const app = express()
const mongoose = require('mongoose')
var bodyParser = require('body-parser')
const morgan = require('morgan')
const dotenv = require('dotenv')
// const pass = 'eMxxmkMThY5YQt6K'
const authorRoute = require('./routes/author')
const bookRoute = require('./routes/book')
const useRoute = require('./routes/user')
dotenv.config()
//CONNECT DATABASE
mongoose.connect('mongodb+srv://quynhlmdev:eMxxmkMThY5YQt6K@cluster0.6uzysra.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });
app.use(bodyParser.json({ limit: '50mb' }))
app.use(cors())
app.use(morgan("common"));

//ROUTES
app.use('/v1/author', authorRoute)

app.use('/v1/book', bookRoute)

app.use('/user', useRoute)

app.get('/', (req, res) => {
  res.status(200).json("Thành công")
})
app.listen(3000, () => {
  console.log('Server is runing ...');
})