const router = require('express').Router()
const {Item} = require('../db/models')
const starbucksReceiptReader = require('./receipt-parsing')
const multer = require('multer')
const upload = require('./multerLogic')

module.exports = router

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, '/public')
//   },
//   filename: (req, file, cb) => {
//     console.log(file)
//     cb(null, file.fieldname + '-' + Date.now())
//   },
// })
// const fileFilter = (req, file, cb) => {
//   if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') {
//     cb(null, true)
//   } else {
//     cb(null, false)
//   }
// }
// const upload = multer({storage: storage, fileFilter: fileFilter})

router.post('/', upload.single('image'), async (req, res, next) => {
  try {
    let itemsToCreate = await starbucksReceiptReader()
    const items = await Item.bulkCreate(itemsToCreate, {returning: true})
    res.json(items)
  } catch (err) {
    next(err)
  }
})

router.post('/test', upload.single('image'), async (req, res, next) => {
  try {
    return res.status(201).json({message: 'yes'})
  } catch (error) {
    console.errer(error)
  }
})
