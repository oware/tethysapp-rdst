Ext.define("Ext.chart.axis.Axis",{extend:"Ext.chart.axis.Abstract",alternateClassName:"Ext.chart.Axis",requires:["Ext.draw.Draw"],hidden:!1,forceMinMax:!1,dashSize:3,position:"bottom",skipFirst:!1,length:0,width:0,adjustEnd:!0,majorTickSteps:!1,nullGutters:{lower:0,upper:0,verticalAxis:undefined},applyData:Ext.emptyFn,getRange:function(){var e=this,nt=e.chart,ut=nt.getChartStore(),tt=ut.data.items,u=nt.series.items,k=e.position,l,a=Ext.chart.series,h=[],i=Infinity,r=-Infinity,v=e.position==="left"||e.position==="right"||e.position==="radial",n,y,d,t,o,ft=tt.length,p,it={},c={},w=!0,f,g,rt,b,s;for(f=e.fields,t=0,y=f.length;t<y;t++)c[f[t]]=!0;for(n=0,y=u.length;n<y;n++)if(!u[n].seriesIsHidden&&u[n].getAxesForXAndYFields&&(l=u[n].getAxesForXAndYFields(),!l.xAxis||l.xAxis===k||!l.yAxis||l.yAxis===k)){if(f=a.Bar&&u[n]instanceof a.Bar&&!u[n].column?v?Ext.Array.from(u[n].xField):Ext.Array.from(u[n].yField):v?Ext.Array.from(u[n].yField):Ext.Array.from(u[n].xField),e.fields.length){for(t=0,d=f.length;t<d;t++)if(c[f[t]])break;if(t==d)continue}if((p=u[n].stacked)&&(a.Bar&&u[n]instanceof a.Bar?u[n].column!=v&&(p=!1,w=!1):v||(p=!1,w=!1)),p){for(g={},t=0;t<f.length;t++)w&&u[n].__excludes&&u[n].__excludes[t]||(c[f[t]]||Ext.Logger.warn("Field `"+f[t]+"` is not included in the "+k+" axis config."),c[f[t]]=g[f[t]]=!0);h.push({fields:g,positiveValue:0,negativeValue:0})}else for(f&&f.length!=0||(f=e.fields),t=0;t<f.length;t++)w&&u[n].__excludes&&u[n].__excludes[t]||(c[f[t]]=it[f[t]]=!0)}for(n=0;n<ft;n++){for(rt=tt[n],o=0;o<h.length;o++)h[o].positiveValue=0,h[o].negativeValue=0;for(b in c)if(s=rt.get(b),e.type=="Time"&&typeof s=="string"&&(s=Date.parse(s)),!isNaN(s))for(s=s===undefined?0:Number(s),it[b]&&(i>s&&(i=s),r<s&&(r=s)),o=0;o<h.length;o++)h[o].fields[b]&&(s>=0?(h[o].positiveValue+=s,r<h[o].positiveValue&&(r=h[o].positiveValue),i>0&&(i=0)):(h[o].negativeValue+=s,i>h[o].negativeValue&&(i=h[o].negativeValue),r<0&&(r=0)))}return isFinite(r)||(r=e.prevMax||0),isFinite(i)||(i=e.prevMin||0),typeof i=="number"&&(i=Ext.Number.correctFloat(i)),typeof r=="number"&&(r=Ext.Number.correctFloat(r)),i!=r&&(r!=Math.floor(r)||i!=Math.floor(i))&&(i=Math.floor(i),r=Math.floor(r)+1),isNaN(e.minimum)||(i=e.minimum),isNaN(e.maximum)||(r=e.maximum),i>=r&&(i=Math.floor(i),r=i+1),{min:i,max:r}},calcEnds:function(){var n=this,f=n.getRange(),r=f.min,u=f.max,e,o,t,i;return e=Ext.isNumber(n.majorTickSteps)?n.majorTickSteps+1:n.steps,o=!(Ext.isNumber(n.maximum)&&Ext.isNumber(n.minimum)&&Ext.isNumber(n.majorTickSteps)&&n.majorTickSteps>0),t=Ext.draw.Draw.snapEnds(r,u,e,o),Ext.isNumber(n.maximum)&&(t.to=n.maximum,i=!0),Ext.isNumber(n.minimum)&&(t.from=n.minimum,i=!0),n.adjustMaximumByMajorUnit&&(t.to=Math.ceil(t.to/t.step)*t.step,i=!0),n.adjustMinimumByMajorUnit&&(t.from=Math.floor(t.from/t.step)*t.step,i=!0),i&&(t.steps=Math.ceil((t.to-t.from)/t.step)),n.prevMin=r==u?0:r,n.prevMax=u,t},drawAxis:function(n){var t=this,s,b=t.x,k=t.y,wt=t.dashSize,d=t.length,a=t.position,y=a=="left"||a=="right",ut=[],ft=t.isNumericAxis,g=t.applyData(),et=g.step,i=g.steps,ot=Ext.isArray(i),st=g.from,ht=g.to,nt=ht-st||1,v,f,e,h,at=t.minorTickSteps||0,vt=t.minorTickSteps||0,kt=Math.max(at+1,0),dt=Math.max(vt+1,0),bt=a=="left"||a=="top"?-1:1,tt=wt*bt,c=t.chart.series.items,yt=c[0],u=yt?yt.nullGutters:t.nullGutters,p,o,l,it=0,r,w,pt,rt,ct,lt;if((t.from=st,t.to=ht,!t.hidden&&!(st>ht))&&(!ot||i.length!=0)&&(ot||!isNaN(et))){if(ot)i=Ext.Array.filter(i,function(n){return+n>+t.from&&+n<+t.to},this),i=Ext.Array.union([t.from],i,[t.to]);else{for(i=[],rt=+t.from;rt<+t.to;rt+=et)i.push(rt);i.push(+t.to)}for(it=i.length,s=0,pt=c.length;s<pt;s++)if(!c[s].seriesIsHidden&&c[s].getAxesForXAndYFields&&(w=c[s].getAxesForXAndYFields(),!w.xAxis||!w.yAxis||w.xAxis===a||w.yAxis===a)){u=c[s].getGutters();u.verticalAxis!==undefined&&u.verticalAxis!=y&&(p=c[s].getPadding(),u=y?{lower:p.bottom,upper:p.top,verticalAxis:!0}:{lower:p.left,upper:p.right,verticalAxis:!1});break}if(ft&&(t.labels=[]),u)if(y)for(f=Math.floor(b),h=["M",f+.5,k,"l",0,-d],v=d-(u.lower+u.upper),r=0;r<it;r++)e=k-u.lower-(i[r]-i[0])*v/nt,h.push("M",f,Math.floor(e)+.5,"l",tt*2,0),ut.push([f,Math.floor(e)]),ft&&t.labels.push(i[r]);else for(e=Math.floor(k),h=["M",b,e+.5,"l",d,0],v=d-(u.lower+u.upper),r=0;r<it;r++)f=b+u.lower+(i[r]-i[0])*v/nt,h.push("M",Math.floor(f)+.5,e,"l",0,tt*2+1),ut.push([Math.floor(f),e]),ft&&t.labels.push(i[r]);if(o=y?vt:at,Ext.isArray(o)?l=o.length==2?+Ext.Date.add(new Date,o[0],o[1])-Date.now():o[0]:Ext.isNumber(o)&&o>0&&(l=et/(o+1)),u&&l)for(r=0;r<it-1;r++)if(ct=+i[r],lt=+i[r+1],y)for(value=ct+l;value<lt;value+=l)e=k-u.lower-(value-i[0])*v/nt,h.push("M",f,Math.floor(e)+.5,"l",tt,0);else for(value=ct+l;value<lt;value+=l)f=b+u.upper+(value-i[0])*v/nt,h.push("M",Math.floor(f)+.5,e,"l",0,tt+1);t.axis||(t.axis=t.chart.surface.add(Ext.apply({type:"path",path:h},t.axisStyle)));t.axis.setAttributes({path:h},!0);t.inflections=ut;!n&&t.grid&&t.drawGrid();t.axisBBox=t.axis.getBBox();t.drawLabel()}},drawGrid:function(){var i=this,p=i.chart.surface,w=i.grid,s=w.odd,h=w.even,v=i.inflections,b=v.length-(s||h?0:1),e=i.position,l=i.chart.maxGutters,f=i.width-2,t,r,o=1,u=[],y,n,k,c=[],a=[];for(((l.bottom!==0||l.top!==0)&&(e=="left"||e=="right")||(l.left!==0||l.right!==0)&&(e=="top"||e=="bottom"))&&(o=0,b++);o<b;o++)t=v[o],r=v[o-1],s||h?(u=o%2?c:a,y=(o%2?s:h)||{},n=(y.lineWidth||y["stroke-width"]||0)/2,k=2*n,e=="left"?u.push("M",r[0]+1+n,r[1]+.5-n,"L",r[0]+1+f-n,r[1]+.5-n,"L",t[0]+1+f-n,t[1]+.5+n,"L",t[0]+1+n,t[1]+.5+n,"Z"):e=="right"?u.push("M",r[0]-n,r[1]+.5-n,"L",r[0]-f+n,r[1]+.5-n,"L",t[0]-f+n,t[1]+.5+n,"L",t[0]-n,t[1]+.5+n,"Z"):e=="top"?u.push("M",r[0]+.5+n,r[1]+1+n,"L",r[0]+.5+n,r[1]+1+f-n,"L",t[0]+.5-n,t[1]+1+f-n,"L",t[0]+.5-n,t[1]+1+n,"Z"):u.push("M",r[0]+.5+n,r[1]-n,"L",r[0]+.5+n,r[1]-f+n,"L",t[0]+.5-n,t[1]-f+n,"L",t[0]+.5-n,t[1]-n,"Z")):u=e=="left"?u.concat(["M",t[0]+.5,t[1]+.5,"l",f,0]):e=="right"?u.concat(["M",t[0]-.5,t[1]+.5,"l",-f,0]):e=="top"?u.concat(["M",t[0]+.5,t[1]+.5,"l",0,f]):u.concat(["M",t[0]+.5,t[1]-.5,"l",0,-f]);s||h?(c.length&&(!i.gridOdd&&c.length&&(i.gridOdd=p.add({type:"path",path:c})),i.gridOdd.setAttributes(Ext.apply({path:c,hidden:!1},s||{}),!0)),a.length&&(i.gridEven||(i.gridEven=p.add({type:"path",path:a})),i.gridEven.setAttributes(Ext.apply({path:a,hidden:!1},h||{}),!0))):u.length?(i.gridLines||(i.gridLines=i.chart.surface.add({type:"path",path:u,"stroke-width":i.lineWidth||1,stroke:i.gridColor||"#ccc"})),i.gridLines.setAttributes({hidden:!1,path:u},!0)):i.gridLines&&i.gridLines.hide(!0)},getOrCreateLabel:function(n,t){var r=this,u=r.labelGroup,i=u.getAt(n),f=r.chart.surface;return i?t!=i.attr.text&&(i.setAttributes(Ext.apply({text:t},r.label),!0),i._bbox=i.getBBox()):(i=f.add(Ext.apply({group:u,type:"text",x:0,y:0,text:t},r.label)),f.renderItem(i),i._bbox=i.getBBox()),r.label.rotation?(i.setAttributes({rotation:{degrees:0}},!0),i._ubbox=i.getBBox(),i.setAttributes(r.label,!0)):i._ubbox=i._bbox,i},rect2pointArray:function(n){var l=this.chart.surface,i=l.getBBox(n,!0),r=[i.x,i.y],o=r.slice(),u=[i.x+i.width,i.y],s=u.slice(),f=[i.x+i.width,i.y+i.height],h=f.slice(),e=[i.x,i.y+i.height],c=e.slice(),t=n.matrix;return r[0]=t.x.apply(t,o),r[1]=t.y.apply(t,o),u[0]=t.x.apply(t,s),u[1]=t.y.apply(t,s),f[0]=t.x.apply(t,h),f[1]=t.y.apply(t,h),e[0]=t.x.apply(t,c),e[1]=t.y.apply(t,c),[r,u,f,e]},intersect:function(n,t){var i=this.rect2pointArray(n),r=this.rect2pointArray(t);return!!Ext.draw.Draw.intersect(i,r).length},drawHorizontalLabels:function(){var n=this,c=n.label,g=Math.floor,nt=Math.max,l=n.chart.axes,tt=n.chart.insetPadding,a=n.chart.maxGutters,it=n.position,e=n.inflections,v=e.length,y=n.labels,o=0,p,i,r,s,w,rt=n.adjustEnd,ut=l.findIndex("position","left")!=-1,ft=l.findIndex("position","right")!=-1,u,b,h,f,k,t,d;for(h=v-1,r=e[0],d=n.getOrCreateLabel(0,n.label.renderer(y[0])),p=Math.floor(Math.abs(Math.sin(c.rotate&&c.rotate.degrees*Math.PI/180||0))),t=0;t<v;t++){if(r=e[t],b=n.label.renderer(y[t]),u=n.getOrCreateLabel(t,b),i=u._bbox,o=nt(o,i.height+n.dashSize+n.label.padding),f=g(r[0]-(p?i.height:i.width)/2),rt&&a.left==0&&a.right==0&&(t!=0||ut?t!=h||ft||(f=Math.min(f,r[0]-i.width+tt)):f=r[0]),k=it=="top"?r[1]-n.dashSize*2-n.label.padding-i.height/2:r[1]+n.dashSize*2+n.label.padding+i.height/2,u.setAttributes({hidden:!1,x:f,y:k},!0),t!=0&&(n.intersect(u,s)||n.intersect(u,d)))if(t===h&&w!==0)s.hide(!0);else{u.hide(!0);continue}s=u;w=t}return o},drawVerticalLabels:function(){for(var n=this,h=n.inflections,w=n.position,c=h.length,b=n.chart,k=b.insetPadding,d=n.labels,e=0,g=Math.max,nt=Math.floor,tt=Math.ceil,l=n.chart.axes,o=n.chart.maxGutters,i,f,s,a,it=l.findIndex("position","top")!=-1,rt=l.findIndex("position","bottom")!=-1,ut=n.adjustEnd,r,v,y=c-1,p,u,t=0;t<c;t++){if(f=h[t],v=n.label.renderer(d[t]),r=n.getOrCreateLabel(t,v),i=r._bbox,e=g(e,i.width+n.dashSize+n.label.padding),u=f[1],ut&&o.bottom+o.top<i.height/2&&(t!=y||it?t!=0||rt||(u=n.y+o.bottom-nt(i.height/2)):u=Math.max(u,n.y-n.length+tt(i.height/2)-k)),p=w=="left"?f[0]-i.width-n.dashSize-n.label.padding-2:f[0]+n.dashSize+n.label.padding+2,r.setAttributes(Ext.apply({hidden:!1,x:p,y:u},n.label),!0),t!=0&&n.intersect(r,s))if(t===y&&a!==0)s.hide(!0);else{r.hide(!0);continue}s=r;a=t}return e},drawLabel:function(){var n=this,u=n.position,f=n.labelGroup,o=n.inflections,i=0,r=0,e,t;for(u=="left"||u=="right"?i=n.drawVerticalLabels():r=n.drawHorizontalLabels(),e=f.getCount(),t=o.length;t<e;t++)f.getAt(t).hide(!0);n.bbox={};Ext.apply(n.bbox,n.axisBBox);n.bbox.height=r;n.bbox.width=i;Ext.isString(n.title)&&n.drawTitle(i,r)},setTitle:function(n){this.title=n;this.drawLabel()},drawTitle:function(n,t){var i=this,e=i.position,h=i.chart.surface,u=i.displaySprite,c=i.title,a=e=="left"||e=="right",o=i.x,s=i.y,l,r,f;u?u.setAttributes({text:c},!0):(l={type:"text",x:0,y:0,text:c},u=i.displaySprite=h.add(Ext.apply(l,i.axisTitleStyle,i.labelTitle)),h.renderItem(u));r=u.getBBox();f=i.dashSize+i.label.padding;a?(s-=i.length/2-r.height/2,e=="left"?o-=n+f+r.width/2:o+=n+f+r.width-r.width/2,i.bbox.width+=r.width+10):(o+=i.length/2-r.width*.5,e=="top"?s-=t+f+r.height*.3:s+=t+f+r.height*.8,i.bbox.height+=r.height+10);u.setAttributes({translate:{x:o,y:s}},!0)}})