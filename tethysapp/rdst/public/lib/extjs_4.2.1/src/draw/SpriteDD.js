Ext.define("Ext.draw.SpriteDD",{extend:"Ext.dd.DragSource",constructor:function(n,t){var i=this,r=n.el;i.sprite=n;i.el=r;i.dragData={el:r,sprite:n};i.callParent([r,t]);i.sprite.setStyle("cursor","move")},showFrame:Ext.emptyFn,createFrame:Ext.emptyFn,getDragEl:function(){return this.el},getRegion:function(){var u=this,s=u.el,n,t,f,i,e,r,o;o=u.sprite;r=o.getBBox();try{n=Ext.Element.getXY(s)}catch(h){}return n?(t=n[0],f=t+r.width,i=n[1],e=i+r.height,new Ext.util.Region(i,f,e,t)):null},startDrag:function(n,t){var i=this,r=i.sprite.attr;i.prev=i.sprite.surface.transformToViewBox(n,t)},onDrag:function(n){var t=n.getXY(),i=this,r=i.sprite,u=r.attr,f,e;t=i.sprite.surface.transformToViewBox(t[0],t[1]);f=t[0]-i.prev[0];e=t[1]-i.prev[1];r.setAttributes({translate:{x:u.translation.x+f,y:u.translation.y+e}},!0);i.prev=t},setDragElPos:function(){return!1}})