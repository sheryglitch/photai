import {Router} from 'express'
import multer, {memoryStorage} from 'multer'
import {PostImage} from '../controllers/index.js'

const router = Router()
const upload = multer({storage: memoryStorage()})

router.post('/image-object-remover', upload.single('file'), PostImage)

export default router
