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

const secretKey = "MySQL";

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

    let data = {
      name,
      email,
      password,
      role,
    };

    // Gọi API để tạo người dùng mới
    let user = await postOneUser(data);

    if (user) {
      // Kiểm tra xem có file được gửi lên hay không
      if (req.files && Object.keys(req.files).length > 0) {
        try {
          let result = await uploadSingleFile(req.files.image);
          imageUrl = result.path;

          user.image = imageUrl;
          await user.save();
        } catch (error) {
          await deleteUserById(user.id);
          return res.status(500).json({
            EC: -1,
            EM: "Error uploading file.",
            error: error.message,
          });
        }
      }

      return res.status(200).json({
        EC: 0,
        data: user,
      });
    } else {
      return res.status(500).json({
        EC: -1,
        EM: "Error creating user.",
        data: user,
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

      let updatedUser = await updateUserById(id, data);

      if (updatedUser) {
        return res.status(200).json({
          EC: 0,
          EM: "Update success",
          data: updatedUser,
        });
      } else {
        if (imageUrl) {
          deleteUploadedFile(imageUrl);
        }
        return res.status(500).json({
          EC: -1,
          EM: "Update failed",
          data: updatedUser,
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
  loginUser: async (req, res) => {
    let { email, password } = req.body;

    let data = {
      email,
      password,
    };

    let result = await postLoginUser(data);

    const token = jwt.sign({ id: result.id, role: result.role }, secretKey, {
      expiresIn: "24h",
    });

    if (result.length > 0) {
      return res.status(200).json({
        EC: 0,
        EM: "Login Success",
        data: result,
        token,
      });
    } else {
      return res.status(500).json({
        EC: -1,
        EM: "Incorrect email or password",
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

    if (result) {
      return res.status(200).json({
        EC: 0,
        EM: "Register Success",
        data: result,
      });
    } else {
      return res.status(500).json({
        EC: -1,
        EM: "Register Failed",
      });
    }
  },
  logoutUser: async (req, res) => {
    const token = req.headers.authorization.split(" ")[1];

    let result = await postLogOutUser(token);

    if (result) {
      return res.status(200).json({
        EC: 0,
        EM: "Log out Success",
        data: result,
      });
    } else {
      return res.status(500).json({
        EC: -1,
        EM: "Log out Failed",
      });
    }
  },
};
