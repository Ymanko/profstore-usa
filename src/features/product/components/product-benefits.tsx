import { List } from '@/shared/components/common/list';
import { Button } from '@/shared/components/ui/button';
import { Typography } from '@/shared/components/ui/typography';

export function ProductBenefits() {
  return (
    <>
      <div className='inline-grid justify-items-start gap-x-2 sm:inline-flex sm:items-center sm:justify-between'>
        <Typography className='text-lg font-light'>
          4 interest-free payments of <span className='font-bold'>$274.75</span>
        </Typography>

        <Button variant='link' className='text-secondary font-montserrat -ml-4 text-left text-lg md:ml-0'>
          Apply Now
        </Button>
      </div>

      <List
        data={[
          {
            title: 'FREE Delivery',
            description: 'when you spend over 40$ ex VAT',
          },
          {
            title: 'FREE Returns',
            description: '30 day money back guarantee',
          },
          {
            title: 'FREE 1 Hour Click',
            description: '& Collect check stock at your local store',
          },
          {
            title: 'PREMIUM',
            description: 'Delivery Options offered in checkout if available',
          },
        ]}
        renderItem={item => (
          <div className='flex items-center gap-1.25' key={item.title}>
            <Typography className='tracking-normal text-wrap md:text-lg'>
              <span className='font-bold'>{item.title} </span>
              {item.description}
            </Typography>
          </div>
        )}
        keyExtractor={(_, i) => i.toString()}
        className='space-y-4.5'
        itemClassName='list-disc ml-6'
      />
    </>
  );
}
