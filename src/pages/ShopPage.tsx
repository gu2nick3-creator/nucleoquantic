import { useMemo, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";
import { Button } from "@/components/ui/button";
import { Search, ShoppingCart } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useAdminStore } from "@/hooks/useAdminStore";

const ShopPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("Todos");
  const { addItem } = useCart();
  const { products } = useAdminStore();

  const categories = useMemo(
    () => ["Todos", ...Array.from(new Set(products.map((product) => product.category.trim()).filter(Boolean)))],
    [products],
  );

  const filtered = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === "Todos" || p.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <AnimatedSection className="text-center mb-12">
            <span className="text-accent font-semibold text-sm uppercase tracking-widest">Nossa Loja</span>
            <h1 className="section-title mt-3 mb-4">Produtos & Medicações</h1>
            <p className="section-subtitle mx-auto">
              Produtos selecionados pelo nosso especialista para seu bem-estar integral.
            </p>
          </AnimatedSection>

          <AnimatedSection className="mb-10">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="relative w-full md:w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Buscar produtos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-border bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent/30"
                />
              </div>
              <div className="flex gap-2 flex-wrap">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      activeCategory === cat
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((product, index) => (
              <AnimatedSection key={product.id} delay={index * 0.08}>
                <div className="bg-card border border-border rounded-2xl overflow-hidden card-hover group">
                  <div className="h-48 bg-secondary/50 flex items-center justify-center overflow-hidden">
                    {product.image ? (
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center">
                        <ShoppingCart className="w-8 h-8 text-accent/40" />
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between gap-4 mb-1">
                      <span className="text-xs text-accent font-medium">{product.category}</span>
                      <span className="text-xs text-muted-foreground">Estoque: {product.stock}</span>
                    </div>
                    <h3 className="font-display text-lg font-bold text-foreground mt-1 mb-2">{product.name}</h3>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{product.description}</p>
                    <div className="flex items-center justify-between gap-3">
                      <span className="font-display text-2xl font-bold text-primary">
                        R$ {product.price.toFixed(2).replace(".", ",")}
                      </span>
                      <Button
                        variant="gold"
                        size="sm"
                        disabled={product.stock <= 0}
                        onClick={() => addItem({ id: product.id, name: product.name, price: product.price, image: product.image })}
                      >
                        {product.stock <= 0 ? "Indisponível" : "Adicionar"}
                      </Button>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">Nenhum produto encontrado.</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ShopPage;
