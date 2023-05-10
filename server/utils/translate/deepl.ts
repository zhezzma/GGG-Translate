import * as deepl_node from 'deepl-node';


 
export const deepl = async (text:string, from:any, to:any,conf:any) => {
    try {


        if(from.startsWith('en')) from = 'en';

        const translator = new deepl_node.Translator(conf.authKey);
        const result = await translator.translateText(text, from, to);
        return result.text
     
    } catch (error) {
        throw createError({
            message: error as string
        })
    }

}
