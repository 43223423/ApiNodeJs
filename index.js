const express = require("express");
const app = express();
const { MongoClient, ServerApiVersion } = require("mongodb");
const cors = require("cors");
// const uri = process.env.MONGODB_URI;
const uri = "mongodb+srv://thiagocontato1232:MMmLvwm1aLHeV61u@cluster0.ob27bb5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
app.use(cors());

app.get("/", async (req, res) => {
  try {
    res.status(200).send("Node js");
  } catch (error) {
    res.status(500).send(error);
  }
});
app.get("/chart-data-pequena", async (req, res) => {
  await client.connect();

  await client.db("admin").command({ ping: 1 });

  const database = client.db("AutomationMange");

  const collection = await database
    .collection("PecasPequenas")
    .find({})
    .toArray();

  try {
    res.json(collection)
    res.status(200)
  } catch (error) {
    res.status(500).send(error);
  } finally {
    await client.close();
  }
});

app.get("/chart-data-media", async (req, res) => {
  await client.connect();

  await client.db("admin").command({ ping: 1 });

  const database = client.db("AutomationMange");

  const collection = await database
    .collection("PecasMedias")
    .find({})
    .toArray();

  try {
    res.status(200).send(collection);
  } catch (error) {
    res.status(500).send(error);
  } finally {
    await client.close();
  }
});

app.get("/chart-data-grande", async (req, res) => {
  await client.connect();

  await client.db("admin").command({ ping: 1 });

  const database = client.db("AutomationMange");

  const collection = await database
    .collection("PecasGrandes")
    .find({})
    .toArray();

  try {
    res.status(200).send(collection);
  } catch (error) {
    res.status(500).send(error);
  } finally {
    await client.close();
  }
});

const PORT = process.env.PORT || 3300;

app.listen(
  {
    host: "0.0.0.0",
    port: PORT,
  },
  function () {
    console.log(`Servidor rodando na porta ${PORT}`);
  }
);

async function Delete() {
  await client.connect();

  await client.db("admin").command({ ping: 1 });

  const database = client.db("Teste");
  await database
    .collection("Pecas")
    .deleteMany({})
    .then(() => {
      console.log("Sucesso");
    })
    .catch((err) => console.log(err));
}
// Delete()
