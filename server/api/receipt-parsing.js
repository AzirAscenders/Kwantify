const vision = require('@google-cloud/vision')
const {GOOGLE_VISION_CREDENTIALS} = require('../../secrets')

// clarify with Ben if this is a secret or not
process.env.GOOGLE_APPLICATION_CREDENTIALS = GOOGLE_VISION_CREDENTIALS
// Creates a client
const client = new vision.ImageAnnotatorClient()

/**
 * TODO(developer): Uncomment the following line before running the sample.
 */
const fileName =
  '/Users/YanNaingLin/Desktop/SeniorPhase/Kwantify/testimages/starbucks.jpg'

// Performs text detection on the local file
async function visionReader() {
  const [result] = await client.textDetection(fileName)
  const detections = result.textAnnotations
  console.log('Text:')
  //   console.log(detections)
  return detections
}

async function starbucksReceiptReader() {
  const detections = await visionReader()
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
  console.log(obj)
  return obj
}

module.exports = starbucksReceiptReader
