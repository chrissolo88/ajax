const firstReq = new XMLHttpRequest();
firstReq.addEventListener('load', function() {
    console.log(this.responseText);
    const data = JSON.parse(this.responseText);
    for(let planet of data.results){
        console.log(planet.name)
    }
    const nextUrl = data.next;
    const secondReq = new XMLHttpRequest();
    secondReq.addEventListener('load',function(){
        console.log('Success')
    });
});
firstReq.addEventListener('error', () => {
    console.log('ERROR');
});
firstReq.open('GET', 'https://swapi.co/api/planets');
firstReq.send();