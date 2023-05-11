


const api_url = 'https://translation.googleapis.com/language/translate/v2';

//https://cloud.google.com/translate/docs/reference/rest/v2/translate

export const google: TranslateText = async (text, from, to, conf) => {

    try {
        const result = await $fetch(api_url, {
            query: {
                q: text,
                source: from,
                target: to,
                format: 'text',
                key: conf.apiKey,
            }
        }) as any;
        return result.data.translations.map((x: any) => x.translatedText).join('\n')
    } catch (error) {
        throw createError({
            message: error as string
        })
    }
}


export const google_detect: DetectTextLang = async (str: string, conf: any) => {
    try {
        const result = await $fetch(api_url + "/detect", {
            query: {
                key: conf.apiKey,
                q: str
            }
        }) as any;

        var lang = result.data.detections.map((x: any) => x.language).join('\n');
        //因为会有zh_cn这种
        return lang.split(/[_-]/)[0];
    } catch (error) {
        throw createError({
            message: error as string
        })
    }

}


