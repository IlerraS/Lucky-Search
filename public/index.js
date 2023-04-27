'use strict'

const searchForm = document.getElementById('search-form');
const searchSwitch = document.getElementById('search-switch');
const snippetresults = document.querySelector('.form-results');

const localSearch = async (event) =>
{
  event.preventDefault();
  snippetresults.innerHTML = '';
  const query = document.getElementById('search-input').value;
  document.getElementById('search-input').value = '';
  const results = await fetch(`/search/${query}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const data = await results.json();
    data.forEach(result =>
    {
      let content = result._source;
      let preview = content.column5;
      content.column2 = capitlizeWords(content.column2);
      content.column3 = capitlizeWords(content.column3);
      preview = content.column5.slice(0, 100);
      preview = content.column5.charAt(0).toUpperCase() + content.column5.slice(1);
      const markup = `
        <div class="card">
          <p class="title">Title: ${content.column2}</p>
          <p class="rank">Rank: ${content.column1}</p>
          <p class="year">Year: ${content.column4}</p>
          <p class="artist">Artist: ${content.column3}</p>
          <p class="lyrics">${result.highlight? result.highlight.column5 : preview}...</p>
      </div>`;
      snippetresults.insertAdjacentHTML('afterbegin', markup);

      const titleDiv = document.querySelector('.title');
      titleDiv.addEventListener('click', () =>
      {
        console.log('hit 1')
      
        const popup = document.createElement('div');
        popup.classList.add('popup');
        const markup = `
          <p class="popup-content">${content.column5}</p>
        `;
        popup.innerHTML = markup;
        document.body.appendChild(popup);
        popup.style.display = 'block';
        popup.addEventListener('click', (event) =>
        {
          if(event.target === popup)
          {
            popup.remove();
          }
        });
      });
    });
}

const capitlizeWords = (word) =>
{
  return word.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}


searchForm.addEventListener('submit', localSearch);