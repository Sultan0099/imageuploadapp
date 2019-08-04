upload.onchange = function() {
  imageLabel.innerHTML = upload.files[0].name;
};

uploadBtn.onclick = function() {
  const fileFeild = upload;
  const formData = new FormData();
  formData.append("file", fileFeild.files[0]);
  progressbar.style.width = "100%";

  fetch("/image", {
    method: "POST",
    body: formData,
    headers: new Headers()
  })
    .then(res => {
      if (res.status === 404) {
        window.location = "/404.html";
      }

      return res.text();
    })
    .then(msg => {
      if (msg === "image save") {
        setInterval(() => {
          window.location = "/";
        }, 1000);
      } else {
        console.log(msg);
      }
    })
    .catch(err => console.log(err));
};

window.onload = function() {
  fetch("/image", {})
    .then(res => res.json())
    .then(images => {
      if (!images) {
        imageContainer.innerHTML = "no image";
      } else {
        return appendImages(images);
      }
    })
    .catch(err => console.log(err));
};

function appendImages(images) {
  // imageContainer.innerHTML = images.map(image => {
  //   return `<figure id=${image._id}><a href=${
  //     image.path
  //   } target="blank"><img  src=${image.path} alt="" /></a></figure>`;
  // });

  images.forEach(image => {
    imageContainer.innerHTML += `<figure id=${image._id}><a href=${
      image.path
    } target="blank"><img  src=${image.path} alt="" /></a>
    </figure>`;
  });
}
