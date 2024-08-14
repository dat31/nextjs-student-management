// Article.tsx
"use client";

import { MDXRemote, MDXRemoteProps } from "next-mdx-remote";

export function Article(props: MDXRemoteProps) {
  return (
    <article className="prose lg:prose-xl min-w-full">
      <MDXRemote {...props} />
    </article>
  );
}
