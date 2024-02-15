import { Product } from './product.model';

export const generateOneProduct = (): Product => {
  return {
    id: '1',
    title: 'product 1',
    price: 100,
    description: 'description 1',
    category: {
      id: 1,
      name: 'category 1',
    },
    images: [
      'https://img.uswitch.com/n36b8lzdmgnp/6flMYPMjJ0sZzNs16Fsqa/c525a3f838b0e62716631f003390506b/shutterstock_1736005427212121212.jpg?auto=format%2Ccompress&q=35&ixlib=react-9.5.1-beta.1',
      'https://i0.wp.com/imgs.hipertextual.com/wp-content/uploads/2020/02/hipertextual-samsung-galaxy-a51-2020945736.jpg?resize=800%2C600&quality=50&strip=all&ssl=1',
    ],
  };
};

export const generateManyProducts = (size: number = 10): Product[] => {
  const products: Product[] = [];
  for (let i = 0; i < size; i++) {
    products.push(generateOneProduct());
  }
  return products;
};
