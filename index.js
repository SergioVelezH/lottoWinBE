const express = require("express");
const server = require("./src/app.js");
const { conn } = require("./src/db.js");
const { Game } = require("./src/db.js");

const createDefaultGames = async () => {
  try {
    const existingGame = await Game.findOne();

    if (!existingGame) {
      await Game.bulkCreate([
        {
          name: "IPHONE 14 PRO MAX",
          nft: "3",
          image:
            "https://s3-alpha-sig.figma.com/img/9817/b2be/22af5934b9d8ff54c6037690b479df6d?Expires=1730678400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=KXEm58kt8NIjQlyJOV9XEomU~myApTBhCzNIdl-fdL5sm2aJJYUdB87QEg1wgGvkoXASJUCfQgRrTh6v7emyDOcP3Ya5paLIA-7TVp~iWmdgkHGBCBHVXpFwogGP3KFcJdJkQtWkTHoNtyw2HfYDNJdl1C2VBsLg0wf450a2VEw1UDzDVgwjNleFjs9NwW~S8tYR6QlysKNUKdjeJYPwNU3~rUz9JcaQO9-xfLSzcyg6XXh7t4YkoaedKku~9dQ9GCdsmEDuBZA9ByF-IMU5GGeCD7HchKUIxw-1Vaur5ySp~hkPewLk7yE5jiJ8qr5Ove6~TOZyKKYcmeaZn8sx0A__",
          usdt: "1400",
        },
        {
          name: "TESLA MODEL S",
          nft: "1",
          image:
            "https://s3-alpha-sig.figma.com/img/9446/f851/7f8242c71755fec0a2ce1687bfe5c52e?Expires=1730678400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=nNpolJTZm3Y~tOfwNOzruItRkNEeXnCBOCRK-SV0plNEjntvJ3nliR0u66HGaP-Gm50ZwVfEZqvGMaC2cfA6S-XMXOr-YgHEGUdxHfM7MARzPh~CPhOCWLpd4ABw9Nw7gUCTVV1DCWXdVrt5Xb~Hfub7qQksSEHIvdqGf8p7wopE87RFNOTmnKybqpezn3DAChpY2Pfp0T~OudLpjkmiVrgPNXDgIVNTtnSbYdoNuchG5issW4PMv55CIhpBx2ba8xI599UwDWEkyUXR-CvHmG8Yzz7rFEoRT-O~KcUK3XRT0rEZ~RP4eBqfEHDMJdskn8VIfXTcci3Yxw41VKtasA__",
          usdt: "140.000",
        },
        {
          name: "MAC BOOK PRO",
          nft: "2",
          image:
            "https://s3-alpha-sig.figma.com/img/ac13/92fc/6d8671ca2517bb88873d2cc76d94ed96?Expires=1730678400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=DfGV4IC2sVp8tMvO~PBZydWVxfz7NciG6begMfZD7oVIaf4zEDB4mN67JLxDgyL1qCAaWFdVZTwbDmd70orUzcdzQvfV~TWfJJHptB4QSKVyCKrwn033q5iOnqlKAsFXNlZUkaOEVeInP7Ft5K7s~Ahc3pslEiOlZUYr~XROzmmWCRnUcu-ssSryHdB8xaO1l1hTryq6mzYUb6bi3JFvfGNbi4Oq6lrbB8v5egQI0F6aMLc9Sq7ZZ-sj2eLnZsYcFsuHocq1xfYyZEoVUrkeOt4TPFQclciSCJimpFoa9u-h7aCbGzPgoI-v0NdclWqyhCyGRfoLifR4jK2QZD~HZg__",
          usdt: "3000",
        },
        {
          name: "SAMSUNG S23 ULTRA",
          nft: "3",
          image:
            "https://s3-alpha-sig.figma.com/img/30dd/b36b/477d39c46bb58bd7cf2b527fe696e621?Expires=1730678400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=UXPDfiyPAzLUHzilPfOb7jKoGeaiH3TCcn4-oZ3EKEepKotWem14qJVZEo2tMBzzPK0m-DKVXek7xTRYOYpq252IQpxyhqAQF2VL4QSORBSqBgAFHTlB6TbBYdxYde83xtQcwm7Ma61UsD-RCfoJKNavxeeSDQ3oQBAA~8cDQaPwwWxDBN9i18UnjctFuKftZD~MQMI6Zi6WkwSu5WBl9IqIS5MlVrXA-WWbc7GMDyjSdKIYLNSO43v2ef9RrNbpm5NkcTSmuYlDShTlANRv7GvmpZuwgsCF5iddXUZZVIkY96fu9LYc61X0boRwM-oz8UuoF-ilDvwsrJYYfbmBVw__",
          usdt: "1400",
        },
      ]);
      console.log("Se han creado los juegos por defecto.");
    } else {
      console.log(
        "Ya existen juegos en la base de datos. No se crean juegos adicionales."
      );
    }
  } catch (error) {
    console.error("Error al crear los juegos por defecto:", error);
  }
};

conn
  .sync({ force: true })
  .then(async () => {
    console.log("Base de datos sincronizada");

    await createDefaultGames();

    server.listen(3001, () => {
      console.log("Servidor corriendo en el puerto 3001");
    });
  })
  .catch((error) => {
    console.error("Error al sincronizar la base de datos:", error);
  });
