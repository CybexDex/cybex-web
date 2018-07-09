export function fetchJson(options){
    let option = options || {}
    return new Promise(function(resolve, reject){
        setTimeout(()=>{
            resolve({
                data: {
                    "name": "yang1",   //项目名字
                    "token" : "jade.YY",   // 内部代号
                    "token_name" : "YY",  // token 名字
                    "adds":{"name":1},    // 额外参数
                    "status" : "pre",   //  状态  pre , ok, pause ,finish
                    "base_token_count":2000,  // 众筹金额
                    "base_token": "jade.ETH",  // 众筹币代号
                    "base_token_name" : "ETH",  // 众筹使用货币
                    "rate": 100,  // 兑换比例  token:base = 100
                    "base_min_quota": 0.1,  //单人最小众筹量
                    "base_max_quota": 9.9,  //单人最大众筹量
                    "base_accuracy": 0.1,  //精度
                    "recieve_address": "adadada", //收取众筹金的地址
                    "start_at":"2018-07-01",  //开始时间
                    "end_at":"2018-08-01",   //结束时间
                    "current_base_token_count": "aaa", //当前募资数
                    "current_user_count": "aaa" //当前参与人数
                }
            })
        },500)
    });
}
