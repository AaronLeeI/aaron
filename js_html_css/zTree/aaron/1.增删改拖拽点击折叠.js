/**
 * Created by Aaron_Lee_I on 2016/9/7.
 */


var setting = {
    data: {
        simpleData: {
            enable: true                 //允许使用简单json数据
        }
    },
    view: {
        addHoverDom: addHoverDom,           //设置鼠标过来的回调
        removeHoverDom: removeHoverDom,     //设置鼠标移开回调
        selectedMulti: false              //不允许多选
    },
    edit: {
        enable: true,                     //允许编辑
        editNameSelectAll: true,
        showRemoveBtn: showRemoveBtn,       //显示删除图标
        showRenameBtn: showRenameBtn        //显示重命名图标
    },
    /**回调函数*/
    callback: {
        onClick: onClick
        ,beforeExpand:beforeExpand
        ,beforeRemove: beforeRemove
        ,beforeEditName: beforeEditName
        ,beforeDrop: beforeDrop
        ,onNodeCreated:onNodeCreated
        //,onDrop: onDrop
    }
};

/****回调函数区域*****/
    //点击和展开
        function onClick(event, treeId, treeNode, clickFlag) {
            console.log("onClick" + treeId +treeNode.name+"/"+treeNode.id+"/"+treeNode.pId);
        }
        function beforeExpand(treeId, treeNode) {
            console.log("beforeExpand" + treeId +treeNode.name+"/"+treeNode.id+"/"+treeNode.pId);
            return (treeNode.expand !== false);
        }

    //编辑功能-删除-重命名--新增
    //样式
        var newCount = 1;
        function addHoverDom(treeId, treeNode) {
            var sObj = $("#" + treeNode.tId + "_span");
            if (treeNode.editNameFlag || $("#addBtn_"+treeNode.tId).length>0) return;
            var addStr = "<span class='button add' id='addBtn_" + treeNode.tId
                + "' title='add node' onfocus='this.blur();'></span>";
            sObj.after(addStr);
            var btn = $("#addBtn_"+treeNode.tId);
            if (btn) btn.bind("click", function(){
                var zTree = $.fn.zTree.getZTreeObj("treeDemo");
                zTree.addNodes(treeNode, {id:(100 + newCount), pId:treeNode.id, name:"new node" + (newCount++)});
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
    //功能
        var log, className = "dark";
        function beforeRemove(treeId, treeNode) {
            console.log("beforeRemove");
            className = (className === "dark" ? "":"dark");
            var zTree = $.fn.zTree.getZTreeObj("treeDemo");
            zTree.selectNode(treeNode);
            return confirm("确认删除 节点 -- " + treeNode.name + " 吗？");
        }
        function beforeEditName(treeId, treeNode) {
            className = (className === "dark" ? "":"dark");
            var zTree = $.fn.zTree.getZTreeObj("treeDemo");
            zTree.selectNode(treeNode);
            return confirm("进入节点 -- " + treeNode.name + " 的编辑状态吗？");
        }
        function onNodeCreated(treeId, treeNode) {
            className = (className === "dark" ? "":"dark");
            var zTree = $.fn.zTree.getZTreeObj("treeDemo");
            zTree.selectNode(treeNode);
            return confirm("进入节点 -- " + treeNode.name + " 的新增状态吗？");
        }

    //拖拽功能
    function beforeDrop(treeId, treeNodes, targetNode, moveType) {
        console.log("beforeDrop"+"/目标"+targetNode.id+"/目标父"+targetNode.pId);
        console.log("beforeDrop"+"/源"+treeNodes.id+"/源父"+treeNodes.pId);
        return targetNode ? targetNode.drop !== false : true;
    }
    function onDrop(treeId, treeNodes, targetNode, moveType) {
        console.log("onDrop"+targetNode.id+"/目标父"+targetNode.pId);
        return targetNode ? targetNode.drop !== false : true;
    }


    function selectAll() {
        var zTree = $.fn.zTree.getZTreeObj("treeDemo");
        zTree.setting.edit.editNameSelectAll =  $("#selectAll").attr("checked");
    }
    $("#selectAll").bind("click", selectAll);
$(document).ready(function(){
    $.fn.zTree.init($("#treeDemo"), setting, zNodes);
});

var zNodes =[
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
    { id:3, pId:0, name:"父节点3 - 没有子节点", isParent:true}
];

