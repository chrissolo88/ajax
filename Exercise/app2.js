/** Given a query string, return array of matching shows:
 *     { id, name, summary, episodesUrl }
 */


/** Search Shows
 *    - given a search term, search for tv shows that
 *      match that query.  The function is async show it
 *       will be returning a promise.
 *
 *   - Returns an array of objects. Each object should include
 *     following show information:
 *    {
        id: <show id>,
        name: <show name>,
        summary: <show summary>,
        image: <an image from the show data, or a default imege if no image exists, (image isn't needed until later)>
      }
 */
async function searchShows(query) {

    const response = await axios.get( 'https://api.tvmaze.com/search/shows', {params:{q:query}})
    const shows = response.data
    const resArr = []
    for(let show of shows){
        console.log(show.show)
        resArr.push({
            id:show.show.id,
            name:show.show.name,
            summary:show.show.summary,
            image: show.show.image ? show.show.image.original : "https://tinyurl.com/tv-missing"
        })
    }
    console.log(resArr)

    return resArr
}
      
function populateShows(shows) {
    const $showsList = $("#shows-list");
    $showsList.empty();

    for (let show of shows) {
        let $item = $(
        `<div class="col-md-6 col-lg-3 Show" data-show-id="${show.id}">
            <div class="card" data-show-id="${show.id}">
            <img src="${show.image}" class="card-img-top" alt="...">
                <div class="card-body">
                <h5 class="card-title">${show.name}</h5>
                <p class="card-text">${show.summary}</p>
                <button class="btn btn-primary episodes" data-toggle="modal" data-target="#episodes">Episodes</a>
                </div>
            </div>
            </div>
        `);

        $showsList.append($item);
    }
}
      
      
      /** Handle search form submission:
       *    - hide episodes area
       *    - get list of matching shows and show in shows list
       */
      
$("#search-form").on("submit", async function handleSearch (evt) {
    evt.preventDefault();

    let query = $("#search-query").val();
    if (!query) return;

    $("#episodes-area").hide();

    let shows = await searchShows(query);

    populateShows(shows);
});
      

      /** Given a show ID, return list of episodes:
       *      { id, name, season, number }
       */
      
async function getEpisodes(id) {
    let response = await axios.get(`http://api.tvmaze.com/shows/${id}/episodes`);
      
    let episodes = response.data.map(episode => ({
        id: episode.id,
        name: episode.name,
        season: episode.season,
        number: episode.number,
    }));     
    return episodes;
}

function populateEpisodes(episodes) {
    const $episodesList = $("#episodes-list");
    $episodesList.empty();
      
    for (let episode of episodes) {
      let $item = $(
        `<li>
           ${episode.name}
           (season ${episode.season}, episode ${episode.number})
         </li>
        `);
  
      $episodesList.append($item);
    }
  
    $("#episodes-area").show();
}
$("#shows-list").on("click", ".episodes", async function handleEpisodeClick(evt) {
    let showId = $(evt.target).closest(".Show").data("show-id");
    let episodes = await getEpisodes(showId);
    populateEpisodes(episodes);
});
      