const vision = require('@google-cloud/vision')
const {GOOGLE_VISION_CREDENTIALS} = require('../../secrets')

// clarify with Ben if this is a secret or not
process.env.GOOGLE_APPLICATION_CREDENTIALS = GOOGLE_VISION_CREDENTIALS
// Creates a client
const client = new vision.ImageAnnotatorClient()

/**
 * TODO(developer): Uncomment the following line before running the sample.
 */
const fileName = '/Users/macbook/Fullstack/Capstone/Kwantify/testimages/dog.png'

// Performs text detection on the local file
async function visionReader() {
  const [result] = await client.textDetection(fileName)
  const detections = result.textAnnotations
  console.log('Text:')
  detections.forEach(text => console.log(text))
}

visionReader()
