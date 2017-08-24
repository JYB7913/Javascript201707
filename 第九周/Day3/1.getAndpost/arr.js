let arr = [
    {id:1},
    {id:2},
    {id:3},
    {id:4},
    ];

//  id 2   {id:2}

arr = arr.find(function (item) {
    return item.id === 6;
});
console.log(arr);

// arr.forEach(function (item) {
//     console.log(item);
// });
