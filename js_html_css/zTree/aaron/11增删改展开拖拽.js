/**
 * Created by Aaron_Lee_I on 2016/9/7.
 */

/*****************************************************  参数设置  **************************************************************/
var setting = {
    view: {
        addHoverDom: addHoverDom,          //用于当鼠标移动到节点上时，显示用户自定义控件，显示隐藏状态同 zTree 内部的编辑、删除按钮
        removeHoverDom: removeHoverDom,    //用于当鼠标移动到节点上时，显示用户自定义控件，显示隐藏状态同 zTree 内部的编辑、删除按钮
        selectedMulti: false
    },
    edit: {
        enable: true,                      //允许编辑
        editNameSelectAll: true,
        showRemoveBtn: showRemoveBtn,       //显示删除图标
        showRenameBtn: showRenameBtn        //显示重命名图标
    },
    callback: {
        beforeRename: beforeRename,
        onRename: onRename,
        beforeRemove: beforeRemove,
        onRemove: onRemove,
        beforeExpand:beforeExpand,
        onDrop:onDrop
    },
    data: {
        simpleData: {
            enable: true                 //允许使用简单json数据
        }
    }
};

/*****************************************************  功能设置  **************************************************************/
/*****************************************************  显示设置  *********************/
var newCount = 1;
function addHoverDom(treeId, treeNode) {
    var sObj = $("#" + treeNode.tId + "_span");
    if (treeNode.editNameFlag || $("#addBtn_"+treeNode.tId).length>0) return;
    var addStr = "<span class='button add' id='addBtn_" + treeNode.tId
        + "' title='add node' onfocus='this.blur();'></span>";
    sObj.after(addStr);
    var btn = $("#addBtn_"+treeNode.tId);
    /***************************************************  增加  *********************/
    if (btn) btn.bind("click", function(){
        alert("add");
        var zTree = $.fn.zTree.getZTreeObj("treeDemo");
        //先使用ajax插入并返回数据   然后插入节点
        if(true){
            zTree.addNodes(treeNode, {id:(100 + newCount), pId:treeNode.id, name:"new node" + (newCount++)});
        }
        return false;
    });
};
function removeHoverDom(treeId, treeNode) {
    $("#addBtn_"+treeNode.tId).unbind().remove();
};
function showRemoveBtn(treeId, treeNode) {
    return !treeNode.isFirstNode;
}
function showRenameBtn(treeId, treeNode) {
    return !treeNode.isLastNode;
}
/*****************************************************  显示设置  *********************/
/*****************************************************  常量设置  *********************/
var log, className = "dark";
var zTree = $.fn.zTree.getZTreeObj("treeDemo");
var temp_treeId =null;
var temp_treeNode =null;
var temp_name =null;
/*****************************************************  常量设置  *********************/
/*****************************************************  删除  *********************/
//两种设计思路
//beforeRemove 中使用confirm  自动触发onRename
//beforeRemove 中使用false    弹出弹框  使用弹框中的确定键触发onRemove
// 推荐   但是图像中的树就要自己手动删除
function beforeRemove(treeId, treeNode) {
    className = (className === "dark" ? "":"dark");
    var zTree = $.fn.zTree.getZTreeObj("treeDemo");
    zTree.selectNode(treeNode);
    //return confirm("确认删除 节点 -- " + treeNode.name + " 吗？");
    temp_treeId = treeId;
    temp_treeNode = treeNode;
    alert("beforeRemove");
    return false;
}
function onRemove(e, treeId, treeNode) {
    alert("onRemove");
}
$("#remove").click(function () {
    //onRemove(null,temp_treeId,temp_treeNode);
    var zTree = $.fn.zTree.getZTreeObj("treeDemo");
    zTree.removeNode(temp_treeNode);
})

/*****************************************************  重命名  *********************/
//思路同上面
function beforeRename(treeId, treeNode, newName, isCancel) {
    alert("beforeRename");
    className = (className === "dark" ? "" : "dark");
    if (newName.length == 0) {
        alert("节点名称不能为空.");
        var zTree = $.fn.zTree.getZTreeObj("treeDemo");
        setTimeout(function () {
            zTree.editName(treeNode)
        }, 10);
        return false;
    }
    // return true;
    temp_treeId = treeId;
    temp_treeNode = treeNode;
    temp_name = treeNode.name;
    return true;
}
function onRename(e, treeId, treeNode, isCancel) {
    //alert("onRename");
}
$("#onRename").click(function () {
    alert(temp_treeNode.id+"/"+temp_name);
    var zTree = $.fn.zTree.getZTreeObj("treeDemo");
    var select = zTree.getNodeByParam("id", temp_treeNode.id, null);
    select.name=temp_name;
    zTree.updateNode(select);
})

/*****************************************************  展开  *********************/

//每次展开都是加载
function beforeExpand(treeId, treeNode) {
    //alert("onExpand");
    var zTree = $.fn.zTree.getZTreeObj("treeDemo");
    zTree.removeChildNodes(treeNode);
    var newNodes = [{name:"newNode1", id:100,isParent:true}, {name:"newNode2",id:101}, {name:"newNode3",id:102}];
    newNodes = zTree.addNodes(treeNode, newNodes);
    return false;
}


/*****************************************************  拖拽  *********************/
// 通过targetNode.id  和 moveType进行判断
function onDrop(event, treeId, treeNodes, targetNode, moveType, isCopy) {
    console.log("onDrop/"+moveType+"/"+targetNode.id+"/"+targetNode.name);

}







/*****************************************************  初始化设置  *********************/
$(document).ready(function(){
    //加载静态数据
    $.fn.zTree.init($("#treeDemo"), setting, zNodesStatic)
});

var zNodesStatic =[
    { id:1, pId:0, name:"父节点1 - 展开", open:true},
    { id:11, pId:1, name:"父节点11 - 折叠"},
    { id:111, pId:11, name:"叶子节点111"},
    { id:112, pId:11, name:"叶子节点112"},
    { id:113, pId:11, name:"叶子节点113"},
    { id:114, pId:11, name:"叶子节点114"},
    { id:12, pId:1, name:"父节点12 - 折叠"},
    { id:121, pId:12, name:"叶子节点121"},
    { id:122, pId:12, name:"叶子节点122"},
    { id:123, pId:12, name:"叶子节点123"},
    { id:124, pId:12, name:"叶子节点124"},
    { id:13, pId:1, name:"父节点13 - 没有子节点", isParent:true},
    { id:2, pId:0, name:"父节点2 - 折叠"},
    { id:21, pId:2, name:"父节点21 - 展开", open:true},
    { id:211, pId:21, name:"叶子节点211"},
    { id:212, pId:21, name:"叶子节点212"},
    { id:213, pId:21, name:"叶子节点213"},
    { id:214, pId:21, name:"叶子节点214"},
    { id:22, pId:2, name:"父节点22 - 折叠"},
    { id:221, pId:22, name:"叶子节点221"},
    { id:222, pId:22, name:"叶子节点222"},
    { id:223, pId:22, name:"叶子节点223"},
    { id:224, pId:22, name:"叶子节点224"},
    { id:23, pId:2, name:"父节点23 - 折叠"},
    { id:231, pId:23, name:"叶子节点231"},
    { id:232, pId:23, name:"叶子节点232"},
    { id:233, pId:23, name:"叶子节点233"},
    { id:234, pId:23, name:"叶子节点234"},
    { id:3, pId:0, name:"父节点3 - 自己的展开测试", isParent:true}
];

