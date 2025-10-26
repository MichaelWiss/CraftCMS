'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { checkout } from '@/lib/commerceClient';
import PageShell from '@/components/ui/PageShell';
import FormSection from '@/components/ui/FormSection';
import FormField from '@/components/ui/FormField';

export default function CheckoutPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address1: '',
    city: '',
    zipCode: '',
    countryCode: 'US',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const shippingAddress = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        address1: formData.address1,
        city: formData.city,
        zipCode: formData.zipCode,
        countryCode: formData.countryCode,
      };

      const response = await checkout({
        email: formData.email,
        shippingAddress,
        billingAddress: shippingAddress, // Same as shipping for simplicity
        gatewayId: 1, // Update with your actual gateway ID
      });

      if (response.success) {
        alert('Order completed successfully!');
        router.push('/');
      } else {
        alert('Error: ' + response.error);
      }
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Unable to complete checkout.';
      alert('Error: ' + message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <PageShell title="Checkout" headingLevel={1} variant="tight" sectionClassName="checkout-shell">
      <form onSubmit={handleSubmit} className="form-stack">
          <FormSection>
            <FormField
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </FormSection>

          <FormSection columns={2}>
            <FormField
              label="First Name"
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
            <FormField
              label="Last Name"
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </FormSection>

          <FormSection>
            <FormField
              label="Address"
              type="text"
              name="address1"
              value={formData.address1}
              onChange={handleChange}
              required
            />
          </FormSection>

          <FormSection columns={2}>
            <FormField
              label="City"
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
            />
            <FormField
              label="Zip Code"
              type="text"
              name="zipCode"
              value={formData.zipCode}
              onChange={handleChange}
              required
            />
          </FormSection>

        <button type="submit" disabled={loading} className="form-submit">
          {loading ? 'Processing...' : 'Complete Order'}
        </button>
      </form>
    </PageShell>
  );
}
