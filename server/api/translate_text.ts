

const translates = new Map<string, TranslateText>();
translates.set(baidu.name, baidu)
translates.set(youdao.name, youdao)
translates.set(google.name, google)
translates.set(tencent.name, tencent)
translates.set(chatgpt.name, chatgpt)
translates.set(bing.name, bing)
translates.set(ali.name, ali)
translates.set(deepl.name, deepl)
translates.set(volc.name, volc)


export default defineEventHandler(async (event) => {
    const query = getQuery(event)
    const translator = query.translator as string;
    const text = query.text as string;
    let from = query.from as string;
    let to = query.to as string;
    let requestId = query.requestId as string;
    const config = JSON.parse(decodeURIComponent(query.config as string));

    from = fixLanguageCode(translator, from);
    to = fixLanguageCode(translator, to);

    const func = translates.get(translator);
    if (!func) {
        throw createError({
            message: `${translator}没有实现相对应的处理方法`,
            data: {
                requestId: requestId,
                from: from,
                to: to,
                text: text,
                translator: translator
            }
        })
    }

    try {
        const message = await func(text, from, to, config);
        return {
            message: message,
            requestId: requestId,
        }
    }
    catch (error: any) {
        error.data = {
            requestId: requestId,
            from: from,
            to: to,
            text: text,
            translator: translator
        }
        throw error;
    }
})

var config = useAppConfig();
const languages = config.languages as any[];

export function fixLanguageCode(service: string, language: string): string {
    const chosenLanguage = languages.find(lang => lang.default === language && lang.hasOwnProperty(service));
    if (chosenLanguage) {
        return chosenLanguage[service] as string;
    }
    return language;
}
