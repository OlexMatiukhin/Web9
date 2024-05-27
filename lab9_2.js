let friendsDiv=document.getElementsByClassName('friends')[0];

let statusSorting=false;
let valueSorting="";
let statusFiltrationAge=false;
let statusFiltrationName=false;
let statusFiltrationCountry=false;
let statusFiltrationEmail=false;
let valueFiltrationAge="";
let valueFiltrationName="";
let valueFiltrationCountry="";
let valueFiltrationEmail="";
let constFriendsArray=new Array();
let friendsArray= new Array();
let sortingWrapper =document.querySelector('.sorting_wrapper');
let filtrationWrapper=document.querySelector('.filtration_wrapper');


function filterByName(valueFiltrationName, friendsArray) {
    valueFiltrationName = valueFiltrationName.toUpperCase();
    const filteredArray = friendsArray.filter(friend => 
        friend.name.first.toUpperCase().includes(valueFiltrationName) || 
        friend.name.last.toUpperCase().includes(valueFiltrationName) || 
        (friend.name.first.toUpperCase() + " " + friend.name.last.toUpperCase()).includes(valueFiltrationName)||
        (friend.name.last.toUpperCase() + " " + friend.name.first.toUpperCase()).includes(valueFiltrationName)
    );
    
    // Очищаем исходный массив
    friendsArray.length = 0;

    // Добавляем отфильтрованные элементы обратно в массив
    filteredArray.forEach(friend => friendsArray.push(friend));
}
function filterByAge(valueFiltrationAge, friendsArray){
   
    const filteredArray = friendsArray.filter(friend => friend.dob.age===parseInt(valueFiltrationAge,10));
    friendsArray.length = 0;
    filteredArray.forEach(friend => friendsArray.push(friend));
}
function filterByCountry(valueFiltrationCountry, friendsArray){
    
    const filteredArray = friendsArray.filter(friend => friend.location.country===valueFiltrationCountry);
    friendsArray.length = 0;
    filteredArray.forEach(friend => friendsArray.push(friend));
}
function filterByEmail(valueFiltrationEmail, friendsArray){
    
    const filteredArray = friendsArray.filter(friend => friend.email.toUpperCase()===valueFiltrationEmail.toUpperCase());
    friendsArray.length = 0;
    filteredArray.forEach(friend => friendsArray.push(friend));
}



function addFriendsToPage(friendsArray){
    for(i=0; i<friendsArray.length; i++){
        createFriendBlock(`${friendsArray[i].name.first} ${friendsArray[i].name.last}`, `${friendsArray[i].picture.medium}`, `${friendsArray[i].dob.age}`, `${friendsArray[i].email}`, `${friendsArray[i].phone}`, `${friendsArray[i].location.country}  ${friendsArray[i].location.city}`, `${friendsArray[i].gender}`.toUpperCase());
    }
}
function clearFriendsDiv(){
    const friendsDiv = document.querySelector('.friends');
    while (friendsDiv.firstChild) {
        friendsDiv.removeChild(friendsDiv.firstChild);
    }
}
async function loadFriends(friendsArray) {
    let response = await fetch("https://randomuser.me/api/?results=4");
    let friends = await response.json();
    friends=friends.results;
    friendsArray.push(...friends);
    constFriendsArray.push(...friends);
    addFriendsToPage(friends);
}


function sortByNameAsc(friendsArray) {    
    friendsArray.sort((a, b) => a.name.first.localeCompare(b.name.first));        
}

function sortByNameDesc(friendsArray) {    
    friendsArray.sort((a, b) => b.name.first.localeCompare(a.name.first));
}

function sortByRegistrDateAsc(friendsArray) {
    friendsArray.sort((a, b) => new Date(a.registered.date) - new Date(b.registered.date));     
}

function sortByRegistrDateDesc(friendsArray) { 
    friendsArray.sort((a, b) => new Date(b.registered.date) - new Date(a.registered.date));
}

function sortByAgeAsc(friendsArray) {
    friendsArray.sort((a, b) => a.dob.age - b.dob.age);
}

function sortByAgeDesc(friendsArray) {
    friendsArray.sort((a, b) => b.dob.age - a.dob.age);
}

function IfDesc(e) {
    if (e.target.classList.contains("desc")) {
       return true;
    } else if (e.target.classList.contains("asc")) {
        return false;
    }
}

function validateFiltraionName(valueFiltrationName){
    if(valueFiltrationName.length>0){
        return true;
    }
    return false;
}
function validateFiltrationAge(valueFiltrationAge){
        if(10<parseInt(valueFiltrationAge, 10)<100){
            return true;
        }
        return false;    
}
function validateFiltrationCountry(valueFiltrationCountry){
    if(valueFiltrationCountry.length>0){
        return true
    }
    return false;
}
function validateFiltrationEmail(valueFiltrationEmail){
    if(valueFiltrationEmail.length>0){
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(!re.test(String(valueFiltrationEmail).toLowerCase())){
        }        
        return re.test(String(valueFiltrationEmail).toLowerCase());    
    }
    return false;

}


function checkSorting(valueSorting,friendsArray){
    if(statusSorting){
        clearFriendsDiv();
        switch(valueSorting){
            case "dateRegitrDesc":
                sortByRegistrDateDesc(friendsArray);
                break;
            case "dateRegitrAsc":
                sortByRegistrDateAsc(friendsArray);
                break;
            case "nameDesc":
                sortByNameDesc(friendsArray);
                break;
            case "nameAsc":
                sortByNameAsc(friendsArray);
                break;
            case "ageAsc":
                sortByAgeAsc(friendsArray);
                break;
            case "ageDesc":
                    sortByAgeDesc(friendsArray);
                    break;
            
        }
        addFriendsToPage(friendsArray);      
    }

}


sortingWrapper.addEventListener('click', (e) => {
    statusSorting=true;

    if (e.target.classList.contains("regist")) {
        if (IfDesc(e)) {
           valueSorting="dateRegitrDesc";
        } else {
            valueSorting="dateRegitrAsc";
        }
        

    } else if (e.target.classList.contains("name")) {
        if (IfDesc(e)) {
            valueSorting="nameDesc";
        } else {
            valueSorting="nameAsc";
        }
    } else if (e.target.classList.contains("age")) {
        if (IfDesc(e)) {
            valueSorting="ageDesc";
        } else {
            valueSorting="ageAsc";
        }
    }
    checkSorting(valueSorting,friendsArray);
});
filtrationWrapper.addEventListener('click', (e)=>{
    if(e.target.classList.contains("filtration_button")){
        switch(e.target.id){
            case "filter_name":
                
                if(validateFiltraionName(name_value.value)){
                    statusFiltrationName=true;
                    valueFiltrationName=name_value.value;
                    filterByName(valueFiltrationName, friendsArray);
                    clearFriendsDiv();
                    addFriendsToPage(friendsArray);  

                }

                break;
            case "filter_age":
                if(validateFiltrationAge(age_value.value)){
                     statusFiltrationAge=true;
                     valueFiltrationAge=age_value.value;
                    filterByAge(valueFiltrationAge, friendsArray);
                    clearFriendsDiv();
                    addFriendsToPage(friendsArray);                    
                }
                break;
            case "filter_county":
                if(validateFiltrationCountry(country_value.value)){
                    statusFiltrationCountry=true;
                    valueFiltrationCountry=country_value.value;
                    filterByCountry(valueFiltrationCountry, friendsArray);
                    clearFriendsDiv();
                    addFriendsToPage(friendsArray);            
                }              
            break;

            case "filter_email":
                if(validateFiltrationEmail(email_value.value)){

                    statusFiltrationEmail=true;
                    valueFiltrationEmail=email_value.value;
                    filterByEmail(valueFiltrationEmail, friendsArray);     
                    clearFriendsDiv();
                    addFriendsToPage(friendsArray);    

                }  
                break;
                case "clear_all":
                    clearChanges();
                    break;
            }            

    }
});


function createFriendBlock(friendName, imgSrc, friendAge, friendMail, friendNumber, friendRegion, friendSex) {
    const parentDiv=document.getElementsByClassName('friends')[0];
    const friendDiv = document.createElement('div');
    friendDiv.className = 'friend';
    
    const friendNameP = document.createElement('p');
    if(friendSex=='MALE'){
        friendNameP.className = 'friend_name male';
    }
    else{
        friendNameP.className = 'friend_name female';
    }
            
    friendNameP.textContent =`${friendName}`;
    
    const friendImg = document.createElement('img');
    friendImg.className = 'friend_img';
    friendImg.src = `${imgSrc}`; 
    friendImg.alt = 'avatar';
    
    const friendInfoDiv = document.createElement('div');
    friendInfoDiv.className = 'friend_info';
    
    const friendAgeP = document.createElement('p');
    friendAgeP.className = 'friend_age';
    friendAgeP.textContent = `I have ${friendAge} years old.`;
    
    const friendEmailP = document.createElement('p');
    friendEmailP.className = 'friend_email';
    friendEmailP.textContent = `${friendMail}`;
    
    const friendNumberP = document.createElement('p');
    friendNumberP.className = 'friend_number';
    friendNumberP.textContent = `${friendNumber}`;
    
    const friendRegionP = document.createElement('p');
    friendRegionP.className =  "friend_region";
    friendRegionP.textContent =`${friendRegion}`;
    
    const friendSexP = document.createElement('p');
    friendSexP.className = 'friend_sex';
    friendSexP.textContent = `${friendSex}`;
    friendInfoDiv.appendChild(friendAgeP);
    friendInfoDiv.appendChild(friendEmailP);
    friendInfoDiv.appendChild(friendNumberP);
    friendInfoDiv.appendChild(friendRegionP);
    
    friendDiv.appendChild(friendNameP);
    friendDiv.appendChild(friendImg);
    friendDiv.appendChild(friendInfoDiv);
    friendDiv.appendChild(friendSexP);
    parentDiv.appendChild(friendDiv);
}

friendsDiv.addEventListener('scroll', handleScroll);
function handleScroll() {   
       
        const isScrolledToBottom = friendsDiv.scrollTop + friendsDiv.clientHeight >= friendsDiv.scrollHeight;    
        if (isScrolledToBottom) {
            loadFriends(friendsArray);
            /*clearFriendsDiv();
            checkFiltration();
            checkSorting();
            addFriendsToPage(friendsArray);*/
        }
  
}
function clearChanges(){
    friendsArray=JSON.parse(JSON.stringify(constFriendsArray));
    clearFriendsDiv();
    addFriendsToPage(friendsArray);
    clearFields();


}
function clearFields(){
    name_value.value="";
    age_value.value="";
    country_value.value="";
    email_value.value="";
    statusSorting=false;
    valueSorting="";
    statusFiltrationAge=false;
    statusFiltrationName=false;
    statusFiltrationCountry=false;
    statusFiltrationEmail=false;
    valueFiltrationAge="";
     valueFiltrationName="";
    valueFiltrationCountry="";
    valueFiltrationEmail="";
}


document.addEventListener('DOMContentLoaded', ()=>{
    loadFriends(friendsArray);
    loadFriends(friendsArray);
});
function checkFiltration(){
    if(statusFiltrationName){
        filterByName(valueFiltrationName, friendsArray);
        clearFriendsDiv();
        addFriendsToPage(friendsArray);  
    }
    if(statusFiltrationAge){
        filterByAge(valueFiltrationAge, friendsArray);
        clearFriendsDiv();
        addFriendsToPage(friendsArray);  
    }
    if(statusFiltrationCountry){

        filterByCountry(valueFiltrationCountry, friendsArray);
        clearFriendsDiv();
        addFriendsToPage(friendsArray); 
    }
    if(statusFiltrationEmail){

        filterByEmail(valueFiltrationEmail, friendsArray);     
        clearFriendsDiv();
        addFriendsToPage(friendsArray);  
    }
}
 
function contains(query) {
    let arrayNames=[];
    let result= constFriendsArray.filter(friend => 
        (friend.name.first.toUpperCase() + " " + friend.name.last.toUpperCase()).includes(query.toUpperCase())||
        (friend.name.last.toUpperCase() + " " + friend.name.first.toUpperCase()).includes(query.toUpperCase()));  

        result.forEach(friend => arrayNames.push(friend.name.first + " " + friend.name.last)); 
    
    return arrayNames;
}


const server = {
    search(query) {

        return new Promise(resolve => {
            setTimeout(() => resolve({
                list: query ? contains(query) : []
            }), 100)
        })
    }
}
function debounce(callee, timeoutMs) {
    return function perform(...args) {
        let previousCall = this.lastCall
        this.lastCall = Date.now()

        if (previousCall && ((this.lastCall - previousCall) <= timeoutMs)) {
            clearTimeout(this.lastCallTimer)
        }

        this.lastCallTimer = setTimeout(() => callee(...args), timeoutMs)
    }
}
function ClearSearchResults(){
    
}


function handleInput(e) {
   
    const {value} = e.target
   

    server.search(value).then(function (response) {
        const {list} = response

        searchResults.innerHTML = list.reduce((markup, item) => {
            return `${markup}<li>${item}</li>`
        }, ``)
    })
}
const debouncedHandle = debounce(handleInput, 250);
searchline.addEventListener('input', debouncedHandle)
searchline.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        if(searchline.value!=""){
            clearChanges();
            clearFriendsDiv();
            filterByName(searchline.value,friendsArray);
            addFriendsToPage(friendsArray);

        }
        else{
            clearChanges();
        }
       
       
    }
  });

  