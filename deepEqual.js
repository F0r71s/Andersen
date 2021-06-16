function eqCheck(obj1,obj2){
    if (Object.keys(obj1).length != Object.keys(obj2).length) {
        return false;
    }
    for (let i in obj1){
        if (obj2.hasOwnProperty(i)){
            if(obj1[i] instanceof Object) {
                if(!eqCheck(obj1[i], obj2[i])) {
                    return false;
                }
            }
            else if (obj1[i] !== obj2[i]) {
                return false;
            }
        }
        else {
            return false
        }
    }
    return true;
}