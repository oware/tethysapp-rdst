Ext.define("Ext.rtl.tip.QuickTipManager",{override:"Ext.tip.QuickTipManager",init:function(){var n=this;n.callParent(arguments);n.tip.on("beforeshow",n.onBeforeFirstShow,n,{single:!0})},onBeforeFirstShow:function(n){n._isOffsetParentRtl=undefined}})