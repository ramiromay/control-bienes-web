export const ID_SISTEMA = {
  ID_SIPAT: 1,
  ID_SIA: 2,
};

export const SISTEMAS = new Map([
  [ID_SISTEMA.ID_SIPAT, {
    path: "/patrimonio/menu"
  }],
  [ID_SISTEMA.ID_SIA, {
    path: "/almacen/menu"
  }],
]);
