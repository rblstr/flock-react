export const arrayEquals = (lhs, rhs, comparator = (lhs, rhs) => lhs === rhs) => {
    if (!lhs || !rhs) {
        return false
    }

    if (lhs.length !== rhs.length) {
        return false
    }

    const l = lhs.concat().sort()
    const r = rhs.concat().sort()

    let equals = true
    for (var i = l.length - 1; i >= 0; i--) {
        equals = comparator(l[i], r[i])
        if (!equals) {
            break
        }
    }
    return equals
}
