const path = require("path");
const fs = require("fs-extra");

const uploadSingleFile = async (fileObject) => {
  let uploadPath = path.resolve(__dirname + "../../public/images/upload");

  //extension name -- png/jpeg
  let extName = path.extname(fileObject.name);

  //image name (no extension)
  let baseName = path.basename(fileObject.name, extName);

  let finalName = `${baseName}-${Date.now()}${extName}`;
  let finalPath = `${uploadPath}/${finalName}`;

  // Use the mv() method to place the file somewhere on your server
  try {
    await fileObject.mv(finalPath);
    return {
      status: "success",
      path: finalName,
      error: null,
    };
  } catch (error) {
    return {
      status: "failed",
      path: null,
      error: JSON.stringify(error),
    };
  }
};

const uploadMutilFile = async (fileArray) => {
  try {
    let uploadPath = path.resolve(__dirname + "../../public/images/upload");
    let resultArr = [];
    let countSuccess = 0;
    for (let i = 0; i < fileArray.length; i++) {
      let extName = path.extname(fileArray[i].name);

      //image name (no extension)
      let baseName = path.basename(fileArray[i].name, extName);

      let finalName = `${baseName}-${Date.now()}${extName}`;
      let finalPath = `${uploadPath}/${finalName}`;

      try {
        await fileArray[i].mv(finalPath);
        resultArr.push({
          status: "success",
          path: finalName,
          fileName: fileArray[i].name,
          error: null,
        });
        countSuccess++;
      } catch (error) {
        resultArr.push({
          status: "failed",
          path: null,
          fileName: fileArray[i].name,
          error: JSON.stringify(error),
        });
      }
    }
    return {
      countSuccess,
      detail: resultArr,
    };
  } catch (error) {
    console.log(error);
  }
};

const updateSingleFile = async (fileObject) => {
  let uploadPath = path.resolve(__dirname + "../../public/images/upload");

  // extension name -- png/jpeg
  let extName = path.extname(fileObject.name);

  // image name (no extension)
  let baseName = path.basename(fileObject.name, extName);

  let finalName = `${baseName}-${Date.now()}${extName}`;
  let finalPath = `${uploadPath}/${finalName}`;

  try {
    await fileObject.mv(finalPath);
    return {
      status: "success",
      path: finalName,
      error: null,
    };
  } catch (error) {
    return {
      status: "failed",
      path: finalName,
      error: JSON.stringify(error),
    };
  }
};

const deleteUploadedFile = (filePath) => {
  let fullPath = path.resolve(
    __dirname + "../../public/images/upload/" + filePath
  );
  if (fs.existsSync(fullPath)) {
    fs.unlinkSync(fullPath);
  }
};

// const updateSingleFile = async (fileObject, existingFilePath) => {
//   let uploadPath = path.resolve(__dirname + "../../public/images/upload");

//   let extName = path.extname(fileObject.name);
//   let baseName = path.basename(fileObject.name, extName);
//   let finalName = `${baseName}-${Date.now()}${extName}`;
//   let finalPath = `${uploadPath}/${finalName}`;

//   try {
//     if (fs.existsSync(existingFilePath)) {
//       fs.unlinkSync(existingFilePath);
//     }

//     await fileObject.mv(finalPath);
//     return {
//       status: "success",
//       path: finalName,
//       error: null,
//     };
//   } catch (error) {
//     return {
//       status: "failed",
//       path: null,
//       error: JSON.stringify(error),
//     };
//   }
// };

module.exports = {
  uploadMutilFile,
  uploadSingleFile,
  updateSingleFile,
  deleteUploadedFile,
};
