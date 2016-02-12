const apiKey = '?api_key=bfea1361-9fff-45f8-a8c0-1ff8025da116';

const cdn = 'http://ddragon.leagueoflegends.com/cdn/';

const language = 'pt_BR';

const version = '6.3.1';

const region = 'br';

const apiUrl = 'https://' + region + '.api.pvp.net/api/lol/' + region;

const summonerUrl = apiUrl + '/v1.4/summoner/';

const summonerByName = summonerUrl + 'by-name/';

const matchlistUrl = apiUrl + '/v2.2/matchlist/by-summoner/';

const profilePicPath = '/img/profileicon/';

const _png  = '.png';

let champions;

export const getChampionByKey = (key) => {
  let champion = champions.filter((_champion) => {return _champion.key == key});
  return champion.length > 0 ? champion[0] : null;
}

export const getChampions = () => {
  if(!champions){
    let url = cdn + version + '/data/' + language + '/champion.json';
    httpGet(url).then(
      (resp) => {
        let parsedResponse = JSON.parse(resp).data;
        champions = Object.keys(parsedResponse).map((innerKey) => {return parsedResponse[innerKey]});
        return champions;
      },
      (error) => {console.log('Error on retrieving champion info: ' + error);}
    ); 
  } else {
    return champions;
  }
  
}

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