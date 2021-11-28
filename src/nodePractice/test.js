// console.log(1234);

// const fnc = require("./functions");

// console.log(fnc);

// fnc.sayMsg("honda");
// console.log(__dirname);
// console.log(__filename);

// console.log(module);
// console.log(process);

// sayMsg("hodna");
// const os = require("os");

// console.log(os.userInfo());

// console.log(os.uptime());

// const osInfo = {
//   type: os.type(),
//   release: os.release(),
//   totalmem: os.totalmem(),
//   freemem: os.freemem(),
// };

// const path = require("path");

// // console.log(path.sep);

// const filepath = path.join("/files", "texts", "test.txt");

// console.log(filepath);
// console.log(path.basename(filepath));

// const absolute = path.resolve(__dirname, "files");
// console.log(absolute);

// const { readFileSync, writeFileSync } = require("fs");

// const msg = readFileSync("./files/texts/test.txt", "utf-8");

// writeFileSync("./files/texts2/result.txt", "hello boy!!\n", { flag: "a" });

// console.log(msg);

const { readFile, writeFile, write } = require("fs");

readFile("./files/texts2/result.txt", "utf-8", (err, result) => {
  if (err) {
    console.log(err);
    return;
  }

  const first = result;
  writeFile(
    "./files/texts2/copy.txt",
    "here is the result : " + first,
    (err, result) => {
      if (err) {
        console.log(err);
      }

      console.log(result);
    }
  );
});
