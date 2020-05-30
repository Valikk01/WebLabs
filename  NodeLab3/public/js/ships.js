$(document).ready(function() {
    fillTable();
    $(`#createUserButton`).on(`click`, createUser);
    $(`#shipsList tbody`).on('click', 'tr button.btn-danger', deleteSpaceStation);
    $(`#shipsList tbody`).on('click', 'tr', showSpaceStationInfo);
    $(`#shipsList tbody`).on('click', 'tr button.btn-edit', editSpaceStation);
    $(`#findUserButton`).on('click', findSpaceStation);
});

function fillTable() {
    $(`#SpaceStationInfoId`).text('');
    $(`#SpaceStationInfoNumber`).text('');
    $(`#SpaceStationInfoNecessity`).text('');
    $(`#SpaceStationInfoCapacity`).text('');
    let tableContent = '';
    $.getJSON('/service/ships', function(data) {
        $.each(data, function() {
            tableContent += `<tr id="${this.id}">`;
            tableContent += `<td>${this.id}</td>`;
            tableContent += `<td>${this.number}</td>`;
            tableContent += `<td>${this.necessity}</td>`;
            tableContent += `<td>${this.capacity}</td>`;
            tableContent += `<td><button type="button" class="btn btn-danger">Delete</button></td>`
            tableContent += `<td><button type="button" class="btn btn-edit">Edit</button></td>`
            tableContent += `</tr>`;
        });
        $(`#shipsList tbody`).html(tableContent);
    });
}

function createUser(event) {
    event.preventDefault();
    let id = $(`#inputId`).val();
    let number = $(`#inputNumber`).val();
    let necessity = $(`#inputNecessity`).val();
    let capacity = $(`#inputCapacity`).val();
    if (!id.trim().length || !number.trim().length || !necessity.trim().length || !capacity.trim().length) {
        alert(`Будь ласка, заповніть всі поля`);
        return;
    }
    $.ajax({
        url: `/service/ships`,
        type: `POST`,
        data: {id: id, number: number, necessity: necessity, capacity: capacity},
        success: function(result) {
            alert(result);
            fillTable();
        }
    });
}

function showSpaceStationInfo(event) {
    event.preventDefault();
    let shipId = $(this).attr("id");
    $.getJSON(`/service/ships/${shipId}`, function(data) {
        $(`#shipInfoId`).text(data.id);
        $(`#shipInfoNumber`).text(data.number);
        $(`#shipInfoNecessity`).text(data.necessity);
        $(`#shipInfoCapacity`).text(data.capacity);
    });
}

function deleteSpaceStation(event) {
    event.preventDefault();
    event.stopImmediatePropagation();
    let data = $(this).parent().parent();
    let id = $(data).find(`td:nth-child(1)`).text();
    let number = $(data).find(`td:nth-child(2)`).text();
    if (confirm(`Ви впевнені,що хочете видалити космічну станцію з id ${id} ?`)) {
        $.ajax({
            url: `/service/ships/${id}`,
            type: `DELETE`,
            success: function(result) {
                alert(result);
                fillTable();
            }
        });
    }
}



function findSpaceStation(event) {
    event.preventDefault();
    event.stopImmediatePropagation();
    let data = $(this).parent().parent();
    let id = $(data).find(`td:nth-child(1)`).text();
    let id1 = $(`#inputWhatToFind`).val();
    console.log(id1);
        $.ajax({
            url: `/service/ships/${id1}`,
            type: `GET`,
            data: {id: id1},
            success: function(result) {
                alert(result);
                fillTable();
            }
        });
}

function editSpaceStation(event) {
    event.preventDefault();
    let data = $(this).parent().parent();
    let id = $(data).find(`td:nth-child(1)`).text();
    let number = $(`#inputNumber`).val();
    let necessity = $(`#inputNecessity`).val();
    let capacity = $(`#inputCapacity`).val();
    // if ( !name.trim().length || !mass.trim().length || !capacity.trim().length) {
    //     alert(`Please, fill in all of the fields`);
    //     return;
    // }

    $.ajax({
        url: `/service/ships/${id}`,
        type: `POST`,
        data: {id: id, number:number,necessity:necessity, capacity: capacity},
        success: function (result) {
            alert(result);
            fillTable();
        }
    });
}
