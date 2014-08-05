/*
 * svglayout.js 0.8.0 Alpha - JavaScript SVGLayout Tools Library
 *
 * Copyright (c) 2014 Thomas DeMeo 
 * Copyright (c) 2014 Waltham Software Corp. All rights reserved.
 * Licensed under the MIT (http://www.svglayout.com/mit_license/index.html) license.
 */

var svglLayoutList;
svglLayoutList = [];

//Constructor
function SVGLayout() {

    'use strict';
    var sl, overlay, selectRect, overAnElement, move, start, up, svglWindow, lastEvent;

    sl = this;
    svglLayoutList.push(this);
    sl.DivObj = [];
    sl.thresholds = [];
    sl.currentThreshold = {};
    sl.currentThreshold.name = "";
    sl.currentThreshold.maxwidth = 0;

    sl.action = "";
    sl.isActive = false;
    sl.isZIBadgeOn = false;
    sl.isCOBadgeOn = false;

    //We use DataURI to assign a transparent 1 px gif. Used for event layer.
    sl.bgEventGIF = "data:image/gif;base64,R0lGODdhCgAKAIAAAAYAAAAAACH5BAEAAAEALAAAAAAKAAoAAAIIjI+py+0PYysAOw==";

     //<Configs______________________________________________
    sl.nextDivX = 25;
    sl.nextDivY = 25;
    sl.zBase = -1000;
    sl.nudgePx = 1;
    sl.selectorLineColor = "cornflowerblue";
    sl.selectedLineColor = "red";
    sl.unselectedLineColor = "gray";
    sl.lockedLineColor = "green";
    sl.ZIBadgesColor = "red";
    sl.COBadgesColor = "gray";
    sl.defaultWidth = 50;
    sl.defaultHeight = 50;
    //Configs>______________________________________________

    sl.firstDivX = sl.nextDivX;
    sl.firstDivY = sl.nextDivY;

    sl.x = 0;
    sl.y = 0;
    sl.w = $(window).width();
    sl.h = $(window).height();
    sl.paper = Raphael(sl.x, sl.y, sl.w, sl.h);

    svglWindow = {}; //used to represent the window
    svglWindow.divID = "window";
    svglWindow.getCoordinates = function () {
        var co;
        co = {};
        co.x = $(document).scrollTop();
        co.y = $(document).scrollLeft();
        co.w = $(window).width();
        co.h = $(window).height();
        return co;
    };

    overlay = {};
    overlay.rel = sl.paper.image(sl.bgEventGIF, 0, 0, sl.w, sl.h);

    overlay.rel.mousemove(function(e) {
        var mode, wx, wy;
        wx = $(document).scrollLeft() + e.clientX;
        wy = $(document).scrollTop() + e.clientY;

        mode = overAnElement(wx, wy, false);
        switch(mode) {
            case "drag":
                overlay.rel.attr("cursor", "move");
                break;
            case "resize":
                overlay.rel.attr("cursor", "se-resize");
                break;
            case "select":
                overlay.rel.attr("cursor", "crosshair");
                break;
         }
    });

    overlay.rel.dblclick(function(e) {
        var i, overObj, co, wx, wy;

        wx = $(document).scrollLeft() + e.clientX;
        wy = $(document).scrollTop() + e.clientY;

        for (i = sl.DivObj.length - 1; i >= 0; i--) { //reverse order
            if (sl.DivObj[i].isVisible && sl.DivObj[i].isLocked === false) {
                sl.DivObj[i].select(false);
                co = sl.DivObj[i].getCoordinates();
                if (wx >= co.x && wx <= (co.x + co.w) && wy >= co.y && wy <= (co.y + co.h)) {
                    if (typeof overObj === 'undefined') {
                        overObj = sl.DivObj[i];
                    }
                }
            }
       }
        if (typeof overObj === 'object') {
            overObj.select(true);
            overObj.onDoubleClick();
        }
    });

    overlay.rel.node.onkeydown = function(e) {
        lastEvent = e;
    };

    overlay.rel.node.onkeyup = function(e) {
        lastEvent = e;
    };

    //Tests if initial click is over an element
    overAnElement = function (x, y, selectOn) {
        var i, co, overObj, mode;
        //Effectively, this is a global on mouse down event
        //Tests if the initial x and y intersects with an object
        //Handles mouse down selection issues 
        mode = "select";
        for (i = sl.DivObj.length - 1; i >= 0; i--) { //reverse order
            if (sl.DivObj[i].isVisible && sl.DivObj[i].isLocked === false) {
                co = sl.DivObj[i].getCoordinates();
                //First, check for over the rHandle 
                if (x >= co.x + co.w - 4 && x <= co.x + co.w + 4 && y >= co.y + co.h - 4 && y <= co.y + co.h + 4) {
                    overObj = sl.DivObj[i];
                    mode = "resize";
                    break;
                }
                if (x >= co.x && x <= (co.x + co.w) && y >= co.y && y <= (co.y + co.h)) {
                    overObj = sl.DivObj[i];
                    mode = "drag";
                    break;
                }
            }
       }
        if (selectOn) {
             if (typeof overObj === "object") {
                if (overObj.isSelected) {
                    if (sl.altKeyDown(lastEvent))  {
                        overObj.select(false);
                    }
                }
                else {http://raphaeljs.com/reference.html#Element.id
                    if (sl.altKeyDown(lastEvent) === false)  {
                        sl.selectNone();
                    }
                    overObj.select(true);
                }
            }
            else {
                sl.selectNone();
            }
        }
        return mode;
    };

    start = function (x,y) {
        var i, co;
        sl.sx = x;
        sl.sy = y;
        sl.action = overAnElement(x, y, true);
        if (sl.action === "select") {
            selectRect = sl.paper.rect(x, y, 1, 1);
            selectRect.attr("stroke",sl.selectorLineColor);
            selectRect.attr("stroke-width",0.5);
        }
        for (i = 0; i < sl.DivObj.length; (i++)) {
            if (sl.DivObj[i].isSelected) {
                co = sl.DivObj[i].getCoordinates();
                sl.DivObj[i].sx = co.x;
                sl.DivObj[i].sy = co.y;
                sl.DivObj[i].sw = co.w;
                sl.DivObj[i].sh = co.h;
            }
        }
     };

    move = function (dx, dy, x, y) {
        var i, mx, my, mw, mh, drBBox, srBBox;
        if (sl.action === "drag") {
            mx = x - sl.sx;
            my = y - sl.sy;
            for (i = 0; i < sl.DivObj.length; i++) {
                if (sl.DivObj[i].isSelected) {
                    sl.DivObj[i].setCoordinates(sl.DivObj[i].sx + mx, sl.DivObj[i].sy + my, -1, -1);
                }
            }
        }
        if (sl.action === "resize") {
            mw = x - sl.sx;
            mh = y - sl.sy;
            for (i = 0; i < sl.DivObj.length; i++) {
                if (sl.DivObj[i].isSelected) {
                    sl.DivObj[i].setCoordinates(-1, -1, sl.DivObj[i].sw + mw, sl.DivObj[i].sh + mh);
                }
            }
        }
        if (sl.action === "select") {
            if (dx > 0) {
                mx = sl.sx;
                mw = x - mx;
            }
            else {
                mx = x;
                mw = sl.sx - x;
            }
            if (dy > 0) {
                my = sl.sy;
                mh = y - my;
            }
            else {
                my = y;
                mh = sl.sy - y;
            }
            selectRect.attr("x", mx);
            selectRect.attr("y", my);
            selectRect.attr("width", mw);
            selectRect.attr("height", mh);
            srBBox = selectRect.getBBox();
            for (i = 0; i < sl.DivObj.length; i++) {
                if (sl.DivObj[i].isSelected === false && sl.DivObj[i].isVisible) {
                    drBBox = sl.DivObj[i].rel.getBBox();
                    if (Raphael.isBBoxIntersect(srBBox, drBBox)) {
                        sl.DivObj[i].select(true);
                    }
                }
            }
        }
    };

    up = function () {
        if (sl.action === "select") {
            selectRect.remove();
        }
        overlay.rel.attr("cursor", "default");
        sl.trim();
    };
    
    overlay.rel.drag(move, start, up);

    sl.setThreshold = function (name, maxwidth) {
        var threshold;
        threshold = {};
        threshold.name = name;
        threshold.maxwidth = maxwidth;
        sl.thresholds.push(threshold);
        sl.thresholds.sort(function(a, b) {
            return a.maxwidth-b.maxwidth;
        });
    };

    sl.getThreshold = function () {
        var i, win_width, name, maxwidth;
        win_width = $(window).width();
        name = "";
        maxwidth = 0;
        for (i = 0; i < sl.thresholds.length; (i++)) {
            if(win_width <= sl.thresholds[i].maxwidth) {
                name = sl.thresholds[i].name;
                maxwidth = sl.thresholds[i].maxwidth;
                break;
            }
        }
        if (sl.currentThreshold.name !== name) {
            sl.currentThreshold.name = name;
            sl.currentThreshold.maxwidth = maxwidth;
            sl.onChangeThreshold();
        }
    };

    sl.onChangeThreshold = function () {
       
    };

    sl.afterResize = function () {

    };

    sl.shifKeyDown = function (e) {
        if(!e) {
            e = window.event;
        }
        if (e.shiftKey ) {
            return true;
        }
        return false;
    };

    sl.altKeyDown = function (e) {
        if (!e) {
            e = window.event;
        }
        if (e.altKey ) {
            return true;
        }
        return false;
    };

    sl.getDivByID = function (id) {
        var i;
        for (i = 0; i < sl.DivObj.length; i++) {
            if(sl.DivObj[i].divID === id) {
                return(sl.DivObj[i]);
            }
        }
        return("no Div object found with that ID");
    };

    sl.resizeLayout = function () {
        var i, isActive;
        isActive = sl.isActive;
        for (i = sl.DivObj.length - 1; i >= 0; i--) { //reverse order
            if (sl.DivObj[i].parent === svglWindow) {
                sl.DivObj[i].resizeDiv();
            }
        }
        sl.afterResize();
        if(isActive === false) {
            sl.activateLayout(false);
        }
    };

    sl.lockSelection = function () {
        var i;
        for (i = 0; i < sl.DivObj.length; i++) {
            if (sl.DivObj[i].isSelected) {
                sl.DivObj[i].lock();
                sl.DivObj[i].select(false);
            }
        }
    };

    sl.unlockAll = function () {
        var i;
        for (i = 0; i < sl.DivObj.length; i++) {
            sl.DivObj[i].unlock();
        }
    };

    sl.activateLayout = function (isActivated) {
        var i, visible;
        if (isActivated) {
            sl.isActive = true;
            sl.paper.setSize(sl.w, sl.h);
            overlay.rel.show();
            for (i = 0; i < sl.DivObj.length; i++) {
                sl.DivObj[i].isVisible = (sl.DivObj[i].div.css('display') !== 'none');
                if(sl.DivObj[i].isVisible) {
                    sl.DivObj[i].show();
                }
            }
        }
        else {
            sl.isActive = false;
            sl.paper.setSize(1, 1);
            overlay.rel.hide();
            for (i = 0; i < sl.DivObj.length; i++) {
                sl.DivObj[i].hide();
            }
        }
    };

    sl.adjustPaper = function () {
        var dw, dh;
        //if necessary, the SVG paper size is enlarged to accomodate the object.
        //It can also be trimmed down from sl.trim
        dw = parseInt(Math.max($(document).width(),$(window).width()),10);
        dh = parseInt(Math.max($(document).height(),$(window).height()),10);
        if(dw > sl.w || dh > sl.h) {
            sl.w = dw;
            sl.h = dh;
            overlay.rel.attr("width", sl.w);
            overlay.rel.attr("height", sl.h);
            if(sl.isActive) {
               sl.paper.setSize(sl.w, sl.h);
            }
        }
    };

    sl.trim = function () {
        var i, dw, dh, lw, lh, cc;
        lw = 0;
        lh = 0;
        for (i = 0; i < sl.DivObj.length; i++) {
            cc = sl.DivObj[i].getCoordinates();
            dw = cc.x + cc.w;
            if (dw > lw) {
                lw = dw;
            }
            dh = cc.y + cc.h;
            if (dh > lh) {
                lh = dh;
            }
        }
        lw = parseInt(Math.max(lw,$(window).width()),10);
        lh = parseInt(Math.max(lh,$(window).height()),10);
        sl.w = lw;
        sl.h = lh;
        sl.paper.setSize(sl.w, sl.h);
        overlay.rel.attr("width", sl.w + "px");
        overlay.rel.attr("height", sl.h + "px");

    };

    sl.importJSON = function (jsonText) {
        var i, impArray, newDiv;
        if(jsonText.length > 0) {
            impArray = JSON.parse(jsonText);
            for (i = 0; i < impArray.length; i++) {
                impArray[i].newDiv = new sl.Div(impArray[i].divID);
            }
            for (i = 0; i < impArray.length; i++) {
                impArray[i].newDiv.setParameters(impArray[i], false);
            }
            sl.getThreshold();
            sl.resizeLayout();
        }
    };

    sl.exportJSON = function () {
        var i, expArray, expObj;
        expArray = [];
        for (i = 0; i < sl.DivObj.length; i++) {
            expObj = sl.DivObj[i].exportData();
            expArray.push(expObj);
        }
        return (JSON.stringify(expArray));
    };

    sl.selectAll = function () {
        var i;
        for (i = 0; i < sl.DivObj.length; i++) {
            sl.DivObj[i].select(true);
        }
    };

    sl.selectNone = function () {
        var i;
        for (i = 0; i < sl.DivObj.length; i++) {
            sl.DivObj[i].select(false);
        }
    };

    sl.setCOBadges = function (action) {
        sl.isCOBadgeOn = action;
    };

    sl.setZIBadges = function (action) {
        var i;
        for (i = 0; i < sl.DivObj.length; i++) {
            if (action === true && sl.DivObj[i].isVisible) {
                sl.DivObj[i].badgeRect.show();
                sl.DivObj[i].badgeText.show();
            }
            else {
                sl.DivObj[i].badgeRect.hide();
                sl.DivObj[i].badgeText.hide();
             }
        }
        sl.isZIBadgeOn = action;
    };

    sl.zIndexSet = function (direction) {
        var i, badgeBB;

        for (i = 0; i < sl.DivObj.length; i++) {
            if (sl.DivObj[i].isSelected) {
       
                switch(direction) {
                    case "down":
                        sl.DivObj[i].zIndex = sl.DivObj[i].zIndex - 1.1;
                        break;
                    case "top":
                        sl.DivObj[i].zIndex = sl.DivObj.length + i;
                        break;
                    case "up":
                        sl.DivObj[i].zIndex = sl.DivObj[i].zIndex + 1.1;
                        break;
                    case "bottom":
                        sl.DivObj[i].zIndex = sl.zBase-i;
                        break;
                }
            }
        }
        sl.DivObj.sort(function(a, b) {
            return a.zIndex-b.zIndex;
        });
        for (i = 0; i < sl.DivObj.length; i++) {
            sl.DivObj[i].zIndex = sl.zBase + i + 1;
            sl.DivObj[i].rel.toFront();
            sl.DivObj[i].badgeRect.toFront();
            sl.DivObj[i].badgeText.toFront();
            sl.DivObj[i].badgeText.attr("text", i + 1);
            badgeBB = sl.DivObj[i].badgeText.getBBox();
            sl.DivObj[i].badgeRect.attr("width", badgeBB.width + 2);
            sl.DivObj[i].div.css("z-index", sl.DivObj[i].zIndex);
        }
        overlay.rel.toFront(); //It must always be on top
   };


    sl.align = function (direction) {
        var i, ax, ay, al, at, ar, ab, ah, av;
        switch(direction) {
            case "left":
                al = sl.x + sl.w;
                for (i = 0; i < sl.DivObj.length; i++) {
                    if (sl.DivObj[i].isSelected) {
                        if (sl.DivObj[i].rel.attr("x") < al) {
                            al = sl.DivObj[i].rel.attr("x");
                        }
                    }
                }
                for (i = 0; i < sl.DivObj.length; i++) {
                    if (sl.DivObj[i].isSelected) {
                        sl.DivObj[i].setCoordinates(al, sl.DivObj[i].rel.attr("y"), -1, -1, true);
                    }
                }
                break;
            case "top":
                at = sl.y + sl.h;
                for (i = 0; i < sl.DivObj.length; i++) {
                    if (sl.DivObj[i].isSelected) {
                        if (sl.DivObj[i].rel.attr("y") < at) {
                            at = sl.DivObj[i].rel.attr("y");
                        }
                    }
                }
                for (i = 0; i < sl.DivObj.length; i++) {
                    if (sl.DivObj[i].isSelected) {
                        sl.DivObj[i].setCoordinates(sl.DivObj[i].rel.attr("x"), at, -1, -1, true);
                    }
                }
                break;
            case "right":
                ar = sl.x;
                for (i = 0; i < sl.DivObj.length; i++) {
                    if (sl.DivObj[i].isSelected) {
                        if ((sl.DivObj[i].rel.attr("x") + sl.DivObj[i].rel.attr("width")) > ar) {
                            ar = sl.DivObj[i].rel.attr("x") + sl.DivObj[i].rel.attr("width");
                        }
                    }
                }
                for (i = 0; i < sl.DivObj.length; i++) {
                    if (sl.DivObj[i].isSelected) {
                        ax = ar - sl.DivObj[i].rel.attr("width");
                        sl.DivObj[i].setCoordinates(ax, sl.DivObj[i].rel.attr("y"), -1, -1);
                    }
                }
                break;
            case "bottom":
                ab = sl.y;
                for (i = 0; i < sl.DivObj.length; i++) {
                    if (sl.DivObj[i].isSelected) {
                        if ((sl.DivObj[i].rel.attr("y") + sl.DivObj[i].rel.attr("height")) > ab) {
                            ab = sl.DivObj[i].rel.attr("y") + sl.DivObj[i].rel.attr("height");
                        }
                    }
                }
                for (i = 0; i < sl.DivObj.length; i++) {
                    if (sl.DivObj[i].isSelected) {
                        ay = ab - sl.DivObj[i].rel.attr("height");
                        sl.DivObj[i].setCoordinates(sl.DivObj[i].rel.attr("x"), ay, -1, -1);
                    }
                }
                break;
            case "horizontally":
                at = sl.y + sl.h;
                ab = sl.y;
                for (i = 0; i < sl.DivObj.length; i++) {
                    if (sl.DivObj[i].isSelected) {
                        if (sl.DivObj[i].rel.attr("y") < at) {
                            at = sl.DivObj[i].rel.attr("y");
                        }
                        if ((sl.DivObj[i].rel.attr("y") + sl.DivObj[i].rel.attr("height")) > ab) {
                            ab = sl.DivObj[i].rel.attr("y") + sl.DivObj[i].rel.attr("height");
                        }
                    }
                }
                ah = at + ((ab - at)/2);
                for (i = 0; i < sl.DivObj.length; i++) {
                    if (sl.DivObj[i].isSelected) {
                        ay = ah - (sl.DivObj[i].rel.attr("height")/2);
                        sl.DivObj[i].setCoordinates(sl.DivObj[i].rel.attr("x"), ay, -1, -1);
                     }
                }
                break;
            case "vertically":
                al = sl.x + sl.w;
                ar = sl.x;
                for (i = 0; i < sl.DivObj.length; i++) {
                    if (sl.DivObj[i].isSelected) {
                        if (sl.DivObj[i].rel.attr("x") < al) {
                            al = sl.DivObj[i].rel.attr("x");
                        }
                        if ((sl.DivObj[i].rel.attr("x") + sl.DivObj[i].rel.attr("width")) > ar) {
                            ar = sl.DivObj[i].rel.attr("x") + sl.DivObj[i].rel.attr("width");
                        }
                    }
                }
                av = al + ((ar - al)/2);
                for (i = 0; i < sl.DivObj.length; i++) {
                    if (sl.DivObj[i].isSelected) {
                        ax = av - (sl.DivObj[i].rel.attr("width")/2);
                        sl.DivObj[i].setCoordinates(ax, sl.DivObj[i].rel.attr("y"), -1, -1);
                    }
                }
                break;
        }
        sl.trim();
    };

    sl.nudge = function (direction) {
        var i, ax, ay, mx, my;
        switch(direction) {
            case "left":
                mx = -sl.nudgePx;
                my = 0;
                break;
            case "up":
                mx = 0;
                my = -sl.nudgePx;
                 break;
            case "right":
                mx = sl.nudgePx;
                my = 0;
                break;
            case "down":
                mx = 0;
                my = sl.nudgePx;
                break;
        }
        for (i = 0; i < sl.DivObj.length; i++) {
            if (sl.DivObj[i].isSelected) {
                ax = sl.DivObj[i].rel.attr("x");
                ay = sl.DivObj[i].rel.attr("y");
                sl.DivObj[i].setCoordinates(ax + mx, ay + my, -1, -1);
            }
        }
        sl.trim();
    };

    sl.clearBadge = function (divObj, arg1, arg2) {
        var co, clear, badgeBB;
        if(sl.action === "drag") {
            clear = false;
            co = divObj.getCoordinates();
            if (co.x === arg1 && co.y === arg2) {
                clear = true;
            }
        }
        else if(sl.action === "resize") {
            co = divObj.getCoordinates();
            if (co.w === arg1 && co.h === arg2) {
                clear = true;
            }
        }
        if(clear) {
                divObj.badgeRect.attr("fill", sl.ZIBadgesColor);
                divObj.badgeText.attr("text", divObj.zIndex - sl.zBase);
                badgeBB = divObj.badgeText.getBBox();
                divObj.badgeRect.attr("width", badgeBB.width + 2);
            if (sl.isZIBadgeOn === false) {
                divObj.badgeRect.hide();
                divObj.badgeText.hide();
            }
         }
    };

    sl.Div = function (targetID) {
        var i, zNum, offset, badgeBB, paramObj;
        //Constructor for svgLayout Div objects
         //Validate the ID parameter
        if($("#" + targetID).length) {
            this.div = $("#" + targetID);
            this.divID = targetID;
        }
        else {
            return("A valid divID is required");
        }

        for (i = 0; i < sl.DivObj.length; i++) {
            if(targetID === sl.DivObj[i].divID) {
                return(sl.DivObj[i]);
            }
        }
        //Set the remaining parameters before building the necessary objects
        paramObj = {};
        paramObj.divID = targetID;

        this.setParameters(paramObj, false);

        this.isLocked = false;
        this.isVisible = false;

        //Build/Set the objects
        //div settings
        this.div.css("position", "absolute");
        this.div.css("left", this.cc.x + "px");
        this.div.css("top", this.cc.y + "px");
        if (this.cc.w > 0) {
            this.div.width(this.cc.w);
        }
        else {
            this.div.width("auto");
            if (this.div.width() === 0) {
                this.div.width(sl.defaultWidth);
            }
        }
        if (this.cc.h > 0) {
            this.div.height(this.cc.h);
        }
        else {
            this.div.height("auto");
            if (this.div.height() === 0) {
                this.div.height(sl.defaultHeight);
            }
        }

        this.div.css("z-index", this.zIndex);

        if(this.display) {
            this.div.show();
        }
        else {
           this.div.hide();
        }
       
        offset = this.div.offset();
        this.cc.x = offset.left;
        this.cc.y = offset.top;
        this.cc.w = this.div.width();
        this.cc.h = this.div.height();

        zNum = this.zIndex-sl.zBase;

        //The Div objects are created
        this.rel = sl.paper.rect(this.cc.x, this.cc.y, this.cc.w, this.cc.h); //The outline rect. Stroke changes color to denote selection

        this.rel.data("sl", sl);
        this.rel.data("div", this);
        this.rel.data("type", "rel");
        this.rel.dblclick(function() {
            sl.DoubleClickHandler();
        });

        this.badgeRect = sl.paper.rect(this.cc.x, this.cc.y, 1, 13); //The rect for badges
        this.badgeRect.data("sl", sl);
        this.badgeRect.data("div", this);
        this.badgeRect.data("type", "badgeRect");
        this.badgeText = sl.paper.text(this.cc.x + 1, this.cc.y + 8, this.zIndex - sl.zBase); //The text for badges
        this.badgeText.data("sl", sl);
        this.badgeText.data("div", this);
        this.badgeText.data("type", "badgeText");
        badgeBB = this.badgeText.getBBox();
        this.badgeRect.attr("width", badgeBB.width + 2);
        this.rHandle = sl.paper.circle(this.cc.x + this.cc.w, this.cc.y + this.cc.h, 4); //The circle used as a handle for resizing           
        this.rHandle.data("sl", sl);
        this.rHandle.data("div", this);
        this.rHandle.data("type", "rHandle");

        //Set styling attributes
        this.rel.attr("stroke-width",0.5);
        this.badgeRect.attr("fill", sl.ZIBadgesColor);
        this.badgeRect.attr("stroke-width", 0);
        this.badgeText.attr("text-anchor", "start");
        this.badgeText.attr("fill", "white");
        this.rHandle.attr("fill", sl.selectedLineColor);
        this.rHandle.attr("stroke-width", 0);
        
        if (sl.isZIBadgeOn === false) {
            this.badgeRect.hide();
            this.badgeText.hide();
        }

        overlay.rel.toFront();

        sl.nextDivY = sl.nextDivY + this.div.height() + 10;
        if(sl.nextDivY > (sl.h - 20)) {
            sl.nextDivY = sl.firstDivY;
            sl.nextDivX = sl.nextDivX * 2;
        }
        
        this.select(false);
        sl.DivObj.push(this);

        if(sl.isActive === false) {
            this.hide();
        }
        return this;

    };

    sl.Div.prototype.setParameters = function (paramObj, resize) {

        var i, pc;

        //Make sure sub objects are in place
        if(typeof this.data !== 'object') {
            this.data = {};
        }
        if(typeof this.cc !== 'object') {
            this.cc = {}; //holds resizing coordinates for this object   
        }
        if(typeof this.pc !== 'object') {
            this.pc = {}; //holds resizing coordinates for assigned parent object    
        }

        //Validate and load parameters

        if(typeof paramObj.parentID === 'string') {
            if(paramObj.parentID === "window") {
                this.parent = svglWindow;
                this.pc = this.parent.getCoordinates();
            }
            else if($("#" + paramObj.parentID).length) {
                //Find the id amoung the DivID elements
                for (i = 0; i < sl.DivObj.length; i++) {
                    if(paramObj.parentID === sl.DivObj[i].divID) {
                        this.parent = sl.DivObj[i];
                        this.pc = this.parent.getCoordinates();
                        break;
                    }
                }
            }
        }
        //Default parent set here - all other defaults are set below
        if(typeof this.parent !== 'object') {
            this.parent = svglWindow;
            this.pc = this.parent.getCoordinates();
        }

        if(typeof paramObj.zIndex === 'number') {
            this.zIndex = paramObj.zIndex;
        }

        if(typeof paramObj.display === 'boolean') {
            this.display = paramObj.display;
        }
         
        if (typeof paramObj.data === 'object') {
            this.data =  paramObj.data;
        }
 
        pc = this.parent.getCoordinates();
        
        if(typeof paramObj.pc === "object") {
            if(typeof paramObj.pc.x === "number") {
                this.pc.x = paramObj.pc.x;
            }
            if(typeof paramObj.pc.y === "number") {
                this.pc.y = paramObj.pc.y;
            }
            if(typeof paramObj.pc.w === "number") {
                this.pc.w = paramObj.pc.w;
            }
            if(typeof paramObj.pc.h === "number") {
                this.pc.h = paramObj.pc.h;
            }
        }

        if(typeof paramObj.cc === "object") {
            if(typeof paramObj.cc.x === "number") {
                this.cc.x = paramObj.cc.x;
            }
            if(typeof paramObj.cc.y === "number") {
                this.cc.y = paramObj.cc.y;
            }
            if(typeof paramObj.cc.w === "number") {
                this.cc.w = paramObj.cc.w;
            }
            if(typeof paramObj.cc.h === "number") {
                this.cc.h = paramObj.cc.h;
            }
        }


        if (typeof paramObj.hAction === 'string') {
            if (paramObj.hAction === "move" || paramObj.hAction === "grow" || paramObj.hAction === "none") {
                this.hAction = paramObj.hAction;
            }
        }

        if (typeof paramObj.vAction === 'string') {
            if (paramObj.vAction === "move" || paramObj.vAction === "grow" || paramObj.vAction === "none") {
                this.vAction = paramObj.vAction;
            }
        }

        if(typeof paramObj.hMin === 'number') {
            this.hMin = paramObj.hMin;
        }

        if(typeof paramObj.hMax === 'number') {
            this.hMax = paramObj.hMax;
        }

        if(typeof paramObj.hRate === 'number') {
            this.hRate = paramObj.hRate;
        }

        if (typeof paramObj.hAuto === 'boolean') {
            this.hAuto = paramObj.hAuto;
        }

        if(typeof paramObj.vMin === 'number') {
            this.vMin = paramObj.vMin;
        }

        if(typeof paramObj.vMax === 'number') {
            this.vMax = paramObj.vMax;
        }

        if(typeof paramObj.vRate === 'number') {
            this.vRate = paramObj.vRate;
        }

        if (typeof paramObj.vAuto === 'boolean') {
            this.vAuto = paramObj.vAuto;
        }

        //<Defaults
        if(typeof this.zIndex !== 'number') {
            this.zIndex = sl.zBase + sl.DivObj.length;
        }

        if(typeof this.display !== 'boolean') {
            this.display = true;
        }

        if(typeof this.pc.x !== "number") {
            this.pc.x = pc.x; //default
        }

        if(typeof this.pc.y !== "number") {
            this.pc.y = pc.y; //default
        }

        if(typeof this.pc.w !== "number") {
            this.pc.w = pc.w; //default
        }

        if(typeof this.pc.w !== "number") {
            this.pc.w = pc.w; //default
        }

        if(typeof this.cc.x !== "number") {
            this.cc.x = sl.nextDivX; //default
        }
        
        if(typeof this.cc.y !== "number") {
            this.cc.y = sl.nextDivY; //default
        }

        if(typeof this.cc.w !== "number") {
            this.cc.w = -1; //default
        }

        if(typeof this.cc.h !== "number") {
            this.cc.h = -1; //default
        }

        if(typeof this.hAction !== 'string') {
            this.hAction = "none"; //default
        }

        if(typeof this.hMin !== 'number') {
            this.hMin = 0; //default
        }

        if(typeof this.hMax !== 'number') {
            this.hMax = 0; //default
        }

        if(typeof this.hRate !== 'number') {
            this.hRate = 1; //default
        }

        if(typeof this.hAuto !== 'boolean') {
            this.hAuto = false; //default
        }

        if(typeof this.vAction !== 'string') {
            this.vAction = "none"; //default
        }

        if(typeof this.vMin !== 'number') {
            this.vMin = 0; //default
        }

        if(typeof this.vMax !== 'number') {
            this.vMax = 0; //default
        }

        if(typeof this.vRate !== 'number') {
            this.vRate = 1; //default
        }

        if(typeof this.vAuto !== 'boolean') {
            this.vAuto = false; //default
        }
        //Defaults>

        if (resize) {
            this.resizeDiv();
            sl.afterResize();
        }
   };

    sl.Div.prototype.show = function () {
        this.rel.show();
        if (sl.isZIBadgeOn) {
            this.badgeRect.show();
            this.badgeText.show();
        }
        this.rHandle.show();
    };

    sl.Div.prototype.hide = function () {
        this.rel.hide();
        this.badgeRect.hide();
        this.badgeText.hide();
        this.rHandle.hide();
    };

    sl.Div.prototype.lock = function () {
        this.isLocked = true;
        this.isSelected = false;
        this.rel.attr("stroke",sl.lockedLineColor);
        this.rHandle.hide();
    };

    sl.Div.prototype.unlock = function () {
        if(this.isLocked) {
            this.rel.attr("stroke",sl.unselectedLineColor);
            this.rHandle.show();
        }
        this.isLocked = false;
    };


   sl.Div.prototype.exportData = function () {
        var expObj;
        expObj = {};
        expObj.divID = this.divID;
        expObj.parentID = this.parent.divID;
        expObj.data = this.data;
        expObj.cc = this.cc;
        expObj.pc = this.pc;
        expObj.zIndex = this.zIndex;
        expObj.display = this.display;
        expObj.hAction = this.hAction;
        expObj.hMin = this.hMin;
        expObj.hMax = this.hMax;
        expObj.hRate = this.hRate;
        expObj.hAuto = this.hAuto;
        expObj.vAction = this.vAction;
        expObj.vMin = this.vMin;
        expObj.vMax = this.vMax;
        expObj.vRate = this.vRate;
        expObj.vAuto = this.vAuto;
        return expObj;
   };


    sl.Div.prototype.select = function (select) {
        if (this.isLocked === false) {
             if (select) {
                this.isSelected = true;
                this.rel.attr("stroke",sl.selectedLineColor);
            }
            else {
                this.isSelected = false;
                this.rel.attr("stroke",sl.unselectedLineColor);
            }
        }
    };

    sl.Div.prototype.getCoordinates = function () {
        var offset, co;
        if(this.div.is(":visible")) {
            offset = this.div.offset();
        }
        else {
            this.div.show();
            offset = this.div.offset();
            this.div.hide();
        }
        co = {};
        co.x = offset.left;
        co.y = offset.top;
        co.w = this.div.width();
        co.h = this.div.height();
        return co;
    };

    sl.Div.prototype.setCoordinates = function (x, y, w, h) {
        var co;
        co = this.enforceBounds(x, y, w, h);  //Enforce minimums/maximums and auto resizing
        this.cc.x = co.x;
        this.cc.y = co.y;
        this.cc.w = co.w;
        this.cc.h = co.h;
        this.pc = this.parent.getCoordinates();
        this.applyCoordinates(this.cc.x, this.cc.y, this.cc.w, this.cc.h);
        this.resizeChildren();
    };
    
    sl.Div.prototype.resizeChildren = function () {
        var i;
        for (i = sl.DivObj.length - 1; i >= 0; i--) { //reverse order
            if (sl.DivObj[i].parent === this) {
                sl.DivObj[i].resizeDiv();
            }
        }
    };

    sl.Div.prototype.resizeDiv = function () {
        this.onResizingParent();
        this.resizeChildren();
    };

    sl.Div.prototype.enforceBounds = function (x, y, w, h) {

        var co, lastCo;

        lastCo = this.getCoordinates();

        //Round
        x = parseInt(x, 10);
        y = parseInt(y, 10);
        w = parseInt(w, 10);
        h = parseInt(h, 10);

        if (x === -1) {
            x = lastCo.x;
        }
        if (this.hAction === "move" && x < this.hMin && this.hMin > 0) {
            x = this.hMin;
        }
        if (this.hAction === "move" && x > this.hMax && this.hMax > 0) {
            x = this.hMax;
        }

        if (this.hAuto === true) {
            if (this.hAction === "move" || this.hAction === "none") {
                this.div.width("auto");
                w = this.div.width();
            }
        }

        if (y === -1) {
            y = lastCo.y;
        }
        if (this.vAction === "move" && y < this.vMin && this.vMin > 0) {
            y = this.vMin;
        }
        if (this.vAction === "move" && y > this.vMax && this.vMax > 0) {
            y = this.vMax;
        }

        if (this.vAuto === true) {
            if (this.vAction === "move" || this.vAction === "none") {
                this.div.height("auto");
                h = this.div.height();
            }
        }

        if (w === -1) {
            w = lastCo.w;
        }
        if (this.hAction === "grow" && w < this.hMin && this.hMin > 0) {
            w = this.hMin;
        }
        if (this.hAction === "grow" && w > this.hMax && this.hMax > 0) {
            w = this.hMax;
        }

        if (h === -1) {
            h = lastCo.h;
        }
        if (this.vAction === "grow" && h < this.vMin && this.vMin > 0) {
            h = this.vMin;
        }
        if (this.vAction === "grow" && h > this.vMax && this.vMax > 0) {
            h = this.vMax;
        }

        //Round
        co = {};
        co.x = parseInt(x, 10);
        co.y = parseInt(y, 10);
        co.w = parseInt(w, 10);
        co.h = parseInt(h, 10);

        return co;

    };

    sl.Div.prototype.applyCoordinates = function (x, y, w, h) {

        //The given object is positioned according to the current coordinates
        // 
        var dw, dh, badgeBB, xyString, whString, co, lastCo;

        this.div.css("left", x + "px");
        this.div.css("top", y + "px");
        this.div.width(w);
        this.div.height(h);

        this.rel.attr("x", x);
        this.rel.attr("y", y);
        this.rel.attr("width", w);
        this.rel.attr("height", h);
        //The remaining elements are of fixed size
        this.badgeRect.attr("x", x);
        this.badgeRect.attr("y", y);
       
        this.badgeText.attr("x", x + 1);
        this.badgeText.attr("y", y + 7);

        this.rHandle.attr("cx", x + w);
        this.rHandle.attr("cy", y + h);

        sl.adjustPaper();

        if(sl.isActive && sl.isCOBadgeOn) {
            if (sl.action === "drag") {
                xyString = "X:" + x.toString() + " Y:" + y.toString();
                this.badgeText.attr("text", xyString);
                this.badgeRect.attr("fill", sl.COBadgesColor);
                badgeBB = this.badgeText.getBBox();
                this.badgeRect.attr("width", badgeBB.width + 2);
                this.badgeRect.show();
                this.badgeText.show();
                setTimeout(sl.clearBadge, 2000, this, x, y);
            }
            else if (sl.action === "resize") {
                whString = "W:" + w.toString() + " H:" + h.toString();
                this.badgeText.attr("text", whString);
                this.badgeRect.attr("fill", sl.COBadgesColor);
                badgeBB = this.badgeText.getBBox();
                this.badgeRect.attr("width", badgeBB.width + 2);
                this.badgeRect.show();
                this.badgeText.show();
                setTimeout(sl.clearBadge, 2000, this, w, h);
            }
        }

    };

    sl.Div.prototype.onResizingParent = function () {

        var pc, x, y, w, h, co;

        pc = this.parent.getCoordinates();

        //Apply position relative to parent
        if (this.hAction === "move") {
            x = pc.x + (this.cc.x - this.pc.x) + ((pc.w - this.pc.w)*this.hRate);
            w = this.cc.w;
        }
        else if (this.hAction === "grow") {
            x = pc.x + this.cc.x - this.pc.x;
            w = this.cc.w + ((pc.w - this.pc.w)*this.hRate);
        }
        else if (this.hAction === "none") {
            x = pc.x + this.cc.x - this.pc.x;
            w = this.cc.w;
        }

        if (this.vAction === "move") {
            y = pc.y + (this.cc.y - this.pc.y) + ((pc.h - this.pc.h)*this.vRate);
            h = this.cc.h;
         }
        else if (this.vAction === "grow") {
            y = pc.y + this.cc.y - this.pc.y;
            h = this.cc.h + ((pc.h - this.pc.h)*this.vRate);
        }
        else if (this.vAction === "none") {
            y = pc.y + this.cc.y - this.pc.y;
            h = this.cc.h;
        }

        co = this.enforceBounds(x, y, w, h);  //Enforce minimums/maximums and auto resizing
        this.applyCoordinates(co.x, co.y, co.w, co.h);
 
    };

    sl.activateLayout(false);

    sl.Div.prototype.onDoubleClick = function () {
       
    };

}

function svglDelete(svgl) {
    var i;
    svgl.paper.remove();
    for (i = 0; i < svglLayoutList.length; (i++)) {
        if (svglLayoutList[i] === svgl) {
            svglLayoutList.splice(i,1);
            break;
        }
    }
    svgl = {};
}

$(window).on("resize", function() {
    var i;
    for (i = 0; i < svglLayoutList.length; (i++)) {
        svglLayoutList[i].getThreshold();
        svglLayoutList[i].resizeLayout();
    }
});




