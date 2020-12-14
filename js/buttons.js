document.querySelector("#btn-editor").addEventListener("click", function () {
  const display = document.querySelector("#editor").style.display;
  console.log("btn-editor, diplay : ", display);

  if (display === "inline-block") {
    document.querySelector("#editor").style.display = "none";
  } else {
    document.querySelector("#editor").style.display = "inline-block";
  }
});

document.querySelector("#btn-tutorial").addEventListener("click", function () {
  const display = document.querySelector("#tutorial").style.display;
  console.log("btn-editor, diplay : ", display);

  if (display === "inline-block") {
    document.querySelector("#tutorial").style.display = "none";
  } else {
    document.querySelector("#tutorial").style.display = "inline-block";
  }
});
