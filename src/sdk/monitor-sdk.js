export let url = "www.baidu.com";
export class StatisticSDK {
  constructor(sdkId) {
    this.sdkId = sdkId;
    // 初始化上报加载信息数据
    this.initPerformance();
    // 初始化错误监控
    this.initError();
  }
  // 利用img来发送数据
  send(topicUrl, option = {}) {
    option.productID = this.sdkId;
    let queryStr = Object.entries(option)
      .map(([key, value]) => `${key}=${value}`)
      .join("&");
    let img = new Image();
    img.src = `${topicUrl}?${queryStr}`;
  }
  // 自定义事件
  event(key, val = {}) {
    let eventURL = url;
    this.send(eventURL, { event: key, ...val });
  }
  // pv曝光
  pv() {
    this.event("pv");
  }
  // 性能上报
  initPerformance() {
    console.table(performance.timing);
    let performanceURL = url;
    this.send(performanceURL, performance.timing);
  }
  // 自定义错误上报
  error(err, etraInfo = {}) {
    const errorURL = url;
    const { message, stack } = err;
    this.send(errorURL, { message, stack, ...etraInfo });
  }
  // 初始化错误监控
  initError() {
    // 捕获监听DOM操作错误DOMException和JS错误告警
    window.addEventListener("error", (event) => {
      this.error(event);
    });
    // 捕获promise错误
    window.addEventListener("unhandledrejection", (event) => {
      this.error(new Error(event.reason), { type: "unhandledrejection" });
    });
  }
}
// 在vue中使用这个sdk可以在vue中有一个专门的生命周期可以在里面进行监听
// errorCaptured (err, vm, info) {
//     this.error = `${err.stack}\n\nfound in ${info} of component`
//     // 调用我们的SDK，上报错误信息
//     insSDK.error(err,info)
//     return false
//   }