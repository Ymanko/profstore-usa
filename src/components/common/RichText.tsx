import React from 'react';

import { Typography } from '@/components/ui/Typography';

type RichTextNode = {
  type: string;
  children?: RichTextNode[];
  value?: string;
  level?: number;
  listType?: 'ordered' | 'unordered';
};

type RichTextRoot = {
  type: 'root';
  children: RichTextNode[];
};

function renderNode(node: RichTextNode, index: number): React.ReactNode {
  switch (node.type) {
    case 'text':
      return node.value;

    case 'paragraph':
      return (
        <Typography key={index} variant='body' className='mb-4'>
          {node.children?.map((child, i) => renderNode(child, i))}
        </Typography>
      );

    case 'heading':
      const headingVariant = `h${node.level}` as 'h1' | 'h2' | 'h3' | 'h4';
      return (
        <Typography key={index} variant={headingVariant} as={headingVariant} className='mb-4'>
          {node.children?.map((child, i) => renderNode(child, i))}
        </Typography>
      );

    case 'list':
      const ListTag = node.listType === 'ordered' ? 'ol' : 'ul';
      const listStyle = node.listType === 'ordered' ? 'list-decimal' : 'list-disc';

      return (
        <ListTag key={index} className={`mb-4 ml-6 ${listStyle} font-montserrat`}>
          {node.children?.map((child, i) => renderNode(child, i))}
        </ListTag>
      );

    case 'list-item':
      return (
        <li key={index} className='mb-2 font-montserrat'>
          {node.children?.map((child, i) => renderNode(child, i))}
        </li>
      );

    default:
      return node.children?.map((child, i) => renderNode(child, i));
  }
}

export function RichText({ content }: { content: string }) {
  try {
    const data: RichTextRoot = JSON.parse(content);
    return <div className='prose max-w-none'>{data.children?.map((child, i) => renderNode(child, i))}</div>;
  } catch (error) {
    console.error('Failed to parse rich text:', error);
    return <div>{content}</div>;
  }
}
