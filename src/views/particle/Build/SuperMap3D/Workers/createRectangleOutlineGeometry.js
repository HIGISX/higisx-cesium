define(["./when-92c6cf3c","./Cartesian2-b72655a5","./arrayFill-0358accf","./buildModuleUrl-9eef8841","./Cartesian3-3a8bdb0b","./Cartographic-a2c313d7","./ComponentDatatype-98414d16","./Check-52a7d806","./GeometryAttribute-f47bd1cb","./GeometryAttributes-7f66ea53","./GeometryOffsetAttribute-b4d599f5","./IndexDatatype-86677ec4","./Math-ecf82623","./PolygonPipeline-425528b3","./FeatureDetection-cec0163f","./RectangleGeometryLibrary-4696cd68","./Event-3390cd7d","./RuntimeError-c6a62a80","./WebGLConstants-42651efd","./Cartesian4-72b88c9e","./EllipsoidRhumbLine-b1a766ae"],(function(e,t,i,r,a,n,o,s,u,l,c,h,p,d,f,g,_,b,v,y,m){"use strict";var w=new r.i,A=new r.i,E=new a.o,x=new t.h;function D(e,t){var i=e._ellipsoid,r=t.height,a=t.width,n=t.northCap,s=t.southCap,c=r,p=2,d=0,_=4;n&&(p-=1,c-=1,d+=1,_-=2),s&&(p-=1,c-=1,d+=1,_-=2),d+=p*a+2*c-_;var b,v=new Float64Array(3*d),y=0,m=0,w=E;if(n)g.j.computePosition(t,i,!1,m,0,w),v[y++]=w.x,v[y++]=w.y,v[y++]=w.z;else for(b=0;b<a;b++)g.j.computePosition(t,i,!1,m,b,w),v[y++]=w.x,v[y++]=w.y,v[y++]=w.z;for(b=a-1,m=1;m<r;m++)g.j.computePosition(t,i,!1,m,b,w),v[y++]=w.x,v[y++]=w.y,v[y++]=w.z;if(m=r-1,!s)for(b=a-2;b>=0;b--)g.j.computePosition(t,i,!1,m,b,w),v[y++]=w.x,v[y++]=w.y,v[y++]=w.z;for(b=0,m=r-2;m>0;m--)g.j.computePosition(t,i,!1,m,b,w),v[y++]=w.x,v[y++]=w.y,v[y++]=w.z;for(var A=v.length/3*2,x=h.IndexDatatype.createTypedArray(v.length/3,A),D=0,H=0;H<v.length/3-1;H++)x[D++]=H,x[D++]=H+1;x[D++]=v.length/3-1,x[D++]=0;var P=new u.I({attributes:new l.a,primitiveType:f._0x4b6a27.LINES});return P.attributes.position=new u.o({componentDatatype:o.ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:v}),P.indices=x,P}function H(i){var r=(i=e.u(i,e.u.EMPTY_OBJECT)).rectangle,a=e.u(i.granularity,p.e.RADIANS_PER_DEGREE),n=e.u(i.ellipsoid,t.t.WGS84),o=e.u(i.rotation,0);if(!e.e(r))throw new s.t("rectangle is required.");if(t.h.validate(r),r.north<r.south)throw new s.t("options.rectangle.north must be greater than options.rectangle.south");var u=e.u(i.height,0),l=e.u(i.extrudedHeight,u);this._rectangle=t.h.clone(r),this._granularity=a,this._ellipsoid=n,this._surfaceHeight=Math.max(u,l),this._rotation=o,this._extrudedHeight=Math.min(u,l),this._offsetAttribute=i.offsetAttribute,this._workerName="createRectangleOutlineGeometry"}H.packedLength=t.h.packedLength+t.t.packedLength+5,H.pack=function(i,r,a){if(!e.e(i))throw new s.t("value is required");if(!e.e(r))throw new s.t("array is required");return a=e.u(a,0),t.h.pack(i._rectangle,r,a),a+=t.h.packedLength,t.t.pack(i._ellipsoid,r,a),a+=t.t.packedLength,r[a++]=i._granularity,r[a++]=i._surfaceHeight,r[a++]=i._rotation,r[a++]=i._extrudedHeight,r[a]=e.u(i._offsetAttribute,-1),r};var P=new t.h,k=t.t.clone(t.t.UNIT_SPHERE),L={rectangle:P,ellipsoid:k,granularity:void 0,height:void 0,rotation:void 0,extrudedHeight:void 0,offsetAttribute:void 0};H.unpack=function(i,r,a){if(!e.e(i))throw new s.t("array is required");r=e.u(r,0);var n=t.h.unpack(i,r,P);r+=t.h.packedLength;var o=t.t.unpack(i,r,k);r+=t.t.packedLength;var u=i[r++],l=i[r++],c=i[r++],h=i[r++],p=i[r];return e.e(a)?(a._rectangle=t.h.clone(n,a._rectangle),a._ellipsoid=t.t.clone(o,a._ellipsoid),a._surfaceHeight=l,a._rotation=c,a._extrudedHeight=h,a._offsetAttribute=-1===p?void 0:p,a):(L.granularity=u,L.height=l,L.rotation=c,L.extrudedHeight=h,L.offsetAttribute=-1===p?void 0:p,new H(L))};var N=new n.a;return H.createGeometry=function(t){var a,n,s=t._rectangle,l=t._ellipsoid,_=g.j.computeOptions(s,t._granularity,t._rotation,0,x,N);if(!p.e.equalsEpsilon(s.north,s.south,p.e.EPSILON10)&&!p.e.equalsEpsilon(s.east,s.west,p.e.EPSILON10)){var b,v=t._surfaceHeight,y=t._extrudedHeight;if(!p.e.equalsEpsilon(v,y,0,p.e.EPSILON2)){if(a=function(e,t){var i=e._surfaceHeight,r=e._extrudedHeight,a=e._ellipsoid,n=r,o=i,s=D(e,t),u=t.height,l=t.width,c=d.A.scaleToGeodeticHeight(s.attributes.position.values,o,a,!1),p=c.length,f=new Float64Array(2*p);f.set(c);var g=d.A.scaleToGeodeticHeight(s.attributes.position.values,n,a);f.set(g,p),s.attributes.position.values=f;var _=t.northCap,b=t.southCap,v=4;_&&(v-=1),b&&(v-=1);var y,m=2*(f.length/3+v),w=h.IndexDatatype.createTypedArray(f.length/3,m);p=f.length/6;for(var A=0,E=0;E<p-1;E++)w[A++]=E,w[A++]=E+1,w[A++]=E+p,w[A++]=E+p+1;if(w[A++]=p-1,w[A++]=0,w[A++]=p+p-1,w[A++]=p,w[A++]=0,w[A++]=p,_)y=u-1;else{var x=l-1;w[A++]=x,w[A++]=x+p,y=l+u-2}if(w[A++]=y,w[A++]=y+p,!b){var H=l+y-1;w[A++]=H,w[A]=H+p}return s.indices=w,s}(t,_),e.e(t._offsetAttribute)){var m=a.attributes.position.values.length/3,E=new Uint8Array(m);t._offsetAttribute===c.z.TOP?E=i.d(E,1,0,m/2):(b=t._offsetAttribute===c.z.NONE?0:1,E=i.d(E,b)),a.attributes.applyOffset=new u.o({componentDatatype:o.ComponentDatatype.UNSIGNED_BYTE,componentsPerAttribute:1,values:E})}var H=r.i.fromRectangle3D(s,l,v,A),P=r.i.fromRectangle3D(s,l,y,w);n=r.i.union(H,P)}else{if((a=D(t,_)).attributes.position.values=d.A.scaleToGeodeticHeight(a.attributes.position.values,v,l,!1),e.e(t._offsetAttribute)){var k=a.attributes.position.values.length,L=new Uint8Array(k/3);b=t._offsetAttribute===c.z.NONE?0:1,i.d(L,b),a.attributes.applyOffset=new u.o({componentDatatype:o.ComponentDatatype.UNSIGNED_BYTE,componentsPerAttribute:1,values:L})}n=r.i.fromRectangle3D(s,l,v)}return new u.I({attributes:a.attributes,indices:a.indices,primitiveType:f._0x4b6a27.LINES,boundingSphere:n,offsetAttribute:t._offsetAttribute})}},function(i,r){return e.e(r)&&(i=H.unpack(i,r)),i._ellipsoid=t.t.clone(i._ellipsoid),i._rectangle=t.h.clone(i._rectangle),H.createGeometry(i)}}));