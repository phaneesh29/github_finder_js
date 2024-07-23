function toggleMode() {
    let toggleBtn = document.getElementById('toggle');
    toggleBtn.addEventListener("click", () => {
        let body = document.body;
        body.classList.toggle('dark-mode');
        toggleBtn.classList.toggle('highlight');
    })

}

async function fetchGithubAPI(url) {
    try {
        const response = await fetch(url)
        const data = await response.json()
        if (data.id) {
            console.log(data.id);
            let created_date = new Date(data.created_at)
            const myImg = document.createElement('img')
            myImg.setAttribute('src', data.avatar_url)
            myImg.setAttribute('alt', data.login)
            myImg.classList.add('avatar')
            userInfo.appendChild(myImg)
            const mySection = document.createElement('section')
            mySection.classList.add('user-details')
            mySection.innerHTML = `
<p class="each-detail">UserName: <span>${data.login}</span></p>
<p class="each-detail">Name: <span>${data.name}</span></p>
<p class="each-detail">Email: <span>${data.email}</span></p>
<p class="each-detail">Company: <span>${data.company}</span></p>
<p class="each-detail">Bio: <span>${data.bio}</span></p>
<p class="each-detail">Location: <span>${data.location}</span></p>
<p class="each-detail">Followers: <span>${data.followers}</span></p>
<p class="each-detail">Following: <span>${data.following}</span></p>
<p class="each-detail">GitHub Link: <span><a href="${data.html_url}"><img src="images/github.svg" alt="github" width="30px"></a></span></p>
<p class="each-detail">Public-Repos: <span>${data.public_repos}</span></p>
<p class="each-detail">Public-Gists: <span>${data.public_gists}</span></p>
<p class="each-detail">Created-On: <span>${created_date.toDateString()}</span></p>
<p class="each-detail">X-Handel: <span><a href="https://twitter.com/${data.twitter_username}"><img src="images/x.svg" alt="" width="30px"></a></span></p>
`
            userInfo.appendChild(mySection)
        }
        else {
            userInfo.innerHTML = `<h2>${data.status} ${data.message} </h2>`
        }
    }
    catch (error) {
        userInfo.innerHTML = `<h2> ${error} </h2>`
    }

}

const userInfo = document.querySelector("#user-info")
const usernameInputForm = document.querySelector('form')
let usernameInput;
usernameInputForm.addEventListener("submit", (event) => {
    event.preventDefault()
    usernameInput = document.querySelector("input[name=username]").value.trim()
    if (!usernameInput) {
        alert("Please enter a valid username")
    }
    else {

        userInfo.innerHTML = ""
        const APIURL = `https://api.github.com/users/${usernameInput}`
        fetchGithubAPI(APIURL)


    }
})



toggleMode()
