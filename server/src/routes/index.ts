import { Router } from 'express';
import SchoolRouter from './School';


const router = Router();


/**
 * Registering /product sub-routes
 */
router.use('/school', SchoolRouter);

/**
 * Exporting registered routes
 */
export default router;
