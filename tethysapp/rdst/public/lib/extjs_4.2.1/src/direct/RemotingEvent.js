Ext.define("Ext.direct.RemotingEvent",{extend:"Ext.direct.Event",alias:"direct.rpc",getTransaction:function(){var n=this;return n.transaction||Ext.direct.Manager.getTransaction(n.tid)}})