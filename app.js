
/**
 * Created by Crystal on 2018/11/9.
 */
// 服务端koa
let Koa = require('koa')
let path = require('path');
let Server = require('koa-static');
let app = new Koa();

app.use(async (ctx, next)=>{
    if(ctx.path == '/api/list'){
        ctx.body = {name: 'zfpx'}
    } else {
        return next();
    }
})

app.use(Server(path.join(__dirname, 'client')))
app.use(Server(path.join(__dirname, 'node_modules')))




app.listen(3000, function() {
    console.log('server start 3000');
});