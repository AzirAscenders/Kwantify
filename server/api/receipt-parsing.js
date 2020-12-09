const vision = require('@google-cloud/vision')
const {GOOGLE_VISION_CREDENTIALS} = require('../../secrets')
const {checkError} = require('./multerLogic')

// clarify with Ben if this is a secret or not
process.env.GOOGLE_APPLICATION_CREDENTIALS = GOOGLE_VISION_CREDENTIALS
// Creates a client
const client = new vision.ImageAnnotatorClient()

// Performs text detection on the local file
async function visionReader(req, res) {
  const imageDesc = await checkError(req, res)
  const [result] = await client.textDetection(imageDesc.path)

  const detections = result.textAnnotations
  console.log('Text:')
  //   console.log(detections)
  return detections
}

function starbucksReceiptReader(detections) {
  let obj = []

  const arrayOfDescription = detections[0].description.split('\n')
  const start = arrayOfDescription.indexOf('Order') + 1
  const end = arrayOfDescription.indexOf('Subtotal')
  const arrayOfItemsAndPrice = arrayOfDescription.slice(start, end)
  const arrayOfItemNames = arrayOfItemsAndPrice.slice(
    0,
    Math.round(arrayOfItemsAndPrice.length / 2)
  )
  const arrayOfPrices = arrayOfItemsAndPrice.slice(
    Math.round(arrayOfItemsAndPrice.length / 2)
  )

  for (let i = 0; i < arrayOfItemNames.length; i++) {
    obj.push({
      name: arrayOfItemNames[i],
      price: Number(arrayOfPrices[i]),
      quantity: 1
    })

    // detections.forEach((text) => console.log(text.description))
  }
  return obj
}

module.exports = {
  visionReader,
  starbucksReceiptReader
}