// Toggle dropdown on click
document.querySelector(".dropbtn").addEventListener("click", function () {
  let dropdown = document.querySelector(".dropdown-content");

  if (dropdown.style.display === "block") {
    dropdown.style.opacity = "0";
    dropdown.style.transform = "translateY(12px)";
    setTimeout(() => (dropdown.style.display = "none"), 300);
  } else {
    dropdown.style.display = "block";
    setTimeout(() => {
      dropdown.style.opacity = "1";
      dropdown.style.transform = "translateY(0)";
    }, 10);
  }
});

// Close dropdown when clicking outside
window.addEventListener("click", function (e) {
  if (!e.target.matches(".dropbtn")) {
    let dropdown = document.querySelector(".dropdown-content");
    if (dropdown.style.display === "block") {
      dropdown.style.opacity = "0";
      dropdown.style.transform = "translateY(12px)";
      setTimeout(() => (dropdown.style.display = "none"), 300);
    }
  }
})
