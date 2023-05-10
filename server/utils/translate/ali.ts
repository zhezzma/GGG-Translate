
// This file is auto-generated, don't edit it
import alimt20181012, * as $alimt20181012 from '@alicloud/alimt20181012';
// 依赖的模块可通过下载工程中的模块依赖文件或右上角的获取 SDK 依赖信息查看
import OpenApi, * as $OpenApi from '@alicloud/openapi-client';
import Util, * as $Util from '@alicloud/tea-util';
import * as $tea from '@alicloud/tea-typescript';
 

/**
 * 使用AK&SK初始化账号Client
 * @param accessKeyId
 * @param accessKeySecret
 * @return Client
 * @throws Exception
 */
function createClient(accessKeyId: string, accessKeySecret: string): alimt20181012 {
    let config = new $OpenApi.Config({
        // 必填，您的 AccessKey ID
        accessKeyId: accessKeyId,
        // 必填，您的 AccessKey Secret
        accessKeySecret: accessKeySecret,
    });
    // 访问的域名
    config.endpoint = `mt.cn-hangzhou.aliyuncs.com`;
    //@ts-expect-error  
    return new alimt20181012.default(config);
}



export const ali: TranslateText = async (text, from, to,conf) => {

    // 工程代码泄露可能会导致AccessKey泄露，并威胁账号下所有资源的安全性。以下代码示例仅供参考，建议使用更安全的 STS 方式，更多鉴权访问方式请参见：https://help.aliyun.com/document_detail/378664.html
    let client = createClient(conf.keyId, conf.keySecret);
    let translateGeneralRequest = new $alimt20181012.TranslateRequest({
        sourceLanguage: from,
        targetLanguage: to,
        sourceText: text,
        scene: "general",
        formatType: "text",
    });
    let runtime = new $Util.RuntimeOptions({});

    try {
        // 复制代码运行请自行打印 API 的返回值
        const result = await client.translateWithOptions(translateGeneralRequest, runtime);
        return result.body.data!.translated as string
    } catch (error) {
        throw createError({
            message: error as string
        })
    }
}



export const ali_common: TranslateText = async (text, from, to,conf) => {

    // 工程代码泄露可能会导致AccessKey泄露，并威胁账号下所有资源的安全性。以下代码示例仅供参考，建议使用更安全的 STS 方式，更多鉴权访问方式请参见：https://help.aliyun.com/document_detail/378664.html
    let client = createClient(conf.keyId, conf.keySecret);
    let translateGeneralRequest = new $alimt20181012.TranslateGeneralRequest({
        sourceLanguage: from,
        targetLanguage: to,
        sourceText: text,
        scene: "general",
        formatType: "text",
    });
    let runtime = new $Util.RuntimeOptions({});

    try {
        // 复制代码运行请自行打印 API 的返回值
        const result = await client.translateGeneralWithOptions(translateGeneralRequest, runtime);
        return result.body.data!.translated as string
    } catch (error) {
        throw createError({
            message: error as string
        })
    }
}
