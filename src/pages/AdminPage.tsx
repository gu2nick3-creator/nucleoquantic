import { useMemo, useRef, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AnimatedSection from '@/components/AnimatedSection';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Trash2, Pencil, Package, ShoppingBag, Image as ImageIcon, LockKeyhole, Upload } from 'lucide-react';
import { useAdminStore } from '@/hooks/useAdminStore';
import type { Product } from '@/lib/adminData';
import { toast } from 'sonner';
import { fileToDataUrl } from '@/lib/fileUtils';

const ADMIN_USER = 'nucleo quantic';
const ADMIN_PASSWORD = 'adm123@';

type AdminTab = 'produtos' | 'pedidos' | 'imagens' | 'cadastro';

const emptyProduct: Product = {
  id: '',
  name: '',
  price: 0,
  category: '',
  image: '',
  description: '',
  stock: 0,
};

const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <label className="block space-y-2 text-sm">
    <span className="text-muted-foreground">{label}</span>
    {children}
  </label>
);

const inputClass =
  'w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent/30';

const imageFields = [
  { key: 'heroBackground', label: 'Imagem de fundo do hero' },
  { key: 'profileImage', label: 'Imagem do Fernando / profissional' },
  { key: 'clinicImage', label: 'Imagem da clínica / sobre' },
] as const;

const AdminPage = () => {
  const { products, orders, siteImages, setProducts, setSiteImages } = useAdminStore();
  const [isLogged, setIsLogged] = useState(false);
  const [activeTab, setActiveTab] = useState<AdminTab>('produtos');
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [productForm, setProductForm] = useState<Product>(emptyProduct);
  const [editingId, setEditingId] = useState<string | null>(null);
  const productImageInputRef = useRef<HTMLInputElement | null>(null);

  const totalSales = useMemo(() => orders.reduce((sum, order) => sum + order.total, 0), [orders]);

  const resetForm = () => {
    setProductForm(emptyProduct);
    setEditingId(null);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      credentials.username.trim().toLowerCase() === ADMIN_USER &&
      credentials.password === ADMIN_PASSWORD
    ) {
      setIsLogged(true);
      toast.success('Login realizado com sucesso.');
      return;
    }
    toast.error('Usuário ou senha inválidos.');
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!productForm.name || !productForm.category || !productForm.description) {
      toast.error('Preencha nome, categoria e descrição do produto.');
      return;
    }

    const payload: Product = {
      ...productForm,
      id: editingId ?? crypto.randomUUID(),
      price: Number(productForm.price),
      stock: Number(productForm.stock),
    };

    if (editingId) {
      setProducts(products.map((item) => (item.id === editingId ? payload : item)));
      toast.success('Produto atualizado com sucesso.');
    } else {
      setProducts([payload, ...products]);
      toast.success('Produto adicionado com sucesso.');
    }

    resetForm();
  };

  const handleEdit = (product: Product) => {
    setEditingId(product.id);
    setProductForm({ ...product });
    setActiveTab('cadastro');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = (id: string) => {
    setProducts(products.filter((item) => item.id !== id));
    if (editingId === id) resetForm();
    toast.success('Produto removido.');
  };

  const handleProductImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const imageData = await fileToDataUrl(file);
      setProductForm((prev) => ({ ...prev, image: imageData }));
      toast.success('Imagem do produto carregada.');
    } catch {
      toast.error('Não foi possível carregar a imagem do produto.');
    } finally {
      event.target.value = '';
    }
  };

  const handleSiteImageUpload = async (
    key: keyof typeof siteImages,
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const imageData = await fileToDataUrl(file);
      setSiteImages({ ...siteImages, [key]: imageData });
      toast.success('Imagem do site atualizada.');
    } catch {
      toast.error('Não foi possível carregar a imagem.');
    } finally {
      event.target.value = '';
    }
  };

  if (!isLogged) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4 max-w-md">
            <AnimatedSection>
              <div className="bg-card border border-border rounded-2xl p-8 shadow-sm">
                <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center mb-5 mx-auto">
                  <LockKeyhole className="w-7 h-7 text-accent" />
                </div>
                <h1 className="text-3xl font-display font-bold text-center mb-2">Login do painel ADM</h1>
                <p className="text-muted-foreground text-center mb-8">
                  Acesse o painel administrativo da loja e do site.
                </p>
                <form onSubmit={handleLogin} className="space-y-5">
                  <Field label="Usuário">
                    <input
                      className={inputClass}
                      value={credentials.username}
                      onChange={(e) =>
                        setCredentials((prev) => ({ ...prev, username: e.target.value }))
                      }
                      placeholder="Digite o usuário"
                    />
                  </Field>
                  <Field label="Senha">
                    <input
                      type="password"
                      className={inputClass}
                      value={credentials.password}
                      onChange={(e) =>
                        setCredentials((prev) => ({ ...prev, password: e.target.value }))
                      }
                      placeholder="Digite a senha"
                    />
                  </Field>
                  <Button type="submit" variant="gold" className="w-full">
                    Entrar no painel
                  </Button>
                </form>
              </div>
            </AnimatedSection>
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
          <AnimatedSection className="mb-8">
            <span className="text-accent font-semibold text-sm uppercase tracking-widest">
              Painel Administrativo
            </span>
            <h1 className="section-title mt-3 mb-4">Gestão completa do site</h1>
            <div className="flex flex-wrap gap-3">
              <Badge variant="secondary">{products.length} produtos</Badge>
              <Badge variant="secondary">{orders.length} pedidos</Badge>
              <Badge variant="secondary">
                R$ {totalSales.toFixed(2).replace('.', ',')} em vendas
              </Badge>
            </div>
          </AnimatedSection>

          <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as AdminTab)} className="space-y-6">
            <TabsList className="h-auto flex-wrap justify-start gap-2 bg-transparent p-0">
              <TabsTrigger value="produtos">Produtos</TabsTrigger>
              <TabsTrigger value="pedidos">Pedidos</TabsTrigger>
              <TabsTrigger value="imagens">Imagens</TabsTrigger>
              <TabsTrigger value="cadastro">Cadastro</TabsTrigger>
            </TabsList>

            <TabsContent value="produtos">
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {products.map((product) => (
                  <div key={product.id} className="bg-card border border-border rounded-2xl overflow-hidden">
                    <div className="h-44 bg-secondary/50 flex items-center justify-center overflow-hidden">
                      {product.image ? (
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                      ) : (
                        <Package className="w-10 h-10 text-accent/40" />
                      )}
                    </div>
                    <div className="p-5 space-y-3">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-xs text-accent font-semibold uppercase tracking-widest">
                            {product.category}
                          </p>
                          <h3 className="font-display text-lg font-bold">{product.name}</h3>
                        </div>
                        <Badge>{product.stock} un.</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{product.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xl font-display font-bold text-primary">
                          R$ {product.price.toFixed(2).replace('.', ',')}
                        </span>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" onClick={() => handleEdit(product)}>
                            <Pencil className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => handleDelete(product.id)}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="pedidos">
              <div className="space-y-5">
                {orders.length === 0 ? (
                  <div className="bg-card border border-border rounded-2xl p-8 text-center text-muted-foreground">
                    Nenhum pedido realizado ainda.
                  </div>
                ) : (
                  orders.map((order) => (
                    <div key={order.id} className="bg-card border border-border rounded-2xl p-6">
                      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-5">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <ShoppingBag className="w-4 h-4 text-accent" />
                            <h3 className="font-display text-xl font-bold">
                              Pedido #{order.id.slice(0, 8)}
                            </h3>
                            {order.status && (
                              <Badge variant="secondary" className="capitalize">
                                {order.status}
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {new Date(order.createdAt).toLocaleString('pt-BR')}
                          </p>
                          <div className="mt-4 space-y-1 text-sm">
                            <p>
                              <strong>Cliente:</strong> {order.customer.name}
                            </p>
                            <p>
                              <strong>E-mail:</strong> {order.customer.email}
                            </p>
                            <p>
                              <strong>WhatsApp:</strong> {order.customer.phone}
                            </p>
                            <p>
                              <strong>Endereço:</strong> {order.customer.address}, {order.customer.city} -{' '}
                              {order.customer.state} / {order.customer.zip}
                            </p>
                            {order.paymentMethod && (
                              <p>
                                <strong>Pagamento:</strong> {order.paymentMethod}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="min-w-[280px]">
                          <p className="font-semibold mb-3">Produtos comprados</p>
                          <div className="space-y-2">
                            {order.items.map((item) => (
                              <div
                                key={`${order.id}-${item.id}`}
                                className="flex items-center justify-between text-sm gap-3"
                              >
                                <span className="text-muted-foreground">
                                  {item.name} x{item.quantity}
                                </span>
                                <span>
                                  R$ {(item.price * item.quantity).toFixed(2).replace('.', ',')}
                                </span>
                              </div>
                            ))}
                          </div>
                          <div className="border-t border-border mt-4 pt-4 flex items-center justify-between">
                            <span className="font-semibold">Total</span>
                            <span className="font-display text-xl font-bold text-primary">
                              R$ {order.total.toFixed(2).replace('.', ',')}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </TabsContent>

            <TabsContent value="imagens">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {imageFields.map((field) => (
                  <div key={field.key} className="bg-card border border-border rounded-2xl p-6 space-y-4">
                    <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                      <ImageIcon className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-display text-lg font-bold">{field.label}</h3>
                      <p className="text-sm text-muted-foreground">Envie um arquivo para atualizar a imagem.</p>
                    </div>
                    <label className="border border-dashed border-border rounded-xl p-4 flex items-center justify-center gap-2 cursor-pointer hover:border-accent transition-colors text-sm">
                      <Upload className="w-4 h-4" />
                      Selecionar arquivo
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleSiteImageUpload(field.key, e)}
                      />
                    </label>
                    <div className="aspect-[4/3] rounded-xl bg-secondary/50 overflow-hidden flex items-center justify-center">
                      {siteImages[field.key] ? (
                        <img src={siteImages[field.key]} alt={field.label} className="w-full h-full object-cover" />
                      ) : (
                        <ImageIcon className="w-8 h-8 text-accent/40" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="cadastro">
              <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-6">
                <form onSubmit={handleSaveProduct} className="bg-card border border-border rounded-2xl p-6 space-y-5">
                  <div>
                    <h3 className="font-display text-xl font-bold">
                      {editingId ? 'Editar produto' : 'Adicionar produto'}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Cadastre ou atualize nome, preço, estoque, imagem e descrição.
                    </p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Field label="Nome do produto">
                      <input
                        className={inputClass}
                        value={productForm.name}
                        onChange={(e) => setProductForm((prev) => ({ ...prev, name: e.target.value }))}
                      />
                    </Field>
                    <Field label="Categoria">
                      <input
                        className={inputClass}
                        value={productForm.category}
                        onChange={(e) => setProductForm((prev) => ({ ...prev, category: e.target.value }))}
                      />
                    </Field>
                    <Field label="Preço">
                      <input
                        type="number"
                        step="0.01"
                        className={inputClass}
                        value={productForm.price}
                        onChange={(e) =>
                          setProductForm((prev) => ({ ...prev, price: Number(e.target.value) }))
                        }
                      />
                    </Field>
                    <Field label="Quantidade em estoque">
                      <input
                        type="number"
                        className={inputClass}
                        value={productForm.stock}
                        onChange={(e) =>
                          setProductForm((prev) => ({ ...prev, stock: Number(e.target.value) }))
                        }
                      />
                    </Field>
                    <div className="md:col-span-2 space-y-3">
                      <Field label="Imagem do produto">
                        <div className="space-y-3">
                          <input ref={productImageInputRef} type="file" accept="image/*" className="hidden" onChange={handleProductImageUpload} />
                          <Button type="button" variant="outline" onClick={() => productImageInputRef.current?.click()} className="gap-2">
                            <Upload className="w-4 h-4" />
                            Enviar arquivo
                          </Button>
                          {productForm.image && (
                            <div className="aspect-[4/3] rounded-xl bg-secondary/50 overflow-hidden max-w-xs">
                              <img src={productForm.image} alt="Prévia do produto" className="w-full h-full object-cover" />
                            </div>
                          )}
                        </div>
                      </Field>
                    </div>
                    <div className="md:col-span-2">
                      <Field label="Descrição">
                        <textarea
                          className={`${inputClass} min-h-32`}
                          value={productForm.description}
                          onChange={(e) =>
                            setProductForm((prev) => ({ ...prev, description: e.target.value }))
                          }
                        />
                      </Field>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <Button type="submit" variant="gold">
                      {editingId ? 'Salvar alterações' : 'Adicionar produto'}
                    </Button>
                    <Button type="button" variant="outline" onClick={resetForm}>
                      Limpar
                    </Button>
                  </div>
                </form>

                <div className="bg-card border border-border rounded-2xl p-6">
                  <h3 className="font-display text-xl font-bold mb-4">Produtos cadastrados</h3>
                  <div className="space-y-3 max-h-[620px] overflow-auto pr-2">
                    {products.map((product) => (
                      <div
                        key={product.id}
                        className="rounded-xl border border-border p-4 flex items-center justify-between gap-4"
                      >
                        <div>
                          <p className="font-semibold">{product.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {product.category} • {product.stock} un. • R$ {product.price.toFixed(2).replace('.', ',')}
                          </p>
                        </div>
                        <div className="flex gap-2 shrink-0">
                          <Button size="sm" variant="outline" onClick={() => handleEdit(product)}>
                            Editar
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => handleDelete(product.id)}>
                            Retirar
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AdminPage;
