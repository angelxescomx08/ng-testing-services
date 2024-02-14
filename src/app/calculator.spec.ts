import { Calculator } from './calculator';

describe('Test for Calculator', () => {
  it('Calculator should return 9 if it multiples 3*3', () => {
    //AAA
    //Arrange preparar lo que se necesita para las pruebas
    const calculator = new Calculator();
    //Act ejecutar lo que se quiere testear
    const result = calculator.multiply(3, 3);
    //Assert evaluar si el resultado es correcto
    expect(result).toEqual(3 * 3);
  });
});
