Ext.define("Ext.diag.layout.Context",{override:"Ext.layout.Context",requires:["Ext.perf.Monitor"],logOn:{0:0},cancelComponent:function(n){this.logOn.cancelComponent&&Ext.log("cancelCmp: ",n.id);this.callParent(arguments)},cancelLayout:function(n){this.logOn.cancelLayout&&Ext.log("cancelLayout: ",this.getLayoutName(n));this.callParent(arguments)},callLayout:function(n){var t=this.accumByType[n.type],i=t&&t.enter();this.callParent(arguments);t&&i.leave()},checkRemainingLayouts:function(){var n=this,i=0,t,r;for(t in n.layouts)r=n.layouts[t],n.layouts.hasOwnProperty(t)&&r.running&&++i;n.remainingLayouts!=i&&Ext.Error.raise({msg:"Bookkeeping error me.remainingLayouts"})},flush:function(){if(this.logOn.flush){var n=this.flushQueue;Ext.log("--- Flush ",n&&n.getCount())}return this.callParent(arguments)},flushInvalidates:function(){this.logOn.flushInvalidate&&Ext.log(">> flushInvalidates");var n=this.callParent(arguments);return this.logOn.flushInvalidate&&Ext.log("<< flushInvalidates"),n},getCmp:function(n){var t=this.callParent(arguments);return t.wrapsComponent||Ext.Error.raise({msg:n.id+" is not a component"}),t},getEl:function(n,t){var i=this.callParent(arguments);return i&&i.wrapsComponent&&Ext.Error.raise({msg:n.id+"/"+t.id+" is a component (expected element)"}),i},getLayoutName:function(n){return n.owner.id+"<"+n.type+">"},layoutDone:function(n){var t=this,i=t.getLayoutName(n);t.logOn.layoutDone&&Ext.log("layoutDone: ",i," ( ",t.remainingLayouts," running)");n.running||Ext.Error.raise({msg:i+" is already done"});t.remainingLayouts||Ext.Error.raise({msg:i+" finished but no layouts are running"});t.callParent(arguments)},layoutTreeHasFailures:function(n,t){function r(n){var f=!n.done,t,u;if(n.done)for(t in i.layouts)i.layouts.hasOwnProperty(t)&&(u=i.layouts[t],u.owner.ownerLayout===n&&r(u)&&(f=!0));return f}function u(n){var r,f;t[n.id]=1;for(r in i.layouts)i.layouts.hasOwnProperty(r)&&(f=i.layouts[r],f.owner.ownerLayout===n&&u(f))}var i=this;return r(n)?!0:(u(n),!1)},queueLayout:function(n){return(n.done||n.blockCount||n.pending)&&Ext.Error.raise({msg:this.getLayoutName(n)+" should not be queued for layout"}),this.logOn.queueLayout&&Ext.log("Queue ",this.getLayoutName(n)),this.callParent(arguments)},reportLayoutResult:function(n,t){var i=this,y=n.owner,u=i.getCmp(y),h=[],c=[],r,o,f,a,e,s,v,l;t[n.id]=1;for(r in n.blockedBy)n.blockedBy.hasOwnProperty(r)&&h.push(n.blockedBy[r]);h.sort();for(r in i.triggersByLayoutId[n.id])i.triggersByLayoutId[n.id].hasOwnProperty(r)&&(o=i.triggersByLayoutId[n.id][r],c.push({name:r,info:o}));if(c.sort(function(n,t){return n.name<t.name?-1:t.name<n.name?1:0}),Ext.log({indent:1},n.done?"++":"--",i.getLayoutName(n),u.isBoxParent?" [isBoxParent]":"",u.boxChildren?" - boxChildren: "+u.state.boxesMeasured+"/"+u.boxChildren.length:"",u.boxParent?" - boxParent: "+u.boxParent.id:""," - size: ",u.widthModel.name,"/",u.heightModel.name),!n.done||i.reportOnSuccess){if(h.length){for(++Ext.log.indent,Ext.log({indent:1},"blockedBy:  count=",n.blockCount),a=h.length,f=0;f<a;f++)Ext.log(h[f]);Ext.log.indent-=2}if(c.length){for(++Ext.log.indent,Ext.log({indent:1},"triggeredBy: count="+n.triggerCount),a=c.length,f=0;f<a;f++)l=o.info||o,s=l.item,v=s.setBy&&s.setBy[l.name]||"?",o=c[f],Ext.log(o.name," (",s.props[l.name],") dirty: ",s.dirty?!!s.dirty[l.name]:!1,", setBy: ",v);Ext.log.indent-=2}}for(r in i.layouts)i.layouts.hasOwnProperty(r)&&(e=i.layouts[r],e.done||e.owner.ownerLayout!==n||i.reportLayoutResult(e,t));for(r in i.layouts)i.layouts.hasOwnProperty(r)&&(e=i.layouts[r],e.done&&e.owner.ownerLayout===n&&i.reportLayoutResult(e,t));--Ext.log.indent},resetLayout:function(n){var t=this,r=n.type,f=t.getLayoutName(n),i=t.accumByType[r],u;t.logOn.resetLayout&&Ext.log("resetLayout: ",f," ( ",t.remainingLayouts," running)");t.state||(!i&&t.profileLayoutsByType&&(t.accumByType[r]=i=Ext.Perf.get("layout_"+n.type)),t.numByType[r]=(t.numByType[r]||0)+1);u=i&&i.enter();t.callParent(arguments);i&&u.leave();t.checkRemainingLayouts()},round:function(n){return Math.round(n*1e3)/1e3},run:function(){var n=this,o,s,t,r,i,h,c,v,f,l,e,a,y,u;if(n.accumByType={},n.calcsByType={},n.numByType={},n.timesByType={},n.triggersByLayoutId={},Ext.log.indentSize=3,Ext.log("==================== LAYOUT ===================="),s=Ext.perf.getTimestamp(),o=n.callParent(arguments),s=Ext.perf.getTimestamp()-s,n.logOn.boxParent&&n.boxParents)for(t in n.boxParents)if(n.boxParents.hasOwnProperty(t))for(h=n.boxParents[t],c=h.boxChildren,v=c.length,Ext.log("boxParent: ",h.id),r=0;r<v;++r)Ext.log(" --> ",c[r].id);o?Ext.log("----------------- SUCCESS -----------------"):Ext.log({level:"error"},"----------------- FAILURE -----------------");for(t in n.layouts)n.layouts.hasOwnProperty(t)&&(i=n.layouts[t],i.running&&Ext.log.error("Layout left running: ",n.getLayoutName(i)),i.ownerContext&&Ext.log.error("Layout left connected: ",n.getLayoutName(i)));if(!o||n.reportOnSuccess){f={};l=0;for(t in n.layouts)n.layouts.hasOwnProperty(t)&&(i=n.layouts[t],n.items[i.owner.el.id].isTopLevel&&(n.reportOnSuccess||n.layoutTreeHasFailures(i,f))&&n.reportLayoutResult(i,f));for(t in n.layouts)n.layouts.hasOwnProperty(t)&&(i=n.layouts[t],f[i.id]||(l||Ext.log("----- Unreported!! -----"),++l,n.reportLayoutResult(i,f)))}Ext.log("Cycles: ",n.cycleCount,", Flushes: ",n.flushCount,", Calculates: ",n.calcCount," in ",n.round(s)," msec");Ext.log("Calculates by type:");e=[];for(t in n.numByType)n.numByType.hasOwnProperty(t)&&(a=n.numByType[t],e.push({type:t,total:a,calcs:n.calcsByType[t],multiple:Math.round(n.calcsByType[t]/a*10)/10,calcTime:n.round(n.timesByType[t]),avgCalcTime:n.round(n.timesByType[t]/n.calcsByType[t])}));for(e.sort(function(n,t){return t.calcTime-n.calcTime}),y=e.length,r=0;r<y;r++)u=e[r],Ext.log(u.type,": ",u.total," in ",u.calcs," tries (",u.multiple,"x) at ",u.calcTime," msec (avg ",u.avgCalcTime," msec)");return o},runCycle:function(){return this.logOn.runCycle&&Ext.log(">>> Cycle ",this.cycleCount," (queue length: ",this.layoutQueue.length,")"),this.callParent(arguments)},runLayout:function(n){var t=this,i=n.type,u=t.accumByType[i],f,e,r;return t.logOn.calculate&&Ext.log("-- calculate ",this.getLayoutName(n)),f=u&&u.enter(),r=Ext.perf.getTimestamp(),e=t.callParent(arguments),r=Ext.perf.getTimestamp()-r,u&&f.leave(),t.calcsByType[i]=(t.calcsByType[i]||0)+1,t.timesByType[i]=(t.timesByType[i]||0)+r,e}})