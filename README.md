
# PDF-Extraction 

Express.Js and reactjs Project

This comprehensive repository encompasses both the server-side and client-side components of an innovative web application designed to streamline PDF file management. Empowered by Express.js on the server side and React.js on the client side, this application redefines the user experience for PDF manipulation.

Users can effortlessly upload PDF files, triggering a robust set of features that allow them to extract specific pages and seamlessly compose new PDFs. The user-friendly interface empowers individuals to precisely select the pages they wish to include in the new PDF, presenting a sophisticated yet intuitive tool for efficient PDF customization. 



## API Reference

#### user_signup

```http
  POST "http://localhost:5000/api/user_signup"
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `name` | `string` | **Required** |
| `email` | `string `| **Required**|
| `phone_number` | `string `| **Required**|
| `password` | `string `| **Required**|

#### user_signup
```http
  POST   "http://localhost:5000/api/user-login"
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `email` | `string `| **Required**|
| `password` | `string `| **Required**|

Fetch User-Data
```http
  GET   "http://localhost:5000/api/user-details"
```
Fetch all Files
```http
  GET  "http://localhost:5000/api/fetch-file"
```
Upload file
```http
  POST  "http://localhost:5000/api/add-file"
```
Extract file
```http
  POST  "http://localhost:5000/api/extract-file/${file-id}"
```


## Deployment

FrontEnd

```bash
  npm start
```
Back-End

devlopment
```bash
  npm start
```




## Environment Variables

To run this project, you will need to add the following environment variables to your .env file


Back-End

`PORT`: 5000

`MONGOURL`: mongodb+srv://{user}:{password}@cluster0.m6j01rv.mongodb.net/{DBname}?retryWrites=true&w=majority

`JWT_SECRET_KEY`: sample-JWT_SECRET_KEY

`CURRENT_URL`: http://localhost:5000/


Front-End

`REACT_APP_API_BASE_URL`=http://localhost:5000/api/

## Projects Links



```http
 Front-end :https://super-macaron-d6d8e5.netlify.app/
```

```http
 Back-end :https://pdf-extraction-4icg.onrender.com
```
## Authors

- [@MTsrf](https://github.com/MTsrf)

