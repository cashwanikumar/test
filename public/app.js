var treeStructure = (function() {
    function init() {
        styling();
        colorTag();
        draggableInit();
        bindSearch();
        bindClear();
    }

    // reset dom
    function restDom() {
        var old_element = document.getElementById("treeStructure");
        var new_element = old_element.cloneNode(true);
        old_element.parentNode.replaceChild(new_element, old_element);
        new_element.addEventListener("click", toggleBranch, false);
        colorTag();
        draggableInit();
    }

    // add styling to list
    function styling() {
        var elm = document.getElementById("treeStructure");
        for (var i = 0; i < elm.getElementsByTagName("ul").length; i++) {
            elm.getElementsByTagName("ul")[i].classList.add('hide');
        }
        elm.addEventListener("click", toggleBranch, false);
    }

    // tree show/hide
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

    function draggableInit() {
        var elm = document.getElementById("treeStructure");
        var sublist = elm.getElementsByTagName("li");
        for (var i = 0; i < sublist.length; i++) {
            sublist[i].ondragstart = ondrag;
            sublist[i].ondrop = ondropList;
            sublist[i].ondragover = ondragoverList;
            sublist[i].ondragleave = ondragleaveList;
            sublist[i].setAttribute('draggable', 'true');
        }
    }

    // color leaf
    function colorTag() {
        var elm = document.getElementById("treeStructure");
        var sublist = elm.getElementsByTagName("li");
        for (var i = 0; i < sublist.length; i++) {
            sublist[i].setAttribute('id', 'index-' + i);
            if(sublist[i].childNodes.length == 1) {
                sublist[i].classList.add('leafNode');
                sublist[i].classList.remove('parentNode');
            } else {
                sublist[i].classList.add('parentNode');
                sublist[i].classList.remove('leafNode');
                if(!sublist[i].childNodes[0].classList.contains('rootNode')) {
                    sublist[i].childNodes[0].classList.add('boldNode');
                }
            }
        }
    }

    function ondrag(event) {
        event.dataTransfer.setData("text", event.target.id);
    }

    function ondropList(event) {
        event.stopPropagation();
        event.target.classList.remove('targetDrop');
        var data = event.dataTransfer.getData("text");
        if(event.target.parentNode.classList.contains('leafNode')) {
            var nodeUl = document.createElement("UL");
            var nodeLi = document.createElement("LI");
            var nodeSpan = document.createElement("SPAN");
            var textnode = document.createTextNode(document.getElementById(data).innerText);
            nodeSpan.appendChild(textnode);
            nodeLi.appendChild(nodeSpan);
            nodeUl.appendChild(nodeLi);
            event.target.parentNode.appendChild(nodeUl);
        } else {
            event.target.getElementsByTagName("ul")[0].appendChild(document.getElementById(data));
        }
        restDom();
    }

    function ondragoverList(event) {
        event.preventDefault();
        event.target.classList.add('targetDrop');
    }

    function ondragleaveList(event) {
        event.preventDefault();
        event.target.classList.remove('targetDrop');
    }

    function bindSearch() {
        document.getElementById('search').addEventListener("click", doSearch, false);
    }

    function bindClear() {
        document.getElementById('clear').addEventListener("click", clear, false);
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

    function clear() {
        var elm = document.getElementById("treeStructure");
        for (var i = 0; i < elm.getElementsByTagName("span").length; i++) {
            document.getElementById("treeStructure").getElementsByTagName("span")[i].classList.remove('highlightText');
        }
        document.getElementById("searchResult").innerHTML = "";
        document.getElementById('searchText').value = "";
    }

    return {
        init: init,
        reset: reset
    }
}());

window.onload = treeStructure.init();