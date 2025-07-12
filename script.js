// Creating a map
const lat = 50.517796;
const lng = 30.239714;
var map = L.map('map').setView([lat , lng], 13);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

 var markers = [
    [50.518456, 30.232532, "Парк Незнайка",],
    [50.508210, 30.231003, "Сквер «Центральний»"],
    [50.524603, 30.238409, "Парк 3аріфи Алієвої"],
    [50.526161, 30.238150, "Парк ім. Правика"],
    [50.511666, 30.258098, "Набережна Ірпеня"],
    [50.515152, 30.253308, "Парк письменників"],
    [50.519831, 30.244599, "Центральна площа Ірпінь"],
    // [50.522029, 30.243099, "Сквер імені Володимира Сидорука"],
    [50.521422, 30.226009, "Парк при Державному податковому університеті"],
    [50.530704, 30.234150, "Дубки"],
    // [50.534746, 30.253962, "Покровский Парк"],
    [50.519013, 30.210398, "Парк мами"],
    // [50.514238, 30.206267, "Мужеловський Парк"],
    // // Ещё один по сути кусок леса, за который борются с застройщиками
    [50.516709, 30.210162, "Гідрологічний заказник Криничка"],
    // [50.512234, 30.237026, "Пушкинський сквер"],
    // [50.529534, 30.263676, "Парк Героїв"],
    // [50.530825, 30.249682, "Парк Героїв АТО"],
    // // Он же парк Котляревського. От парка одно название, хотя кусок леса с тропинками тоже может кому-то понравится. 
    // // Постоянные войны с застройщиками, возможно назвали парком исключительно для спасения от застройки.
    // [50.518030, 30.253876, "Каштаны???"],
    // [50.532315, 30.260321, "Парк ім. Стельмаха"],
    // [50.536167, 30.274885, "парк Курган"],
    // [50.540535, 30.268112, "Туристическая зона Лісова Стежка"], 
    // [50.515714, 30.198421, "3 ???"],
    // [50.508586, 30.235096, "4 ???"],
    // [50.526177, 30.261045, "8 ???"],
    // [50.532125, 30.268691, "9 ???"],
    // [50.531231, 30.269110, "10 ???"],
    // [50.535738, 30.262569, "11 ???"],
    // [50.542963, 30.271093, "12 ???"],
    // [50.543563, 30.281093, "13 ???"],
];

for (var i=0; i<markers.length; i++) {     
    var marker = L.marker([markers[i][0], markers[i][1]]).addTo(map)
    marker.bindPopup(markers[i][2])
    if (markers[i][2] == "Парк Незнайка") {
      marker.openPopup()
    }
    marker.on("click", toggleBlock)
    function toggleBlock(e){
        const allBlocks = document.querySelectorAll("[data-name]")
        const curentBlock = document.querySelector(`[data-name="${e.target._popup._content}"]`)
        allBlocks.forEach((block) => block.classList.add("hidden"))
        curentBlock.classList.remove("hidden")     
    }
}

// Reset map button
const htmlTemplate =
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path d="M32 18.451L16 6.031 0 18.451v-5.064L16 .967l16 12.42zM28 18v12h-8v-8h-8v8H4V18l12-9z" /></svg>';


const customControl = L.Control.extend({
  options: {
    position: "topleft",
  },

  onAdd: function (map) {
    console.log(map.getCenter());
    const btn = L.DomUtil.create("button");
    btn.title = "Відцентрувати мапу";
    btn.innerHTML = htmlTemplate;
    btn.className += "leaflet-bar back-to-home hidden";

    return btn;
  },
});

map.addControl(new customControl());

map.on("moveend", getCenterOfMap);

const buttonBackToHome = document.querySelector(".back-to-home");

function getCenterOfMap() {
  buttonBackToHome.classList.remove("hidden");

  buttonBackToHome.addEventListener("click", () => {
    map.flyTo([lat, lng], 13);
  });

  map.on("moveend", () => {
    const { lat: latCenter, lng: lngCenter } = map.getCenter();

    const latC = latCenter.toFixed(3) * 1;
    const lngC = lngCenter.toFixed(3) * 1;

    const defaultCoordinate = [+lat.toFixed(3), +lng.toFixed(3)];

    const centerCoordinate = [latC, lngC];

    if (compareToArrays(centerCoordinate, defaultCoordinate)) {
      buttonBackToHome.classList.add("hidden");
    }
  });
}


const compareToArrays = (a, b) => JSON.stringify(a) === JSON.stringify(b);

// Slider
const swiper = new Swiper('.swiper', {
  direction: 'vertical',
  loop: true,
  autoplay: {
    delay: 3000,
  },
  speed: 500,
  spaceBetween: 100,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  scrollbar: {
    el: '.swiper-scrollbar',
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: 'true',
  },
});