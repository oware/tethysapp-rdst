Ext.define("Ext.rtl.selection.TreeModel",{override:"Ext.selection.TreeModel",onKeyRight:function(n,t){this.view.getHierarchyState().rtl?this.navCollapse(n,t):this.callParent(arguments)},onKeyLeft:function(n,t){this.view.getHierarchyState().rtl?this.navExpand(n,t):this.callParent(arguments)}})