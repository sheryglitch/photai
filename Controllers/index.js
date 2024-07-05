import axios from 'axios'
import {Config} from '../config/index.js'

const ERRORS = {
  MISSING_FIELDS: 'Required fields are missing',
  UPLOAD_FAILED: 'Image upload failed'
}

export const PostImage = async (req, res) => {
  try {
    const {sourceImage, fileName} = req.body
    if (!sourceImage || !fileName || !req.file) {
      return res.status(400).send({error: ERRORS.MISSING_FIELDS})
    }

    const objectFile = req.file
    const base64MaskImage = objectFile.buffer.toString('base64')

    const result = await uploadImage(sourceImage, fileName, base64MaskImage)
    res.send(result)
  } catch (error) {
    res.status(error.status || 500).send({error: error.message})
  }
}

const uploadImage = async (sourceImage, fileName, base64MaskImage) => {
  const apiKey = Config.PHOT_AI_API_KEY
  const apiUrl = Config.PHOT_AI_API_URL

  const headers = {
    'x-api-key': apiKey,
    'Content-Type': 'application/json'
  }

  const data = {
    file_name: fileName || Config.FILE_NAME,
    input_image_link: sourceImage,
    mask_image: `data:image/png;base64,${base64MaskImage}`
  }

  try {
    const response = await axios.post(apiUrl, data, {headers})
    return response.data
  } catch (error) {
    const uploadError = new Error(
      `${ERRORS.UPLOAD_FAILED}: ${
        error.response ? error.response.data : error.message
      }`
    )
    uploadError.status = 500
    throw uploadError
  }
}
