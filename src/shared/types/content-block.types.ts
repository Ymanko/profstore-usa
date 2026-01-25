export interface ImageProps {
  url: string;
  altText?: string | null;
  width?: number | null;
  height?: number | null;
}

interface VideoMediaProps {
  url: string;
  mimeType: string;
}

type MediaProps = ImageProps | VideoMediaProps[];

export interface ContentBlockProps {
  title?: string | null;
  text?: string | null;
  media?: MediaProps | null;
  poster?: ImageProps | null;
  mediaPosition?: string | null;
  logos?: ImageProps[] | null;
  richTextClassName?: string;
}
