import { BookModel } from "../models/book.model"
import { v4 as uuid } from "uuid";
const logger = require("../utilities/logger")

export class BookService {
    constructor() {
        logger.info("Book Service Object init")
    }


    async initBook() {
        try {
            const bookInfo = new BookModel()
            let book = await bookInfo.save()
            return book
        } catch (error) {
            throw error
        }
    }

    async addBook(bookData) {
        try {
            let insertObject = {...bookData}
            insertObject.uuid = uuid()
            insertObject.releaseDate = new Date(insertObject.releaseDate).getTime() || 0
            const bookInfo = new BookModel(insertObject)
            let book = await bookInfo.save()
            return book
        } catch (error) {
            throw error
        }
    }

    async getBooksAll() {
        try {
            return BookModel.find({}, {
                _id: false,
                __v: false
            })

        } catch (error) {
            throw error
        }
    }

    async getBookByUuid(uuid) {
        try {
            return BookModel.find({uuid: uuid}, {
                _id: false,
                __v: false
            })

        } catch (error) {
            throw error
        }
    }

    async deleteBookByUuid(uuid) {
        try {
            return BookModel.deleteMany({uuid: uuid})
        } catch (error) {
            throw error
        }
    }

    async updateBookByUuid(uuid, bookData) {
        try {
            let updateObj = {...bookData}
            updateObj.releaseDate = new Date(updateObj.releaseDate).getTime() || 0
            return BookModel.updateOne({uuid: uuid}, updateObj)
        } catch (error) {
            throw error
        }
    }

}
