export interface Product {
  id: string;
  name: string;
  casca: string; // Tipo de casca específica
  ingredients: string[]; // Ingredientes & Composição: Morango fresco + Branquinho com Leite Ninho + Casca
  price: string;
  numericPrice: number;
  image: string;
  category: 'rubi' | 'chocolate' | 'combos';
  tag?: string;
}

export interface CustomerReview {
  id: string;
  name: string;
  role: string;
  stars: number;
  quote: string;
  fullReview?: string;
  flavor: string;
  date: string;
  orderType: 'Tele-entrega' | 'Retirada no Ateliê';
}

export const products: Product[] = [
  {
    id: '1',
    name: 'Morango do Amor Clássico Rubi',
    casca: 'Casca de caramelo cristal rubi',
    ingredients: [
      'Morango fresco selecionado',
      'Branquinho com Leite Ninho',
      'Casca de caramelo cristal rubi'
    ],
    price: 'R$ 16,00',
    numericPrice: 16.0,
    image: 'https://images.unsplash.com/photo-1582293041079-7814c2f12063?auto=format&fit=crop&q=80&w=800',
    category: 'rubi',
    tag: 'Mais Pedido'
  },
  {
    id: '2',
    name: 'Morango do Amor com Chocolate',
    casca: 'Casca de chocolate ao leite nobre',
    ingredients: [
      'Morango fresco selecionado',
      'Branquinho com Leite Ninho',
      'Casca de chocolate ao leite nobre'
    ],
    price: 'R$ 18,00',
    numericPrice: 18.0,
    image: 'https://images.unsplash.com/photo-1548858760-449e32a677ca?auto=format&fit=crop&q=80&w=800',
    category: 'chocolate',
    tag: 'Favorito'
  },
  {
    id: '3',
    name: 'Morango do Amor Leite Ninho & Branco',
    casca: 'Casca de chocolate branco nobre',
    ingredients: [
      'Morango fresco selecionado',
      'Branquinho com Leite Ninho',
      'Casca de chocolate branco nobre'
    ],
    price: 'R$ 20,00',
    numericPrice: 20.0,
    image: 'https://images.unsplash.com/photo-1481391319762-47dff72954d9?auto=format&fit=crop&q=80&w=800',
    category: 'chocolate',
    tag: 'Especial'
  },
  {
    id: '4',
    name: 'Morango do Amor Nutella & Avelã',
    casca: 'Casca de chocolate com Nutella & avelãs tostadas',
    ingredients: [
      'Morango fresco selecionado',
      'Branquinho com Leite Ninho',
      'Casca de chocolate com Nutella & avelãs tostadas'
    ],
    price: 'R$ 20,00',
    numericPrice: 20.0,
    image: 'https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?auto=format&fit=crop&q=80&w=800',
    category: 'chocolate',
    tag: 'Irresistível'
  },
  {
    id: '5',
    name: 'Morango do Amor com Pistache',
    casca: 'Casca de chocolate branco com pedacinhos de pistache',
    ingredients: [
      'Morango fresco selecionado',
      'Branquinho com Leite Ninho',
      'Casca de chocolate branco com pedacinhos de pistache'
    ],
    price: 'R$ 22,00',
    numericPrice: 22.0,
    image: 'https://images.unsplash.com/photo-1550254477-86f560c88722?auto=format&fit=crop&q=80&w=800',
    category: 'chocolate',
    tag: 'Gourmet'
  },
  {
    id: '6',
    name: 'Caixa Presente com 4 Morangos do Amor',
    casca: 'Cascas à sua escolha',
    ingredients: [
      '4 Morangos frescos graúdos',
      'Branquinho com Leite Ninho',
      'Cascas à sua escolha (Rubi, Chocolate, Branco, Nutella ou Pistache)',
      'Caixa rígida com visor transparente e laço de cetim'
    ],
    price: 'R$ 70,00',
    numericPrice: 70.0,
    image: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&q=80&w=800',
    category: 'combos',
    tag: 'Presente Perfeito'
  }
];

export const reviews: CustomerReview[] = [
  {
    id: 'r1',
    name: 'Mariana & Lucas',
    role: 'Casal Apaixonado',
    stars: 5,
    quote: 'O morango do amor clássico da Rosane foi a estrela da nossa comemoração! Casquinha perfeita, estalando na mordida e o morango super doce e fresco.',
    fullReview: 'Pedimos para comemorar nosso aniversário de namoro e superou qualquer expectativa! A casquinha vermelha estava brilhante como vidro e fez aquele estalo delicioso. O morango era gigante, maduro e sem nada azedo. Já viramos clientes fiéis da Rosane!',
    flavor: 'Morango do Amor Clássico Rubi',
    date: 'Esta semana',
    orderType: 'Tele-entrega'
  },
  {
    id: 'r2',
    name: 'Carolina Mendes',
    role: 'Cliente Fiel',
    stars: 5,
    quote: 'O Morango com Chocolate é simplesmente divino. O morango veio enorme, bem fresquinho e com uma cobertura deliciosa de chocolate de muita qualidade!',
    fullReview: 'Dá para notar o cuidado artesanal logo na primeira mordida. O morango estava bem doce e fresquinho, com uma camada generosa de chocolate muito gostoso. A entrega chegou super rápida!',
    flavor: 'Morango do Amor com Chocolate',
    date: 'Há 3 dias',
    orderType: 'Tele-entrega'
  },
  {
    id: 'r3',
    name: 'Gabriel Souza',
    role: 'Comprador Verificado',
    stars: 5,
    quote: 'Pedi a caixa presente com 4 morangos variados para presentear e fez o maior sucesso! O capricho na embalagem e o sabor são nota 10.',
    fullReview: 'Fui buscar no ateliê e o atendimento foi nota mil. A embalagem é de um bom gosto impressionante, com laço lindo e os 4 morangos pareciam verdadeiras joias. Minha namorada amou demais a surpresa!',
    flavor: 'Caixa Presente com 4 Morangos',
    date: 'Semana passada',
    orderType: 'Retirada no Ateliê'
  },
  {
    id: 'r4',
    name: 'Juliana Paiva',
    role: 'Cliente Encantada',
    stars: 5,
    quote: 'O de Pistache e o de Leite Ninho são uma loucura de tão gostosos! Crocantes por fora e super cremosos por dentro.',
    fullReview: 'Doces feitos com muito capricho! O de pistache é maravilhoso e o de ninho é docinho na medida certa. Dá para sentir que o morango é fresco de verdade.',
    flavor: 'Morango do Amor com Pistache',
    date: 'Há 5 dias',
    orderType: 'Tele-entrega'
  },
  {
    id: 'r5',
    name: 'Renata & Felipe',
    role: 'Clientes Habitual',
    stars: 5,
    quote: 'A melhor casquinha de morango do amor que já comemos na vida. Não gruda no dente, é fininha e crocante como deve ser.',
    fullReview: 'Toda sexta-feira pedimos nossos morangos da Rosane. O cuidado com a entrega e o ponto exato da calda é o grande diferencial. Não tem comparação na cidade toda!',
    flavor: 'Morango do Amor Clássico Rubi',
    date: 'Há 2 dias',
    orderType: 'Tele-entrega'
  }
];
