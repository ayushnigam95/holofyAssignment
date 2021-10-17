import { ResponseInterceptor } from "../utilities/response-interceptor"
import { BookController } from "../controllers/book.controller"
export class RoutingComponents extends ResponseInterceptor {
    private bookCont: BookController;

    constructor() {
        super();
        this.bookCont = new BookController()
    }

    // POST /book/add
    addBook(req, res){
        this.bookCont.addBookItem(req, res)
    }

    // GET /books
    getBooksAll(req, res){
        this.bookCont.getBooksAll(req, res)
    }

    // GET /book/bookUuid
    getBookByBookUuid(req, res){
        this.bookCont.getBookByUuid(req, res)
    }

    // POST /book/bookUuid/delete
    deleteBookByBookUuid(req, res){
        this.bookCont.deleteBookByUuid(req, res)
    }

    // POST /book/bookUuid/update
    updateBookByBookUuid(req, res){
        this.bookCont.updateBookByUuid(req, res)
    }

    // page not found
    pageNotFound(req, res, next) {
        return res.status(400).send("URL does not exist")
    }
}