document.addEventListener('DOMContentLoaded', init);
const repoList = document.getElementById('repos-list');

function init(){
    gitForm = document.getElementById('github-form');

    
    gitForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = gitForm.search.value.trim().split(' ').join('_');
        
        fetch(`https://api.github.com/search/users?q=${name}`)
        .then((resp) => resp.json())
        .then((data) => data.items.forEach(renderAccount))
    })


}


function renderAccount(accountObj){
const userList = document.getElementById('user-list');
const repoList = document.getElementById('repos-list');
const card = document.createElement('li');
const accountImg = document.createElement('img');
const accountName = document.createElement('p');
const accountLink = document.createElement('a');
accountName.textContent = accountObj.login; 
accountImg.src = accountObj.avatar_url;
accountLink.href = accountObj.html_url;
accountLink.textContent = 'Account Page';

accountImg.addEventListener('click', () => {
    for(let i = 0; i < repoList.childElementCount; i++){
        repoList.children[i].remove();
    }
    fetch(`${accountObj.repos_url}`)
    .then((resp) => resp.json())
    .then((data) => data.forEach(renderRepo))
})

card.append(accountImg, accountName, accountLink);
userList.appendChild(card);

}




function renderRepo(repoObj){

    const repoList = document.getElementById('repos-list');
    const repoItem = document.createElement('li');
    const repoA = document.createElement('a');

    repoA.href = repoObj.owner.html_url;
    repoA.textContent = repoObj.name;

    repoItem.appendChild(repoA);
    repoList.append(repoItem);




}