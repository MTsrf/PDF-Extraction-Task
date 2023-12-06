const jwt = require("jsonwebtoken")
const config = require('./constants')
const axios = require('axios')
const { PDFDocument } = require("pdf-lib")


exports.generateToken = (data) => {
    const maxAge = 3 * 24 * 60 * 60;
    const payload = { email: data.email, _id: data._id }
    const token = jwt.sign(payload, config.JWT_SECRET_KEY, { expiresIn: maxAge });
    return token
}

exports.convertBuffer = async (path) => {
    const resp = await axios.get(path, { responseType: 'arraybuffer' })
    return resp.data
}

exports.pdfExtract = async (resp, selectedPages) => {
    try {
        const Filedoc = await PDFDocument.load(resp);
        const totalPages = Filedoc.getPageCount();
        const InvalidPages = selectedPages.filter(
            (page) => page < 1 || page > totalPages
        );
        if (InvalidPages.length > 0) {
            const Errors = new Error("Invalid page selection");
            Errors.status = 400;
            throw Errors;
        }
        const newPdfDoc = await PDFDocument.create();
        for (const count of selectedPages) {
            const [copiedPage] = await newPdfDoc.copyPages(Filedoc, [count - 1]);
            newPdfDoc.addPage(copiedPage);
        }
        const newPdfBytes = await newPdfDoc.save();
        return newPdfBytes
    } catch (error) {
        return error
    }

}

exports.randomNameGenerator = async (name) => {
    const unique = Date.now();
    return unique + name
}