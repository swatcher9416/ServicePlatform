import Vue from "vue";
import axios from "axios"; // 注意先安装哦
import config from "./config.js"; // 倒入默认配置
//import qs from "qs"; // 序列化请求数据，视服务端的要求
import store from "../store/store";
import router from "../router";
// import Loading from '@/components/loading';
axios.defaults.retry = 3;
axios.defaults.retryDelay = 1000;
export default function $axios(options) {
    return new Promise((resolve, reject) => {
        const instance = axios.create({
            baseURL: config.baseURL,
            headers: config.headers,
            timeout: config.timeout,       //设置超时
            transformResponse: [function (data) {
            }]
        });

        // 定义请求拦截器（request）
        instance.interceptors.request.use(
            //在请求发出之前进行一些操作
            config => {
                //Vue.prototype.$load(true);
                // store.state.loading_show = true;
                // Tip: 1
                // 请求开始的时候可以结合 vuex 开启全屏的 loading 动画
                // const loading = this.$loading({
                //   lock: true,
                //   text: 'Loading',
                // });

                // Tip: 2
                // 带上 token , 可以结合 vuex 或者重 localStorage
                if (store.state.token) {
                    config.headers["token"] = store.state.token; // 让每个请求携带token--['X-Token']为自定义key 请根据实际情况自行修改
                }
                //else {
                //   router.push({
                //     path: '/login'
                //   })
                // }
                //   if (store.state.token) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
                //     config.headers.Authorization = `token ${store.state.token}`;
                // }

                // Tip: 3
                // 根据请求方法，序列化传来的参数，根据后端需求是否序列化
                if (
                    config.method.toLocaleLowerCase() === "post" ||
                    config.method.toLocaleLowerCase() === "put" ||
                    config.method.toLocaleLowerCase() === "delete"
                ) {
                    console.log(config.data);
                    // config.data = qs.stringify(config.data)
                }
                return config;
            },
            error => {
                // Tip: 4
                // 关闭loadding
                console.log("request:", error);
                return Promise.reject(error); // 在调用的那边可以拿到(catch)你想返回的错误信息
            }
        );

        // 定义响应拦截器（response ）
        instance.interceptors.response.use(
            response => {
                let data;
                // IE9时response.data是undefined，因此需要使用response.request.responseText(Stringify后的字符串)
                if (response.data == undefined) {
                    data = response.request.responseText;
                } else {
                    data = response.data;
                }
                // 根据返回的code值来做不同的处理（和后端约定）
                switch (data.code) {
                    case "1":
                        Message.error(data.msg);
                        break;
                    case "2":
                        // console.log(data.msg)
                        // Message.error("登录失效，请重新登录");
                        break;
                    default:
                }
                // 若不是正确的返回code，且已经登录，就抛出错误
                // const err = new Error(data.description)

                // err.data = data
                // err.response = response

                // throw err
                return data;
            },
            err => {
                // 请求错误时做些事(接口错误、超时等)
                // Tip: 4
                // 关闭loadding
                if (err && err.response) {
                    switch (err.response.status) {
                        case 400:
                            err.message = "请求错误";
                            break;

                        case 401:
                            err.message = "未授权，请登录";
                            break;

                        case 403:
                            err.message = "拒绝访问";
                            break;

                        case 404:
                            err.message = `请求地址出错: ${err.response.config.url}`;
                            break;

                        case 408:
                            err.message = "请求超时";
                            break;

                        case 500:
                            err.message = "服务器内部错误";
                            break;

                        case 501:
                            err.message = "服务未实现";
                            break;

                        case 502:
                            err.message = "网关错误";
                            break;

                        case 503:
                            err.message = "服务不可用";
                            break;

                        case 504:
                            err.message = "网关超时";
                            break;

                        case 505:
                            err.message = "HTTP版本不受支持";
                            break;

                        default:
                    }
                    //对具体的错误做操作
                    //1.再次请求
                    // if (
                    //     err.code === "ECONNABORTED" &&
                    //     err.message.indexOf("timeout") !== -1
                    // )
                }
                if (err.response.status === 404) {
                    console.log(
                        "根据你设置的timeout/真的请求超时 判断请求现在超时了，你可以在这里加入超时的处理方案"
                    );

                    // return service.request(originalRequest);//例如再重复请求一次
                    //再次发起请求
                    var config = err.config;
                    // If config does not exist or the retry option is not set, reject
                    if (!config || !config.retry) return Promise.reject(err);

                    // Set the variable for keeping track of the retry count
                    config.__retryCount = config.__retryCount || 0;

                    // Check if we've maxed out the total number of retries
                    if (config.__retryCount >= config.retry) {
                        // Reject with the error
                        return Promise.reject(err);
                    }

                    // Increase the retry count
                    config.__retryCount += 1;

                    // Create new promise to handle exponential backoff
                    var backoff = new Promise(function (resolve) {
                        setTimeout(function () {
                            resolve();
                        }, config.retryDelay || 1);
                    });

                    // Return the promise in which recalls axios to retry the request
                    return backoff.then(function () {
                        return axios(config);
                    });

                }

                // 2.需要重定向到错误页面
                const errorInfo = err.response;
                console.log(errorInfo);
                if (errorInfo) {
                    // error =errorInfo.data//页面那边catch的时候就能拿到详细的错误信息,看最下边的Promise.reject
                    const errorStatus = errorInfo.status; // 404 403 500 ... 等
                    // router.push({
                    //     path: `/error/${errorStatus}`
                    // });
                }
                console.error(err.message);
                // this.$message(`ERROR: ${err}`);
                //Message.error(`ERROR: ${err}`);
                return Promise.reject(err); // 返回接口返回的错误信息

            }
        );

        // 请求处理
        instance(options)
            .then(res => {
                Vue.prototype.$load(false);
                resolve(JSON.parse(res));
                return false;
            })
            .catch(error => {
                // reject(error);
            });
    });
}


//在main.js设置全局的请求次数，请求的间隙

axios.interceptors.response.use(undefined,
    function axiosRetryInterceptor(err) {
    var config = err.config;
    // If config does not exist or the retry option is not set, reject
    if (!config || !config.retry) return Promise.reject(err);

    // Set the variable for keeping track of the retry count
    config.__retryCount = config.__retryCount || 0;

    // Check if we've maxed out the total number of retries
    if (config.__retryCount >= config.retry) {
        // Reject with the error
        return Promise.reject(err);
    }

    // Increase the retry count
    config.__retryCount += 1;

    // Create new promise to handle exponential backoff
    var backoff = new Promise(function (resolve) {
        setTimeout(function () {
            resolve();
        }, config.retryDelay || 1);
    });

    // Return the promise in which recalls axios to retry the request
    return backoff.then(function () {
        return axios(config);
    });
});