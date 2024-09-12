import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import remarkGfm from 'remark-gfm';
import { SyntaxHighlighterProps } from 'react-syntax-highlighter';
import rehypeRaw from 'rehype-raw';

interface CodeProps extends React.HTMLProps<HTMLElement> {
  inline?: boolean;
  className?: string;
  children?: React.ReactNode;
}

interface MarkdownProps {
  markdown: string;
}

const RenderMarkdown = ({ markdown }: MarkdownProps) => {
  return (
    <>
      <ReactMarkdown
        className="px-10"
        children={markdown}
        remarkPlugins={[remarkGfm]} // github에서 제공, 테이블이, 링크, 체크리스트 등이 추가된 플러그인
        rehypePlugins={[rehypeRaw]} // <html 태그 사용할 수 있도록 하는 플러그인
        components={{
          code({ className, children, ...props }: CodeProps) {
            const match = /language-(\w+)/.exec(className || '');
            return match ? (
              <SyntaxHighlighter
                language={match[1]}
                PreTag="div"
                {...(props as SyntaxHighlighterProps)}
              >
                {String(children)
                  .replace(/\n$/, '')
                  .replace(/\n&nbsp;\n/g, '')
                  .replace(/\n&nbsp\n/g, '')}
              </SyntaxHighlighter>
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
          blockquote({ children, ...props }) {
            return (
              <div className="flex w-full mb-5">
                <div className="w-1 bg-slate-400 " />
                <blockquote
                  style={{
                    background: '#3d3d3d',
                    flexGrow: 1,
                  }}
                  {...props}
                >
                  {children}
                </blockquote>
              </div>
            );
          },
          em({ children, ...props }) {
            return (
              <span style={{ fontStyle: 'italic' }} {...props}>
                {children}
              </span>
            );
          },
          pre({ children, ...props }) {
            return (
              <pre style={{ background: '#3d3d3d' }} {...props}>
                {children}
              </pre>
            );
          },
        }}
      ></ReactMarkdown>
    </>
  );
};

export default RenderMarkdown;
