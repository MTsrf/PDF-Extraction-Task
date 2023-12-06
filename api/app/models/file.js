const mongoose = require("mongoose")

const fileSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    pdf: [
        {
            IsExtract: Boolean,
            name: String,
            path: String
        }
    ]
}, { timestamps: true })


module.exports = mongoose.model("files", fileSchema)

