

const apiKey = '?api_key=bfea1361-9fff-45f8-a8c0-1ff8025da116';

const cdn = 'http://ddragon.leagueoflegends.com/cdn/';

const version = '6.3.1';

const region = 'br';

const apiUrl = 'https://' + region + '.api.pvp.net/api/lol/' + region;

const summonerUrl = apiUrl + '/v1.4/summoner/';

const summonerByName = summonerUrl + 'by-name/';

const matchlistUrl = apiUrl + '/v2.2/matchlist/by-summoner/';

const profilePicPath = '/img/profileicon/';

const _png  = '.png';

export const getSummonersByName = (names) => {
  return httpGet(summonerByName + names + apiKey);
}

export const getMatchList = (summonerId) => {
  return httpGet(matchlistUrl + summonerId + apiKey);
}

export const httpGet = (url) => {
  return new Promise(
    function (resolve, reject) {

      var req = new XMLHttpRequest();

      req.open('GET', url);

      req.onload = () => {
        if (req.status === 200) {
          // Success
          resolve(req.response);
        } else {
          // Something went wrong (404 etc.)
          reject(new Error(req.statusText));
        }
      };

      req.onerror = () => {
        reject(new Error(
          'XMLHttpRequest Error: ' + req.statusText));
      };
      req.send();
    });
}

export const httpResponseToJSONArray = (response) => {
  let parsedJSON = JSON.parse(response);
  return Object.keys(parsedJSON).map((key) => {return parsedJSON[key]});
}

export const profilePicUrl = (profileId) => {
  return cdn + version + profilePicPath + profileId + _png;
}