var mongoose     = require("mongoose");

var memorySchema  = new mongoose.Schema({
    hotel:{
        type:String
    },
    city:{
        type:String
    },
    address:{
        type:String
    },
    hotel_icon:{
        type:String
    },
    star:{
        type:String
    }
});

module.exports = mongoose.model("hotels",memorySchema);