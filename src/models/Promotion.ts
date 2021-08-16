import { IPromotion } from "../interfaces/IPromotion";
import mongoose = require('mongoose');

const Promotion = new mongoose.Schema(
    {

        title: {
            type: String,
            required: [true, 'Please enter a Title for your promotion'],
            index: true,
          },
       description: {
            type: String,
            required:[true, ' A description is Required '],

        },
        image : {
            type :Object,
            required: true

        },
        status : {
            type : Boolean,
            default : true
        }
    },
        { timestamps: true },

);
export default mongoose.model<IPromotion& mongoose.Document>('Promo', Promotion);