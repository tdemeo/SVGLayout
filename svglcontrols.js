/*
 * svglcontrols.js 0.8.0 Alpha - JavaScript SVGLayout Tools Library
 *
 * Copyright (c) 2014 Thomas DeMeo 
 * Copyright (c) 2014 Waltham Software Corp. All rights reserved.
 * Licensed under the MIT (http://www.svglayout.com/mit_license/index.html) license.
*/

var svglc;

function svglControls(sl) {

    var altKeyDown, shifKeyDown, exportTo;

    $(document).keydown(function(event) {
        //On and off dealt with separately. The other commands are only active when svglayout is active
        if(event.keyCode === 65) { //"A" key
            if (altKeyDown(event)) {
                if (shifKeyDown(event)) {
                    sl.activateLayout(false);
                }
                else {
                    sl.activateLayout(true);
                }
                return;
            }
        }
        if(sl.isActive === false) {
            return;
        }

        //_________________________________________________________________________________________
        //Keycodes assigned to commands below
        //_________________________________________________________________________________________

        switch(event.keyCode) {
        //_________________________________________________________________________________________                
            //Export command here!!!
        //_________________________________________________________________________________________
            case 69: //"E" key
               if (altKeyDown(event)) {
                    var jsonText;
                    jsonText = sl.exportJSON();
                    //The export is contained in the var jsonText
                    //You can replace the following function  with a mechanism to save the data directly to your server
                    exportTo(jsonText);
                }
                break;
        //_________________________________________________________________________________________

            case 37: //arrow left key
                if (sl.isZIBadgeOn) {
                    sl.zIndexSet("down");
                    break;
                }
                if (altKeyDown(event)) {
                    sl.align("left");
                    break;
                }
                sl.nudge("left");
                break;
            case 38: //arrow up key
                if (sl.isZIBadgeOn) {
                    sl.zIndexSet("top");
                    break;
                }
               if (altKeyDown(event)) {
                    sl.align("top");
                    break;
                }
                sl.nudge("up");
                break;
            case 39: //arrow right key
                if (sl.isZIBadgeOn) {
                    sl.zIndexSet("up");
                    break;
                }
                if (altKeyDown(event)) {
                    sl.align("right");
                    break;
                }
                sl.nudge("right");
                break;
            case 40: //arrow down key
                if (sl.isZIBadgeOn) {
                    sl.zIndexSet("bottom");
                    break;
                }
                if (altKeyDown(event)) {
                    sl.align("bottom");
                    break;
                }
                sl.nudge("down");
                break;
            case 67: //"C" key
                if (altKeyDown(event)) {
                    if (shifKeyDown(event)) {
                        sl.setCOBadges(false);
                    }
                    else {
                        sl.setCOBadges(true);
                    }
                }
                break;
            case 68: //"D" key
               if (altKeyDown(event)) {
                    svglDialog(sl, 'open');
                }
                break;
            case 72: //"H" key
                if (altKeyDown(event)) {
                    sl.align("horizontally");
                }
                break;
            case 76: //"L" key
                if (altKeyDown(event)) {
                    if (sl.shifKeyDown(event)) {
                        sl.unlockAll();
                    }
                    else {
                        sl.lockSelection();
                    }
                }
                break;
            case 86: //"V" key
                if (altKeyDown(event)) {
                    sl.align("vertically");
                }
                break;
            case 90: //"Z" key
                 if (altKeyDown(event)) {
                    if (shifKeyDown(event)) {
                        sl.setZIBadges(false);
                    }
                    else {
                        sl.setZIBadges(true);
                    }
                }
                break;
       }
        //_________________________________________________________________________________________
        //Keycodes end here
        //_________________________________________________________________________________________


    });

    sl.Div.prototype.onDoubleClick = function () {
        svglDialog(sl, 'open');
    };

    exportTo = function (jsonText) {
        jsonText = "jsonText = '" + jsonText + "';";
        $("<div id='svgl_exp_div'/>").appendTo("body");
        $("#svgl_exp_div").css({
            "position": "absolute",
            "display": "inline",
            "top": "50%",
            "left": "50%",
            "margin-top": "-40px",
            "margin-left": "-200px",
            "margin-right": "-40px",
            "margin-bottom": "-200px",
            "font-family": "Arial",
            "font-size": "12px",
            "background-color": "#AFC8D7",
            "border": "4px solid #99AFBC"
        });
        $("<form id='svgl_exp_form' name='svglExp'/>").appendTo("#svgl_exp_div");
        $("<span id='svgl_exp_lbl'/>").appendTo("#svgl_exp_form");
        $("#svgl_exp_lbl").css({
            "font-weight": "bold",
            "padding-bottom": "40px"
        });
        $("<br/>").appendTo("#svgl_exp_form");
        $("#svgl_exp_lbl" ).text(" Exported JSON: ");
        $("<textarea id='svgl_exp_text' rows='4' cols='54' />").appendTo("#svgl_exp_form");
        $("#svgl_exp_text").val(jsonText);
        $("#svgl_exp_text").focus();
        $("#svgl_exp_text").select();
        $("#svgl_exp_text" ).blur(function() {
            $('#svgl_exp_div').remove();
        });

    };

    shifKeyDown = function (event) {
        if (!event) {
            event = window.event;
        }
        if (event.shiftKey ) {
            return true;
        }
        return false;
    };

    altKeyDown = function (event) {
        if (!event) {
            event = window.event;
        }
        if (event.altKey ) {
            return true;
        }
        return false;
    };

}

function svglDialog (sl, action) {
 
    var svglDialogJSON, found, svglDialogOpen, svgl_dl_area_bg, svgl_dl_el_main, sc, dlDivID, dlParentID, ccx, ccy, ccw, cch, hAction, hMin, hMax, hRate, vAction, vMin, vMax, vRate, paramObj, i;
    svglDialogJSON = '[{"divID":"svgl_dl_area_bg","parentID":"window","data":{},"cc":{"x":0,"y":0,"w":1097,"h":990},"pc":{"x":0,"y":0,"w":1097,"h":990},"zIndex":-1000,"display":true,"hAction":"grow","hMin":0,"hMax":0,"hRate":1,"vAction":"grow","vMin":0,"vMax":0,"vRate":1},{"divID":"svgl_dl_area_main","parentID":"window","data":{},"cc":{"x":353,"y":204,"w":360,"h":440},"pc":{"x":0,"y":0,"w":1097,"h":990},"zIndex":-999,"display":true,"hAction":"none","hMin":0,"hMax":0,"hRate":1,"vAction":"none","vMin":0,"vMax":0,"vRate":1},{"divID":"svgl_dl_title_div_lbl","parentID":"svgl_dl_area_main","data":{},"cc":{"x":476,"y":217,"w":114,"h":14},"pc":{"x":353,"y":204,"w":360,"h":440},"zIndex":-998,"display":true,"hAction":"none","hMin":0,"hMax":0,"hRate":1,"vAction":"none","vMin":0,"vMax":0,"vRate":1},{"divID":"svgl_dl_f_div_id_div_lbl","parentID":"svgl_dl_area_main","data":{},"cc":{"x":366,"y":245,"w":36,"h":14},"pc":{"x":353,"y":204,"w":360,"h":440},"zIndex":-997,"display":true,"hAction":"none","hMin":0,"hMax":0,"hRate":1,"vAction":"none","vMin":0,"vMax":0,"vRate":1},{"divID":"svgl_dl_f_div_id_inp_div","parentID":"svgl_dl_area_main","data":{},"cc":{"x":502,"y":241,"w":200,"h":23},"pc":{"x":353,"y":204,"w":360,"h":440},"zIndex":-996,"display":true,"hAction":"none","hMin":0,"hMax":0,"hRate":1,"vAction":"none","vMin":0,"vMax":0,"vRate":1},{"divID":"svgl_dl_f_parent_id_div_lbl","parentID":"svgl_dl_area_main","data":{},"cc":{"x":366,"y":270,"w":54,"h":14},"pc":{"x":353,"y":204,"w":360,"h":440},"zIndex":-995,"display":true,"hAction":"none","hMin":0,"hMax":0,"hRate":1,"vAction":"none","vMin":0,"vMax":0,"vRate":1},{"divID":"svgl_dl_f_parent_id_inp_div","parentID":"svgl_dl_area_main","data":{},"cc":{"x":502,"y":266,"w":200,"h":23},"pc":{"x":353,"y":204,"w":360,"h":440},"zIndex":-994,"display":true,"hAction":"none","hMin":0,"hMax":0,"hRate":1,"vAction":"none","vMin":0,"vMax":0,"vRate":1},{"divID":"svgl_dl_f_ccx_div_lbl","parentID":"svgl_dl_area_main","data":{},"cc":{"x":366,"y":299,"w":9,"h":14},"pc":{"x":353,"y":204,"w":360,"h":440},"zIndex":-993,"display":true,"hAction":"none","hMin":0,"hMax":0,"hRate":1,"vAction":"none","vMin":0,"vMax":0,"vRate":1},{"divID":"svgl_dl_f_ccx_inp_div","parentID":"svgl_dl_area_main","data":{},"cc":{"x":503,"y":295,"w":66,"h":23},"pc":{"x":353,"y":204,"w":360,"h":440},"zIndex":-992,"display":true,"hAction":"none","hMin":0,"hMax":0,"hRate":1,"vAction":"none","vMin":0,"vMax":0,"vRate":1},{"divID":"svgl_dl_f_ccy_div_lbl","parentID":"svgl_dl_area_main","data":{},"cc":{"x":366,"y":320,"w":9,"h":14},"pc":{"x":353,"y":204,"w":360,"h":440},"zIndex":-991,"display":true,"hAction":"none","hMin":0,"hMax":0,"hRate":1,"vAction":"none","vMin":0,"vMax":0,"vRate":1},{"divID":"svgl_dl_f_ccy_inp_div","parentID":"svgl_dl_area_main","data":{},"cc":{"x":503,"y":316,"w":66,"h":23},"pc":{"x":353,"y":204,"w":360,"h":440},"zIndex":-990,"display":true,"hAction":"none","hMin":0,"hMax":0,"hRate":1,"vAction":"none","vMin":0,"vMax":0,"vRate":1},{"divID":"svgl_dl_f_ccw_div_lbl","parentID":"svgl_dl_area_main","data":{},"cc":{"x":366,"y":342,"w":32,"h":14},"pc":{"x":353,"y":204,"w":360,"h":440},"zIndex":-989,"display":true,"hAction":"none","hMin":0,"hMax":0,"hRate":1,"vAction":"none","vMin":0,"vMax":0,"vRate":1},{"divID":"svgl_dl_f_ccw_inp_div","parentID":"svgl_dl_area_main","data":{},"cc":{"x":503,"y":337,"w":66,"h":23},"pc":{"x":353,"y":204,"w":360,"h":440},"zIndex":-988,"display":true,"hAction":"none","hMin":0,"hMax":0,"hRate":1,"vAction":"none","vMin":0,"vMax":0,"vRate":1},{"divID":"svgl_dl_f_cch_div_lbl","parentID":"svgl_dl_area_main","data":{},"cc":{"x":366,"y":362,"w":37,"h":14},"pc":{"x":353,"y":204,"w":360,"h":440},"zIndex":-987,"display":true,"hAction":"none","hMin":0,"hMax":0,"hRate":1,"vAction":"none","vMin":0,"vMax":0,"vRate":1},{"divID":"svgl_dl_f_cch_inp_div","parentID":"svgl_dl_area_main","data":{},"cc":{"x":503,"y":358,"w":66,"h":23},"pc":{"x":353,"y":204,"w":360,"h":440},"zIndex":-986,"display":true,"hAction":"none","hMin":0,"hMax":0,"hRate":1,"vAction":"none","vMin":0,"vMax":0,"vRate":1},{"divID":"svgl_dl_f_h_action_div_lbl","parentID":"svgl_dl_area_main","data":{},"cc":{"x":366,"y":392,"w":96,"h":14},"pc":{"x":353,"y":204,"w":360,"h":440},"zIndex":-985,"display":true,"hAction":"none","hMin":0,"hMax":0,"hRate":1,"vAction":"none","vMin":0,"vMax":0,"vRate":1},{"divID":"svgl_dl_f_h_action_inp_r_none_div","parentID":"svgl_dl_area_main","data":{},"cc":{"x":502,"y":390,"w":18,"h":19},"pc":{"x":353,"y":204,"w":360,"h":440},"zIndex":-984,"display":true,"hAction":"none","hMin":0,"hMax":0,"hRate":1,"vAction":"none","vMin":0,"vMax":0,"vRate":1},{"divID":"svgl_dl_f_h_action_inp_r_none_div_lbl","parentID":"svgl_dl_area_main","data":{},"cc":{"x":521,"y":392,"w":28,"h":14},"pc":{"x":353,"y":204,"w":360,"h":440},"zIndex":-983,"display":true,"hAction":"none","hMin":0,"hMax":0,"hRate":1,"vAction":"none","vMin":0,"vMax":0,"vRate":1},{"divID":"svgl_dl_f_h_action_inp_r_move_div","parentID":"svgl_dl_area_main","data":{},"cc":{"x":580,"y":390,"w":18,"h":19},"pc":{"x":353,"y":204,"w":360,"h":440},"zIndex":-982,"display":true,"hAction":"none","hMin":0,"hMax":0,"hRate":1,"vAction":"none","vMin":0,"vMax":0,"vRate":1},{"divID":"svgl_dl_f_h_action_inp_r_move_div_lbl","parentID":"svgl_dl_area_main","data":{},"cc":{"x":600,"y":392,"w":30,"h":14},"pc":{"x":353,"y":204,"w":360,"h":440},"zIndex":-981,"display":true,"hAction":"none","hMin":0,"hMax":0,"hRate":1,"vAction":"none","vMin":0,"vMax":0,"vRate":1},{"divID":"svgl_dl_f_h_action_inp_r_grow_div","parentID":"svgl_dl_area_main","data":{},"cc":{"x":654,"y":390,"w":18,"h":19},"pc":{"x":353,"y":204,"w":360,"h":440},"zIndex":-980,"display":true,"hAction":"none","hMin":0,"hMax":0,"hRate":1,"vAction":"none","vMin":0,"vMax":0,"vRate":1},{"divID":"svgl_dl_f_h_action_inp_r_grow_div_lbl","parentID":"svgl_dl_area_main","data":{},"cc":{"x":673,"y":392,"w":27,"h":14},"pc":{"x":353,"y":204,"w":360,"h":440},"zIndex":-979,"display":true,"hAction":"none","hMin":0,"hMax":0,"hRate":1,"vAction":"none","vMin":0,"vMax":0,"vRate":1},{"divID":"svgl_dl_f_h_min_div_lbl","parentID":"svgl_dl_area_main","data":{},"cc":{"x":366,"y":413,"w":82,"h":14},"pc":{"x":353,"y":204,"w":360,"h":440},"zIndex":-978,"display":true,"hAction":"none","hMin":0,"hMax":0,"hRate":1,"vAction":"none","vMin":0,"vMax":0,"vRate":1},{"divID":"svgl_dl_f_h_min_inp_div","parentID":"svgl_dl_area_main","data":{},"cc":{"x":502,"y":409,"w":66,"h":23},"pc":{"x":353,"y":204,"w":360,"h":440},"zIndex":-977,"display":true,"hAction":"none","hMin":0,"hMax":0,"hRate":1,"vAction":"none","vMin":0,"vMax":0,"vRate":1},{"divID":"svgl_dl_f_h_max_div_lbl","parentID":"svgl_dl_area_main","data":{},"cc":{"x":366,"y":434,"w":85,"h":14},"pc":{"x":353,"y":204,"w":360,"h":440},"zIndex":-976,"display":true,"hAction":"none","hMin":0,"hMax":0,"hRate":1,"vAction":"none","vMin":0,"vMax":0,"vRate":1},{"divID":"svgl_dl_f_h_max_inp_div","parentID":"svgl_dl_area_main","data":{},"cc":{"x":502,"y":430,"w":66,"h":23},"pc":{"x":353,"y":204,"w":360,"h":440},"zIndex":-975,"display":true,"hAction":"none","hMin":0,"hMax":0,"hRate":1,"vAction":"none","vMin":0,"vMax":0,"vRate":1},{"divID":"svgl_dl_f_h_rate_div_lbl","parentID":"svgl_dl_area_main","data":{},"cc":{"x":366,"y":455,"w":88,"h":14},"pc":{"x":353,"y":204,"w":360,"h":440},"zIndex":-974,"display":true,"hAction":"none","hMin":0,"hMax":0,"hRate":1,"vAction":"none","vMin":0,"vMax":0,"vRate":1},{"divID":"svgl_dl_f_h_rate_inp_div","parentID":"svgl_dl_area_main","data":{},"cc":{"x":502,"y":451,"w":66,"h":23},"pc":{"x":353,"y":204,"w":360,"h":440},"zIndex":-973,"display":true,"hAction":"none","hMin":0,"hMax":0,"hRate":1,"vAction":"none","vMin":0,"vMax":0,"vRate":1},{"divID":"svgl_dl_f_v_action_div_lbl","parentID":"svgl_dl_area_main","data":{},"cc":{"x":366,"y":505,"w":81,"h":14},"pc":{"x":353,"y":204,"w":360,"h":440},"zIndex":-972,"display":true,"hAction":"none","hMin":0,"hMax":0,"hRate":1,"vAction":"none","vMin":0,"vMax":0,"vRate":1},{"divID":"svgl_dl_f_v_action_inp_r_none_div","parentID":"svgl_dl_area_main","data":{},"cc":{"x":502,"y":503,"w":18,"h":19},"pc":{"x":353,"y":204,"w":360,"h":440},"zIndex":-971,"display":true,"hAction":"none","hMin":0,"hMax":0,"hRate":1,"vAction":"none","vMin":0,"vMax":0,"vRate":1},{"divID":"svgl_dl_f_v_action_inp_r_none_div_lbl","parentID":"svgl_dl_area_main","data":{},"cc":{"x":521,"y":506,"w":28,"h":14},"pc":{"x":353,"y":204,"w":360,"h":440},"zIndex":-970,"display":true,"hAction":"none","hMin":0,"hMax":0,"hRate":1,"vAction":"none","vMin":0,"vMax":0,"vRate":1},{"divID":"svgl_dl_f_v_action_inp_r_move_div","parentID":"svgl_dl_area_main","data":{},"cc":{"x":580,"y":505,"w":18,"h":19},"pc":{"x":353,"y":204,"w":360,"h":440},"zIndex":-969,"display":true,"hAction":"none","hMin":0,"hMax":0,"hRate":1,"vAction":"none","vMin":0,"vMax":0,"vRate":1},{"divID":"svgl_dl_f_v_action_inp_r_move_div_lbl","parentID":"svgl_dl_area_main","data":{},"cc":{"x":600,"y":507,"w":30,"h":14},"pc":{"x":353,"y":204,"w":360,"h":440},"zIndex":-968,"display":true,"hAction":"none","hMin":0,"hMax":0,"hRate":1,"vAction":"none","vMin":0,"vMax":0,"vRate":1},{"divID":"svgl_dl_f_v_action_inp_r_grow_div","parentID":"svgl_dl_area_main","data":{},"cc":{"x":654,"y":505,"w":18,"h":19},"pc":{"x":353,"y":204,"w":360,"h":440},"zIndex":-967,"display":true,"hAction":"none","hMin":0,"hMax":0,"hRate":1,"vAction":"none","vMin":0,"vMax":0,"vRate":1},{"divID":"svgl_dl_f_v_action_inp_r_grow_div_lbl","parentID":"svgl_dl_area_main","data":{},"cc":{"x":673,"y":507,"w":27,"h":14},"pc":{"x":353,"y":204,"w":360,"h":440},"zIndex":-966,"display":true,"hAction":"none","hMin":0,"hMax":0,"hRate":1,"vAction":"none","vMin":0,"vMax":0,"vRate":1},{"divID":"svgl_dl_f_v_min_div_lbl","parentID":"svgl_dl_area_main","data":{},"cc":{"x":366,"y":527,"w":67,"h":14},"pc":{"x":353,"y":204,"w":360,"h":440},"zIndex":-965,"display":true,"hAction":"none","hMin":0,"hMax":0,"hRate":1,"vAction":"none","vMin":0,"vMax":0,"vRate":1},{"divID":"svgl_dl_f_v_min_inp_div","parentID":"svgl_dl_area_main","data":{},"cc":{"x":502,"y":523,"w":66,"h":23},"pc":{"x":353,"y":204,"w":360,"h":440},"zIndex":-964,"display":true,"hAction":"none","hMin":0,"hMax":0,"hRate":1,"vAction":"none","vMin":0,"vMax":0,"vRate":1},{"divID":"svgl_dl_f_v_max_div_lbl","parentID":"svgl_dl_area_main","data":{},"cc":{"x":366,"y":548,"w":70,"h":14},"pc":{"x":353,"y":204,"w":360,"h":440},"zIndex":-963,"display":true,"hAction":"none","hMin":0,"hMax":0,"hRate":1,"vAction":"none","vMin":0,"vMax":0,"vRate":1},{"divID":"svgl_dl_f_v_max_inp_div","parentID":"svgl_dl_area_main","data":{},"cc":{"x":502,"y":544,"w":66,"h":23},"pc":{"x":353,"y":204,"w":360,"h":440},"zIndex":-962,"display":true,"hAction":"none","hMin":0,"hMax":0,"hRate":1,"vAction":"none","vMin":0,"vMax":0,"vRate":1},{"divID":"svgl_dl_f_v_rate_div_lbl","parentID":"svgl_dl_area_main","data":{},"cc":{"x":366,"y":570,"w":73,"h":14},"pc":{"x":353,"y":204,"w":360,"h":440},"zIndex":-961,"display":true,"hAction":"none","hMin":0,"hMax":0,"hRate":1,"vAction":"none","vMin":0,"vMax":0,"vRate":1},{"divID":"svgl_dl_f_v_rate_inp_div","parentID":"svgl_dl_area_main","data":{},"cc":{"x":502,"y":565,"w":66,"h":23},"pc":{"x":353,"y":204,"w":360,"h":440},"zIndex":-960,"display":true,"hAction":"none","hMin":0,"hMax":0,"hRate":1,"vAction":"none","vMin":0,"vMax":0,"vRate":1},{"divID":"svgl_dl_btn_close_div","parentID":"svgl_dl_area_main","data":{},"cc":{"x":401,"y":616,"w":49,"h":22},"pc":{"x":353,"y":204,"w":360,"h":440},"zIndex":-959,"display":true,"hAction":"none","hMin":0,"hMax":0,"hRate":1,"vAction":"none","vMin":0,"vMax":0,"vRate":1},{"divID":"svgl_dl_btn_apply_div","parentID":"svgl_dl_area_main","data":{},"cc":{"x":504,"y":616,"w":50,"h":22},"pc":{"x":353,"y":204,"w":360,"h":440},"zIndex":-958,"display":true,"hAction":"none","hMin":0,"hMax":0,"hRate":1,"vAction":"none","vMin":0,"vMax":0,"vRate":1},{"divID":"svgl_dl_btn_save_div","parentID":"svgl_dl_area_main","data":{},"cc":{"x":609,"y":617,"w":44,"h":22},"pc":{"x":353,"y":204,"w":360,"h":440},"zIndex":-957,"display":true,"hAction":"none","hMin":0,"hMax":0,"hRate":1,"vAction":"none","vMin":0,"vMax":0,"vRate":1},{"divID":"svgl_dl_f_h_auto_div_lbl","parentID":"svgl_dl_area_main","data":{},"cc":{"x":366,"y":476,"w":129,"h":14},"pc":{"x":353,"y":204,"w":360,"h":440},"zIndex":-956,"display":true,"hAction":"none","hMin":0,"hMax":0,"hRate":1,"vAction":"none","vMin":0,"vMax":0,"vRate":1},{"divID":"svgl_dl_f_h_auto_inp_r_true_div","parentID":"svgl_dl_area_main","data":{},"cc":{"x":502,"y":474,"w":18,"h":19},"pc":{"x":353,"y":204,"w":360,"h":440},"zIndex":-955,"display":true,"hAction":"none","hMin":0,"hMax":0,"hRate":1,"vAction":"none","vMin":0,"vMax":0,"vRate":1},{"divID":"svgl_dl_f_h_auto_inp_r_true_div_lbl","parentID":"svgl_dl_area_main","data":{},"cc":{"x":521,"y":477,"w":21,"h":14},"pc":{"x":353,"y":204,"w":360,"h":440},"zIndex":-954,"display":true,"hAction":"none","hMin":0,"hMax":0,"hRate":1,"vAction":"none","vMin":0,"vMax":0,"vRate":1},{"divID":"svgl_dl_f_h_auto_inp_r_false_div","parentID":"svgl_dl_area_main","data":{},"cc":{"x":580,"y":474,"w":18,"h":19},"pc":{"x":353,"y":204,"w":360,"h":440},"zIndex":-953,"display":true,"hAction":"none","hMin":0,"hMax":0,"hRate":1,"vAction":"none","vMin":0,"vMax":0,"vRate":1},{"divID":"svgl_dl_f_h_auto_inp_r_false_div_lbl","parentID":"svgl_dl_area_main","data":{},"cc":{"x":600,"y":477,"w":26,"h":14},"pc":{"x":353,"y":204,"w":360,"h":440},"zIndex":-952,"display":true,"hAction":"none","hMin":0,"hMax":0,"hRate":1,"vAction":"none","vMin":0,"vMax":0,"vRate":1},{"divID":"svgl_dl_f_v_auto_div_lbl","parentID":"svgl_dl_area_main","data":{},"cc":{"x":366,"y":591,"w":114,"h":14},"pc":{"x":353,"y":204,"w":360,"h":440},"zIndex":-951,"display":true,"hAction":"none","hMin":0,"hMax":0,"hRate":1,"vAction":"none","vMin":0,"vMax":0,"vRate":1},{"divID":"svgl_dl_f_v_auto_inp_r_true_div","parentID":"svgl_dl_area_main","data":{},"cc":{"x":502,"y":589,"w":18,"h":19},"pc":{"x":353,"y":204,"w":360,"h":440},"zIndex":-950,"display":true,"hAction":"none","hMin":0,"hMax":0,"hRate":1,"vAction":"none","vMin":0,"vMax":0,"vRate":1},{"divID":"svgl_dl_f_v_auto_inp_r_true_div_lbl","parentID":"svgl_dl_area_main","data":{},"cc":{"x":521,"y":591,"w":21,"h":14},"pc":{"x":353,"y":204,"w":360,"h":440},"zIndex":-949,"display":true,"hAction":"none","hMin":0,"hMax":0,"hRate":1,"vAction":"none","vMin":0,"vMax":0,"vRate":1},{"divID":"svgl_dl_f_v_auto_inp_r_false_div","parentID":"svgl_dl_area_main","data":{},"cc":{"x":580,"y":589,"w":18,"h":19},"pc":{"x":353,"y":204,"w":360,"h":440},"zIndex":-948,"display":true,"hAction":"none","hMin":0,"hMax":0,"hRate":1,"vAction":"none","vMin":0,"vMax":0,"vRate":1},{"divID":"svgl_dl_f_v_auto_inp_r_false_div_lbl","parentID":"svgl_dl_area_main","data":{},"cc":{"x":600,"y":591,"w":26,"h":14},"pc":{"x":353,"y":204,"w":360,"h":440},"zIndex":-947,"display":true,"hAction":"none","hMin":0,"hMax":0,"hRate":1,"vAction":"none","vMin":0,"vMax":0,"vRate":1}]';

    switch(action) {
        case "create elements":

            //Dialog bacckground div
            $("<div id='svgl_dl_area_bg'/>").appendTo("body");
            $("#svgl_dl_area_bg").css({
                "background-color": "black",
                "opacity": "0.2"
            });

           //Dialog main div
            $("<div id='svgl_dl_area_main'/>").appendTo("body");
            $("#svgl_dl_area_main").css({
                "background-color": "#AFC8D7",
                "border": "4px solid #99AFBC"
            });
            
            //Form
            $("<form id='svgl_dl_form' name='svgldialog'/>").appendTo("body");
            $("#svgl_dl_form").css({
                "font-family": "Arial",
                "font-size": "12px"
            });
 
            //Title
            $("<div id='svgl_dl_title_div_lbl'/>").appendTo("#svgl_dl_form");
            $("#svgl_dl_title_div_lbl" ).text("SVGLayout Settings");
            $("#svgl_dl_title_div_lbl").css({
                "font-weight": "bold"
             });


            //Fields
            //Div ID
            $("<div id='svgl_dl_f_div_id_div_lbl'/>").appendTo("#svgl_dl_form");
            $("#svgl_dl_f_div_id_div_lbl" ).text("Div ID:  ");
            $("<div id='svgl_dl_f_div_id_inp_div'/>").appendTo("#svgl_dl_form");
            $("<input id='svgl_dl_f_div_id_inp' name='div_id' readonly='readonly'/>").appendTo("#svgl_dl_f_div_id_inp_div");
            $("#svgl_dl_f_div_id_inp").css({
                "width": "195px"
             });

            //Parent Div ID
            $("<div id='svgl_dl_f_parent_id_div_lbl'/>").appendTo("#svgl_dl_form");
            $("#svgl_dl_f_parent_id_div_lbl" ).text("Parent ID:  ");
            $("<div id='svgl_dl_f_parent_id_inp_div'/>").appendTo("#svgl_dl_form");
            $("<input id='svgl_dl_f_parent_id_inp' name='parent_id'/>").appendTo("#svgl_dl_f_parent_id_inp_div");
            $("#svgl_dl_f_parent_id_inp").css({
                "width": "195px"
             });


            //Coordinates
            //x
            $("<div id='svgl_dl_f_ccx_div_lbl'/>").appendTo("#svgl_dl_form");
            $("#svgl_dl_f_ccx_div_lbl" ).text("x:  ");
            $("<div id='svgl_dl_f_ccx_inp_div'/>").appendTo("#svgl_dl_form");
            $("<input id='svgl_dl_f_ccx_inp' name='ccx'/>").appendTo("#svgl_dl_f_ccx_inp_div");
            $("#svgl_dl_f_ccx_inp").css({
                "width": "60px"
             });

            //y
            $("<div id='svgl_dl_f_ccy_div_lbl'/>").appendTo("#svgl_dl_form");
            $("#svgl_dl_f_ccy_div_lbl" ).text("y:  ");
            $("<div id='svgl_dl_f_ccy_inp_div'/>").appendTo("#svgl_dl_form");
            $("<input id='svgl_dl_f_ccy_inp' name='ccy'/>").appendTo("#svgl_dl_f_ccy_inp_div");
            $("#svgl_dl_f_ccy_inp").css({
                "width": "60px"
             });

            //w
            $("<div id='svgl_dl_f_ccw_div_lbl'/>").appendTo("#svgl_dl_form");
            $("#svgl_dl_f_ccw_div_lbl" ).text("width:  ");
            $("<div id='svgl_dl_f_ccw_inp_div'/>").appendTo("#svgl_dl_form");
            $("<input id='svgl_dl_f_ccw_inp' name='ccw'/>").appendTo("#svgl_dl_f_ccw_inp_div");
            $("#svgl_dl_f_ccw_inp").css({
                "width": "60px"
             });

            //h
            $("<div id='svgl_dl_f_cch_div_lbl'/>").appendTo("#svgl_dl_form");
            $("#svgl_dl_f_cch_div_lbl" ).text("height:  ");
            $("<div id='svgl_dl_f_cch_inp_div'/>").appendTo("#svgl_dl_form");
            $("<input id='svgl_dl_f_cch_inp' name='cch'/>").appendTo("#svgl_dl_f_cch_inp_div");
            $("#svgl_dl_f_cch_inp").css({
                "width": "60px"
             });


            //Horizontal
            //Horizontal Action Label
            $("<div id='svgl_dl_f_h_action_div_lbl'/>").appendTo("#svgl_dl_form");
            $("#svgl_dl_f_h_action_div_lbl" ).text("Horizontal Action:  ");
            //Horizontal Action radio- none
            $("<div id='svgl_dl_f_h_action_inp_r_none_div'/>").appendTo("#svgl_dl_form");
            $("<input id='svgl_dl_f_h_action_inp_r_none' type='radio' name='h_action' value='none'/>").appendTo("#svgl_dl_f_h_action_inp_r_none_div");
            $("<div id='svgl_dl_f_h_action_inp_r_none_div_lbl'/>").appendTo("#svgl_dl_form");
            $("#svgl_dl_f_h_action_inp_r_none_div_lbl" ).text("none");
 
            //Horizontal Action radio- move
            $("<div id='svgl_dl_f_h_action_inp_r_move_div'/>").appendTo("#svgl_dl_form");
            $("<input id='svgl_dl_f_h_action_inp_r_move' type='radio' name='h_action' value='move'/>").appendTo("#svgl_dl_f_h_action_inp_r_move_div");
            $("<div id='svgl_dl_f_h_action_inp_r_move_div_lbl'/>").appendTo("#svgl_dl_form");
            $("#svgl_dl_f_h_action_inp_r_move_div_lbl" ).text("move");
 
            //Horizontal Action radio- grow
            $("<div id='svgl_dl_f_h_action_inp_r_grow_div'/>").appendTo("#svgl_dl_form");
            $("<input id='svgl_dl_f_h_action_inp_r_grow' type='radio' name='h_action' value='grow'/>").appendTo("#svgl_dl_f_h_action_inp_r_grow_div");
            $("<div id='svgl_dl_f_h_action_inp_r_grow_div_lbl'/>").appendTo("#svgl_dl_form");
            $("#svgl_dl_f_h_action_inp_r_grow_div_lbl" ).text("grow");

            //Horizontal Min
            $("<div id='svgl_dl_f_h_min_div_lbl'/>").appendTo("#svgl_dl_form");
            $("#svgl_dl_f_h_min_div_lbl" ).text("Horizontal Min:  ");
            $("<div id='svgl_dl_f_h_min_inp_div'/>").appendTo("#svgl_dl_form");
            $("<input id='svgl_dl_f_h_min_inp' name='h_min'/>").appendTo("#svgl_dl_f_h_min_inp_div");
            $("#svgl_dl_f_h_min_inp").css({
                "width": "60px"
             });

            //Horizontal Max
            $("<div id='svgl_dl_f_h_max_div_lbl'/>").appendTo("#svgl_dl_form");
            $("#svgl_dl_f_h_max_div_lbl" ).text("Horizontal Max:  ");
            $("<div id='svgl_dl_f_h_max_inp_div'/>").appendTo("#svgl_dl_form");
            $("<input id='svgl_dl_f_h_max_inp' name='h_max'/>").appendTo("#svgl_dl_f_h_max_inp_div");
            $("#svgl_dl_f_h_max_inp").css({
                "width": "60px"
             });

            //Horizontal Rate
            $("<div id='svgl_dl_f_h_rate_div_lbl'/>").appendTo("#svgl_dl_form");
            $("#svgl_dl_f_h_rate_div_lbl" ).text("Horizontal Rate:  ");
            $("<div id='svgl_dl_f_h_rate_inp_div'/>").appendTo("#svgl_dl_form");
            $("<input id='svgl_dl_f_h_rate_inp' name='h_rate'/>").appendTo("#svgl_dl_f_h_rate_inp_div");
            $("#svgl_dl_f_h_rate_inp").css({
                "width": "60px"
             });

            //Horizontal Auto Resize Label
            $("<div id='svgl_dl_f_h_auto_div_lbl'/>").appendTo("#svgl_dl_form");
            $("#svgl_dl_f_h_auto_div_lbl" ).text("Horizontal Auto-Resize:  ");
            //Horizontal Auto-Resize radio- true
            $("<div id='svgl_dl_f_h_auto_inp_r_true_div'/>").appendTo("#svgl_dl_form");
            $("<input id='svgl_dl_f_h_auto_inp_r_true' type='radio' name='h_auto' value='true'/>").appendTo("#svgl_dl_f_h_auto_inp_r_true_div");
            $("<div id='svgl_dl_f_h_auto_inp_r_true_div_lbl'/>").appendTo("#svgl_dl_form");
            $("#svgl_dl_f_h_auto_inp_r_true_div_lbl" ).text("true");
 
            //Horizontal Auto-Resize radio- false
            $("<div id='svgl_dl_f_h_auto_inp_r_false_div'/>").appendTo("#svgl_dl_form");
            $("<input id='svgl_dl_f_h_auto_inp_r_false' type='radio' name='h_auto' value='false'/>").appendTo("#svgl_dl_f_h_auto_inp_r_false_div");
            $("<div id='svgl_dl_f_h_auto_inp_r_false_div_lbl'/>").appendTo("#svgl_dl_form");
            $("#svgl_dl_f_h_auto_inp_r_false_div_lbl" ).text("false");


            //Vertical
            //Horizontal Action Label
            $("<div id='svgl_dl_f_v_action_div_lbl'/>").appendTo("#svgl_dl_form");
            $("#svgl_dl_f_v_action_div_lbl" ).text("Vertical Action:  ");
            //Vertical Action radio- none
            $("<div id='svgl_dl_f_v_action_inp_r_none_div'/>").appendTo("#svgl_dl_form");
            $("<input id='svgl_dl_f_v_action_inp_r_none' type='radio' name='v_action' value='none'/>").appendTo("#svgl_dl_f_v_action_inp_r_none_div");
            $("<div id='svgl_dl_f_v_action_inp_r_none_div_lbl'/>").appendTo("#svgl_dl_form");
            $("#svgl_dl_f_v_action_inp_r_none_div_lbl" ).text("none");
 
            //Vertical Action radio- move
            $("<div id='svgl_dl_f_v_action_inp_r_move_div'/>").appendTo("#svgl_dl_form");
            $("<input id='svgl_dl_f_v_action_inp_r_move' type='radio' name='v_action' value='move'/>").appendTo("#svgl_dl_f_v_action_inp_r_move_div");
            $("<div id='svgl_dl_f_v_action_inp_r_move_div_lbl'/>").appendTo("#svgl_dl_form");
            $("#svgl_dl_f_v_action_inp_r_move_div_lbl" ).text("move");
 
            //Vertical Action radio- grow
            $("<div id='svgl_dl_f_v_action_inp_r_grow_div'/>").appendTo("#svgl_dl_form");
            $("<input id='svgl_dl_f_v_action_inp_r_grow' type='radio' name='v_action' value='grow'/>").appendTo("#svgl_dl_f_v_action_inp_r_grow_div");
            $("<div id='svgl_dl_f_v_action_inp_r_grow_div_lbl'/>").appendTo("#svgl_dl_form");
            $("#svgl_dl_f_v_action_inp_r_grow_div_lbl" ).text("grow");

            //Vertical Min
            $("<div id='svgl_dl_f_v_min_div_lbl'/>").appendTo("#svgl_dl_form");
            $("#svgl_dl_f_v_min_div_lbl" ).text("Vertical Min:  ");
            $("<div id='svgl_dl_f_v_min_inp_div'/>").appendTo("#svgl_dl_form");
            $("<input id='svgl_dl_f_v_min_inp' name='v_min'/>").appendTo("#svgl_dl_f_v_min_inp_div");
            $("#svgl_dl_f_v_min_inp").css({
                "width": "60px"
             });

            //Vertical Max
            $("<div id='svgl_dl_f_v_max_div_lbl'/>").appendTo("#svgl_dl_form");
            $("#svgl_dl_f_v_max_div_lbl" ).text("Vertical Max:  ");
            $("<div id='svgl_dl_f_v_max_inp_div'/>").appendTo("#svgl_dl_form");
            $("<input id='svgl_dl_f_v_max_inp' name='v_max'/>").appendTo("#svgl_dl_f_v_max_inp_div");
            $("#svgl_dl_f_v_max_inp").css({
                "width": "60px"
             });

            //Vertical Rate
            $("<div id='svgl_dl_f_v_rate_div_lbl'/>").appendTo("#svgl_dl_form");
            $("#svgl_dl_f_v_rate_div_lbl" ).text("Vertical Rate:  ");
            $("<div id='svgl_dl_f_v_rate_inp_div'/>").appendTo("#svgl_dl_form");
            $("<input id='svgl_dl_f_v_rate_inp' name='v_rate'/>").appendTo("#svgl_dl_f_v_rate_inp_div");
            $("#svgl_dl_f_v_rate_inp").css({
                "width": "60px"
             });

            //Vertical Auto Resize Label
            $("<div id='svgl_dl_f_v_auto_div_lbl'/>").appendTo("#svgl_dl_form");
            $("#svgl_dl_f_v_auto_div_lbl" ).text("Vertical Auto-Resize:  ");
            //Vertical Auto-Resize radio- true
            $("<div id='svgl_dl_f_v_auto_inp_r_true_div'/>").appendTo("#svgl_dl_form");
            $("<input id='svgl_dl_f_v_auto_inp_r_true' type='radio' name='v_auto' value='true'/>").appendTo("#svgl_dl_f_v_auto_inp_r_true_div");
            $("<div id='svgl_dl_f_v_auto_inp_r_true_div_lbl'/>").appendTo("#svgl_dl_form");
            $("#svgl_dl_f_v_auto_inp_r_true_div_lbl" ).text("true");
 
            //Vertical Auto-Resize radio- false
            $("<div id='svgl_dl_f_v_auto_inp_r_false_div'/>").appendTo("#svgl_dl_form");
            $("<input id='svgl_dl_f_v_auto_inp_r_false' type='radio' name='v_auto' value='false'/>").appendTo("#svgl_dl_f_v_auto_inp_r_false_div");
            $("<div id='svgl_dl_f_v_auto_inp_r_false_div_lbl'/>").appendTo("#svgl_dl_form");
            $("#svgl_dl_f_v_auto_inp_r_false_div_lbl" ).text("false");


            //Form Buttons
            //Close
            $("<div id='svgl_dl_btn_close_div'/>").appendTo("#svgl_dl_form");
            $("<input id='svgl_dl_btn_close' name='closeBtn' value='Close' type='button'/>").appendTo("#svgl_dl_btn_close_div");

            //Apply
            $("<div id='svgl_dl_btn_apply_div'/>").appendTo("#svgl_dl_form");
            $("<input id='svgl_dl_btn_apply' name='closeBtn' value='Apply' type='button'/>").appendTo("#svgl_dl_btn_apply_div");

            //Save
            $("<div id='svgl_dl_btn_save_div'/>").appendTo("#svgl_dl_form");
            $("<input id='svgl_dl_btn_save' name='closeBtn' value='Save' type='button'/>").appendTo("#svgl_dl_btn_save_div");
            return true;

        case "open":

            var co;
            if(typeof svglDialogOpen === 'boolean') {
                if(svglDialogOpen) {
                    return false;
                }
            }
            svglDialogOpen = true;
            sc = 0; //selected count
            
            dlParentID = "";
            hAction = "";
            hMin = "";
            hMax = "";
            hRate = "";
            hAuto = "";
            vAction = "";
            vMin = "";
            vMax = "";
            vRate = "";
            vAuto = "";

            for (i = 0; i < sl.DivObj.length; i++) {
                if (sl.DivObj[i].isSelected) {
                    sc++;
                    co = sl.DivObj[i].getCoordinates();
                    if(sc === 1) {
                        dlDivID = sl.DivObj[i].divID;
                        dlParentID = sl.DivObj[i].parent.divID;
                        ccx = co.x;
                        ccy = co.y;
                        ccw = co.w;
                        cch = co.h;
                        hAction = sl.DivObj[i].hAction;
                        hMin = sl.DivObj[i].hMin;
                        hMax = sl.DivObj[i].hMax;
                        hRate = sl.DivObj[i].hRate;
                        hAuto = sl.DivObj[i].hAuto.toString();
                        vAction = sl.DivObj[i].vAction;
                        vMin = sl.DivObj[i].vAction;
                        vMax = sl.DivObj[i].vRate;
                        vRate = sl.DivObj[i].vRate;
                        vAuto = sl.DivObj[i].vAuto.toString();
                   }
                    else {
                        if (dlDivID !== sl.DivObj[i].divID) {
                            dlDivID = "";
                        }
                        if (dlParentID !== sl.DivObj[i].parent.divID) {
                            dlParentID = "";
                        }
                        if (ccx !== co.x) {
                            ccx = "";
                        }
                        if (ccy !== co.y) {
                            ccy = "";
                        }
                        if (ccw !== co.w) {
                            ccw = "";
                        }
                        if (cch !== co.h) {
                            cch = "";
                        }
                        if (hAction !== sl.DivObj[i].hAction) {
                            hAction = "";
                        }
                        if (hMin !== sl.DivObj[i].hMin) {
                            hMin = "";
                        }
                        if (hMax !== sl.DivObj[i].hMax) {
                            hMax = "";
                        }
                        if (hRate !== sl.DivObj[i].hRate) {
                            hRate = "";
                        }
                        if (hAuto !== sl.DivObj[i].hAuto) {
                            hAuto = "";
                        }
                        if (vAction !== sl.DivObj[i].vAction) {
                            vAction = "";
                        }
                        if (vMin !== sl.DivObj[i].vMin) {
                            vMin = "";
                        }
                        if (vMax !== sl.DivObj[i].vMax) {
                            vMax = "";
                        }
                        if (vRate !== sl.DivObj[i].valRate) {
                            vRate = "";
                        }
                        if (vAuto !== sl.DivObj[i].vAuto) {
                            vAuto = "";
                        }
                    }
                }
            }

            if (sc === 0) {
                alert("No elements have been selected");
                return false;
            }

            svglDialog (sl, "create elements");

            svglc = new SVGLayout();
            svglc.zBase = sl.zBase + 10000;
            svglc.importJSON(svglDialogJSON);

            //Fields
            //Div ID
            if(sc > 1) {
                $("#svgl_dl_f_div_id_div_lbl" ).hide();
                $("#svgl_dl_f_div_id_inp" ).hide();
                $("#svgl_dl_f_div_id_inp_div" ).text(sc.toString() + " elements selected");
            }
            else {
                $("#svgl_dl_f_div_id_inp").val(dlDivID);
            }

            $("#svgl_dl_f_parent_id_inp").val(dlParentID);

            $("#svgl_dl_f_ccx_inp").val(ccx);
            $("#svgl_dl_f_ccy_inp").val(ccy);
            $("#svgl_dl_f_ccw_inp").val(ccw);
            $("#svgl_dl_f_cch_inp").val(cch);

            $('#svgl_dl_f_h_action_inp_r_none').prop('checked', (hAction === "none"));
            $('#svgl_dl_f_h_action_inp_r_move').prop('checked', (hAction === "move"));
            $('#svgl_dl_f_h_action_inp_r_grow').prop('checked', (hAction === "grow"));

            $("#svgl_dl_f_h_min_inp").val(hMin);
            $("#svgl_dl_f_h_max_inp").val(hMax);
            $("#svgl_dl_f_h_rate_inp").val(hRate);
            $('#svgl_dl_f_h_auto_inp_r_true').prop('checked', (hAuto === "true"));
            $('#svgl_dl_f_h_auto_inp_r_false').prop('checked', (hAuto === "false"));


            $('#svgl_dl_f_v_action_inp_r_none').prop('checked', (vAction === "none"));
            $('#svgl_dl_f_v_action_inp_r_move').prop('checked', (vAction === "move"));
            $('#svgl_dl_f_v_action_inp_r_grow').prop('checked', (vAction === "grow"));

            $("#svgl_dl_f_v_min_inp").val(hMin);
            $("#svgl_dl_f_v_max_inp").val(hMax);
            $("#svgl_dl_f_v_rate_inp").val(vRate);
            $('#svgl_dl_f_v_auto_inp_r_true').prop('checked', (vAuto === "true"));
            $('#svgl_dl_f_v_auto_inp_r_false').prop('checked', (vAuto === "false"));

            function entryRules() {
                hAction = $('input[name=h_action]:checked', '#svgl_dl_form').val();
                hAuto = $('input[name=h_auto]:checked', '#svgl_dl_form').val();
                vAction = $('input[name=v_action]:checked', '#svgl_dl_form').val();
                vAuto = $('input[name=v_auto]:checked', '#svgl_dl_form').val();
                if(hAction === "grow") {
                    $('#svgl_dl_f_h_auto_inp_r_true').prop('disabled', true);
                    $('#svgl_dl_f_h_auto_inp_r_false').prop('disabled', true);
                }
                else {
                    $('#svgl_dl_f_h_auto_inp_r_true').prop('disabled', false);
                    $('#svgl_dl_f_h_auto_inp_r_false').prop('disabled', false);
                }
                if(vAction === "grow") {
                    $('#svgl_dl_f_v_auto_inp_r_true').prop('disabled', true);
                    $('#svgl_dl_f_v_auto_inp_r_false').prop('disabled', true);
                }
                else {
                    $('#svgl_dl_f_v_auto_inp_r_true').prop('disabled', false);
                    $('#svgl_dl_f_v_auto_inp_r_false').prop('disabled', false);
                }
                if(hAuto === "true") {
                    $('#svgl_dl_f_h_action_inp_r_grow').prop('disabled', true);
                }
                else {
                    $('#svgl_dl_f_h_action_inp_r_grow').prop('disabled', false);
                }
                if(vAuto === "true") {
                    $('#svgl_dl_f_v_action_inp_r_grow').prop('disabled', true);
                }
                else {
                    $('#svgl_dl_f_v_action_inp_r_grow').prop('disabled', false);
                }
            }

            $("#svgl_dl_f_parent_id_inp" ).change(function() {
                if($("#svgl_dl_f_parent_id_inp").val() === dlDivID && dlDivID > "") {
                    alert("A Div cannot be its own parent");
                    $("#svgl_dl_f_parent_id_inp").val(dlParentID);
                }
            });

            $('input[name=h_action]').change(function() {
                entryRules();
            });
            $('input[name=v_action]').change(function() {
                entryRules();
            });
            $('input[name=h_auto]').change(function() {
                entryRules();
            });
            $('input[name=v_auto]').change(function() {
                entryRules();
            });

            $("#svgl_dl_btn_close" ).click(function() {
                svglDialog (sl, "close");
            });
            $("#svgl_dl_btn_apply" ).click(function() {
                svglDialog (sl, "apply");
            });
            $("#svgl_dl_btn_save" ).click(function() {
                svglDialog (sl, "save");
            });

            svgl_dl_el_main = svglc.getDivByID('svgl_dl_area_main');

            svgl_dl_el_main.onResizingParent = function () {
                var pc;
                pc = this.parent.getCoordinates();
                this.cc.w = 360;
                this.cc.h = 440;
                this.cc.x = (pc.w/2) - (this.cc.w/2);
                this.cc.y = (pc.h/2) - (this.cc.h/2);
                this.applyCoordinates(this.cc.x, this.cc.y, this.cc.w, this.cc.h);
            };

            svgl_dl_area_bg = svglc.getDivByID('svgl_dl_area_bg');

            svgl_dl_area_bg.onResizingParent = function () {
                this.cc.x = 0;
                this.cc.y = 0;
                this.cc.w = $(document).width;
                this.cc.h = $(document).height;
                this.applyCoordinates();
            };

            svgl_dl_el_main.resizeDiv();
            entryRules();
            return true;

        case "close":
            svglDialogOpen = false;
            $('#svgl_dl_area_bg').remove();
            $('#svgl_dl_area_main').remove();
            $('#svgl_dl_form').remove();
            sl.selectNone();
            svglDelete(svglc);
            return true;

        case "apply":

            dlParentID = document.svgldialog.parent_id.value;
            if($("#" + dlParentID).length && dlParentID !== "" && dlParentID !== "window") {
                //Find the id amoung the DivID elements
                found = false;
                for (i = 0; i < sl.DivObj.length; i++) {
                    if(dlParentID === sl.DivObj[i].divID) {
                        found = true;
                    }
                }
                if (found === false) {
                    alert("A valid Parent ID was not entered");
                    return false;
                }
            }

            ccx = document.svgldialog.ccx.value;
            ccy = document.svgldialog.ccy.value;
            ccw = document.svgldialog.ccw.value;
            cch = document.svgldialog.cch.value;

            hAction = $('input[name=h_action]:checked', '#svgl_dl_form').val();
            hMin = document.svgldialog.h_min.value;
            hMax = document.svgldialog.h_max.value;
            hRate = document.svgldialog.h_rate.value;
            hAuto = $('input[name=h_auto]:checked', '#svgl_dl_form').val();

            vAction = $('input[name=v_action]:checked', '#svgl_dl_form').val();
            vMin = document.svgldialog.v_min.value;
            vMax = document.svgldialog.v_max.value;
            vRate = document.svgldialog.v_rate.value;
            vAuto = $('input[name=v_auto]:checked', '#svgl_dl_form').val();

            for (i = 0; i < sl.DivObj.length; i++) {
                if (sl.DivObj[i].isSelected && sl.DivObj[i].isVisible) {
                    paramObj = {};
                    paramObj.cc = {};
                    if (dlParentID > "") {
                        paramObj.parentID = dlParentID;
                    }
                    if (ccx > "") {
                        paramObj.cc.x = parseInt(ccx,10);
                    }
                    if (ccy > "") {
                        paramObj.cc.y = parseInt(ccy,10);
                    }
                    if (ccw > "") {
                        paramObj.cc.w = parseInt(ccw,10);
                    }
                    if (cch > "") {
                        paramObj.cc.h = parseInt(cch,10);
                    }
                    if (hAction > "") {
                        paramObj.hAction = hAction;
                    }
                    if (hMin > "") {
                        paramObj.hMin = parseInt(hMin,10);
                    }
                    if (hMax > "") {
                        paramObj.hMax = parseInt(hMax,10);
                    }
                    if (hRate > "") {
                        paramObj.hRate = parseFloat(hRate);
                    }
                    if (hAuto > "") {
                        paramObj.hAuto = (hAuto === "true");
                    }
                    if (vAction > "") {
                        paramObj.vAction = vAction;
                    }
                    if (vMin > "") {
                        paramObj.vMin = parseInt(vMin,10);
                    }
                    if (vMax > "") {
                        paramObj.vMax = parseInt(vMax,10);
                    }
                    if (vRate > "") {
                        paramObj.vRate = parseFloat(vRate);
                    }
                    if (vAuto > "") {
                        paramObj.vAuto = (vAuto === "true");
                    }
                    sl.DivObj[i].setParameters(paramObj, true);
                    sl.DivObj[i].setCoordinates(-1, -1, -1, -1);
                }
            }
            sl.trim();
            return true;

        case "save":
            if(svglDialog (sl, "apply")) {
                svglDialog (sl, "close");
                return true;
            }
            return false;
     }
}

