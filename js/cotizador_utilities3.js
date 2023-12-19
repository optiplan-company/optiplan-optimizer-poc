// Begin Validaciones

function format_numeric(n, decimales) {
  n = n.toFixed(decimales);
  n = n * 1;
  return n.toLocaleString("es-CL");
}
var MyAjax = {
  ajaxurl: "/wp-admin/admin-ajax.php",
};

var result_all_items = "";

function validarPrimerPaso() {
  console.log("primer paso");
  if ($(".contenedor-formulario-cotizador input[name=name]").val() == "") {
    alert("Campo nombre es obligatorio");
    return false;
  }
  if ($(".contenedor-formulario-cotizador input[name=last_name]").val() == "") {
    alert("Campo apellido es obligatorio");
    return false;
  }
  if ($(".contenedor-formulario-cotizador input[name=email]").val() == "") {
    alert("Campo email es obligatorio");
    return false;
  }
  if ($(".contenedor-formulario-cotizador input[name=telephone]").val() == "") {
    alert("Campo teléfono es obligatorio");
    return false;
  }
  if ($(".contenedor-formulario-cotizador input[name=company]").val() == "") {
    alert("Campo compañia es obligatorio");
    return false;
  }
  if ($(".contenedor-formulario-cotizador input[name=00N2J00000Aejti]").length > 0) {
    if ($(".contenedor-formulario-cotizador input[name=00N2J00000Aejti]").val() == "") {
      alert("Campo nombre Cliente es obligatorio");
      return false;
    }
  }
  if ($(".contenedor-formulario-cotizador input[name=00N2J00000Aejtn]").length > 0) {
    if ($(".contenedor-formulario-cotizador input[name=00N2J00000Aejtn]").val() == "") {
      alert("Campo Proyecto es obligatorio");
      return false;
    }
  }
  return true;
}
/*function validarPrimerPaso() {
    if (id_piedra == 0) {
        alert('Por favor seleccione una piedra');
        return false;
    } else {
        return true;
    }
}*/

function AdicionarUltimoPanel() {
  if ($("#bloques_items").length > 0) {
    index_last = $(".qstone_canvas").length;
    items_last = $("[name='item_block_" + index_last + "[]']");
    $("#bloques_items").html("");
    if (height_piedra !== undefined) {
      aux_height_piedra = height_piedra;
      height_piedra = height_piedra / 2;
      for (let i = 0; i < items_last.length; i++) {
        heigth_pieza = $(items_last[i]).data("height");
        width_pieza = $(items_last[i]).data("width");
        etiqueta = $(items_last[i]).data("etiqueta");
        arriba = $(items_last[i]).data("arriba");
        derecha = $(items_last[i]).data("derecha");
        izquierda = $(items_last[i]).data("izquierda");
        abajo = $(items_last[i]).data("abajo");
        position = $(items_last[i]).data("position");
        $("#bloques_items").append(
          "<span data-width='" + width_pieza +
          "' data-height='" + heigth_pieza +
          "' data-etiqueta='" + etiqueta +
          "' data-arriba='" + arriba +
          "' data-derecha='" + derecha +
          "' data-izquierda='" + izquierda +
          "' data-abajo='" + abajo +
          "' data-position='" + position +
          "'></span>"
        );
      }
      cantidad_inicial = $("#bloques_items span").length;
      $("#boton-calcular").trigger("click");
      nueva_cantidad = $("#bloques_items span").length;
      $(".qstone_canvas")
        .last()
        .after(
          '<canvas width="' + (width_piedra - 1) + '" height="' + height_piedra + '" class="canvas_nousado" ></canvas>'
        );
      $(".contenedorpaneles").last().remove();
      if (nueva_cantidad == 0) {
        $(".contenedorpaneles").last().remove();
        for (let i = 0; i < items_last.length; i++) {
          heigth_pieza = $(items_last[i]).data("height");
          width_pieza = $(items_last[i]).data("width");
          etiqueta = $(items_last[i]).data("etiqueta");
          arriba = $(items_last[i]).data("arriba");
          derecha = $(items_last[i]).data("derecha");
          izquierda = $(items_last[i]).data("izquierda");
          abajo = $(items_last[i]).data("abajo");
          position = $(items_last[i]).data("position");
          $("#bloques_items").append(
            "<span data-width='" + width_pieza +
            "' data-height='" + heigth_pieza +
            "' data-etiqueta='" + etiqueta +
            "' data-arriba='" + arriba +
            "' data-derecha='" + derecha +
            "' data-izquierda='" + izquierda +
            "' data-abajo='" + abajo +
            "' data-position='" + position +
            "'></span>"
          );
        }
        $("[name='item_block_" + index_last + "[]']").remove();
        $("#boton-calcular").trigger("click");
        $(".qstone_canvas")
          .last()
          .after(
            '<canvas width="' + (width_piedra - 1) + '" height="' + height_piedra + '" class="canvas_nousado" ></canvas>'
          );
      }
      height_piedra = aux_height_piedra;
    }
  }
}

function CargarValoresIngresados() {
  bloques = $(".container-bloques .bloque");
  $("#bloques_items").html("");
  for (i = 0; i < bloques.length; i++) {
    bloque = bloques[i];
    console.log(bloque);
    quantity = $(bloque).find(".quantity").val();
    for (j = 0; j < quantity; j++) {
      width_pieza = parseFloat($(bloque).find(".width").val()) * escala;
      heigth_pieza = parseFloat($(bloque).find(".height").val()) * escala;
      grosorescala = grosor_corte * escala;

      max1 = width_pieza < heigth_pieza ? heigth_pieza : width_pieza;
      min1 = width_pieza < heigth_pieza ? width_pieza : heigth_pieza;

      max2 = width_piedra < height_piedra ? height_piedra : width_piedra;
      min2 = width_piedra < height_piedra ? width_piedra : height_piedra;

      if (max1 + grosorescala <= max2) {
        heigth_pieza = max1 + grosorescala;
      }
      if (min1 + grosorescala <= max2) {
        width_pieza = min1 + grosorescala;
      }
      conversion[heigth_pieza] = max1;
      conversion[width_pieza] = min1;
      conversion[max1] = max1;
      conversion[min1] = min1;

      if ($(bloque).find(".position").val() == 2) {
        width_pieza = min1;
        heigth_pieza = max1;
      }
      if ($(bloque).find(".position").val() == 1) {
        width_pieza = max1;
        heigth_pieza = min1;
      }

      content_data = "<span data-position='" + $(bloque).find(".position").val().toString() +
        "' data-width='" + width_pieza +
        "' data-height='" + heigth_pieza +
        "' data-etiqueta='" + $(bloque).find(".etiqueta").val() +
        "' data-arriba='" + $(bloque).find(".borde_arriba").val() +
        "' data-derecha='" + $(bloque).find(".borde_derecha").val() +
        "' data-abajo='" + $(bloque).find(".borde_abajo").val() +
        "' data-izquierda='" + $(bloque).find(".borde_izquierda").val() +
        "'></span>";
      console.log("CargarValoresIngresados");
      console.log(content_data);
      $("#bloques_items").append(content_data);
    }
  }
  console.log($("#bloques_items"));
}

function validarSegundoPaso_alternative() {
  $(".container-bloques .bloque").removeClass("yellow");
  bloques = $(".container-bloques .bloque");
  areapiedra = width_piedra * height_piedra;
  longitud_menor = width_piedra < height_piedra ? width_piedra : height_piedra;
  longitud_mayor = width_piedra < height_piedra ? height_piedra : width_piedra;

  for (i = 0; i < bloques.length; i++) {
    bloque = bloques[i];
    if ($(bloque).find(".width").val() == "") {
      alert("Por favor complete todos los campos");
      return false;
    }
    if ($(bloque).find(".height").val() == "") {
      alert("Por favor complete todos los campos");
      return false;
    }
    if ($(bloque).find(".quantity").val() == "") {
      alert("Por favor complete todos los campos");
      return false;
    }
    bloque_width = parseFloat($(bloque).find(".width").val());
    bloque_height = parseFloat($(bloque).find(".height").val());
    position = parseFloat($(bloque).find(".position").val());
    /////rodrigo febrero 2023//
    bloque_quantity = parseFloat($(bloque).find(".quantity").val());
    total_borde_bloque = 0;
    if ($(bloque).find(".borde_arriba").is(":checked")) {
      total_borde_bloque += bloque_width;
    }
    if ($(bloque).find(".borde_abajo").is(":checked")) {
      total_borde_bloque += bloque_width;
    }
    if ($(bloque).find(".borde_derecha").is(":checked")) {
      total_borde_bloque += bloque_height;
    }
    if ($(bloque).find(".borde_izquierda").is(":checked")) {
      total_borde_bloque += bloque_height;
    }
    total_metros_borde += (total_borde_bloque * bloque_quantity);
    /////////////////////////////////
    bloque_longitud_menor = bloque_width < bloque_height ? bloque_width : bloque_height;
    bloque_longitud_mayor = bloque_width < bloque_height ? bloque_height : bloque_width;

    bloque_longitud_menor = bloque_longitud_menor * escala;
    bloque_longitud_mayor = bloque_longitud_mayor * escala;

    if (
      !(bloque_longitud_menor <= longitud_menor && bloque_longitud_mayor <= longitud_mayor)
    ) {
      $(bloque).addClass("yellow");
      alert("Existen items que no entraran en la piedra. Revise los items reasaltados en amarillo");
      return false;
    }
    if ((position == 2 && bloque_longitud_mayor > height_piedra) || (position == 1 && bloque_longitud_mayor > width_piedra)) {
      $(bloque).addClass("yellow");
      alert("Existen items que no entraran en la posicipón seleccionada. Revise los items reasaltados en amarillo.");
      return false;
    }
  }


  /////////rofrigo febrero 2023///
  total_metros_borde = parseFloat(total_metros_borde / 100);
  $("#total_metros_borde").val(total_metros_borde);
  $("#00N2J000007UBih").val(total_metros_borde.toString().replace(".", ","));
  //////////////////
  array_sort = ["sort_width", "sort_height", "sort_maxside", "sort_area"];

  sortmethod = "sort_none";
  cantidad_paneles = 999999999;
  porcentaje_global = 0;

  array_sort.forEach(function (element) {
    $("#sort option").removeAttr("selected");
    $("#sort ." + element).prop("selected", true);
    $("#sort").trigger("change");

    $(".contenedorpaneles").remove();
    //paneles_usados = 0;
    CargarValoresIngresados();
    $(".qstone_canvas").remove();
    $(".all_items").html("");
    cantidad_inicial = $("#bloques_items span").length;
    nueva_cantidad = 0;
    contador = 0;
    while ($("#bloques_items span").length > 0) {
      if ((nueva_cantidad = 0)) {
        break;
      }
      if (nueva_cantidad != cantidad_inicial) {
        cantidad_inicial = $("#bloques_items span").length;
        $("#boton-calcular").trigger("click");
        nueva_cantidad = $("#bloques_items span").length;
      }
      contador++;
      if (contador > 200) {
        alert("Error inesperado.");
        return "";
      }
    }
    AdicionarUltimoPanel();
    mostrar_resultados();

    cantidad_paneles_temporal = $(".qstone_canvas").length;
    if ($(".canvas_nousado").length > 0) {
      cantidad_paneles_temporal = parseFloat(cantidad_paneles_temporal) - 0.5;
    }

    //cantidad_paneles_temporal = $(".cantidad_paneles").html();
    cantidad_paneles_temporal = cantidad_paneles_temporal * 1;
    porcentaje_temporal = $(".porcentaje_libre:last").html();
    porcentaje_temporal = porcentaje_temporal * 1;

    if (cantidad_paneles_temporal < cantidad_paneles) {
      sortmethod = element;
      cantidad_paneles = cantidad_paneles_temporal;
      porcentaje_global = porcentaje_temporal;
    } else if (cantidad_paneles_temporal == cantidad_paneles && porcentaje_temporal > porcentaje_global) {
      sortmethod = element;
      cantidad_paneles = cantidad_paneles_temporal;
      porcentaje_global = porcentaje_temporal;
    }
  });

  console.log("metodo escogido " + sortmethod);
  console.log("#sort ." + sortmethod + "--------");

  $("#sort option").removeAttr("selected");
  $("#sort ." + sortmethod).prop("selected", true);
  $("#sort").trigger("change");
  $(".contenedorpaneles").remove();
  //paneles_usados = 0;
  //         $("#sort").trigger("change");
  //      $("#sort").val(element);

  $("#qstone_sort_select").val(sortmethod);

  CargarValoresIngresados();
  console.log("position -----------------------------");
  console.log($("#bloques_items span"));
  console.log("position -----------------------------");

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

  return true;
}
function validarSegundoPaso() {
  if (id_piedra == 0) {
    alert("Por favor seleccione una piedra");
    return false;
  } else {
    return true;
  }
}
function mostrar_resultados() {
  contenedor_canvas = $(".contenedor-resultados").length;
  if (contenedor_canvas > 0) {
    console.log("true");
    Numero_paneles = $(".qstone_canvas").length;
    console.log("Numeros paneles:" + Numero_paneles);
    str_Numero_paneles = Numero_paneles;
    console.log("Numeros paneles:" + str_Numero_paneles);
    N_paneles = Numero_paneles;
    console.log("N_paneles:" + N_paneles);
    if ($(".canvas_nousado").length > 0) {
      Numero_paneles = parseFloat(Numero_paneles) - 0.5;
      str_Numero_paneles = format_numeric(Numero_paneles, 1);
      $(".mensaje_area_gris").show();
    }
    $(".cantidad_paneles").html(str_Numero_paneles);
    $(".price_per_unit").html(format_numeric(price_product, 0));

    width_piedra_escalada = width_piedra / escala;
    height_piedra_escalada = height_piedra / escala;

    console.log("width piedra escalada:" + width_piedra_escalada);
    console.log("height piedra escalada:" + height_piedra_escalada);

    total_area_piedra = width_piedra_escalada * height_piedra_escalada;
    console.log("total area piedra:" + total_area_piedra);
    console.log(width_piedra_escalada);
    console.log(height_piedra_escalada);
    console.log(Numero_paneles);
    mts2_panel = (total_area_piedra * Numero_paneles) / 10000;
    console.log("mt2 panel:" + mts2_panel);
    total_usado_maximo = 0;
    total_libre_maximo = 0;
    total_longitud_de_corte = 0;
    for (let index = 1; index <= N_paneles; index++) {
      total_area = 0;
      longitud_de_corte = 0;

      listacortes = "";
      listacortes += "<div class='col-md-12 col-xs-6'>";
      listacortes += "<table class='table_cortes_" + index + "'>";
      listacortes += "<thead><tr><th colspan='2'>Lista de Cortes (Plancha " + index + ")</th></tr></thead>";
      listacortes += " <tbody>";

      listacortes += " </tbody>";
      listacortes += " </table>";
      listacortes += " </div>";

      $(".info_panel_" + index).html(listacortes);
      var Myarray = [];

      $("[name='item_block_" + index + "[]']").each(function () {
        item_block_width = conversion[$(this).data("width")] / escala;
        item_block_height = conversion[$(this).data("height")] / escala;
        position = $(this).data("position");
        extra_postion = "";
        if (position == 1) {
          extra_postion = "[H]";
        }
        if (position == 2) {
          extra_postion = "[V]";
        }

        item_block_etiqueta = $(this).data("etiqueta");
        total_area += item_block_width * item_block_height;

        index_str = item_block_width + "cmx" + item_block_height + "cm" + extra_postion;
        content_str = item_block_width + "cm x " + item_block_height + "cm " + extra_postion;
        if (!(index_str in Myarray)) {
          Myarray[index_str] = 0;
        }
        Myarray[index_str] = Myarray[index_str] + 1;
        if ($(".table_cortes_" + index + "  ." + index_str).length > 0) {
          $(".table_cortes_" + index + "  ." + index_str).html("<td>" + content_str + " (" + Myarray[index_str] + ")</td><td></td>");
        } else {
          $(".table_cortes_" + index + " tbody").append("<tr class='" + index_str + "'><td>" + content_str + " </td><td></td></tr>");
        }
        if (item_block_width > item_block_height) {
          longitud_de_corte = longitud_de_corte * 1 + item_block_width * 1;
        } else {
          longitud_de_corte = longitud_de_corte * 1 + item_block_height * 1;
        }
        console.log("longitud de width " + item_block_width);
        console.log("longitud de height " + item_block_height);
      });
      console.log(Myarray);

      porcentaje_usado = (total_area * 100) / total_area_piedra;
      porcentaje_libre = ((total_area_piedra - total_area) * 100) / total_area_piedra;
      total_usado_maximo += total_area;
      total_longitud_de_corte += longitud_de_corte;
      total_libre_maximo += total_area_piedra - total_area;

      console.log("longitud de corte por panel " + longitud_de_corte);

      content_item = "";
      content_item += "<div class='col-md-12 col-xs-6'>";
      content_item += "<table>";
      content_item += '<thead><tr><th colspan="2">Estadísticas (Plancha ' + index + ")</th></tr></thead>";
      content_item += "<tbody>";
      content_item += "<tr><td>% Utilizado</td><td>" + format_numeric(porcentaje_usado, 2) + "%</td></tr>";
      content_item += '<tr><td>% No Utilizado</td><td ><span class="porcentaje_libre">' + format_numeric(porcentaje_libre, 2) + "</span>%</td></tr>";
      content_item += "<tr><td>Longitud total de los cortes</td><td>" + format_numeric(longitud_de_corte) + "cm</td></tr>";
      content_item += "</tbody>";
      content_item += "</table>";
      content_item += " </div>";
      $(".info_panel_" + index).append(content_item);
    }
    total_price = mts2_panel * price_product;
    total_price = total_price.toFixed(0);
    total_price = total_price * 1;
    $(".total_price").html(total_price.toLocaleString("es-CL"));
    console.log(mts2_panel);
    $(".cantidad_mts2").html(mts2_panel.toLocaleString("es-CL") + " mts2");

    porcentaje_total_usado_maximo = (total_usado_maximo * 100) / (total_area_piedra * Numero_paneles);
    porcentaje_total_usado_maximo = porcentaje_total_usado_maximo.toFixed(2);
    porcentaje_total_usado_maximo = porcentaje_total_usado_maximo * 1;
    porcentaje_total_libre_maximo = (total_libre_maximo * 100) / (total_area_piedra * Numero_paneles);
    porcentaje_total_libre_maximo = porcentaje_total_libre_maximo.toFixed(2);
    porcentaje_total_libre_maximo = porcentaje_total_libre_maximo * 1;
    $(".tota_utilizado").html(porcentaje_total_usado_maximo.toLocaleString("es-CL"));
    $(".total_no_utilizado").html(porcentaje_total_libre_maximo.toLocaleString("es-CL"));

    /*$(".lista_cortes").html(listacortes);*/

    total_longitud_de_corte_mts = total_longitud_de_corte / 100;
    total_longitud_de_corte_mts = total_longitud_de_corte_mts * 1;
    total_longitud_de_corte_mts_a_pagar = total_longitud_de_corte_mts - cortes_gratuitos * Numero_paneles;
    total_longitud_de_corte_mts_a_pagar = total_longitud_de_corte_mts_a_pagar < 0 ? 0 : total_longitud_de_corte_mts_a_pagar;
    total_longitud_de_corte_mts_a_pagar = total_longitud_de_corte_mts_a_pagar.toFixed(2);
    total_longitud_de_corte_mts_a_pagar = total_longitud_de_corte_mts_a_pagar * 1;
    $(".total_longitud").html(total_longitud_de_corte_mts_a_pagar + " mts");
    $("#total_longitud_real").html(total_longitud_de_corte_mts.toLocaleString("es-CL") + " mts");

    $(".price_cortes").html(format_numeric(price_cortes, 0));
    console.log("calcular total_price_lomngitud:(total_longitud_de_corte_mts_a_pagar)" + total_longitud_de_corte_mts_a_pagar + "(price_cortes):" + price_cortes);
    total_price_lomngitud = total_longitud_de_corte_mts_a_pagar * price_cortes;
    total_price_lomngitud = total_price_lomngitud.toFixed(0);
    total_price_lomngitud = total_price_lomngitud * 1;
    $(".total_price_lomngitud").html(total_price_lomngitud.toLocaleString("es-CL"));
    console.log("calcular total (total_price_lomngitud):" + total_price_lomngitud);
    console.log("calcular total (total price)" + total_price);
    total_price_borde = 0;
    console.log("ok");
    console.log(total_price_borde);
    //if($("#is_compania").val()=="si"){
    total_metros_borde = $("#total_metros_borde").val();
    console.log(total_metros_borde);
    total_price_borde = parseFloat(total_metros_borde * 5000);
    console.log(total_price_borde);
    $(".total_mt2_border").html(total_metros_borde + " mts");
    $(".total_price_borde").html(total_price_borde.toLocaleString("es-CL"));
    //}
    total_pago = total_price_lomngitud + total_price + parseFloat(total_price_borde);
    iva_19 = total_pago * 0.19;
    iva_19 = iva_19.toFixed(0);
    iva_19 = iva_19 * 1;

    total_pago = total_pago + iva_19;
    total_pago = total_pago.toFixed(0);
    total_pago = total_pago * 1;

    $(".total_pago").html(total_pago.toLocaleString("es-CL"));
    $(".iva_19").html(iva_19.toLocaleString("es-CL"));
    $("#00N2J00000Al44g").val(total_pago);
    $("#00N2J00000Al44l").val(mts2_panel.toString().replace(".", ","));
    $("#nro_panel").val(Numero_paneles);
  }
}

/*function validarTercerPaso() {
    if ($(".contenedor-formulario-cotizador input[name=name]").val() == '') {
        alert('Campo nombre es obligatorio');
        return false;
    }
    if ($(".contenedor-formulario-cotizador input[name=last_name]").val() == '') {
        alert('Campo apellido es obligatorio');
        return false;
    }
    if ($(".contenedor-formulario-cotizador input[name=email]").val() == '') {
        alert('Campo email es obligatorio');
        return false;
    }
    if ($(".contenedor-formulario-cotizador input[name=telephone]").val() == '') {
        alert('Campo teléfono es obligatorio');
        return false;
    }
    if ($(".contenedor-formulario-cotizador input[name=company]").val() == '') {
        alert('Campo compañia es obligatorio');
        return false;
    }
    jQuery.ajax({
        type: "POST",
        url: "/wp-admin/admin-ajax.php",
        data: {
            'action': 'guardar_datos_cotizador',
            'tipo':'cotizador corte',
            'info': $("#form_cotizador_de_cortes").serialize()
        },
        success: function(msg) {
            datos = JSON.parse(msg);
            $("#00N2J00000Al6SG").val(datos.id_post);

            width_piedra_escalada = width_piedra / escala;
            height_piedra_escalada = height_piedra / escala;
            //$("#00N2J00000Al44q").val( $(this).data("espesor"));
            //$("#00N2J00000Al450").val( $(this).data("piedra"));
            info_paneles = "Numero de Paneles: " + Numero_paneles + " \r\n";
            info_paneles += "Medida del Panel: " + width_piedra_escalada + "cm. x " + height_piedra_escalada + "cm.\r\n";
            info_paneles += "Espesor: " + $("#00N2J00000Al44q").val() + "mm.\r\n";
            info_paneles += "Textura: " + $("#textura").val() + "\r\n";
            info_paneles += "Longitud de Corte: " + $("#total_longitud_real").html() + " \r\n";
            info_paneles += "Link Cortes: " + $("#site_url").val() + "/nuevo-cotizador/?resultados=" + datos.code_generado + "\r\n";
            $("#00N2J00000Al6IV").val(info_paneles);

            $("#retURL").val($("#site_url").val() + "/nuevo-cotizador/?resultados=" + datos.code_generado);
            //$("#form_cotizador_de_cortes").attr("action", $("#site_url").val() + "/nuevo-cotizador/?resultados=" + datos.code_generado);
            $("#form_cotizador_de_cortes").submit();
        },
        error: function(msg) {
            console.log("error");
            console.log(msg);
        }
    });

    //var data = {
    //  action: "qstone_cotizacion_de_cortes",
    //  datos: $("#form_cotizador_de_cortes").serialize()
    //};
    //jQuery.post(MyAjax.ajaxurl, data, function (response) {
    //  respuesta = JSON.parse(response);
    //  $("#form_cotizador_de_cortes").data("code", respuesta.code);
    //});
    return true;
}*/
function optimize_old() {
  array_sort = ["sort_width", "sort_height", "sort_maxside", "sort_area"];

  sortmethod = "sort_none";
  cantidad_paneles = 999999999;
  porcentaje_global = 0;

  array_sort.forEach(function (element) {
    $("#sort option").removeAttr("selected");
    $("#sort ." + element).prop("selected", true);
    $("#sort").trigger("change");

    $(".contenedorpaneles").remove();
    //paneles_usados = 0;
    CargarValoresIngresados();
    $(".qstone_canvas").remove();
    $(".all_items").html("");
    cantidad_inicial = $("#bloques_items span").length;
    nueva_cantidad = 0;
    contador = 0;
    while ($("#bloques_items span").length > 0) {
      if ((nueva_cantidad = 0)) {
        break;
      }
      if (nueva_cantidad != cantidad_inicial) {
        cantidad_inicial = $("#bloques_items span").length;
        $("#boton-calcular").trigger("click");
        nueva_cantidad = $("#bloques_items span").length;
      }
      contador++;
      if (contador > 200) {
        alert("Error inesperado.");
        return "";
      }
    }
    AdicionarUltimoPanel();
    mostrar_resultados();

    cantidad_paneles_temporal = $(".qstone_canvas").length;
    if ($(".canvas_nousado").length > 0) {
      cantidad_paneles_temporal = parseFloat(cantidad_paneles_temporal) - 0.5;
    }
    cantidad_paneles_temporal = cantidad_paneles_temporal * 1;
    porcentaje_temporal = $(".porcentaje_libre:last").html();
    porcentaje_temporal = porcentaje_temporal * 1;
    if (cantidad_paneles_temporal < cantidad_paneles) {
      sortmethod = element;
      cantidad_paneles = cantidad_paneles_temporal;
      porcentaje_global = porcentaje_temporal;
    } else if (
      cantidad_paneles_temporal == cantidad_paneles && porcentaje_temporal > porcentaje_global
    ) {
      sortmethod = element;
      cantidad_paneles = cantidad_paneles_temporal;
      porcentaje_global = porcentaje_temporal;
    }
  });

  $("#sort option").removeAttr("selected");
  $("#sort ." + sortmethod).prop("selected", true);
  $("#sort").trigger("change");
  $(".contenedorpaneles").remove();

  $("#qstone_sort_select").val(sortmethod);

  CargarValoresIngresados();
  console.log($("#bloques_items span"));

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
  //if($("#is_compania").val()=="si"){
  //  return false;
  //}
  tipo_usuario = $("#tipo_usuario").val();
  console.log($("#form_cotizador_de_cortes").serialize());

  qstone_optimize_sendform();
}
function optimize_new() {
  initCutOptimizer("https://cutoptimizer.suprematik.workers.dev/cutoptimizer.js").then((optimizeFunc) => {
    console.log('imm', optimizeFunc)
    this.optimizeFunc = optimizeFunc
    this.connected()
  });
}
function connected() {

  this.stocks = [{
    width: (width_piedra / 2.5) * 10,
    length: (height_piedra / 2.5) * 10,
    price: 1,
    quantity: 200,
  }]
  this.pieces = [];
  bloques = $(".container-bloques .bloque");
  for (i = 0; i < bloques.length; i++) {
    bloque = bloques[i];
    bloque_width = parseFloat($(bloque).find(".width").val());
    bloque_height = parseFloat($(bloque).find(".height").val());
    position = parseFloat($(bloque).find(".position").val());
    position_bloque = false;
    if (position == 0) {
      position_bloque = true;
    } else if ((position == 1 && bloque_width > bloque_height) || (position == 2 && bloque_height > bloque_width)) {
      aux = bloque_height;
      bloque_height = bloque_width;
      bloque_width = aux;

    }
    bloque_quantity = parseFloat($(bloque).find(".quantity").val());

    if (document.querySelector("#tipo_usuario") == null || document.querySelector("#tipo_usuario").value != "compania") {
      bloque_width = bloque_width * 10;
      bloque_height = bloque_height * 10;
    }

    this.pieces.push({
      "length": bloque_width,
      "width": bloque_height,
      "can_rotate": position_bloque,
      "quantity": bloque_quantity,
      "external_id": i
    });
  }
  console.log(pieces);
  ///   if (this.attributes.price_product) price_product =this.attributes.price_product.value
  this.optimizeFunc(this.stocks, pieces).then(e => {
    // this.shadowOpen.innerHTML = this.generateCanvasPointer()
    console.log("variable e" + e);
    //console.log("variable params" + params);

    //this.runDemoVisualizer(e, params)
  })
}

async function initCutOptimizer(url, workerurl) {
  let myWorker
  let inited, init_error
  let optimized, optimize_error, optimize_started
  let promise = new Promise((ok, nok) => {
    inited = ok
    init_error = nok
  })

  const doparse = (checkStocks, chekarr00) => {
    let promiseoptimize = new Promise((ok, nok) => {
      optimized = ok
      optimize_error = nok
    })
    // console.log('do parse')
    optimize_started = new Date().getTime()
    myWorker.postMessage({
      kind: 'dooptimize',
      payload: {
        stocks: checkStocks,
        pieces: chekarr00
      }
    });
    return promiseoptimize
  }

  if (window.Worker) {
    myWorker = new Worker("data:text/javascript;base64,c2VsZi53YXNtID0gZmFsc2UKLy8gY29uc29sZS5sb2coJ2Zyb20gd29ya2VyJykKc2VsZi5hZGRFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgKGV2ZW50KSA9PiB7CiAgIC8vIGNvbnNvbGUubG9nKCd3b3JrZXIgbGlzdGVuZXInLCBldmVudC5kYXRhKQogICAgY29uc29sZS5sb2coJ2V2ZW50IGRhdGEgdHlwZScsZXZlbnQuZGF0YSkKIC8vICAgaWYgKCFldmVudCB8fCAhZXZlbnQuZGF0YSB8KQogICAgc3dpdGNoIChldmVudC5kYXRhLmtpbmQpIHsKICAgICAgICBjYXNlICdpbml0JzoKICAgLy8gICAgICAgICBjb25zb2xlLmxvZygnZXYnLGV2ZW50LmRhdGEpCiAgICAgLy8gICAgICAgY29uc29sZS5sb2coJ3NsZicsIHNlbGYubG9hZE1vZHVsZSkKICAgICAgICAgICAgY29uc3QgcnM9c2VsZi5sb2FkTW9kdWxlKGV2ZW50LmRhdGEucGF5bG9hZCkKICAgICAgICAgICAgcnMudGhlbihlPT57CiAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdlJyxlKQogICAgICAgICAgICAgICAgc2VsZi5mdW5jPSBlCiAgICAgICAgICAgICAgICBzZWxmLmxvYWRlZD0gdHJ1ZQogICAgICAgICAgICAgICAgc2VsZi5wb3N0TWVzc2FnZSh7a2luZDonaW5pdGVkJ30pCiAgICAgICAgICAgIH0pCiAgICAgICAgICAvLyAgY29uc29sZS5sb2coJ3JzJyxycykKICAgICAgICAgICAgLypzZWxmLmxvYWRNb2R1bGUudGhlbihlID0+IHsKICAgICAgICAgICAgICAgIHNlbGYud2FzbSA9IGUKICAgICAgICAgICAgICAgIHNlbGYubG9hZGVkID0gdHJ1ZQogICAgICAgICAgICB9KSovCgogICAgICAgICAgICBicmVhazsKICAgICAgICBjYXNlICdkb29wdGltaXplJzoKICAgICAgICAgICAgbGV0ICB7IHN0b2NrcywgcGllY2VzIH0gPSBldmVudC5kYXRhLnBheWxvYWQKICAgICAgICAgICAgcGllY2VzID0gc2VsZi5wYXJzZU9uUm90YXRlZChwaWVjZXMpCiAgICAgICAgICAgIC8vICAgICAgICAgICAgY29uc29sZS5sb2coJ2V2ZScsIGV2ZW50LmRhdGEpCiAgICAgICAgICAgY29uc3QgcjAxPSBzZWxmLmZ1bmMoc3RvY2tzLHBpZWNlcykKICAgICAgICAgICAgY29uc29sZS5sb2coJ29wdGltaXplZCcsIHIwMSkKICAgICAgICAgICAgIHNlbGYucG9zdE1lc3NhZ2Uoe2tpbmQ6J29wdGltaXplZCcscmVzdWx0OnIwMSB9KQogICAgICAgICAgICBicmVhazsKICAgIH0KICAgLy8gY29uc29sZS5sb2coJ2RhdDAnKQoKfSkKCgpmdW5jdGlvbiBwYXJzZU9uUm90YXRlZChwaWVjZXMpIHsKICAgIGlmIChwaWVjZXMgJiYgcGllY2VzLmxlbmd0aD4wKSAgeyBwaWVjZXMuZm9yRWFjaChlPT57CiAgICAgICBpZiAoZSAmJiAhT2JqZWN0LmtleXMoZSkuaW5jbHVkZXMoJ2Nhbl9yb3RhdGUnKSkgZS5jYW5fcm90YXRlPXRydWUKCgogICAgfSk7CiAgICBjb25zb2xlLmxvZygnY2hlY2sgcm9hJyxwaWVjZXMgKQogICAgICAgIHJldHVybiBwaWVjZXMKICAgIH0gZWxzZSByZXR1cm4gW10KCgp9CgpmdW5jdGlvbiBwYXJzZVJlc3VsdCAocmVzLCBzb3VyY2UpIHsKICAgIGxldCBwYXJzZWRyZXN1bHQgPSBbXQogICAgdHJ5IHsKICAgICAgICBjb25zdCByZXN1bHQgPSBKU09OLnBhcnNlKHJlcykucmVzdWx0CiAgICAgICAgY29uc29sZS5sb2coJ2Zyb20gcGFyc2VSZXN1bHQgJywgcmVzdWx0KQogICAgICAgIHJlc3VsdC5mb3JFYWNoKHJlcyA9PiB7CiAgICAgICAgICAgIGNvbnN0IGxpbmUgPSByZXMKICAgICAgICAgICAgbGV0IHRvdGFsd2FzdGUgPSAwCiAgICAgICAgICAgIGxpbmUud2FzdGVfcGllY2VzLmZvckVhY2god3AgPT4gewogICAgICAgICAgICAgICAgdHJ5IHsKICAgICAgICAgICAgICAgICAgICBsZXQgcGllY2UgPSB3cC53CiAgICAgICAgICAgICAgICAgICAgaWYgKHBpZWNlKSBwaWVjZSA9IHBpZWNlLnJlcGxhY2UoJ1JlY3QnLCAnJykKICAgICAgICAgICAgICAgICAgICBsZXQgcXQKICAgICAgICAgICAgICAgICAgICBldmFsKCdxdD0nICsgcGllY2UpCiAgICAgICAgICAgICAgICAgICAgd3AueCA9IHF0LnggLy8gey4uLnF0fQogICAgICAgICAgICAgICAgICAgIHdwLnkgPSBxdC55IC8vIHsuLi5xdH0KICAgICAgICAgICAgICAgICAgICB3cC53aWR0aCA9IHF0LndpZHRoIC8vIHsuLi5xdH0KICAgICAgICAgICAgICAgICAgICB3cC5sZW5ndGggPSBxdC5sZW5ndGggLy8gey4uLnF0fQogICAgICAgICAgICAgICAgICAgIHdwLmFyZWEgPSBxdC53aWR0aCAqIHF0Lmxlbmd0aAogICAgICAgICAgICAgICAgICAgIHRvdGFsd2FzdGUgPSB0b3RhbHdhc3RlICsgd3AuYXJlYQogICAgICAgICAgICAgICAgfSBjYXRjaCAoZXgwKSB7fQogICAgICAgICAgICB9KQogICAgICAgICAgICBsaW5lLnRvdGFsd2FzdGUgPSB0b3RhbHdhc3RlCiAgICAgICAgICAgIGxpbmUucGVyY2VudHdhc3RlID0gdG90YWx3YXN0ZSAvIChsaW5lLndpZHRoICogbGluZS5sZW5ndGgpICogMTAwCiAgICAgICAgICAgIGxpbmUudXNhZ2UgPSAxMDAgLSBsaW5lLnBlcmNlbnR3YXN0ZQoKICAgICAgICB9KQogICAgICAgIGNvbnN0IHRvdGFsVXNhZ2UgPSByZXN1bHQubWFwKGUgPT4gZS51c2FnZSkKICAgICAgICBsZXQgaSA9IDA7CiAgICAgICAgbGV0IGFsbHdhc3RlID0gW10KICAgICAgICBsZXQgdG90YWx1c2VkYXJlYSA9IDAKICAgICAgICBsZXQgdG90YWxhcmVhID0gMAogICAgICAgIGlmIChyZXN1bHQgJiYgcmVzdWx0Lmxlbmd0aCA+IDApIHJlc3VsdC5mb3JFYWNoKHJlc2xpbmUgPT4gewogICAgICAgICAgICB0b3RhbGFyZWEgKz0gcmVzbGluZS5sZW5ndGggKiByZXNsaW5lLndpZHRoCiAgICAgICAgICAgIGxldCBwaWVjZWNvdW50ZXIgPSAwCiAgICAgICAgICAgIHJlc2xpbmUucGllY2VzLmZvckVhY2gocGllY2UgPT4gewogICAgICAgICAgICAgICAgdG90YWx1c2VkYXJlYSArPSBwaWVjZS53aWR0aCAqIHBpZWNlLmxlbmd0aAogICAgICAgICAgICAgICAgcGllY2Vjb3VudGVyKysKICAgICAgICAgICAgfSkKICAgICAgICAgICAgbGV0IHd3cCA9IDAKICAgICAgICAgICAgcmVzbGluZS53YXN0ZV9waWVjZXMuZm9yRWFjaCh3cCA9PiB7CiAgICAgICAgICAgICAgICBhbGx3YXN0ZS5wdXNoKHdwKQogICAgICAgICAgICB9KQogICAgICAgICAgICBpKysKICAgICAgICB9KQoKICAgICAgICBsZXQgb2ZmY2F0cyA9IGFsbHdhc3RlLmZpbHRlcihlID0+IChlLmxlbmd0aCA+IDUwICYmIGUud2lkdGggPiA1MCAmJiBlLmxlbmd0aCAqIGUud2lkdGggPiAyNTAwKSkubWFwKGUgPT4gKHsKICAgICAgICAgICAgLi4uZSwKICAgICAgICAgICAgYXJlYTogZS53aWR0aCAqIGUubGVuZ3RoCiAgICAgICAgfSkpCiAgICAgICAgbGV0IG9mZmNhdHNhcmVhID0gb2ZmY2F0cy5tYXAoZSA9PiAoZS5hcmVhKSkucmVkdWNlKChhLCBiKSA9PiBhICsgYiwgMCkKICAgICAgICBsZXQgYWJzb2x1dGVseXdhc3RlYXJlYSA9IHRvdGFsYXJlYSAtICh0b3RhbHVzZWRhcmVhICsgb2ZmY2F0c2FyZWEpCiAgICAgICAgY29uc3Qgc3RhdCA9IHsKICAgICAgICAgICAgdG90YWxBcmVhOiB0b3RhbGFyZWEsCiAgICAgICAgICAgIHdhc3RlQXJlYTogYWJzb2x1dGVseXdhc3RlYXJlYSwKICAgICAgICAgICAgb2ZmY3V0c0FyZWE6IG9mZmNhdHNhcmVhLAogICAgICAgICAgICB3YXN0ZUFyZWFQOiAoYWJzb2x1dGVseXdhc3RlYXJlYSAvIHRvdGFsYXJlYSAqIDEwMCksCiAgICAgICAgICAgIG9mZmN1dHNBcmVhUDogb2ZmY2F0c2FyZWEgLyB0b3RhbGFyZWEgKiAxMDAsCiAgICAgICAgICAgIGFjdGl2ZUFyZWE6IHRvdGFsdXNlZGFyZWEsCiAgICAgICAgICAgIGFjdGl2ZUFyZWFQOiAodG90YWx1c2VkYXJlYSAvIHRvdGFsYXJlYSkgKiAxMDAKICAgICAgICB9CgoKICAgICAgICByZXR1cm4geyBjdXR0aW5nc3RvY2s6IHJlc3VsdCwgc3RhdCwgb2ZmY3V0czogb2ZmY2F0cywgc291cmNlIH0KICAgIH0gY2F0Y2ggKGV4KSB7CiAgICAgICAgY29uc29sZS5sb2coJ2V4JywgZXgpCiAgICB9Cn0KCmFzeW5jIGZ1bmN0aW9uIGxvYWRNb2R1bGUgKHBhdGgpIHsKICAgIHJldHVybiBuZXcgUHJvbWlzZSgob2ssIG5vaykgPT4gewogICAgICAgIHRyeSB7CiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdsb2FkTW9kdWxlIHBhdGgnLCBwYXRoKQogICAgICAgICAgICBpZiAoIXBhdGgpIHBhdGg9Ii4vbm9kZV9tb2R1bGVzL2N1dG9wdGltaXplci9jdXRvcHRpbWl6ZXIuanMiCiAgICAgICAgICAgIGltcG9ydChwYXRoKS50aGVuKChqcykgPT4gewogICAgICAgICAgICAgICAgaWYgKGpzLmRlZmF1bHQpIHsKICAgICAgICAgICAgICAgICAgICBqcy5kZWZhdWx0KCkudGhlbigoKSA9PiB7CgogICAgICAgICAgICAgICAgICAgICAgICBvaygoYSwgYikgPT4gewogICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgIGNvbnNvbGUubG9nKCdmcm9tIGxvYWQgbW9kdWxlIGZ1bmN0aW9uJywgYSxiKQogICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHBhcnNlUmVzdWx0KGpzLm1haW4oYSwgYiksIGIpfSkKICAgICAgICAgICAgICAgICAgICB9KQogICAgICAgICAgICAgICAgfQogICAgICAgICAgICB9KQogICAgICAgIH0gY2F0Y2ggKGV4KSB7CiAgICAgICAgICAgIG5vayhleCkKICAgICAgICB9CiAgICB9KQp9Cg==");
    //    let initPromise =


    myWorker.postMessage({
      kind: 'init',
      payload: url
    });
    myWorker.onmessage = (msg) => {
      if (msg && msg.data && msg.data.kind) {
        switch (msg.data.kind) {
          case 'inited':
            inited(doparse)
            break
          case 'optimized':
            if (msg.data.result && optimize_started) msg.data.result.delay = new Date().getTime() - optimize_started
            // console.log('optimized',optimize_started,msg.data.result )
            optimized(msg.data.result);
            result_all_items = msg.data.result;
            Numero_paneles = msg.data.result.cuttingstock.length;
            console.log(msg.data.result);
            console.log(msg.data.result.cuttingstock);
            console.log(msg.data.result.cuttingstock.length);
            $("#nro_panel").val(Numero_paneles);
            bloque_width = width_piedra / 2.5;
            bloque_height = height_piedra / 2.5;
            radio_selected = $("[name='grosor_input']:checked");
            price_product = $(radio_selected).data("price");
            mts2_panel = ((bloque_width / 100) * (bloque_height / 100)) * Numero_paneles;
            total_price = mts2_panel * price_product;
            total_price = total_price.toFixed(0);
            total_price = total_price * 1;
            $(".total_price").html(total_price.toLocaleString("es-CL"));
            console.log(mts2_panel);
            $(".cantidad_mts2").html(mts2_panel.toLocaleString("es-CL") + " mts2");
            if ($("#tipo_cotizador").length > 0) {

            } else {
              console.log(total_usado_maximo);
              console.log(total_area_piedra);
              console.log(Numero_paneles);
              porcentaje_total_usado_maximo = (total_usado_maximo * 100) / (total_area_piedra * Numero_paneles);
              porcentaje_total_usado_maximo = porcentaje_total_usado_maximo.toFixed(2);
              porcentaje_total_usado_maximo = porcentaje_total_usado_maximo * 1;
              porcentaje_total_libre_maximo = (total_libre_maximo * 100) / (total_area_piedra * Numero_paneles);
              porcentaje_total_libre_maximo = porcentaje_total_libre_maximo.toFixed(2);
              porcentaje_total_libre_maximo = porcentaje_total_libre_maximo * 1;
              $(".tota_utilizado").html(porcentaje_total_usado_maximo.toLocaleString("es-CL"));
              $(".total_no_utilizado").html(porcentaje_total_libre_maximo.toLocaleString("es-CL"));

              /*$(".lista_cortes").html(listacortes);*/

              total_longitud_de_corte_mts = total_longitud_de_corte / 100;
              total_longitud_de_corte_mts = total_longitud_de_corte_mts * 1;
              total_longitud_de_corte_mts_a_pagar = total_longitud_de_corte_mts - cortes_gratuitos * Numero_paneles;
              total_longitud_de_corte_mts_a_pagar = total_longitud_de_corte_mts_a_pagar < 0 ? 0 : total_longitud_de_corte_mts_a_pagar;
              total_longitud_de_corte_mts_a_pagar = total_longitud_de_corte_mts_a_pagar.toFixed(2);
              total_longitud_de_corte_mts_a_pagar = total_longitud_de_corte_mts_a_pagar * 1;
              $(".total_longitud").html(total_longitud_de_corte_mts_a_pagar + " mts");
              $("#total_longitud_real").html(total_longitud_de_corte_mts.toLocaleString("es-CL") + " mts");

              $(".price_cortes").html(format_numeric(price_cortes, 0));
              console.log("calcular total_price_lomngitud:(total_longitud_de_corte_mts_a_pagar)" + total_longitud_de_corte_mts_a_pagar + "(price_cortes):" + price_cortes);
              total_price_lomngitud = total_longitud_de_corte_mts_a_pagar * price_cortes;
              total_price_lomngitud = total_price_lomngitud.toFixed(0);
              total_price_lomngitud = total_price_lomngitud * 1;
              $(".total_price_lomngitud").html(total_price_lomngitud.toLocaleString("es-CL"));
              console.log("calcular total (total_price_lomngitud):" + total_price_lomngitud);
              console.log("calcular total (total price)" + total_price);
              total_price_borde = 0;
              console.log("ok");
              console.log(total_price_borde);
              //if($("#is_compania").val()=="si"){
              total_metros_borde = $("#total_metros_borde").val();
              console.log(total_metros_borde);
              total_price_borde = parseFloat(total_metros_borde * 5000);
              console.log(total_price_borde);
              $(".total_mt2_border").html(total_metros_borde + " mts");
              $(".total_price_borde").html(total_price_borde.toLocaleString("es-CL"));
              //}
              total_pago = total_price_lomngitud + total_price + parseFloat(total_price_borde);
              iva_19 = total_pago * 0.19;
              iva_19 = iva_19.toFixed(0);
              iva_19 = iva_19 * 1;

              total_pago = total_pago + iva_19;
              total_pago = total_pago.toFixed(0);
              total_pago = total_pago * 1;

              $(".total_pago").html(total_pago.toLocaleString("es-CL"));
              $(".iva_19").html(iva_19.toLocaleString("es-CL"));
              $("#00N2J00000Al44g").val(total_pago);
            }
            $("#00N2J00000Al44l").val(mts2_panel.toString().replace(".", ","));
            $("#nro_panel").val(Numero_paneles);

            if ($("#tipo_cotizador").length > 0) {
              if ($("#tipo_cotizador").val() == "tutorial") {
                console.log(result_all_items);
              } else {
                info_string = "#form_page03";
                tipo_string = "cotizador corte resumido";
                if ($("#tipo_cotizador").val() == "tutorial") {
                  info_string = "#enviarcotizacion_nuevo";
                  tipo_string = "cotizador cubierta tutorial";
                }
                jQuery.ajax({
                  type: "POST",
                  url: "/wp-admin/admin-ajax.php",
                  data: {
                    'action': 'guardar_datos_cotizador',
                    'tipo': tipo_string,
                    'info': $(info_string).serialize(),
                    'result_all_items': result_all_items
                  },
                  success: function (msg) {
                    if ($("#tipo_cotizador").val() == "tutorial") {
                      datos = JSON.parse(msg);
                      console.log(datos);
                      console.log(datos.code_generado);
                      //return false;
                      $("#00N2J00000Al6SG").val(datos.id_post);

                      width_piedra_escalada = width_piedra / escala;
                      height_piedra_escalada = height_piedra / escala;
                      info_paneles = "Numero de Paneles: " + Numero_paneles + " \r\n";
                      info_paneles += "Medida del Panel: " + width_piedra_escalada + "cm. x " + height_piedra_escalada + "cm.\r\n";
                      info_paneles += "Espesor: " + $("#00N2J00000Al44q").val() + "mm.\r\n";
                      info_paneles += "Textura: " + $("#textura").val() + "\r\n";
                      info_paneles += "Longitud de Corte: " + $("#total_longitud_real").html() + " \r\n";
                      info_paneles += "Link Cortes: " + $("#site_url").val() + "/nuevo-cotizador/?resultados=" + datos.code_generado + "\r\n";
                      $("#00N2J00000Al6IV").val(info_paneles);

                      $("#retURL").val($("#site_url").val() + "/cotizar/?resultados=" + datos.code_generado + "&code=" + datos.id_post);
                      $("#enviarcotizacion_nuevo").submit();
                    } else {
                      datos = JSON.parse(msg);
                      console.log(datos.id_post);
                      console.log(datos.code_generado);
                      $("#resultados").val(datos.code_generado);
                      $("#00N2J00000Al6SG").val(datos.id_post);
                      $(info_string).submit();
                    }
                  },
                  error: function (msg) {
                    console.log("error");
                    console.log(msg);
                  }
                });
              }
            } else {


              qstone_optimize_sendform();
              console.log(msg.data);
              console.log(msg.data.result);
            }
        }
        // console.log('msg', msg.data)
      }
    }
    // console.log('myworker', myWorker)
  }
  return await promise
}
function qstone_optimize_sendform() {
  jQuery.ajax({
    type: "POST",
    url: "/wp-admin/admin-ajax.php",
    data: {
      action: "guardar_datos_cotizador",
      tipo: "cotizador corte",
      info: $("#form_cotizador_de_cortes").serialize(),
      result_all_items: result_all_items
      //info:data,
    },
    success: function (msg) {
      datos = JSON.parse(msg);
      $("#00N2J00000Al6SG").val(datos.id_post);

      width_piedra_escalada = width_piedra / escala;
      height_piedra_escalada = height_piedra / escala;
      //$("#00N2J00000Al44q").val( $(this).data("espesor"));
      //$("#00N2J00000Al450").val( $(this).data("piedra"));
      info_paneles = "Numero de Paneles: " + Numero_paneles + " \r\n";
      info_paneles += "Medida del Panel: " + width_piedra_escalada + "cm. x " + height_piedra_escalada + "cm.\r\n";
      info_paneles += "Espesor: " + $("#00N2J00000Al44q").val() + "mm.\r\n";
      info_paneles += "Textura: " + $("#textura").val() + "\r\n";
      info_paneles += "Longitud de Corte: " + $("#total_longitud_real").html() + " \r\n";
      info_paneles += "Link Cortes: " + $("#site_url").val() + "/nuevo-cotizador/?resultados=" + datos.code_generado + "\r\n";
      $("#00N2J00000Al6IV").val(info_paneles);
      $("#retURL").val($("#site_url").val() + "/nuevo-cotizador/?resultados=" + datos.code_generado);
      //$("#form_cotizador_de_cortes").attr("action", $("#site_url").val() + "/nuevo-cotizador/?resultados=" + datos.code_generado);
      if (tipo_usuario != "compania") {
        $("#form_cotizador_de_cortes").submit();
      } else {
        window.location.href = $("#site_url").val() + "/nuevo-cotizador/?resultados=" + datos.code_generado;
      }
    },
    error: function (msg) {
      console.log("error");
      console.log(msg);
    },
  });
}
function validarTercerPaso() {
  $(".container-bloques .bloque").removeClass("yellow");
  bloques = $(".container-bloques .bloque");
  areapiedra = width_piedra * height_piedra;
  longitud_menor = width_piedra < height_piedra ? width_piedra : height_piedra;
  longitud_mayor = width_piedra < height_piedra ? height_piedra : width_piedra;
  total_metros_borde = 0;
  for (i = 0; i < bloques.length; i++) {
    bloque = bloques[i];
    if ($(bloque).find(".width").val() == "") {
      alert("Por favor complete todos los campos");
      return false;
    }
    if ($(bloque).find(".height").val() == "") {
      alert("Por favor complete todos los campos");
      return false;
    }
    if ($(bloque).find(".quantity").val() == "") {
      alert("Por favor complete todos los campos");
      return false;
    }
    bloque_width = parseFloat($(bloque).find(".width").val());
    bloque_height = parseFloat($(bloque).find(".height").val());
    if (document.querySelector("#tipo_usuario").value == "compania") {
      bloque_width = bloque_width / 10;
      bloque_height = bloque_height / 10;
    }
    position = parseFloat($(bloque).find(".position").val());
    ///rodrigo febrero 2023//
    bloque_quantity = parseFloat($(bloque).find(".quantity").val());
    total_borde_bloque = 0;
    if ($(bloque).find(".borde_arriba").is(":checked")) {
      total_borde_bloque += bloque_width;
    }
    if ($(bloque).find(".borde_abajo").is(":checked")) {
      total_borde_bloque += bloque_width;
    }
    if ($(bloque).find(".borde_derecha").is(":checked")) {
      total_borde_bloque += bloque_height;
    }
    if ($(bloque).find(".borde_izquierda").is(":checked")) {
      total_borde_bloque += bloque_height;
    }
    total_metros_borde += (total_borde_bloque * bloque_quantity);
    /////////////////////
    bloque_longitud_menor = bloque_width < bloque_height ? bloque_width : bloque_height;
    bloque_longitud_mayor = bloque_width < bloque_height ? bloque_height : bloque_width;

    bloque_longitud_menor = bloque_longitud_menor * escala;
    bloque_longitud_mayor = bloque_longitud_mayor * escala;

    console.log(bloque_longitud_menor);
    console.log(longitud_menor);
    console.log(bloque_longitud_mayor);
    console.log(longitud_mayor);

    if (!(bloque_longitud_menor <= longitud_menor && bloque_longitud_mayor <= longitud_mayor)) {
      $(bloque).addClass("yellow");
      alert("Existen items que no entraran en la piedra. Revise los items reasaltados en amarillo_");
      return false;
    }
    if ((position == 2 && bloque_longitud_mayor > height_piedra) || (position == 1 && bloque_longitud_mayor > width_piedra)) {
      $(bloque).addClass("yellow");
      alert("Existen items que no entraran en la posicipón seleccionada. Revise los items reasaltados en amarillo.");
      return false;
    }
  }
  total_metros_borde = parseFloat(total_metros_borde / 100);
  $("#total_metros_borde").val(total_metros_borde);
  $("#00N2J000007UBih").val(total_metros_borde.toString().replace(".", ","));
  bloques = $(".container-bloques .bloque");
  string_borde = "";
  for (i = 0; i < bloques.length; i++) {
    bloque = bloques[i];
    if ($(bloque).find(".borde_arriba").is(":checked")) {
      string_borde += "on|";
    } else {
      string_borde += "off|";
    }
    if ($(bloque).find(".borde_derecha").is(":checked")) {
      string_borde += "on|";
    } else {
      string_borde += "off|";
    }
    if ($(bloque).find(".borde_abajo").is(":checked")) {
      string_borde += "on|";
    } else {
      string_borde += "off|";
    }

    if ($(bloque).find(".borde_izquierda").is(":checked")) {
      string_borde += "on";
    } else {
      string_borde += "off";
    }
    $(bloque).find(".string_borde").val(string_borde);
    string_borde = "";
  }
  optimize_new();
  /*
  array_sort = ["sort_width", "sort_height", "sort_maxside", "sort_area"];

  sortmethod = "sort_none";
  cantidad_paneles = 999999999;
  porcentaje_global = 0;

  array_sort.forEach(function (element) {
    $("#sort option").removeAttr("selected");
    $("#sort ." + element).prop("selected", true);
    $("#sort").trigger("change");

    $(".contenedorpaneles").remove();
    //paneles_usados = 0;
    CargarValoresIngresados();
    $(".qstone_canvas").remove();
    $(".all_items").html("");
    cantidad_inicial = $("#bloques_items span").length;
    nueva_cantidad = 0;
    contador = 0;
    while ($("#bloques_items span").length > 0) {
      if ((nueva_cantidad = 0)) {
        break;
      }
      if (nueva_cantidad != cantidad_inicial) {
        cantidad_inicial = $("#bloques_items span").length;
        $("#boton-calcular").trigger("click");
        nueva_cantidad = $("#bloques_items span").length;
      }
      contador++;
      if (contador > 200) {
        alert("Error inesperado.");
        return "";
      }
    }
    AdicionarUltimoPanel();
    mostrar_resultados();

    cantidad_paneles_temporal = $(".qstone_canvas").length;
    if ($(".canvas_nousado").length > 0) {
      cantidad_paneles_temporal = parseFloat(cantidad_paneles_temporal) - 0.5;
    }
    cantidad_paneles_temporal = cantidad_paneles_temporal * 1;
    porcentaje_temporal = $(".porcentaje_libre:last").html();
    porcentaje_temporal = porcentaje_temporal * 1;
    if (cantidad_paneles_temporal < cantidad_paneles) {
      sortmethod = element;
      cantidad_paneles = cantidad_paneles_temporal;
      porcentaje_global = porcentaje_temporal;
    } else if (
      cantidad_paneles_temporal == cantidad_paneles && porcentaje_temporal > porcentaje_global
    ) {
      sortmethod = element;
      cantidad_paneles = cantidad_paneles_temporal;
      porcentaje_global = porcentaje_temporal;
    }
  });

  $("#sort option").removeAttr("selected");
  $("#sort ." + sortmethod).prop("selected", true);
  $("#sort").trigger("change");
  $(".contenedorpaneles").remove();

  $("#qstone_sort_select").val(sortmethod);

  CargarValoresIngresados();
  console.log($("#bloques_items span"));

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
  //if($("#is_compania").val()=="si"){
  //  return false;
  //}
  tipo_usuario = $("#tipo_usuario").val();
  console.log($("#form_cotizador_de_cortes").serialize());
  bloques = $(".container-bloques .bloque");
  string_borde = "";
  for (i = 0; i < bloques.length; i++) {
    bloque = bloques[i];
    if ($(bloque).find(".borde_arriba").is(":checked")) {
      string_borde += "on|";
    } else {
      string_borde += "off|";
    }
    if ($(bloque).find(".borde_derecha").is(":checked")) {
      string_borde += "on|";
    } else {
      string_borde += "off|";
    }
    if ($(bloque).find(".borde_abajo").is(":checked")) {
      string_borde += "on|";
    } else {
      string_borde += "off|";
    }

    if ($(bloque).find(".borde_izquierda").is(":checked")) {
      string_borde += "on";
    } else {
      string_borde += "off";
    }
    $(bloque).find(".string_borde").val(string_borde);
    string_borde = "";
  }
  jQuery.ajax({
    type: "POST",
    url: "/wp-admin/admin-ajax.php",
    data: {
      action: "guardar_datos_cotizador",
      tipo: "cotizador corte",
      info: $("#form_cotizador_de_cortes").serialize(),
      //info:data,
    },
    success: function (msg) {
      datos = JSON.parse(msg);
      $("#00N2J00000Al6SG").val(datos.id_post);

      width_piedra_escalada = width_piedra / escala;
      height_piedra_escalada = height_piedra / escala;
      //$("#00N2J00000Al44q").val( $(this).data("espesor"));
      //$("#00N2J00000Al450").val( $(this).data("piedra"));
      info_paneles = "Numero de Paneles: " + Numero_paneles + " \r\n";
      info_paneles += "Medida del Panel: " + width_piedra_escalada + "cm. x " + height_piedra_escalada + "cm.\r\n";
      info_paneles += "Espesor: " + $("#00N2J00000Al44q").val() + "mm.\r\n";
      info_paneles += "Textura: " + $("#textura").val() + "\r\n";
      info_paneles += "Longitud de Corte: " + $("#total_longitud_real").html() + " \r\n";
      info_paneles += "Link Cortes: " + $("#site_url").val() + "/nuevo-cotizador/?resultados=" + datos.code_generado + "\r\n";
      $("#00N2J00000Al6IV").val(info_paneles);
      $("#retURL").val($("#site_url").val() + "/nuevo-cotizador/?resultados=" + datos.code_generado);
      //$("#form_cotizador_de_cortes").attr("action", $("#site_url").val() + "/nuevo-cotizador/?resultados=" + datos.code_generado);
      if (tipo_usuario != "compania") {
        $("#form_cotizador_de_cortes").submit();
      } else {
        window.location.href = $("#site_url").val() + "/nuevo-cotizador/?resultados=" + datos.code_generado;
      }
    },
    error: function (msg) {
      console.log("error");
      console.log(msg);
    },
  });*/
}

function openModal_var(element) {
  //    element.nextElementSibling.style.display = "block";

  $("#myModal_" + element).css("display", "block");
  jQuery.ajax({
    type: "POST",
    url: "/wp-admin/admin-ajax.php",
    data: {
      action: "show_new_gallery",
      idpiedra: element,
    },
    success: function (msg) {
      try {
        datos = JSON.parse(msg);
        $("#myModal_" + element).html(datos.content);
        currentSlide(1, "myModal_" + element);
      } catch (error) {
        $("#myModal_" + element).css("display", "none");
      }
    },
    error: function (msg) {
      $("#myModal_" + element).css("display", "none");
      console.log("error");
      console.log(msg);
    },
  });

  //$("#myModal_" + element).css("display", "block");
  //currentSlide(1, "myModal_" + element);
  /* console.log("#myModal_"+element);
    var element_modal = document.getElementById("#myModal_"+element);
    element_modal.style.display = "block";*/
}

// End Validaciones;
;