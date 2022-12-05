import { createSlice, configureStore, PayloadAction } from "@reduxjs/toolkit";
import {  IDroneState } from "../models/drone";
import { IPilotDroneState,IPilotDroneDetails} from "../models/pilot"

export const droneSlice = createSlice({
  name: "counter",
  initialState: {},
  reducers: {
    saveDroneDetails: (
      state: IPilotDroneState,
      action: PayloadAction<IPilotDroneDetails[]>
    ) => {
      action.payload.forEach((e: IPilotDroneDetails) => {
        if (e.serialNumber in state) {
          state[e.serialNumber] = {
            //checking if old distance is smaller than new one
            name:e.name,
            email:e.email,
            phone:e.phone,
            distance:
              state[e.serialNumber].distance > e.distance
                ? e.distance
                : state[e.serialNumber].distance,
            timestamp: Date.now(),
          };
        } else {
          state[e.serialNumber] = {
            name:e.name,
            email:e.email,
            phone:e.phone,
            distance:e.distance,
            timestamp: Date.now(),
          };
        }
      });
    },
    cleanDroneDetails: (state: IDroneState) => {
      const key: string[] = [];
      Object.keys(state).forEach((k) => {
        const date = state[k].timestamp;
        const curDate = Date.now();
        console.log("cleanup");
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
  reducer: droneSlice.reducer,
});

export const { saveDroneDetails, cleanDroneDetails } = droneSlice.actions;
