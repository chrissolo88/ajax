const $gifs = $('#gifs')

async function getGif(){
    const searchTerm = $('#search-term').val()
    const myKey = 'm4yxpMhggVLW13In92p7BasqvW2NXvyt'
    const res = await axios.get('http://api.giphy.com/v1/gifs/search', { params:{q:searchTerm, api_key:myKey}})
    const randGif = selectRandomGif(res)
    console.log(randGif)
    $gifs.append(createGifCard(randGif))
}

function selectRandomGif(res) {
    const gifArr = res.data.data;
    const randGifNum = Math.floor(Math.random() * gifArr.length)
    return gifArr[randGifNum];
}

function createGifCard(randGif){
    const $newDiv = $('<div>').attr({'class':'card col-3 m-0 bg-dark'});
    $newDiv.append($('<img>').attr({'class':'card-img-top','src':randGif.images.original.url}));
    $newDiv.append($('<div>').attr({'class':'card-body'}).append($('<h5>').attr('class','card-title text-white').text(randGif.title)));
    return $newDiv;
}

const removeGifs = () => $gifs.empty()
$('#search-btn').on('click', getGif);
$('#remove-btn').on('click', removeGifs);