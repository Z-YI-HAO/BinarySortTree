//实例化二叉排序树
let bst = new BST();

/**
 * 清空一个标签下面所有的子节点
 * @e 要清空子节点的标签对象
 **/
function removeAllChildren(e) {
    var children = e.childNodes; //获取当前标签下面的所有子节点
    for (let i = children.length - 1; i >= 0; i--) {
        e.removeChild(children[i]);
    }
}

//设置canvas的大小
function setCanvasSize(canvas, ctx, tree) {
    //获取二叉树的深度
    var depth = bst.getDepth();

    //计算画布的长和宽
    let canvas_width = LEFT + Math.pow(2, depth) * WIDTH + RIGHT;
    let canvas_height = TOP + depth * HEIGHT + BOTTOM;

    canvas.width = canvas_width;
    canvas.height = canvas_height;
    canvas.style.width = `${canvas_width}px`;
    canvas.style.height = `${canvas_height}px`;

    if (canvas_width > 1000 && canvas_height <= 800) {
        canvas.style.left = 0;
        canvas.style.transform = "translateY(-50%)";
    }
    else if (canvas_width <= 1000 && canvas_height > 800) {
        canvas.style.top = 0;
        canvas.style.transform = "translateX(-50%)";
    }
    else if (canvas_width > 1000 && canvas_height > 800) {
        canvas.style.left = 0;
        canvas.style.top = 0;
        canvas.style.transform = "translate(0,0)";
    }
}


//向二叉排序树中插入元素的操作
let insert_btn = document.querySelector("#insert_btn");
insert_btn.onclick = function () {
    let input_value = document.querySelector("#input_value").value;
    document.querySelector("#input_value").value = ""; //清空输入框的内容

    if (bst.getDepth() >= 10) {
        alert("二叉树已经超过10层");
    }
    else {
        if (input_value == "") {
            alert("插入节点的值不能为空");
        }
        else {
            //用于检验整数的正则表达式
            let r = /^\d+$/;

            if (!r.test(input_value)) {
                alert("请输入一个非负整数");
            }
            else {
                let value = parseInt(input_value);

                if (bst.search(value)) {
                    alert("当前节点已经在树中存在");
                }
                else {
                    bst.insert(value);

                    //清空左侧区域的内容
                    let left_area = document.querySelector("#left_area");
                    removeAllChildren(left_area);

                    let str = '<div id="canvas_area"><canvas id="canvas" width="1000" height="800"></canvas><div>';
                    left_area.innerHTML = str;

                    drawTree();
                }
            }
        }
    }
}

//在二叉排序树中删除元素的操作
let remove_btn = document.querySelector("#remove_btn");
remove_btn.onclick = function () {
    let remove_value = document.querySelector("#remove_value").value;
    document.querySelector("#remove_value").value = ""; //清空输入框的内容

    if (remove_value == "") {
        alert("插入节点的值不能为空");
    }
    else {
        //用于检验整数的正则表达式
        let r = /^\d+$/;

        if (!r.test(remove_value)) {
            alert("请输入一个整数");
        }
        else {
            let value = parseInt(remove_value);

            if (!bst.search(value)) {
                alert("当前节点不存在");
            }
            else {
                bst.remove(value);

                //清空左侧区域的内容
                let left_area = document.querySelector("#left_area");
                removeAllChildren(left_area);

                let str = '<div id="canvas_area"><canvas id="canvas" width="1000" height="800"></canvas><div>';
                left_area.innerHTML = str;

                drawTree();
            }
        }
    }
}
