export class Person {
  constructor(
    public name: string,
    public lastName: string,
    public age: number,
    public weigth: number,
    public heigth: number
  ) {}

  calcIMC(): string {
    const result = Math.round(this.weigth / Math.pow(this.heigth, 2));
    // 0 - 18 = down
    // 19 - 24 = normal
    // 25 - 26 = overweigth
    // 27 - 29 = overweigth level 1
    // 30 - 39 = overweigth level 2
    // 40 = overweigth level 3

    switch (true) {
      case result < 0:
        return 'not found';

      case result >= 0 && result < 19:
        return 'down';

      case result >= 19 && result < 25:
        return 'normal';

      case result >= 25 && result < 27:
        return 'overweigth';

      case result >= 27 && result < 30:
        return 'overweigth level 1';

      case result >= 30 && result < 40:
        return 'overweigth level 2';

      case result >= 40:
        return 'overweigth level 3';

      default:
        return 'not found';
    }
  }
}
