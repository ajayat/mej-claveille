const isAllow = (minRoleRequired) => {
    const role = ['FULL_ADMIN']

    if(!role){
        return false
    }
    else if(role.indexOf(minRoleRequired) !== -1){
        return true
    }
    else if(role.indexOf('FULL_ADMIN') !== -1){
        return true
    }
    return role.indexOf('ADMIN') !== -1 && minRoleRequired !== 'FULL_ADMIN';
}


export default isAllow