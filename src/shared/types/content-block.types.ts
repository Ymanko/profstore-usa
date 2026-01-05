interface PosterProps {
  url: string;
  altText?: string | null;
  width?: number | null;
  height?: number | null;
}

interface MediaImageProps {
  url: string;
  altText?: string | null;
  width?: number | null;
  height?: number | null;
}

interface VideoMediaProps {
  url: string;
  mimeType: string;
}

type MediaProps = MediaImageProps | VideoMediaProps[];

export interface ContentBlockProps {
  title?: string | null;
  text?: string | null;
  media?: MediaProps | null;
  poster?: PosterProps | null;
  mediaPosition?: string | null;
  richTextClassName?: string;
}
