import {parse as parseQuery} from "querystring";
import * as crypto from "../../util/crypto.js"

export default async (req, res) => {
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
      console.log(`GET /contractsteps => cryptoaddr: ${query.cryptoaddr}`);
      var addr = await crypto.normalizeAddress(query.cryptoaddr);
      var steps = await crypto.getSteps(addr);
      respBody = {success:true, steps:steps};
      respStatus = 200;  
    }        
  }

  console.log(`  ${respStatus} => ${JSON.stringify(respBody)}`);
  res.status(respStatus).json(respBody);
}