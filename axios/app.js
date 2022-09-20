async function getData() {
    const response = await axios.get('https://swapi.dev/api/planets');
    const response2 = await axios.get(printData(response));
    const response3 = await axios.get(printData(response2));
    printData(response3);
};
const printData = (response) => {
    const {next, results} = response.data;
    for(let planet of results){
        console.log(planet.name);
    };
    return next;
};

async function getSpaceData() {
    const response = await axios.get('https://api.spacexdata.com/v3/launches/upcoming');
    const $ul = $('ul');
    for(let launch of response.data){
        $ul.append(makeLi(launch));
    };
};

const makeLi = (launch) => $('<li>').html(`<b>${launch.mission_name}</b> - ${launch.rocket.rocket_name}`);

$('#get-launches').on('click', getSpaceData);

async function getBreedList(){
    const response = await axios.get(`https://dog.ceo/api/breeds/list/all`);
    createDropdown(response.data);
};

function createDropdown(res){
    const breeds = res.message;
    $('#breed-list').append($('<option>').text('breed'));
    for(let breed in breeds){
        if(breeds[breed].length !== 0){
            $('#breed-list').append($('<option>').text(breed));
            for(let subBreed of breeds[breed]){
                $('#breed-list').append($('<option>').text(`${breed}/${subBreed}`));
            }
        } else {
            $('#breed-list').append($('<option>').text(breed));
        };
    };
};

async function getDogImage() {
    const $div = $('#dog-pics');
    const breed = $('#breed-list').val();
    const num = $('#num-dogs').val();
    $div.empty();
    try {
        const response = await axios.get(`https://dog.ceo/api/breed/${breed}/images/random/${num}`);
        const dogpics = response.data;
        for(let dogpic of dogpics.message){
            $div.append(createDogCard(dogpic));
        };
    } catch(e) {
        alert('Breed Not Found');
        const response = await axios.get(`https://dog.ceo/api/breeds/image/random/${num}`);
        const dogpics = response.data;
        for(let dogpic of dogpics.message){
            $div.append(createDogCard(dogpic));
        };
    };

};

function createDogCard(dogpic){
    const $newDiv = $('<div>').attr({'class':'card col-3','style':'width: 18rem;'});
    $newDiv.append($('<img>').attr({'class':'card-img-top','src':dogpic}));
    return $newDiv;
}

getBreedList();
$('#get-dog').on('click',e =>{
    e.preventDefault();
    getDogImage();
});


// async function getUsers(){
//     const res = await axios.get('https://reqres.in/api/users');
//     console.log(res)
// }

// async function createUser(){
//     const res = await axios.post('https://reqres.in/api/users', {username:'Chrissolo88', email:'chrissolo88@live.com', age: 34});
//     console.log(res)
// }
// getUsers();
// createUser();

async function getUsers(token) {
    const res = await axios.get('https://hack-or-snooze-v3.herokuapp.com/users', {params:{token}});
    console.log(res)
}

async function signUp(username,password,name){
    const res = await axios.post('https://hack-or-snooze-v3.herokuapp.com/signup', {user:{name,username,password}})
    console.log(res)
}
async function login(username,password){
    const res = await axios.post('https://hack-or-snooze-v3.herokuapp.com/login', {user:{username,password}})
    console.log(res);
    return res.data.token;
}
async function getUsersWithAuth(){
    const token = await login('chrissolo88','password');
    getUsers(token);
}
async function createStory(){
    const token = await login('chrissolo88','password');
    const newStory = {
        token,
        story: {
            author: 'Chris Richter',
            title: 'Test Story',
            url: 'http://www.test.com'
        }
    }
    const res = await axios.post('https://hack-or-snooze-v3.herokuapp.com/stories', newStory);
    console.log(res);
}
getUsersWithAuth();
createStory();
'https://hackorsnoozev3.docs.apiary.io/#introduction/authentication' 