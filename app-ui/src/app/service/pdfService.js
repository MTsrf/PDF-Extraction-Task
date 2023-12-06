import { fetchWrapper } from "./fetchWrapper";

const baseUrl = process.env.REACT_APP_API_BASE_URL;

export const uploadPdfService = {
    getAll,
    addPdf,
    extractPdf,
};

function getAll() {
    return fetchWrapper.get(baseUrl + "fetch-file");
}

function extractPdf(Id, data) {
    return fetchWrapper.post(`${baseUrl}extract-file/${Id}`, data)
}

function addPdf(formData) {
    return fetchWrapper.post(baseUrl + "add-file", formData)
}