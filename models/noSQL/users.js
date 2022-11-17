const {Schema,model} = require('mongoose')
const monooseDelete = require('mongoose-delete')

const UserSchema = new Schema(
    {
        name:{
            type:String,
            required:true,
        },
        age:{
            type:Number,
            required:true
        },
        email:{
            type: String,
            unique:true
        },
        password:{
            type: String
        },
        role:{
            type: ["user","admin"],
            default: "user"
        }

    },
    {
        timestamps:true, //CreateDate , UpdateDate
        versionKey:false
    }
)

UserSchema.plugin(monooseDelete,{overrideMethods:'all'})
module.exports = model("users",UserSchema)