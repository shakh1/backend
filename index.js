import express from 'express'
import multer from 'multer'
import mongoose from 'mongoose'
import * as validationResult  from './validations.js'
import checkAuth from "./utils/checkAuth.js";
import * as userController from "./controllers/userController.js"; 
import handleValidationErorrs from './utils/handleValidationErorrs.js';
import * as postController from "./controllers/postController.js";


mongoose.connect('mongodb+srv://admin:admin007@cluster0.dq4906q.mongodb.net/AvtoCar?retryWrites=true&w=majority')
.then(() => {
    console.log('DB is woriking');
})
.catch((err) => {
    console.log('error');
})


const app = express()


const storage = multer.diskStorage({     
    destination: (_, __, cb ) => {
        cb(null, 'uploads')
    },
    filename: (_, file, cb) => {
        cb(null, file.originalname)
    }
}) 
const upload = multer({storage})


app.use(express.json())  

app.use('/uploads', express.static('uploads'))


app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
    res.json({
        url: `/uploads/${req.file.originalname}`
    })
})

app.post('/auth/login', validationResult.loginValidation,  handleValidationErorrs, userController.login )  
app.post('/auth/register', validationResult.registerValidation, handleValidationErorrs, userController.register  )   
app.get('/auth/me', checkAuth, userController.getMe )  

app.get('/posts', postController.getAll ) 
app.post ('/posts', checkAuth, validationResult.postCreateValidation, handleValidationErorrs,  postController.create )   
app.get('/posts/:id', postController.getOne);   
app.delete('/posts/:id',checkAuth,  postController.remove )
app.patch('/posts/:id', checkAuth, validationResult.postCreateValidation, handleValidationErorrs, postController.update ) 


app.listen(3000, (err) => {
    if (err) {
        return console.log(err);
    }
    console.log('server is working');
})

 