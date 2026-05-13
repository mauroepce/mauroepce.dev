import type { MDXComponents } from "mdx/types";
import type { ReactNode, HTMLAttributes, AnchorHTMLAttributes } from "react";

export const mdxComponents: MDXComponents = {
  h1: ({ children }: { children?: ReactNode }) => (
    <h1 className="font-serif text-4xl md:text-5xl text-foreground mt-16 mb-6 leading-tight">
      {children}
    </h1>
  ),
  h2: ({ children }: { children?: ReactNode }) => (
    <h2 className="font-serif italic text-3xl md:text-4xl text-foreground mt-14 mb-5 leading-tight">
      {children}
    </h2>
  ),
  h3: ({ children }: { children?: ReactNode }) => (
    <h3 className="font-serif text-2xl text-foreground/90 mt-10 mb-4 leading-snug">
      {children}
    </h3>
  ),
  h4: ({ children }: { children?: ReactNode }) => (
    <h4 className="text-xs font-mono tracking-[0.3em] text-[#C9A84C]/70 uppercase mt-8 mb-3">
      {children}
    </h4>
  ),
  p: ({ children }: { children?: ReactNode }) => (
    <p className="text-sm font-mono text-foreground/55 leading-loose my-5 max-w-2xl">
      {children}
    </p>
  ),
  a: ({ children, href }: AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a
      href={href}
      target={href?.startsWith("http") ? "_blank" : undefined}
      rel="noopener noreferrer"
      className="text-[#C9A84C]/80 underline decoration-[#C9A84C]/30 underline-offset-4 hover:decoration-[#C9A84C] transition-colors"
    >
      {children}
    </a>
  ),
  ul: ({ children }: { children?: ReactNode }) => (
    <ul className="my-5 space-y-2 max-w-2xl">{children}</ul>
  ),
  ol: ({ children }: { children?: ReactNode }) => (
    <ol className="my-5 space-y-2 max-w-2xl list-decimal list-inside marker:text-[#C9A84C]/40">
      {children}
    </ol>
  ),
  li: ({ children }: { children?: ReactNode }) => (
    <li className="text-sm font-mono text-foreground/55 leading-loose pl-5 relative before:content-['—'] before:absolute before:left-0 before:text-[#C9A84C]/40">
      {children}
    </li>
  ),
  blockquote: ({ children }: { children?: ReactNode }) => (
    <blockquote className="my-6 pl-6 border-l border-[#C9A84C]/30 text-foreground/65 italic font-serif text-lg max-w-2xl leading-relaxed">
      {children}
    </blockquote>
  ),
  code: ({ children, className }: HTMLAttributes<HTMLElement>) => {
    if (className?.startsWith("language-")) {
      return <code className={className}>{children}</code>;
    }
    return (
      <code className="font-mono text-[0.85em] bg-foreground/8 text-[#C9A84C]/85 px-1.5 py-0.5 rounded-sm border border-foreground/8">
        {children}
      </code>
    );
  },
  pre: ({ children }: { children?: ReactNode }) => (
    <pre className="my-6 p-5 bg-[#0a0a0a] border border-foreground/8 rounded-sm overflow-x-auto max-w-3xl text-xs font-mono text-foreground/65 leading-relaxed">
      {children}
    </pre>
  ),
  hr: () => <hr className="my-12 border-foreground/8" />,
  strong: ({ children }: { children?: ReactNode }) => (
    <strong className="font-medium text-foreground/85">{children}</strong>
  ),
  em: ({ children }: { children?: ReactNode }) => (
    <em className="italic text-foreground/75">{children}</em>
  ),
  img: ({ src, alt }: HTMLAttributes<HTMLImageElement> & { src?: string; alt?: string }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt ?? ""}
      className="my-8 border border-foreground/10 rounded-sm max-w-full"
    />
  ),
};
