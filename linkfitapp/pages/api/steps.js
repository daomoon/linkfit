import {parse as parseQuery} from "querystring";
import * as database from "../../util/mongdb.js"

export default async (req, res) => {

  await database.connect();
  var respBody = {success:false};
  var respStatus = 400;

  const apikey = req.headers.api_key;
  if (!apikey || apikey !== process.env.API_KEY) {
    respBody = {success: false, message: 'Authorization failure.'};    
    respStatus = 401;
  }
  else {
    if (req.method === 'GET') {            
      const url = new URL(req.url, 'http://localhost');
      const query = parseQuery(url.search.substr(1));
      console.log(`GET /steps => cryptoaddr: ${query.cryptoaddr}`);
      //TODO: redeem steps from mongo
      //var coinBalance = await crypto.getTokenBalance(query.cryptoaddr);
      respBody = {success:true, steps:"100"};
      respStatus = 200;  
    }        
  }

  console.log(`  ${respStatus} => ${JSON.stringify(respBody)}`);
  res.status(respStatus).json(respBody);
}