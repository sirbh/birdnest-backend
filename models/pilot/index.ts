interface IPilotContactDetails {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
}

interface IPilotDroneDetails {
  name: string;
  phone: string;
  email: string;
  distance: number;
  serialNumber: string;
}

interface IPilotDroneState {
  [k: string]: {
    name: string;
    phone: string;
    email: string;
    distance: number;
    timestamp:number
  };
}

export { IPilotContactDetails, IPilotDroneDetails, IPilotDroneState };
