const calculator = (answers) => {
  // 1. Valor base según tamaño del armario
  let carbon = 0;
  let water = 0;

  if (answers.wardrobeSize === "menos40") {
    carbon = 200;
    water = 200000;
  } else if (answers.wardrobeSize === "40-80") {
    carbon = 400;
    water = 400000;
  } else if (answers.wardrobeSize === "81-150") {
    carbon = 700;
    water = 700000;
  } else if (answers.wardrobeSize === "mas150") {
    carbon = 1000;
    water = 1000000;
  }

  // 2. Tipo de fibra predominante
  if (answers.fiberType === "algodon") {
    carbon *= 1.1;
    water *= 1.25;
  } else if (answers.fiberType === "sintetica") {
    carbon *= 1.2;
    water *= 0.8;
  } else if (answers.fiberType === "vaqueros") {
    carbon *= 1.3;
    water *= 1.4;
  } else if (answers.fiberType === "lana") {
    carbon *= 1.2;
    water *= 0.9;
  } else if (answers.fiberType === "organica") {
    carbon *= 0.85;
    water *= 0.85;
  }

  // 3. Frecuencia de compra anual
  if (answers.newClothesPerYear === "menos5") {
    carbon *= 0.8;
    water *= 0.8;
  } else if (answers.newClothesPerYear === "5-10") {
    carbon *= 0.9;
    water *= 0.9;
  } else if (answers.newClothesPerYear === "mas20") {
    carbon *= 1.2;
    water *= 1.2;
  }

  // 4. Segunda mano
  if (answers.secondHand === "frecuentemente") {
    carbon *= 0.85;
    water *= 0.85;
  } else if (answers.secondHand === "ocasionalmente") {
    carbon *= 0.95;
    water *= 0.95;
  } else if (answers.secondHand === "nunca") {
    carbon *= 1.1;
    water *= 1.1;
  }

  // 5. Tejidos sostenibles
  if (answers.sustainableFabrics === "siempre") {
    carbon *= 0.85;
    water *= 0.85;
  } else if (answers.sustainableFabrics === "aveces") {
    carbon *= 0.95;
    water *= 0.95;
  }

  // 6. Duración de las prendas
  if (answers.clothingDuration === "mas6") {
    carbon *= 0.8;
    water *= 0.8;
  } else if (answers.clothingDuration === "4-6") {
    carbon *= 0.9;
    water *= 0.9;
  } else if (answers.clothingDuration === "menos1") {
    carbon *= 1.2;
    water *= 1.2;
  }

  // 7.1 Frecuencia de lavado
  if (answers.washFrequency === "pocousos") {
    water *= 1.05;
  } else if (answers.washFrequency === "siempre") {
    water *= 1.1;
  }

  // 7.2 Temperatura de lavado
  if (answers.washTemp === "siempre") {
    carbon *= 0.9;
  } else if (answers.washTemp === "aveces") {
    carbon *= 0.95;
  }

  // 7.3 Uso de secadora
  if (answers.dryer === "ocasionalmente") {
    carbon *= 1.05;
  } else if (answers.dryer === "habitualmente") {
    carbon *= 1.1;
  }

  // 8. Destino de ropa que no usas
  if (answers.clothingDestination === "donar") {
    carbon *= 0.9;
    water *= 0.9;
  } else if (answers.clothingDestination === "basura") {
    carbon *= 1.1;
    water *= 1.1;
  }

  // 9. Reciclaje textil
  if (answers.recycling === "siempre") {
    carbon *= 0.95;
    water *= 0.95;
  } else if (answers.recycling === "nunca") {
    carbon *= 1.05;
    water *= 1.05;
  }

  // Convertir CO₂ a toneladas
  const carbonTonnes = parseFloat((carbon / 1000).toFixed(3));
  const waterLitres = Math.round(water);

  // Categoría según niveles del test
  let category;
  if (carbonTonnes < 0.4) {
    category = "bajo";
  } else if (carbonTonnes < 0.8) {
    category = "medio";
  } else if (carbonTonnes < 1.5) {
    category = "medio-alto";
  } else {
    category = "alto";
  }

  return {
    carbonTonnes,
    waterLitres,
    category,
  };
};

module.exports = calculator;
