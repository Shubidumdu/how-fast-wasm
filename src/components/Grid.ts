type CardGridState = {
  size: {
    row: number,
    col: number,
  },
}

export default class CardGrid extends HTMLElement {
  state: CardGridState = {
    size: {
      row: 10,
      col: 10,
    },
  }; 

  constructor(props: Partial<CardGridState>) {
    super();
    Object.assign(this.state, props);
  }
}
