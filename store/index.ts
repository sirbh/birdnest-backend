import { distance } from "../utils";
import { createSlice, configureStore, PayloadAction } from "@reduxjs/toolkit";
import { IDrone, IDroneState, IDronePayload } from "../models/drone";

export const counterSlice = createSlice({
  name: "counter",
  initialState: {},
  reducers: {
    incremented: (
      state: IDroneState,
      action: PayloadAction<IDronePayload[]>
    ) => {
      action.payload.forEach((e: IDronePayload) => {
        if (e.serialNumber in state) {
          state[e.serialNumber] = {
            //checking if old distance is smaller than new one
            squareDist:
              state[e.serialNumber].squareDist > distance(e.posX, e.posY)
                ? distance(e.posX, e.posY)
                : state[e.serialNumber].squareDist,
            timestamp: Date.now(),
            posX: e.posX,
            posY: e.posY,
          };
        } else {
          state[e.serialNumber] = {
            squareDist: distance(e.posX, e.posY),
            timestamp: Date.now(),
            posX: e.posX,
            posY: e.posY,
          };
        }
      });
    },
    decremented: (state: IDroneState) => {
      const key: string[] = [];
      Object.keys(state).forEach((k) => {
        const date = state[k].timestamp;
        const curDate = Date.now();
        console.log("I ran");
        const diff = curDate - date;
        const min = Math.round(((diff % 86400000) % 3600000) / 60000);
        if (min >= 10) {
          delete state[k];
        }
      });
    },
  },
});

export const store = configureStore({
  reducer: counterSlice.reducer,
});

export const { incremented, decremented } = counterSlice.actions;
