const { Author, Book } = require('../model/model');

const bookController = {
    //POST BOOK
    addBook: async (req, res) => {
        try {
            // Dữ liệu từ yêu cầu có thể được truy cập thông qua req.body
            const newBook = new Book(req.body);
            const saveBook = await newBook.save();//phương thức save() được sử dụng để lưu một đối tượng vào cơ sở dữ liệu MongoDB
            if (req.body.author) {
                const author = await Author.findById(req.body.author);
                await author.updateOne({ $push: { books: saveBook._id } });
            }
            res.status(200).json(saveBook);
        } catch (err) {
            res.status(500).json(err); // Internal Server Error
        }
    },
    //GET ALL BOOK
    getAllBook: async (req, res) => {
        try {
            const books = await Book.find().populate('author');
            res.status(200).json(books)
        } catch (err) {
            res.status(500).json(err)
        }
    },
    //GET AN BOOK
    getAnBook: async (req, res) => {
        try {
            const books = await Book.findById(req.params.id).populate('author')
            res.status(200).json(books)
        } catch (err) {
            res.status(500).json(err)
        }
    },
    //UPDATE BOOK
    updateBook: async (req, res) => {
        try {
            const book = await Book.findById(req.params.id);
            await book.updateOne({ '$set': req.body });
            res.status(200).json("Updated Successfully")
        } catch (err) {
            res.status(500).json(err)
        }
    },

    //DELETE BOOK
    deleteBook: async (req, res) => {
        try {
            await Author.updateMany({ books: req.params.id }, { $pull: { books: req.params.id } })//Author có nhiều quấn sách
            //dùng lênh updateMany tìm quấn sách của tác giả đó và lấy ra khỏi array đó
            await Book.findByIdAndDelete(req.params.id);//tìm vào xóa
            res.status(200).json("Delete Successfully")
        } catch (err) {
            res.status(500).json(err)
        }
    }
}

module.exports = bookController;