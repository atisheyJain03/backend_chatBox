import mongoose from "mongoose";


// message schema will contains from (id of the user) and message body
const messageSchema = new mongoose.Schema(
  {
    from: String,
    body: String,
    
  },
  {
    timestamps: true,
    toObject: {
      virtuals: true
      },
      toJSON: {
      virtuals: true 
      }
  }
);

messageSchema.virtual('date').get(function() {
  
  // this will convert date string like 2017-03-14T14:10:20.391 into readable form like Mar-14-2017 14:10:20  
  const dateArr = this.createdAt.toString().split(' ');
  const string="";
  return string.concat( dateArr[1],'-',dateArr[2],'-',dateArr[3] , ' ',dateArr[4]) 
});

export default mongoose.model("message", messageSchema);
