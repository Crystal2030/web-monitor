/**
 * Created by Crystal on 2018/11/9.
 */
export default {
    init(cb){
        //window.addEventListener('error', fn, true)
        // promise失败了不能通过onerror捕获， 应该通过onhandle.... 捕获promise错误
        window.onerror = function(message, source, lineno, colno, error) {
            console.dir(error);
            let info = {
                message: error.message,
                name: error.name,// 错误类型
            };

            let stack = error.stack;
            let matchUrl = stack.match(/http:\/\/[^\n]*/)[0];
            console.log(matchUrl)
            info.filename = matchUrl.match(/http:\/\/(?:\S*)\.js/)[0]
            let [, row, column] = matchUrl.match(/:(\d+):(\d+)/);
            info.row = row;
            info.column = column;
            //上线的时候代码会压缩 source-map找到对应的真是的报错
            cb(info);
        }
    }
}