const {
  getAll,
  getById,
  updateUserById,
  deleteUserById,
  postOneUser,
  restoreDelete,
  postLoginUser,
  postRegisterUser,
  postLogOutUser,
} = require("../services/CRUDServieces");
const {
  uploadSingleFile,
  updateSingleFile,
  deleteUploadedFile,
} = require("../services/fileServices");
const path = require("path");
const fs = require("fs-extra");
const jwt = require("jsonwebtoken");
const { error } = require("console");
const User = require("../models/User");

const secretKey = "MySQL";

module.exports = {
  getAllUser: async (req, res) => {
    let limit = req.query.limit;
    let page = req.query.page;
    let result = null;
    let totalPages = 0;

    if (limit && page) {
      result = await getAll(limit, page);
      totalPages = Math.ceil(result.totalRecords / limit);
    } else {
      result = await getAll();
    }

    if (result.success) {
      return res.status(200).json({
        EC: 0,
        data: result.data,
        totalPages: totalPages === 0 ? 0 : totalPages,
      });
    } else {
      return res.status(500).json({
        EC: -1,
        error: result.errors,
      });
    }
  },
  getUserById: async (req, res) => {
    let id = req.body.id;

    let result = await getById(id);
    if (result.success) {
      return res.status(200).json({
        EC: 0,
        data: result.data,
      });
    } else {
      return res.status(500).json({
        EC: -1,
        error: result.errors,
      });
    }
  },
  // postUser: async (req, res) => {
  //   let { name, email, phone, password, role } = req.body;
  //   let imageUrl = "";

  //   if (!req.files || Object.keys(req.files).length === 0) {
  //     return;
  //   } else {
  //     let result = await uploadSingleFile(req.files.image);
  //     imageUrl = result.path;
  //   }

  //   let data = {
  //     name,
  //     email,
  //     phone,
  //     password,
  //     image: imageUrl,
  //     role,
  //   };

  //   let user = await postOneUser(data);

  //   if (user) {
  //     return res.status(200).json({
  //       EC: 0,
  //       data: user,
  //     });
  //   } else {
  //     return res.status(500).json({
  //       EC: -1,
  //       data: user,
  //     });
  //   }
  // },

  // postUser: async (req, res) => {
  //   let { name, email, password, role } = req.body;
  //   let imageUrl = "";

  //   // Kiểm tra xem có file được gửi lên hay không
  //   if (!req.files || Object.keys(req.files).length === 0) {
  //     return
  //   }

  //   let data = {
  //     name,
  //     email,
  //     password,
  //     role,
  //   };
  //   let user = await postOneUser(data);

  //   if (user) {
  //     try {
  //       let result = await uploadSingleFile(req.files.image);
  //       imageUrl = result.path;

  //       user.image = imageUrl;
  //       await user.save();

  //       return res.status(200).json({
  //         EC: 0,
  //         data: user,
  //       });
  //     } catch (error) {
  //       await deletUserById(user.id);
  //       return res.status(500).json({
  //         EC: -1,
  //         EM: "Error uploading file.",
  //         error: error.message,
  //       });
  //     }
  //   } else {
  //     return res.status(500).json({
  //       EC: -1,
  //       EM: "Error creating user.",
  //       data: user,
  //     });
  //   }
  // },

  postUser: async (req, res) => {
    let { name, email, password, role } = req.body;
    let imageUrl = "";

    if (!req.files || Object.keys(req.files).length === 0) {
      // return res.status(500).json({
      //   EC: -1,
      //   error: "Required Image",
      // });
    } else {
      let result = await uploadSingleFile(req.files.image);
      imageUrl = result.path;
    }

    let data = {
      name,
      email,
      password,
      role,
      image: imageUrl,
    };

    let user = await postOneUser(data);

    if (user.success) {
      return res.status(200).json({
        EC: 0,
        EM: "Create User Success",
        data: user.data,
      });
    } else {
      return res.status(500).json({
        EC: -1,
        EM: "Error creating user.",
        error: user.errors,
      });
    }
  },

  putUser: async (req, res) => {
    let { id, name, email, password, role } = req.body;
    let imageUrl = "";

    try {
      let data = {
        name,
        email,
        password,
        role,
      };

      if (req.files && Object.keys(req.files).length > 0) {
        let result = await updateSingleFile(req.files.image);
        if (result.status === "success") {
          imageUrl = result.path;
          data.image = imageUrl;
          let oldUser = await getById(id);
          if (oldUser && oldUser.image) {
            deleteUploadedFile(oldUser.image);
          }
        } else {
          return res.status(500).json({
            EC: -1,
            EM: "File upload failed",
            error: result.error,
          });
        }
      } else {
        let oldUser = await getById(id);
        if (oldUser && oldUser.image) {
          deleteUploadedFile(oldUser.image);
        }
        data.image = "";
      }

      let result = await updateUserById(id, data);

      if (result.success) {
        return res.status(200).json({
          EC: 0,
          EM: "Update success",
          data: result.data,
        });
      } else {
        if (imageUrl) {
          deleteUploadedFile(imageUrl);
        }
        return res.status(500).json({
          EC: -1,
          EM: "Update failed",
          error: result.errors,
        });
      }
    } catch (error) {
      console.error("Error in putUser:", error);
      if (imageUrl) {
        deleteUploadedFile(imageUrl);
      }
      return res.status(500).json({
        EC: -1,
        EM: "Server error",
        error: error.message,
      });
    }
  },

  // putUser: async (req, res) => {
  //   let { id, name, email, password, role } = req.body;
  //   let imageUrl = "";

  //   let existingUser = await getById(id);
  //   if (!existingUser) {
  //     return res.status(404).json({
  //       EC: -1,
  //       EM: "User not found",
  //     });
  //   }

  //   let existingImagePath = path.resolve(
  //     __dirname + "../../public/images/upload/" + existingUser.image
  //   );

  //   if (req.files && Object.keys(req.files).length > 0) {
  //     let fileObject = req.files.image;

  //     let result = await updateSingleFile(fileObject, existingImagePath);
  //     if (result.status === "success") {
  //       imageUrl = result.path;
  //     } else {
  //       return res.status(500).json({
  //         EC: -1,
  //         EM: "File upload failed",
  //         error: result.error,
  //       });
  //     }
  //   } else {
  //     if (fs.existsSync(existingImagePath)) {
  //       fs.unlink(existingImagePath, (err) => {
  //         if (err) {
  //           return res.status(500).json({
  //             EC: -1,
  //             EM: "Failed to delete old file",
  //             error: err.message,
  //           });
  //         }
  //       });
  //     }
  //     imageUrl = "";
  //   }

  //   let data = {
  //     name,
  //     email,
  //     password,
  //     image: imageUrl,
  //     role,
  //   };

  //   let updatedUser = await updateUserById(id, data);

  //   if (updatedUser) {
  //     return res.status(200).json({
  //       EC: 0,
  //       EM: "Update success",
  //       data: updatedUser,
  //     });
  //   } else {
  //     return res.status(500).json({
  //       EC: -1,
  //       EM: "Update failed",
  //       data: updatedUser,
  //     });
  //   }
  // },

  deleteUser: async (req, res) => {
    let id = req.body.id;
    let result = await deleteUserById(id);

    if (result.success) {
      return res.status(200).json({
        EC: 0,
        EM: "Delete User Success",
        data: result.data,
      });
    } else {
      return res.status(500).json({
        EC: -1,
        EM: "Delete User Success",
        error: result.errors,
      });
    }
  },
  restoreUser: async (req, res) => {
    let id = req.body.id;

    let result = await restoreDelete(id);
    if (result.success) {
      return res.status(200).json({
        EC: 0,
        data: result.data,
      });
    } else {
      return res.status(500).json({
        EC: -1,
        data: result.errors,
      });
    }
  },
  loginUser: async (req, res) => {
    let { email, password } = req.body;

    let data = {
      email,
      password,
    };

    let result = await postLoginUser(data);

    if (result.success) {
      const token = jwt.sign(
        { id: result.data.id, role: result.data.role },
        secretKey,
        {
          expiresIn: "24h",
        }
      );

      return res.status(200).json({
        EC: 0,
        EM: "Login Success",
        data: result.data,
        token,
      });
    } else {
      return res.status(500).json({
        EC: -1,
        EM: result.message,
        error: result.error,
      });
    }
  },

  registerUser: async (req, res) => {
    let { email, name, password } = req.body;

    let data = {
      email,
      name,
      password,
    };

    let result = await postRegisterUser(data);

    if (result.success) {
      return res.status(200).json({
        EC: 0,
        EM: "Register Success",
        data: result.data,
      });
    } else {
      return res.status(500).json({
        EC: -1,
        EM: "Register Failed",
        error: result.errors,
      });
    }
  },
  logoutUser: async (req, res) => {
    const email = req.body.email;
    const token = req.headers.authorization.split(" ")[1];

    let result = await postLogOutUser(email, token);

    if (result.success) {
      return res.status(200).json({
        EC: 0,
        EM: "Log out Success",
      });
    } else {
      return res.status(500).json({
        EC: -1,
        EM: "Log out Failed",
      });
    }
  },
};
