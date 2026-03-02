import { initialState } from "./initialState";
import type { InitialState } from "./initialState";

type Action = {
  actionType: string;
  cellIndex: number;
};

export function ticTacToeReducer(
  state: InitialState,
  { actionType, cellIndex }: Action,
) {
  switch (actionType) {
    case "ADD_MOVE": {
      return {
        ...state,
        moves: [...state.moves, cellIndex],
      };
    }
    case "RESTART": {
      return initialState();
    }
  }
}
