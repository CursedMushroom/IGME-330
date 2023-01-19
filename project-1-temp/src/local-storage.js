//--------------------Local storage----------------//
const defaultData = {
    "appTitle": "Hearth Stone Cards",
    "favorites": [],
  },
  storeName = "osl2877-p1-favsettings"; 

  
  
  const readLocalStorage = () => {
    let allValues = null;
  
    try{
      allValues = JSON.parse(localStorage.getItem(storeName)) || defaultData;
    }catch(err){
      console.log(`Problem with JSON.parse() and ${storeName} !`);
      throw err;
    }
  
    return allValues;
  };
  
  const writeLocalStorage = (allValues) => {
    localStorage.setItem(storeName, JSON.stringify(allValues));
  };
  
  export const clearLocalStorage = () => writeLocalStorage(defaultData);
  
 
 
  export const addFavorite = (str) => {
    const allValues = readLocalStorage();
  
    allValues.favorites.push(str);
    writeLocalStorage(allValues);
  };
  
  export const getFavorites = () => readLocalStorage().favorites;
  
  export const clearFavorites = () => {
    const allValues = readLocalStorage();
  
    allValues.favorites = [];
    writeLocalStorage(allValues);
  };
  