export type InitialState = {
  moves: number[];
};

export function initialState(): InitialState {
  return {
    moves: [], // 0-8; in which square the player puts an x or an 0?; the even indexes are for P1
  };
}
