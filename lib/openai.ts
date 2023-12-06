const API_KEY = process.env.REACT_APP_OPEN_API_KEY;

export async function openaiCall(script: any) {
  console.log(script);
  const res = await fetch(
    "http://imcmaster.iptime.org:7997",

    {
      method: "POST",
      body: JSON.stringify(script),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      cache: "no-store",
    }
  );
  console.log(script, res);
  return res.json();
}

export async function dalliCall(script: any) {
  console.log(script);
  const prompt = { prompt: script, n: 1, size: "256x256" };
  const res = await fetch(
    "https://api.openai.com/v1/images/generations",

    {
      method: "POST",
      body: JSON.stringify(prompt),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      cache: "no-store",
    }
  );
  console.log(prompt, res);
  return res.json();
}

export async function chatCall(messages: any) {
  const response = await fetch(
  "https://api.openai.com/v1/chat/completions",
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      // We'll later replace the content with user input
      messages: [...messages, { "role": "user", "content": "This is a test!" }],
      temperature: 0.7,
    }),
  }
);

export const chatData = async (userMessage:string) => {
  try {
    const response = await fetch(
      "https://api.openai.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [...messages, { role: "user", content: userMessage }],
          temperature: 0.7,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Oops! Something went wrong while processing your request.");
    }

    const responseData = await response.json();
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        role: "assistant",
        content: responseData.choices[0].message.content,
      },
    ]);
  } catch (error) {
    console.error("Error while fetching chat data:", error);
  }
};
