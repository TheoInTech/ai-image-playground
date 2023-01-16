
import { useState } from 'react'
import useAI from "../utils/hooks/useAI";

export default function Home() {
  const [nftImage, setNftImage] = useState(null);
  const [handDrawnImage, setHandDrawnImage] = useState(null);
  const [generatedImageUrl, setGeneratedImageUrl] = useState(null);
  const { generateImage, isLoading } = useAI()

  const handleNftImageUpload = (e) => {
    setNftImage(e.target.files[0]);
  };

  const handleHandDrawnImageUpload = (e) => {
    setHandDrawnImage(e.target.files[0]);
  };

  const handleGenerateImage = async () => {
    const url = await generateImage(nftImage, handDrawnImage);
    setGeneratedImageUrl(url);
  };

  return (
    <div>
      <h1>Upload Images</h1>
      <input type="file" onChange={handleNftImageUpload} />
      <input type="file" onChange={handleHandDrawnImageUpload} />
      <button onClick={handleGenerateImage}>Generate Image</button>
      {isLoading && <span>Loading...</span>}
      {generatedImageUrl && (
        <img src={generatedImageUrl} alt="Generated Image" />
      )}
    </div>
  );
}
