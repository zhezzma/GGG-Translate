
import { translate } from "bing-translate-api"



export const bing: TranslateText = async (text, from, to, conf) => {

    try {
        const result = await translate(text, from, to);
        return result.translation
    } catch (error) {
        throw createError({
            message: error as string
        })
    }
}
