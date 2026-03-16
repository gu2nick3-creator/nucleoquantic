import type { Order } from '@/lib/adminData';
import { SITE_CONFIG } from '@/lib/siteConfig';

export type CheckoutPayload = {
  customer: Order['customer'];
  items: Order['items'];
  total: number;
  receiver: string;
};

export type CheckoutResponse = {
  checkoutUrl: string;
  externalId?: string;
};

export async function createInfinitePayCheckout(payload: CheckoutPayload): Promise<CheckoutResponse> {
  const response = await fetch('/api/create-infinitepay-checkout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error('Não foi possível gerar o checkout da InfinitePay.');
  }

  return response.json() as Promise<CheckoutResponse>;
}

export function buildOrderMessage(order: Order) {
  const items = order.items
    .map((item) => `- ${item.name} x${item.quantity} = R$ ${(item.price * item.quantity).toFixed(2).replace('.', ',')}`)
    .join('\n');

  return [
    `Olá! Novo pedido no site ${SITE_CONFIG.businessName}.`,
    '',
    `Cliente: ${order.customer.name}`,
    `WhatsApp: ${order.customer.phone}`,
    `E-mail: ${order.customer.email}`,
    `Entrega: ${order.customer.address}, ${order.customer.city} - ${order.customer.state}, CEP ${order.customer.zip}`,
    '',
    'Itens:',
    items,
    '',
    `Total: R$ ${order.total.toFixed(2).replace('.', ',')}`,
    `Pagamento: InfinitePay (${SITE_CONFIG.infinitePayReceiver})`,
  ].join('\n');
}
