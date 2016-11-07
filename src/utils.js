export const arrayEquals = (lhs, rhs) => {
    if (!lhs || !rhs) {
        return false
    }

    if (lhs.length !== rhs.length) {
        return false
    }

    let equals = true
    for (var i = lhs.length - 1; i >= 0; i--) {
        equals = (lhs[i] === rhs[i])
        if (!equals) {
            break
        }
    }
    return equals
}