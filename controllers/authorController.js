const { Author, Book } = require('../model/model');

const authorController = {
    //ADD AUTHOR
    addAuthor: async (req, res) => {
        try {
            const newAuthor = new Author(req.body);
            const saveAuthor = await newAuthor.save();
            res.status(200).json(saveAuthor)
        } catch (err) {
            res.status(500).json(err);//HTTP REQUEST CODE
        }
    },
    //GET ALL AUTHOR
    getAllAuthors: async (req, res) => {
        try {
            const authors = await Author.find().populate('books');
            res.status(200).json(authors)
        } catch (err) {
            res.status(500).json(err);
        }
    },
    //GET AN AUTHOR
    getAnAuthor: async (req, res) => {
        try {
            const authors = await Author.findById(req.params.id).populate('books');
            res.status(200).json(authors)
        } catch (err) {
            res.status(500).json(err);
        }
    },
    //UPDATE AUTHOR
    updateAuthor: async (req, res) => {//quá trình có thể mất thời gian nên cho vào (async await)
        try {//sử dụng (try - catch để bắt lỗi)
            const author = await Author.findById(req.params.id);//tìm tác giả tử id được người dùng chuyền vào
            await author.updateOne({ '$set': req.body }) //set lại req.body cho author đã tìm được
            res.status(200).json('Update Successfully')//Status == 200 thông báo quá trình update thành công
        } catch (error) {
            res.status(500).json(err);//STATUS == 500 thông báo lỗi server
        }
    },
    //DELETE AUTHOR
    deleteAuthor : async(req,res) => {
        try {
            await Book.updateMany({ author: req.params.id }, {author : null})
            //dùng lênh updateMany tìm quấn sách của tác giả đó và lấy ra khỏi array đó
            await Author.findByIdAndDelete(req.params.id);//tìm vào xóa
            res.status(200).json("Delete Successfully")
        } catch (error) {
            res.status(500).json(err);//STATUS == 500 thông báo lỗi server
        }
    }
}
module.exports = authorController;//exports để bên ngoài có thể nhận vào sử dụng được