const express = require('express')
const multer = require('multer')
const app = express()
const fs = require('fs')
const path = require('path')


const storage = multer.diskStorage({
    destination: function(req, res, cb){
        const dir = 'uploads'
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir)
            
        }
        cb(null, dir)

    },
    filename: function(req, file, cb){
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const fileFilter = function(req, file, cb){
    if (file.mimetype == 'image/png' || file.mimetype == 'image/jpeg') {
        cb(null, true)
    }else{
        cb(null, false)
        req.errorMessage = 'File is not a valid Image'
    }
}
const upload = multer({storage, fileFilter})

app.post('/', upload.single('image'), (req, res) =>{
    console.log(req.file);
    if (req.errorMessage) {
        return res.status(422).json({message: req.errorMessage})
    }
    return res.status(200).json({message: 'File Uploaded Successfully...'})
})
app.listen(3000, () => console.log('Server started on port 3000'))