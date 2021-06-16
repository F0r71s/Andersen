function cloning(obj) {
    let clone = {};
    for (let i in obj) {
        if(obj[i] instanceof Object) {
            if(typeof(obj[i]) === 'function') {
                clone[i] = obj[i];
                continue;
            }
            if(Array.isArray(obj[i])) {
                let cloneM = [];
                for (let j = 0; j < obj[i].length; j++) {
                    if(obj[i][j] instanceof Object) {
                        cloneM[j] = cloning(obj[i][j])
                        continue;
                    }
                    cloneM[j] = obj[i][j];
                }
                clone[i] = cloneM;
                continue;
            }
            clone[i] = cloning(obj[i]);
            continue;
        }
        clone[i] = obj[i]
    }
    return clone;
}
