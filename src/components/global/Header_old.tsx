'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Sparkles, Info, ShoppingBag, Search, Menu, X, Gem, Briefcase, Heart } from 'lucide-react'; 
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle, SheetClose } from '@/components/ui/sheet';
import { useState } from 'react';
import { useLikes } from '@/hooks/useLikes';

export function Header() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const { likedCount, isLoaded } = useLikes();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Redireciona para a página de produtos com query de pesquisa
      window.location.href = `/products?search=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  // Categorias e coleções para o menu lateral
  const menuCategories = [
    { name: 'Acessórios', href: '/products?category=acessorios', icon: Gem },
    { name: 'Bolsas', href: '/products?category=bolsas', icon: Briefcase },
    { name: 'Conjuntos', href: '/products?category=conjuntos', icon: Sparkles },
  ];

  const menuCollections = [
    { name: 'Novidades', href: '/products?filter=new' },
    { name: 'Promoções', href: '/products?filter=promotions' },
    { name: 'Mais Vendidos', href: '/products?filter=bestsellers' },
    { name: 'Vintage Collection', href: '/products?collection=vintage' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60 text-foreground shadow-md border-b border-border">
      <div className="container mx-auto px-4 py-4">
        {/* Layout desktop */}
        <div className="hidden md:flex items-center justify-between gap-4">
            {/* Menu Hamburger + Logo à esquerda */}
          <div className="flex items-center gap-4">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="hover:bg-primary/10">
                  <Menu size={20} />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80">
                <SheetHeader>
                  <SheetTitle className="flex items-center justify-center">
                    <Image
                      src="/logo_completa.svg"
                      alt="RÜGE"
                      width={120}
                      height={40}
                      className="h-8 w-auto"
                    />
                  </SheetTitle>
                </SheetHeader>
                
                <div className="mt-6 space-y-6">
                  {/* Navegação Principal */}
                  <div>
                    <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide mb-3">
                      Navegação
                    </h3>
                    <div className="space-y-2">
                      <SheetClose asChild>
                        <Link href="/products" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-accent transition-colors">
                          <ShoppingBag size={18} />
                          <span>Todos os Produtos</span>
                        </Link>
                      </SheetClose>
                      <SheetClose asChild>
                        <Link href="/liked-products" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-accent transition-colors relative">
                          <Heart size={18} className={likedCount > 0 ? "text-red-500" : ""} />
                          <span>Favoritos</span>
                          {isLoaded && likedCount > 0 && (
                            <span className="ml-auto bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                              {likedCount > 99 ? '99+' : likedCount}
                            </span>
                          )}
                        </Link>
                      </SheetClose>
                      <SheetClose asChild>
                        <Link href="/style-advisor" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-accent transition-colors">
                          <Sparkles size={18} />
                          <span>Consultoria de Imagem</span>
                        </Link>
                      </SheetClose>
                      <SheetClose asChild>
                        <Link href="/about" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-accent transition-colors">
                          <Info size={18} />
                          <span>Sobre Nós</span>
                        </Link>
                      </SheetClose>
                    </div>
                  </div>

                  {/* Categorias */}
                  <div>
                    <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide mb-3">
                      Categorias
                    </h3>
                    <div className="space-y-2">
                      {menuCategories.map((category) => {
                        const IconComponent = category.icon;
                        return (
                          <SheetClose key={category.name} asChild>
                            <Link href={category.href} className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-accent transition-colors">
                              <IconComponent size={18} />
                              <span>{category.name}</span>
                            </Link>
                          </SheetClose>
                        );
                      })}
                    </div>
                  </div>

                  {/* Coleções */}
                  <div>
                    <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide mb-3">
                      Coleções
                    </h3>
                    <div className="space-y-2">
                      {menuCollections.map((collection) => (
                        <SheetClose key={collection.name} asChild>
                          <Link href={collection.href} className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-accent transition-colors">
                            <div className="w-4 h-4 rounded-full bg-primary/20"></div>
                            <span>{collection.name}</span>
                          </Link>
                        </SheetClose>
                      ))}
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>

            <Link href="/" className="flex items-center hover:opacity-80 transition-opacity">
              <Image
                src="/logo.svg"
                alt="RÜGE"
                width={120}
                height={40}
                className="h-10 w-auto"
              />
            </Link>
          </div>
          
          {/* Barra de pesquisa centralizada */}
          <form onSubmit={handleSearch} className="flex-1 max-w-md mx-4">
            <div className="relative flex">
              <Input
                type="text"
                placeholder="Buscar produtos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pr-12 bg-background border-primary/20 focus:border-primary"
              />
              <Button 
                type="submit" 
                size="sm" 
                className="absolute right-1.5 top-1/2 transform -translate-y-1/2 px-3 bg-primary hover:bg-primary/90 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <Search size={16} />
              </Button>
            </div>
          </form>
            {/* Navegação rápida à direita */}
          <nav>
            <ul className="flex items-center space-x-6">
              <li>
                <Link href="/products" className="hover:text-primary transition-colors flex items-center space-x-1 whitespace-nowrap">
                  <ShoppingBag size={20} />
                  <span>Produtos</span>
                </Link>
              </li>
              <li>
                <Link href="/liked-products" className="hover:text-primary transition-colors flex items-center space-x-1 whitespace-nowrap relative">
                  <Heart size={20} className={likedCount > 0 ? "text-red-500" : ""} />
                  <span>Favoritos</span>
                  {isLoaded && likedCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                      {likedCount > 99 ? '99+' : likedCount}
                    </span>
                  )}
                </Link>
              </li>
              <li>
                <Link href="/style-advisor" className="hover:text-primary transition-colors flex items-center space-x-1 whitespace-nowrap">
                  <Sparkles size={20} /> 
                  <span>Consultoria</span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        {/* Layout mobile */}
        <div className="md:hidden space-y-4">
            {/* Primeira linha: Menu hamburger, Logo e busca */}
          <div className="flex items-center justify-between gap-3">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="hover:bg-primary/10">
                  <Menu size={20} />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80">
                <SheetHeader>
                  <SheetTitle className="flex items-center justify-center">
                    <Image
                      src="/logo_completa.svg"
                      alt="RÜGE"
                      width={120}
                      height={40}
                      className="h-8 w-auto"
                    />
                  </SheetTitle>
                </SheetHeader>
                
                <div className="mt-6 space-y-6">
                  {/* Navegação Principal */}
                  <div>
                    <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide mb-3">
                      Navegação
                    </h3>
                    <div className="space-y-2">
                      <SheetClose asChild>
                        <Link href="/products" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-accent transition-colors">
                          <ShoppingBag size={18} />
                          <span>Todos os Produtos</span>
                        </Link>
                      </SheetClose>
                      <SheetClose asChild>
                        <Link href="/liked-products" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-accent transition-colors relative">
                          <Heart size={18} className={likedCount > 0 ? "text-red-500" : ""} />
                          <span>Favoritos</span>
                          {isLoaded && likedCount > 0 && (
                            <span className="ml-auto bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                              {likedCount > 99 ? '99+' : likedCount}
                            </span>
                          )}
                        </Link>
                      </SheetClose>
                      <SheetClose asChild>
                        <Link href="/style-advisor" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-accent transition-colors">
                          <Sparkles size={18} />
                          <span>Consultoria de Imagem</span>
                        </Link>
                      </SheetClose>
                      <SheetClose asChild>
                        <Link href="/about" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-accent transition-colors">
                          <Info size={18} />
                          <span>Sobre Nós</span>
                        </Link>
                      </SheetClose>
                    </div>
                  </div>

                  {/* Categorias */}
                  <div>
                    <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide mb-3">
                      Categorias
                    </h3>
                    <div className="space-y-2">
                      {menuCategories.map((category) => {
                        const IconComponent = category.icon;
                        return (
                          <SheetClose key={category.name} asChild>
                            <Link href={category.href} className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-accent transition-colors">
                              <IconComponent size={18} />
                              <span>{category.name}</span>
                            </Link>
                          </SheetClose>
                        );
                      })}
                    </div>
                  </div>

                  {/* Coleções */}
                  <div>
                    <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide mb-3">
                      Coleções
                    </h3>
                    <div className="space-y-2">
                      {menuCollections.map((collection) => (
                        <SheetClose key={collection.name} asChild>
                          <Link href={collection.href} className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-accent transition-colors">
                            <div className="w-4 h-4 rounded-full bg-primary/20"></div>
                            <span>{collection.name}</span>
                          </Link>
                        </SheetClose>
                      ))}
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>            <Link href="/" className="flex items-center hover:opacity-80 transition-opacity">
              <Image
                src="/logo.svg"
                alt="RÜGE"
                width={100}
                height={32}
                className="h-8 w-auto"
              />
            </Link>
            
            {/* Ações do mobile: Favoritos e Busca */}
            <div className="flex items-center gap-2">
              {/* Botão de Favoritos no Mobile */}
              <Link href="/liked-products" className="relative">
                <Button variant="ghost" size="icon" className="hover:bg-primary/10">
                  <Heart size={20} className={likedCount > 0 ? "text-red-500" : ""} />
                  {isLoaded && likedCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center font-medium">
                      {likedCount > 9 ? '9+' : likedCount}
                    </span>
                  )}
                </Button>
              </Link>
              
              {/* Barra de pesquisa compacta no mobile */}
              <form onSubmit={handleSearch} className="relative">
                <div className="flex items-center">
                  {isSearchFocused ? (
                    <div className="flex items-center gap-2">
                      <Input
                        type="text"
                        placeholder="Buscar..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onBlur={() => !searchQuery && setIsSearchFocused(false)}
                        className="w-40 h-9 text-sm bg-background border-primary/20 focus:border-primary"
                        autoFocus
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => setIsSearchFocused(false)}
                        className="h-9 w-9"
                      >
                        <X size={16} />
                      </Button>
                    </div>
                  ) : (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => setIsSearchFocused(true)}
                      className="hover:bg-primary/10"
                    >
                      <Search size={20} />
                    </Button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
