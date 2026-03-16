import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AnimatedSection from '@/components/AnimatedSection';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { ExternalLink, MessageCircle, ShieldCheck } from 'lucide-react';
import { toast } from 'sonner';
import { addOrder, type Order } from '@/lib/adminData';
import { buildOrderMessage, createInfinitePayCheckout } from '@/lib/checkout';
import { buildWhatsAppUrl, SITE_CONFIG } from '@/lib/siteConfig';

const CheckoutPage = () => {
  const { items, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [checkoutUrl, setCheckoutUrl] = useState('');
  const [whatsappUrl, setWhatsappUrl] = useState('');
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone || !form.address) {
      toast.error('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    const order: Order = {
      id: crypto.randomUUID(),
      customer: form,
      items,
      total: totalPrice,
      createdAt: new Date().toISOString(),
      status: 'pendente',
      paymentMethod: 'infinitepay',
    };

    setIsSubmitting(true);

    try {
      const checkout = await createInfinitePayCheckout({
        customer: form,
        items,
        total: totalPrice,
        receiver: SITE_CONFIG.infinitePayReceiver,
      });

      const orderWithCheckout: Order = {
        ...order,
        checkoutUrl: checkout.checkoutUrl,
      };

      addOrder(orderWithCheckout);
      const message = buildOrderMessage(orderWithCheckout);
      const nextWhatsappUrl = buildWhatsAppUrl(message);
      setWhatsappUrl(nextWhatsappUrl);
      setCheckoutUrl(checkout.checkoutUrl);
      clearCart();
      toast.success('Checkout da InfinitePay gerado com sucesso.');
    } catch {
      const pendingOrder: Order = {
        ...order,
      };
      addOrder(pendingOrder);
      const message = buildOrderMessage(pendingOrder);
      const nextWhatsappUrl = buildWhatsAppUrl(message);
      setWhatsappUrl(nextWhatsappUrl);
      toast.error('Não foi possível gerar o checkout automático agora. Use o WhatsApp para finalizar.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (checkoutUrl || whatsappUrl) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4 text-center py-20 max-w-2xl">
            <ShieldCheck className="w-20 h-20 text-accent mx-auto mb-6" />
            <h1 className="section-title mb-4">Pedido iniciado</h1>
            <p className="text-muted-foreground mb-8">
              Seus dados já foram enviados para o painel administrativo. Agora finalize pelo checkout da InfinitePay ou avise no WhatsApp do site.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {checkoutUrl && (
                <Button asChild variant="gold" size="lg" className="gap-2">
                  <a href={checkoutUrl} target="_blank" rel="noreferrer">
                    <ExternalLink className="w-5 h-5" />
                    Pagar com InfinitePay
                  </a>
                </Button>
              )}
              {whatsappUrl && (
                <Button asChild variant="outline" size="lg" className="gap-2">
                  <a href={whatsappUrl} target="_blank" rel="noreferrer">
                    <MessageCircle className="w-5 h-5" />
                    Avisar no WhatsApp
                  </a>
                </Button>
              )}
            </div>
            <div className="mt-8">
              <Button variant="ghost" onClick={() => navigate('/')}>
                Voltar ao início
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (items.length === 0) {
    navigate('/loja');
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <h1 className="section-title mb-2">Checkout</h1>
            <p className="text-muted-foreground mb-8">
              Finalização integrada com InfinitePay ({SITE_CONFIG.infinitePayReceiver}).
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-6">
              <AnimatedSection>
                <div className="bg-card border border-border rounded-xl p-6">
                  <h3 className="font-display text-lg font-bold mb-4">Dados Pessoais</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { name: 'name', label: 'Nome completo', type: 'text' },
                      { name: 'email', label: 'E-mail', type: 'email' },
                      { name: 'phone', label: 'WhatsApp', type: 'tel' },
                    ].map((field) => (
                      <div key={field.name} className={field.name === 'name' ? 'md:col-span-2' : ''}>
                        <label className="block text-sm font-medium text-foreground mb-1.5">
                          {field.label} *
                        </label>
                        <input
                          name={field.name}
                          type={field.type}
                          value={form[field.name as keyof typeof form]}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent/30"
                          required
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </AnimatedSection>

              <AnimatedSection delay={0.1}>
                <div className="bg-card border border-border rounded-xl p-6">
                  <h3 className="font-display text-lg font-bold mb-4">Endereço de Entrega</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-foreground mb-1.5">
                        Endereço *
                      </label>
                      <input
                        name="address"
                        value={form.address}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent/30"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1.5">Cidade</label>
                      <input
                        name="city"
                        value={form.city}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent/30"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1.5">Estado</label>
                      <input
                        name="state"
                        value={form.state}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent/30"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1.5">CEP</label>
                      <input
                        name="zip"
                        value={form.zip}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent/30"
                      />
                    </div>
                  </div>
                </div>
              </AnimatedSection>

              <AnimatedSection delay={0.2}>
                <Button variant="gold" size="lg" type="submit" className="w-full gap-2" disabled={isSubmitting}>
                  <ShieldCheck className="w-5 h-5" />
                  {isSubmitting ? 'Gerando checkout...' : 'Ir para InfinitePay'}
                </Button>
              </AnimatedSection>
            </form>

            <AnimatedSection delay={0.1}>
              <div className="bg-card border border-border rounded-xl p-6 sticky top-24">
                <h3 className="font-display text-lg font-bold mb-4">Resumo</h3>
                <div className="space-y-3 mb-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm gap-3">
                      <span className="text-muted-foreground">
                        {item.name} x{item.quantity}
                      </span>
                      <span className="font-medium">
                        R$ {(item.price * item.quantity).toFixed(2).replace('.', ',')}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-border pt-3 flex justify-between mb-4">
                  <span className="font-display font-bold">Total</span>
                  <span className="font-display font-bold text-xl text-primary">
                    R$ {totalPrice.toFixed(2).replace('.', ',')}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">
                  O pedido entra no painel como pendente e deve ser confirmado pelo checkout/webhook da InfinitePay no backend.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CheckoutPage;
