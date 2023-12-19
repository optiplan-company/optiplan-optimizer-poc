function update_global_vars() {
    if ($("#variables-globales").length > 0) {
        actualizar_lista_bloques();
        let content_global_vars = "";
        content_global_vars += "id_piedra = " + id_piedra + "<br/>";
        content_global_vars += "width_piedra = " + width_piedra + "<br/>";
        content_global_vars += "height_piedra = " + height_piedra + "<br/>";
        content_global_vars += "<br/>Bloques Actuales:<br/>";
        for (let i = 0; i < bloques_actuales.length; i++) {
            content_global_vars += bloques_actuales[i].width + "(w)";
            content_global_vars += bloques_actuales[i].height + "(h)";
            content_global_vars += bloques_actuales[i].quantity + "(q)<br/>";
        }
        content_global_vars += "<br/>Bloques Actuales Expanded:<br/>";
        for (let i = 0; i < bloques_actuales_expanded.length; i++) {
            content_global_vars += bloques_actuales_expanded[i].width + "(w)";
            content_global_vars += bloques_actuales_expanded[i].height + "(h)";
            content_global_vars += bloques_actuales_expanded[i].area + "(a)";
            content_global_vars += bloques_actuales_expanded[i].color + "(c)<br/>";
        }
        document.getElementById("variables-globales").innerHTML = content_global_vars;
    }
}

function update_info_radio() {
    radio_selected = $("[name='grosor_input']:checked");
    id_piedra = $(radio_selected).data("id_piedra");
    width_piedra = $(radio_selected).data("width_piedra") * escala;
    height_piedra = $(radio_selected).data("height_piedra") * escala;
    price_product = $(radio_selected).data("price");
    espesor_str = $(radio_selected).data("espesor");
    textura_str = $(radio_selected).data("textura");
    cod_inv = $(radio_selected).data("cod_inv");
    $("#piedra_id").val(id_piedra);
    $("#00N2J00000AlKqg").val(cod_inv);
    $("#00N2J00000Al44q").val($(radio_selected).data("espesor"));
    $("#00N2J00000Al450").val($(radio_selected).data("piedra"));
    $(".container-info-panel span").html(width_piedra + " x " + height_piedra);
    $(".container-info-panel").html('<div class="row"><div class="col-md-6 col-md-offset-3 col-xs-12">' +
        '<table><thead><tr><th colspan="2">Datos</th></tr></thead>' +
        '<tbody>' +
        '<tr><td>Piedra</td><td><span>' + $(".nombre_priedra_" + id_piedra).html() + '</span></td></tr>' +
        '<tr><td>Espesor</td><td><span>' + espesor_str + 'mm. </span></td></tr>' +
        '<tr><td>Dimension</td><td><span>' + (width_piedra / escala) + 'cm. x ' + (height_piedra / escala) + 'cm.</span></td></tr>' +
        '<tr><td>Textura</td><td><span>' + textura_str + '</span></td></tr>' +
        '</tbody></table></div></div>');
    $("#textura").val(textura_str);
}

function seleccionar_piedra() {
    $(".piedra").click(function () {
        if (!$(this).hasClass("selected")) {
            $(".piedra").removeClass("selected");
            $(this).addClass("selected");
            piedra = $(this).data("id_piedra");
            cod_inv = $(this).data("cod_inv");
            if (id_piedra != piedra) {
                $("[name='grosor_input']").prop('checked', false);
                id_piedra = 0;
                width_piedra = 0;
                height_piedra = 0;
                $("#piedra_id").val(id_piedra);
                $("#00N2J00000AlKqg").val(cod_inv);
            }
        }
    });
    $("[name='grosor_input']").click(function () {
        update_info_radio();


    });
}

function accion_agregar_bloque(row) {
    if (typeof row === 'undefined') {
        row = { Nombre: "", Ancho: "", Alto: "", Cantidad: "", Posicion: 0, Arriba: "no", Abajo: "no", Derecha: "no", Izquierda: "no", string_borde: "off|off|off|off" };
    }
    $(".container-bloques").append(
        '<div class="bloque pending">' +
        '<input type="text" placeholder="Nombre" name="etiqueta[]" class="etiqueta" value="' + row.Nombre + '">' +
        '<input type="text" placeholder="Largo" name="width[]" value="' + row.Ancho + '" oninput="this.value=this.value.replace' + "(/[^0-9]/g,'')" + ';" class="width">' +
        '<input type="text" placeholder="Ancho" name="height[]" value="' + row.Alto + '" oninput="this.value=this.value.replace' + "(/[^0-9]/g,'')" + ';" class="height">' +
        '<input type="text" placeholder="Cant." name="quantity[]" value="' + row.Cantidad + '" oninput="this.value=this.value.replace' + "(/[^0-9]/g,'')" + ';" class="quantity">' +
        '<select name="position[]"  class="position cond_tipouser">' +
        '<option value="0">Cualquiera</option>' +
        '<option value="1" ' + ((row.Posicion == 1) ? "Selected" : "") + '>Horizontal</option>' +
        '<option value="2" ' + ((row.Posicion == 2) ? "Selected" : "") + '>Vertical</option>' +
        '</select>' +
        '<div class="contenedor_borde borde">' +
        '   <input type="hidden" name="string_borde[]" value="' + row.string_borde + '" class="string_borde" > ' +
        '   <input type="checkbox" name="borde_arriba[]" class="borde borde_arriba" ' + ((row.Arriba == "si") ? "checked" : "") + ' >' +
        '   <input type="checkbox" name="borde_derecha[]" class="borde borde_derecha"' + ((row.Derecha == "si") ? "checked" : "") + ' >' +
        '   <input type="checkbox" name="borde_abajo[]" class="borde borde_abajo"' + ((row.Abajo == "si") ? "checked" : "") + ' >' +
        '   <input type="checkbox" name="borde_izquierda[]" class="borde borde_izquierda"' + ((row.Izquierda == "si") ? "checked" : "") + ' >' +
        '</div>' +
        '<span class="btn-eliminar-bloque">-</span>' +
        '</div>'
    );
    eliminar_bloque();
}
function accion_agregar_bloques(row) {
    if (typeof row === 'undefined') {
        row = { Nombre: "", Ancho: "", Alto: "", Cantidad: "", Posicion: 0, Arriba: "no", Abajo: "no", Derecha: "no", Izquierda: "no", string_borde: "off|off|off|off" };
    }
    $(".container-bloques").append(
        '<div class="bloque pending">' +
        '<input type="text" placeholder="Nombre" name="etiqueta[]" class="etiqueta" value="' + row.Nombre + '">' +
        '<input type="text" placeholder="Largo" name="width[]" value="' + row.Ancho + '" oninput="this.value=this.value.replace' + "(/[^0-9]/g,'')" + ';" class="width">' +
        '<input type="text" placeholder="Ancho" name="height[]" value="' + row.Alto + '" oninput="this.value=this.value.replace' + "(/[^0-9]/g,'')" + ';" class="height">' +
        '<input type="text" placeholder="Cant." name="quantity[]" value="' + row.Cantidad + '" oninput="this.value=this.value.replace' + "(/[^0-9]/g,'')" + ';" class="quantity">' +
        '<select name="position[]"  class="position cond_tipouser">' +
        '<option value="0">Cualquiera</option>' +
        '<option value="1" ' + ((row.Posicion == 1) ? "Selected" : "") + '>Horizontal</option>' +
        '<option value="2" ' + ((row.Posicion == 2) ? "Selected" : "") + '>Vertical</option>' +
        '</select>' +
        '<div class="contenedor_borde borde">' +
        '   <input type="hidden" name="string_borde[]" value="' + row.string_borde + '" class="string_borde" > ' +
        '   <input type="checkbox" name="borde_arriba[]" class="borde borde_arriba" ' + ((row.Arriba == "si") ? "checked" : "") + ' >' +
        '   <input type="checkbox" name="borde_derecha[]" class="borde borde_derecha"' + ((row.Derecha == "si") ? "checked" : "") + ' >' +
        '   <input type="checkbox" name="borde_abajo[]" class="borde borde_abajo"' + ((row.Abajo == "si") ? "checked" : "") + ' >' +
        '   <input type="checkbox" name="borde_izquierda[]" class="borde borde_izquierda"' + ((row.Izquierda == "si") ? "checked" : "") + ' >' +
        '</div>' +
        '<span class="btn-eliminar-bloque">-</span>' +
        '</div>'
    );
    eliminar_bloque();
}
function agregar_bloque() {
    $(".btn-agregar-bloque").on("click", function (event) {
        accion_agregar_bloque();
    });
    $(".btn-agregar-bloques").on("click", function (event) {
        accion_agregar_bloques();
    });
}

function eliminar_bloque() {
    $(".bloque.pending .btn-eliminar-bloque").on("click", function (event) {
        console.log("no se elimina")
        $(this).closest(".bloque").remove();
    });
    $(".bloque").removeClass("pending");
}

function actualizar_lista_bloques() {
    bloques_actuales = [];
    bloques = $(".container-bloques .bloque");
    for (let i = 0; i < bloques.length; i++) {
        bloques_actuales.push({
            width: parseFloat($(bloques[i]).find(".width").val()),
            height: parseFloat($(bloques[i]).find(".height").val()),
            quantity: parseFloat($(bloques[i]).find(".quantity").val()),
        });
    }
    if ($('#canvas').length > 0) {
        let canvas_content = $('#canvas')[0].getContext("2d");
        let cols = ["201, 201, 224", "195, 195, 202", "243, 200, 200", "210, 189, 189", "225, 192, 232", "192, 220, 232", "192, 232, 213"];
        bloques_actuales_expanded = [];
        for (let i = 0; i < bloques_actuales.length; i++) {
            let color_for_group_block = cols[i % cols.length];
            for (let j = 0; j < bloques_actuales[i].quantity; j++) {
                // Create gradient
                //var grd = canvas_content.createLinearGradient(0, 0, bloques_actuales[i].w, 0);
                //grd.addColorStop(0, "rgba(" + color_for_group_block + ", 1)");
                //grd.addColorStop(1, "rgba(" + color_for_group_block + ", 0.75)");
                grd = 'black';
                bloques_actuales_expanded.push({
                    width: bloques_actuales[i].width,
                    height: bloques_actuales[i].height,
                    area: bloques_actuales[i].width * bloques_actuales[i].height,
                    color: grd,
                });
            }
        }
    }
}

function sort_blocks() {
    console.log("sort blocks");
}

function optimize_blocks() {
    console.log("optimize block function");
    packer = new Packer(width_piedra, height_piedra);
}

// $(document).ready(function () {
function ejecutar() {

    seleccionar_piedra();
    agregar_bloque();
    eliminar_bloque();
    /*$("#boton-calcular").click(optimize_blocks);*/
    $('.content_input').click(function () {
        console.log($(this).find("input").val());
        $(this).find("input[name='grosor_input']").removeAttr("checked");
        $(this).find("input[name='grosor_input']").prop("checked", true);
        $("input[name='grosor_input']").trigger("change");
        $(this).find("input[name='grosor_input']").trigger("change");
        update_info_radio();
    });
    CargarValoresIngresados();

    /*$("#bloques_items").html("");
    bloques = $(".container-bloques .bloque");
    for (i = 0; i < bloques.length; i++) {
        bloque = bloques[i];
        quantity = $(bloque).find('.quantity').val();
        for (j = 0; j < quantity; j++) {
            width_pieza =  parseFloat($(bloque).find('.width').val());
            heigth_pieza = parseFloat($(bloque).find('.height').val());
            grosorescala = grosor_corte * escala;

            max1 = (width_pieza<heigth_pieza)? heigth_pieza:width_pieza;
            min1 = (width_pieza<heigth_pieza)? width_pieza:heigth_pieza;

            max2 = (width_piedra<height_piedra)? height_piedra:width_piedra;
            min2 = (width_piedra<height_piedra)? width_piedra:height_piedra;

            if( (max1 + grosorescala) <= max2){
                heigth_pieza = max1 + grosorescala;
            }
            if( (min1 + grosorescala) <= max2){
                width_pieza = min1 + grosorescala;
            }
            conversion[heigth_pieza] = max1;
            conversion[width_pieza] = min1;
            conversion[max1] = max1;
            conversion[min1] = min1;
          $("#bloques_items").append("<span data-width='" + heigth_pieza + "' data-height='" + width_pieza + "' data-etiqueta='" + $(bloque).find('.etiqueta').val() + "'></span>");
        }
    }*/


    $(".qstone_canvas").remove();
    $(".all_items").html("");
    cantidad_inicial = $("#bloques_items span").length;
    nueva_cantidad = 0;
    while ($("#bloques_items span").length > 0) {

        if (nueva_cantidad != cantidad_inicial) {
            cantidad_inicial = $("#bloques_items span").length;
            $("#boton-calcular").trigger("click");
            nueva_cantidad = $("#bloques_items span").length;
        } else {
            $(".qstone_canvas").first().remove();
            break;
        }
    }


    AdicionarUltimoPanel();

    mostrar_resultados();

};

setInterval(update_global_vars, 6000);;;