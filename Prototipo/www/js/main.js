if(!window.sessionStorage.id_usuario) {
    location.href = 'index.html'
}
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
        center: { lat: -27.0175969, lng: -48.6632205 },
        zoom: 14
    })
    infoWindow = new google.maps.InfoWindow
    // document.addEventListener("deviceready", () => {
        navigator.geolocation.getCurrentPosition(function(position) {
        pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        };

        map.setCenter(pos);
        
        createMarkers();

        }, () => {
            handleLocationError(true, infowindow, map.getCenter());
        })
    // }, false) 
} 

async function createMarkers() {
    let request = await fetch('http://200.135.34.110/joaorodrigues/fernando/PHP/chamado/buscar.php?estado=1', { mode: 'no-cors' })
    let calls = await request.json() 

    if(calls.result) {
        calls.body.forEach(element => {
            let marker = new google.maps.Marker({
                position: { lat: parseFloat(element.latitude), lng: parseFloat(element.longitude) },
                map: map
            })

            let contentString = '<div id="content">' +
                '<div id="siteNotice">' +
                '</div>' +
                '<h1 id="firstHeading" class="firstHeading">' + element.nome + '</h1>' +
                '<div id="bodyContent">' +
                '<p>' + element.descricao + '</p>' +
                '</div>' +
                '</div>';
            google.maps.event.addListener(marker, 'click', () => {
                let callInfo = new google.maps.InfoWindow({
                    content: contentString
                })
                callInfo.open(map, marker)
            })
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
    }, function() {
        handleLocationError(true, map.getCenter());
    })
})

document.querySelector('input#send').addEventListener('click', async ev => {
    ev.preventDefault()
    box.style.display = "none"
    const name = document.querySelector('input#nome').value.trim()
    const descricao = document.querySelector('textarea#descricao').value.trim()
    document.querySelector('input#nome').value = ''
    document.querySelector('textarea#descricao').value = ''
    const request = await fetch('http://200.135.34.110/joaorodrigues/fernando/PHP/chamado/criar.php?idusuario='+window.sessionStorage.getItem('id_usuario'),{
        method:'POST',
        body: JSON.stringify({
            posicao: pos,
            nome: name,
            descricao: descricao
        })
    })
})

document.querySelector('button#cancel').addEventListener('click', async ev => {
    ev.preventDefault()
    box.style.display = "none"
})

