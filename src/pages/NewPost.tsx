import { useState } from 'react';
import RenderMarkdown from '../components/RenderMarkdown';

const NewPost = () => {
  const [markdownText, setMarkdownText] = useState('');

  return (
    <div className="flex h-screen text-white">
      <div className="w-1/2 p-4 bg-gray-950">
        <textarea
          value={markdownText}
          onChange={(e) => setMarkdownText(e.target.value)}
          className="w-full h-full bg-gray-950 text-white p-2 border-none box-border"
          style={{ resize: 'none', outline: 'none' }}
        />
      </div>
      <div className="w-1/2  bg-black p-4 overflow-y-auto">
        <RenderMarkdown markdown={markdownText} />
      </div>
    </div>
  );
};

export default NewPost;
