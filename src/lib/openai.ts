import {Configuration, OpenAIApi} from 'openai-edge'

const config = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
})

const openai = new OpenAIApi(config)


export async function generateImagePrompt(name: string) {
    // math

    // -> ;thumbnail that has a bunch of colorful numbers and circles
    try {
        const response = await openai.createChatCompletion({
            model: 'gpt-3.5-turbo',
            messages: [
                {
                    role: 'system',
                    content: 'You are an creative and helpful AI assistant capable of generating interesting thumbnail descriptions for my notes. Your output will be fed into the DALLE API to generate a thumbnail. The description should be minimalistic and flat styled',
                },
                {
                    role: "user",
                    content: `Please generate a thumbnail description for my notebook titles ${name}`
                }
            ],
        });
        const data = await response.json()
        console.log(data)
        const image_description = data.choices[0].message.content;
        return image_description as string;
    } catch (error) {
        console.log(error);
        throw error;
        
    }
}

export async function generateImage() {

}