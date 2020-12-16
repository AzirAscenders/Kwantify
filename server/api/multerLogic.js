const multer = require('multer')
const path = require('path')
// const sharp = require('sharp')
const MulterGoogleCloudStorage = require('multer-google-storage')
const {
  GCS_BUCKET,
  GCS_PROJECT_ID,
  GCS_EMAIL,
  GCS_PRIVATE_KEY,
  GCS_CREDENTIALS
} = require('../../secrets')

// const storage = multer.diskStorage({
//   destination: function(req, file, cb) {
//     cb(null, path.join(process.cwd() + '/public'))
//   },
//   filename: function(req, file, cb) {
//     cb(
//       null,
//       file.fieldname + '-' + Date.now() + path.extname(file.originalname)
//     )
//   }
// })

const storage = new MulterGoogleCloudStorage.storageEngine({
  bucket: process.env.GCS_BUCKET || GCS_BUCKET,
  projectId: process.env.GCS_PROJECT_ID || GCS_PROJECT_ID,
  keyFilename: process.env.GCS_CREDENTIALS || GCS_CREDENTIALS,
  credentials: {
    client_email: process.env.GCS_EMAIL || GCS_EMAIL,
    private_key: process.env.GCS_PRIVATE_KEY || GCS_PRIVATE_KEY
  }
})

const upload = multer({
  storage: storage,
  fileFilter: fileFilter
}).single('image')

// const bucket = storage.bucket(GCS_BUCKET)

function fileFilter(req, file, cb) {
  const fileType = /jpg|jpeg|png/
  console.log('FIRST REQQQQQ', req)
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
        console.log('SECOND REQ', req)
        res.send(err)
      } else if (req.file === undefined) {
        console.log('SECONDDDDDDDDDDDDD REQ', req)
        res.send('no file selected')
      }
      console.log('THIRD REQQQQ', req)
      resolve(req.file)
    })
  })
}

module.exports = {
  checkError
}
