export const getRandomSquare = () => {
    const randomIndex = Math.floor(Math.random() * 64);
    const row = Math.floor(randomIndex / 8);
    const col = randomIndex % 8;
    const id = `${String.fromCharCode(97 + col)}${8 - row}`;
    return id;
  };
