const listElement = document.getElementById("listToShow");

const inputElement = document.getElementById("inputPostName");
const addBtnElement = document.getElementById("addPostBtn");

const inputEditElement = document.getElementById("editPostName");
const editPostBtnElement = document.getElementById("editPostBtn");

// Prikupljanje podataka preko "fetch" funkcije, uz pomoc GET metode
const getData = async () => {
  const response = await fetch("http://localhost:3000/posts");
  const posts = await response.json();
  posts.map((post) => {
    const liElement = document.createElement("li");
    const deleteBtnElement = document.createElement("button");
    deleteBtnElement.addEventListener('click', async () => {
      await fetch(`http://localhost:3000/posts/${post.id}`,{
          method:"DELETE",
      }).then(() => {
        liElement.remove();
      }).catch((reason) => {
        console.error(reason);
      });
    });
    deleteBtnElement.textContent = "X";

    const editBtnElement = document.createElement("button");
    editBtnElement.textContent = "Edit";
    editBtnElement.disabled = false;
    editBtnElement.addEventListener('click',() => {
      editBtnElement.disabled = true;
      inputEditElement.value = post.title;
      editPostBtnElement.addEventListener("click", async () => {
        const payload = {
          id: post.id,
          title: inputEditElement.value,
          views: post.views,
        }
        putData(payload).then(() => {
          listElement.innerHTML=``;
          getData();
        });
      });
    });
    
    const pElement = document.createElement("p");
    pElement.textContent=`${post.title} ------ views: ${post.views}`;
    
    liElement.appendChild(pElement);
    liElement.appendChild(deleteBtnElement);
    liElement.appendChild(editBtnElement);
    listElement.appendChild(liElement);
  });
};


// postovanje podataka preko "fetch" funkcije, uz pomoc POST metode
// const post3 = { id: "3", title: "another title 3", views: 300 }; // mockovan payload

const postData = async (payload) => {
  await fetch("http://localhost:3000/posts", {
    method: "POST",
    body: JSON.stringify(payload),
  }).then(response => {console.log(response.json())});
};

// Izmena podataka preko "fetch" funkcije, uz pomoc PUT metode
// const post3Modified = {
//   id: "3",
//   title: "Modified another title 3",
//   views: 350,
// }; // mockovan payload

const putData = async (payload) =>
  await fetch(`http://localhost:3000/posts/${payload.id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });

// putData(post3Modified);

// Brisanje podataka preko "fetch" funkcije, uz pomoc DELTE metode
const deleteData = async (id) => {
  const response = await fetch(`http://localhost:3000/posts/${id}`, {
    method: "DELETE",
  });
  const status = await response.status;
  console.log("response: ", response);
  console.log(status);
};

getData();

addBtnElement.addEventListener("click", () => {
  console.log("test");
  const payload = {
    title: inputElement.value,
    views: 0,
  };
  postData(payload);
  inputElement.value = "";
  const liElement = document.createElement("li");
  liElement.textContent = `${payload.title} ------ views: ${payload.views}`;
  listElement.appendChild(liElement);
});