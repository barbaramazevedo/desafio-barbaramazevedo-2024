"use strict";

import { recintos } from "../src/recintos.js";
import { animais } from "../src/animais.js";

class RecintosZoo {
  constructor() {
    this.recintos = recintos;
    this.animais = animais;
  }

  analisaRecintos(animal, quantidade) {
    const especieAnimal = this.animais.find((a) => a.especie === animal);

    if (!especieAnimal) {
      return { erro: "Animal inválido" };
    }

    if (typeof quantidade !== "number" || quantidade <= 0) {
      return { erro: "Quantidade inválida" };
    }

    const recintosViaveis = this.recintos
      .filter((recinto) => {
        // 1. Verificar se o bioma do recinto é compatível com o animal
        const biomaAdequado = especieAnimal.bioma.some((b) =>
          recinto.bioma.includes(b)
        );
        if (!biomaAdequado) return false;

        // 2. Calcular o espaço ocupado no recinto pelos animais existentes
        let espacoOcupado = recinto.animaisExistentes.reduce(
          (total, existente) => {
            const especieAnimalExistente = this.animais.find(
              (a) => a.especie === existente.especie
            );
            return (
              total + especieAnimalExistente.tamanho * existente.quantidade
            );
          },
          0
        );

        // 3. Se houver mais de uma espécie no recinto, adicionar espaço extra ocupado
        const diferentesEspecies =
          recinto.animaisExistentes.length > 0 &&
          recinto.animaisExistentes[0].especie !== animal;
        if (diferentesEspecies) espacoOcupado += 1;

        const espacoTotal = recinto.tamanhoTotal;
        const espacoNecessario = especieAnimal.tamanho * quantidade;

        // Verificar se o espaço disponível é suficiente
        if (espacoOcupado + espacoNecessario > espacoTotal) return false;

        // 4. Verificar regras de convivência entre animais
        const hasCarnivoro = recinto.animaisExistentes.some((existente) => {
          const especieAnimalExistente = this.animais.find(
            (a) => a.especie === existente.especie
          );
          return especieAnimalExistente.carnivoro;
        });

        // Carnívoros só podem conviver com a própria espécie
        if (hasCarnivoro && !especieAnimal.carnivoro) {
          return false;
        }

        // Se o animal é carnívoro, só pode conviver com a própria espécie
        if (especieAnimal.carnivoro && recinto.animaisExistentes.length > 0) {
          const especieCarnivoroExistente = this.animais.find(
            (a) => a.especie === recinto.animaisExistentes[0].especie
          );
          if (especieCarnivoroExistente.especie !== especieAnimal.especie) {
            return false;
          }
        }

        // Regras para hipopótamo
        if (
          especieAnimal.especie === "HIPOPOTAMO" &&
          !recinto.bioma.includes("rio")
        )
          return false;

        // Regras para macacos (precisam de companhia)
        if (
          especieAnimal.especie === "MACACO" &&
          recinto.animaisExistentes.length === 0 &&
          quantidade < 2
        )
          return false;

        return true;
      })
      .map((recinto) => {
        let espacoOcupado = recinto.animaisExistentes.reduce(
          (total, existente) => {
            const especieAnimalExistente = this.animais.find(
              (a) => a.especie === existente.especie
            );
            return (
              total + especieAnimalExistente.tamanho * existente.quantidade
            );
          },
          0
        );

        // Adicionar espaço extra ocupado se houver mais de uma espécie
        const diferentesEspecies =
          recinto.animaisExistentes.length > 0 &&
          recinto.animaisExistentes[0].especie !== animal;
        if (diferentesEspecies) espacoOcupado += 1;

        const espacoLivre =
          recinto.tamanhoTotal -
          espacoOcupado -
          especieAnimal.tamanho * quantidade;
        return `Recinto ${recinto.numero} (espaço livre: ${espacoLivre} total: ${recinto.tamanhoTotal})`;
      });

    if (recintosViaveis.length === 0) {
      return { erro: "Não há recinto viável" };
    }

    return { recintosViaveis };
  }
}

export { RecintosZoo as RecintosZoo };
