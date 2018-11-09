var jm =  require('jm-ms-daorouter');
var ms = jm.ms;

module.exports = function(service, opts) {
    var word = service.word;
    var filterLog=service.filterLog;
    var router = ms();
    var words = null;
    var __match = function (opts, cb) {
        var ip=opts.data.ip||"";
        var tags=opts.data.tags||"";
        var wordarr=[];
        var tmp=false;
        for(x in words){
            var num=opts.data.content.indexOf(words[x].word);
            if(num>=0){
                    wordarr.push(words[x].word);
                 tmp=true;
            }
        }
        if(tmp){
            var user = opts.user||{};
            data={
                userId:opts.data.id||user.id,
                words: wordarr,
                content:opts.data.content,
                ip:ip,
                tags:tags
            };
            filterLog.create(data);
            cb(null, {ret: wordarr.length});
        }else{
            cb(null, {ret: 0});
        }
    };
    service.mq.subscribe([
        'wordfilter.word.refash'
    ]);
    service.mq.onMessage(function(channel,message){
        words=null;
    });
    /**
     * @apiGroup wordfilter
     * @apiVersion 0.0.1
     *
     * @api {post/get} /match 匹配敏感词
     * @apiName match
     *
     * @apiParam {String} ip 用户IP
     * @apiParam {Number} [id] 用户ID(可选, 如果不填，采用系统默认值)
     * @apiParam {String} [centent] 匹配字段
     * @apiParam {array} [tags] 标签组
     * @apiParam {String} [token] token
     *
     * @apiSuccess {Number} num 敏感词个数
     * @apiExample {json} 成功:
     *     {
     *       ret: num
     *     }
    */
    var match = function (opts, cb) {
        if (!words) {
            word.find({}, function (err, doc) {
                words = doc;
                __match(opts, cb);
            });
        }else{
            __match(opts, cb);
        }
    };
    router.add('/', match);
    return router;
};