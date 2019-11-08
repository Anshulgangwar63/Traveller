var mongoose     = require("mongoose");

var memorySchema  = new mongoose.Schema({
    user:{
        type:String
    },
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
    book_date:{
        type:String
    },
    flight_icon:{
        type:String
    },
    hotel:{
        type:String
    },
    checkIn:{
        type:Date
    },
    checkOut:{
        type:Date
    },
    hotel_add:{
        type:String
    },
    star:{
        type:String
    },
    hotel_icon:{
        type:String
    }
});

module.exports = mongoose.model("travelPlan",memorySchema);