export const SITE_CONFIG = {
  businessName: 'Núcleo Quantic',
  whatsappNumber: '5586998431378',
  infinitePayReceiver: '$nucleoquantic',
};

export function buildWhatsAppUrl(message: string) {
  return `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
