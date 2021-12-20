const postContainer = document.querySelector(".post-container");
const loading = document.querySelector(".loader");
const filter = document.querySelector(".filter");

let limit = 5;
let page = 1;

//Fetch Post from API
async function getPosts() {
	const res = await fetch(
		`https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`
	);
	const data = await res.json();

	return data;
}

//Show Posts in DOM
async function showPosts() {
	const posts = await getPosts();
	posts.forEach((post) => {
		//create a post
		const postEl = document.createElement("div");
		//add "post" class
		postEl.classList.add("post");
		//append to the DOM
		postEl.innerHTML = `
        <div class="number">${post.id}</div>
				<div class="post-info">
					<div class="post-title">${post.title}</div>
					<p class="post-body">
          ${post.body}
					</p>
				</div>
    `;
		postContainer.appendChild(postEl);
	});
}

//Show Loading
function showLoading() {
	loading.classList.add("show");
	setTimeout(() => {
		loading.classList.remove("show");
		setTimeout(() => {
			page++;
			showPosts();
		}, 200);
	}, 1000);
}

//Show Initial Posts
showPosts();

//Add infinite Scrolling
window.addEventListener("scroll", () => {
	const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
	if (scrollTop + clientHeight >= scrollHeight - 5) {
		showLoading();
	}
});

function filterPosts(e) {
	const term = e.target.value.toUpperCase();
	const posts = document.querySelectorAll(".post");
	posts.forEach((post) => {
		const title = post.querySelector(".post-title").innerText.toUpperCase();
		const body = post.querySelector(".post-body").innerText.toUpperCase();

		title.includes(term) || body.includes(term)
			? (post.style.display = "flex")
			: (post.style.display = "none");
	});
}

filter.addEventListener("input", filterPosts);
