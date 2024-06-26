const { error } = require("console");
const path = require("path");

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

module.exports = { uploadMutilFile, uploadSingleFile };
