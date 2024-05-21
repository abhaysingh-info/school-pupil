import { Router } from 'express';
import * as multer from 'multer';
const { get, post } = require('../controllers/School');


const router = Router();


const upload = multer.default({ dest: 'public/' });

router.get('/', get);
router.post('/', upload.single('school_logo'), post);

export default router;
