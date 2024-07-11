const {
  getAll,
  getById,
  updateUserById,
  deletUserById,
  postOneUser,
  restoreDelete,
} = require("../services/CRUDServieces");
const {
  uploadSingleFile,
  updateSingleFile,
} = require("../services/fileServices");
const path = require("path");

module.exports = {
  getAllUser: async (req, res) => {
    let result = await getAll();

    if (result) {
      return res.status(200).json({
        EC: 0,
        data: result,
      });
    } else {
      return res.status(500).json({
        EC: -1,
        data: result,
      });
    }
  },
  getUserById: async (req, res) => {
    let id = req.body.id;

    let result = await getById(id);
    if (result) {
      return res.status(200).json({
        EC: 0,
        data: result,
      });
    } else {
      return res.status(500).json({
        EC: -1,
        data: result,
      });
    }
  },
  postUser: async (req, res) => {
    let { name, email, phone, password } = req.body;
    let imageUrl = "";

    if (!req.files || Object.keys(req.files).length === 0) {
      return;
    } else {
      let result = await uploadSingleFile(req.files.image);
      imageUrl = result.path;
    }

    let data = {
      name,
      email,
      phone,
      password,
      image: imageUrl,
    };

    let user = await postOneUser(data);

    if (user) {
      return res.status(200).json({
        EC: 0,
        data: user,
      });
    } else {
      return res.status(500).json({
        EC: -1,
        data: user,
      });
    }
  },
  putUser: async (req, res) => {
    let { id, name, email, phone, password } = req.body;
    let imageUrl = "";

    // Fetch existing user data to get the existing image path
    let existingUser = await getById(id);
    if (!existingUser) {
      return res.status(404).json({
        EC: -1,
        EM: "User not found",
      });
    }

    let existingImagePath = path.resolve(
      __dirname + "../../public/images/upload/" + existingUser.image
    );

    if (req.files && Object.keys(req.files).length > 0) {
      let result = await updateSingleFile(req.files.image, existingImagePath);
      if (result.status === "success") {
        imageUrl = result.path;
      } else {
        return res.status(500).json({
          EC: -1,
          EM: "File upload failed",
          error: result.error,
        });
      }
    } else {
      imageUrl = existingUser.image;
    }

    let data = {
      name,
      email,
      phone,
      password,
      image: imageUrl,
    };

    let updatedUser = await updateUserById(id, data);

    if (updatedUser) {
      return res.status(200).json({
        EC: 0,
        EM: "Update success",
        data: updatedUser,
      });
    } else {
      return res.status(500).json({
        EC: -1,
        EM: "Update failed",
        data: updatedUser,
      });
    }
  },
  deleteUser: async (req, res) => {
    let id = req.body.id;
    let result = await deletUserById(id);

    if (result) {
      return res.status(200).json({
        EC: 0,
        data: result,
      });
    } else {
      return res.status(500).json({
        EC: -1,
        data: result,
      });
    }
  },
  restoreUser: async (req, res) => {
    let id = req.body.id;

    let result = await restoreDelete(id);
    if (result) {
      return res.status(200).json({
        EC: 0,
        data: result,
      });
    } else {
      return res.status(500).json({
        EC: -1,
        data: result,
      });
    }
  },
};
