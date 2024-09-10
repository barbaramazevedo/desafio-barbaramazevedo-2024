const recintos = [
  {
    numero: 1,
    bioma: "savana",
    tamanhoTotal: 10,
    animaisExistentes: [{ especie: "MACACO", quantidade: 3, carnivoro: false }],
  },
  { numero: 2, bioma: "floresta", tamanhoTotal: 5, animaisExistentes: [] },
  {
    numero: 3,
    bioma: ["savana", "rio"],
    tamanhoTotal: 7,
    animaisExistentes: [{ especie: "GAZELA", quantidade: 1, carnivoro: false }],
  },
  { numero: 4, bioma: "rio", tamanhoTotal: 8, animaisExistentes: [] },
  {
    numero: 5,
    bioma: "savana",
    tamanhoTotal: 9,
    animaisExistentes: [{ especie: "LEAO", quantidade: 1, carnivoro: true }],
  },
];

export { recintos };
