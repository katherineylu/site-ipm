

let slideIndex = 0;
showSlides();

function showSlides() {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1}
  if (slides[slideIndex-1])
    slides[slideIndex-1].style.display = "block";
  setTimeout(showSlides, 6000); // Change image every 2 seconds
}

const filterGlasses = (category) => {
    const filterButtons = document.getElementsByClassName('filter-button');
    const selectedElements = document.getElementsByClassName(category);
    const selectedButton = document.getElementById('btn-' + category);
    const isActive = selectedButton.classList.contains('active');
    if (!isActive) {
        for (let button of filterButtons) {
            button.classList.remove('active');
        }
        selectedButton.classList.add('active');
        showAll();
        for (let element of selectedElements) {
            element.style.display = 'none';
        }
    }
}

const showAllGlasses = () => {
    const filterButtons = document.getElementsByClassName('filter-button');
    const selectedButton = document.getElementById('btn-all');
    const isActive = selectedButton.classList.contains('active');
    if (!isActive) {
        for (let button of filterButtons) {
            button.classList.remove('active');
        }
        selectedButton.classList.add('active');
        showAll();
    }
}

const showAll = () => {
    const allElements = document.getElementsByClassName('glasses-item');
    for (let element of allElements) {
        element.style.display = 'flex';
    }
}