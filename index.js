const express = require("express");
const server = require("./src/app.js");
const { conn } = require("./src/db.js");
const { Game, Prize } = require("./src/db.js"); // Asegúrate de importar `Prize`

const createDefaultGames = async () => {
  try {
    const existingGame = await Game.findOne();

    if (!existingGame) {

      const prizesUsdt = await Prize.findAll();

      // Calcula la sumatoria del campo 'usdt' de todos los premios
      const totalUsdt = prizesUsdt.reduce((sum, prize) => sum + Number(prize.usdt), 0);

      const games = await Game.bulkCreate([
        {
          name: "IPHONE 14 PRO MAX",
          nft: 5000,
          image:
            "https://s3-alpha-sig.figma.com/img/9817/b2be/22af5934b9d8ff54c6037690b479df6d?Expires=1730678400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=KXEm58kt8NIjQlyJOV9XEomU~myApTBhCzNIdl-fdL5sm2aJJYUdB87QEg1wgGvkoXASJUCfQgRrTh6v7emyDOcP3Ya5paLIA-7TVp~iWmdgkHGBCBHVXpFwogGP3KFcJdJkQtWkTHoNtyw2HfYDNJdl1C2VBsLg0wf450a2VEw1UDzDVgwjNleFjs9NwW~S8tYR6QlysKNUKdjeJYPwNU3~rUz9JcaQO9-xfLSzcyg6XXh7t4YkoaedKku~9dQ9GCdsmEDuBZA9ByF-IMU5GGeCD7HchKUIxw-1Vaur5ySp~hkPewLk7yE5jiJ8qr5Ove6~TOZyKKYcmeaZn8sx0A__",
          usdt: totalUsdt,
          size: "MEDIUM",
        },
        {
          name: "TESLA MODEL S",
          nft: 1000,
          image:
            "https://s3-alpha-sig.figma.com/img/9446/f851/7f8242c71755fec0a2ce1687bfe5c52e?Expires=1730678400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=nNpolJTZm3Y~tOfwNOzruItRkNEeXnCBOCRK-SV0plNEjntvJ3nliR0u66HGaP-Gm50ZwVfEZqvGMaC2cfA6S-XMXOr-YgHEGUdxHfM7MARzPh~CPhOCWLpd4ABw9Nw7gUCTVV1DCWXdVrt5Xb~Hfub7qQksSEHIvdqGf8p7wopE87RFNOTmnKybqpezn3DAChpY2Pfp0T~OudLpjkmiVrgPNXDgIVNTtnSbYdoNuchG5issW4PMv55CIhpBx2ba8xI599UwDWEkyUXR-CvHmG8Yzz7rFEoRT-O~KcUK3XRT0rEZ~RP4eBqfEHDMJdskn8VIfXTcci3Yxw41VKtasA__",
          usdt: totalUsdt,
          size: "BIG",
        },
        {
          name: "MAC BOOK PRO",
          nft: 2000,
          image:
            "https://s3-alpha-sig.figma.com/img/ac13/92fc/6d8671ca2517bb88873d2cc76d94ed96?Expires=1730678400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=DfGV4IC2sVp8tMvO~PBZydWVxfz7NciG6begMfZD7oVIaf4zEDB4mN67JLxDgyL1qCAaWFdVZTwbDmd70orUzcdzQvfV~TWfJJHptB4QSKVyCKrwn033q5iOnqlKAsFXNlZUkaOEVeInP7Ft5K7s~Ahc3pslEiOlZUYr~XROzmmWCRnUcu-ssSryHdB8xaO1l1hTryq6mzYUb6bi3JFvfGNbi4Oq6lrbB8v5egQI0F6aMLc9Sq7ZZ-sj2eLnZsYcFsuHocq1xfYyZEoVUrkeOt4TPFQclciSCJimpFoa9u-h7aCbGzPgoI-v0NdclWqyhCyGRfoLifR4jK2QZD~HZg__",
          usdt: totalUsdt,
          size: "MEDIUM",
        },
        {
          name: "SAMSUNG S23 ULTRA",
          nft: 3000,
          image:
            "https://s3-alpha-sig.figma.com/img/30dd/b36b/477d39c46bb58bd7cf2b527fe696e621?Expires=1730678400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=UXPDfiyPAzLUHzilPfOb7jKoGeaiH3TCcn4-oZ3EKEepKotWem14qJVZEo2tMBzzPK0m-DKVXek7xTRYOYpq252IQpxyhqAQF2VL4QSORBSqBgAFHTlB6TbBYdxYde83xtQcwm7Ma61UsD-RCfoJKNavxeeSDQ3oQBAA~8cDQaPwwWxDBN9i18UnjctFuKftZD~MQMI6Zi6WkwSu5WBl9IqIS5MlVrXA-WWbc7GMDyjSdKIYLNSO43v2ef9RrNbpm5NkcTSmuYlDShTlANRv7GvmpZuwgsCF5iddXUZZVIkY96fu9LYc61X0boRwM-oz8UuoF-ilDvwsrJYYfbmBVw__",
          usdt: totalUsdt,
          size: "MEDIUM",
        },
      ]);

      // Obtén todos los premios creados en la base de datos
      const prizes = await Prize.findAll();

      // Asocia cada juego con todos los premios
      for (const game of games) {
        await game.addPrizes(prizes);
      }

      console.log(
        "Se han creado los juegos por defecto y asociados con todos los premios."
      );
    } else {
      console.log(
        "Ya existen juegos en la base de datos. No se crean juegos adicionales."
      );
    }
  } catch (error) {
    console.error("Error al crear los juegos por defecto:", error);
  }
};

const createDefaultPrizes = async () => {
  try {
    const existingPrize = await Prize.findOne();

    if (!existingPrize) {
      await Prize.bulkCreate([
        {
          name: "TESLA MODEL S",
          stock: "1",
          image:
            "https://s3-alpha-sig.figma.com/img/9446/f851/7f8242c71755fec0a2ce1687bfe5c52e?Expires=1731888000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Kgyrab8DVMKzJAM-yJsr-K4naCf5mqpmT3dZiSgiec8uSLDrHWmqUl2oEKnld0mvqvXjbwQHndjgczK8A7nTKoUhuo2jKvF8Td-dyPEVkhiJ7Cbv5RQ80MxShNhIwP67bva7S5phgCUxlSEpsFfGEILDQg-KDlB5kZt5vUbV33K5BOe2xMJ6b~J4icqmEwv-HuxpiVk9D9OB-X2xIlSnnPAxe4eRWI4cgrurEPEnCN~ERLsWEBH5jFhCGKfi~x5s0qDU0C5s5rfqSR6pGbASPEAe41xvPHSJSteDpRnlSzads8KpjlgA70iTq4dIbMhIl~4zzGpk0Oj6VuKLkjemZw__",
          usdt: "200.000",
        },
        {
          name: "IPHONE 14 PRO MAX",
          stock: "200",
          image:
            "https://s3-alpha-sig.figma.com/img/9817/b2be/22af5934b9d8ff54c6037690b479df6d?Expires=1730678400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=KXEm58kt8NIjQlyJOV9XEomU~myApTBhCzNIdl-fdL5sm2aJJYUdB87QEg1wgGvkoXASJUCfQgRrTh6v7emyDOcP3Ya5paLIA-7TVp~iWmdgkHGBCBHVXpFwogGP3KFcJdJkQtWkTHoNtyw2HfYDNJdl1C2VBsLg0wf450a2VEw1UDzDVgwjNleFjs9NwW~S8tYR6QlysKNUKdjeJYPwNU3~rUz9JcaQO9-xfLSzcyg6XXh7t4YkoaedKku~9dQ9GCdsmEDuBZA9ByF-IMU5GGeCD7HchKUIxw-1Vaur5ySp~hkPewLk7yE5jiJ8qr5Ove6~TOZyKKYcmeaZn8sx0A__",
          usdt: "5.000",
        },
        {
          name: "MAC BOOK PRO",
          stock: "300",
          image:
            "https://s3-alpha-sig.figma.com/img/ac13/92fc/6d8671ca2517bb88873d2cc76d94ed96?Expires=1730678400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=DfGV4IC2sVp8tMvO~PBZydWVxfz7NciG6begMfZD7oVIaf4zEDB4mN67JLxDgyL1qCAaWFdVZTwbDmd70orUzcdzQvfV~TWfJJHptB4QSKVyCKrwn033q5iOnqlKAsFXNlZUkaOEVeInP7Ft5K7s~Ahc3pslEiOlZUYr~XROzmmWCRnUcu-ssSryHdB8xaO1l1hTryq6mzYUb6bi3JFvfGNbi4Oq6lrbB8v5egQI0F6aMLc9Sq7ZZ-sj2eLnZsYcFsuHocq1xfYyZEoVUrkeOt4TPFQclciSCJimpFoa9u-h7aCbGzPgoI-v0NdclWqyhCyGRfoLifR4jK2QZD~HZg__",
          usdt: "1.500",
        },
        {
          name: "SAMSUNG S23 ULTRA",
          stock: "500",
          image:
            "https://s3-alpha-sig.figma.com/img/30dd/b36b/477d39c46bb58bd7cf2b527fe696e621?Expires=1730678400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=UXPDfiyPAzLUHzilPfOb7jKoGeaiH3TCcn4-oZ3EKEepKotWem14qJVZEo2tMBzzPK0m-DKVXek7xTRYOYpq252IQpxyhqAQF2VL4QSORBSqBgAFHTlB6TbBYdxYde83xtQcwm7Ma61UsD-RCfoJKNavxeeSDQ3oQBAA~8cDQaPwwWxDBN9i18UnjctFuKftZD~MQMI6Zi6WkwSu5WBl9IqIS5MlVrXA-WWbc7GMDyjSdKIYLNSO43v2ef9RrNbpm5NkcTSmuYlDShTlANRv7GvmpZuwgsCF5iddXUZZVIkY96fu9LYc61X0boRwM-oz8UuoF-ilDvwsrJYYfbmBVw__",
          usdt: "1.000",
        },
      ]);
      console.log("Se han creado los premios por defecto.");
    } else {
      console.log(
        "Ya existen premios en la base de datos. No se crean premios adicionales."
      );
    }
  } catch (error) {
    console.error("Error al crear los premios por defecto:", error);
  }
};

conn.sync({ force: true }).then(async () => {
  console.log("Base de datos sincronizada");

  await createDefaultPrizes(); // Primero, crea los premios
  await createDefaultGames(); // Luego, crea los juegos y asócialos con los premios

  server.listen(3001, () => {
    console.log("Servidor corriendo en el puerto 3001");
  });
});
