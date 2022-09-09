//配置画图时的相关参数
const HEIGHT = 80; //二叉树层与层之间的高
const WIDTH = 40; //二叉树结点之间的宽
const TOP = 40; //二叉树根节点距离顶部的距离
const BOTTOM = 40; //二叉树距离底部的距离
const LEFT = 40; //二叉树距离左侧的距离
const RIGHT = 40; //二叉树距离右侧的距离
const R = 25; //图上节点的半径
const FONT_SIZE = 20; //节点上字体的大小

//绘制二叉树中的线
function drawLine(node) {
    //获取画布对象
    let canvas = document.querySelector("#canvas");
    //上下文对象
    let ctx = canvas.getContext("2d");

    //求当前节点的坐标
    let xPos = (LEFT + Math.pow(2, bst.getDepth()) * WIDTH + RIGHT) / 2 + node.nodePos * WIDTH;
    let yPos = TOP + node.nodeLevel * HEIGHT;

    let parent = node.parent;

    if (parent !== null) {
        //求父亲节点的坐标
        let xPos_parent = (LEFT + Math.pow(2, bst.getDepth()) * WIDTH + RIGHT) / 2 + parent.nodePos * WIDTH;
        let yPos_parent = TOP + parent.nodeLevel * HEIGHT;

        ctx.beginPath();
        ctx.moveTo(xPos_parent, yPos_parent);
        ctx.lineTo(xPos, yPos);
        ctx.lineWidth = 1;
        ctx.stroke()
        ctx.closePath();
    }
}

//绘制二叉树中的节点
function drawNode(node) {
    //获取画布对象
    let canvas = document.querySelector("#canvas");
    //上下文对象
    let ctx = canvas.getContext("2d");

    //求当前节点的坐标
    let xPos = (LEFT + Math.pow(2, bst.getDepth()) * WIDTH + RIGHT) / 2 + node.nodePos * WIDTH;
    let yPos = TOP + node.nodeLevel * HEIGHT;

    ctx.beginPath();
    ctx.arc(xPos, yPos, R, 0, 2 * Math.PI);
    ctx.lineWidth = 3;
    ctx.stroke();
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.closePath();

    ctx.beginPath();
    ctx.moveTo(xPos, yPos);
    ctx.fillStyle = "black";
    ctx.font = `${FONT_SIZE}px Arial`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    let value_str = node.value.toString();
    ctx.fillText(value_str, xPos, yPos);
    ctx.closePath();
}

//通过canvas画二叉树
function drawTree() {
    //获取画布对象
    let canvas = document.querySelector("#canvas");
    //上下文对象
    let ctx = canvas.getContext("2d");

    //将画布清空
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    //设置画布的大小
    setCanvasSize(canvas, ctx, bst);

    //给二叉树的每个结点设置位置
    bst.setPos();

    //先序遍历二叉树来画二叉树的线
    bst.preOrderTraverse(drawLine);

    //先序遍历二叉树来画二叉树的节点
    bst.preOrderTraverse(drawNode);
}