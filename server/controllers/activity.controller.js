import Activity from "../models/activity.model.js";

const activityController = {};

activityController.create = async (req, res) => {
  const { title, type, imageUrl } = req.body;

  if (!title || !type || !imageUrl) {
    return res
      .status(400)
      .send({ message: "title, Type or imgUrl can't be empty" });
  }

  try {
    const existingActivity = await Activity.findOne({ where: { title } });
    if (existingActivity) {
      return res.status(400).send({ message: "Restaurant already exists" });
    }

    const newActivity = { title, type, imageUrl };
    const data = await Activity.create(newActivity);
    res.send(data);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Something error while creating the restaurant",
    });
  }
};

restaurantController.getAll = async (req, res) => {
  try {
    const data = await Activity.findAll();
    res.send(data);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Something error while getting all restaurants",
    });
  }
};

restaurantController.getById = async (req, res) => {
  const id = req.params.id;
  try {
    const data = await Activity.findByPk(id);
    if (!data) {
      return res
        .status(404)
        .send({ message: "No restaurants found with id " + id });
    }
    res.send(data);
  } catch (error) {
    res.status(500).send({
      message:
        error.message ||
        "Something error while getting the restaurant with id " + id,
    });
  }
};

activityController.update = async (req, res) => {
  const id = req.params.id;
  const { title, type, imageUrl } = req.body;
  if (!title && !type && !imageUrl) {
    return res
      .status(404)
      .send({ message: "Name, Type and Image can not be empty!" });
  }

  try {
    const [num] = await Activity.update(
      { title, type, imageUrl },
      { where: { id: id } }
    );
    if (num === 1) {
      res.send({ message: "Update restaurant successfully!" });
    } else {
      res.send({
        message:
          "Cannot update restaurant with id " +
          id +
          ". Maybe restaurant was not found or req body is empty!",
      });
    }
  } catch (error) {
    res.status(500).send({
      message:
        error.message ||
        "Something error while updating the restaurant with id " + id,
    });
  }
};

activityController.deleteById = async (req, res) => {
  const id = req.params.id;
  if (!id) {
    return res.status(404).send({ message: "ID is missing" });
  }

  try {
    const num = await Activity.destroy({ where: { id } });
    if (num === 1) {
      res.send({ message: "Restaurant was deleted successfully!" });
    } else {
      res.status(404).send({
        message:
          "Cannot delete restaurant with id " +
          id +
          ". Maybe restaurant was not found.",
      });
    }
  } catch (error) {
    res.status(500).send({
      message:
        error.message ||
        "Something error while deleting the restaurant with id " + id,
    });
  }
};

export default activityController;
