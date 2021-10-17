import { BookService } from "../services/book.service" 
import { ResponseInterceptor } from "../utilities/response-interceptor"
import { Request, Response } from "express"
import { HTTPCode } from "../constants/enums/http-codes";
import { ResponseMessages } from "../constants/messages/response.message" 
const logger = require("../utilities/logger")


export class BookController extends ResponseInterceptor{
    private bookService: BookService

    constructor(){
        super()
        this.bookService = new BookService()
    }

    async addBookItem(req: Request, res: Response){
        try {
            logger.info(">>>>", req.body)
            let book: any = await this.bookService.addBook(req.body)
            return this.sendResponse(res, ResponseMessages.ResOperationSuccessfull, { uuid: book.uuid }, HTTPCode.OK)
        } catch (error) {
            logger.error("error", error)
            return this.sendResponse(res, ResponseMessages.ResInternalServerError, JSON.stringify(error), HTTPCode.InternalServerError)
        }
    }

    async getBooksAll(req: Request, res: Response){
        try {    
            let books: any = await this.bookService.getBooksAll()
            return this.sendResponse(res, ResponseMessages.ResOperationSuccessfull, books, HTTPCode.OK)
        } catch (error) {
            logger.error("error", error)
            return this.sendResponse(res, ResponseMessages.ResInternalServerError, JSON.stringify(error), HTTPCode.InternalServerError)
        }
    }

    async getBookByUuid(req: Request, res: Response){
        try { 
            let {bookUuid: uuid} = req.params  
            let books: any = await this.bookService.getBookByUuid(uuid)
            if(books.length == 0){
                return this.sendResponse(res, ResponseMessages.ResOperationSuccessfullDataNotFound, books, HTTPCode.NotFound)    
            }else{
                return this.sendResponse(res, ResponseMessages.ResOperationSuccessfull, books, HTTPCode.OK)
            }
        } catch (error) {
            logger.error("error", error)
            return this.sendResponse(res, ResponseMessages.ResInternalServerError, JSON.stringify(error), HTTPCode.InternalServerError)
        }
    }

    async deleteBookByUuid(req: Request, res: Response){
        try { 
            let {bookUuid: uuid} = req.params  
            let books: any = await this.bookService.deleteBookByUuid(uuid)
            return this.sendResponse(res, ResponseMessages.ResDeleteSuccessfull, {}, HTTPCode.OK)
        } catch (error) {
            logger.error("error", error)
            return this.sendResponse(res, ResponseMessages.ResInternalServerError, JSON.stringify(error), HTTPCode.InternalServerError)
        }
    }

    async updateBookByUuid(req: Request, res: Response){
        try { 
            let {bookUuid: uuid} = req.params
            let books: any = await this.bookService.getBookByUuid(uuid)
            if(books.length == 0){
                return this.sendResponse(res, ResponseMessages.ResOperationErrorInvalidResourceIdentifier, {}, HTTPCode.BadRequest)    
            }
            let updateObj = req.body  
            await this.bookService.updateBookByUuid(uuid, updateObj)
            return this.sendResponse(res, ResponseMessages.ResUpdateSuccessfull, {uuid: uuid, ...updateObj}, HTTPCode.OK)
        } catch (error) {
            logger.error("error", error)
            return this.sendResponse(res, ResponseMessages.ResInternalServerError, JSON.stringify(error), HTTPCode.InternalServerError)
        }
    }

}
