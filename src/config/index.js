module.exports = {
  questions: [
    {
      type: "list",
      name: "platform",
      message: "您要创建哪种平台的小程序？",
      choices: [
        { name: "wechat", value: "wechat" },
        { name: "ali", value: "ali" },
        { name: "toutiao", value: "toutiao" },
        { name: "one", value: "one" },
      ],
      default: "wechat",
    },
    {
      type: "list",
      name: "ts",
      message: "您的项目使用TypeScript吗？",
      choices: [
        { name: "Yes", value: true },
        { name: "NO", value: false },
      ],
      default: "Yes",
    },
    {
      type: "list",
      name: "anna",
      message: "您想使用 Anna 作为UI组件么？",
      choices: [
        { name: "Yes", value: true },
        { name: "NO", value: false },
      ],
      default: "Yes",
    },
  ],
};
