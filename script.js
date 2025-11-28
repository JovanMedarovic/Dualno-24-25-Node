const listElement = document.getElementById("listToShow");

const inputElement = document.getElementById("inputPostName");
const addBtn = document.getElementById("addPostBtn");

// Prikupljanje podataka preko "fetch" funkcije, uz pomoc GET metode
const getData = async () => {
  const response = await fetch("http://localhost:3000/posts");
  const posts = await response.json();
  posts.map((post) => {
    const deleteBtnElement = document.createElement("button");
    deleteBtnElement.textContent = "X";
    const pElement = document.createElement("p");
    pElement.textContent=`${post.title} ------ views: ${post.views}`;
    const liElement = document.createElement("li");
    liElement.appendChild(pElement);
    liElement.appendChild(deleteBtnElement);
    listElement.appendChild(liElement);
  });
};
getData();

// postovanje podataka preko "fetch" funkcije, uz pomoc POST metode
// const post3 = { id: "3", title: "another title 3", views: 300 }; // mockovan payload

const postData = async (payload) => {
  const response = await fetch("http://localhost:3000/posts", {
    method: "POST",
    body: JSON.stringify(payload),
  });
  const status = await response.status;
  console.log(status);
};

addBtn.addEventListener("click", () => {
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

// Izmena podataka preko "fetch" funkcije, uz pomoc PUT metode
const post3Modified = {
  id: "3",
  title: "Modified another title 3",
  views: 350,
}; // mockovan payload

const putData = async (payload) => {
  const response = await fetch(`http://localhost:3000/posts/${payload.id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
  const status = await response.status;
  console.log(status);
};

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

// deleteData(3);
