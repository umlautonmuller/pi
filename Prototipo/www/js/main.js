if(!window.sessionStorage.id_usuario) {
    location.href = 'index.html'
}
var marker
const menu = document.querySelector('div#sidemenu')
const closeMenu = document.querySelector('div.click')
const open = document.querySelector('i.material-icons.menu')

open.addEventListener('click', () => {
    menu.classList.add('open')
    closeMenu.classList.add('open')
})
closeMenu.addEventListener('click', () => {
    menu.classList.remove('open')
    closeMenu.classList.remove('open')
})

const box = document.querySelector('div.popup')
const call = document.querySelector('i#call')

call.addEventListener('click', () => {
    box.style.display = "flex"
})

//------------------------ Map ------------------------//

var map, infoWindow, pos

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 8
    })
    infoWindow = new google.maps.InfoWindow

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
        pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        };

        map.setCenter(pos);
        
        createMarkers();

    }, function() {
        handleLocationError(true, infowindow, map.getCenter());
    });
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infowindow, map.getCenter());
    }
}

var contentString 

async function createMarkers() {
    var request = await fetch('http://200.135.34.110/joaorodrigues/fernando/PHP/chamado/buscar.php')

    var positions = await request.json()

    if(positions.result) {
        positions.body.forEach(element => {
            console.log(element)
            console.log(element.latitude)
            marker = new google.maps.Marker({
                position: { lat: parseFloat(element.latitude), lng: parseFloat(element.longitude) },
                map: map
            })

            contentString = '<div id="content">' +
                '<div id="siteNotice">' +
                '</div>' +
                '<h1 id="firstHeading" class="firstHeading">' + element.nome + '</h1>' +
                '<div id="bodyContent">' +
                '<p>' + element.descricao + '</p>' +
                '</div>' +
                '</div>';
            google.maps.event.addListener(marker, 'click', () => {
                var callInfo = new google.maps.InfoWindow({
                    content: contentString
                })
                callInfo.open(map, marker)
            })
            console.log(marker)
        });
    }

}


function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
                        'Error: The Geolocation service failed.' :
                        'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
}

call.addEventListener('click', () => {
    navigator.geolocation.getCurrentPosition(function(position) {
        pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        };
        console.log(pos)
    }, function() {
        handleLocationError(true, map.getCenter());
    })
})

document.querySelector('input#send').addEventListener('click', async ev => {
    ev.preventDefault()
    box.style.display = "none"
    const name = document.querySelector('input#nome').value.trim()
    const descricao = document.querySelector('textarea#descricao').value.trim()
    const request = await fetch('http://200.135.34.110/joaorodrigues/fernando/PHP/chamado/criar.php?idusuario='+window.sessionStorage.getItem('id_usuario'),{
        method:'POST',
        body: JSON.stringify({
            posicao: pos,
            nome: name,
            descricao: descricao
        })
    })
})
