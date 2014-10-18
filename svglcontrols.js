/*
 * svglcontrols.js 0.8.2 Alpha - JavaScript SVGLayout Tools Library
 *
 * Copyright (c) 2014 Thomas DeMeo 
 * Copyright (c) 2014 Waltham Software Corp. All rights reserved.
 * Licensed under the MIT (http://www.svglayout.com/mit_license/index.html) license.
 * Up and down arrow icons provided under MIT license by http://ionicons.com/
*/

var svglc;

function svglControls(sl) {

    var altKeyDown, shifKeyDown, exportTo, svglWidget;

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
            case 72: //"H" key
                if (altKeyDown(event)) {
                    sl.align("horizontally");
                }
                break;
            case 86: //"V" key
                if (altKeyDown(event)) {
                    sl.align("vertically");
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

    //**********The SVGLayout floating widget________________________
    svglWidget = {};
    svglWidget.fn = {};
    svglWidget.uri = {};
    svglWidget.offset = {};
    svglWidget.width = 32;
    svglWidget.animation = false;

    //The images are assigned as data uri's
    //These were made by me - TD
    svglWidget.uri.grabBar = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAgCAIAAACQHr+mAAAKQWlDQ1BJQ0MgUHJvZmlsZQAASA2dlndUU9kWh8+9N73QEiIgJfQaegkg0jtIFQRRiUmAUAKGhCZ2RAVGFBEpVmRUwAFHhyJjRRQLg4Ji1wnyEFDGwVFEReXdjGsJ7601896a/cdZ39nnt9fZZ+9917oAUPyCBMJ0WAGANKFYFO7rwVwSE8vE9wIYEAEOWAHA4WZmBEf4RALU/L09mZmoSMaz9u4ugGS72yy/UCZz1v9/kSI3QyQGAApF1TY8fiYX5QKUU7PFGTL/BMr0lSkyhjEyFqEJoqwi48SvbPan5iu7yZiXJuShGlnOGbw0noy7UN6aJeGjjAShXJgl4GejfAdlvVRJmgDl9yjT0/icTAAwFJlfzOcmoWyJMkUUGe6J8gIACJTEObxyDov5OWieAHimZ+SKBIlJYqYR15hp5ejIZvrxs1P5YjErlMNN4Yh4TM/0tAyOMBeAr2+WRQElWW2ZaJHtrRzt7VnW5mj5v9nfHn5T/T3IevtV8Sbsz55BjJ5Z32zsrC+9FgD2JFqbHbO+lVUAtG0GQOXhrE/vIADyBQC03pzzHoZsXpLE4gwnC4vs7GxzAZ9rLivoN/ufgm/Kv4Y595nL7vtWO6YXP4EjSRUzZUXlpqemS0TMzAwOl89k/fcQ/+PAOWnNycMsnJ/AF/GF6FVR6JQJhIlou4U8gViQLmQKhH/V4X8YNicHGX6daxRodV8AfYU5ULhJB8hvPQBDIwMkbj96An3rWxAxCsi+vGitka9zjzJ6/uf6Hwtcim7hTEEiU+b2DI9kciWiLBmj34RswQISkAd0oAo0gS4wAixgDRyAM3AD3iAAhIBIEAOWAy5IAmlABLJBPtgACkEx2AF2g2pwANSBetAEToI2cAZcBFfADXALDIBHQAqGwUswAd6BaQiC8BAVokGqkBakD5lC1hAbWgh5Q0FQOBQDxUOJkBCSQPnQJqgYKoOqoUNQPfQjdBq6CF2D+qAH0CA0Bv0BfYQRmALTYQ3YALaA2bA7HAhHwsvgRHgVnAcXwNvhSrgWPg63whfhG/AALIVfwpMIQMgIA9FGWAgb8URCkFgkAREha5EipAKpRZqQDqQbuY1IkXHkAwaHoWGYGBbGGeOHWYzhYlZh1mJKMNWYY5hWTBfmNmYQM4H5gqVi1bGmWCesP3YJNhGbjS3EVmCPYFuwl7ED2GHsOxwOx8AZ4hxwfrgYXDJuNa4Etw/XjLuA68MN4SbxeLwq3hTvgg/Bc/BifCG+Cn8cfx7fjx/GvyeQCVoEa4IPIZYgJGwkVBAaCOcI/YQRwjRRgahPdCKGEHnEXGIpsY7YQbxJHCZOkxRJhiQXUiQpmbSBVElqIl0mPSa9IZPJOmRHchhZQF5PriSfIF8lD5I/UJQoJhRPShxFQtlOOUq5QHlAeUOlUg2obtRYqpi6nVpPvUR9Sn0vR5Mzl/OX48mtk6uRa5Xrl3slT5TXl3eXXy6fJ18hf0r+pvy4AlHBQMFTgaOwVqFG4bTCPYVJRZqilWKIYppiiWKD4jXFUSW8koGStxJPqUDpsNIlpSEaQtOledK4tE20Otpl2jAdRzek+9OT6cX0H+i99AllJWVb5SjlHOUa5bPKUgbCMGD4M1IZpYyTjLuMj/M05rnP48/bNq9pXv+8KZX5Km4qfJUilWaVAZWPqkxVb9UU1Z2qbapP1DBqJmphatlq+9Uuq43Pp893ns+dXzT/5PyH6rC6iXq4+mr1w+o96pMamhq+GhkaVRqXNMY1GZpumsma5ZrnNMe0aFoLtQRa5VrntV4wlZnuzFRmJbOLOaGtru2nLdE+pN2rPa1jqLNYZ6NOs84TXZIuWzdBt1y3U3dCT0svWC9fr1HvoT5Rn62fpL9Hv1t/ysDQINpgi0GbwaihiqG/YZ5ho+FjI6qRq9Eqo1qjO8Y4Y7ZxivE+41smsImdSZJJjclNU9jU3lRgus+0zwxr5mgmNKs1u8eisNxZWaxG1qA5wzzIfKN5m/krCz2LWIudFt0WXyztLFMt6ywfWSlZBVhttOqw+sPaxJprXWN9x4Zq42Ozzqbd5rWtqS3fdr/tfTuaXbDdFrtOu8/2DvYi+yb7MQc9h3iHvQ732HR2KLuEfdUR6+jhuM7xjOMHJ3snsdNJp9+dWc4pzg3OowsMF/AX1C0YctFx4bgccpEuZC6MX3hwodRV25XjWuv6zE3Xjed2xG3E3dg92f24+ysPSw+RR4vHlKeT5xrPC16Il69XkVevt5L3Yu9q76c+Oj6JPo0+E752vqt9L/hh/QL9dvrd89fw5/rX+08EOASsCegKpARGBFYHPgsyCRIFdQTDwQHBu4IfL9JfJFzUFgJC/EN2hTwJNQxdFfpzGC4sNKwm7Hm4VXh+eHcELWJFREPEu0iPyNLIR4uNFksWd0bJR8VF1UdNRXtFl0VLl1gsWbPkRoxajCCmPRYfGxV7JHZyqffS3UuH4+ziCuPuLjNclrPs2nK15anLz66QX8FZcSoeGx8d3xD/iRPCqeVMrvRfuXflBNeTu4f7kufGK+eN8V34ZfyRBJeEsoTRRJfEXYljSa5JFUnjAk9BteB1sl/ygeSplJCUoykzqdGpzWmEtPi000IlYYqwK10zPSe9L8M0ozBDuspp1e5VE6JA0ZFMKHNZZruYjv5M9UiMJJslg1kLs2qy3mdHZZ/KUcwR5vTkmuRuyx3J88n7fjVmNXd1Z752/ob8wTXuaw6thdauXNu5Tnddwbrh9b7rj20gbUjZ8MtGy41lG99uit7UUaBRsL5gaLPv5sZCuUJR4b0tzlsObMVsFWzt3WazrWrblyJe0fViy+KK4k8l3JLr31l9V/ndzPaE7b2l9qX7d+B2CHfc3em681iZYlle2dCu4F2t5czyovK3u1fsvlZhW3FgD2mPZI+0MqiyvUqvakfVp+qk6oEaj5rmvep7t+2d2sfb17/fbX/TAY0DxQc+HhQcvH/I91BrrUFtxWHc4azDz+ui6rq/Z39ff0TtSPGRz0eFR6XHwo911TvU1zeoN5Q2wo2SxrHjccdv/eD1Q3sTq+lQM6O5+AQ4ITnx4sf4H++eDDzZeYp9qukn/Z/2ttBailqh1tzWibakNml7THvf6YDTnR3OHS0/m/989Iz2mZqzymdLz5HOFZybOZ93fvJCxoXxi4kXhzpXdD66tOTSna6wrt7LgZevXvG5cqnbvfv8VZerZ645XTt9nX297Yb9jdYeu56WX+x+aem172296XCz/ZbjrY6+BX3n+l37L972un3ljv+dGwOLBvruLr57/17cPel93v3RB6kPXj/Mejj9aP1j7OOiJwpPKp6qP6391fjXZqm99Oyg12DPs4hnj4a4Qy//lfmvT8MFz6nPK0a0RupHrUfPjPmM3Xqx9MXwy4yX0+OFvyn+tveV0auffnf7vWdiycTwa9HrmT9K3qi+OfrW9m3nZOjk03dp76anit6rvj/2gf2h+2P0x5Hp7E/4T5WfjT93fAn88ngmbWbm3/eE8/syOll+AAAACXBIWXMAAAsTAAALEwEAmpwYAAAEImlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iWE1QIENvcmUgNS40LjAiPgogICA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAgICAgICB4bWxuczp0aWZmPSJodHRwOi8vbnMuYWRvYmUuY29tL3RpZmYvMS4wLyIKICAgICAgICAgICAgeG1sbnM6ZXhpZj0iaHR0cDovL25zLmFkb2JlLmNvbS9leGlmLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIKICAgICAgICAgICAgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIj4KICAgICAgICAgPHRpZmY6UmVzb2x1dGlvblVuaXQ+MTwvdGlmZjpSZXNvbHV0aW9uVW5pdD4KICAgICAgICAgPHRpZmY6Q29tcHJlc3Npb24+NTwvdGlmZjpDb21wcmVzc2lvbj4KICAgICAgICAgPHRpZmY6WFJlc29sdXRpb24+NzI8L3RpZmY6WFJlc29sdXRpb24+CiAgICAgICAgIDx0aWZmOk9yaWVudGF0aW9uPjE8L3RpZmY6T3JpZW50YXRpb24+CiAgICAgICAgIDx0aWZmOllSZXNvbHV0aW9uPjcyPC90aWZmOllSZXNvbHV0aW9uPgogICAgICAgICA8ZXhpZjpQaXhlbFhEaW1lbnNpb24+MTg8L2V4aWY6UGl4ZWxYRGltZW5zaW9uPgogICAgICAgICA8ZXhpZjpDb2xvclNwYWNlPjE8L2V4aWY6Q29sb3JTcGFjZT4KICAgICAgICAgPGV4aWY6UGl4ZWxZRGltZW5zaW9uPjMyPC9leGlmOlBpeGVsWURpbWVuc2lvbj4KICAgICAgICAgPGRjOnN1YmplY3Q+CiAgICAgICAgICAgIDxyZGY6QmFnLz4KICAgICAgICAgPC9kYzpzdWJqZWN0PgogICAgICAgICA8eG1wOk1vZGlmeURhdGU+MjAxNC0wOS0wNlQxMjowOTo5NDwveG1wOk1vZGlmeURhdGU+CiAgICAgICAgIDx4bXA6Q3JlYXRvclRvb2w+UGl4ZWxtYXRvciAzLjI8L3htcDpDcmVhdG9yVG9vbD4KICAgICAgPC9yZGY6RGVzY3JpcHRpb24+CiAgIDwvcmRmOlJERj4KPC94OnhtcG1ldGE+CnGJ52sAAALDSURBVDgRnZU9bhRBEIW752e5AkKCABE5wARwBh9nDwAH4C6cACKkzSBhpbUsBJs4MEgESEC0O9PN9171LISGWs9fdb1Xr6p6xnm9Xqd/twHIi+cvU00pp1RS6szBY5hvdMpYrYVrIliww0RsTbWm3AkZVvVMEBdbzYQIxFEEm8UBFSGgtNCZg/hc5FaCGjLMnwbBpkK8eB4+WAXz/vqAR7CUHt1vzk/XE5k7lNZskWUgL3GB4XwsrLqW3J+csBNWagedRc4AFg2OmuWxuPmESgVnbSyCIdyp6m4/I9cOQPLy232ekBaPXqMx1dkU6vpQTrTSqGtcvECVlLMAcRaLVLdUPs0UBiDRysQwAuk6xQzYAc42mYouxLKe/OMGoCqw9CCkd9ESzyaxA56dtYrfXx6VyCU/PXP9Kb3bTagSU+wSYCELT9hRvcanjbH4GC9iVAhnMU0FxQFtMSW2mMo4oTTZKJuzYEJw1O7th2OZ1bVvv9Jh7lR/Tq82DADLNz+UPsoU7OtPaFU+tWMiouheXLlTR1hlO4RihWUPYBgVp3DpIMJd5r7PWePUaFpE9D+5th450fNBAVLNMk2l+IF4d0+0bdsSK5Grwd1J+eJJG8Dr7RTpWb04Vwz2ZssGFSsmV88LoL2sc1iPPBKqV3+cI7EugiSCUb00u/aAjXof1IaFXe5OGzZaFrX1Wod2czWL3X+n93rzUS+PGywwBlrZ6JxCMZIqr60PRTjRqgV1y6pYjtrkQCUAVLRwDVHDrbCSj9L14Axtbu67Zy0+YAJovI2ifRnMGLTKNtJJfwHP77VPw/YGiBJD8/iuLtjuS4kmoc2dHN0RldhsuKOcTr24eBglRd/CeAPGQdu3I+FiY1eQyKGv1GKrXm+7WlD9eeVuyAXH/jubI0x1xfD+crJkmshG3iX6ttfWg9uGL3H5//5R/QZSznB8OGGPwQAAAABJRU5ErkJggg==';
    svglWidget.uri.slLeft = 'data:image/png;base64,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TUw6Y29tLmFkb2JlLnhtcAAAAAAAPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iWE1QIENvcmUgNS40LjAiPgogICA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAgICAgICB4bWxuczp0aWZmPSJodHRwOi8vbnMuYWRvYmUuY29tL3RpZmYvMS4wLyIKICAgICAgICAgICAgeG1sbnM6ZXhpZj0iaHR0cDovL25zLmFkb2JlLmNvbS9leGlmLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIKICAgICAgICAgICAgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIj4KICAgICAgICAgPHRpZmY6UmVzb2x1dGlvblVuaXQ+MTwvdGlmZjpSZXNvbHV0aW9uVW5pdD4KICAgICAgICAgPHRpZmY6Q29tcHJlc3Npb24+NTwvdGlmZjpDb21wcmVzc2lvbj4KICAgICAgICAgPHRpZmY6WFJlc29sdXRpb24+NzI8L3RpZmY6WFJlc29sdXRpb24+CiAgICAgICAgIDx0aWZmOk9yaWVudGF0aW9uPjE8L3RpZmY6T3JpZW50YXRpb24+CiAgICAgICAgIDx0aWZmOllSZXNvbHV0aW9uPjcyPC90aWZmOllSZXNvbHV0aW9uPgogICAgICAgICA8ZXhpZjpQaXhlbFhEaW1lbnNpb24+MzA8L2V4aWY6UGl4ZWxYRGltZW5zaW9uPgogICAgICAgICA8ZXhpZjpDb2xvclNwYWNlPjE8L2V4aWY6Q29sb3JTcGFjZT4KICAgICAgICAgPGV4aWY6UGl4ZWxZRGltZW5zaW9uPjMyPC9leGlmOlBpeGVsWURpbWVuc2lvbj4KICAgICAgICAgPGRjOnN1YmplY3Q+CiAgICAgICAgICAgIDxyZGY6U2VxLz4KICAgICAgICAgPC9kYzpzdWJqZWN0PgogICAgICAgICA8eG1wOk1v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';
    svglWidget.uri.slBody  = 'data:image/png;base64,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TUw6Y29tLmFkb2JlLnhtcAAAAAAAPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iWE1QIENvcmUgNS40LjAiPgogICA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAgICAgICB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOnRpZmY9Imh0dHA6Ly9ucy5hZG9iZS5jb20vdGlmZi8xLjAvIgogICAgICAgICAgICB4bWxuczpleGlmPSJodHRwOi8vbnMuYWRvYmUuY29tL2V4aWYvMS4wLyI+CiAgICAgICAgIDx4bXA6TW9kaWZ5RGF0ZT4yMDE0LTA5LTEyVDE3OjA5OjYxPC94bXA6TW9kaWZ5RGF0ZT4KICAgICAgICAgPHhtcDpDcmVhdG9yVG9vbD5QaXhlbG1hdG9yIDMuMi4xPC94bXA6Q3JlYXRvclRvb2w+CiAgICAgICAgIDx0aWZmOk9yaWVudGF0aW9uPjE8L3RpZmY6T3JpZW50YXRpb24+CiAgICAgICAgIDx0aWZmOkNvbXByZXNzaW9uPjU8L3RpZmY6Q29tcHJlc3Npb24+CiAgICAgICAgIDx0aWZmOlJlc29sdXRpb25Vbml0PjE8L3RpZmY6UmVzb2x1dGlvblVuaXQ+CiAgICAgICAgIDx0aWZmOllSZXNvbHV0aW9uPjcyPC90aWZmOllSZXNvbHV0aW9uPgogICAgICAgICA8dGlmZjpYUmVzb2x1dGlvbj43MjwvdGlmZjpYUmVzb2x1dGlvbj4KICAgICAgICAgPGV4aWY6UGl4ZWxYRGltZW5zaW9uPjE8L2V4aWY6UGl4ZWxYRGltZW5zaW9uPgogICAgICAgICA8ZXhpZjpDb2xvclNwYWNlPjE8L2V4aWY6Q29sb3JTcGFjZT4KICAgICAgICAgPGV4aWY6UGl4ZWxZRGltZW5zaW9uPjMyPC9leGlmOlBpeGVsWURpbWVuc2lvbj4KICAgICAgPC9yZGY6RGVzY3JpcHRpb24+CiAgIDwvcmRmOlJERj4KPC94OnhtcG1ldGE+CoddqlEAAABbSURBVAgdHYyxDkIxDAPdSzOxvi/u1z5mBiRoElKGk32yZK219LzffMLYKb4xyCi2oBJSSexBtGTvu7eqwf2C6YlNcNQZuBnj9L+P9sYL8z47nT5UIelg12P+AAEaJa8Z5TqYAAAAAElFTkSuQmCC';
    svglWidget.uri.slBorder  = 'data:image/png;base64,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TUw6Y29tLmFkb2JlLnhtcAAAAAAAPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iWE1QIENvcmUgNS40LjAiPgogICA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAgICAgICB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOnRpZmY9Imh0dHA6Ly9ucy5hZG9iZS5jb20vdGlmZi8xLjAvIgogICAgICAgICAgICB4bWxuczpleGlmPSJodHRwOi8vbnMuYWRvYmUuY29tL2V4aWYvMS4wLyI+CiAgICAgICAgIDx4bXA6TW9kaWZ5RGF0ZT4yMDE0LTA5LTEyVDE3OjA5Ojk4PC94bXA6TW9kaWZ5RGF0ZT4KICAgICAgICAgPHhtcDpDcmVhdG9yVG9vbD5QaXhlbG1hdG9yIDMuMi4xPC94bXA6Q3JlYXRvclRvb2w+CiAgICAgICAgIDx0aWZmOk9yaWVudGF0aW9uPjE8L3RpZmY6T3JpZW50YXRpb24+CiAgICAgICAgIDx0aWZmOkNvbXByZXNzaW9uPjU8L3RpZmY6Q29tcHJlc3Npb24+CiAgICAgICAgIDx0aWZmOlJlc29sdXRpb25Vbml0PjE8L3RpZmY6UmVzb2x1dGlvblVuaXQ+CiAgICAgICAgIDx0aWZmOllSZXNvbHV0aW9uPjcyPC90aWZmOllSZXNvbHV0aW9uPgogICAgICAgICA8dGlmZjpYUmVzb2x1dGlvbj43MjwvdGlmZjpYUmVzb2x1dGlvbj4KICAgICAgICAgPGV4aWY6UGl4ZWxYRGltZW5zaW9uPjE8L2V4aWY6UGl4ZWxYRGltZW5zaW9uPgogICAgICAgICA8ZXhpZjpDb2xvclNwYWNlPjE8L2V4aWY6Q29sb3JTcGFjZT4KICAgICAgICAgPGV4aWY6UGl4ZWxZRGltZW5zaW9uPjMyPC9leGlmOlBpeGVsWURpbWVuc2lvbj4KICAgICAgPC9yZGY6RGVzY3JpcHRpb24+CiAgIDwvcmRmOlJERj4KPC94OnhtcG1ldGE+Cq3OWlIAAAASSURBVAgdY2hqamJiYGAYKAwAz/QBxSMC8gMAAAAASUVORK5CYII=';
    svglWidget.uri.btns = 'data:image/png;base64,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TUw6Y29tLmFkb2JlLnhtcAAAAAAAPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iWE1QIENvcmUgNS40LjAiPgogICA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAgICAgICB4bWxuczp0aWZmPSJodHRwOi8vbnMuYWRvYmUuY29tL3RpZmYvMS4wLyIKICAgICAgICAgICAgeG1sbnM6ZXhpZj0iaHR0cDovL25zLmFkb2JlLmNvbS9leGlmLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIKICAgICAgICAgICAgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIj4KICAgICAgICAgPHRpZmY6UmVzb2x1dGlvblVuaXQ+MTwvdGlmZjpSZXNvbHV0aW9uVW5pdD4KICAgICAgICAgPHRpZmY6Q29tcHJlc3Npb24+NTwvdGlmZjpDb21wcmVzc2lvbj4KICAgICAgICAgPHRpZmY6WFJlc29sdXRpb24+NzI8L3RpZmY6WFJlc29sdXRpb24+CiAgICAgICAgIDx0aWZmOk9yaWVudGF0aW9uPjE8L3RpZmY6T3JpZW50YXRpb24+CiAgICAgICAgIDx0aWZmOllSZXNvbHV0aW9uPjcyPC90aWZmOllSZXNvbHV0aW9uPgogICAgICAgICA8ZXhpZjpQaXhlbFhEaW1lbnNpb24+MTwvZXhpZjpQaXhlbFhEaW1lbnNpb24+CiAgICAgICAgIDxleGlmOkNvbG9yU3BhY2U+MTwvZXhpZjpDb2xvclNwYWNlPgogICAgICAgICA8ZXhpZjpQaXhlbFlEaW1lbnNpb24+MzA8L2V4aWY6UGl4ZWxZRGltZW5zaW9uPgogICAgICAgICA8ZGM6c3ViamVjdD4KICAgICAgICAgICAgPHJkZjpTZXEvPgogICAgICAgICA8L2RjOnN1YmplY3Q+CiAgICAgICAgIDx4bXA6TW9kaWZ5RGF0ZT4yMDE0OjEwOjEyIDExOjEwOjg0PC94bXA6TW9kaWZ5RGF0ZT4KICAgICAgICAgPHhtcDpDcmVhdG9yVG9vbD5QaXhlbG1hdG9yIDMuMi4xPC94bXA6Q3JlYXRvclRvb2w+CiAgICAgIDwvcmRmOkRlc2NyaXB0aW9uPgogICA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgrvpomEAAAAS0lEQVQIHR2MQQ7AMAjDguH/b+2O1VRYukOwolhoPZu3k25xRj8boQMdTZszpvcbSawNmU1g2rVJ+d7tdpUoec2x5x5BxVjwZzvOByTuHxPBLvQyAAAAAElFTkSuQmCC';
   //This icon was free for commercial use
    svglWidget.uri.slClose = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACeUlEQVQ4T22TT0/iQBTAp3+gYEH+LEogm6xK0OBhMxeMh00IMdmz6ycQTx7dT4LfAL8BZhPFRGMT8UI87ISDMethdQ81LBQKtUUQ7M4baZfdOMnrNJ33+03n9ZVDk/F9Z6c41PUF9fy88EXXdef59FwKh8OZXK40Gg7vPlUqX2GNg0t9d7cUw3hbPTtD2vU1sVQ1/79kAivhdBq3Li+RpesHn29uChzsHF9b21NPT9Gw3Ub2eIweGw2iNhr5wuRNAF7J5ZRoKoW1apXlwDANY5+rbW2VBZ7fHGra6wIN++UFma0WUZvNPCQyeGkJaxcXbN0ZhmEccmVqn0kmlUAshh2YJVHJY7dLZldX0bvFxb+wbbNz9yyLqK1WntWASeJxRY5GmQRgjgbM0fV1pNdqbGdI5qhAN02ittvsiEwAA86ZnJtT5FAIOzAk24MBsp+eGAjJhiC4sPsVpiUJKgn4/Xjc6aBxt4t4usjzPBIEARmiSB4GA7e4bwrS2awi+3y4rSiIFpeBLOi9TgWqZb0tgCMAHIhEcOvkBAlUL05gdxZFpCFE7ns9V8Jq4MLhMG5WKgyGXUUKQHgmsyN6GI3Iz07ntYgOLFP49/Ex4mmxIBFA0+slPL2PiyL2eDxMBAHy+36f3NI+4aobG2U5EtlsHB0xmO1Mw5Ik0nh+Zo30IRRS3ksS9nq9yDsRcRyHfkAjKdls0arX9xwYBH2/nzQpPN3KS9GokgoGsU+SmAS+zK2u77MaHAaDJWkw2AZ4KMukORr9U2mnTsvz80qGNpvf50O/TPNg5eqq4DbSt9nZIn3/Bc22C87ObtNPNVsmkSjNeDx3H+t19jv/AfSGSnxWCGqFAAAAAElFTkSuQmCC';
    //Following two icons provided under MIT license by http://ionicons.com/
    svglWidget.uri.slDown = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAA5klEQVRIS2NkoDFgpLH5DKMWEAzh4RlEckB/pwAxG0H/oyr4BeTOBuLHyMLYgigWqGARiYbDlIP0LiFkAUh+OhBnkGjJVKD6HHQ9uCKZFahwCxC7EWnJJqC6ICD+S6wFIHW8QHwYiPUJWHIeKG8HxF+wqSOUTKWAmk4AsSwOSx4BxS2A+DkuRxCyAKRPB4iPADE/miEfgHwbIL6Kz4fEWADS7wHEm4GYBWoYKEm6A/EBAsFHUmGXDDRsDtRAEHseIcNB8sT6AGZWIJDxD4g3EmM4ORYQay5cHak+GLWA5BAgqGHoxwEAlqoaGVUYad4AAAAASUVORK5CYII=';
    svglWidget.uri.slUp = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAA5klEQVRIS2NkoDFgpLH5DKMWEAzhkRdEAcAwAfl6PcGwgSogJYiKgHp6ofpKgXQPMZYQa0Ew0LBVQMwENfQ/kI4B4mWELCHGAiugIXuBmAPNsB9AvgsQH8VnCSELVIGajwGxCA5D3gLFQQ64hcsSfBaIAjUdB2JlAsFwDyhvCcSvsKnDZQEoOHYDsQ2hMIbKnwLSjkD8DV09NgtAEbkCiEOJNBymbDWQEQHE/5D1YbMgFqhgEYmGw5SD9C4hZIEcUEE4EMOSJLF2gVwO8vljQhYQayBR6gglU6IMwado1AKCQTj0gwgATIoaGfjt0dQAAAAASUVORK5CYII=';

    //The HTML elements are created
    $("<div id='svgl_widget_grab_bar'/>").appendTo("body");
    $("<img src='" + svglWidget.uri.grabBar + "' alt='drag bar' height='32px' width='18px'>").appendTo("#svgl_widget_grab_bar");
    $("<div id='svgl_widget'/>").appendTo("body");
    $("<img id='svgl_widget_slLeft' src='"+svglWidget.uri.slLeft+"' alt='' height='32px width='30px'>" ).appendTo("#svgl_widget");
    $("<img id='svgl_widget_slBody' src='"+svglWidget.uri.slBody+"' alt='Open SVG Layout' height='32px width='1px'>").appendTo("#svgl_widget");
    $("<img id='svgl_widget_slBorder' src='"+svglWidget.uri.slBorder+"' alt='' height='32px width='1px'>").appendTo("#svgl_widget");
    $("<img id='svgl_widget_slClose' src='"+svglWidget.uri.slClose+"' alt='Close SVGLayout' height='24px width='24px'>").appendTo("#svgl_widget");
    $("<img id='svgl_widget_slDown' src='"+svglWidget.uri.slDown+"' alt='Show' height='24px width='24px'>").appendTo("#svgl_widget");
    $("<img id='svgl_widget_slUp' src='"+svglWidget.uri.slUp+"' alt='Hide' height='24px width='24px'>").appendTo("#svgl_widget");
    $("<div id='svgl_widget_form_container'/>").appendTo("#svgl_widget");

    $("<div id='svgl_widget_btn_zindex' onselectstart='return false'/>").appendTo("#svgl_widget_form_container");
    $("<div id='svgl_widget_btn_lock' onselectstart='return false'/>").appendTo("#svgl_widget_form_container");
    $("<div id='svgl_widget_btn_settings' onselectstart='return false'/>").appendTo("#svgl_widget_form_container");
    $("<div id='svgl_widget_btn_coord' onselectstart='return false'/>").appendTo("#svgl_widget_form_container");
    $("<div id='svgl_widget_btn_unlock' onselectstart='return false'/>").appendTo("#svgl_widget_form_container");
    $("<div id='svgl_widget_btn_export' onselectstart='return false'/>").appendTo("#svgl_widget_form_container");

    //JQuery selectors 
    svglWidget.grabBar = $("#svgl_widget_grab_bar");
    svglWidget.widget = $("#svgl_widget");
    svglWidget.slLeft = $("#svgl_widget_slLeft");
    svglWidget.slBody = $("#svgl_widget_slBody");
    svglWidget.slBorder = $("#svgl_widget_slBorder");
    svglWidget.slClose = $("#svgl_widget_slClose");
    svglWidget.slDown = $("#svgl_widget_slDown");
    svglWidget.slUp = $("#svgl_widget_slUp");
    svglWidget.slUp = $("#svgl_widget_slUp");
    svglWidget.formContainer = $("#svgl_widget_form_container");
    svglWidget.btns = $("[id^=svgl_widget_btn]");
    svglWidget.btn_zindex = $("#svgl_widget_btn_zindex");
    svglWidget.btn_lock = $("#svgl_widget_btn_lock");
    svglWidget.btn_settings = $("#svgl_widget_btn_settings");
    svglWidget.btn_coord = $("#svgl_widget_btn_coord");
    svglWidget.btn_unlock = $("#svgl_widget_btn_unlock");
    svglWidget.btn_export = $("#svgl_widget_btn_export");

    //settings, z-index and coodinates maintain a state
    svglWidget.btn_zindex.badges = false;
    svglWidget.btn_coord.badges = false;

    //Button labels
    svglWidget.btn_zindex.html("z-index");
    svglWidget.btn_lock.html("Lock Selected");
    svglWidget.btn_settings.html("Settings");
    svglWidget.btn_coord.html("Coordinates");
    svglWidget.btn_unlock.html("Unlock All");
    svglWidget.btn_export.html("Export");

    //CSS
    svglWidget.widget.css({"position": "absolute"});
    svglWidget.slLeft.css({"position": "absolute"});
    svglWidget.slBody.css({"position": "absolute"});
    svglWidget.slBorder.css({"position": "absolute"});
    svglWidget.slClose.css({"position": "absolute",});
    svglWidget.slDown.css({"position": "absolute"});
    svglWidget.slUp.css({"position": "absolute"});
    svglWidget.formContainer.css({  "position": "absolute",
                                    "background-color": "#DDEDFF",
                                    "border": "1px solid gray",
                                    "height": "0px"
                                });
    svglWidget.btns.css({           "position": "relative",
                                    "border": "1px solid gray",
                                    "height": "25px",
                                    "width": "90px",
                                    "font-family": "Arial",
                                    "font-size": "13px",
                                    "text-align": "center",
                                    "line-height":"25px",
                                    "vertical-align": "middle",
                                    "border-radius": "4px",
                                    "margin": "4px",
                                    "background-image": "url(" + svglWidget.uri.btns + ")",
                                    "border-image-repeat": "repeat"
                                });
    svglWidget.btn_coord.css({     "top": "-93px",
                                    "left": "97px"
                                });
    svglWidget.btn_unlock.css({     "top": "-93px",
                                    "left": "97px"
                                });
    svglWidget.btn_export.css({     "top": "-93px",
                                    "left": "97px"
                                });


    svglWidget.slClose.hide();
    svglWidget.slDown.hide();
    svglWidget.slUp.hide();
    svglWidget.formContainer.hide();
 
    //The default position of the widget
    svglWidget.offset.top = 25;
    svglWidget.offset.left = $( window ).width() - 240;
    svglWidget.height = 32;
    svglWidget.width = 32;
    //The grab bar is positioned there
    svglWidget.grabBar.height(32);
    svglWidget.grabBar.width(18);
    svglWidget.grabBar.offset(svglWidget.offset);

    //Define the widget coordinates
    svglWidget.fn.setCoordinates = function () {
        svglWidget.widget.offset({ top: svglWidget.offset.top, left: (svglWidget.offset.left + svglWidget.grabBar.width() )});
        svglWidget.slLeft.offset({ top: svglWidget.offset.top, left: (svglWidget.offset.left + svglWidget.grabBar.width() )});
        svglWidget.slBody.offset({ top: svglWidget.offset.top, left: (svglWidget.offset.left + svglWidget.grabBar.width() + svglWidget.slLeft.width() )});
        svglWidget.slBody.width(svglWidget.width - 31);
        svglWidget.slBorder.offset({ top: svglWidget.offset.top, left: (svglWidget.offset.left + svglWidget.grabBar.width() + svglWidget.slLeft.width() + svglWidget.slBody.width() )});
        svglWidget.slClose.offset({ top: svglWidget.offset.top + 4, left: (svglWidget.offset.left + svglWidget.grabBar.width() + svglWidget.slLeft.width() + svglWidget.slBody.width() - 30 )});
        svglWidget.slDown.offset({ top: svglWidget.offset.top + 4, left: (svglWidget.offset.left + svglWidget.grabBar.width() + svglWidget.slLeft.width() + (svglWidget.slBody.width() / 2) - 24 )});
        svglWidget.slUp.offset({ top: svglWidget.offset.top + 4, left: (svglWidget.offset.left + svglWidget.grabBar.width() + svglWidget.slLeft.width() + (svglWidget.slBody.width() / 2) - 24 )});
        svglWidget.formContainer.offset({ top: svglWidget.offset.top + svglWidget.grabBar.height() -1, left: svglWidget.offset.left + svglWidget.grabBar.width() });
        svglWidget.formContainer.width(svglWidget.width - 2);
        svglWidget.widget.width(svglWidget.width);
    };

    svglWidget.grabBar.draggable({
        drag: function( event, ui ) {
            svglWidget.offset = ui.offset;
            svglWidget.fn.setCoordinates();
        }
    });

    //Prevent image drags
    $('#svgl_widget_grab_bar > img').on('dragstart', function(event) { event.preventDefault(); });
    $('#svgl_widget > img').on('dragstart', function(event) { event.preventDefault(); });


    //Turning the widget on
    svglWidget.widget.on('mousedown', function(event) {
        if(sl.isActive === false && svglWidget.animation === false) {
            var expand;
            svglWidget.animation = true;
            expand = function () {
                if(svglWidget.width < 200) {
                    svglWidget.width = svglWidget.width + 10;
                    svglWidget.fn.setCoordinates();
                }
                else {
                    window.clearInterval(svglWidget.expand);
                    sl.activateLayout(true);
                    svglWidget.slClose.show();
                    svglWidget.slDown.show();
                    svglWidget.slUp.hide();
                    svglWidget.width = 200;
                    svglWidget.fn.setCoordinates();
                    svglWidget.animation = false;
                }
            };
            svglWidget.expand = setInterval(expand, 25);
        }
    });

    //Turning the widget off
    svglWidget.slClose.on('mousedown', function(event) {
        if(sl.isActive === true && svglWidget.animation === false) {
            if(svglWidget.formContainer.height() === 0) { //The expanded form is closed, so we just contract widget and we are done
                var contract;
                svglWidget.animation = true;
                svglWidget.slClose.hide();
                svglWidget.slDown.hide();
                svglWidget.slUp.hide();
                contract = function () {
                    if(svglWidget.width > 32) {
                        svglWidget.width = svglWidget.width - 10;
                        svglWidget.fn.setCoordinates();
                    }
                    else {
                        window.clearInterval(svglWidget.slClose.contract);
                        sl.activateLayout(false);
                        svglWidget.width = 32;
                        svglWidget.fn.setCoordinates();
                        svglWidget.animation = false;
                    }
                };
                svglWidget.slClose.contract = setInterval(contract, 25);

            }
            else {
                svglWidget.slUp.trigger( "mousedown", true );
            }
        }
    });

    //Expanding down and displaying the widget form
    svglWidget.slDown.on('mousedown', function(event) {
        var down;
        svglWidget.animation = true;
        down = function () {
            if(svglWidget.formContainer.height() < 100) {
                svglWidget.formContainer.height(svglWidget.formContainer.height() + 10);
            }
            else {
                window.clearInterval(svglWidget.slDown.down);
                svglWidget.formContainer.height(100);
                svglWidget.slDown.hide();
                svglWidget.slUp.show();
                svglWidget.btns.show();
                svglWidget.fn.setCoordinates();
                svglWidget.animation = false;
            }
        };
        svglWidget.formContainer.show();
        svglWidget.fn.setCoordinates();
        svglWidget.slDown.down = setInterval(down, 25);

    });

    //Contracting up and hiding the widget form
    svglWidget.slUp.on('mousedown', function(event, fromClose) {
        var up;
        svglWidget.animation = true;
        svglWidget.btns.hide();
        up = function () {
            if(svglWidget.formContainer.height() > 0) {
                svglWidget.formContainer.height(svglWidget.formContainer.height() - 10);
            }
            else {
                window.clearInterval(svglWidget.slUp.up);
                svglWidget.formContainer.height(0);
                svglWidget.slDown.show();
                svglWidget.slUp.hide();
                svglWidget.formContainer.hide();
                svglWidget.fn.setCoordinates();
                svglWidget.animation = false;
                if(fromClose) {
                    svglWidget.slClose.trigger( "mousedown" );
                }
            }
        };
        svglWidget.fn.setCoordinates();
        svglWidget.slUp.up = setInterval(up, 25);

    });

    svglWidget.btns.on('mousedown', function(event, fromClose) {
        switch(this.id) {
            case "svgl_widget_btn_zindex":
                if(svglWidget.btn_zindex.badges) {
                    svglWidget.btn_zindex.css({
                        "border": "1px solid gray",
                        "font-weight": "normal"
                    });
                    sl.setZIBadges(false);
                    svglWidget.btn_zindex.badges = false;
                }
                else {
                    svglWidget.btn_zindex.css({
                        "border": "1px solid red",
                        "font-weight": "bold"
                    });
                    svglWidget.btn_coord.css({
                        "border": "1px solid gray",
                        "font-weight": "normal"
                    });
                    sl.setZIBadges(true);
                    sl.setCOBadges(false);
                    svglWidget.btn_zindex.badges = true;
                    svglWidget.btn_coord.badges = false;
                }
                break;
            case "svgl_widget_btn_coord":
                if(svglWidget.btn_coord.badges) {
                    svglWidget.btn_coord.css({
                        "border": "1px solid gray",
                        "font-weight": "normal"
                    });
                    sl.setCOBadges(false);
                    svglWidget.btn_coord.badges = false;

                }
                else {
                    svglWidget.btn_coord.css({
                        "border": "1px solid red",
                        "font-weight": "bold"

                    });
                    svglWidget.btn_zindex.css({
                        "border": "1px solid gray",
                        "font-weight": "normal"
                    });
                    sl.setCOBadges(true);
                    sl.setZIBadges(false);
                    svglWidget.btn_coord.badges = true;
                    svglWidget.btn_zindex.badges = false;
                }
                
                break;
            default:
                $( this ).css({
                    "border": "1px solid red",
                    "font-weight": "bold"
                });
         }

    });

    svglWidget.btn_lock.on('mouseup', function(event, fromClose) {
        $( this ).css({
            "border": "1px solid gray",
            "font-weight": "normal"
        });
        sl.lockSelection();
    });
    svglWidget.btn_settings.on('mouseup', function(event, fromClose) {
        $( this ).css({
            "border": "1px solid gray",
            "font-weight": "normal"
        });
        svglDialog(sl, 'open');
    });
    svglWidget.btn_unlock.on('mouseup', function(event, fromClose) {
        $( this ).css({
            "border": "1px solid gray",
            "font-weight": "normal"
        });
        sl.unlockAll();
    });
    svglWidget.btn_export.on('mouseup', function(event, fromClose) {
        $( this ).css({
            "border": "1px solid gray",
            "font-weight": "normal"
        });
        sl.exportLayout();
    });

    svglWidget.fn.setCoordinates();

}

function svglDialog (sl, action) {
 
    var svglDialogJSON, found, svgl_dl_el_bg, svgl_dl_el_main, sc, dlDivID, dlParentID, ccx, ccy, ccw, cch, hAction, hMin, hMax, hRate, vAction, vMin, vMax, vRate, modURL, modSel, paramObj, i;
    svglDialogJSON = [{"divID":"svgl_dl_area_bg","parentID":"window","data":{},"cc":{"x":0,"y":0,"w":1097,"h":990},"pc":{"x":0,"y":0,"w":1097,"h":990},"zIndex":-1000,"hAction":"grow","hMin":0,"hMax":0,"hRate":1,"hAuto":false,"vAction":"grow","vMin":0,"vMax":0,"vRate":1,"vAuto":false,"modURL":"","modSel":""},{"divID":"svgl_dl_area_main","parentID":"window","data":{},"cc":{"x":353,"y":204,"w":362,"h":500},"pc":{"x":0,"y":0,"w":1615,"h":1323},"zIndex":-999,"hAction":"none","hMin":0,"hMax":0,"hRate":1,"hAuto":false,"vAction":"none","vMin":0,"vMax":0,"vRate":1,"vAuto":false,"modURL":"","modSel":""},{"divID":"svgl_dl_title_div_lbl","parentID":"svgl_dl_area_main","data":{},"cc":{"x":476,"y":217,"w":131,"h":17},"pc":{"x":353,"y":204,"w":360,"h":440},"zIndex":-998,"hAction":"none","hMin":0,"hMax":0,"hRate":1,"hAuto":false,"vAction":"none","vMin":0,"vMax":0,"vRate":1,"vAuto":false,"modURL":"","modSel":""},{"divID":"svgl_dl_f_div_id_div_lbl","parentID":"svgl_dl_area_main","data":{},"cc":{"x":366,"y":245,"w":36,"h":14},"pc":{"x":353,"y":204,"w":360,"h":440},"zIndex":-997,"hAction":"none","hMin":0,"hMax":0,"hRate":1,"hAuto":false,"vAction":"none","vMin":0,"vMax":0,"vRate":1,"vAuto":false,"modURL":"","modSel":""},{"divID":"svgl_dl_f_div_id_inp_div","parentID":"svgl_dl_area_main","data":{},"cc":{"x":502,"y":241,"w":200,"h":23},"pc":{"x":353,"y":204,"w":360,"h":440},"zIndex":-996,"hAction":"none","hMin":0,"hMax":0,"hRate":1,"hAuto":false,"vAction":"none","vMin":0,"vMax":0,"vRate":1,"vAuto":false,"modURL":"","modSel":""},{"divID":"svgl_dl_f_parent_id_div_lbl","parentID":"svgl_dl_area_main","data":{},"cc":{"x":366,"y":270,"w":66,"h":14},"pc":{"x":353,"y":204,"w":362,"h":509},"zIndex":-995,"hAction":"none","hMin":0,"hMax":0,"hRate":1,"hAuto":false,"vAction":"none","vMin":0,"vMax":0,"vRate":1,"vAuto":false,"modURL":"","modSel":""},{"divID":"svgl_dl_f_parent_id_inp_div","parentID":"svgl_dl_area_main","data":{},"cc":{"x":502,"y":266,"w":200,"h":23},"pc":{"x":353,"y":204,"w":360,"h":440},"zIndex":-994,"hAction":"none","hMin":0,"hMax":0,"hRate":1,"hAuto":false,"vAction":"none","vMin":0,"vMax":0,"vRate":1,"vAuto":false,"modURL":"","modSel":""},{"divID":"svgl_dl_f_ccx_div_lbl","parentID":"svgl_dl_area_main","data":{},"cc":{"x":366,"y":299,"w":9,"h":14},"pc":{"x":353,"y":204,"w":360,"h":440},"zIndex":-993,"hAction":"none","hMin":0,"hMax":0,"hRate":1,"hAuto":false,"vAction":"none","vMin":0,"vMax":0,"vRate":1,"vAuto":false,"modURL":"","modSel":""},{"divID":"svgl_dl_f_ccx_inp_div","parentID":"svgl_dl_area_main","data":{},"cc":{"x":503,"y":295,"w":66,"h":23},"pc":{"x":353,"y":204,"w":360,"h":440},"zIndex":-992,"hAction":"none","hMin":0,"hMax":0,"hRate":1,"hAuto":false,"vAction":"none","vMin":0,"vMax":0,"vRate":1,"vAuto":false,"modURL":"","modSel":""},{"divID":"svgl_dl_f_ccy_div_lbl","parentID":"svgl_dl_area_main","data":{},"cc":{"x":366,"y":320,"w":9,"h":14},"pc":{"x":353,"y":204,"w":360,"h":440},"zIndex":-991,"hAction":"none","hMin":0,"hMax":0,"hRate":1,"hAuto":false,"vAction":"none","vMin":0,"vMax":0,"vRate":1,"vAuto":false,"modURL":"","modSel":""},{"divID":"svgl_dl_f_ccy_inp_div","parentID":"svgl_dl_area_main","data":{},"cc":{"x":503,"y":316,"w":66,"h":23},"pc":{"x":353,"y":204,"w":360,"h":440},"zIndex":-990,"hAction":"none","hMin":0,"hMax":0,"hRate":1,"hAuto":false,"vAction":"none","vMin":0,"vMax":0,"vRate":1,"vAuto":false,"modURL":"","modSel":""},{"divID":"svgl_dl_f_ccw_div_lbl","parentID":"svgl_dl_area_main","data":{},"cc":{"x":366,"y":342,"w":32,"h":14},"pc":{"x":353,"y":204,"w":360,"h":440},"zIndex":-989,"hAction":"none","hMin":0,"hMax":0,"hRate":1,"hAuto":false,"vAction":"none","vMin":0,"vMax":0,"vRate":1,"vAuto":false,"modURL":"","modSel":""},{"divID":"svgl_dl_f_ccw_inp_div","parentID":"svgl_dl_area_main","data":{},"cc":{"x":503,"y":337,"w":66,"h":23},"pc":{"x":353,"y":204,"w":360,"h":440},"zIndex":-988,"hAction":"none","hMin":0,"hMax":0,"hRate":1,"hAuto":false,"vAction":"none","vMin":0,"vMax":0,"vRate":1,"vAuto":false,"modURL":"","modSel":""},{"divID":"svgl_dl_f_cch_div_lbl","parentID":"svgl_dl_area_main","data":{},"cc":{"x":366,"y":362,"w":37,"h":14},"pc":{"x":353,"y":204,"w":360,"h":440},"zIndex":-987,"hAction":"none","hMin":0,"hMax":0,"hRate":1,"hAuto":false,"vAction":"none","vMin":0,"vMax":0,"vRate":1,"vAuto":false,"modURL":"","modSel":""},{"divID":"svgl_dl_f_cch_inp_div","parentID":"svgl_dl_area_main","data":{},"cc":{"x":503,"y":358,"w":66,"h":23},"pc":{"x":353,"y":204,"w":360,"h":440},"zIndex":-986,"hAction":"none","hMin":0,"hMax":0,"hRate":1,"hAuto":false,"vAction":"none","vMin":0,"vMax":0,"vRate":1,"vAuto":false,"modURL":"","modSel":""},{"divID":"svgl_dl_f_h_action_div_lbl","parentID":"svgl_dl_area_main","data":{},"cc":{"x":366,"y":392,"w":96,"h":14},"pc":{"x":353,"y":204,"w":360,"h":440},"zIndex":-985,"hAction":"none","hMin":0,"hMax":0,"hRate":1,"hAuto":false,"vAction":"none","vMin":0,"vMax":0,"vRate":1,"vAuto":false,"modURL":"","modSel":""},{"divID":"svgl_dl_f_h_action_inp_r_none_div","parentID":"svgl_dl_area_main","data":{},"cc":{"x":502,"y":390,"w":18,"h":19},"pc":{"x":353,"y":204,"w":360,"h":440},"zIndex":-984,"hAction":"none","hMin":0,"hMax":0,"hRate":1,"hAuto":false,"vAction":"none","vMin":0,"vMax":0,"vRate":1,"vAuto":false,"modURL":"","modSel":""},{"divID":"svgl_dl_f_h_action_inp_r_none_div_lbl","parentID":"svgl_dl_area_main","data":{},"cc":{"x":521,"y":392,"w":28,"h":14},"pc":{"x":353,"y":204,"w":360,"h":440},"zIndex":-983,"hAction":"none","hMin":0,"hMax":0,"hRate":1,"hAuto":false,"vAction":"none","vMin":0,"vMax":0,"vRate":1,"vAuto":false,"modURL":"","modSel":""},{"divID":"svgl_dl_f_h_action_inp_r_move_div","parentID":"svgl_dl_area_main","data":{},"cc":{"x":580,"y":390,"w":18,"h":19},"pc":{"x":353,"y":204,"w":360,"h":440},"zIndex":-982,"hAction":"none","hMin":0,"hMax":0,"hRate":1,"hAuto":false,"vAction":"none","vMin":0,"vMax":0,"vRate":1,"vAuto":false,"modURL":"","modSel":""},{"divID":"svgl_dl_f_h_action_inp_r_move_div_lbl","parentID":"svgl_dl_area_main","data":{},"cc":{"x":600,"y":392,"w":30,"h":14},"pc":{"x":353,"y":204,"w":360,"h":440},"zIndex":-981,"hAction":"none","hMin":0,"hMax":0,"hRate":1,"hAuto":false,"vAction":"none","vMin":0,"vMax":0,"vRate":1,"vAuto":false,"modURL":"","modSel":""},{"divID":"svgl_dl_f_h_action_inp_r_grow_div","parentID":"svgl_dl_area_main","data":{},"cc":{"x":654,"y":390,"w":18,"h":19},"pc":{"x":353,"y":204,"w":360,"h":440},"zIndex":-980,"hAction":"none","hMin":0,"hMax":0,"hRate":1,"hAuto":false,"vAction":"none","vMin":0,"vMax":0,"vRate":1,"vAuto":false,"modURL":"","modSel":""},{"divID":"svgl_dl_f_h_action_inp_r_grow_div_lbl","parentID":"svgl_dl_area_main","data":{},"cc":{"x":673,"y":392,"w":27,"h":14},"pc":{"x":353,"y":204,"w":360,"h":440},"zIndex":-979,"hAction":"none","hMin":0,"hMax":0,"hRate":1,"hAuto":false,"vAction":"none","vMin":0,"vMax":0,"vRate":1,"vAuto":false,"modURL":"","modSel":""},{"divID":"svgl_dl_f_h_min_div_lbl","parentID":"svgl_dl_area_main","data":{},"cc":{"x":366,"y":413,"w":82,"h":14},"pc":{"x":353,"y":204,"w":360,"h":440},"zIndex":-978,"hAction":"none","hMin":0,"hMax":0,"hRate":1,"hAuto":false,"vAction":"none","vMin":0,"vMax":0,"vRate":1,"vAuto":false,"modURL":"","modSel":""},{"divID":"svgl_dl_f_h_min_inp_div","parentID":"svgl_dl_area_main","data":{},"cc":{"x":502,"y":409,"w":66,"h":23},"pc":{"x":353,"y":204,"w":360,"h":440},"zIndex":-977,"hAction":"none","hMin":0,"hMax":0,"hRate":1,"hAuto":false,"vAction":"none","vMin":0,"vMax":0,"vRate":1,"vAuto":false,"modURL":"","modSel":""},{"divID":"svgl_dl_f_h_max_div_lbl","parentID":"svgl_dl_area_main","data":{},"cc":{"x":366,"y":434,"w":85,"h":14},"pc":{"x":353,"y":204,"w":360,"h":440},"zIndex":-976,"hAction":"none","hMin":0,"hMax":0,"hRate":1,"hAuto":false,"vAction":"none","vMin":0,"vMax":0,"vRate":1,"vAuto":false,"modURL":"","modSel":""},{"divID":"svgl_dl_f_h_max_inp_div","parentID":"svgl_dl_area_main","data":{},"cc":{"x":502,"y":430,"w":66,"h":23},"pc":{"x":353,"y":204,"w":360,"h":440},"zIndex":-975,"hAction":"none","hMin":0,"hMax":0,"hRate":1,"hAuto":false,"vAction":"none","vMin":0,"vMax":0,"vRate":1,"vAuto":false,"modURL":"","modSel":""},{"divID":"svgl_dl_f_h_rate_div_lbl","parentID":"svgl_dl_area_main","data":{},"cc":{"x":366,"y":455,"w":88,"h":14},"pc":{"x":353,"y":204,"w":360,"h":440},"zIndex":-974,"hAction":"none","hMin":0,"hMax":0,"hRate":1,"hAuto":false,"vAction":"none","vMin":0,"vMax":0,"vRate":1,"vAuto":false,"modURL":"","modSel":""},{"divID":"svgl_dl_f_h_rate_inp_div","parentID":"svgl_dl_area_main","data":{},"cc":{"x":502,"y":451,"w":66,"h":23},"pc":{"x":353,"y":204,"w":360,"h":440},"zIndex":-973,"hAction":"none","hMin":0,"hMax":0,"hRate":1,"hAuto":false,"vAction":"none","vMin":0,"vMax":0,"vRate":1,"vAuto":false,"modURL":"","modSel":""},{"divID":"svgl_dl_f_v_action_div_lbl","parentID":"svgl_dl_area_main","data":{},"cc":{"x":366,"y":505,"w":81,"h":14},"pc":{"x":353,"y":204,"w":360,"h":440},"zIndex":-972,"hAction":"none","hMin":0,"hMax":0,"hRate":1,"hAuto":false,"vAction":"none","vMin":0,"vMax":0,"vRate":1,"vAuto":false,"modURL":"","modSel":""},{"divID":"svgl_dl_f_v_action_inp_r_none_div","parentID":"svgl_dl_area_main","data":{},"cc":{"x":502,"y":503,"w":18,"h":19},"pc":{"x":353,"y":204,"w":360,"h":440},"zIndex":-971,"hAction":"none","hMin":0,"hMax":0,"hRate":1,"hAuto":false,"vAction":"none","vMin":0,"vMax":0,"vRate":1,"vAuto":false,"modURL":"","modSel":""},{"divID":"svgl_dl_f_v_action_inp_r_none_div_lbl","parentID":"svgl_dl_area_main","data":{},"cc":{"x":521,"y":506,"w":28,"h":14},"pc":{"x":353,"y":204,"w":360,"h":440},"zIndex":-970,"hAction":"none","hMin":0,"hMax":0,"hRate":1,"hAuto":false,"vAction":"none","vMin":0,"vMax":0,"vRate":1,"vAuto":false,"modURL":"","modSel":""},{"divID":"svgl_dl_f_v_action_inp_r_move_div","parentID":"svgl_dl_area_main","data":{},"cc":{"x":580,"y":505,"w":18,"h":19},"pc":{"x":353,"y":204,"w":360,"h":440},"zIndex":-969,"hAction":"none","hMin":0,"hMax":0,"hRate":1,"hAuto":false,"vAction":"none","vMin":0,"vMax":0,"vRate":1,"vAuto":false,"modURL":"","modSel":""},{"divID":"svgl_dl_f_v_action_inp_r_move_div_lbl","parentID":"svgl_dl_area_main","data":{},"cc":{"x":600,"y":507,"w":30,"h":14},"pc":{"x":353,"y":204,"w":360,"h":440},"zIndex":-968,"hAction":"none","hMin":0,"hMax":0,"hRate":1,"hAuto":false,"vAction":"none","vMin":0,"vMax":0,"vRate":1,"vAuto":false,"modURL":"","modSel":""},{"divID":"svgl_dl_f_v_action_inp_r_grow_div","parentID":"svgl_dl_area_main","data":{},"cc":{"x":654,"y":505,"w":18,"h":19},"pc":{"x":353,"y":204,"w":360,"h":440},"zIndex":-967,"hAction":"none","hMin":0,"hMax":0,"hRate":1,"hAuto":false,"vAction":"none","vMin":0,"vMax":0,"vRate":1,"vAuto":false,"modURL":"","modSel":""},{"divID":"svgl_dl_f_v_action_inp_r_grow_div_lbl","parentID":"svgl_dl_area_main","data":{},"cc":{"x":673,"y":507,"w":27,"h":14},"pc":{"x":353,"y":204,"w":360,"h":440},"zIndex":-966,"hAction":"none","hMin":0,"hMax":0,"hRate":1,"hAuto":false,"vAction":"none","vMin":0,"vMax":0,"vRate":1,"vAuto":false,"modURL":"","modSel":""},{"divID":"svgl_dl_f_v_min_div_lbl","parentID":"svgl_dl_area_main","data":{},"cc":{"x":366,"y":527,"w":67,"h":14},"pc":{"x":353,"y":204,"w":360,"h":440},"zIndex":-965,"hAction":"none","hMin":0,"hMax":0,"hRate":1,"hAuto":false,"vAction":"none","vMin":0,"vMax":0,"vRate":1,"vAuto":false,"modURL":"","modSel":""},{"divID":"svgl_dl_f_v_min_inp_div","parentID":"svgl_dl_area_main","data":{},"cc":{"x":502,"y":523,"w":66,"h":23},"pc":{"x":353,"y":204,"w":360,"h":440},"zIndex":-964,"hAction":"none","hMin":0,"hMax":0,"hRate":1,"hAuto":false,"vAction":"none","vMin":0,"vMax":0,"vRate":1,"vAuto":false,"modURL":"","modSel":""},{"divID":"svgl_dl_f_v_max_div_lbl","parentID":"svgl_dl_area_main","data":{},"cc":{"x":366,"y":548,"w":70,"h":14},"pc":{"x":353,"y":204,"w":360,"h":440},"zIndex":-963,"hAction":"none","hMin":0,"hMax":0,"hRate":1,"hAuto":false,"vAction":"none","vMin":0,"vMax":0,"vRate":1,"vAuto":false,"modURL":"","modSel":""},{"divID":"svgl_dl_f_v_max_inp_div","parentID":"svgl_dl_area_main","data":{},"cc":{"x":502,"y":544,"w":66,"h":23},"pc":{"x":353,"y":204,"w":360,"h":440},"zIndex":-962,"hAction":"none","hMin":0,"hMax":0,"hRate":1,"hAuto":false,"vAction":"none","vMin":0,"vMax":0,"vRate":1,"vAuto":false,"modURL":"","modSel":""},{"divID":"svgl_dl_f_v_rate_div_lbl","parentID":"svgl_dl_area_main","data":{},"cc":{"x":366,"y":570,"w":73,"h":14},"pc":{"x":353,"y":204,"w":360,"h":440},"zIndex":-961,"hAction":"none","hMin":0,"hMax":0,"hRate":1,"hAuto":false,"vAction":"none","vMin":0,"vMax":0,"vRate":1,"vAuto":false,"modURL":"","modSel":""},{"divID":"svgl_dl_f_v_rate_inp_div","parentID":"svgl_dl_area_main","data":{},"cc":{"x":502,"y":565,"w":66,"h":23},"pc":{"x":353,"y":204,"w":360,"h":440},"zIndex":-960,"hAction":"none","hMin":0,"hMax":0,"hRate":1,"hAuto":false,"vAction":"none","vMin":0,"vMax":0,"vRate":1,"vAuto":false,"modURL":"","modSel":""},{"divID":"svgl_dl_btn_close_div","parentID":"svgl_dl_area_main","data":{},"cc":{"x":405,"y":683,"w":49,"h":22},"pc":{"x":353,"y":204,"w":362,"h":509},"zIndex":-959,"hAction":"none","hMin":0,"hMax":0,"hRate":1,"hAuto":false,"vAction":"none","vMin":0,"vMax":0,"vRate":1,"vAuto":false,"modURL":"","modSel":""},{"divID":"svgl_dl_btn_apply_div","parentID":"svgl_dl_area_main","data":{},"cc":{"x":516,"y":683,"w":50,"h":22},"pc":{"x":353,"y":204,"w":362,"h":509},"zIndex":-958,"hAction":"none","hMin":0,"hMax":0,"hRate":1,"hAuto":false,"vAction":"none","vMin":0,"vMax":0,"vRate":1,"vAuto":false,"modURL":"","modSel":""},{"divID":"svgl_dl_btn_save_div","parentID":"svgl_dl_area_main","data":{},"cc":{"x":625,"y":684,"w":44,"h":22},"pc":{"x":353,"y":204,"w":362,"h":509},"zIndex":-957,"hAction":"none","hMin":0,"hMax":0,"hRate":1,"hAuto":false,"vAction":"none","vMin":0,"vMax":0,"vRate":1,"vAuto":false,"modURL":"","modSel":""},{"divID":"svgl_dl_f_h_auto_div_lbl","parentID":"svgl_dl_area_main","data":{},"cc":{"x":366,"y":476,"w":129,"h":14},"pc":{"x":353,"y":204,"w":360,"h":440},"zIndex":-956,"hAction":"none","hMin":0,"hMax":0,"hRate":1,"hAuto":false,"vAction":"none","vMin":0,"vMax":0,"vRate":1,"vAuto":false,"modURL":"","modSel":""},{"divID":"svgl_dl_f_h_auto_inp_r_true_div","parentID":"svgl_dl_area_main","data":{},"cc":{"x":502,"y":474,"w":18,"h":19},"pc":{"x":353,"y":204,"w":360,"h":440},"zIndex":-955,"hAction":"none","hMin":0,"hMax":0,"hRate":1,"hAuto":false,"vAction":"none","vMin":0,"vMax":0,"vRate":1,"vAuto":false,"modURL":"","modSel":""},{"divID":"svgl_dl_f_h_auto_inp_r_true_div_lbl","parentID":"svgl_dl_area_main","data":{},"cc":{"x":521,"y":477,"w":21,"h":14},"pc":{"x":353,"y":204,"w":360,"h":440},"zIndex":-954,"hAction":"none","hMin":0,"hMax":0,"hRate":1,"hAuto":false,"vAction":"none","vMin":0,"vMax":0,"vRate":1,"vAuto":false,"modURL":"","modSel":""},{"divID":"svgl_dl_f_h_auto_inp_r_false_div","parentID":"svgl_dl_area_main","data":{},"cc":{"x":580,"y":474,"w":18,"h":19},"pc":{"x":353,"y":204,"w":360,"h":440},"zIndex":-953,"hAction":"none","hMin":0,"hMax":0,"hRate":1,"hAuto":false,"vAction":"none","vMin":0,"vMax":0,"vRate":1,"vAuto":false,"modURL":"","modSel":""},{"divID":"svgl_dl_f_h_auto_inp_r_false_div_lbl","parentID":"svgl_dl_area_main","data":{},"cc":{"x":600,"y":477,"w":26,"h":14},"pc":{"x":353,"y":204,"w":360,"h":440},"zIndex":-952,"hAction":"none","hMin":0,"hMax":0,"hRate":1,"hAuto":false,"vAction":"none","vMin":0,"vMax":0,"vRate":1,"vAuto":false,"modURL":"","modSel":""},{"divID":"svgl_dl_f_v_auto_div_lbl","parentID":"svgl_dl_area_main","data":{},"cc":{"x":366,"y":591,"w":114,"h":14},"pc":{"x":353,"y":204,"w":360,"h":440},"zIndex":-951,"hAction":"none","hMin":0,"hMax":0,"hRate":1,"hAuto":false,"vAction":"none","vMin":0,"vMax":0,"vRate":1,"vAuto":false,"modURL":"","modSel":""},{"divID":"svgl_dl_f_v_auto_inp_r_true_div","parentID":"svgl_dl_area_main","data":{},"cc":{"x":502,"y":589,"w":18,"h":19},"pc":{"x":353,"y":204,"w":360,"h":440},"zIndex":-950,"hAction":"none","hMin":0,"hMax":0,"hRate":1,"hAuto":false,"vAction":"none","vMin":0,"vMax":0,"vRate":1,"vAuto":false,"modURL":"","modSel":""},{"divID":"svgl_dl_f_v_auto_inp_r_true_div_lbl","parentID":"svgl_dl_area_main","data":{},"cc":{"x":521,"y":591,"w":21,"h":14},"pc":{"x":353,"y":204,"w":360,"h":440},"zIndex":-949,"hAction":"none","hMin":0,"hMax":0,"hRate":1,"hAuto":false,"vAction":"none","vMin":0,"vMax":0,"vRate":1,"vAuto":false,"modURL":"","modSel":""},{"divID":"svgl_dl_f_v_auto_inp_r_false_div","parentID":"svgl_dl_area_main","data":{},"cc":{"x":580,"y":589,"w":18,"h":19},"pc":{"x":353,"y":204,"w":360,"h":440},"zIndex":-948,"hAction":"none","hMin":0,"hMax":0,"hRate":1,"hAuto":false,"vAction":"none","vMin":0,"vMax":0,"vRate":1,"vAuto":false,"modURL":"","modSel":""},{"divID":"svgl_dl_f_v_auto_inp_r_false_div_lbl","parentID":"svgl_dl_area_main","data":{},"cc":{"x":600,"y":591,"w":26,"h":14},"pc":{"x":353,"y":204,"w":360,"h":440},"zIndex":-947,"hAction":"none","hMin":0,"hMax":0,"hRate":1,"hAuto":false,"vAction":"none","vMin":0,"vMax":0,"vRate":1,"vAuto":false,"modURL":"","modSel":""},{"divID":"svgl_dl_f_mod_url_div_lbl","parentID":"svgl_dl_area_main","data":{},"cc":{"x":367,"y":625,"w":117,"h":18},"pc":{"x":353,"y":204,"w":360,"h":440},"zIndex":-946,"hAction":"none","hMin":0,"hMax":0,"hRate":1,"hAuto":false,"vAction":"none","vMin":0,"vMax":0,"vRate":1,"vAuto":false,"modURL":"","modSel":""},{"divID":"svgl_dl_f_mod_url_inp_div","parentID":"svgl_dl_area_main","data":{},"cc":{"x":501,"y":621,"w":201,"h":23},"pc":{"x":353,"y":204,"w":360,"h":440},"zIndex":-945,"hAction":"none","hMin":0,"hMax":0,"hRate":1,"hAuto":false,"vAction":"none","vMin":0,"vMax":0,"vRate":1,"vAuto":false,"modURL":"","modSel":""},{"divID":"svgl_dl_f_mod_sel_div_lbl","parentID":"svgl_dl_area_main","data":{},"cc":{"x":367,"y":649,"w":116,"h":18},"pc":{"x":353,"y":204,"w":360,"h":440},"zIndex":-944,"hAction":"none","hMin":0,"hMax":0,"hRate":1,"hAuto":false,"vAction":"none","vMin":0,"vMax":0,"vRate":1,"vAuto":false,"modURL":"","modSel":""},{"divID":"svgl_dl_f_mod_sel_inp_div","parentID":"svgl_dl_area_main","data":{},"cc":{"x":501,"y":646,"w":201,"h":23},"pc":{"x":353,"y":204,"w":360,"h":440},"zIndex":-943,"hAction":"none","hMin":0,"hMax":0,"hRate":1,"hAuto":false,"vAction":"none","vMin":0,"vMax":0,"vRate":1,"vAuto":false,"modURL":"","modSel":""}];

    switch(action) {
        case "create elements":

            //Dialog background div
            $("<div id='svgl_dl_area_bg'/>").appendTo("body");
            $("#svgl_dl_area_bg").css({
                "background-color": "black",
                "opacity": "0.2",
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


            //Module Parameters
            //URL
            $("<div id='svgl_dl_f_mod_url_div_lbl'/>").appendTo("#svgl_dl_form");
            $("#svgl_dl_f_mod_url_div_lbl" ).text("Module URL:  ");
            $("<div id='svgl_dl_f_mod_url_inp_div'/>").appendTo("#svgl_dl_form");
            $("<input id='svgl_dl_f_mod_url_inp' name='mod_url'/>").appendTo("#svgl_dl_f_mod_url_inp_div");
            $("#svgl_dl_f_mod_url_inp").css({
                "width": "195px"
             });

            //Selector
            $("<div id='svgl_dl_f_mod_sel_div_lbl'/>").appendTo("#svgl_dl_form");
            $("#svgl_dl_f_mod_sel_div_lbl" ).text("Module Selector:  ");
            $("<div id='svgl_dl_f_mod_sel_inp_div'/>").appendTo("#svgl_dl_form");
            $("<input id='svgl_dl_f_mod_sel_inp' name='mod_sel'/>").appendTo("#svgl_dl_f_mod_sel_inp_div");
            $("#svgl_dl_f_mod_sel_inp").css({
                "width": "195px"
             });

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


            $("[id^=svgl_dl]").css({
                "display": "none"
             });

            return true;

        case "open":

            var co;
            if(svglc) {
                if(typeof svglc.paper === "object") {
                    return false;
                }
            }
            
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
            modURL = "";
            modSel = "";

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
                        modURL = sl.DivObj[i].modURL;
                        modSel = sl.DivObj[i].modSel;
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
                        if (modURL !== sl.DivObj[i].modURL) {
                            modURL = "";
                        }
                        if (modSel !== sl.DivObj[i].modSel) {
                            modSel = "";
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
            $("[id^=svgl_dl]").show();
            
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

            $("#svgl_dl_f_mod_url_inp").val(modURL);
            $("#svgl_dl_f_mod_sel_inp").val(modSel);


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
                this.cc.h = 510;
                this.cc.x = (pc.w/2) - (this.cc.w/2);
                this.cc.y = (pc.h/2) - (this.cc.h/2);
                this.applyCoordinates(this.cc.x, this.cc.y, this.cc.w, this.cc.h);
            };

            svgl_dl_el_bg = svglc.getDivByID('svgl_dl_area_bg');

            svgl_dl_el_bg.onResizingParent = function () {
                this.cc.x = 0;
                this.cc.y = 0;
                this.cc.w = $(document).width();
                this.cc.h = $(document).height();
                this.applyCoordinates(this.cc.x, this.cc.y, this.cc.w, this.cc.h);
            };

            svgl_dl_el_main.resizeDiv();
            entryRules();
            return true;

        case "close":
            $('#svgl_dl_area_bg').remove();
            $('#svgl_dl_area_main').remove();
            $('#svgl_dl_form').remove();
            sl.selectNone();
            svglc.paper.remove();
            for (i = 0; i < svglLayoutList.length; (i++)) {
                if (svglLayoutList[i] === svglc) {
                    svglLayoutList.splice(i,1);
                    break;
                }
            }
            svglc = {};
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

            modURL = document.svgldialog.mod_url.value;
            modSel = document.svgldialog.mod_sel.value;

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
                    if (modURL > "") {
                        paramObj.modURL = modURL;
                    }
                    if (modSel > "") {
                        paramObj.modSel = modSel;
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

