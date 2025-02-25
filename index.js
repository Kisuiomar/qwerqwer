import express from "express"
import mongoose from 'mongoose'
import multer from 'multer'
import cors from 'cors'
import fs from 'fs'

import { registerValidation, loginValidation, postCreateValidation } from './validations.js'
import {UserController, PostController} from './controllers/index.js'
import {handleValidationErrors, checkAuth} from "./utils/index.js"

mongoose.connect(
    'mongodb+srv://admin:admin@kisui.hmppq.mongodb.net/?retryWrites=true&w=majority&appName=Kisui'
) 
    .then(() => console.log('DB is ok'))
    .catch((err) => console.log('DB err', err));

const app = express();

// Ensure uploads folder exists
if (!fs.existsSync('uploads')) {
    fs.mkdirSync('uploads');
}

const storage = multer.diskStorage({
    destination: (_, __, cb) => {
        cb(null, 'uploads');
    },
    filename: (_, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage });

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}))

app.post('/auth/login', handleValidationErrors, loginValidation, UserController.login);
app.post('/auth/register', registerValidation, handleValidationErrors, UserController.register);

app.get('/auth/me', checkAuth, UserController.getMe);

app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
    res.json({ url: '/uploads/' + req.file.originalname });
});

// Serve uploaded files statically
app.use('/uploads', express.static('uploads'));

app.get('/tags', PostController.getLastTags);
app.get('/posts', PostController.getAll);
app.get('/posts/:id', PostController.getOne);
app.get('/posts/tags', PostController.getLastTags);
app.post('/posts', checkAuth, postCreateValidation, PostController.create);
app.delete('/posts/:id', checkAuth, PostController.remove);
app.patch('/posts/:id', checkAuth, postCreateValidation, handleValidationErrors, PostController.update);

app.listen(5000, (err) => {
    if (err) {
        return console.log(err);
    }
    console.log('Server is running on http://localhost:5000');
});
