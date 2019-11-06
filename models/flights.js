var mongoose     = require("mongoose");

var memorySchema  = new mongoose.Schema({
    airline:{
        type:String
    },
    source:{
        type:String    
    },
    destination:{
        type:String
    },
    source_time:{
      type:String  
    },
    dest_time:{
        type:String
    },
    price:{
        type:String
    },
    icon:{
        type:String
    }
});

module.exports = mongoose.model("flights",memorySchema);