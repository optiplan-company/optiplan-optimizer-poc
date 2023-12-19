/******************************************************************************
 This is a demo page to experiment with binary tree based
 algorithms for packing blocks into a single 2 dimensional bin.
 See individual .js files for descriptions of each algorithm:
  * packer.js         - simple algorithm for a fixed width/height bin
  * packer.growing.js - complex algorithm that grows automatically
 TODO
 ====
  * step by step animated render to watch packing in action (and help debug)
  * optimization - mark branches as "full" to avoid walking them
  * optimization - dont bother with nodes that are less than some threshold w/h (2? 5?)
*******************************************************************************/
Demo = {
    init: function () {
        Demo.el = {
            blocks: $('#blocks'),
            canvas: $('#canvas')[0],
            sort: $('#sort'),
            ratio: $('#ratio'),
            ratio_libre: $('#ratio_libre'),
            nofit: $('#nofit'),
            calcular: $('#boton-calcular'),
            img_piedra: $('#image_piedra'),
            img: new Image(),
        };
        if (!Demo.el.canvas.getContext) { // no support for canvas
            console.log("no support for canvas");
            return false;
        }
        Demo.el.draw = Demo.el.canvas.getContext("2d");
        Demo.el.calcular.click(Demo.run);
    },
    print_message: function () {
        console.log('This message was printed by Class');
    },
    //---------------------------------------------------------------------------
    run: function () {
        console.log("run");
        if ($("#var_test").val() == "si") {
            if (result_url_imagen != "") {
                var blocks = Demo.blocks.deserialize(Demo.el.blocks.val());
                var packer = Demo.packer();
                Demo.sort.now(blocks);
                paneles_usados = $(".qstone_canvas").length + 1;
                $("#canvas").before('<div class="row contenedorpaneles" style="page-break-before: always;"><h3>Plancha #' +
                    paneles_usados + '</h3><div class="col-md-9 col-xs-12"><div class="row contenedor_paneles"><canvas id="canvas' +
                    paneles_usados + '" class="qstone_canvas"></canvas></div></div> <div class="col-md-3 col-xs-12"><div class="row  info_panel_' +
                    paneles_usados + '" ></div> </div> </div>');
                Demo.el.canvas = $('#canvas' + paneles_usados)[0];
                Demo.el.draw = Demo.el.canvas.getContext("2d");
                packer.fit(blocks);
                Demo.canvas.reset(packer.root.w, packer.root.h);
                ////////////////////////
                background = new Image();
                background.src = $("#image_piedra").attr('src');
                image_piedra = document.getElementById("image_piedra");
                Demo.el.img = image_piedra;
                Demo.el.img.src = $("#image_piedra").attr('src');

                //localStorage.canvas = JSON.stringify({nro_panel: paneles_usados,blocks:blocks,packer_w:packer.root.w,packer_h:packer.root.h});
                //console.log(localStorage.canvas);
                localStorage.setItem("canvas" + paneles_usados,
                    JSON.stringify({
                        nro_panel: paneles_usados,
                        blocks: blocks,
                        packer_w: packer.root.w,
                        packer_h: packer.root.h,
                        packer_root: packer.root
                    }));
                //const data = JSON.parse(localStorage.getItem('canvas'+paneles_usados));
                //console.log(data);

                Demo.el.img.onload = function () {
                    //Demo.el.img_piedra.onload=function(){
                    //alert("okkk");
                    //////////////////////////////////////////

                    canvas = document.getElementById("canvas" + paneles_usados);
                    Demo.el.canvas = canvas;
                    console.log("paneles usados" + paneles_usados);
                    ctx = canvas.getContext("2d");
                    Demo.el.draw = ctx;
                    //image_piedra.onload=function(){
                    //Demo.el.img_piedra.onload=function(){
                    //ctx.drawImage(background,0,0, width_original, height_original);
                    //ctx.drawImage(image_piedra,0,0, width_original, height_original);
                    //Demo.el.draw.drawImage(image_piedra,0,0, width_original, height_original);
                    nro_panel = $(".qstone_canvas").length;
                    //console.log(nro_panel);
                    for (var i = 1; i <= nro_panel; i++) {
                        console.log(i);
                        //$("#canvas"+i)[0].getContext("2d").drawImage(image_piedra, 0, 0,width_original, height_original);
                        Demo.el.canvas = $('#canvas' + i)[0];
                        Demo.el.draw = Demo.el.canvas.getContext("2d");
                        image_piedra = document.getElementById("image_piedra");
                        Demo.el.img_piedra = image_piedra;
                        Demo.el.draw.drawImage(image_piedra, 0, 0, width_original, height_original);
                        //////////////////////////////////////
                        data = JSON.parse(localStorage.getItem('canvas' + i));
                        console.log(data.blocks);
                        Demo.canvas.blocks(data.blocks);
                        Demo.canvas.boundary(data.packer_root);
                        Demo.report(data.blocks, data.packer_w, data.packer_h);
                    }
                    //if($("#canvas"+nro_panel).length!=0){
                    //$("#canvas"+nro_panel)[0].getContext("2d").drawImage(image_piedra, 0, 0,width_original, height_original);
                    //}

                }
                //Demo.canvas.blocks(blocks);
                //Demo.canvas.boundary(packer.root);
                Demo.report(blocks, packer.root.w, packer.root.h);
            }
        } else {
            var blocks = Demo.blocks.deserialize(Demo.el.blocks.val());
            var packer = Demo.packer();
            Demo.sort.now(blocks);
            paneles_usados = $(".qstone_canvas").length + 1;
            $("#canvas").before('<div class="row contenedorpaneles" style="page-break-before: always;"><h3>Plancha #' +
                paneles_usados + '</h3><div class="col-md-9 col-xs-12"><div class="row contenedor_paneles"><canvas id="canvas' +
                paneles_usados + '" class="qstone_canvas"></canvas></div></div> <div class="col-md-3 col-xs-12"><div class="row  info_panel_' +
                paneles_usados + '" ></div> </div> </div>');
            Demo.el.canvas = $('#canvas' + paneles_usados)[0];
            Demo.el.draw = Demo.el.canvas.getContext("2d");
            packer.fit(blocks);
            Demo.canvas.reset(packer.root.w, packer.root.h);
            if (result_url_imagen != "") {

                image_piedra = document.getElementById("image_piedra");
                Demo.el.img_piedra = image_piedra;
                Demo.el.draw.drawImage(image_piedra, 0, 0, width_original, height_original);
            } else {
                // Demo.canvas.rect(0, 0, width_original, height_original, "#eed09d");
            }
            Demo.canvas.blocks(blocks);
            Demo.canvas.boundary(packer.root);
            Demo.report(blocks, packer.root.w, packer.root.h);
        }
    },
    //---------------------------------------------------------------------------
    packer: function () {
        return new Packer(width_piedra, height_piedra);
    },
    //---------------------------------------------------------------------------
    report: function (blocks, w, h) {
        $("#bloques_items").html("");
        n_quantity = $(".qstone_canvas").length;
        var fit = 0,
            nofit = [],
            block, n,
            len = blocks.length;
        item_block = "";
        for (n = 0; n < len; n++) {
            block = blocks[n];
            if (block.fit) {
                fit = fit + block.area;
                item_block += "<input type='hidden' name='item_block_" + n_quantity +
                    "[]' data-width='" + block.w +
                    "' data-height='" + block.h +
                    "' data-etiqueta='" + block.eti +
                    "' data-arriba='" + block.arriba +
                    "' data-abajo='" + block.abajo +
                    "' data-derecha='" + block.derecha +
                    "' data-izquierda='" + block.izquierda +
                    "' data-position='" + block.position + "'>";
            } else {
                nofit.push("" + block.w + "x" + block.h);
                $("#bloques_items").append("<span data-width='" + block.w +
                    "' data-height='" + block.h +
                    "' data-etiqueta='" + block.eti +
                    "' data-arriba='" + block.arriba +
                    "' data-abajo='" + block.abajo +
                    "' data-derecha='" + block.derecha +
                    "' data-izquierda='" + block.izquierda +
                    "' data-position='" + block.position + "'></span>");
            }
        }
        $(".all_items").append(item_block);
        Demo.el.ratio.text(Math.round(100 * fit / (w * h)));
        Demo.el.ratio_libre.text(100 - Math.round(100 * fit / (w * h)));
        Demo.el.nofit.html("Bloques sin encajar (" + nofit.length + ") :<br>" + nofit.join(", ")).toggle(nofit.length > 0);

    },
    //---------------------------------------------------------------------------
    sort: {
        random: function (a, b) { return Math.random() - 0.5; },
        w: function (a, b) { return b.w - a.w; },
        h: function (a, b) { return b.h - a.h; },
        a: function (a, b) { return b.area - a.area; },
        max: function (a, b) { return Math.max(b.w, b.h) - Math.max(a.w, a.h); },
        min: function (a, b) { return Math.min(b.w, b.h) - Math.min(a.w, a.h); },
        height: function (a, b) { return Demo.sort.msort(a, b, ['h', 'w']); },
        width: function (a, b) { return Demo.sort.msort(a, b, ['w', 'h']); },
        area: function (a, b) { return Demo.sort.msort(a, b, ['a', 'h', 'w']); },
        maxside: function (a, b) { return Demo.sort.msort(a, b, ['max', 'min', 'h', 'w']); },
        msort: function (a, b, criteria) { /* sort by multiple criteria */
            var diff, n;
            for (n = 0; n < criteria.length; n++) {
                diff = Demo.sort[criteria[n]](a, b);
                if (diff != 0)
                    return diff;
            }
            return 0;
        },
        now: function (blocks) {
            var sort = Demo.el.sort.val();
            if (sort != 'none')
                blocks.sort(Demo.sort[sort]);
        }
    },
    //---------------------------------------------------------------------------
    canvas: {
        reset: function (width, height) {
            console.log("canvas reset");
            Demo.el.canvas.width = width + 1; // add 1 because we draw boundaries offset by 0.5 in order to pixel align and get crisp boundaries
            Demo.el.canvas.height = height + 1; // (ditto)
            Demo.el.draw.clearRect(0, 0, Demo.el.canvas.width, Demo.el.canvas.height);
        },
        rect: function (x, y, w, h, color) {
            console.log("color:" + color);
            Demo.el.draw.fillStyle = color;
            Demo.el.draw.fillRect(x + 0.5, y + 0.5, (w - (grosor_corte * escala)), (h - (grosor_corte * escala)));
        },
        text: function (text, textEtiqueta, x, y, position, w, h) {
            console.log("canvas text");
            if (w < h) {
                Demo.el.draw.save();
                Demo.el.draw.rotate(-20 * Math.PI / 40);
                console.log("x_text:" + x);
                console.log("y_text:" + y);
            }
            l1 = text.length;
            l2 = textEtiqueta.length;
            lt = (l1 > l2) ? l1 : l2;


            min = (w < h) ? w : h;
            espesor = (min / escala > 10) ? 30 : 15;
            espesor = (espesor > min) ? (min - 1) : espesor;

            /*Demo.el.draw.fillStyle = 'yellow';
            Demo.el.draw.fillRect(-((lt*5)+y), x + 0.5, lt*5, 5);*/

            if (w < h) {
                Demo.el.draw.fillStyle = 'white';
                Demo.el.draw.globalAlpha = 0.6;
                Demo.el.draw.fillRect(-((lt * 5) + y + 2), x, lt * 5, espesor);

                Demo.el.draw.fillStyle = 'black';
                Demo.el.draw.globalAlpha = 1;
                Demo.el.draw.fillText(text, -((lt * 5) + y), x + 8.5);

                if (min / escala > 10) {
                    Demo.el.draw.fillStyle = 'black';
                    Demo.el.draw.fillText(textEtiqueta, -((lt * 5) + y), x + 23);
                }


            } else {
                Demo.el.draw.fillStyle = 'white';
                Demo.el.draw.globalAlpha = 0.6;
                Demo.el.draw.fillRect(x + 0.5, y, lt * 5, espesor);


                Demo.el.draw.fillStyle = 'black';
                Demo.el.draw.globalAlpha = 1;
                Demo.el.draw.fillText(text, x + 2, y + 9);

                if (min / escala > 10) {
                    Demo.el.draw.fillStyle = 'black';
                    Demo.el.draw.fillText(textEtiqueta, x + 2, y + 23);
                }

            }




            if (w < h) {
                Demo.el.draw.restore();
            }

        },
        textEtiqueta: function (text, x, y, position) {
            /*if(position==2){
                Demo.el.draw.save();
                Demo.el.draw.rotate(-0.5*Math.PI);

            }*/

            /*if(position==2){
                Demo.el.draw.restore();
            }*/
        },
        stroke: function (x, y, w, h) {
            console.log("canvas stroke x:" + x + ",y:" + y + ",w:" + w + ",h:" + h);
            Demo.el.draw.strokeRect(x, y, w, h);

        },
        blocks: function (blocks) {
            console.log("canvas bocks");
            console.log(blocks);
            var n, block;
            if ($("#var_test").val() == "si") {

            }
            for (n = 0; n < blocks.length; n++) {
                block = blocks[n];
                if (block.fit) {
                    if (result_url_imagen != "") {
                        if ($("#var_test").val() == "si") {
                            //background = new Image();
                            //background.src=$("#image_piedra").attr('src');
                            //paneles_usados = $(".qstone_canvas").length + 1;
                            //Demo.el.canvas = $('#canvas' + paneles_usados)[0];
                            //Demo.el.draw = Demo.el.canvas.getContext("2d");
                            //console.log("paneles usados"+paneles_usados);
                            //background.onload = function(){
                            //Demo.el.img.onload = function(){
                            //image_piedra = document.getElementById("image_piedra");
                            //Demo.el.draw.drawImage(image_piedra,0,0, width_original, height_original);
                            //$("#canvas"+paneles_usados)[0].getContext("2d").drawImage(image_piedra, 0, 0,width_original, height_original);
                            //nro_panel=$(".qstone_canvas").length;
                            //if($("#canvas"+nro_panel).length!=0){
                            //console.log(nro_panel);
                            Demo.el.draw.strokeStyle = '#804000';
                            Demo.canvas.stroke(block.fit.x, block.fit.y, block.w, block.h);
                            Demo.el.draw.lineWidth = "1.2";
                            //}
                            //}
                        } else {
                            Demo.el.draw.strokeStyle = '#804000';
                            Demo.canvas.stroke(block.fit.x, block.fit.y, block.w, block.h);
                            Demo.el.draw.lineWidth = "1.2";
                        }

                        ////////izquierda////
                        if (block.izquierda == "si") {
                            Demo.el.draw.strokeStyle = 'rgba(0, 0, 255, 0.3)';
                            Demo.el.draw.rect(block.fit.x + (2.6), block.fit.y - (2.5), 2, block.h - (3));
                            Demo.el.draw.stroke();
                        }
                        ///////derecha///
                        if (block.derecha == "si") {
                            Demo.el.draw.strokeStyle = 'rgba(0, 0, 255, 0.3)';
                            Demo.el.draw.rect(block.fit.x + block.w - (4), block.fit.y, 2, block.h - (2));
                            Demo.el.draw.stroke();
                        }
                        ///////arriba/////
                        if (block.arriba == "si") {
                            Demo.el.draw.strokeStyle = 'rgba(0, 0, 255, 0.3)';
                            Demo.el.draw.rect(block.fit.x, block.fit.y + (2.6), block.w - (2.5), 2);
                            Demo.el.draw.stroke();
                        }
                        ////////abajo/////////
                        if (block.abajo == "si") {
                            Demo.el.draw.strokeStyle = 'rgba(0, 0, 255, 0.3)';
                            Demo.el.draw.rect(block.fit.x, block.fit.y + block.h - (4), block.w, 2);
                            Demo.el.draw.stroke();
                        }
                        /////////////////////////////
                        Demo.el.draw.strokeStyle = '#804000';
                        Demo.el.draw.lineWidth = "1";
                    } else {
                        console.log("no tiene imagen");
                        Demo.el.draw.strokeStyle = '#eed09d';
                        Demo.canvas.rect(block.fit.x, block.fit.y, block.w, block.h, block.color);
                    }
                    extra_text = "";
                    if (block.position == 1) {
                        extra_text = "(H)";
                    }
                    if (block.position == 2) {
                        extra_text = "(V)";
                    }

                    positionletras = 0;
                    if (block.h > block.w) {
                        positionletras = 2;
                    }

                    console.log(block.position);
                    console.log("w:" + (conversion[block.w] / escala) + " h:" + (conversion[block.h] / escala));
                    console.log(extra_text);
                    Demo.canvas.text((conversion[block.w] / escala) + ' x ' + (conversion[block.h] / escala) + " " + extra_text, block.eti, block.fit.x + (4), block.fit.y + (4), positionletras, block.w, block.h);
                    /*Demo.canvas.textEtiqueta(, block.fit.x, block.fit.y, positionletras);*/
                }
            }
        },

        boundary: function (node) {
            if (node) {
                Demo.el.draw.strokeStyle = 'black';
                Demo.canvas.stroke(node.x, node.y, node.w, node.h);
                /*Demo.canvas.boundary(node.down);
                Demo.canvas.boundary(node.right);*/
            }
        }
    },
    //---------------------------------------------------------------------------
    blocks: {
        deserialize: function (val) {
            var i, j, block, blocks = val.split("\n"),
                result = [];
            /*bloques = $(".container-bloques .bloque");*/
            bloques = $("#bloques_items span");
            for (i = 0; i < bloques.length; i++) {
                bloque = bloques[i];

                result.push({
                    w: parseFloat($(bloque).data('width')),
                    h: parseFloat($(bloque).data('height')),
                    num: parseFloat(1),
                    eti: $(bloque).data('etiqueta'),
                    position: $(bloque).data('position'),
                    arriba: $(bloque).data('arriba'),
                    abajo: $(bloque).data('abajo'),
                    derecha: $(bloque).data('derecha'),
                    izquierda: $(bloque).data('izquierda')
                });
            }
            var expanded = [];
            //var cols = ["201, 201, 224", "195, 195, 202", "243, 200, 200", "210, 189, 189", "225, 192, 232", "192, 220, 232", "192, 232, 213"];
            var cols = ["238, 208, 157"];
            for (i = 0; i < result.length; i++) {
                var color_for_group_block = cols[i % cols.length];
                for (j = 0; j < result[i].num; j++) {
                    // Create gradient
                    var grd = Demo.el.draw.createLinearGradient(0, 0, result[i].w, 0);
                    grd.addColorStop(0, "rgba(" + color_for_group_block + ", 1)");
                    grd.addColorStop(1, "rgba(" + color_for_group_block + ", 0.75)");
                    expanded.push({
                        w: result[i].w,
                        h: result[i].h,
                        area: result[i].w * result[i].h,
                        color: grd,
                        eti: result[i].eti,
                        position: result[i].position,
                        arriba: result[i].arriba,
                        abajo: result[i].abajo,
                        derecha: result[i].derecha,
                        izquierda: result[i].izquierda
                    });
                }
            }
            return expanded;
        },
    },
    color: function (n) {
        //var cols = ["#c9c9e0", "#c3c3ca", "#f3c8c8", "#d2bdbd", "#e1c0e8", "#c0dce8", "#c0e8d5", "#c5e8c0", "#e8c0c0"];
        var cols = ["#d2bdbd"];
        return cols[n % cols.length];
    }
    //---------------------------------------------------------------------------
}
//if($('#canvas').length>0){
//console.log('before init');
$(Demo.init);
//console.log('before init2');
$(Demo.print_message);
//console.log('before init3');
//};