interface IDrone {
  squareDist: number;
  posX: number;
  posY: number;
  timestamp:number
}

interface IDroneResponse {
  positionX: number[];
  positionY: number[];
  serialNumber: string[];
}


interface IDroneState {
  [k: string]:IDrone;
}

interface IDronePayload {
  squareDist: number;
  posX: number;
  posY: number;
  timestamp:number;
  serialNumber:string;
}


export {IDrone,IDroneState,IDroneResponse,IDronePayload}
