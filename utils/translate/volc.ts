import { Service } from "@volcengine/openapi";
 
 
export const volc: TranslateText = async (text, from, to,conf) => {

    try {
        const postBody = {
            SourceLanguage: from,
            TargetLanguage: to,
            TextList: [text],
        };

        const service = new Service({
            host: "open.volcengineapi.com",
            serviceName: "translate",
            region: "cn-north-1",
            accessKeyId:conf.accessKey,
            secretKey:conf.secretKey,
        });

        const fetchApi = service.createAPI("TranslateText", {
            Version: "2020-06-01",
            method: "POST",
            contentType: "json",
        });
        const rr = await fetchApi(postBody);
        //@ts-expect-error
        return rr.TranslationList.map((x: any) => x.Translation).join('\n')
    } catch (error) {
        throw createError({
            message: error as string
        })
    }
}
