import { FileText } from 'lucide-react';

import { ProductWrapper } from '@/features/product/components/product-tools';
import { List } from '@/shared/components/common/list';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/components/ui/tabs';
import { Typography } from '@/shared/components/ui/typography';
import { cn } from '@/shared/lib/utils';

import type { ComponentProps } from 'react';

export interface ProductFile {
  handle: string;
  title: string;
  category: 'file' | 'manual';
  url: string;
  fileSize: number;
  mimeType: string;
}

interface ProductFilesProps extends ComponentProps<'div'> {
  files?: ProductFile[];
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function FileItem({ file }: { file: ProductFile }) {
  return (
    <a
      href={file.url}
      target='_blank'
      rel='noopener noreferrer'
      className='hover:bg-accent/50 flex items-center gap-3 rounded-lg border bg-white p-3 transition-colors duration-200'
    >
      <FileText className='text-primary h-8 w-8 shrink-0' />
      <div className='min-w-0 flex-1'>
        <Typography className='truncate font-medium'>{file.title}</Typography>
        <Typography className='text-muted-foreground text-sm'>{formatFileSize(file.fileSize)}</Typography>
      </div>
    </a>
  );
}

export function ProductFiles({ className, files = [], ...props }: ProductFilesProps) {
  const filesList = files.filter(f => f.category === 'file');
  const manualsList = files.filter(f => f.category === 'manual');

  if (files.length === 0) return null;

  return (
    <ProductWrapper className={cn('p-2.5', className)} {...props}>
      <Tabs defaultValue={filesList.length > 0 ? 'files' : 'manuals'}>
        <TabsList className='w-full gap-4.25 rounded-xl bg-white px-5 py-2.5 md:justify-start'>
          <TabsTrigger value='files' className='w-full md:max-w-45' disabled={filesList.length === 0}>
            Files ({filesList.length})
          </TabsTrigger>
          <TabsTrigger value='manuals' className='w-full md:max-w-45' disabled={manualsList.length === 0}>
            Manuals ({manualsList.length})
          </TabsTrigger>
        </TabsList>

        <div className='p-5'>
          <TabsContent value='files'>
            <List
              data={filesList}
              renderItem={file => <FileItem file={file} />}
              keyExtractor={file => file.handle}
              className='grid grid-cols-2 gap-3 md:grid-cols-2 xl:grid-cols-2'
            />
          </TabsContent>

          <TabsContent value='manuals'>
            <List
              data={manualsList}
              renderItem={file => <FileItem file={file} />}
              keyExtractor={file => file.handle}
              className='grid grid-cols-2 gap-3 md:grid-cols-2 xl:grid-cols-2'
            />
          </TabsContent>
        </div>
      </Tabs>
    </ProductWrapper>
  );
}
