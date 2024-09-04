const loadPost = async (isCategory, category) => {

  
  let url = "https://openapi.programming-hero.com/api/retro-forum/posts";
  if(isCategory) {
    url = `https://openapi.programming-hero.com/api/retro-forum/posts?category=${category}`
  }
  const res = await fetch(url);
  const data = await res.json();
  //   console.log(data.posts);
  displayPost(data.posts);
};

const displayPost = (posts) => {
  const postsContainer = document.getElementById("post-container");
    postsContainer.innerHTML = "";
  posts.forEach((post) => {
    const newPost = document.createElement("div");
    newPost.classList.add(
      "flex",
      "items-start",
      "border",
      "p-10",
      "gap-6",
      "rounded-3xl",
      "bg-gray-100",
      "mb-6"
    );

    newPost.innerHTML = `

                 <!-- frist card- ${post.id}-->
           


             <div class="avatar relative border">
                <div class="w-20 rounded ">
                  <img
                    src="${post.image}" />

                    
                </div>
                <div class="absolute ${post.isActive ? `bg-green-500`: `bg-red-500`} h-3.5 w-3.5 rounded-full -top-1 -right-1">
                  
                </div>
              </div>

             
                <!-- info -->
                 <div class="w-full">
                 
                  <p class="font-semibold text-sm space-x-5 mb-2">
                    <span>#${post.category}</span>
                    <span>Author: ${post.author?.name}</span>
                  </p>
                 <h4 class="font-bold text-xl mb-2">${post.title}</h4>

                 <p class="mb-2">${post.description}</p>

                 <hr class="my-4 border border-b-0 border-gray-400 border-dashed">

                 <div class="flex justify-between items-center">
                  <div class="flex gap-6">
                    <p class="space-x-2 text-gray-500">
                     <i class="fa-regular fa-message-lines"></i>
                      <span>${post.comment_count}</span>
                    </p>
                    <p class="space-x-2 text-gray-500">
                      <i class="fa-sharp fa-regular fa-eye"></i>
                      <span>${post.view_count}</span>
                    </p>
                    <p class="space-x-2 text-gray-500">
                      <i class="fa-sharp fa-regular fa-clock"></i>
                      <span>${post.posted_time}</span>
                    </p>
                    
                  </div>
                  <button onclick="handleReadPost('${post?.title}', '${post?.view_count}')">
                   <img src="./images/email.png" alt="">
                  </button>
                 </div>
                 </div>
            

        `;

    postsContainer.appendChild(newPost);
  });
};

let totalPost = [];

// handleReadPost
const handleReadPost = (title, views) => {
  const readContainer = document.getElementById("read-container");
  const readNumber = document.getElementById("total-number");

//   console.log(readNumber);

  if (!totalPost.includes(title)) {
    totalPost.push(title);
    readNumber.innerText = totalPost.length;

    const newBlog = document.createElement("div");
    newBlog.classList.add(
      "bg-white",
      "p-4",
      "rounded-xl",
      "flex",
      "items-center",
      "justify-between",
      "mb-4"
    );
    newBlog.innerHTML = `
                <h4 class="w-2/3 font-semibold">${title}</h4>  
                <p class="text-gray-500">
                  <i class="fa-light fa-eye"></i>
                  <span class="ml-4">${views}</span>
                </p>
                `;
    readContainer.append(newBlog);
  } else {
    alert("Aready Exists!");
  }
};

// -------------------------------Search By Category-------------------------------
const handleSearchCategory = () => {
  const searchBox = document.getElementById("search-box");
  const searchVal = searchBox.value;
  searchBox.value = "";

  loadPost(true, searchVal);
};

loadPost();
