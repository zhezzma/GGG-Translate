import { Configuration, OpenAIApi } from "openai"



export const chatgpt: TranslateText = async (text, from, to, conf) => {
    const configuration = new Configuration({
        apiKey: conf.apiKey,
    });
    const openai = new OpenAIApi(configuration);

    try {
        const completion = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [
                { role: "system", content: conf.system },
                { role: "user", content: `从${from}翻译成${to}: ${text}` }
            ],
        });
        return completion.data.choices[0].message!.content
    } catch (error) {
        throw createError({
            message: error as string
        })
    }
}
