const db = require('../models');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res, next) => {
  try {
    // create a user
    console.log(req.body);
    const user = await db.User.create(req.body);

    // const newUser = new User({
    //   username: req.body.username,
    //   password: req.body.password
    // });

    // console.log(newUser);
    
    const { id, username } = user;
    const token = jwt.sign({
      id,
      username
    }, process.env.SECRET_KEY);

    
    return res.status(200).json({
      id,
      username,
      token
    });
  } catch (err) {
    // if a validation fails!
    console.log('ddddd');
    if (err.code === 11000) {
      err.message = 'Sorry, that username and/or email is taken';
    }

    return next({
      status: 400,
      message: err.message
    });
  }
};

exports.signin = async function (req, res, next) {
  try {
    const user = await db.User.findOne({
      username: req.body.username
    });  

    console.log(`ggg${req.body.password}`);
    const { id, username } = user;

    const isMatch = await user.comparePassword(req.body.password);

    console.log(isMatch);
    if (isMatch) {
      console.log('jwt');
      const token = jwt.sign(
        {
          id,
          username
        },
        process.env.SECRET_KEY,
      );
      
      return res.status(200).json({
        id,
        username,
        token
      });
    }
    
    return next({
      status: 400,
      message: 'Invalid Username/Password.'
    });
  } catch (error) {
    return next({
      status: 400,
      message: 'Invalid Username/Password.'
    });
  }
};
