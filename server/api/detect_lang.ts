
const detects = new Map<string, DetectTextLang>();
detects.set(tencent.name, tencent_detect)
detects.set(google.name, google_detect)

export default defineEventHandler(async (event) => {
    const query = getQuery(event)
    const text = query.text as string;
    const config = JSON.parse(decodeURIComponent(query.config as string));
    const lang = await language_detect(text, config);
    return {
        lang: lang
    }
})


export async function language_detect(str: string, config: any): Promise<string> {
    let lang = ''
    const runtimeConfig = useRuntimeConfig()
    for (let index = 0; index < runtimeConfig.public.detect_lang.length; index++) {
        const element = runtimeConfig.public.detect_lang[index] as string;
        const detectTextLang = detects.get(element);
        try {
            lang = await detectTextLang!(str, config[element])
            break;
        } catch {
        }
    }
    return lang || lang_testing(str)
}



function lang_testing(str: string) {
    const s = str.replace(/\s+/g, '')
    if (s.length < 1) return 'en'
    const list = [
        { type: 'zh', re: /[\u4e00-\u9fff\u2e80-\u2fdf\u3400-\u4dbf]/, num: 0 },
        { type: 'en', re: /[\u0021-\u007e]/, num: 0 }
    ]
    for (let i = 0; i < s.length; i++) {
        for (const item of list) {
            if (item.re.test(s.charAt(i))) {
                item.num++
            }
        }
    }
    const news = list.filter(x => x.num > 0)
    if (news.length < 1) {
        return 'en'
    }
    return news.sort((a, b) => b.num - a.num)[0].type
}