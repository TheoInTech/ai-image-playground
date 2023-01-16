import axios from "axios";
import { useState } from 'react'

const useAI = () => {
    const [isLoading, setIsLoading] = useState(false)
  const generateImage = async (nftImage, handDrawnImage) => {
    // const nftUrl = await readAndGetUrl(nftImage);
    // const handDrawnUrl = await readAndGetUrl(handDrawnImage);

    try {
        setIsLoading(true)
        const response = await axios.post(
            'https://api.openai.com/v1/images/edits',
            {
              prompt: 'Add an archer boy',
              n: 1,
              image: nftImage,
              mask: handDrawnImage,
              size: '512x512',
              response_format: 'url'
            },
            {
              headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${process.env.NEXT_PUBLIC_OPENAI_SECRET_KEY}`
              }
            }
          )
      const { data } = response;
      setIsLoading(false)
      return data?.data?.[0]?.url;
    } catch (error) {
      console.error(error);
      setIsLoading(false)
      return null;
    }
  };

  const readAndGetUrl = async (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  return { generateImage, isLoading };
};

export default useAI;
