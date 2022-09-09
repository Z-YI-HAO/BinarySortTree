//定义一个节点类
class Node {
    constructor(value, parent) {
        this.value = value; //节点的值
        this.parent = parent; //当前节点的父亲节点
        this.lChild = null; //当前节点的左儿子节点
        this.rChild = null; //当前节点的右儿子节点
    }
}

//定义二叉排序树的类
class BST {
    constructor() {
        this.root = null; //树的根节点
    }

    //将一个节点添加到以node为根节点的二叉排序树中
    insertNode(value, node) {
        if (value < node.value) {
            if (node.lChild === null) {
                node.lChild = new Node(value, node);
            }
            else {
                this.insertNode(value, node.lChild);
            }
        }
        else {
            if (node.rChild === null) {
                node.rChild = new Node(value, node);
            }
            else {
                this.insertNode(value, node.rChild);
            }
        }
    }

    //向树中添加一个节点
    insert(value) {
        //如果根节点为空，则当前节点即为二叉排序树的根节点
        if (this.root === null) {
            this.root = new Node(value, null);
        }
        else {
            this.insertNode(value, this.root);
        }
    }

    //在以node为根节点的二叉排序树中查找值为value的节点
    searchNode(node, value) {
        if (node === null) {
            return false;
        }
        else {
            if (value == node.value) {
                return true;
            }
            return value < node.value ? this.searchNode(node.lChild, value) :
                this.searchNode(node.rChild, value);
        }
    }

    //查找树中是否存在值为value的节点
    search(value) {
        return this.searchNode(this.root, value);
    }

    //在以node为根节点的二叉排序树中查找最大的值
    searchMaxNode(node) {
        if (node.rChild !== null) {
            return this.searchMaxNode(node.rChild);
        }
        return node.value;
    }

    //查找树中最大的值
    searchMax() {
        return this.searchMaxNode(this.root);
    }

    //在以node为根节点的二叉排序树中查找最小的值
    searchMinNOde(node) {
        if (node.lChild != null) {
            return this.searchMinNode(node.lChild);
        }
        return node.value;
    }

    //查找树中最小的值
    searchMin() {
        return this.searchMinNode(this.root);
    }

    //在以node为根节点的二叉排序树删除值为value的节点
    removeNode(node, value) {
        if (value < node.value) {
            node.lChild = this.removeNode(node.lChild, value);
            return node;
        }
        else if (value > node.value) {
            node.rChild = this.removeNode(node.rChild, value);
            return node;
        }
        else {
            if (node.lChild === null && node.rChild === null) {
                node = null;
                return node;
            }
            else if (node.lChild === null) {
                node = node.rChild;
                return node;
            }
            else if (node.rChild === null) {
                node = node.lChild;
                return node;
            }
            else {
                //用左子树里面最大的节点的替换根节点
                let lChild_maxValue = this.searchMaxNode(node.lChild);
                node.value = lChild_maxValue;
                node.lChild = this.removeNode(node.lChild, lChild_maxValue);
                return node;
            }
        }
    }

    //删除树中值为value的节点
    remove(value) {
        if (this.search(value)) {
            this.root = this.removeNode(this.root, value);
            return true;
        }
        else {
            return false;
        }
    }

    //求以node为根节点的二叉排序树的高度
    getDepthNode(node) {
        if (node === null) {
            return 0;
        }

        let leftDepth = this.getDepthNode(node.lChild);
        let rightDepth = this.getDepthNode(node.rChild);

        return Math.max(leftDepth, rightDepth) + 1;
    }

    //获取二叉排序树的高度
    getDepth() {
        return this.getDepthNode(this.root);
    }

    //先序遍历以node为根节点的二叉排序树
    preOrderTraverseNode(node, fun) {
        fun(node);

        if (node.lChild !== null) {
            this.preOrderTraverseNode(node.lChild, fun);
        }
        if (node.rChild !== null) {
            this.preOrderTraverseNode(node.rChild, fun);
        }
    }

    //先序遍历二叉排序树
    preOrderTraverse(fun, ctx) {
        this.preOrderTraverseNode(this.root, fun);
    }

    //给node结点设置位置
    setPosNode(node, pos, level, depth) {
        node.nodeLevel = level;
        node.nodePos = pos;

        if (node.lChild !== null) {
            this.setPosNode(node.lChild, pos - Math.pow(2, depth - level - 1) / 2, level + 1, depth);
        }
        if (node.rChild !== null) {
            this.setPosNode(node.rChild, pos + Math.pow(2, depth - level - 1) / 2, level + 1, depth);
        }
    }

    //给树中的每一个结点确定位置
    setPos() {
        let depth = this.getDepth();

        this.root.nodeLevel = 0;
        this.root.nodePos = 0;

        if (this.root.lChild !== null) {
            this.setPosNode(this.root.lChild, -Math.pow(2, depth - 1) / 2, 1, depth);
        }
        if (this.root.rChild !== null) {
            this.setPosNode(this.root.rChild, Math.pow(2, depth - 1) / 2, 1, depth);
        }
    }
}