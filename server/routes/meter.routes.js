import express from 'express';
import controllers from '../controllers';

const meterRoute = express.Router();

const meterController = controllers.MeterController;

meterRoute.patch('/meter/on', meterController.on);

meterRoute.patch('/meter/off', meterController.off);

export default meterRoute;