import awsService from '../config/awsSwitch';

/**
 * @class MeterController
 */
export default class MeterController {

  /**
   * @method constructor
   * @param {object} model
   */
  constructor() {
    this.awsService = new awsService();
  }

  /**
   * @method on
   * @description Connects to a device
   * @param {*} req
   * @param {*} res
   * @returns {object} meter
   */
  static async on(req, res) {
    let clientTokenUpdate;
    if (!this.awsService) {
      this.awsService = new awsService();
    }
    this.awsService.thingShadows.register('USER_METER', {}, async () => {
      const userMeterState = {
        state: {
          desired: {
            status: 'ON',
          },
        },
      };
      clientTokenUpdate = this.awsService.thingShadows.update(
        'USER_METER',
        userMeterState
      );

      if (clientTokenUpdate === null) {
        return res.status(400).send({
          status: false,
          error: 'update shadow failed, operation still in progress',
        });
      }

      return res.status(200).json({
        status: true,
        message: 'Meter successfully connected',
      });
    });
  }

  /**
   * @method off
   * @description Disconnects a running instance of a device
   * @param {*} req
   * @param {*} res
   * @returns {object} meter
   */
  static async off(req, res) {
    if (!this.awsService) {
      this.awsService = new awsService();
    }
    this.awsService.thingShadows.end();
    return res.status(200).json({
      status: true,
      message: 'Meter successfully disconnected',
    });
  }
}
