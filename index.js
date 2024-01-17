


async function getCountry(){
  try {
    let res = await fetch('https://restcountries.com/v3.1/all')
  let country=await res.json()
  console.log(country)
  return country
  } catch (error) {
    console.log(error)
  }
}

getCountry()


async function getWeather(latlng){
  try {
   let res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latlng[0]}&lon=${latlng[1]}&appid=766f4b4f49d88a5e17540ff84fd275de`)
   let data= await res.json()
   return data.main.temp-273.15
  } catch (error) {
    console.log(error)
  }
}




async function myCountries() {
  let data = await getCountry();
  let parent = document.createElement('div');
  parent.setAttribute('id', 'parent');
  document.body.appendChild(parent);

  data.forEach(async (e) => {
    let child = document.createElement('div');
    child.setAttribute('id', 'child');

   
    
    let h2 = document.createElement('h2');
    h2.setAttribute('id', 'country');
    h2.innerHTML = e.name.common;
    child.appendChild(h2);

    let image = document.createElement('img');
    image.setAttribute('id', 'flag');
    image.setAttribute('src', e.flags.svg);
    child.appendChild(image);

    let h3 = document.createElement('h4');
    h3.setAttribute('id', 'capital');
    h3.innerHTML = `Capital:${e.capital ? e.capital[0] : ''}`;
    child.appendChild(h3);

    let region = document.createElement('h4');
    region.setAttribute('id', 'region');
    region.innerHTML = `Region:${e.region}`;
    child.appendChild(region);

    let code = document.createElement('h4');
    code.setAttribute('id', 'code');
    code.innerHTML = `Country Code:${e.cca3}`;
    child.appendChild(code);

    let button = document.createElement('button');
    button.innerHTML = 'Get Weather';
    button.addEventListener('click', async () => {
      let temp = await getWeather(e.latlng);
     
      let existingTempElement = child.querySelector('#temp');
      if (existingTempElement) {
       
        existingTempElement.innerHTML = `${temp.toFixed(2)} &deg; C`;
      } else {
        
        let newH3 = document.createElement('h3');
        newH3.setAttribute('id', 'temp');
        newH3.innerHTML = `${temp.toFixed(2)} &deg; C`;
        child.appendChild(newH3);
      }
    });
    child.appendChild(button);
    parent.appendChild(child);
  });
}

myCountries();
