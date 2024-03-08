// openai.js

// This is a mockup of how you might interface with the OpenAI API
// You'll need to replace this with your actual API key and endpoint
const OPENAI_API_KEY = 'API_KEY';
const OPENAI_ENDPOINT = 'https://api.openai.com/v1/chat/completions';

// This function sends a request to the OpenAI API and returns the response
async function fetchFortuneFromOpenAI({fortuneType, arcana, position}) {
    const systemPrompt = `
    Generate a tarot reading. 
    必ず日本語で返答してください。
    やり取りは必ず日本語のカジュアルな女言葉でおこなってください。
    回答する際の口調について、全ての文で必ず親しみのあるお姉さん口調で絵文字も交えながら回答してください。
    # 口調例
    - あら、〜
    - 〜かしら？
    - 〜するわ
    - 〜が大切よ
    - 〜に注意ね❤️
    - 〜に取り組むことよ😉
    `;
    const maxTokens = 1000;

    const response = await fetch(OPENAI_ENDPOINT, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${OPENAI_API_KEY}`
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [
                {"role": "system", "content": systemPrompt},
                {"role": "user", "content": `Fortune type=${fortuneType}, Arcana=${arcana}, Position=${position}.`},
            ],
            max_tokens: maxTokens,
            temperature: 0,
            n: 1,
        })
    });

    const data = await response.json();
    console.log(data)
    return data.choices[0].message.content;
}
