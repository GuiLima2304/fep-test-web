export interface ResponseClientGetAll {
  id: number;
  externCode: string;
  name: string;
  cpf: string;
  cellphone: string;
  signDigital: boolean;
}

export interface RequestClientCreate {
  externCode: string;
  name: string;
  email: string;
  cpf: string;
  indCpf: boolean;
  sex: number;
  maritalStatus: number;
  birthDate: string;
  cellphone: string;
  identification: string;
  signDigital: boolean;
}
