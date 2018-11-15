/**
 * Created by Crystal on 2018/11/9.
 */
// 专门用来写页面性能监控的js
let processData = (p) => {
    let data = {
        prevPage: p.fetchStart - p.navigationStart, //上一个页面到这个页面时长
        redirect: p.redirectEnd - p.redirectStart, // 重定向时长
        dns: p.domainLookupEnd - p.domainLookupStart, //DNS解析时长
        connect: p.connectEnd - p.connectStart, // tcp连接时长
        // 从请求到响应时长
        send: p.responseEnd - p.responseStart, // 响应结束到请求结束
        ttfb: p.responseStart - p.navigationStart, // 手字节接收的时长
        domready: p.domInteractive - p.domLoading, // dom准备时长
        // 白屏
        whiteScreen: p.domLoading - p.navigationStart,
        //dom解析时间
        dom: p.domComplete - p.domLoading,
        // 监控onload执行时间
        load: p.loadEventEnd - p.loadEventStart,
        // 总共时长
        total: p.loadEventEnd - p.navigationStart,
    }

    return data;
}
// 监测函数
let load = (cb) => {
    let timer;
    let check = () => {
        if(performance.timing.loadEventEnd) {
            clearTimeout(timer)
            cb();
        } else {
            timer = setTimeout(check, 100);
        }
    }
    window.addEventListener('load', check, false)
}
// 监测函数
let domready = (cb) => {
    let timer;
    let check = () => {
        if(performance.timing.domInteractive) {
            clearTimeout(timer)
            cb();
        } else {
            timer = setTimeout(check, 100);
        }
    }
    window.addEventListener('DOMComtentLoaded', check, false)
}

export default {
    init(cb) {
        domready(() => { // 有可能没有触发onload dom解析完成后先统计一下，可能用户没加载万就关闭页面了
            let perfData = performance.timing;
            let data = processData(perfData);
            data.type = 'domready';
            cb(data);
        })
        load(() => {
            let perfData = performance.timing;
            let data = processData(perfData);
            data.type = 'loaded';
            cb(data);
        })

    }
}