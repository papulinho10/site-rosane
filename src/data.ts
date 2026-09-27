export interface Product {
  id: string;
  name: string;
  casca: string; // Tipo de casca específica
  ingredients: string[]; // Ingredientes & Composição: Morango fresco + Branquinho com Leite Ninho + Casca
  price: string;
  numericPrice: number;
  image: string;
  category: 'cravejado' | 'tradicional' | 'chocolate';
  tag?: string;
  isFeatured?: boolean;
  isBestSeller?: boolean;
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
    name: 'Morango Cravejado Branco',
    casca: 'Casca de chocolate branco cravejada com pedaços',
    ingredients: [
      'Morango fresco selecionado',
      'Branquinho com Leite Ninho',
      'Casca de chocolate branco cravejada com pedaços'
    ],
    price: 'R$ 20,00',
    numericPrice: 20.0,
    image: 'https://i.postimg.cc/2yLDyHMb/07-morango-branco-com-pedacos.jpg',
    category: 'cravejado',
    tag: 'Mais Vendido • Destaque',
    isFeatured: true,
    isBestSeller: true
  },
  {
    id: '2',
    name: 'Morango Cravejado Preto',
    casca: 'Casca de chocolate preto cravejada com pedaços',
    ingredients: [
      'Morango fresco selecionado',
      'Branquinho com Leite Ninho',
      'Casca de chocolate preto cravejada com pedaços'
    ],
    price: 'R$ 20,00',
    numericPrice: 20.0,
    image: 'https://i.postimg.cc/T2KLnTXN/09-morango-chocolate-preto-com-pedacos.jpg',
    category: 'cravejado',
    tag: 'Mais Vendido • Destaque',
    isFeatured: true,
    isBestSeller: true
  },
  {
    id: '3',
    name: 'Morango do Amor',
    casca: 'Casca de caramelo cristal vermelho',
    ingredients: [
      'Morango fresco selecionado',
      'Branquinho com Leite Ninho',
      'Casca de caramelo cristal vermelho'
    ],
    price: 'R$ 16,00',
    numericPrice: 16.0,
    image: 'https://i.postimg.cc/WbSnt2m7/03-morango-do-amor-vermelho.jpg',
    category: 'tradicional',
    tag: 'Mais Vendido',
    isBestSeller: true
  },
  {
    id: '4',
    name: 'Morango Caramelizado',
    casca: 'Casca de caramelo dourado crocante',
    ingredients: [
      'Morango fresco selecionado',
      'Branquinho com Leite Ninho',
      'Casca de caramelo dourado crocante'
    ],
    price: 'R$ 16,00',
    numericPrice: 16.0,
    image: 'https://i.postimg.cc/T3FnWhK3/02-morango-caramelizado.jpg',
    category: 'tradicional',
    tag: 'Clássico'
  },
  {
    id: '5',
    name: 'Morango Chocolate',
    casca: 'Casca de chocolate ao leite',
    ingredients: [
      'Morango fresco selecionado',
      'Branquinho com Leite Ninho',
      'Casca de chocolate ao leite'
    ],
    price: 'R$ 18,00',
    numericPrice: 18.0,
    image: 'https://i.postimg.cc/bYVrvWDh/05-morango-chocolate-ao-leite.jpg',
    category: 'chocolate',
    tag: 'Favorito'
  },
  {
    id: '6',
    name: 'Morango Chocolate Branco',
    casca: 'Casca de chocolate branco',
    ingredients: [
      'Morango fresco selecionado',
      'Branquinho com Leite Ninho',
      'Casca de chocolate branco'
    ],
    price: 'R$ 18,00',
    numericPrice: 18.0,
    image: 'https://i.postimg.cc/vmyHjdjn/06-morango-chocolate-branco.jpg',
    category: 'chocolate',
    tag: 'Especial'
  },
  {
    id: '7',
    name: 'Morango Choc com Amendoim',
    casca: 'Casca de chocolate com amendoim',
    ingredients: [
      'Morango fresco selecionado',
      'Branquinho com Leite Ninho',
      'Casca de chocolate com amendoim'
    ],
    price: 'R$ 19,00',
    numericPrice: 19.0,
    image: 'https://i.postimg.cc/8z2rz3Yr/04-morango-chocolate-com-castanhas.jpg',
    category: 'chocolate',
    tag: 'Crocante'
  },
  {
    id: '8',
    name: 'Morango Choc Branco com Amendoim',
    casca: 'Casca de chocolate branco com amendoim',
    ingredients: [
      'Morango fresco selecionado',
      'Branquinho com Leite Ninho',
      'Casca de chocolate branco com amendoim'
    ],
    price: 'R$ 19,00',
    numericPrice: 19.0,
    image: 'https://i.postimg.cc/wxwym3PT/01-morango-chocolate-branco-com-castanhas.jpg',
    category: 'chocolate',
    tag: 'Irresistível'
  }
];

export const reviews: CustomerReview[] = [
  {
    id: 'r1',
    name: 'Mariana & Lucas',
    role: 'Casal Apaixonado',
    stars: 5,
    quote: 'O Morango Cravejado Branco e o Cravejado Preto foram as estrelas da nossa comemoração! O branquinho com Ninho por dentro e a casca cravejada são perfeitos.',
    fullReview: 'Pedimos para comemorar nosso aniversário de namoro e superou qualquer expectativa! Os morangos cravejados são enormes, super frescos, com uma camada maravilhosa de branquinho com Leite Ninho e a casca super crocante. Já viramos clientes fiéis da Rosane!',
    flavor: 'Morango Cravejado Branco',
    date: 'Esta semana',
    orderType: 'Tele-entrega'
  },
  {
    id: 'r2',
    name: 'Carolina Mendes',
    role: 'Cliente Fiel',
    stars: 5,
    quote: 'O Morango Cravejado Preto é simplesmente divino. O morango veio enorme, bem fresquinho, com branquinho de Leite Ninho e casca cravejada deliciosa!',
    fullReview: 'Dá para notar o cuidado artesanal logo na primeira mordida. O morango estava bem doce e fresquinho, envolvido no branquinho com Leite Ninho e aquela casca cravejada incrível. A entrega chegou super rápida!',
    flavor: 'Morango Cravejado Preto',
    date: 'Há 3 dias',
    orderType: 'Tele-entrega'
  },
  {
    id: 'r3',
    name: 'Gabriel Souza',
    role: 'Comprador Verificado',
    stars: 5,
    quote: 'Pedi o Morango do Amor e o Caramelizado para presentear e fez o maior sucesso! Casquinha fininha estalando na mordida e recheio cremoso.',
    fullReview: 'Fui buscar no ateliê e o atendimento foi nota mil. Os morangos pareciam verdadeiras joias, com a casca brilhante e crocante e o branquinho de Leite Ninho por dentro. Minha namorada amou demais!',
    flavor: 'Morango do Amor',
    date: 'Semana passada',
    orderType: 'Retirada no Ateliê'
  },
  {
    id: 'r4',
    name: 'Juliana Paiva',
    role: 'Cliente Encantada',
    stars: 5,
    quote: 'O Morango Choc com Amendoim e o Choc Branco com Amendoim são uma loucura de tão gostosos! Crocantes por fora e super cremosos por dentro.',
    fullReview: 'Doces feitos com muito capricho! A combinação do morango fresco com o branquinho de Leite Ninho e a casca com amendoim é perfeita. Dá para sentir que tudo é feito no dia.',
    flavor: 'Morango Choc com Amendoim',
    date: 'Há 5 dias',
    orderType: 'Tele-entrega'
  },
  {
    id: 'r5',
    name: 'Renata & Felipe',
    role: 'Clientes Habituais',
    stars: 5,
    quote: 'Os melhores morangos que já comemos na vida. Os Cravejados e o Morango Chocolate Branco são viciantes!',
    fullReview: 'Toda sexta-feira pedimos nossos morangos da Rosane. O cuidado com a entrega e a qualidade do branquinho com Leite Ninho e das cascas fazem toda a diferença. Não tem comparação!',
    flavor: 'Morango Chocolate Branco',
    date: 'Há 2 dias',
    orderType: 'Tele-entrega'
  }
];
