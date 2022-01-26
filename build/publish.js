/* eslint-disable @typescript-eslint/no-var-requires */

const inquirer = require("inquirer");
const spawn = require("cross-spawn");
const yargs = require("yargs");
const pkg = require("../package.json");

const { registry } = yargs.argv || {};
const version = pkg.version.split(".");
let selectedVersion;

// 获取新版本选择列表
const getNewVersions = () => {
  const list = [];

  version.forEach((v, i) => {
    const thisVersion = [...version];

    thisVersion[i] = thisVersion[i] - 0 + 1;

    switch (i) {
      // major
      case 0:
        thisVersion[1] = 0;
        thisVersion[2] = 0;
        break;
      // minor
      case 1:
        thisVersion[2] = 0;
        break;
      default:
        break;
    }

    list.unshift(thisVersion.join("."));
  });

  list.push("自定义");

  return list;
};

const versionList = getNewVersions();

// 提交远程仓库
const pushToGit = () => {
  console.log(`
  ==================================================
  发布NPM包成功，提交远程仓库
  ==================================================
  `);

  spawn.sync("git", ["add", "."], { stdio: "inherit" });
  spawn.sync("git", ["commit", "-m", selectedVersion], { stdio: "inherit" });
  spawn.sync("git", ["pull"], { stdio: "inherit" });
  spawn.sync("git", ["push"], { stdio: "inherit" });
};

// 发布NPM包
const publishNpm = () => {
  console.log(`
  ==================================================
    编译成功，发布NPM包
  ==================================================
  `);

  const publish = spawn(
    "npm",
    ["publish", `${registry ? `--registry=${registry}` : ""}`],
    {
      stdio: "inherit",
    }
  );
  publish.on("close", (publishCode) => {
    if (publishCode !== 0) return;
    pushToGit();
  });
};

// 编译代码
const buildCodes = () => {
  console.log(`
  ==================================================
    编译代码
  ==================================================
  `);

  const build = spawn("npm", ["run", "build"], { stdio: "inherit" });
  build.on("close", (buildCode) => {
    if (buildCode !== 0) return;
    publishNpm();
  });
};

// 升级版本
const updateVersion = (v) => {
  console.log("升级版本为：", v);

  // 更新package
  pkg.version = v;
  selectedVersion = v;

  spawn.sync("npm", ["version", v], { stdio: "inherit" });

  // 编译代码
  buildCodes();
};

// 自定义版本
const customVersion = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "version",
        message: "输入新版本：",
        validate: (val) => {
          // 校验版本格式
          const newVersion = val.split(".");
          let validStatus = true;

          if (newVersion.length !== 3) {
            validStatus = false;
          }

          return !validStatus ? "请输入正确的版本格式：*.*.*" : true;
        },
      },
    ])
    .then((answers) => {
      const newVersion = answers.version;
      updateVersion(newVersion);
    });
};

inquirer
  .prompt([
    {
      type: "list",
      name: "version",
      message: `当前版本为V${pkg.version}，升级版本`,
      choices: versionList,
    },
  ])
  .then((answers) => {
    const selected = answers.version;
    if (selected === "自定义") {
      customVersion();
    } else {
      updateVersion(selected);
    }
  });
