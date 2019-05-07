var vertex_counter = 1;
var edges_counter = 1;


$(document).ready(function () {
    var i = 1;
    $("#add_vertex").click(function () {
        $('#addr' + i).html("<td>" + (i + 1) + "</td><td><input name='vertex_name_" + i + "' type='text' placeholder='Назва' class='form-control input-md'  /> ");

        $('#table_vertex').append('<tr id="addr' + (i + 1) + '"></tr>');
        i++;
        vertex_counter = i;
    });
    $("#delete_vertex").click(function () {
        if (i > 1) {
            $("#addr" + (i - 1)).html('');
            i--;
            vertex_counter = i;
        }
    });

});

$(document).ready(function () {
    var i = 1;
    $("#add_edges").click(function () {
        $('#addr_' + i).html("<td>" + (i + 1) + "</td><td><input name='src_" + i + "' type='text' placeholder='Звідки' class='form-control input-md'  /> </td><td><input  name='dest_" + i + "' type='text' placeholder='Куди'  class='form-control input-md'></td><td><input  name='weight_" + i + "' type='text' placeholder='Вага'  class='form-control input-md'></td>");

        $('#table_edges').append('<tr id="addr_' + (i + 1) + '"></tr>');
        i++;
        edges_counter = i;
    });
    $("#delete_edges").click(function () {
        if (i > 1) {
            $("#addr_" + (i - 1)).html('');
            i--;
            edges_counter = i;
        }
    });

});

$(document).ready(function () {
    $("#graph_operate").submit(function (e) {
        e.preventDefault();
    }).validate({
        rules: {
            name: {
                required: true,
                maxlength: 200,
            }
        },
        messages: {
            name: {
                required: "Це поле обов'язкове для заповнення",
                maxlength: "Максимальне число символів - 200",
            },
        },
        submitHandler: function (form) {
            var data = new FormData($('#graph_operate').get(0));
            data.append('vertex_counter', vertex_counter);
            data.append('edges_counter', edges_counter);
            var algorithm = '';
            if (document.getElementById('page_rank').checked) {
                algorithm = "page_rank"
            } else if (document.getElementById('label_propagation').checked) {
                algorithm = "label_propagation"
            }
            data.append('algorithm',algorithm);
            $.ajax({
                url: "/graph/operate/",
                type: "POST",
                data: data,
                cache: false,
                processData: false,
                contentType: false,
                success: function (data) {
                    alert("Good!")
                }
            });
            return false;
        }
    });
});