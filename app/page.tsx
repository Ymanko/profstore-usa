import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ProfStore – Professional Equipment',
  description: 'ProfStore is your trusted source for restaurant and kitchen equipment in the USA.',
};

export default function HomePage() {
  return (
    <section className="p-6 text-center">
      <h1 className="text-4xl font-bold mb-4">Welcome to ProfStore</h1>
      <p className="text-lg text-neutral-700 max-w-xl mx-auto">
        Your trusted supplier of professional kitchen equipment in the USA.
      </p>
    </section>
  );
}
