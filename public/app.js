var treeStructure = (function() {
    function init() {
        styling();
        bindSearch();
        bindReset();
    }

    function styling() {
        var elm = document.getElementById("treeStructure");
        for (var i = 0; i < elm.getElementsByTagName("ul").length; i++) {
            elm.getElementsByTagName("ul")[i].classList.add('hide');
        }
        elm.addEventListener("click", toggleBranch, false);
        colorTag(elm);
    }

    function toggleBranch(event) {
        var sublist = event.target.parentNode.getElementsByTagName("ul");
        if (sublist.length > 0) {
            if(sublist[0].classList.contains('show')) {
                sublist[0].classList.add('hide');
                sublist[0].classList.remove('show');
            } else {
                sublist[0].classList.add('show');
                sublist[0].classList.remove('hide');
            }
        }
    }

    function colorTag(elm) {
        var sublist = elm.getElementsByTagName("li");
        for (var i = 0; i < sublist.length; i++) {
            sublist[i].setAttribute('id', 'index-' + i);

            if(sublist[i].childNodes.length == 1){
                sublist[i].classList.add('leafNode');
            } else {
                sublist[i].classList.add('parentNode');
                if(!sublist[i].childNodes[0].classList.contains('rootNode')) {
                    sublist[i].childNodes[0].classList.add('boldNode');

                    sublist[i].ondrop = ondropList;
                    sublist[i].ondragover = ondragoverList;

                    // sublist[i].addEventListener('ondrop', ondropList, false);
                    // sublist[i].addEventListener('ondragover', ondragoverList, false);
                }
            }
            sublist[i].setAttribute('draggable', 'true');
            sublist[i].ondragstart = ondrag;
            // sublist[i].addEventListener('ondragstart', ondrag, false);

        }
    }

    function ondrag(event) {
        event.dataTransfer.setData("text", event.target.id);
        // console.log(event.target.id);
    }

    function ondropList(event) {
        event.preventDefault();
        var data = event.dataTransfer.getData("text");
        // event.target.getElementsByTagName("ul")[0].appendChild(document.getElementById(data));
        console.log(document.getElementById(data));
        // console.log(event.target.getElementsByTagName("ul")[0].appendChild(document.getElementById(data));
        // event.target.appendChild(document.getElementById(data));
        console.log(event.target);
    }

    function ondragoverList(event) {
        event.preventDefault();
    }

    function bindSearch() {
        document.getElementById('search').addEventListener("click", doSearch, false);
    }

    function bindReset() {
        document.getElementById('reset').addEventListener("click", reset, false);
    }

    function doSearch(event) {
        var data = document.getElementById('searchText').value;
        if(data.length == 0) {
            return false;
        }

        var listValue = "",
            elm = document.getElementById("treeStructure"),
            searchStatus = false
            childElm = "";

        for (var i = 0; i < elm.getElementsByTagName("span").length; i++) {

            listValue = elm.getElementsByTagName("span")[i].innerHTML;
            if(listValue.indexOf(data) != -1){
                searchStatus = true;
                childElm = elm.getElementsByTagName("span")[i];
                childElm.classList.add('highlightText');
                childElm.parentNode.parentNode.classList.add('show');
                childElm.parentNode.parentNode.classList.remove('hide');
                if(childElm.childNodes.length == 1){
                    childElm.parentNode.parentNode.parentNode.parentNode.classList.add('show');
                    childElm.parentNode.parentNode.parentNode.parentNode.classList.remove('hide');
                }
            } else {
                document.getElementById("treeStructure").getElementsByTagName("span")[i].classList.remove('highlightText');
            }
        }

        if(!searchStatus) {
            document.getElementById("searchResult").innerHTML = "No search result for \"" + data + "\"";
        } else {
            document.getElementById("searchResult").innerHTML = "Search result found \"" + data + "\"";
        }
    }

    function reset() {
        var elm = document.getElementById("treeStructure");
        for (var i = 0; i < elm.getElementsByTagName("span").length; i++) {
            document.getElementById("treeStructure").getElementsByTagName("span")[i].classList.remove('highlightText');
        }
        document.getElementById("searchResult").innerHTML = "";
        document.getElementById('searchText').value = "";
    }

    return {
        init: init
    }
}());

window.onload = treeStructure.init();