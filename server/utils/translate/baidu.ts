import { createHash } from "crypto";


 

export const baidu: TranslateText = async (text, from, to,conf) => {

    const salt = new Date().getTime()
 
    const result = await $fetch('https://fanyi-api.baidu.com/api/trans/vip/translate', {
        query: {
            q: text,
            from: from,
            to: to,
            appid: conf.appId,
            salt: salt,
            sign: createHash('md5').update(conf.appId + text + salt + conf.secret).digest('hex'),
            dict: 1,
            tts: 1,
        }
    }) as any;
 
    if (result?.hasOwnProperty("error_code")) {
        throw createError({
            statusCode: result.error_code,
            message: `发生了错误error_code:${result.error_code}`,
        })
    }

    return result.trans_result.map((x: any) => x.dst).join('\n')
}

 
