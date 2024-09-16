// Article.tsx
"use client";

import { MDXRemote, MDXRemoteProps } from "next-mdx-remote";

export function Article(props: MDXRemoteProps) {
  return (
    <article className="prose min-w-full my-8">
      <MDXRemote {...props} />
    </article>
  );
}
