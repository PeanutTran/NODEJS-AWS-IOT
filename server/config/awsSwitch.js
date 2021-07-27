import thingShadows from './awsConfig';
// import device from './awsDevice';

export default class awsService {

    /**
     * @method constructor
     * @param {object} model
     */
    constructor() {
        this.thingShadows = thingShadows;
        // this.thingShadows = device;
    }
}
  