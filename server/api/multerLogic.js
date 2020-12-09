const multer = require('multer')
const path = require('path')
const sharp = require('sharp')

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, path.join(process.cwd() + '/public'))
  },
  filename: function(req, file, cb) {
    cb(
      null,
      file.fieldname + '-' + Date.now() + path.extname(file.originalname)
    )
  }
})

const upload = multer({
  storage: storage,
  fileFilter: fileFilter
  // resizeImage: resizeImage,
}).single('image')

function fileFilter(req, file, cb) {
  const fileType = /jpg|jpeg|png/

  const extname = fileType.test(path.extname(file.originalname).toLowerCase())

  const mimeType = fileType.test(file.mimetype)

  if (mimeType && extname) {
    return cb(null, true)
  } else {
    cb('Error: images only')
  }
}

// const resizeImage = async (req, res, next) => {
//   if (!req.files) return next()
//   req.body.images = []
//   await Promise.all(
//     req.files.map(async (file) => {
//       const filename = file.originalname.replace(/\..+$/, '')
//       const newFilename = `bezkoder-${filename}-${Date.now()}.jpeg`
//       await sharp(file.buffer)
//         // .resize(640, 320)
//         .toFormat('jpeg')
//         .jpeg({quality: 90})
//         .toFile(`upload/${newFilename}`)
//       req.body.images.push(newFilename)
//     })
//   )
//   next()
// }

const checkError = (req, res, next) => {
  return new Promise((resolve, reject) => {
    upload(req, res, err => {
      if (err) {
        res.send(err)
      } else if (req.file === undefined) {
        res.send('no file selected')
      }
      resolve(req.file)
    })
  })
}

module.exports = {
  checkError
}
