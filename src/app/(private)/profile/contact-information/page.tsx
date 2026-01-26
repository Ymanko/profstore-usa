import { ChangePasswordForm } from '@/features/profile/components/change-password-form';
import { ContactInfoForm } from '@/features/profile/components/contact-info-form';

export default function ContactInformationPage() {
  return (
    <div className='grid gap-10 lg:grid-cols-2'>
      <ContactInfoForm />
      <ChangePasswordForm />
    </div>
  );
}
