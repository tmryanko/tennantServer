const db = require('../models');


exports.getAllTennants = async function getAllTennants(req, res) {
  try {
    const tenant = await db.Tennant.find({ user: req.params.id });
    
    console.log(tenant);

    return res.json(tenant);
  } catch (error) {
    return res.send(error);
  }
};

exports.postNewTennant = async function postNewTennant(req, res, next) {
  try {
    const {
      name, phoneNumber, adress, financialDebt 
    } = req.body;

    const tennant = await db.Tennant.create({
      name,
      phoneNumber,
      adress,
      financialDebt,
      user: req.params.id
    });

    const user = await db.User.findById(req.params.id);
    
    user.tennantList.push(tennant);
    await user.save();

    return res.status(200).json(tennant);
  } catch (error) {
    return next(error);
  }
};
exports.deleteTennant = async function deleteTennant(req, res, next) {
  try {
    console.log(req.params.tennant);
    await db.Tennant.remove({ _id: req.params.tennant });
    
    return res.json({ message: 'Tennant successfully deleted' });
  } catch (error) {
    return next(error);
  }
};
exports.updateTennant = async function updateTennant(req, res) {
  console.log(req.body);
  const id = req.params.tennant;

  try {
    await db.Tennant.findOneAndUpdate({ _id: id }, { $set: req.body }, { new: true });
    
    return res.json({ message: 'Tennant successfully Update' });
  } catch (error) {
    return res.send(error);
  }
};
