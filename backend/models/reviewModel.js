import mongoose from 'mongoose';

const reviewSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    rating: {
      type: Number,
      minimum: 1,
      maximum: 5,
      required: true,
    },
    media: [{ type: String, required: false }],

    reviewFor: {
      postId: {
        type: mongoose.Schema.Types.ObjectId,
        default: false,
        ref: 'Post',
      },
      postTitle: {
        type: String,
      },
    },
    createdBy: {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        default: false,
        ref: 'User',
      },
      userName: {
        type: String,
      },
    },
  },
  { timestamps: true }
);

const Review = mongoose.model('Review', reviewSchema);
export default Review;
