// translator.ts
import axios, { AxiosRequestConfig } from 'axios';

interface TranslationResponse {
  translation: string;
}

async function translateText(text: string): Promise<string | null> {
  const encodedParams = new URLSearchParams();
  encodedParams.set('from', 'auto');
  encodedParams.set('to', 'hi'); // Change 'en' to 'hi' for Hindi translation
  encodedParams.set('text', text);

  const options: AxiosRequestConfig = {
    method: 'POST',
    url: 'https://google-translate113.p.rapidapi.com/api/v1/translator/text',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'X-RapidAPI-Key': '94b3a78f1bmsh662c7febf59376fp1dab64jsn819716c95f6f',
      'X-RapidAPI-Host': 'google-translate113.p.rapidapi.com'
    },
    data: encodedParams,
  };

  try {
    const response = await axios.request<TranslationResponse>(options);
    return response.data.translation;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export default translateText;
