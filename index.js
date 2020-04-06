'use strict';

// put your own value below!
const apiKey = 'anM24gRf3u6IBjez5HuXYPZAXFialH1r9xQCJ4xn'; 
const searchURL = 'https://developer.nps.gov/api/v1/parks';


function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}

function displayResults(responseJson) {
  // if there are previous results, remove them
  console.log(responseJson);
  $('#results-list').empty();
  // iterate through the items array
  responseJson.data.array.forEach(item => {
    $('#results-list').append(
      `<li><h3>${item.fullName}</h3>
      <p>${item.description}</p>
      <a>${item.url}</a>
      </li>`
    )});
  //display the results section  
  $('#results').removeClass('hidden');
};

function getParks(query, limit=10) {
  const params = {
    api_key: apiKey,
    stateCode: query,
    limit
  };
  const queryString = formatQueryParams(params)
  const url = searchURL + '?' + queryString;

  console.log(url);

  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const state = $('#js-search-term').val();
    const limit = $('#js-max-results').val();
    getParks(state, limit);
  });
}

$(watchForm);