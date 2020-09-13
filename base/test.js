(function () {
    let youXianJi = function (char1, char2) {
        if (char1 == "+" || char1 == "-") {
            if (char2 == "*" || char2 == "/") {
                return true;
            } else {
                return false;
            }
        }
        if (char1 == "*" || char1 == "/") {
            return false;
        }
    }
    let initData = function (srcData) {
        let desData = [];
        let curData = [];
        srcData.forEach(data => {
            if (typeof (data) == "number") {
                desData.push(data);
            } else {
                if (curData.length == 0) {
                    curData.push(data);
                } else {
                    for (let j = curData.length - 1; j >= 0; j--) {
                        let previous = curData[curData.length - 1];
                        let key = youXianJi(previous, data);
                        if (key) {
                            curData.push(data);
                            break;
                        } if (!key) {
                            desData.push(previous);
                            curData.pop();
                            if (curData.length == 0) {
                                curData.push(data);
                            }
                        }
                    }
                }
            }
        })
        while (curData.length > 0) {
            desData.push(curData.pop());
        }
        return desData;
    }
    let count = function (operator, num1, num2) {
        if (operator == "+") {
            return (num1 + num2);
        } if (operator == "-") {
            return num1 - num2;
        } if (operator == "*") {
            return num1 * num2;
        } if (operator == "/") { }
        return num1 / num2;
    }
    let countResult = function (arr) {
        let reArr = [];
        let num1, num2, ret;
        arr.forEach(item => {
            if (typeof (item) == "number") {
                reArr.push(item);
            } else {
                num2 = reArr.pop();
                num1 = reArr.pop();
                ret = count(item, num1, num2);
                reArr.push(ret);
            }
        })
        return ret;
    }
    // 切割成数组
    function splitString(){
        
    }
    //165 * 120 + 120 / 2
    let arr = initData([165, "*", 120, "+", 120, "/", 2]);
    // let arr = initData([1, "*", 2, "+", 4, "/", 2]);
    console.log(countResult(arr))
})()