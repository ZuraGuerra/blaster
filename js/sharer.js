var rightHere = window.location.href;

var fbLink = "https://www.facebook.com/sharer/sharer.php?u="+rightHere;
document.getElementById("fb").setAttribute("href", fbLink);

var twLink = "https://twitter.com/intent/tweet?text=¡Checa el nuevo juego de Blaster y Nickelodeon!&url="+rightHere;
document.getElementById("tw").setAttribute("href", twLink);

var gpLink = "https://plus.google.com/share?url="+rightHere;
document.getElementById("gp").setAttribute("href", gpLink);