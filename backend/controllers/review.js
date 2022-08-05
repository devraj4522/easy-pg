import expressAsyncHandler from 'express-async-handler';
import mongoose from 'mongoose';
import Post from '../models/postModel.js';
import User from '../models/userModel.js';
import Review from '../models/reviewModel.js';

/**
 * @description creates a review of PG
 * @route  GET /api/reviews/createpost
 * @param  {title: String*, description: String*, rating: 1|2|3|4|5,
 * media: [String]+}
 *
 * @returns {title: String, description: String, rating: Number, photo: String(Link)}
 * @access Verified
 */
const createPost = expressAsyncHandler(async (req, res) => {
  try {
    const userid = req.user._id;
    const postid = req.body.post;
    const user = await User.findById(userid);
    const post = await Post.findById(postid);

    if (!post)
      res.status(400).send({ message: 'Invalid Post Id, Post not found' });

    const format = {
      title: req.body.title,
      description: req.body.description,
      rating: req.body.rating,
      media: req.body.media,
      createdBy: {
        userId: user._id,
        userName: user.name,
      },
      reviewFor: {
        postId: postid,
        postTitle: post.name,
      },
    };

    const review = await Review.create(format);
    if (review) {
      await User.updateOne(
        { _id: userid },
        {
          $push: {
            reviews: {
              reviewId: review._id,
              title: review.title,
            },
          },
        }
      );

      //   append to posts
      await Post.updateOne(
        { _id: postid },
        {
          $push: {
            reviews: {
              reviewId: review._id,
              title: review.title,
            },
          },
        }
      );

      res.status(201).json({
        title: review.title,
        description: review.description,
        rating: review.rating,
        photo: review.media[0],
      });
    } else {
      res.status(400).send({ message: 'Invalid review data' });
    }
  } catch (error) {
    res.status(400).send({ message: `Something went wrong : \n${error}` });
  }
});

/**
 * @description edit a post of PG
 * @route  PUT /api/posts/:id
 * @param  {name: String*, location: {lat*, long*}, description, address*, types: [{share*: String, price*: Number}], gender*: Boys|Girls|Both,
 * meal: {weekdays*: [Breakfast|Lunch|Dinner], weekends*: [Breakfast|Lunch|Dinner], options*: 'Veg-Only'|'Non-Veg'}, maintenance*: Number,
 * gateOpen: String, gateClose: String, amenities: { laundry: Boolean, refrigerator: Boolean, tv: Boolean, wifi: Boolean, bed: Boolean},
 * contact: [Number]+, media: [String]+,}

 * @returns {name: String, address: String, amenities: Object, photo: String(Link)}
 * @access Verified
 */
const editPost = expressAsyncHandler(async (req, res) => {
  try {
    const postid = req.params.id;
    const userid = req.user._id;
    const post = await Post.findOne({
      id: postid,
      'createdBy.userId': userid,
    });
    if (post) {
      post.name = req.body.name || post.name;
      if (req.body.location) {
        post.location.lat = req.body.location.lat || post.location.lat;
        post.location.long = req.body.location.long || post.location.long;
      }
      post.description = req.body.description || post.description;
      post.address = req.body.address || post.address;
      post.types = req.body.types || post.types;
      post.gender = req.body.gender || post.gender;
      if (req.body.meal) {
        post.meal.weekdays = req.body.meal.weekdays || post.meal.weekdays;
        post.meal.weekends = req.body.meal.weekends || post.meal.weekends;
        post.meal.options = req.body.meal.options || post.meal.options;
      }
      post.maintenance = req.body.maintenance || post.maintenance;
      post.gateTimings = req.body.gateTimings || post.gateTimings;
      if (req.body.gateOpen) {
        post.gateOpen = '00:00';
      } else {
        post.gateOpen = req.body.gateOpen || post.gateOpen;
      }
      if (req.body.gateClose) {
        post.gateClose = '23:59';
      } else {
        post.gateClose = req.body.gateClose || post.gateClose;
      }
      if (req.body.amenities) {
        post.amenities.laundry =
          req.body.amenities.laundry || post.amenities.laundry;
        post.amenities.refrigerator =
          req.body.amenities.refrigerator || post.amenities.refrigerator;
        post.amenities.tv = req.body.amenities.tv || post.amenities.tv;
        post.amenities.wifi = req.body.amenities.wifi || post.amenities.wifi;
        post.amenities.bed = req.body.amenities.bed || post.amenities.bed;
      }
      if (req.body.contact && req.body.contact.length > 0) {
        post.contact = req.body.contact || post.contact;
      }
      post.media = req.body.media || post.media;
    } else {
      res.status(400).send({ message: 'Post not found' });
    }
    Post.findByIdAndUpdate(
      { _id: post._id },
      { $set: post },
      { new: true },
      (err, postRes) => {
        if (err) {
          res.status(400).send({ message: 'Update unsuccessful!' });
        }
        res.json({
          name: postRes.name,
          address: postRes.address,
          amenities: postRes.amenities,
          photo: postRes.media[0],
        });
      }
    );
  } catch (error) {
    res.status(400).send({ message: `Something went wrong : \n${error}` });
  }
});

/**
 * @description delete a review of PG
 * @route  DELETE /api/posts/:id
 * @param {}
 * @returns [{postId: ObjectId, postName: String}]
 * @access Verified
 */
const removeReview = expressAsyncHandler(async (req, res) => {
  try {
    const reviewid = req.params.id;
    const userid = req.user._id;
    const review = await Review.findOne({
      id: reviewid,
      'createdBy.userId': userid,
    });
    // console.log(reviewid);
    if (review) {
      await Review.deleteOne({ _id: reviewid });
      User.findByIdAndUpdate(
        userid,
        { $pull: { reviews: { reviewId: reviewid } } },
        { new: true },
        (err, userRes) => {
          if (err) {
            res.status(400).send(`Deletion unsuccessful!`);
          }
          res.json(userRes.reviews);
        }
      );
    } else {
      res.status(404).send({ message: 'review not found' });
    }
  } catch (error) {
    res.status(400).send({ message: `Something went wrong` });
  }
});

/**
 * @description View all reviews of a PG
 * @route  GET /api/reviews/
 * @param  {reviewId: "String"}
 * @returns name: String,
        location: Object,
        description: String,
        address: String,
        types: [Object],
        gender: String,
        meal: {weekdays*: [Breakfast|Lunch|Dinner], weekends*: [Breakfast|Lunch|Dinner], options*: 'Veg-Only'|'Non-Veg'},
        maintenance: Number,
        gateOpen: String,
        gateClose: String,
        amenities: Object(Boolean - laundry, refrigerator, tv, wifi, bed),
        media: [String]+,
        contact: [Number]+,
        createdBy: {userId: ObjectId, userName: String},
        createdAt: Timestamp,} 
 * @access Verified
 */
const viewAllReview = expressAsyncHandler(async (req, res) => {
  try {
    const postid = req.body.postId;
    const userid = req.user._id;
    const review = await Review.find({ 'reviewFor.postId': postid });

    if (review) {
      res.json(review);
    } else {
      res.status(400).send({ message: 'Post not found' });
    }
  } catch (error) {
    res.status(400).send({ message: `Something went wrong : \n${error}` });
  }
});

/**
 * @description View all posts of PGs by a host
 * @route  GET /api/posts/
 * @param  {}
 * @returns [{name: String,
        address: String,
        photo: String,}]
 * @access Verified
 */
const viewPosts = expressAsyncHandler(async (req, res) => {
  try {
    const userid = req.user._id;
    const user = await User.findById(userid);
    const posts = await Post.find({ 'createdBy.userId': user._id });
    const postList = [];
    posts.forEach((post) => {
      postList.push({
        postid: post.id,
        name: post.name,
        address: post.address,
        photo: post.media[0],
      });
    });
    res.json(postList);
  } catch (error) {
    res.status(400).send({ message: `Something went wrong : \n${error}` });
  }
});

/**
 * @description View all posts of PGs within 500km from a given location
 * @route  POST /api/posts/search
 * @param  {{location: String, searchText: String,}}
 * @returns [{name: String,
        address: String,
        photo: String,}]
 * @access Verified
 */
const searchPosts = expressAsyncHandler(async (req, res) => {
  try {
    const postList = [];
    const searchText = req.body.searchText;
    const posts = await Post.find({
      $or: [
        { address: { $regex: new RegExp(searchText, 'i') } },
        { name: { $regex: new RegExp(searchText, 'i') } },
      ],
    });
    posts.forEach((post) => {
      postList.push({
        postid: post.id,
        name: post.name,
        address: post.address,
        photo: post.media[0],
      });
    });
    res.json(postList);
  } catch (error) {
    res.status(400).send({ message: `Something went wrong : \n${error}` });
  }
});

export {
  createPost,
  editPost,
  removeReview,
  viewAllReview,
  viewPosts,
  searchPosts,
};
