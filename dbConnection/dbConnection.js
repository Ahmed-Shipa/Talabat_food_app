import mongoose from "mongoose";

export const dbConnection = mongoose.connect(
  `mongodb://localhost:27017/Talabat_food_app`
).then(()=>{
    console.log(`database connected successfully`)
    
}).catch(()=>{
    console.log(`database failed to connect`);
    
})
