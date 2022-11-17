const {Schema,model, default: mongoose} = require('mongoose')
const monooseDelete = require('mongoose-delete')
const TracksSchema = new Schema(
    {
        name:{
            type:String,
            unique:true
        },
        album:{
            type:String
        },
        cover:{
            type:String,
            validate:{
                validator: (req)=>{
                    return true
                },
                message: "ERROR_URL"
            }},
        artist:{
            name:{
                type:String,
            },
            nickname:{
                type:String
            },
            nationality:{
                type:String
            }
        },
        duration:{
            start:{
                type:Number
            },
            end:{
                type:Number
            }
        },
        mediaId:{
            type: Schema.Types.ObjectId
        }

    },
    {   
        timestamps:true,
        versionKey:false
    }
)

TracksSchema.plugin(monooseDelete,{overrideMethods:'all'})
module.exports = model('tracks', TracksSchema)