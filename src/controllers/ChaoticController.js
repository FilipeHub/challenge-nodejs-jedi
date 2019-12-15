const chaotic_data = require('../chaotic_data.json');

module.exports = {
    
    /**
     * @api {get} /api/v2/order-by-status Order by status
     * @apiName OrderByStatus
     * @apiDescription Organize the informations of the chaotic_data.json by the status
     * @apiGroup ChaoticData
     * 
     * 
     * @apiSuccess {Object[]} Pending array of Pending objects.
     * @apiSuccess {Object[]} Paid array of Paid objects.
     * @apiSuccess {Object[]} Canceled array of Canceled objects.
     * @apiSuccess {Object[]} Refunded array of Refunded objects.
     * @apiSuccess {Object[]} Expired array of Expired objects.
     * 
     * @apiVersion 1.0.0
     */
    getByStatus(req, res) {
        res.json(getJsonByStatus(chaotic_data));
    },

    /**
     *  
     * @api {get} /api/v2/order-total/:status Total Amount of some status
     * @apiName OrderByTotalAmount
     * @apiDescription Returns the total amount of some status based on the informations of the chaotic_data.json
     * @apiGroup ChaoticData
     * 
     * @apiParam {String} status the wanted status 
     * 
     * @apiSuccess {Number} totalAmountValue the total amount of the status
     * 
     * @apiVersion 1.0.0
     */
    getTotalValeuOfStatus(req, res) {
        const organizedFile = getJsonByStatus(chaotic_data);
        const { status } = req.params;
        return res.json({totalAmountValue: getTotalAmountValeuOfStatus(status, organizedFile)});
    },

    /**
     * @api {get} /api/v2/order-major-values Order by major amount values
     * @apiName OrderByMajorAmountValue
     * @apiDescription Organize the informations of the chaotic_data.json by major amount values
     * @apiGroup ChaoticData
     * 
     * 
     * @apiSuccess {Object[]} status/amount array of the name of the status and values of total amount
     *
     * @apiVersion 1.0.0
     */
    getAllStatusOrdedByTotalAmount(req, res){
        const allStatus = ["Pending", "Paid", "Cancelled", "Refunded", "Expired"];
        response = [];
        const organizedFile = getJsonByStatus(chaotic_data);
        
        allStatus.forEach(status => {
            const statusTotal = getTotalAmountValeuOfStatus(status, organizedFile);
            const obj = {}
            obj['status'] = status;
            obj['totalAmount'] = statusTotal;
            response.push(obj);
        });
        
        const orderedArray = response.sort(function (item1, item2) {
            if(item1.totalAmount > item2.totalAmount)
                return -1;
            if(item1.totalAmount < item2.totalAmount)
                return 1;
            return 0;
        });
        return res.json(orderedArray);
    },

     /**
     * @api {get} /api/v2/group-by-country Order by country
     * @apiName OrderByCountry
     * @apiDescription Organize the informations of the chaotic_data.json by the country
     * @apiGroup ChaoticData
     * 
     * 
     * @apiSuccess {Object[]} county array of nameOfTheCountry objects.
     * 
     * @apiVersion 1.0.0
     */
    getByCountry(req, res) {
        const response = {};
        
        for(i=0; i < chaotic_data.length; i++){
            const object = chaotic_data[i];
            const country = object.shipping.country.name;
            if(response[country] == undefined){
                response[country] = [];
            }
            response[country].push(object);    
        }
        
        return res.json(response);
    }
}

/**
 * Auxiliar function that returns the object of all the registers by status of the file
 * @param {file} file name of the manipulation file
 */
function getJsonByStatus(file){
    const response = {};
        
    for(i=0; i < file.length; i++){
        const object = file[i];
        const status = object.status;
        if(response[status] == undefined){
            response[status] = [];
        }
        response[status].push(object);    
    }
    return response;
}

/**
 * Auxiliar function to get the total sum of the amout in all the registers of some status
 * @param {status} status name of the status
 * @param {file} file name of the manipulation file
 */
function getTotalAmountValeuOfStatus(status, file){
    let totalSum = 0;
    for(i=0; i < file[status].length; i++){
        const itensArray = file[status][i].order_items;
        
        totalSum += itensArray.reduce((prevItem, item) => prevItem + item.amount, 0);
    }
    
    return totalSum;
}
