'use server';

export async function subscribeToNewsletter(formData: FormData) {
  const email = formData.get('email');
  const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
  const key = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN;
  const endpoint = `https://${domain}/api/2024-01/graphql.json`;

  if (!domain || !key) return { error: "Configuration error." };

  const mutation = `
    mutation customerCreate($input: CustomerCreateInput!) {
      customerCreate(input: $input) {
        customer { id }
        customerUserErrors { field message }
      }
    }
  `;

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': key,
      },
      body: JSON.stringify({
        query: mutation,
        variables: {
          input: {
            email,
            acceptsMarketing: true,
            // We provide a random password to satisfy the API requirement 
            // without bothering the user.
            password: Math.random().toString(36).slice(-10) + "Vellonex!",
          },
        },
      }),
    });

    const result = await response.json();

    if (result.errors) return { error: result.errors[0].message };

    const userErrors = result.data?.customerCreate?.customerUserErrors;
    if (userErrors && userErrors.length > 0) {
      // If user exists, Shopify returns an error. 
      // For a newsletter, we can treat "already taken" as a success or show a specific message.
      if (userErrors[0].message.includes("taken")) {
        return { error: "You are already subscribed." };
      }
      return { error: userErrors[0].message };
    }

    return { success: true };
  } catch (e) {
    return { error: 'Connection failed.' };
  }
}