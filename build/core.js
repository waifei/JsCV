/*! JsCV JavaScript Library Module core v0.2.0pre Copyright © 2012 WhiteSnow 2013-04-08 */
function CV_8I(r,e,a,t){this.buffer=t||new ArrayBuffer(r*e*a),this.bytes=1,this.data=new Int8Array(this.buffer),this.type="CV_8I"}function CV_8U(r,e,a,t){this.buffer=t||new ArrayBuffer(r*e*a),this.bytes=1,this.data=new Uint8Array(this.buffer),this.type="CV_8U"}function CV_RGBA(r,e,a,t){this.channel=4,this.buffer=t||new ArrayBuffer(4*r*e),this.bytes=1,this.data=new Uint8ClampedArray(this.buffer),a&&this.data.set(a),this.type="CV_RGBA"}function CV_GRAY(r,e,a,t){this.channel=1,this.buffer=t||new ArrayBuffer(r*e),this.bytes=1,this.data=new Uint8ClampedArray(this.buffer),a&&this.data.set(a),this.type="CV_GRAY"}function CV_16I(r,e,a,t){this.buffer=t||new ArrayBuffer(2*r*e*a),this.bytes=2,this.data=new Int16Array(this.buffer),this.type="CV_16I"}function CV_16U(r,e,a,t){this.buffer=t||new ArrayBuffer(2*r*e*a),this.bytes=2,this.data=new Uint16Array(this.buffer),this.type="CV_16U"}function CV_32I(r,e,a,t){this.buffer=t||new ArrayBuffer(4*r*e*a),this.bytes=4,this.data=new Int32Array(this.buffer),this.type="CV_32I"}function CV_32U(r,e,a,t){this.buffer=t||new ArrayBuffer(4*r*e*a),this.bytes=4,this.data=new Uint32Array(this.buffer),this.type="CV_32U"}function CV_32F(r,e,a,t){this.buffer=t||new ArrayBuffer(4*r*e*a),this.bytes=4,this.data=new Float32Array(this.buffer),this.type="CV_32F"}function CV_64F(r,e,a,t){this.buffer=t||new ArrayBuffer(8*r*e*a),this.bytes=8,this.data=new Float64Array(this.buffer),this.type="CV_64F"}var CV_RGBA2GRAY=1,CV_GRAY2RGBA=2,CV_RGBA2GRAY_DUFF=3,CV_BORDER_REPLICATE=1,CV_BORDER_REFLECT=2,CV_BORDER_REFLECT_101=3,CV_BORDER_WRAP=4,CV_BORDER_CONSTANT=5,CV_THRESH_BINARY=function(r,e,a){return r>e?a:0},CV_THRESH_BINARY_INV=function(r,e,a){return r>e?0:a},CV_THRESH_TRUNC=function(r,e){return r>e?e:0},CV_THRESH_TOZERO=function(r,e){return r>e?r:0},CV_THRESH_TOZERO_INV=function(r,e){return r>e?0:r};(function(__host){function iResize(r,e){iCanvas.width=r,iCanvas.height=e}function JsCV_ERROR(r,e,a){this.funciton=""+r,this.line=a,this.module_verision=JsCV_MODULE_VERSION,this.module=JsCV_MODULE,this.error="[JsCV_ERROR] "+e}function log(r){JsCV_LOG_ON&&console.log("[JsCV_LOG] "+r)}function error(r,e,a){JsCV_ERROR_ON&&console.dir(new JsCV_ERROR(r,e,a))}function RGBA2ImageData(r){r||error(arguments.callee,IS_UNDEFINED_OR_NULL,539),"CV_GRAY"===r.type&&(r=cvtColor(r,CV_GRAY2RGBA));var e=r.col,a=r.row,t=iCtx.createImageData(e,a);return t.data.set(r.data),t}function borderInterpolate(r,e,a){if(0>r||r>=e)switch(a){case CV_BORDER_REPLICATE:r=0>r?0:e-1;break;case CV_BORDER_REFLECT:case CV_BORDER_REFLECT_101:var t=a==CV_BORDER_REFLECT_101;if(1==e)return 0;do r=0>r?-r-1+t:e-1-(r-e)-t;while(0>r||r>=e);break;case CV_BORDER_WRAP:0>r&&(r-=(0|(r-e+1)/e)*e),r>=e&&(r%=e);break;case CV_BORDER_CONSTANT:r=-1;default:error(arguments.callee,UNSPPORT_BORDER_TYPE,836)}return r}function copyMakeBorder_8U(r,e,a,t,n,o){var s,c,l,i=r.col,f=r.row,u=r.channel,_=e,h=a||e,R=n||h,d=t||_;-1===_&&(_=0),-1===h&&(h=0),-1===R&&(R=0),-1===d&&(d=0);var y,A,C,p=i+h+R,v=f+_+d,w=o||CV_BORDER_REFLECT,E=new ArrayBuffer(v*p*u);for(y=new Uint32Array((h+R)*u),s=h;s--;)for(c=borderInterpolate(s-h,i,w)*u,l=u;l--;)y[s*u+l]=c+l;for(s=R;s--;)for(c=borderInterpolate(i+s,i,w)*u,l=u;l--;)y[(s+h)*u+l]=c+l;A=Uint8Array,C=u,h*=C,R*=C;var N,U,V=p*C,I=i*C;for(s=0;f>s;s++){for(N=new A(E,(s+_)*p*u,V),U=new A(r.buffer,s*i*u,I),c=0;h>c;c++)N[c]=U[y[c]];for(c=0;R>c;c++)N[c+I+h]=U[y[c+h]];N.set(U,h)}var D=new A(E);for(s=0;_>s;s++)c=borderInterpolate(s-_,f,w),N=new A(E,s*p*u,V),N.set(D.subarray((c+_)*V,(c+_+1)*V));for(s=0;d>s;s++)c=borderInterpolate(s+f,f,w),N=new A(E,(s+_+f)*p*u,V),N.set(D.subarray((c+_)*V,(c+_+1)*V));return new Mat(v,p,r.depth(),null,E)}function copyMakeConstBorder_8U(r,e,a,t,n,o){var s,c,l=r.col,i=r.row,f=r.channel,u=e,_=a||e,h=n||_,R=t||u;-1===u&&(u=0),-1===_&&(_=0),-1===h&&(h=0),-1===R&&(R=0);var d=l+_+h,y=i+u+R,A=o||[0,0,0,255],C=new ArrayBuffer(d*f),p=new Uint8Array(C),v=new ArrayBuffer(y*d*f);for(s=0;d>s;s++)for(c=0;f>c;c++)p[s*f+c]=A[c];var w,E;4===f?(w=Uint32Array,E=1):(w=Uint8Array,E=f),p=new w(C);var N,U=E*_,V=E*h,I=E*l,D=E*d;for(s=0;i>s;s++)N=new w(v,(s+u)*d*f,U),N.set(p.subarray(0,U)),N=new w(v,((s+u+1)*d-h)*f,V),N.set(p.subarray(0,V)),N=new w(v,((s+u)*d+_)*f,I),N.set(new w(r.buffer,s*l*f,I));for(s=0;u>s;s++)N=new w(v,s*d*f,D),N.set(p);for(s=0;R>s;s++)N=new w(v,(s+u+i)*d*f,D),N.set(p);return new Mat(y,d,r.depth(),null,v)}function getGaussianKernel(r,e){var a,t,n,o=7,s=[[1],[.25,.5,.25],[.0625,.25,.375,.25,.0625],[.03125,.109375,.21875,.28125,.21875,.109375,.03125]],c=true&r&&o>=r&&0>=e?s[r>>1]:0,l=e>0?e:.3*(.5*(r-1)-1)+.8,i=-.5/(l*l),f=0,u=[];for(a=0;r>a;a++)t=a-.5*(r-1),n=c?c[a]:Math.exp(i*t*t),u[a]=n,f+=n;for(f=1/f,a=r;a--;)u[a]*=f;return u}function GRAY216IC1Filter(r,e,a,t,n,o,s){var c,l,i,f,u,_,h,R,d=e>>1,y=copyMakeBorder(r,d,d,0,0,s),A=y.data,C=y.col;for(c=a;c--;)for(R=c*t,l=t;l--;){for(u=0,i=e;i--;)for(h=(i+c)*C,f=e;f--;)_=f+l,u+=A[h+_]*n[i*e+f];o[l+R]=u}}function remap4array(r,e,a,t){var n,o,s,c,l=r.row,i=r.col,f=r.data,u=t||new Mat(l,i,CV_RGBA),_=u.data;for(o=l;o--;)for(n=i;n--;)s=o*i+n<<2,c=a[n][o]*i+e[n][o]<<2,_[s]=f[c],_[s+1]=f[c+1],_[s+2]=f[c+2],_[s+3]=f[c+3];return u}function remap4function(r,e,a,t){var n,o,s,c,l=r.row,i=r.col,f=r.data,u=t||new Mat(l,i,CV_RGBA),_=u.data;for(o=l;o--;)for(n=i;n--;)s=o*i+n<<2,c=a(n,o)*i+e(n,o)<<2,_[s]=f[c],_[s+1]=f[c+1],_[s+2]=f[c+2],_[s+3]=f[c+3];return u}var host=__host,cv={},iCanvas=document.createElement("canvas"),iCtx=iCanvas.getContext("2d"),JsCV_MODULE="CORE",JsCV_MODULE_VERSION="0.2",JsCV_ERROR_ON=__host.console&&!0,JsCV_LOG_ON=__host.console&&!0,UNSPPORT_DATA_TYPE="Unknown/unsupported data type.",UNSPPORT_BORDER_TYPE="Unknown/unsupported border type.",UNSPPORT_SIZE="The kernel size must be odd nor larger than 7.",IS_UNDEFINED_OR_NULL="This value shouldn't be undefined, Null or 0",MAT_SIZE_ERROR="Mat's size is not equal to data size.";cv.log=log,cv.error=error;var extend=function(r){r||error(arguments.callee,IS_UNDEFINED_OR_NULL,174);var e=this,a=null;for(a in r)e[a]?log("cv."+a+" is already existed!"):e[a]=r[a];return e};cv.extend=extend;var Mat=function(r,e,a,t,n){this.row=r||error(arguments.callee,IS_UNDEFINED_OR_NULL,206),this.col=e||error(arguments.callee,IS_UNDEFINED_OR_NULL,207),this.channel=t,a?a.call(this,r,e,t,n):error(arguments.callee,UNSPPORT_DATA_TYPE,209),this.data.length===this.row*this.col*this.channel||error(arguments.callee,MAT_SIZE_ERROR,210)};cv.Mat=Mat,Mat.prototype.getType=function(){return this.type.match(/CV\_[0-9]/)?this.type+this.channel+"C":this.type},Mat.prototype.toString=function(){for(var r=this.data,e="Mat("+this.type+") = {\n",a=this.col*this.channel,t=0;this.row>t;t++){e+="[";for(var n=0;a>n;n++)e+=r[t*a+n]+",";e+="]\n"}return e+="}"},Mat.prototype.depth=function(){return eval(this.type)},Mat.prototype.clone=function(){var r;return"CV_RGBA"===this.type?r=new Mat(this.row,this.col,this.depth(),this.data):(r=new Mat(this.row,this.col,this.depth(),this.channel),r.data=this.data.subarray(0)),r},Mat.prototype.getRow=function(r){var e=this.col*this.channel,a=e*this.bytes,t=r||0,n=new this.data.constructor(this.buffer,t*a,e);return new Rect(n,this.channel)},Mat.prototype.getCol=function(r){function e(r){for(var e=this.row,a=this.channel,s=0;e>s;s++)n.push(new r(this.buffer,s*t+o,1*a))}var a=this.col*this.channel,t=a*this.bytes,n=[],o=r||0;return e(this.data.constructor),new Rect(n,this.channel)},Mat.prototype.rowRange=function(r,e){function a(r){this.row;for(var e=s;c>=e;e++)o.push(new r(this.buffer,e*n,t))}var t=this.col*this.channel,n=t*this.bytes,o=[],s=r||0,c=e||this.row;return a(this.data.constructor),new Rect(o,this.channel)},Mat.prototype.colRange=function(r,e){function a(a){var t=this.row;channel=this.channel;for(var s=0;t>s;s++)o.push(new a(this.buffer,s*n+r,(e-r+1)*channel))}var t=this.col*this.channel,n=t*this.bytes,o=[];return e||this.col,a(Float64Array),new Rect(o,this.channel)},Mat.prototype.convertTo=function(r,e){var a=e||new Mat(this.row,this.col,r),t=a.buffer;switch((""+r).match(/function\s+(CV_[0-9A-Z]+)/)[1]){case"CV_8I":new Int8Array(t).set(this.data);break;case"CV_8U":new Uint8Array(t).set(this.data);break;case"CV_RGBA":case"CV_GRAY":new Uint8ClampedArray(t).set(this.data);break;case"CV_16I":new Int16Array(t).set(this.data);break;case"CV_16U":new Uint16Array(t).set(this.data);break;case"CV_32I":new Int32Array(t).set(this.data);break;case"CV_32U":new Uint32Array(t).set(this.data);break;case"CV_32F":new Float32Array(t).set(this.data);break;case"CV_64F":new Float64Array(t).set(this.data)}return a},Mat.prototype.at=function(r,e,a){var t=r||error(arguments.callee,IS_UNDEFINED_OR_NULL,419),n=e||0,o=a||0,s=this.col*this.channel*this.bytes,c=1;if(t.indexOf("Vec")>-1){var l=r.match(/Vec(\d+)([a-z])/);switch(c=parseInt(l[1]),l[2]){case"b":t="uchar";break;case"s":t="short";break;case"i":t="int";break;case"f":t="float";break;case"d":t="double"}}switch(t){case"uchar":return new Uint8Array(this.buffer,o*s+n,c);case"short":return new Int16Array(this.buffer,o*s+2*n,c);case"int":return new Int32Array(this.buffer,o*s+4*n,c);case"float":return new Float32Array(this.buffer,o*s+4*n,c);case"doulble":return new Float64Array(this.buffer,o*s+8*n,c);default:error(arguments.callee,UNSPPORT_DATA_TYPE,464)}};var Rect=function(r,e){this.data=r||[],this.channel=e||error(arguments.callee,IS_UNDEFINED_OR_NULL,480)};cv.Rect=Rect;var imread=function(r){r||error(arguments.callee,IS_UNDEFINED_OR_NULL,493);var e=r.width,a=r.height;iResize(e,a),iCtx.drawImage(r,0,0);var t=iCtx.getImageData(0,0,e,a),n=new Mat(a,e,CV_RGBA,t.data);return t=null,iCtx.clearRect(0,0,e,a),n};cv.imread=imread;var imwrite=function(r,e){if(r||error(arguments.callee,IS_UNDEFINED_OR_NULL,516),"CV_GRAY"===r.type&&(r=cvtColor(r,CV_GRAY2RGBA)),"CV_RGBA"===r.type){var a=r.col,t=r.row,n=iCtx.createImageData(a,t);n.data.set(r.data),iResize(a,t),iCtx.putImageData(n,0,0);var o=iCanvas.toDataURL();return iCtx.clearRect(0,0,a,t),location.href=e?o.replace("image/png","image/octet-stream"):o,!0}return error(arguments.callee,UNSPPORT_DATA_TYPE,532),!1};cv.imwrite=imwrite,cv.RGBA2ImageData=RGBA2ImageData;var convertScaleAbs=function(r,e){r||error(arguments.callee,IS_UNDEFINED_OR_NULL,561);var a=r.row,t=r.col,n=r.channel,o=r.data;dst=e?e:1===n?new Mat(a,t,CV_GRAY):4===n?new Mat(a,t,CV_RGBA):new Mat(a,t,CV_8I,n);var s,c,l=dst.data;for(s=a;s--;)for(c=t*n;c--;)l[s*t*n+c]=Math.abs(o[s*t*n+c]);return dst};cv.convertScaleAbs=convertScaleAbs;var addWeighted=function(r,e,a,t,n,o){r&&a||error(arguments.callee,IS_UNDEFINED_OR_NULL,606);var s=r.row,c=r.col,l=r.channel,i=n||0;if(s!==a.row||c!==a.col||l!==a.channel)return error(arguments.callee,"Src2 must be the same size and channel number as src1!",614),null;dst=o?o:r.type.match(/CV\_\d+/)?new Mat(s,c,r.depth(),l):new Mat(s,c,r.depth());var f,u=dst.data,_=r.data,h=a.data;for(f=s*c*l;f--;)u[f]=e*_[f]+t*h[f]+i;return dst};cv.addWeighted=addWeighted;var cvtColor=function(r,e){if(r||error(arguments.callee,IS_UNDEFINED_OR_NULL,656),r.type&&r.type.indexOf("CV_")>-1){var a=r.row,t=r.col;switch(e){case CV_RGBA2GRAY:for(var n=new Mat(a,t,CV_GRAY),o=n.data,s=r.data,c=a*t;c;)o[--c]=9798*s[4*c]+19235*s[4*c+1]+3736*s[4*c+2]>>15;break;case CV_RGBA2GRAY_DUFF:for(var l,i,n=new Mat(a,t,CV_GRAY),o=n.data,s=r.data,f=a*t,u=f>>3,_=u;_--;)i=_<<3,l=i<<2,o[i]=9798*s[l]+19235*s[++l]+3736*s[++l]>>15,l++,o[++i]=9798*s[++l]+19235*s[++l]+3736*s[++l]>>15,l++,o[++i]=9798*s[++l]+19235*s[++l]+3736*s[++l]>>15,l++,o[++i]=9798*s[++l]+19235*s[++l]+3736*s[++l]>>15,l++,o[++i]=9798*s[++l]+19235*s[++l]+3736*s[++l]>>15,l++,o[++i]=9798*s[++l]+19235*s[++l]+3736*s[++l]>>15,l++,o[++i]=9798*s[++l]+19235*s[++l]+3736*s[++l]>>15,l++,o[++i]=9798*s[++l]+19235*s[++l]+3736*s[++l]>>15;for(i=u<<3,l=i<<2;f>i;)o[i++]=9798*s[l++]+19235*s[l++]+3736*s[l++]>>15,l++;break;case CV_GRAY2RGBA:for(var h,n=new Mat(a,t,CV_RGBA),o=n.data,s=r.data,c=r.row*r.col<<2;c;)o[c-=4]=o[c+1]=o[c+2]=s[c>>2],o[h=c+3]=255}}else error(arguments.callee,UNSPPORT_DATA_TYPE,719);return n};cv.cvtColor=cvtColor;var brightnessContrast=function(r,e,a){if(r||error(arguments.callee,IS_UNDEFINED_OR_NULL,736),"CV_RGBA"===r.type){var t,n,o,s=r.data,c=r.col,l=r.row,i=new Mat(l,c,CV_RGBA),f=i.data,u=Math.max(-255,Math.min(255,e||0)),_=Math.max(-255,Math.min(255,a||0)),h=cvtColor(r,CV_RGBA2GRAY),R=0,d=h.data;for(t=l;t--;)for(n=c;n--;)R+=d[t*c+n];var y,A=0|R/(l*c);for(t=l;t--;)for(n=c;n--;){if(y=4*(t*c+n),f[y]=s[y]+u,f[y+1]=s[y+1]+u,f[y+2]=s[y+2]+u,_>=0)for(o=3;o--;)f[y+o]=f[y+o]>=A?f[y+o]+(255-A)*_/255:f[y+o]-A*_/255;else f[y]=f[y]+(f[y]-A)*_/255,f[y+1]=f[y+1]+(f[y+1]-A)*_/255,f[y+2]=f[y+2]+(f[y+2]-A)*_/255;f[y+3]=255}}else error(arguments.callee,UNSPPORT_DATA_TYPE,784);return i};cv.brightnessContrast=brightnessContrast;var copyMakeBorder=function(r,e,a,t,n,o,s){return"CV_RGBA"!==r.type&&"CV_GRAY"!==r.type&&error(arguments.callee,UNSPPORT_DATA_TYPE,859),o===CV_BORDER_CONSTANT?copyMakeConstBorder_8U(r,e,a,t,n,s):copyMakeBorder_8U(r,e,a,t,n,o)};cv.copyMakeBorder=copyMakeBorder;var blur=function(r,e,a,t,n){if(r||error(arguments.callee,IS_UNDEFINED_OR_NULL,1032),r.type&&"CV_RGBA"==r.type){var o=r.row,s=r.col,c=n||new Mat(o,s,CV_RGBA),l=c.data,i=e||3,f=a||i;if(false&i||false&f)return error(arguments.callee,UNSPPORT_SIZE,1041),r;var u,_,h,R,d,y,A,C,p=i>>1,v=f>>1,w=copyMakeBorder(r,-1,p,0,0,t),E=w.data,N=w.col;for(R=o;R--;)for(h=R*s,d=s;d--;){for(y=3;y--;){for(u=0,C=i;C--;)_=4*R*N+4*(C+d)+y,u+=E[_];l[4*(d+h)+y]=u/i}l[4*(d+h)+3]=E[4*(R+v)*N+4*(d+p)+3]}for(w=copyMakeBorder(c,v,-1,0,0,t),E=w.data,N=w.col,R=o;R--;)for(h=R*s,d=s;d--;)for(y=3;y--;){for(u=0,A=f;A--;)_=4*(A+R)*N+4*d+y,u+=E[_];l[4*(d+h)+y]=u/f}}else error(arguments.callee,UNSPPORT_DATA_TYPE,1087);return c};cv.blur=blur;var blurOld=function(r,e,a,t,n){if(r||error(arguments.callee,IS_UNDEFINED_OR_NULL,1094),r.type&&"CV_RGBA"==r.type){var o=r.row,s=r.col,c=n||new Mat(o,s,CV_RGBA),l=c.data,i=e||3,f=a||i,u=i*f;if(false&i||false&f)return error(arguments.callee,UNSPPORT_SIZE,1104),r;var _,h,R,d,y,A,C,p,v,w=i>>1,E=f>>1,N=copyMakeBorder(r,E,w,0,0,t),U=N.data,V=N.col;for(y=o;y--;)for(d=y*s,A=s;A--;){for(C=3;C--;){for(_=0,p=f;p--;)for(R=4*(p+y)*V,v=i;v--;)h=4*(v+A)+C,_+=U[R+h];l[4*(A+d)+C]=_/u}l[4*(A+d)+3]=U[R+4*E*V+4*(A+w)+3]}}else error(arguments.callee,UNSPPORT_DATA_TYPE,1135);return c};cv.blurOld=blurOld;var GaussianBlur=function(r,e,a,t,n,o,s){if(r||error(arguments.callee,IS_UNDEFINED_OR_NULL,1156),r.type&&"CV_RGBA"==r.type){var c=r.row,l=r.col,i=s||new Mat(c,l,CV_RGBA),f=i.data,u=t||0,_=n||t,h=e||1|Math.round(6*u+1),R=a||1|Math.round(6*_+1);if(false&h||false&R)return error(arguments.callee,UNSPPORT_SIZE,1167),r;var d,y=h>>1,A=R>>1,C=copyMakeBorder(r,-1,y,0,0,o),p=C.data,v=C.col,w=getGaussianKernel(h,u);d=h===R&&u===_?w:getGaussianKernel(R,_);var E,N,U,V,I,D,O,T;for(E=c;E--;)for(T=E*l,N=l;N--;){for(U=3;U--;){for(D=0,I=h;I--;)O=4*E*v+4*(I+N)+U,D+=p[O]*w[I];f[4*(N+T)+U]=D}f[4*(N+T)+3]=p[4*(E+A)*v+4*(N+y)+3]}for(C=copyMakeBorder(i,A,-1,0,0,o),p=C.data,v=C.col,E=c;E--;)for(T=E*l,N=l;N--;)for(U=3;U--;){for(D=0,V=R;V--;)O=4*(V+E)*v+4*N+U,D+=p[O]*d[V];f[4*(N+T)+U]=D}}else error(arguments.callee,UNSPPORT_DATA_TYPE,1222);return i};cv.GaussianBlur=GaussianBlur;var GaussianBlurOld=function(r,e,a,t,n,o,s){if(r||error(arguments.callee,IS_UNDEFINED_OR_NULL,1229),r.type&&"CV_RGBA"==r.type){var c=r.row,l=r.col,i=s||new Mat(c,l,CV_RGBA),f=i.data,u=t||0,_=n||t,h=e||1|Math.round(6*u+1),R=a||1|Math.round(6*_+1);if(false&h||false&R)return error(arguments.callee,UNSPPORT_SIZE,1241),r;var d,y=h>>1,A=R>>1,C=copyMakeBorder(r,A,y,0,0,o),p=C.data,v=C.col,w=getGaussianKernel(h,u),E=Array(h*R);d=h===R&&u===_?w:getGaussianKernel(R,_);var N,U,V,I,D;for(N=d.length;N--;)for(U=w.length;U--;)E[N*h+U]=d[N]*w[U];var O,T,g,m;for(N=c;N--;)for(m=N*l,U=l;U--;){for(V=3;V--;){for(O=0,I=R;I--;)for(g=4*(I+N)*v,D=h;D--;)T=4*(D+U)+V,O+=p[g+T]*E[I*h+D];f[4*(U+m)+V]=O}f[4*(U+m)+3]=p[g+4*A*v+4*(U+y)+3]}}else error(arguments.callee,UNSPPORT_DATA_TYPE,1288);return i};cv.GaussianBlurOld=GaussianBlurOld;var medianBlur=function(r,e,a,t,n){if(r||error(arguments.callee,IS_UNDEFINED_OR_NULL,1350),r.type&&"CV_RGBA"==r.type){var o=r.row,s=r.col,c=n||new Mat(o,s,CV_RGBA),l=c.data,i=e||3,f=a||i,u=i*f;if(false&i||false&f)return error(arguments.callee,UNSPPORT_SIZE,1360),r;var _,h,R,d,y,A,C,p,v=i>>1,w=f>>1,E=copyMakeBorder(r,w,v,0,0,t),N=E.data,U=E.col,V=[],I=(u>>1)+1;for(d=o;d--;)for(R=d*s,y=s;y--;){for(A=3;A--;){for(C=f;C--;)for(h=4*(C+d)*U,p=i;p--;)_=4*(p+y)+A,V[C*i+p]=N[h+_];V.sort(function(r,e){return r-e}),l[4*(y+R)+A]=V[I]}l[4*(y+R)+3]=N[h+4*w*U+4*(y+v)+3]}}else error(arguments.callee,UNSPPORT_DATA_TYPE,1393);return c};cv.medianBlur=medianBlur;var bilateralFilter=function(r,e,a,t,n,o){if(r.type&&"CV_RGBA"==r.type){var s=r.row,c=r.col,l=o||new Mat(s,c,CV_RGBA),i=l.data,f=r.data,u=a||5,_=t||.2,e=e||1|Math.round(6*_+1),h=e*e;if(false&e)return error(arguments.callee,UNSPPORT_SIZE,1424),r;var R,d,y,A,C,p=e>>1,v=copyMakeBorder(r,p,p,0,0,n),w=v.data,E=v.col,N=getGaussianKernel(e,u),U=Array(h);for(R=N.length;R--;)for(d=N.length;d--;)U[R*e+d]=N[R]*N[d];var V,I,D,O,T,g,m,B;for(R=s;R--;)for(B=R*c,d=c;d--;){for(y=3;y--;){for(I=0,D=0,A=e;A--;)for(m=4*(A+R)*E,O=f[4*(R*c+d)+y],C=e;C--;)g=4*(C+d)+y,V=O-w[m+g],T=U[A*e+C]*Math.exp(-1*V*V/u*u),I+=T,D+=T*w[m+g];i[4*(d+B)+y]=D/I}i[4*(d+B)+3]=w[m+4*p*E+4*(d+p)+3]}}else error(arguments.callee,UNSPPORT_DATA_TYPE,1469);return l},filter2D=function(r,e,a,t,n){r&&a||error(arguments.callee,IS_UNDEFINED_OR_NULL,1489);var o=r.row,s=r.col,l=n||new Mat(o,s,e||r.depth()),f=l.data,u=(r.data,r.channel),_=a.col,h=a.row,R=a.data;if(false&_||false&h)return error(arguments.callee,UNSPPORT_SIZE,1501),r;var d,A,C,p,v=_>>1,w=h>>1,E=copyMakeBorder(r,w,v,0,0,t),N=E.data,U=E.col;for(i=o;i--;)for(p=i*s,j=s;j--;)for(c=u;c--;){for(d=0,y=h;y--;)for(C=(y+i)*U*u,x=_;x--;)A=(x+j)*u+c,d+=N[C+A]*R[y*_+x];f[(j+p)*u+c]=d}return l};cv.filter2D=filter2D;var separableLinearFilter=function(r,e,a,t,n,o){r&&a&&t||error(arguments.callee,IS_UNDEFINED_OR_NULL,1548);var s=r.row,c=r.col,l=o||new Mat(s,c,e||r.depth()),i=l.data;r.data,r.channel;var f=a.length,u=t.length;if(false&f||false&u)return error(arguments.callee,UNSPPORT_SIZE,1559),r;var _,h,R,d,y,A,C,p,v=f>>1,w=u>>1,E=copyMakeBorder(r,-1,v,0,0,n),N=E.data,U=E.col;for(_=s;_--;)for(p=_*c,h=c;h--;){for(R=3;R--;){for(A=0,y=f;y--;)C=4*_*U+4*(y+h)+R,A+=N[C]*a[y];i[4*(h+p)+R]=A}i[4*(h+p)+3]=N[4*(_+w)*U+4*(h+v)+3]}for(E=copyMakeBorder(l,w,-1,0,0,n),N=E.data,U=E.col,_=s;_--;)for(p=_*c,h=c;h--;)for(R=3;R--;){for(A=0,d=u;d--;)C=4*(d+_)*U+4*h+R,A+=N[C]*t[d];i[4*(h+p)+R]=A}};cv.separableLinearFilter=separableLinearFilter;var threshold=function(r,e,a,t,n){if(r&&e||error(arguments.callee,IS_UNDEFINED_OR_NULL,1621),r.type&&"CV_GRAY"==r.type){var o,s,c,l=r.col,i=r.row,f=r.data,u=n||new Mat(i,l,CV_GRAY),_=u.data,h=a||255,R=t||CV_THRESH_BINARY;for(o=i;o--;)for(s=l;s--;)c=o*l+s,_[c]=R(f[c],e,h)}else error(arguments.callee,UNSPPORT_DATA_TYPE,1641);return u};cv.threshold=threshold;var Sobel=function(r,e,a,t,n,o){if(r&&e^a||error(arguments.callee,IS_UNDEFINED_OR_NULL,1662),r.type&&"CV_GRAY"===r.type){var s=r.row,c=r.col,l=o||new Mat(s,c,CV_16I,1),i=l.data;switch(size=t||3){case 1:size=3;case 3:e?kernel=[-1,0,1,-2,0,2,-1,0,1]:a&&(kernel=[-1,-2,-1,0,0,0,1,2,1]);break;case 5:e?kernel=[-1,-2,0,2,1,-4,-8,0,8,4,-6,-12,0,12,6,-4,-8,0,8,4,-1,-2,0,2,1]:a&&(kernel=[-1,-4,-6,-4,-1,-2,-8,-12,-8,-2,0,0,0,0,0,2,8,12,8,2,1,4,6,4,1]);break;default:error(arguments.callee,UNSPPORT_SIZE,1705)}GRAY216IC1Filter(r,size,s,c,kernel,i,n)}else error(arguments.callee,UNSPPORT_DATA_TYPE,1712);return l};cv.Sobel=Sobel;var Laplacian=function(r,e,a,t){if(r||error(arguments.callee,IS_UNDEFINED_OR_NULL,1758),r.type&&"CV_GRAY"===r.type){var n,o=r.row,s=r.col,c=t||new Mat(o,s,CV_16I,1),l=c.data,i=e||3;switch(i){case 1:n=[0,1,0,1,-4,1,0,1,0],i=3;break;case 3:n=[2,0,2,0,-8,0,2,0,2];break;default:error(arguments.callee,UNSPPORT_SIZE,1781)}GRAY216IC1Filter(r,i,o,s,n,l,a)}else error(arguments.callee,UNSPPORT_DATA_TYPE,1787);return c};cv.Laplacian=Laplacian;var Scharr=function(r,e,a,t,n){if(r&&e^a||error(arguments.callee,IS_UNDEFINED_OR_NULL,1806),r.type&&"CV_GRAY"===r.type){var o,s=r.row,c=r.col,l=n||new Mat(s,c,CV_16I,1),i=l.data,f=3;e?o=[-3,0,3,-10,0,10,-3,0,3]:a&&(o=[-3,-10,-3,0,0,0,3,10,3]),GRAY216IC1Filter(r,f,s,c,o,i,t)}else error(arguments.callee,UNSPPORT_DATA_TYPE,1830);return l};cv.Scharr=Scharr;var remap=function(r,e,a,t){return r&&e&&a||error(arguments.callee,IS_UNDEFINED_OR_NULL,1849),"CV_RGBA"!==r.type&&error(arguments.callee,UNSPPORT_DATA_TYPE,1852),"function"==typeof e&&"function"==typeof a?remap4function(r,e,a,t):e instanceof Int32Arrray||a instanceof Int32Array?remap4array(r,e,a,t):(error(arguments.callee,UNSPPORT_DATA_TYPE,1859),t||r)};cv.remap=remap;var getRotationArray2D=function(r,e,a){var t=Math.sin(r)||0,n=Math.cos(r)||1,o=e||0,s=a||0;return[n,-t,-o,t,n,-s]};cv.getRotationArray2D=getRotationArray2D;var warpAffine=function(r,e,a){if(r&&e||error(arguments.callee,IS_UNDEFINED_OR_NULL,1942),r.type&&"CV_RGBA"===r.type){var t,n,o,s,c,l,i,f=r.row,u=r.col,_=a||new Mat(f,u,CV_RGBA),h=new Uint32Array(r.buffer),R=new Uint32Array(_.buffer);for(n=0,i=0;f>n;n++)for(o=e[1]*n+e[2],s=e[4]*n+e[5],t=0;u>t;t++,i++,o+=e[0],s+=e[3])o>0&&s>0&&u>o&&f>s?(l=0|s,c=0|o,R[i]=h[l*u+c]):R[i]=4278190080}else error(arguments.callee,UNSPPORT_DATA_TYPE,1969);return _};cv.warpAffine=warpAffine;var pyrDown=function(r,e){if(r||error(arguments.callee,IS_UNDEFINED_OR_NULL,1985),r.type&&"CV_RGBA"==r.type){var a,t,n,o,s,l,i=r.col,f=r.row,u=((1&i)+i)/2,_=((1&f)+f)/2,h=(r.data,e||new Mat(_,u,CV_RGBA)),R=h.data,d=copyMakeBorder(r,2,2,0,0),A=d.data,C=d.col,p=[1,4,6,4,1,4,16,24,16,4,6,24,36,24,6,4,16,24,16,4,1,4,6,4,1];for(s=_;s--;)for(o=s*u,l=u;l--;){for(c=3;c--;){for(a=0,y=5;y--;)for(n=4*(y+2*s)*C,x=5;x--;)t=4*(x+2*l)+c,a+=A[n+t]*p[5*y+x];R[4*(l+o)+c]=a/256}R[4*(l+o)+3]=A[n+4*2*C+4*(2*l+2)+3]}}else error(arguments.callee,UNSPPORT_DATA_TYPE,2027);return h};cv.pyrDown=pyrDown;var pyrUp=function(r,e){if(r||error(arguments.callee,IS_UNDEFINED_OR_NULL,2044),r.type&&"CV_RGBA"==r.type){var a,t,n,o,s,l,i=r.col,f=r.row,u=2*i,_=2*f,h=(r.data,e||new Mat(_,u,CV_RGBA)),R=h.data,d=copyMakeBorder(r,2,2,0,0),A=d.data,C=d.col,p=[1,4,6,4,1,4,16,24,16,4,6,24,36,24,6,4,16,24,16,4,1,4,6,4,1];for(s=_;s--;)for(o=s*u,l=u;l--;){for(c=3;c--;){for(a=0,y=2+(1&s);y--;)for(n=4*(y+(s+1>>1))*C,x=2+(1&l);x--;)t=4*(x+(l+1>>1))+c,a+=A[n+t]*p[5*(2*y+(1^1&s))+(2*x+(1^1&l))];R[4*(l+o)+c]=a/64}R[4*(l+o)+3]=A[n+4*2*C+4*((l+1>>1)+2)+3]}}else error(arguments.callee,UNSPPORT_DATA_TYPE,2086);return h};cv.pyrUp=pyrUp;var dilate=function(r,e,a,t){if(r||error(arguments.callee,IS_UNDEFINED_OR_NULL,2105),r.type&&"CV_RGBA"==r.type){var n,o,s,c,l,i,f,u=r.col,_=r.row,h=e||3,R=t||new Mat(_,u,CV_RGBA),d=R.data,A=h>>1,C=copyMakeBorder(r,-1,A,0,0,a),p=C.data,v=C.col;if(false&h)return error(arguments.callee,UNSPPORT_SIZE,2121),r;for(i=_;i--;)for(c=i*u,f=u;f--;){for(n=0,o=0,s=4*i*v,x=h;x--;)l=s+4*(x+f),p[l]+p[l+1]+p[l+2]>o&&(o=p[l]+p[l+1]+p[l+2])&&(n=l);d[4*(f+c)]=p[n],d[4*(f+c)+1]=p[n+1],d[4*(f+c)+2]=p[n+2],d[4*(f+c)+3]=p[n+3]}for(C=copyMakeBorder(R,A,-1,0,0,a),p=C.data,v=C.col,i=_;i--;)for(c=i*u,f=u;f--;){for(n=0,o=0,y=h;y--;)l=4*(y+i)*v+4*f,p[l]+p[l+1]+p[l+2]>o&&(o=p[l]+p[l+1]+p[l+2])&&(n=l);d[4*(f+c)]=p[n],d[4*(f+c)+1]=p[n+1],d[4*(f+c)+2]=p[n+2],d[4*(f+c)+3]=p[n+3]}}else error(arguments.callee,UNSPPORT_DATA_TYPE,2163);return R};cv.dilate=dilate;var erode=function(r,e,a,t){if(r||error(arguments.callee,IS_UNDEFINED_OR_NULL,2181),r.type&&"CV_RGBA"==r.type){var n,o,s,c,l,i,f,u=r.col,_=r.row,h=e||3,R=t||new Mat(_,u,CV_RGBA),d=R.data,A=h>>1,C=copyMakeBorder(r,-1,A,0,0,a),p=C.data,v=C.col;if(false&h)return error(arguments.callee,UNSPPORT_SIZE,2197),r;for(i=_;i--;)for(c=i*u,f=u;f--;){for(n=0,o=765,s=4*i*v,x=h;x--;)l=s+4*(x+f),o>p[l]+p[l+1]+p[l+2]&&((o=p[l]+p[l+1]+p[l+2])||!0)&&(n=l);d[4*(f+c)]=p[n],d[4*(f+c)+1]=p[n+1],d[4*(f+c)+2]=p[n+2],d[4*(f+c)+3]=p[n+3]}for(C=copyMakeBorder(R,A,-1,0,0,a),p=C.data,v=C.col,i=_;i--;)for(c=i*u,f=u;f--;){for(n=0,o=765,y=h;y--;)l=4*(y+i)*v+4*f,o>p[l]+p[l+1]+p[l+2]&&((o=p[l]+p[l+1]+p[l+2])||!0)&&(n=l);d[4*(f+c)]=p[n],d[4*(f+c)+1]=p[n+1],d[4*(f+c)+2]=p[n+2],d[4*(f+c)+3]=p[n+3]}}else error(arguments.callee,UNSPPORT_DATA_TYPE,2239);return R};cv.erode=erode,host.cv=cv,this.__cv20121221=cv})(this);