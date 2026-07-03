const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
{
    title:{
        type:String,
        required:true
    },

    content:{
        type:String,
        required:true
    },

    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },

    category:{
        type:String
    },

    tags:[
        String
    ],

    image:{
        type:String
    },

    // ==========================
    // SEO
    // ==========================

    seoTitle:{
        type:String
    },

    seoDescription:{
        type:String
    },

    slug:{
        type:String,
        unique:true
    },

    canonicalUrl:{
        type:String
    },

    ogTitle:{
        type:String
    },

    ogDescription:{
        type:String
    },

    ogImage:{
        type:String
    },

    twitterTitle:{
        type:String
    },

    twitterDescription:{
        type:String
    },

    twitterImage:{
        type:String
    },

    // ==========================
    // Blog Status
    // ==========================

    status:{
        type:String,
        enum:["draft","published"],
        default:"draft"
    }

},
{
    timestamps:true
});

module.exports = mongoose.model("Blog", blogSchema);