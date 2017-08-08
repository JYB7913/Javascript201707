//箭头函数-表达式的写法：
var fn=p=>p; //中间的p是参数，后面的p是返回值
var fn1=()=>'我没有参数';
var fn=(n,m)=>n+m;
//箭头函数-函数体写法
var fn=p=>{
    return p;
};
console.log(fn(123));
var fn=()=>{
    return '我没有参数'
};
console.log(fn());
var fn=(n,m)=>{
    return n+m;
};
console.log(fn(2,3));

