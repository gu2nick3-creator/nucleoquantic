import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2, ShoppingCart, ArrowRight } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

const CartPage = () => {
  const { items, updateQuantity, removeItem, totalPrice, totalItems } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4 text-center py-20">
            <ShoppingCart className="w-16 h-16 text-muted-foreground/30 mx-auto mb-6" />
            <h1 className="section-title mb-4">Carrinho Vazio</h1>
            <p className="text-muted-foreground mb-8">Você ainda não adicionou nenhum produto ao carrinho.</p>
            <Link to="/loja">
              <Button variant="gold" size="lg">Ir para a Loja</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <h1 className="section-title mb-8">Seu Carrinho</h1>
          </AnimatedSection>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <AnimatedSection key={item.id}>
                  <div className="bg-card border border-border rounded-xl p-6 flex items-center gap-4">
                    <div className="w-16 h-16 rounded-lg bg-secondary/50 flex items-center justify-center shrink-0">
                      <ShoppingCart className="w-6 h-6 text-accent/40" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-display font-bold text-foreground truncate">{item.name}</h3>
                      <p className="text-accent font-semibold">R$ {item.price.toFixed(2).replace(".", ",")}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-8 h-8 rounded-lg border border-border flex items-center justify-center hover:bg-secondary transition-colors">
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-8 text-center font-medium">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-8 h-8 rounded-lg border border-border flex items-center justify-center hover:bg-secondary transition-colors">
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    <button onClick={() => removeItem(item.id)} className="text-muted-foreground hover:text-destructive transition-colors p-2">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </AnimatedSection>
              ))}
            </div>

            <AnimatedSection delay={0.2}>
              <div className="bg-card border border-border rounded-xl p-6 sticky top-24">
                <h3 className="font-display text-lg font-bold mb-4">Resumo do Pedido</h3>
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Itens ({totalItems})</span>
                    <span className="font-medium">R$ {totalPrice.toFixed(2).replace(".", ",")}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Frete</span>
                    <span className="text-accent font-medium">A calcular</span>
                  </div>
                  <div className="border-t border-border pt-3 flex justify-between">
                    <span className="font-display font-bold">Total</span>
                    <span className="font-display font-bold text-xl text-primary">R$ {totalPrice.toFixed(2).replace(".", ",")}</span>
                  </div>
                </div>
                <Link to="/checkout">
                  <Button variant="gold" size="lg" className="w-full gap-2">
                    Finalizar Compra <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CartPage;
