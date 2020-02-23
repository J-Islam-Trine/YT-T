document.getElementById('backgroundColorChanger').addEventListener('click', ()=>{
    colorChanger('fetch');
})

async function colorChanger(state)
{
  let classSelector = 
  {
    2: 'colors2',
    3: 'colors3',
    4: 'colors4',
    5: 'colors5'
  };

  let colorList;

  if (state == 'fetch')
  {
    let colors = await fetch('https://raw.githubusercontent.com/ghosh/uiGradients/master/gradients.json')
    let colorsJson = await colors.json();
    let colorsJsonLength = colorsJson.length;
    let colorValues = colorsJson[parseInt((Math.random()*colorsJsonLength)+1)].colors;
    colorList = Array.from(colorValues);
    localStorage.setItem('background-color', JSON.stringify(colorList));
  }
  else if (state == 'load')
  {
    colorList = JSON.parse(localStorage.getItem('background-color'));
  }

  let root = document.querySelector('body');

  Object.keys(classSelector).forEach( item => {
    if(root.classList.contains(classSelector[item]))
    {
      root.classList.remove(classSelector[item]);    
    }
  });

  for(let i = 0;i<colorList.length;i++)
  {
    root.style.setProperty(`--color${i+1}`, colorList[i]);
  }

root.classList.add(classSelector[colorList.length]);
}
