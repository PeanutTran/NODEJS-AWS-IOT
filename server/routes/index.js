import express from 'express';

// meter Routes
import meterRoute from './meter.routes';

// express router
const router = express.Router();


router.use(meterRoute);

export default router;
