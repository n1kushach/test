const express = require("express");
const app = express();
const pipedrive = require("pipedrive");
const cors = require("cors");

const PORT = 1800;

const defaultClient = new pipedrive.ApiClient();
app.use(express.json());
app.use(cors()); // Enable CORS for all routes

// Configure API key authorization: apiToken
let apiToken = defaultClient.authentications.api_key;
apiToken.apiKey = "3e9fef07024ac578be92a90b5f1bc614490d9ed6";

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

app.get("/", async (req, res) => {
  const api = new pipedrive.DealsApi(defaultClient);
  try {
    const deals = await api.getDeals();
    res.json(deals);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post("/activity/add", async (req, res) => {
  let apiInstance = new pipedrive.ActivitiesApi(defaultClient);
  let opts = pipedrive.ActivityPostObject.constructFromObject({
    subject: req.body.title,
    due_date: req.body.closeTime,
    note: req.body.originId,
  });

  try {
    const data = await apiInstance.addActivity(opts);
    console.log("API called successfully. Returned data: " + data);
    res.json(data); // Send the response back to the client
  } catch (error) {
    console.error(error);
    res.status(500).send(error); // Send error response back to the client
  }
});

app.post("/deal/add", async (req, res) => {
  let apiInstance = new pipedrive.DealsApi(defaultClient);
  let opts = pipedrive.NewDeal.constructFromObject({
    title: req.body.id,
    closeTime: req.body.created_at,
    originId: req.body.url,
  });

  try {
    const data = await apiInstance.addDeal(opts);
    console.log("API called successfully. Returned data: " + data);
    res.json(data); // Send the response back to the client
  } catch (error) {
    console.error(error);
    res.status(500).send(error); // Send error response back to the client
  }
});
