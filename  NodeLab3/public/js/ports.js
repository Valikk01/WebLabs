$(document).ready(function() {
    fillTable();
    $(`#createUserButton`).on(`click`, createUser);
    $(`#portsList tbody`).on('click', 'tr button.btn-danger', deletePlanet);
    $(`#portsList tbody`).on('click', 'tr button.btn-edit', editPlanet);
    $(`#findUserButton`).on('click', findPlanet);
    $(`#portsList tbody`).on('click', 'tr', showPlanetInfo);
});

function fillTable() {
    $(`#portsInfoId`).text('');
    $(`#portsInfoName`).text('');
    $(`#portsInfoMass`).text('');
    $(`#portsInfoCapacity`).text('');
    let tableContent = '';
    $.getJSON('/service/ports', function(data) {
        $.each(data, function() {
            tableContent += `<tr id="${this.id}">`;
            tableContent += `<td>${this.id}</td>`;
            tableContent += `<td>${this.name}</td>`;
            tableContent += `<td>${this.mass}</td>`;
            tableContent += `<td>${this.capacity}</td>`;
            tableContent += `<td><button type="button" class="btn btn-danger">Видалити</button></td>`
            tableContent += `<td><button type="button" class="btn btn-edit">Редагувати</button></td>`
            tableContent += `</tr>`;
        });
        $(`#portsList tbody`).html(tableContent);
    });
}


function createUser(event) {
    event.preventDefault();
    let id = $(`#inputId`).val();
    let name = $(`#inputName`).val();
    let mass = $(`#inputMass`).val();
    let capacity = $(`#inputCapacity`).val();
    if (!id.trim().length || !name.trim().length || !mass.trim().length || !capacity.trim().length) {
        alert(`Будь ласка,заповніть всі поля`);
        return;
    }
    $.ajax({
        url: `/service/ports`,
        type: `POST`,
        data: {id: id, name: name, mass: mass, capacity:capacity},
        success: function(result) {
            alert(result);
            fillTable();
        }
    });
}

function showPlanetInfo(event) {
    event.preventDefault();
    let portId = $(this).attr("id");
    $.getJSON(`/service/ports/${portId}`, function(data) {
        $(`#portsInfoId`).text(data.id);
        $(`#portsInfoName`).text(data.name);
        $(`#portsInfoMass`).text(data.mass);
        $(`#portsInfoCapacity`).text(data.capacity);
    });
}

function deletePlanet(event) {
    event.preventDefault();
    event.stopImmediatePropagation();
    let data = $(this).parent().parent();
    let id = $(data).find(`td:nth-child(1)`).text();
    if (confirm(`Ви впевнені,що хочете видалити Порт з id ${id} ?`)) {
        $.ajax({
            url: `/service/ports/${id}`,
            type: `DELETE`,
            success: function(result) {
                alert(result);
                fillTable();
            }
        });
    }
}

function findPlanet(event) {
    event.preventDefault();
    event.stopImmediatePropagation();
    let data = $(this).parent().parent();
    let id = $(data).find(`td:nth-child(1)`).text();
    let id1 = $(`#inputWhatToFind`).val();
        $.ajax({
            url: `/service/ports/${id1}`,
            type: `GET`,
            data: {id: id1},
            success: function(result) {
                alert(result);
                fillTable();
            }
        });
}

function editPlanet(event) {
    event.preventDefault();
    let data = $(this).parent().parent();
    let id = $(data).find(`td:nth-child(1)`).text();
    let name = $(`#inputName`).val();
    let mass = $(`#inputMass`).val();
    let capacity = $(`#inputCapacity`).val();
    // if ( !name.trim().length || !mass.trim().length || !capacity.trim().length) {
    //     alert(`Please, fill in all of the fields`);
    //     return;
    // }
    $.ajax({
        url: `/service/ports/${id}`,
        type: `POST`,
        data: {id: id, name: name, mass: mass, capacity:capacity},
        success: function(result) {
            alert(result);
            fillTable();
        }
    });
}