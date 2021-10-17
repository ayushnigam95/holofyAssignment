import * as mongoose from 'mongoose'

// uuid: string 
// name: string 
// releaseDate: integer (timestamp) 
// authorName: string
const BookSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        auto: true,
    },
    uuid: {
        type: String,
        default: "<uuid>"
    },
    name: {
        type: String,
        default: "<nameD>"
    },
    releaseDate: {
        type: Number,
        default: 0
    },
    authorName: {
        type: String,
        default: "<authorNameD>"
    }    
})

export const BookModel = mongoose.model("books", BookSchema)